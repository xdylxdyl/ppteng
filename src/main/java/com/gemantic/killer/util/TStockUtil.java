package com.gemantic.killer.util;

import java.util.ArrayList;
import java.util.List;

import com.gemantic.analyse.tag.model.KeyBoard;
import com.gemantic.analyse.tag.model.TStock;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class TStockUtil {
	
	

	public static String user2Json(TStock tag) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(tag);
	}

	public static TStock json2User(String json) {
		Gson gson = new GsonBuilder().create();
		TStock tag = gson.fromJson(json, TStock.class);
		return tag;

	}

	public static List<KeyBoard> convert2KeyBoard(List<TStock> stocks) {
		 List<KeyBoard> boards=new ArrayList();
		for(TStock stock:stocks){			
			KeyBoard key = new KeyBoard(stock.getSymbol(),stock.getName(), stock.getPinyin(), "");//	
			boards.add(key);
		}
		return boards;
	}

}
