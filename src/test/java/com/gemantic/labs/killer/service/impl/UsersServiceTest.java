package com.gemantic.labs.killer.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.FileUtil;
import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.killer.model.User;
import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.service.RecordService;
import com.gemantic.labs.killer.service.UsersService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class UsersServiceTest {

	private static final Log log = LogFactory.getLog(UsersServiceTest.class);

	private UsersService usersService;

	private RecordService recordService;
	
	@Before
	public void setUp() throws Exception {

		// dao
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext*.xml");
		usersService = (UsersService) context.getBean("usersServiceImpl");
		recordService = (RecordService) context.getBean("recordServiceImpl");

		// local server
		/**
		 * usersService = (UsersService)
		 * Naming.lookup("//localhost:8801/UsersRMIService");
		 **/

		/**
		 * test client ApplicationContext context = new
		 * ClassPathXmlApplicationContext
		 * ("classpath:META-INF/spring/applicationContext-sca.xml"); usersService
		 * = (UsersService) context.getBean("usersService");
		 **/

	}

	
	@Test
	public void testOrderByPunchAt() throws ServiceException, ServiceDaoException{
		
	 List<Long> ids=this.usersService.getUIdsByPunchAtOrderByPunchAt(MyTimeUtil.getTodayZeroTimeMillions(), 0, Integer.MAX_VALUE);
	 List<User> users=this.usersService.getObjectsByIds(ids);
	 for(User user:users){
		log.info(user); 
	 }
		
	 String content=MyTimeUtil.convertLong2String(1363622400000L, "yyyy-MM-dd HH:mm:ss");
	 log.info(content);
	 
	}
	
	
// @Test
	public void testCRUD() throws ServiceException, ServiceDaoException {

		// 1.增加

		User users = new User();

		users.setName("XDYL");

		users.setPassword("&*(&(");

		users.setEmail("xdylxdyl@163.com");

		users.setPunch("10N2P");

		users.setScore(25);

		users.setIcon("/icon/234123");

		//users.setExpression("[\"xx\",\"qefqef\"]");

		users.setMusic("http://www.killbar.com");

		users.setMoney(34);

		users.setLoginAt(789798L);

		users.setPunchAt(23424L);

		users.setOpenID("ljoiujladfuoiad");

		Long id = this.usersService.insert(users);

		users = this.usersService.getObjectById(id);

		User users2 = this.usersService.getObjectById(id);
		Assert.assertNotNull(users2);

		// 2. 更改
		users.setName("段小成");
		users.setPassword("13134143");
		users.setEmail("liyachong@163.com");
		users.setPunch("10N3P");
		users.setScore(655545);
		users.setIcon("/icon/2342345");
		//users.setExpression("[\"摸摸小手色色的说\"]");
		users.setMusic("http://ww.baidu.com?adfasdf=zxcvd&adadfadf=adfadf");
		users.setMoney(2342);
		users.setLoginAt(465465464L);
		users.setPunchAt(13412341243L);
		users.setOpenID("oiuaoiduo134134");
		boolean success = this.usersService.update(users);
		Assert.assertEquals(true, success);
		User users3 = this.usersService.getObjectById(id);
		// 3.删除
		boolean successDelete = this.usersService.delete(id);
		Assert.assertEquals(true, success);
		User users4 = this.usersService.getObjectById(id);
		Assert.assertNull(users4);

		// 4.batchInsert
		List<User> list = new ArrayList<User>();
		User users5 = new User();

		users5.setName("XDYL");

		users5.setPassword("&*(&(");

		users5.setEmail("xdylxdyl@163.com");

		users5.setPunch("10N2P");

		users5.setScore(25);

		users5.setIcon("/icon/234123");

		//users5.setExpression("[\"xx\",\"qefqef\"]");

		users5.setMusic("http://www.killbar.com");

		users5.setMoney(34);

		users5.setLoginAt(789798L);

		users5.setPunchAt(23424L);

		users5.setOpenID("ljoiujladfuoiad");

		list.add(users5);
		User users6 = new User();

		users6.setName("段小成");

		users6.setPassword("13134143");

		users6.setEmail("liyachong@163.com");

		users6.setPunch("10N3P");

		users6.setScore(655545);

		users6.setIcon("/icon/2342345");

		//users6.setExpression("[\"摸摸小手色色的说\"]");

		users6.setMusic("http://ww.baidu.com?adfasdf=zxcvd&adadfadf=adfadf");

		users6.setMoney(2342);

		users6.setLoginAt(465465464L);

		users6.setPunchAt(13412341243L);

		users6.setOpenID("oiuaoiduo134134");

		list.add(users6);
		List<User> insertResults = this.usersService.insertList(list);
		Assert.assertEquals(2, insertResults.size());
		// 5.batchGet
		List<Long> ids = new ArrayList<Long>();
		for (User o : insertResults) {
			ids.add(o.getId());
		}

		List<User> getResults = this.usersService.getObjectsByIds(ids);
		Assert.assertEquals(2, getResults.size());

		for (User o : insertResults) {
			this.usersService.delete(o.getId());
		}

		// 6.batchUpdate

	}

	// @Test
	public void getUsersIdByOpenID() throws ServiceException, ServiceDaoException {
		List<User> list = new ArrayList<User>();
		User users1 = new User();

		users1.setName("XDYL");

		users1.setPassword("&*(&(");

		users1.setEmail("xdylxdyl@163.com");

		users1.setPunch("10N2P");

		users1.setScore(25);

		users1.setIcon("/icon/234123");

		//users1.setExpression("[\"xx\",\"qefqef\"]");

		users1.setMusic("http://www.killbar.com");

		users1.setMoney(34);

		users1.setLoginAt(789798L);

		users1.setPunchAt(23424L);

		users1.setOpenID("ljoiujladfuoiad");

		list.add(users1);
		User users2 = new User();

		users2.setName("段小成");

		users2.setPassword("13134143");

		users2.setEmail("liyachong@163.com");

		users2.setPunch("10N3P");

		users2.setScore(655545);

		users2.setIcon("/icon/2342345");

		//users2.setExpression("[\"摸摸小手色色的说\"]");

		users2.setMusic("http://ww.baidu.com?adfasdf=zxcvd&adadfadf=adfadf");

		users2.setMoney(2342);

		users2.setLoginAt(465465464L);

		users2.setPunchAt(13412341243L);

		users2.setOpenID("oiuaoiduo134134");

		list.add(users2);
		List<User> insertResults = this.usersService.insertList(list);

		Long lists = usersService.getUsersIdByOpenID("ljoiujladfuoiad");
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (User o : insertResults) {
			this.usersService.delete(o.getId());
		}

	};

	// @Test
	public void getUsersIdByEmail() throws ServiceException, ServiceDaoException {
		List<User> list = new ArrayList<User>();
		User users1 = new User();

		users1.setName("XDYL");

		users1.setPassword("&*(&(");

		users1.setEmail("xdylxdyl@163.com");

		users1.setPunch("10N2P");

		users1.setScore(25);

		users1.setIcon("/icon/234123");

		//users1.setExpression("[\"xx\",\"qefqef\"]");

		users1.setMusic("http://www.killbar.com");

		users1.setMoney(34);

		users1.setLoginAt(789798L);

		users1.setPunchAt(23424L);

		users1.setOpenID("ljoiujladfuoiad");

		list.add(users1);
		User users2 = new User();

		users2.setName("段小成");

		users2.setPassword("13134143");

		users2.setEmail("liyachong@163.com");

		users2.setPunch("10N3P");

		users2.setScore(655545);

		users2.setIcon("/icon/2342345");

		//users2.setExpression("[\"摸摸小手色色的说\"]");

		users2.setMusic("http://ww.baidu.com?adfasdf=zxcvd&adadfadf=adfadf");

		users2.setMoney(2342);

		users2.setLoginAt(465465464L);

		users2.setPunchAt(13412341243L);

		users2.setOpenID("oiuaoiduo134134");

		list.add(users2);
		List<User> insertResults = this.usersService.insertList(list);

		Long lists = usersService.getUsersIdByEmail("xdylxdyl@163.com");
		// TODO 增加自己的验证逻辑
		Assert.assertNotNull(lists);

		for (User o : insertResults) {
			this.usersService.delete(o.getId());
		}

	};

	@Test
	public void testNULL() throws ServiceException, ServiceDaoException {

	};
	
	@Test
	public void testGetAll() throws ServiceException, ServiceDaoException {
		Integer count=this.usersService.getTotalCount();
		log.info("get all users "+count);
		User user=this.usersService.getObjectById(245L);
		log.info("get user is "+user);
	}
	
	//@Test
	public void initData() throws IOException{
		
		String userTest=FileUtil.readFileAsString("d:/data/userTest.txt");
		log.info(userTest);		
		Gson gson = new GsonBuilder().create();
		User test = gson.fromJson(userTest, User.class);
		
		log.info(test);
		String content=FileUtil.readFileAsString("d:/data/userMap.txt");
		log.info(content);
		
		Map<Long,User> map=new HashMap();
		map.put(test.getId(), test);
		
		log.info(gson.toJson(map));
		
		Map<Long, User> userID_USER = gson.fromJson(content, Map.class);
		log.info(userID_USER);
	
		
	}
	
	//@Test
	public void testRecord() throws ServiceException, ServiceDaoException{
		List<Long> ids=this.recordService.getRecordIdsByVersion("simple_1.0", 0, Integer.MAX_VALUE);
		List<Records> records=this.recordService.getObjectsByIds(ids);
		for(Records record:records){
			record.setNames("");
			
			
			List<Long> ls=record.getRoom().getPlayers();
			List<User> users=this.usersService.getObjectsByIds(ls);
			Map<Long,String> maps=new HashMap();
			for(User u:users){
				if(223==u.getId()){
					u.setName("王二");
				}
				maps.put(u.getId(), u.getName());
				
			}
			record.setUid_names(maps);
			this.recordService.update(record);
			
			
		}
	}
	//@Test
	public void testGetUserByMone() throws ServiceException, ServiceDaoException{
		List<Long> ids=this.usersService.getUIdsOrderByMoney(0, 1000);
		List<User> users=this.usersService.getObjectsByIds(ids);
		log.info(users);
	}
	
	public static void main(String[] args) {
		
		
		
	}
}


