package com.gemantic.analyse.tag.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.gemantic.analyse.tag.model.TagUserStock;
import com.gemantic.analyse.tag.service.TagUserStockService;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

public class TagUserStockServiceTest {

	private static final Log log = LogFactory.getLog(TagUserStockServiceTest.class);

	private TagUserStockService tagUserStockService;
    private ConfigurableApplicationContext  context;
    
    
	//@Before
	public void setUp() throws Exception {
      
		
		log.info(" load spring ");
		// dao
		context =new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
		tagUserStockService = (TagUserStockService) context.getBean("tagUserStockServiceImpl");
		// local server
		/**
		 * tagUserStockService = (TagUserStockService)
		 * Naming.lookup("//localhost:8371/TagUserStockRMIService");
		 **/

		/**
		 * test client ApplicationContext context = new
		 * ClassPathXmlApplicationContext
		 * ("classpath:META-INF/spring/applicationContext-sca.xml");
		 * tagUserStockService = (TagUserStockService)
		 * context.getBean("tagUserStockService");
		 **/

	}
	//@After
	public void destory(){
		context.close();
		log.info(" how to destory ");
		
	}

	//@Test
	public void testCRUD() throws ServiceException, ServiceDaoException {

		// 1.增加

		TagUserStock tagUserStock = new TagUserStock();

		tagUserStock.setTagId(-1L);

		tagUserStock.setUserId(-1L);

		tagUserStock.setSymbol("-1");

		Long id = this.tagUserStockService.insert(tagUserStock);

		tagUserStock = this.tagUserStockService.getObjectById(id);

		TagUserStock tagUserStock2 = this.tagUserStockService.getObjectById(id);
		Assert.assertNotNull(tagUserStock2);

		// 2. 更改

		tagUserStock.setTagId(-2L);

		tagUserStock.setUserId(-2L);

		tagUserStock.setSymbol("-2");

		boolean success = this.tagUserStockService.update(tagUserStock);
		Assert.assertEquals(true, success);
		TagUserStock tagUserStock3 = this.tagUserStockService.getObjectById(id);
		Assert.assertEquals(new Long(-2L), tagUserStock3.getTagId());
		Assert.assertEquals(new Long(-2L), tagUserStock3.getUserId());
		Assert.assertEquals(new String("-2"), tagUserStock3.getSymbol());
		// 3.删除
		boolean successDelete = this.tagUserStockService.delete(id);
		Assert.assertEquals(true, success);
		TagUserStock tagUserStock4 = this.tagUserStockService.getObjectById(id);
		Assert.assertNull(tagUserStock4);

		// 4.batchInsert
		List<TagUserStock> list = new ArrayList<TagUserStock>();
		TagUserStock tagUserStock5 = new TagUserStock();

		tagUserStock5.setTagId(-1L);

		tagUserStock5.setUserId(-1L);

		tagUserStock5.setSymbol("-1");

		list.add(tagUserStock5);
		TagUserStock tagUserStock6 = new TagUserStock();

		tagUserStock6.setTagId(-2L);

		tagUserStock6.setUserId(-2L);

		tagUserStock6.setSymbol("-2");

		list.add(tagUserStock6);
		List<TagUserStock> insertResults = this.tagUserStockService.insertList(list);
		Assert.assertEquals(2, insertResults.size());
		// 5.batchGet
		List<Long> ids = new ArrayList<Long>();
		for (TagUserStock o : insertResults) {
			ids.add(o.getId());
		}

		List<TagUserStock> getResults = this.tagUserStockService.getObjectsByIds(ids);
		Assert.assertEquals(2, getResults.size());

		for (TagUserStock o : insertResults) {
			this.tagUserStockService.delete(o.getId());
		}

		// 6.batchUpdate

	}

	// @Test
	public void getTagUserStockIdsBySymbol() throws ServiceException, ServiceDaoException {
		List<TagUserStock> list = new ArrayList<TagUserStock>();
		TagUserStock tagUserStock1 = new TagUserStock();

		tagUserStock1.setTagId(-1L);

		tagUserStock1.setUserId(-1L);

		tagUserStock1.setSymbol("-1");

		list.add(tagUserStock1);
		TagUserStock tagUserStock2 = new TagUserStock();

		tagUserStock2.setTagId(-2L);

		tagUserStock2.setUserId(-2L);

		tagUserStock2.setSymbol("-2");

		list.add(tagUserStock2);
		List<TagUserStock> insertResults = this.tagUserStockService.insertList(list);

		List<Long> lists = tagUserStockService.getTagUserStockIdsBySymbol("-1", 0, Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (TagUserStock o : insertResults) {
			this.tagUserStockService.delete(o.getId());
		}

	};

	// @Test
	public void getTagUserStockIdsByUserId() throws ServiceException, ServiceDaoException {
		List<TagUserStock> list = new ArrayList<TagUserStock>();
		TagUserStock tagUserStock1 = new TagUserStock();

		tagUserStock1.setTagId(-1L);

		tagUserStock1.setUserId(-1L);

		tagUserStock1.setSymbol("-1");

		list.add(tagUserStock1);
		TagUserStock tagUserStock2 = new TagUserStock();

		tagUserStock2.setTagId(-2L);

		tagUserStock2.setUserId(-2L);

		tagUserStock2.setSymbol("-2");

		list.add(tagUserStock2);
		List<TagUserStock> insertResults = this.tagUserStockService.insertList(list);

		List<Long> lists = tagUserStockService.getTagUserStockIdsByUserId(-1L, 0, Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (TagUserStock o : insertResults) {
			this.tagUserStockService.delete(o.getId());
		}

	};

	// @Test
	public void getTagUserStockIdsByTagId() throws ServiceException, ServiceDaoException {
		List<TagUserStock> list = new ArrayList<TagUserStock>();
		TagUserStock tagUserStock1 = new TagUserStock();

		tagUserStock1.setTagId(-1L);

		tagUserStock1.setUserId(-1L);

		tagUserStock1.setSymbol("-1");

		list.add(tagUserStock1);
		TagUserStock tagUserStock2 = new TagUserStock();

		tagUserStock2.setTagId(-2L);

		tagUserStock2.setUserId(-2L);

		tagUserStock2.setSymbol("-2");

		list.add(tagUserStock2);
		List<TagUserStock> insertResults = this.tagUserStockService.insertList(list);

		List<Long> lists = tagUserStockService.getTagUserStockIdsByTagId(-1L, 0, Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (TagUserStock o : insertResults) {
			this.tagUserStockService.delete(o.getId());
		}

	};
	
	
	
	//@Test
	public void getTagUserStockIdBySymbolAndTagIdAndUserId() throws ServiceException, ServiceDaoException {
		List<TagUserStock> list = new ArrayList<TagUserStock>();
		TagUserStock tagUserStock1 = new TagUserStock();

		tagUserStock1.setTagId(-1L);

		tagUserStock1.setUserId(-1L);

		tagUserStock1.setSymbol("-1");

		list.add(tagUserStock1);
		TagUserStock tagUserStock2 = new TagUserStock();

		tagUserStock2.setTagId(-2L);

		tagUserStock2.setUserId(-2L);

		tagUserStock2.setSymbol("-2");

		list.add(tagUserStock2);
		List<TagUserStock> insertResults = this.tagUserStockService.insertList(list);

		Long lists = tagUserStockService.getTagUserStockIdBySymbolAndTagIdAndUserId("-1", -1L, -1L);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (TagUserStock o : insertResults) {
			this.tagUserStockService.delete(o.getId());
		}

	};
	
	 //@Test
	public void getTagUserStockIdsByTagIdAndUserId() throws ServiceException, ServiceDaoException {
		List<TagUserStock> list = new ArrayList<TagUserStock>();
		TagUserStock tagUserStock1 = new TagUserStock();

		tagUserStock1.setTagId(-1L);

		tagUserStock1.setUserId(-1L);

		tagUserStock1.setSymbol("-1");

		list.add(tagUserStock1);
		TagUserStock tagUserStock2 = new TagUserStock();

		tagUserStock2.setTagId(-2L);

		tagUserStock2.setUserId(-2L);

		tagUserStock2.setSymbol("-2");

		list.add(tagUserStock2);
		List<TagUserStock> insertResults = this.tagUserStockService.insertList(list);

		List<Long> lists = tagUserStockService.getTagUserStockIdsByTagIdAndUserId(-1L, -1L, 0, Integer.MAX_VALUE);
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (TagUserStock o : insertResults) {
			this.tagUserStockService.delete(o.getId());
		}

	};
	
	@Test
	public void testNULL() throws ServiceException, ServiceDaoException {

		
		log.info(" i am run ");
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
