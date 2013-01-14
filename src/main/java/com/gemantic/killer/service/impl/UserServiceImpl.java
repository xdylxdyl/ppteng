package com.gemantic.killer.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.FileUtil;
import com.gemantic.killer.model.User;
import com.gemantic.killer.service.UserService;
import com.gemantic.killer.util.MapDataUtil;
import com.gemantic.killer.util.UserUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


//@Component
public class UserServiceImpl implements UserService {
	
	private static final Log log = LogFactory.getLog(UserServiceImpl.class);
	
	private Map<Long,User> userID_USER=new HashMap<Long, User>();
	
	private String path="usr.txt";
	
	
	

	@Override
	public List<User> getUsers(List<Long> userIDS) {
		List<User> users=new ArrayList<User>();
		MapDataUtil.getListValue(userID_USER,userIDS,users);
		return users;
	}

	public Map<Long, User> getUserID_USER() {
		return userID_USER;
	}

	public void setUserID_USER(Map<Long, User> userIDUSER) {
		userID_USER = userIDUSER;
	}

	@Override
	public Long create(String name, String email) throws ServiceException, ServiceDaoException {
	
		User user=new User();
	
		Long uid=user.getId();
	
		if(userID_USER.containsKey(uid)){
			
		}else{
			userID_USER.put(uid, user);
			Gson gson = new GsonBuilder().disableHtmlEscaping().create();
			FileUtil.writeFile(path,  true, gson.toJson(user));			
		}
		return uid;
	}

	@Override
	public User getUserByID(Long uid) throws ServiceException, ServiceDaoException {
		if(uid<0){
			User initUser=UserUtil.createInitUser(uid);
			userID_USER.put(uid, initUser);
		}
		return this.userID_USER.get(uid);
	}

	@Override
	public void update(User user) throws ServiceException, ServiceDaoException {
		this.userID_USER.put(user.getId(), user);
		
	}
	@PostConstruct 
	public void init(){
		
		
		
		
		
		
		Gson gson = new GsonBuilder().disableHtmlEscaping().create();
		try {
			log.info("start init ");
			List<String> lines=FileUtil.readFileAsList(path);
			log.info("get all user "+lines.size());
			for(String line:lines){
				User user=gson.fromJson(line, User.class);
				this.userID_USER.put(user.getId(), user);
			}
			log.info("init over");
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}

	@Override
	public boolean verify(Long id, String password) throws ServiceException, ServiceDaoException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void insertUser(User user) throws ServiceException, ServiceDaoException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Long getIdByEmail(String email) throws ServiceException, ServiceDaoException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer getTotalCount() throws ServiceException, ServiceDaoException {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
