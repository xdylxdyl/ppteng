package com.gemantic.killer.util;



import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.killer.model.Record;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class RecordUtil {
	
	private static final Log log = LogFactory.getLog(RecordUtil.class);
	private static final String Split = "=";
	
	
	
	
	
	
	public static String record2Json(Record record) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(record);
	}

	public static Record json2Record(String json) {
		Gson gson = new GsonBuilder().create();
		Record obj = gson.fromJson(json, Record.class);
		return obj;

	}

	
	

}
