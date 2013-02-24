package com.gemantic.killer.service;

import java.util.Map;

import com.gemantic.killer.common.model.Setting;

public interface SettingService {

	Setting getSetting(String version);
	
	Map<String,String> getSettingDisplay();

}
