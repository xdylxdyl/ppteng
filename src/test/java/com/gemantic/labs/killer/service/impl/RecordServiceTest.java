package com.gemantic.labs.killer.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.util.MessageUtil;
import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.model.SimpleStatistics;
import com.gemantic.labs.killer.service.RecordService;
import com.gemantic.labs.killer.service.SimpleStatisticsService;

public class RecordServiceTest {

	private static final Log log = LogFactory.getLog(RecordServiceTest.class);

	private RecordService recordService;

	private SimpleStatisticsService simpleStatisticsService;

	//@Before
	public void setUp() throws Exception {

		// dao
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext*.xml");
		recordService = (RecordService) context.getBean("recordServiceImpl");

		simpleStatisticsService = (SimpleStatisticsService) context.getBean("simpleStatisticsServiceImpl");

		// local server
		/**
		 * recordService = (RecordService)
		 * Naming.lookup("//localhost:8801/RecordRMIService");
		 **/

		/**
		 * test client ApplicationContext context = new
		 * ClassPathXmlApplicationContext
		 * ("classpath:META-INF/spring/applicationContext-sca.xml");
		 * recordService = (RecordService) context.getBean("recordService");
		 **/

	}

	// @Test
	public void testCRUD() throws ServiceException, ServiceDaoException {

		// 1.增加

		Records record = new Records();

		record.setPath("");

		record.setVersion("");

		record.setTime(333L);

		record.setSnapshot("");

		Long id = this.recordService.insert(record);
		log.info("insert success " + id);

		record = this.recordService.getObjectById(id);

		Records record2 = this.recordService.getObjectById(id);
		Assert.assertNotNull(record2);

		// 2. 更改
		record.setPath("tt2.txt");
		record.setVersion("mine_1.0");

		record.setTime(44444L);
		record.setSnapshot("{}");
		boolean success = this.recordService.update(record);
		Assert.assertEquals(true, success);
		Records record3 = this.recordService.getObjectById(id);
		// 3.删除
		boolean successDelete = this.recordService.delete(id);
		Assert.assertEquals(true, success);
		Records record4 = this.recordService.getObjectById(id);
		Assert.assertNull(record4);

		// 4.batchInsert
		List<Records> list = new ArrayList<Records>();
		Records record5 = new Records();

		record5.setPath("tt.txt");

		record5.setVersion("simple_1.0");

		record5.setTime(333L);

		record5.setSnapshot("{}");

		list.add(record5);
		Records record6 = new Records();

		record6.setPath("tt2.txt");

		record6.setVersion("mine_1.0");

		record6.setTime(44444L);

		record6.setSnapshot("{}");

		list.add(record6);
		List<Records> insertResults = this.recordService.insertList(list);
		Assert.assertEquals(2, insertResults.size());
		// 5.batchGet
		List<Long> ids = new ArrayList<Long>();
		for (Records o : insertResults) {
			ids.add(o.getId());
		}

		List<Records> getResults = this.recordService.getObjectsByIds(ids);
		Assert.assertEquals(2, getResults.size());

		for (Records o : insertResults) {
			this.recordService.delete(o.getId());
		}

		// 6.batchUpdate

	}

	// @Test
	public void getRecordIdsByVersion() throws ServiceException, ServiceDaoException {

		List<Records> list = new ArrayList<Records>();
		Records record1 = new Records();
		record1.setId(RandomUtils.nextLong());

		record1.setPath("tt.txt");

		record1.setVersion("simple_1.0");

		record1.setTime(333L);

		record1.setSnapshot("{}");

		list.add(record1);
		Records record2 = new Records();
		record2.setId(RandomUtils.nextLong());

		record2.setPath("tt2.txt");

		record2.setVersion("mine_1.0");

		record2.setTime(44444L);

		record2.setSnapshot("{}");

		list.add(record2);
		List<Records> insertResults = this.recordService.insertList(list);

		List<Long> lists = recordService.getRecordIdsByVersion("simple_1.0", 0, Integer.MAX_VALUE);
		log.info("success get datas " + lists);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (Records o : insertResults) {
			this.recordService.delete(o.getId());
		}

	};

	//@Test
	public void getRecordIdsByVersionssssss() throws ServiceException, ServiceDaoException, IOException, InterruptedException {

		List<Long> lists = recordService.getRecordIdsByVersion("simple_1.0", 0, Integer.MAX_VALUE);
		// List<Long>
		// lists=this.recordService.getRecordIdsByVersionAndCreateAt("simple_1.0",MyTimeUtil.getTodayZeroTimeMillions(),
		// 0, Integer.MAX_VALUE);

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

	};

	@Test
	public void testNULL() throws ServiceException, ServiceDaoException {

	};
}
