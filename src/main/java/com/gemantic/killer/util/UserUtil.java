package com.gemantic.killer.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


import com.gemantic.killer.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class UserUtil {
	private static final Log log = LogFactory.getLog(UserUtil.class);
	public static User createInitUser(Long uid) {

		return new User();
	}

	public static String user2Json(User user) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(user);
	}

	public static User json2User(String json) {
		Gson gson = new GsonBuilder().create();
		User user = gson.fromJson(json, User.class);
		return user;

	}
	
	
	public static String expression2Json(List<String> list) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(list);
	}

	public static List<String> json2Expression(String content) {
		Gson gson = new GsonBuilder().create();
		List<String> list = gson.fromJson(content, List.class);
		return list;

	}
	
	
	public static String userMap2Json(Map<Long,String> uin_name) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(uin_name);
	}

	public static Map json2userMap(String json) {
		Gson gson = new GsonBuilder().create();
		Map uin_name = gson.fromJson(json, new TypeToken<Map<String, String>>() {}.getType());
		return uin_name;

	}
	
	public static void main(String[] args) {
		
		Map<Long,String> maps=new HashMap();
		maps.put(1L, "xxx");
		String content=UserUtil.userMap2Json(maps);
		log.info(content);
		Map m=UserUtil.json2userMap(content);
		log.info(m);
		
		
		
		
	}

}
