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

import com.gemantic.labs.killer.model.MoneyFlow;
import com.gemantic.labs.killer.service.MoneyFlowService;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

public class MoneyFlowServiceTest {

	private static final Log log = LogFactory.getLog(MoneyFlowServiceTest.class);

	private MoneyFlowService moneyFlowService;

	//@Before
	public void setUp() throws Exception {

		// dao
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext*.xml");
		moneyFlowService = (MoneyFlowService) context.getBean("moneyFlowServiceImpl");
		// local server
		/**
		 * moneyFlowService = (MoneyFlowService)
		 * Naming.lookup("//localhost:8801/MoneyFlowRMIService");
		 **/

		/**
		 * test client ApplicationContext context = new
		 * ClassPathXmlApplicationContext
		 * ("classpath:META-INF/spring/applicationContext-sca.xml");
		 * moneyFlowService = (MoneyFlowService)
		 * context.getBean("moneyFlowService");
		 **/

	}

	//@Test
	public void testCRUD() throws ServiceException, ServiceDaoException {

		// 1.增加

		MoneyFlow moneyFlow = new MoneyFlow();

		moneyFlow.setUid(20L);

		moneyFlow.setFid(20L);

		moneyFlow.setMoney(333);

		moneyFlow.setComments("奖金发放");

		moneyFlow.setHappenAt(4444444L);

		Long id = this.moneyFlowService.insert(moneyFlow);

		moneyFlow = this.moneyFlowService.getObjectById(id);

		MoneyFlow moneyFlow2 = this.moneyFlowService.getObjectById(id);
		Assert.assertNotNull(moneyFlow2);

		// 2. 更改
		moneyFlow.setUid(20L);
		moneyFlow.setFid(20L);
		moneyFlow.setMoney(44444);
		moneyFlow.setComments("转帐");
		moneyFlow.setHappenAt(77887878L);
		boolean success = this.moneyFlowService.update(moneyFlow);
		Assert.assertEquals(true, success);
		MoneyFlow moneyFlow3 = this.moneyFlowService.getObjectById(id);
		// 3.删除
		boolean successDelete = this.moneyFlowService.delete(id);
		Assert.assertEquals(true, success);
		MoneyFlow moneyFlow4 = this.moneyFlowService.getObjectById(id);
		Assert.assertNull(moneyFlow4);

		// 4.batchInsert
		List<MoneyFlow> list = new ArrayList<MoneyFlow>();
		MoneyFlow moneyFlow5 = new MoneyFlow();

		moneyFlow5.setUid(20L);

		moneyFlow5.setFid(20L);

		moneyFlow5.setMoney(333);

		moneyFlow5.setComments("奖金发放");

		moneyFlow5.setHappenAt(4444444L);

		list.add(moneyFlow5);
		MoneyFlow moneyFlow6 = new MoneyFlow();

		moneyFlow6.setUid(20L);

		moneyFlow6.setFid(20L);

		moneyFlow6.setMoney(44444);

		moneyFlow6.setComments("转帐");

		moneyFlow6.setHappenAt(77887878L);

		list.add(moneyFlow6);
		List<MoneyFlow> insertResults = this.moneyFlowService.insertList(list);
		Assert.assertEquals(2, insertResults.size());
		// 5.batchGet
		List<Long> ids = new ArrayList<Long>();
		for (MoneyFlow o : insertResults) {
			ids.add(o.getId());
		}

		List<MoneyFlow> getResults = this.moneyFlowService.getObjectsByIds(ids);
		Assert.assertEquals(2, getResults.size());

		for (MoneyFlow o : insertResults) {
			this.moneyFlowService.delete(o.getId());
		}

		// 6.batchUpdate

	}

	//@Test
	public void getMoneyFlowIdsByFid() throws ServiceException, ServiceDaoException {
		List<MoneyFlow> list = new ArrayList<MoneyFlow>();
		MoneyFlow moneyFlow1 = new MoneyFlow();

		moneyFlow1.setUid(20L);

		moneyFlow1.setFid(20L);

		moneyFlow1.setMoney(333);

		moneyFlow1.setComments("奖金发放");

		moneyFlow1.setHappenAt(4444444L);

		list.add(moneyFlow1);
		MoneyFlow moneyFlow2 = new MoneyFlow();

		moneyFlow2.setUid(20L);

		moneyFlow2.setFid(20L);

		moneyFlow2.setMoney(44444);

		moneyFlow2.setComments("转帐");

		moneyFlow2.setHappenAt(77887878L);

		list.add(moneyFlow2);
		List<MoneyFlow> insertResults = this.moneyFlowService.insertList(list);

		List<Long> lists = moneyFlowService.getMoneyFlowIdsByFid(20L, 0, Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (MoneyFlow o : insertResults) {
			this.moneyFlowService.delete(o.getId());
		}

	};

	//@Test
	public void getMoneyFlowIdsByUid() throws ServiceException, ServiceDaoException {
		List<MoneyFlow> list = new ArrayList<MoneyFlow>();
		MoneyFlow moneyFlow1 = new MoneyFlow();

		moneyFlow1.setUid(20L);

		moneyFlow1.setFid(20L);

		moneyFlow1.setMoney(333);

		moneyFlow1.setComments("奖金发放");

		moneyFlow1.setHappenAt(4444444L);

		list.add(moneyFlow1);
		MoneyFlow moneyFlow2 = new MoneyFlow();

		moneyFlow2.setUid(20L);

		moneyFlow2.setFid(20L);

		moneyFlow2.setMoney(44444);

		moneyFlow2.setComments("转帐");

		moneyFlow2.setHappenAt(77887878L);

		list.add(moneyFlow2);
		List<MoneyFlow> insertResults = this.moneyFlowService.insertList(list);

		List<Long> lists = moneyFlowService.getMoneyFlowIdsByUid(20L, 0, Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (MoneyFlow o : insertResults) {
			this.moneyFlowService.delete(o.getId());
		}

	};

	@Test
	public void testNULL() throws ServiceException, ServiceDaoException {

	};
}
