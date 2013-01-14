package com.gemantic.analyse.chatroom.constants;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gemantic.analyse.chatroom.model.User;

public class Constants {
	private static Long userId = 0L;
	
	public static Map<String, User> LOGINUSERS = new HashMap<String, User>();
	
	public static User add(String name) {
		User u = getUser(name);
		if (null == u) {
			u = new User(name);
			u.setId(getNextId());
			
			LOGINUSERS.put(name, u);
		}
		
		return u;
	}
	
	public static String remove(String name) {
		LOGINUSERS.remove(name);
		return name;
	}
	
	public static User getUser(String name) {
		return LOGINUSERS.get(name);
	}
	
	public static List<User> getUsers() {
		List<User> users = new ArrayList<User>(LOGINUSERS.values());
		
		return users;
	}
	
	public static synchronized Long getNextId() {
		return ++userId;
	}
}
