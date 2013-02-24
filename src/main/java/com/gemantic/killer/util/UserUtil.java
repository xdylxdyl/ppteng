package com.gemantic.killer.util;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.CollectionUtils;


import com.gemantic.killer.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class UserUtil {
	private static final Log log = LogFactory.getLog(UserUtil.class);
	public static final String StageShow_Login = "login";
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
		
		Map<String,List<String>> maps=new HashMap();
		maps.put("action", Arrays.asList(new String[]{"hero","like"}));
		String content=UserUtil.stageShow2Json(maps);
		log.info(content);
		Map m=UserUtil.json2StageShow(content);
		log.info(m);
		
		
		
		
	}
	
	
	

	public static Map<String, List<String>> json2StageShow(String stageShow) {
		if(StringUtils.isBlank(stageShow)){
			return new HashMap();
		}
		Gson gson = new GsonBuilder().create();
		Map uin_name = gson.fromJson(stageShow, new TypeToken<Map<String,  List<String>>>() {}.getType());
		return uin_name;
	}

	public static String stageShow2Json(Map<String, List<String>> stageShowList) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(stageShowList);
	}

	public static String getRandomStageShow(String stage, User u) {
		String show="";
		Map<String,List<String>> m=u.getStageShowList();
		if(m==null){
			return show;
		}
		if(m.containsKey(stage)){
			List<String> shows=m.get(stage);
			if(CollectionUtils.isEmpty(shows)){
				
			}else{
				Integer i=RandomUtils.nextInt(shows.size());
				show=shows.get(i);
			}
		}
		return show;
	}

}
