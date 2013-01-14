package com.gemantic.analyse.tag.model;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.commons.lang.math.RandomUtils;

public class TStock implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 617547135594699203L;
	

	

	private String symbol;

	private String name;
	
	private String pinyin;
	
	private Long updateAt;
	
	private Long createAt;

	public TStock(String symbol,String name,String pinyin) {
		this.symbol=symbol;
		this.name=name;
		this.pinyin=pinyin;
		this.updateAt=System.currentTimeMillis();
		this.createAt=System.currentTimeMillis();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}	
	
	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getPinyin() {
		return pinyin;
	}

	public void setPinyin(String pinyin) {
		this.pinyin = pinyin;
	}

	public Long getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(Long updateAt) {
		this.updateAt = updateAt;
	}

	public Long getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Long createAt) {
		this.createAt = createAt;
	}
		
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}

	


}
