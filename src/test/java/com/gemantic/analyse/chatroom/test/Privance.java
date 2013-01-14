package com.gemantic.analyse.chatroom.test;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Privance {
	
	private Map<String,List<City>> cities=new TreeMap();

	public Map<String, List<City>> getCities() {
		return cities;
	}

	public void setCities(Map<String, List<City>> cities) {
		this.cities = cities;
	}

	
	

	public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

	
	
	
	

}
