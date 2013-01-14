package com.gemantic.killer.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.gemantic.killer.common.model.Setting;
import com.gemantic.killer.service.SettingService;
@Component
public class SettingServiceImpl implements SettingService {
	
	private static final Log log = LogFactory.getLog(SettingServiceImpl.class);
	

	@Resource(name = "setting")	
	private Map<String,Map<String,String>> setting;
	
	
	
	@Override
	public Setting getSetting(String version) {
		// TODO Auto-generated method stub
		Map s=this.setting.get(version);
		if(s==null){
			
			log.info(version+" not get setting ");
			//不支持这个版本
			return new Setting(version);
			
		}
		
		Setting setting=new Setting();
		setting.setSetting(s);
		setting.setVersion(version);
		log.info(version +" get setting "+ setting);
		return setting;
	}
	
	
	

}
