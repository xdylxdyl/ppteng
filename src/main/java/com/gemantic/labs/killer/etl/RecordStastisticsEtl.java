package com.gemantic.labs.killer.etl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.MyListUtil;
import com.gemantic.common.util.MyMapUtil;
import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.util.MessageUtil;
import com.gemantic.killer.util.RoleUtil;
import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.model.SimpleStatistics;
import com.gemantic.labs.killer.service.RecordService;
import com.gemantic.labs.killer.service.SimpleStatisticsService;

@Component
public class RecordStastisticsEtl {

	private static final Log log = LogFactory.getLog(RecordStastisticsEtl.class);

	@Autowired
	private RecordService recordService;
	@Autowired
	private SimpleStatisticsService simpleStatisticsService;

	public RecordStastisticsEtl() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RecordStastisticsEtl(RecordService recordService, SimpleStatisticsService simpleStatisticsService) {

		this.recordService = recordService;
		this.simpleStatisticsService = simpleStatisticsService;
	}

	// @Scheduled(fixedDelay=5000)
	public void testQuartz() {
		log.info("======");
	}

	@Scheduled(cron = "0 4 4 * * ?")
	// @Scheduled(fixedDelay=5000)
	public void calculate() throws ServiceException, ServiceDaoException, InterruptedException, SecurityException, IllegalAccessException, NoSuchFieldException {

		//默认是空,跑全部的数据
		calculateProcess("day",null);

	}

	public void calculateProcess(String type, Set<String> functionType) throws ServiceException, ServiceDaoException, IllegalAccessException, NoSuchFieldException,
			InterruptedException {
		if(functionType==null||functionType.size()==0){
			functionType=new HashSet();
			functionType.add("all");
			functionType.add("third");
		}
		List<Long> lists;
		if ("day".equals(type)) {
			// 1.init all players and init all statistics
			lists = this.recordService.getRecordIdsByVersionAndCreateAt("simple_1.0", MyTimeUtil.getPreZeroTimeMillions(1), 0, Integer.MAX_VALUE);
		} else {
			lists = this.recordService.getRecordIdsByVersion("simple_1.0", 0, Integer.MAX_VALUE);
		}

		log.info("success get datas " + lists.size());
		List<Records> records = this.recordService.getObjectsByIds(lists);
		log.info("get record size " + records);

		Set<Long> totalPlayers = new HashSet();
		Set<Long> allPlayers = new HashSet();
		for (Records record : records) {
			Map<Long, String> maps = record.getUid_names();
			allPlayers.addAll(maps.keySet());
			totalPlayers.addAll(maps.keySet());
		}

		log.info("record get all players " + allPlayers.size());
		List<SimpleStatistics> sss = this.simpleStatisticsService.getObjectsByIds(new ArrayList(allPlayers));
		log.info(allPlayers.size() + " get statistics is " + sss.size());
		Map<Long, SimpleStatistics> existIDS = MyListUtil.convert2Map(SimpleStatistics.class.getDeclaredField("id"), sss);
		allPlayers.removeAll(existIDS.keySet());
		log.info("ready create " + allPlayers);

		for (Long ready : allPlayers) {
			SimpleStatistics ss = new SimpleStatistics(ready);
			this.simpleStatisticsService.insert(ss);

		}

		sss = this.simpleStatisticsService.getObjectsByIds(new ArrayList(totalPlayers));
		log.info(totalPlayers.size() + " after init get statistics is " + sss.size());
		Assert.assertEquals(totalPlayers.size(), sss.size());
		existIDS = MyListUtil.convert2Map(SimpleStatistics.class.getDeclaredField("id"), sss);

		// 2.calculate all win/lose
		if (functionType.contains("all")) {
			log.info("start calculate all");
			Long start=System.currentTimeMillis();
			calculateWinAll(records, existIDS);
			log.info(" calculate all over use time "+(System.currentTimeMillis()-start));
		}

		// 4.calcualte third
		if (functionType.contains("third")) {
			log.info("start calculate third");
			Long startThird=System.currentTimeMillis();
			calculatePhase(records, existIDS, totalPlayers);
			log.info(" calculate startThird over use time "+(System.currentTimeMillis()-startThird));
		}

		log.info("start update over");
	}

	private void calculatePhase(List<Records> records, Map<Long, SimpleStatistics> existIDS, Set<Long> allPlayers) throws ServiceException, ServiceDaoException,
			InterruptedException {
		int index = 0;
		int noThird=0;
		for (Records record : records) {
			index++;
			String path = record.getPath();
			List<String> contents = this.recordService.getContent(record.getId());
			Map<Integer, Set<Long>> dayLivers = new HashMap();

			Set<Long> water = new HashSet();
			Set<Long> killer = new HashSet();
			Set<Long> third = new HashSet();

			Integer dayIndex = 1;

			Message overMessage = null;
			for (String row : contents) {

				List<Message> messages = MessageUtil.fromStrings(row);

				for (Message message : messages) {

					if ("assign".equals(message.getPredict())) {

						Long uid = Long.valueOf(message.getObject());
						if ("water".equals(message.getSubject())) {
							// log.info("water " + message);
							water.add(uid);

						} else {
							// log.info("killer " + message);
							killer.add(uid);

						}

					}

				

					// subject":"6465321961700912128","predict":"right","object":"vote,
					// say", count live by right
					if ("right".equals(message.getPredict())) {
						if ("vote, say".equals(message.getObject())) {
							Long uid = Long.valueOf(message.getSubject());
							if(allPlayers.contains(uid)){
								this.mapAppendValue(dayLivers, dayIndex, uid);
							}else{
								log.info(uid+" not playsers ");
							}
							
						}

					}

					// subject":"night","predict":"time" nextday come
					if ("time".equals(message.getPredict())) {
						if ("day".equals(message.getSubject())) {
							// 晚上到来.
							dayIndex++;
						}

					}
					if ("over".equals(message.getPredict())) {
						log.info(message);
						overMessage = message;
					} else {

					};

				}

			}
			if (dayIndex == 1) {
				// no third
				log.info(index + " ---- " + record.getPath() + " no third "+noThird);
				noThird++;
				continue;
			} else {
				Set<Long> lastDay = dayLivers.get(dayIndex - 1);
				if (lastDay.size() == 3) {
					third = lastDay;
				}
				log.info(index + " ---- " + record.getPath() + " third is " + third);
			}

		
		
			if (overMessage != null && third.size() != 0) {
				// 三人局

				for (Long aid : third) {
					log.info("aid is "+aid);
					SimpleStatistics ss = existIDS.get(aid);
					log.info(aid+" get ss is "+ss);
					ss.setThird(ss.getThird() + 1);
					if ("water win".equals(overMessage.getObject())) {

						if (water.contains(aid)) {
							// water third win +

							ss.setWaterThirdWin(ss.getWaterThirdWin() + 1);
							ss.setThirdWin(ss.getThirdWin() + 1);

						}

					} else {

						if (killer.contains(aid)) {
							ss.setKillerThirdWin(ss.getKillerThirdWin() + 1);
							ss.setThirdWin(ss.getThirdWin() + 1);
						}

					}
					
					
					if(water.contains(aid)){
						ss.setWaterThird(ss.getWaterThird()+1);
					};
					if(killer.contains(aid)){
						ss.setKillerThird(ss.getKillerThird()+1);
					}

				}

			}

		}
		log.info("start update third ");
		// 3.update
		int indexUpdate = 0;

		for (SimpleStatistics ss : existIDS.values()) {
			indexUpdate++;
			log.info("update third" + indexUpdate);
			Thread.sleep(20);
			this.simpleStatisticsService.update(ss);
		}
		log.info(" update third over");
	}

	private void calculateWinAll(List<Records> records, Map<Long, SimpleStatistics> existIDS) throws ServiceException, ServiceDaoException, InterruptedException {
		
		int index = 0;
		
		for (Records record : records) {
			index++;

			String path = record.getPath();
			List<String> contents = this.recordService.getContent(record.getId());
			Set<Long> water = new HashSet();
			Set<Long> killer = new HashSet();
			Set<Long> all = new HashSet();

			Message overMessage = null;
			for (String row : contents) {

				List<Message> messages = MessageUtil.fromStrings(row);

				for (Message message : messages) {

					if ("assign".equals(message.getPredict())) {

						Long uid = Long.valueOf(message.getObject());
						if ("water".equals(message.getSubject())) {
							// log.info("water " + message);
							water.add(uid);

						} else {
							// log.info("killer " + message);
							killer.add(uid);

						}

					}

					if ("over".equals(message.getPredict())) {
						log.info(message);
						overMessage = message;
					} else {

					};

				}

			}

			all.addAll(water);
			all.addAll(killer);
			log.info(index + " ---- " + record.getPath() + " water is " + water);
			log.info(index + " ---- " + record.getPath() + " killer is " + killer);
			log.info(index + " ---- " + record.getPath() + " all is " + all);

			if (overMessage != null) {

				if ("water win".equals(overMessage.getObject())) {
					// 水胜
					log.info("water win " + overMessage);
					for (Long w : water) {
						SimpleStatistics ss = existIDS.get(w);

						// 胜局+1
						ss.setWin(ss.getWin() + 1);
						// 水胜局+1
						ss.setWaterWin(ss.getWaterWin() + 1);

					}
					for (Long kid : killer) {
						SimpleStatistics ss = existIDS.get(kid);

						// 败局+1
						ss.setLose(ss.getLose() + 1);
						// 杀败局+1
						ss.setKillerLose(ss.getKillerLose() + 1);
					}

				} else {
					// 杀手赢
					log.info("killer win" + overMessage);
					for (Long kid : killer) {
						SimpleStatistics ss = existIDS.get(kid);

						// 总胜局+1
						ss.setWin(ss.getWin() + 1);
						// 杀胜局+1
						ss.setKillerWin(ss.getKillerWin() + 1);

					}
					for (Long w : water) {
						SimpleStatistics ss = existIDS.get(w);

						// 总败局+1
						ss.setLose(ss.getLose() + 1);
						// 水败局
						ss.setWaterLose(ss.getWaterLose() + 1);

					}
				}
				// 总局数

				for (Long aid : all) {
					SimpleStatistics ss = existIDS.get(aid);

					ss.setAll(ss.getAll() + 1);

				}

				// 总水数
				for (Long wid : water) {
					SimpleStatistics wss = existIDS.get(wid);
					wss.setWater(wss.getWater() + 1);
					wss.setRole(RoleUtil.setRole(RoleUtil.Role_Water, wss.getRole()));
					wss.setMaxWater(RoleUtil.getMaxContinueRole(RoleUtil.Role_Water, wss.getRole()));
					
				}
				// 总杀手数
				for (Long kid : killer) {
					SimpleStatistics wss = existIDS.get(kid);
					wss.setKiller(wss.getKiller() + 1);
					wss.setRole(RoleUtil.setRole(RoleUtil.Role_Killer, wss.getRole()));
					wss.setMaxKiller(RoleUtil.getMaxContinueRole(RoleUtil.Role_Killer, wss.getRole()));

				}

			}

		}
		log.info("start update");
		// 3.update
		int indexUpdate = 0;

		for (SimpleStatistics ss : existIDS.values()) {
			indexUpdate++;
			log.info("update " + indexUpdate);
			Thread.sleep(20);
			this.simpleStatisticsService.update(ss);
		}
	}

	private void mapAppendValue(Map<Integer, Set<Long>> map, Integer key, Long value) {
		Set<Long> values = map.get(key);
		if (values == null) {
			values = new HashSet();
		} else {

		}
		values.add(value);
		map.put(key, values);

	}

	public static void main(String[] args) throws SecurityException, ServiceException, ServiceDaoException, InterruptedException, IllegalAccessException, NoSuchFieldException {
		// dao
		log.info("start calculate ");
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext*.xml");
		RecordStastisticsEtl etl = (RecordStastisticsEtl) context.getBean("recordStastisticsEtl");

		etl.calculateProcess("all",null);
		log.info("over");
	}

}
