package com.gemantic.labs.killer.service.impl;

import java.util.List;
import java.util.ArrayList;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.junit.Before;

import java.io.IOException;
import java.rmi.Naming;

import com.gemantic.killer.util.BombUtil;
import com.gemantic.labs.killer.model.MineTrain;
import com.gemantic.labs.killer.service.MineTrainService;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.FileUtil;

public class MineTrainServiceTest {

	private static final Log log = LogFactory
			.getLog(MineTrainServiceTest.class);

	private MineTrainService mineTrainService;

	// @Before
	public void setUp() throws Exception {

		// dao
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath:applicationContext*.xml");
		mineTrainService = (MineTrainService) context
				.getBean("mineTrainServiceImpl");
		// local server
		/**
		 * mineTrainService = (MineTrainService)
		 * Naming.lookup("//localhost:8801/MineTrainRMIService");
		 **/

		/**
		 * test client ApplicationContext context = new
		 * ClassPathXmlApplicationContext
		 * ("classpath:META-INF/spring/applicationContext-sca.xml");
		 * mineTrainService = (MineTrainService)
		 * context.getBean("mineTrainService");
		 **/

	}

	// @Test
	public void testCRUD() throws ServiceException, ServiceDaoException {

		// 1.增加

		MineTrain mineTrain = new MineTrain();

		mineTrain.setRowCount(4);

		mineTrain.setColumnCount(4);

		mineTrain.setMineCount(2);

		mineTrain.setContent("111111");

		Long id = this.mineTrainService.insert(mineTrain);

		mineTrain = this.mineTrainService.getObjectById(id);

		MineTrain mineTrain2 = this.mineTrainService.getObjectById(id);
		Assert.assertNotNull(mineTrain2);

		// 2. 更改
		mineTrain.setRowCount(3);
		mineTrain.setColumnCount(3);
		mineTrain.setMineCount(1);
		mineTrain.setContent("1111111");
		boolean success = this.mineTrainService.update(mineTrain);
		Assert.assertEquals(true, success);
		MineTrain mineTrain3 = this.mineTrainService.getObjectById(id);
		// 3.删除
		boolean successDelete = this.mineTrainService.delete(id);
		Assert.assertEquals(true, success);
		MineTrain mineTrain4 = this.mineTrainService.getObjectById(id);
		Assert.assertNull(mineTrain4);

		// 4.batchInsert
		List<MineTrain> list = new ArrayList<MineTrain>();
		MineTrain mineTrain5 = new MineTrain();

		mineTrain5.setRowCount(4);

		mineTrain5.setColumnCount(4);

		mineTrain5.setMineCount(2);

		mineTrain5.setContent("111111");

		list.add(mineTrain5);
		MineTrain mineTrain6 = new MineTrain();

		mineTrain6.setRowCount(3);

		mineTrain6.setColumnCount(3);

		mineTrain6.setMineCount(1);

		mineTrain6.setContent("1111111");

		list.add(mineTrain6);
		List<MineTrain> insertResults = this.mineTrainService.insertList(list);
		Assert.assertEquals(2, insertResults.size());
		// 5.batchGet
		List<Long> ids = new ArrayList<Long>();
		for (MineTrain o : insertResults) {
			ids.add(o.getId());
		}

		List<MineTrain> getResults = this.mineTrainService.getObjectsByIds(ids);
		Assert.assertEquals(2, getResults.size());

		for (MineTrain o : insertResults) {
			this.mineTrainService.delete(o.getId());
		}

		// 6.batchUpdate

	}

	@Test
	public void testNULL() throws ServiceException, ServiceDaoException {

	};

	public static void main(String[] args) throws Exception {
		MineTrainServiceTest test = new MineTrainServiceTest();
		test.setUp();
		test.insertData();
	}

	private void insertData() throws IOException, ServiceException, ServiceDaoException {
		List<String> contents = FileUtil
				.readFileAsList("d:/data/trainMine.txt");
		MineTrain old = null;
		StringBuffer sb = new StringBuffer();
		for (String line : contents) {
			log.info(line);
			if(StringUtils.isBlank(line)){
				continue;
			}

			line=line.trim();
			if (line.startsWith("#")) {
				sb = sb.append(line);
			} else {

				if (old == null) {

				} else {
					log.info("start insert data "+old);
					String c=sb.toString().replace("#", "");
					String system=BombUtil.generateSystemContent(old.getRowCount(),old.getColumnCount(),c);
					String c2=c.replace("*", "n");
					old.setContent(c2);
					old.setSystemContent(system);
					log.info(old);
					this.insert(old);
					sb = new StringBuffer();

				}
				if(line.equals("end")){
					break;
				}
				String[] lines = line.trim().split(",");
				MineTrain mt = new MineTrain(Integer.valueOf(lines[0]),
						Integer.valueOf(lines[1]), Integer.valueOf(lines[2]),
						"","");
				old = mt;

			}

		}

	}

	private void insert(MineTrain old) throws ServiceException, ServiceDaoException {
		this.mineTrainService.insert(old);
		
	}

}
