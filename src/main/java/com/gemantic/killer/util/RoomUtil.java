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
			String settingVersion = setting.get("rowCount") + "_"
					+ setting.get("columnCount") + "_"
					+ setting.get("mineCount");
			if (settingVersion.equals("9_9_10")||settingVersion.equals("16_16_40")
					|| settingVersion.equals("16_30_99")
					|| settingVersion.equals("40_40_500")
					|| settingVersion.equals("100_100_2000")) {

				return settingVersion;
			} else {

			}

		}
		return "";

	}

}
