package com.gemantic.killer.util;

import com.gemantic.killer.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class UserUtil {

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

}
