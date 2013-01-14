package com.gemantic.analyse.chatroom.test;

import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Districts {
	
	 private Map<String,String> district=new TreeMap();

	public Map<String, String> getDistrict() {
		return district;
	}

	public void setDistrict(Map<String, String> district) {
		this.district = district;
	}
	   
	   

	public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }
	
	

}
