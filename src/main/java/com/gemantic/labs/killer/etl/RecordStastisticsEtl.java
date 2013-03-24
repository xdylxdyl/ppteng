package com.gemantic.labs.killer.etl;

import java.util.ArrayList;
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
import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.util.MessageUtil;
import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.model.SimpleStatistics;
import com.gemantic.labs.killer.service.RecordService;
import com.gemantic.labs.killer.service.SimpleStatisticsService;

@Component
public class RecordStastisticsEtl{

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
	public void testQuartz(){
		log.info("======");
	}

	@Scheduled(cron = "0 4 4 * * ?")
	// @Scheduled(fixedDelay=5000)
	public void calculate() throws ServiceException, ServiceDaoException, InterruptedException, SecurityException, IllegalAccessException, NoSuchFieldException {

		calculateProcess("day");

	}

	private void calculateProcess(String type) throws ServiceException, ServiceDaoException, IllegalAccessException, NoSuchFieldException, InterruptedException {
		List<Long> lists ;
		if("day".equals(type)){
			// 1.init all players and init all statistics
			lists = this.recordService.getRecordIdsByVersionAndCreateAt("simple_1.0", MyTimeUtil.getPreZeroTimeMillions(1), 0, Integer.MAX_VALUE);
		}else{
			lists=this.recordService.getRecordIdsByVersion("simple_1.0",  0, Integer.MAX_VALUE);
		}
	

		log.info("success get datas " + lists.size());
		List<Records> records = this.recordService.getObjectsByIds(lists);
		log.info("get record size " + records.size());

		Set<Long> totalPlayers=new HashSet();
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

		// 2.calculate

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
							//log.info("water " + message);
							water.add(uid);

						} else {
							//log.info("killer " + message);
							killer.add(uid);

						}
					}
					if ("over".equals(message.getPredict())) {
						log.info(message);
						overMessage = message;
					} else {

					}
					;

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
				}
				// 总杀手数
				for (Long kid : killer) {
					SimpleStatistics wss = existIDS.get(kid);
					wss.setKiller(wss.getKiller() + 1);

				}

			}

		}
		log.info("start update");
		// 3.update
		int indexUpdate=0;
	
		for (SimpleStatistics ss : existIDS.values()) {
			indexUpdate++;
			log.info("update "+indexUpdate);
			Thread.sleep(20);
			this.simpleStatisticsService.update(ss);
		}

	
		log.info("start update over");
	}

	public static void main(String[] args) throws SecurityException, ServiceException, ServiceDaoException, InterruptedException, IllegalAccessException, NoSuchFieldException {
		// dao
		log.info("start calculate ");
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext*.xml");
		RecordStastisticsEtl etl = (RecordStastisticsEtl) context.getBean("recordStastisticsEtl");
		
	
		etl.calculateProcess("all");
		log.info("over");
	}

}
