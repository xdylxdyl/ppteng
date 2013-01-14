package com.gemantic.killer.util;

import com.gemantic.analyse.tag.model.Tag;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class TagUtil {
	
	

	public static String user2Json(Tag tag) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(tag);
	}

	public static Tag json2User(String json) {
		Gson gson = new GsonBuilder().create();
		Tag tag = gson.fromJson(json, Tag.class);
		return tag;

	}

}
