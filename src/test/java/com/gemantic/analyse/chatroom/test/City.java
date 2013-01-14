

package com.gemantic.analyse.chatroom.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class City {
	
	
	private Map<String,List<Districts>> districts=new TreeMap();

	public Map<String, List<Districts>> getDistricts() {
		return districts;
	}

	public void setDistricts(Map<String, List<Districts>> districts) {
		this.districts = districts;
	}
	
	

	public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }
	
	
	
	
	

}
