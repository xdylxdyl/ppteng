package com.gemantic.killer.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import net.kotek.jdbm.DB;
import net.kotek.jdbm.DBMaker;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.model.User;
import com.gemantic.killer.service.UserService;
import com.gemantic.killer.util.MapDataUtil;
import com.gemantic.killer.util.UserUtil;



@Component
public class UserServiceJDBMImpl implements UserService {

	private static final Log log = LogFactory.getLog(UserServiceJDBMImpl.class);

	private Map<Long, String> userID_USER = new HashMap<Long, String>();

	private Map<String, Long> email_userID = new HashMap<String, Long>();
	
	private Map<String, Long> open_userID = new HashMap<String, Long>();

	private String path = "usr.txt";

	private String emailDB = "email_uid";
	

	private String openDB = "open_uid";

	private String userDB = "user";
	
	private boolean init=false;
	
	

	@Autowired
	@Qualifier("gameMaker")
	private DBMaker maker;
	
	private DB db;
	


	@Override
	public List<User> getUsers(List<Long> userIDS) {
		List<User> users = new ArrayList<User>();
		List<String> jsons=new ArrayList();
		MapDataUtil.getListValue(userID_USER, userIDS, jsons);
		for(String json:jsons){
			User user=UserUtil.json2User(json);
			users.add(user);
			
		}
		return users;
	}
	
	


	public Map<Long, String> getUserID_USER() {
		return userID_USER;
	}




	public void setUserID_USER(Map<Long, String> userID_USER) {
		this.userID_USER = userID_USER;
	}




	@Override
	public Long create(String name, String email) throws ServiceException, ServiceDaoException {

		User user = new User();
		user.setId(RandomUtils.nextLong());
		user.setName(name);
		user.setEmail(email);
		user.setCreateAt(System.currentTimeMillis());

		Long uid = user.getId();

		if (userID_USER.containsKey(uid)) {

		} else {
			userID_USER.put(uid, UserUtil.user2Json(user));			
			this.email_userID.put(user.getEmail(), user.getId());	
			this.db.commit();
			/*
			 * Gson gson = new GsonBuilder().disableHtmlEscaping().create();
			 * FileUtil.writeFile(path, true, gson.toJson(user));
			 */
		}
		return uid;
	}

	@Override
	public User getUserByID(Long uid) throws ServiceException, ServiceDaoException {
		String json= this.userID_USER.get(uid);
		
		return UserUtil.json2User(json);
	}

	@Override
	public void update(User user) throws ServiceException, ServiceDaoException {
		user.setUpdateAt(System.currentTimeMillis());
		this.userID_USER.put(user.getId(), UserUtil.user2Json(user));
		this.email_userID.put(user.getEmail(), user.getId());
		if(StringUtils.isBlank(user.getOpenID())){
			
		}else{
			this.open_userID.put(user.getOpenID(), user.getId());
		}
		
		this.db.commit();

	}

	@PostConstruct
	public void init() {
		if(init){
			log.warn("already init ");
			return;
		}else{
			log.info("init start");
			
		}
		
    //为什么会初始化两次,怎么检测某一个文件已经被使用了呢?
	log.info("===");
		Long start=System.currentTimeMillis();
		if(db==null){				
			db=maker.build();	   
				log.info("=== 11111");
		}
		log.info("=== 22222");

		//** Creates TreeMap which stores data in database. *//*
		try {
			this.userID_USER = db.getHashMap(userDB);
			log.info("user "+this.userID_USER.keySet().size());
			log.info(this.userID_USER);

		} catch (Throwable t) {
			//
			t.printStackTrace();
			log.error(t.getMessage());

			db.createHashMap(userDB);
			db.commit();
			log.info("create success " + userDB);

		}

		//** Creates TreeMap which stores data in database. *//*
		try {

			this.email_userID = db.getHashMap(this.emailDB);
			log.info("email "+email_userID.keySet().size());

		} catch (Throwable t) {
			t.printStackTrace();
			log.error(t.getMessage());

			db.createHashMap(this.emailDB);
			db.commit();
			log.info("create success " + emailDB);

		}

		log.info("===");
		
		
		//** Creates TreeMap which stores data in database. *//*
				try {

					this.open_userID = db.getHashMap(this.openDB);
					log.info("open_userID "+open_userID.keySet().size());

				} catch (Throwable t) {
					t.printStackTrace();
					log.error(t.getMessage());

					db.createHashMap(this.openDB);
					db.commit();
					log.info("create success " + openDB);

				}
		
		
		init=true;
       log.info("init use time "+(System.currentTimeMillis()-start));
	}

	@PreDestroy
	private void destory(){
		
		
		
		
	}
	
	
	
	
	public static void main(String[] args) throws ServiceException, ServiceDaoException {
		UserServiceJDBMImpl service = new UserServiceJDBMImpl();
		/*
		 * for(int i=0;i<100;i++){ Long id=service.create("测试帐户-"+i);
		 * log.info(id); }
		 */
		User user = service.getUserByID(5814083748830298112L);
		log.info(user);
	}

	@Override
	public boolean verify(Long id, String password) throws ServiceException, ServiceDaoException {
		if (userID_USER.containsKey(id)) {
			String json=userID_USER.get(id);
			User user = UserUtil.json2User(json) ;
			// 不能明文
			if (user.getPassword().equals(password)) {
				return true;

			} else {
				return false;
			}

		} else {
			return false;
		}

	}

	@Override
	public Long insertUser(User user) throws ServiceException, ServiceDaoException {

		log.info(" insert user " + user);
		Long uid = user.getId();
		if (uid == null) {
			uid = RandomUtils.nextLong();
		}
		user.setCreateAt(System.currentTimeMillis());

		if (userID_USER.containsKey(uid)) {

		} else {
			user.setId(uid);
			userID_USER.put(uid, UserUtil.user2Json(user));

			this.email_userID.put(user.getEmail(), user.getId());
			
			if(StringUtils.isBlank(user.getOpenID())){
				
			}else{
				
				this.open_userID.put(user.getOpenID(), user.getId());
			}
			this.db.commit();
		}
		return uid;

	}

	@Override
	public Long getIdByEmail(String email) throws ServiceException, ServiceDaoException {
		// TODO Auto-generated method stub
		return this.email_userID.get(email);
	}




	@Override
	public Integer getTotalCount() throws ServiceException, ServiceDaoException {
		// TODO Auto-generated method stub
		return this.userID_USER.keySet().size();
	}




	@Override
	public Long getIdByThird(String type, String key) throws ServiceException, ServiceDaoException {
		// TODO Auto-generated method stub
		return  this.open_userID.get(key);
	}

}
