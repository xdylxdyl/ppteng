package com.gemantic.killer.common.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Setting implements Serializable{

	
	
	
	
	
	

	/**
	 * 
	 */
	private static final long serialVersionUID = -8146199186184352096L;
	
	
	private Map<String,String> setting=new HashMap<String,String>();
	
	private Long rid;
	
	private String version;
	
	
	
	
	
	
	
	
	
	
	
	
	
	


	public Setting(Long rid, String version) {
		this.rid=rid;
		this.version=version;
		
	}









	public Setting(String version, Long rid, Map<String, String> setting) {
		this.rid=rid;
		this.version=version;
		this.setting=setting;
	}









	public Setting() {
		// TODO Auto-generated constructor stub
	}









	public Setting(String version) {
		this.version=version;
	}









	public Long getRid() {
		return rid;
	}









	public void setRid(Long rid) {
		this.rid = rid;
	}









	public String getVersion() {
		return version;
	}









	public void setVersion(String version) {
		this.version = version;
	}




	
	





	








	public Map<String, String> getSetting() {
		return setting;
	}









	public void setSetting(Map<String, String> setting) {
		this.setting = setting;
	}









	public String toString() {
		return ToStringBuilder.reflectionToString(this,
				ToStringStyle.MULTI_LINE_STYLE);
	}

}
