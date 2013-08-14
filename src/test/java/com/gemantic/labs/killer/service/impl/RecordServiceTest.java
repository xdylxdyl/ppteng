package com.gemantic.labs.killer.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
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
import com.gemantic.common.util.MyListUtil;
import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.labs.killer.etl.RecordStastisticsEtl;
import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.model.SimpleStatistics;
import com.gemantic.labs.killer.service.RecordService;
import com.gemantic.labs.killer.service.SimpleStatisticsService;

public class RecordServiceTest {

	private static final Log log = LogFactory.getLog(RecordServiceTest.class);

	private RecordService recordService;

	private SimpleStatisticsService simpleStatisticsService;

	private RecordStastisticsEtl recordStastisticsEtl;

	//@Before
	public void setUp() throws Exception {

		// dao
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext*.xml");
		recordService = (RecordService) context.getBean("recordServiceImpl");

		simpleStatisticsService = (SimpleStatisticsService) context.getBean("simpleStatisticsServiceImpl");

		recordStastisticsEtl = (RecordStastisticsEtl) context.getBean("recordStastisticsEtl");

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
	public void getRecordIdsByVersionssssss() throws ServiceException, ServiceDaoException, IOException, InterruptedException, SecurityException, IllegalAccessException, NoSuchFieldException {
		List<Long> lists = this.recordService.getRecordIdsByVersionAndCreateAt("simple_1.0", MyTimeUtil.getTodayZeroTimeMillions(), 0, Integer.MAX_VALUE);

		log.info("success get datas " + lists.size());
		List<Records> records = this.recordService.getObjectsByIds(lists);
		log.info("get record size " + records.size());

		Set<Long> allPlayers = new HashSet();
		for (Records record : records) {
			Map<Long, String> maps = record.getUid_names();
			allPlayers.addAll(maps.keySet());
		}
		allPlayers.add(4444L);
		allPlayers.add(3333L);
		log.info("record get all players " + allPlayers.size());
		List<SimpleStatistics> sss = this.simpleStatisticsService.getObjectsByIds(new ArrayList(allPlayers));
		log.info(allPlayers.size() + " get statistics is " + sss.size());
		Map<Long, SimpleStatistics> existIDS = MyListUtil.convert2ListMap(SimpleStatistics.class.getDeclaredField("id"), sss);
		allPlayers.removeAll(existIDS.keySet());
		log.info("readt create " + allPlayers);
		for (Long ready : allPlayers) {
			SimpleStatistics ss = new SimpleStatistics(ready);
			this.simpleStatisticsService.insert(ss);
		}
		 sss = this.simpleStatisticsService.getObjectsByIds(new ArrayList(allPlayers));
		 log.info(allPlayers.size() + " after init get statistics is " + sss.size());
		 Assert.assertEquals(allPlayers.size(), sss.size());

	};

	@Test
	public void testNULL() throws ServiceException, ServiceDaoException {

	};

	public RecordService getRecordService() {
		return recordService;
	}

	public void setRecordService(RecordService recordService) {
		this.recordService = recordService;
	}

	public SimpleStatisticsService getSimpleStatisticsService() {
		return simpleStatisticsService;
	}

	public void setSimpleStatisticsService(SimpleStatisticsService simpleStatisticsService) {
		this.simpleStatisticsService = simpleStatisticsService;
	}

	public RecordStastisticsEtl getRecordStastisticsEtl() {
		return recordStastisticsEtl;
	}

	public void setRecordStastisticsEtl(RecordStastisticsEtl recordStastisticsEtl) {
		this.recordStastisticsEtl = recordStastisticsEtl;
	}

	public static void main(String[] args) throws ServiceException, ServiceDaoException, InterruptedException {


	}
}
