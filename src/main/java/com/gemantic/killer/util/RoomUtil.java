package com.gemantic.killer.util;



import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.killer.model.Room;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class RoomUtil {
	
	private static final Log log = LogFactory.getLog(RoomUtil.class);
	private static final String Split = "=";
	
	
	
	
	
	
	public static String room2Json(Room record) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(record);
	}

	public static Room json2Room(String json) {
		Gson gson = new GsonBuilder().create();
		Room obj = gson.fromJson(json, Room.class);
		return obj;

	}

	
	

}
