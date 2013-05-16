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

import com.gemantic.labs.killer.model.UserRecord;
import com.gemantic.labs.killer.service.UserRecordService;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

public class UserRecordServiceTest {

	private static final Log log = LogFactory
			.getLog(UserRecordServiceTest.class);

	private UserRecordService userRecordService;

	// @Before
	public void setUp() throws Exception {

		// dao
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath:applicationContext*.xml");
		userRecordService = (UserRecordService) context
				.getBean("userRecordServiceImpl");
		// local server
		/**
		 * userRecordService = (UserRecordService)
		 * Naming.lookup("//localhost:8801/UserRecordRMIService");
		 **/

		/**
		 * test client ApplicationContext context = new
		 * ClassPathXmlApplicationContext
		 * ("classpath:META-INF/spring/applicationContext-sca.xml");
		 * userRecordService = (UserRecordService)
		 * context.getBean("userRecordService");
		 **/

	}

	// @Test
	public void testCRUD() throws ServiceException, ServiceDaoException {

		// 1.增加

		UserRecord userRecord = new UserRecord();

		userRecord.setRid(1L);

		userRecord.setVersion("simple_1.0");

		userRecord.setUid(226L);

		userRecord.setRecordAt(4L);

		Long id = this.userRecordService.insert(userRecord);

		userRecord = this.userRecordService.getObjectById(id);

		UserRecord userRecord2 = this.userRecordService.getObjectById(id);
		Assert.assertNotNull(userRecord2);

		// 2. 更改
		userRecord.setRid(2L);
		userRecord.setVersion("mine_1.0");
		userRecord.setUid(228L);
		userRecord.setRecordAt(5L);
		boolean success = this.userRecordService.update(userRecord);
		Assert.assertEquals(true, success);
		UserRecord userRecord3 = this.userRecordService.getObjectById(id);
		// 3.删除
		boolean successDelete = this.userRecordService.delete(id);
		Assert.assertEquals(true, success);
		UserRecord userRecord4 = this.userRecordService.getObjectById(id);
		Assert.assertNull(userRecord4);

		// 4.batchInsert
		List<UserRecord> list = new ArrayList<UserRecord>();
		UserRecord userRecord5 = new UserRecord();

		userRecord5.setRid(1L);

		userRecord5.setVersion("simple_1.0");

		userRecord5.setUid(226L);

		userRecord5.setRecordAt(4L);

		list.add(userRecord5);
		UserRecord userRecord6 = new UserRecord();

		userRecord6.setRid(2L);

		userRecord6.setVersion("mine_1.0");

		userRecord6.setUid(228L);

		userRecord6.setRecordAt(5L);

		list.add(userRecord6);
		List<UserRecord> insertResults = this.userRecordService
				.insertList(list);
		Assert.assertEquals(2, insertResults.size());
		// 5.batchGet
		List<Long> ids = new ArrayList<Long>();
		for (UserRecord o : insertResults) {
			ids.add(o.getId());
		}

		List<UserRecord> getResults = this.userRecordService
				.getObjectsByIds(ids);
		Assert.assertEquals(2, getResults.size());

		for (UserRecord o : insertResults) {
			this.userRecordService.delete(o.getId());
		}

		// 6.batchUpdate

	}

	// @Test
	public void getUserRecordIdsByVersionAndUidOrderByRecordAt()
			throws ServiceException, ServiceDaoException {
		List<UserRecord> list = new ArrayList<UserRecord>();
		UserRecord userRecord1 = new UserRecord();

		userRecord1.setRid(1L);

		userRecord1.setVersion("simple_1.0");

		userRecord1.setUid(226L);

		userRecord1.setRecordAt(4L);

		list.add(userRecord1);
		UserRecord userRecord2 = new UserRecord();

		userRecord2.setRid(2L);

		userRecord2.setVersion("mine_1.0");

		userRecord2.setUid(228L);

		userRecord2.setRecordAt(5L);

		list.add(userRecord2);
		List<UserRecord> insertResults = this.userRecordService
				.insertList(list);

		List<Long> lists = userRecordService
				.getUserRecordIdsByVersionAndUidOrderByRecordAt("simple_1.0",
						226L, 0, Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (UserRecord o : insertResults) {
			this.userRecordService.delete(o.getId());
		}

	};

	// @Test
	public void getUserRecordIdsByUidOrderByRecordAt() throws ServiceException,
			ServiceDaoException {
		List<UserRecord> list = new ArrayList<UserRecord>();
		UserRecord userRecord1 = new UserRecord();

		userRecord1.setRid(1L);

		userRecord1.setVersion("simple_1.0");

		userRecord1.setUid(226L);

		userRecord1.setRecordAt(4L);

		list.add(userRecord1);
		UserRecord userRecord2 = new UserRecord();

		userRecord2.setRid(2L);

		userRecord2.setVersion("mine_1.0");

		userRecord2.setUid(228L);

		userRecord2.setRecordAt(5L);

		list.add(userRecord2);
		List<UserRecord> insertResults = this.userRecordService
				.insertList(list);

		List<Long> lists = userRecordService
				.getUserRecordIdsByUidOrderByRecordAt(226L, 0,
						Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (UserRecord o : insertResults) {
			this.userRecordService.delete(o.getId());
		}

	};

	@Test
	public void testNULL() throws ServiceException, ServiceDaoException {

	};
}
