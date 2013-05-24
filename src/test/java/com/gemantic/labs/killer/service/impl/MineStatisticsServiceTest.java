package com.gemantic.labs.killer.service.impl;

import java.util.List;
import java.util.ArrayList;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.junit.Before;
import java.rmi.Naming;

import com.gemantic.killer.service.MineStatisticsService;
import com.gemantic.labs.killer.model.MineStatistics;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

public class MineStatisticsServiceTest {

	private static final Log log = LogFactory
			.getLog(MineStatisticsServiceTest.class);

	private MineStatisticsService mineStatisticsService;

	//@Before
	public void setUp() throws Exception {

		// dao
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath:applicationContext*.xml");
		mineStatisticsService = (MineStatisticsService) context
				.getBean("mineStatisticsServiceImpl");
		// local server
		/**
		 * mineStatisticsService = (MineStatisticsService)
		 * Naming.lookup("//localhost:8801/MineStatisticsRMIService");
		 **/

		/**
		 * test client ApplicationContext context = new
		 * ClassPathXmlApplicationContext
		 * ("classpath:META-INF/spring/applicationContext-sca.xml");
		 * mineStatisticsService = (MineStatisticsService)
		 * context.getBean("mineStatisticsService");
		 **/

	}

	//@Test
	public void testCRUD() throws ServiceException, ServiceDaoException {

		// 1.增加

		MineStatistics mineStatistics = new MineStatistics();
		mineStatistics.setId(3L);

		mineStatistics.setUid(20L);

		mineStatistics.setSetting("333");

		mineStatistics.setTime(400L);

		Long id = this.mineStatisticsService.insert(mineStatistics);

		mineStatistics = this.mineStatisticsService.getObjectById(id);

		MineStatistics mineStatistics2 = this.mineStatisticsService
				.getObjectById(id);
		Assert.assertNotNull(mineStatistics2);

		// 2. 更改
		mineStatistics.setUid(20L);
		mineStatistics.setSetting("44444");
		mineStatistics.setTime(200L);
		boolean success = this.mineStatisticsService.update(mineStatistics);
		Assert.assertEquals(true, success);
		MineStatistics mineStatistics3 = this.mineStatisticsService
				.getObjectById(id);
		// 3.删除
		boolean successDelete = this.mineStatisticsService.delete(id);
		Assert.assertEquals(true, success);
		MineStatistics mineStatistics4 = this.mineStatisticsService
				.getObjectById(id);
		Assert.assertNull(mineStatistics4);

		// 4.batchInsert
		List<MineStatistics> list = new ArrayList<MineStatistics>();
		MineStatistics mineStatistics5 = new MineStatistics();

		mineStatistics5.setId(4L);
		mineStatistics5.setUid(20L);

		mineStatistics5.setSetting("333");

		mineStatistics5.setTime(400L);

		list.add(mineStatistics5);
		MineStatistics mineStatistics6 = new MineStatistics();

		mineStatistics6.setId(7L);
		mineStatistics6.setUid(20L);

		mineStatistics6.setSetting("44444");

		mineStatistics6.setTime(200L);

		list.add(mineStatistics6);
		List<MineStatistics> insertResults = this.mineStatisticsService
				.insertList(list);
		Assert.assertEquals(2, insertResults.size());
		// 5.batchGet
		List<Long> ids = new ArrayList<Long>();
		for (MineStatistics o : insertResults) {
			ids.add(o.getId());
		}

		List<MineStatistics> getResults = this.mineStatisticsService
				.getObjectsByIds(ids);
		Assert.assertEquals(2, getResults.size());

		for (MineStatistics o : insertResults) {
			this.mineStatisticsService.delete(o.getId());
		}

		// 6.batchUpdate

	}

	//@Test
	public void getMineStatisticsIdsBySettingAndUidOrderByTime()
			throws ServiceException, ServiceDaoException {
		List<MineStatistics> list = new ArrayList<MineStatistics>();
		MineStatistics mineStatistics1 = new MineStatistics();

		mineStatistics1.setId(8L);
		mineStatistics1.setUid(20L);

		mineStatistics1.setSetting("333");

		mineStatistics1.setTime(400L);

		list.add(mineStatistics1);
		MineStatistics mineStatistics2 = new MineStatistics();

		mineStatistics2.setId(9L);
		mineStatistics2.setUid(20L);

		mineStatistics2.setSetting("44444");

		mineStatistics2.setTime(200L);

		list.add(mineStatistics2);
		List<MineStatistics> insertResults = this.mineStatisticsService
				.insertList(list);

		List<Long> lists = mineStatisticsService
				.getMineStatisticsIdsBySettingAndUidOrderByTime("333", 20L, 0,
						Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (MineStatistics o : insertResults) {
			this.mineStatisticsService.delete(o.getId());
		}

	};

	//@Test
	public void getMineStatisticsIdsBySettingOrderByTime()
			throws ServiceException, ServiceDaoException {
		List<MineStatistics> list = new ArrayList<MineStatistics>();
		MineStatistics mineStatistics1 = new MineStatistics();
		mineStatistics1.setId(10L);
		mineStatistics1.setUid(20L);

		mineStatistics1.setSetting("333");

		mineStatistics1.setTime(400L);

		list.add(mineStatistics1);
		MineStatistics mineStatistics2 = new MineStatistics();
		mineStatistics2.setId(11L);
		mineStatistics2.setUid(20L);

		mineStatistics2.setSetting("44444");

		mineStatistics2.setTime(200L);

		list.add(mineStatistics2);
		List<MineStatistics> insertResults = this.mineStatisticsService
				.insertList(list);

		List<Long> lists = mineStatisticsService
				.getMineStatisticsIdsBySettingOrderByTime("333", 0,
						Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (MineStatistics o : insertResults) {
			this.mineStatisticsService.delete(o.getId());
		}

	};

	@Test
	public void testNULL() throws ServiceException, ServiceDaoException {

	};
}
