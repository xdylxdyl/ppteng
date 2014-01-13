package com.gemantic.killer.util;

import java.util.Map;

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

	public static String getMIneSettingVersion(Room r) {

		if ("mine_1.0".equals(r.getVersion())) {
			Map setting = r.getSetting().getSetting();
			String level = r.getSetting().getSetting().get("mineLevel");
			//Todo == 重构这段代码.对于扫雷.哪种情况不给钱.
			if ("level6" != level&&"level5"!=level)  {
                         return level;
				
			} else {
				//训练模式不给钱

			}

		}
		return "";

	}

}
