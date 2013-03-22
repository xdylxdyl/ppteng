package com.gemantic.labs.killer.etl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.util.MessageUtil;
import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.model.SimpleStatistics;
import com.gemantic.labs.killer.service.RecordService;
import com.gemantic.labs.killer.service.SimpleStatisticsService;

@Service
public class RecordStastisticsEtl {

	private static final Log log = LogFactory.getLog(RecordStastisticsEtl.class);

	@Autowired
	private RecordService recordService;
	@Autowired
	private SimpleStatisticsService simpleStatisticsService;

	 @Scheduled(cron="0 4 4 * * ?")
	// @Scheduled(fixedDelay=5000)
	public void calculate() throws ServiceException, ServiceDaoException, InterruptedException {

		// List<Long> lists = recordService.getRecordIdsByVersion("simple_1.0",
		// 0, Integer.MAX_VALUE);
		List<Long> lists = this.recordService.getRecordIdsByVersionAndCreateAt("simple_1.0", MyTimeUtil.getTodayZeroTimeMillions(), 0, Integer.MAX_VALUE);

		log.info("success get datas " + lists.size());
		List<Records> records = this.recordService.getObjectsByIds(lists);
		log.info("get record size " + records.size());
		int index = 0;
		for (Records record : records) {
			index++;
			Thread.sleep(2000);
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
							log.info("water " + message);
							water.add(uid);

						} else {
							log.info("killer " + message);
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
					log.info("water win " + overMessage);
					for (Long w : water) {
						SimpleStatistics ss = this.simpleStatisticsService.getObjectById(w);
						if (ss == null) {
							ss = new SimpleStatistics(w);
							ss.setWin(ss.getWin() + 1);

							this.simpleStatisticsService.insert(ss);

						} else {
							ss.setWin(ss.getWin() + 1);

							this.simpleStatisticsService.update(ss);
						}

					}
					for (Long kid : killer) {
						SimpleStatistics ss = this.simpleStatisticsService.getObjectById(kid);
						if (ss == null) {
							ss = new SimpleStatistics(kid);
							ss.setLose(ss.getLose() + 1);

							this.simpleStatisticsService.insert(ss);
						} else {
							ss.setLose(ss.getLose() + 1);

							this.simpleStatisticsService.update(ss);
						}

					}

				} else {
					log.info("killer win" + overMessage);
					for (Long kid : killer) {
						SimpleStatistics ss = this.simpleStatisticsService.getObjectById(kid);
						if (ss == null) {
							ss = new SimpleStatistics(kid);
							ss.setWin(ss.getWin() + 1);

							this.simpleStatisticsService.insert(ss);
						} else {
							ss.setWin(ss.getWin() + 1);

							this.simpleStatisticsService.update(ss);
						}

					}
					for (Long w : water) {
						SimpleStatistics ss = this.simpleStatisticsService.getObjectById(w);
						if (ss == null) {
							ss = new SimpleStatistics(w);
							ss.setLose(ss.getLose() + 1);

							this.simpleStatisticsService.insert(ss);

						} else {
							ss.setLose(ss.getLose() + 1);

							this.simpleStatisticsService.update(ss);
						}

					}
				}
				for (Long aid : all) {
					SimpleStatistics ss = this.simpleStatisticsService.getObjectById(aid);
					if (ss == null) {
						ss = new SimpleStatistics(aid);
						ss.setAll(ss.getAll() + 1);

						this.simpleStatisticsService.insert(ss);
					} else {
						ss.setAll(ss.getAll() + 1);

						this.simpleStatisticsService.update(ss);
					}

				}

			}

		}
		// TODO 增加自己的验证逻辑

	}

}
