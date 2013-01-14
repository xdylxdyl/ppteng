package com.gemantic.analyse.tag.model;

import java.io.Serializable;
import java.util.Map;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class KeyBoard implements Serializable{
	
	static public final int Query_Type_Stock = 1;

	/**
	 * s
	 */
	private static final long serialVersionUID = -499060661580301850L;
	private Long kid;
	private String id="";
	private String name="";
	private String pinyin="";
	private String full_pinyin="";
	private String query = "";
	
	private Map<String, Object> attributes;
	
	public KeyBoard(String id, String name){
		this.id = id;
		this.name = name;
	}
	
	public KeyBoard(String name, String pinyin, String full_pinyin){
		this.name = name;
		this.pinyin = pinyin;
		this.full_pinyin = full_pinyin;
	}
	
	public KeyBoard(String id, String name, String pinyin, String full_pinyin){
		this.id = id;
		this.name = name;
		this.pinyin = pinyin;
		this.full_pinyin = full_pinyin;
	}
	
	public KeyBoard(String id, String name, String pinyin, String full_pinyin,
			String query, Map<String, Object> attributes) {
		this.id = id;
		this.name = name;
		this.pinyin = pinyin;
		this.full_pinyin = full_pinyin;
		this.query = query;
		this.attributes = attributes;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPinyin() {
		return pinyin;
	}
	public void setPinyin(String pinyin) {
		this.pinyin = pinyin;
	}
	
	
	public String getFull_pinyin() {
		return full_pinyin;
	}

	public void setFull_pinyin(String fullPinyin) {
		full_pinyin = fullPinyin;
	}

	public String toString() {
		return ToStringBuilder.reflectionToString(this,
				ToStringStyle.MULTI_LINE_STYLE);
	}
	
	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((full_pinyin == null) ? 0 : full_pinyin.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((pinyin == null) ? 0 : pinyin.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		KeyBoard other = (KeyBoard) obj;
		if (full_pinyin == null) {
			if (other.full_pinyin != null)
				return false;
		} else if (!full_pinyin.equals(other.full_pinyin))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (pinyin == null) {
			if (other.pinyin != null)
				return false;
		} else if (!pinyin.equals(other.pinyin))
			return false;
		return true;
	}
	
	
	
}
