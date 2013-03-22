package com.gemantic.labs.killer.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.labs.killer.model.SimpleStatistics;
import com.gemantic.labs.killer.service.SimpleStatisticsService;

public class SimpleStatisticsServiceTest {

	private static final Log log = LogFactory.getLog(SimpleStatisticsServiceTest.class);

	private SimpleStatisticsService simpleStatisticsService;

	// @Before
	public void setUp() throws Exception {

		// dao
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext*.xml");
		simpleStatisticsService = (SimpleStatisticsService) context.getBean("simpleStatisticsServiceImpl");
		// local server
		/**
		 * simpleStatisticsService = (SimpleStatisticsService)
		 * Naming.lookup("//localhost:8801/SimpleStatisticsRMIService");
		 **/

		/**
		 * test client ApplicationContext context = new
		 * ClassPathXmlApplicationContext
		 * ("classpath:META-INF/spring/applicationContext-sca.xml");
		 * simpleStatisticsService = (SimpleStatisticsService)
		 * context.getBean("simpleStatisticsService");
		 **/

	}

	// @Test
	public void testCRUD() throws ServiceException, ServiceDaoException {

		// 1.增加

		SimpleStatistics simpleStatistics = new SimpleStatistics();
		simpleStatistics.setId(3L);

		simpleStatistics.setWin(20);

		simpleStatistics.setLose(333);

		simpleStatistics.setAll(353);

		Long id = this.simpleStatisticsService.insert(simpleStatistics);

		simpleStatistics = this.simpleStatisticsService.getObjectById(id);

		SimpleStatistics simpleStatistics2 = this.simpleStatisticsService.getObjectById(id);
		Assert.assertNotNull(simpleStatistics2);

		// 2. 更改
		simpleStatistics2.setId(4L);
		simpleStatistics2.setWin(20);
		simpleStatistics2.setLose(44444);
		simpleStatistics2.setAll(353);
		boolean success = this.simpleStatisticsService.update(simpleStatistics);
		Assert.assertEquals(true, success);
		SimpleStatistics simpleStatistics3 = this.simpleStatisticsService.getObjectById(id);
		// 3.删除
		boolean successDelete = this.simpleStatisticsService.delete(id);
		Assert.assertEquals(true, success);
		SimpleStatistics simpleStatistics4 = this.simpleStatisticsService.getObjectById(id);
		Assert.assertNull(simpleStatistics4);

		// 4.batchInsert
		List<SimpleStatistics> list = new ArrayList<SimpleStatistics>();
		SimpleStatistics simpleStatistics5 = new SimpleStatistics();
		simpleStatistics5.setId(6L);
		simpleStatistics5.setWin(20);

		simpleStatistics5.setLose(333);

		simpleStatistics5.setAll(353);

		list.add(simpleStatistics5);
		SimpleStatistics simpleStatistics6 = new SimpleStatistics();
		simpleStatistics6.setId(5L);
		simpleStatistics6.setWin(20);

		simpleStatistics6.setLose(44444);

		simpleStatistics6.setAll(44464);

		list.add(simpleStatistics6);
		List<SimpleStatistics> insertResults = this.simpleStatisticsService.insertList(list);
		Assert.assertEquals(2, insertResults.size());
		// 5.batchGet
		List<Long> ids = new ArrayList<Long>();
		for (SimpleStatistics o : insertResults) {
			ids.add(o.getId());
		}

		List<SimpleStatistics> getResults = this.simpleStatisticsService.getObjectsByIds(ids);
		Assert.assertEquals(2, getResults.size());

		for (SimpleStatistics o : insertResults) {
			this.simpleStatisticsService.delete(o.getId());
		}

		// 6.batchUpdate

	}

	//@Test
	public void testQuery() throws ServiceException, ServiceDaoException{
	List<Long>	ids=this.simpleStatisticsService.getSimpleStatisticsIDSByQuery("all","desc",0,20);
	log.info(ids);
	}
	@Test
	public void testNULL() throws ServiceException, ServiceDaoException {

	};
}
