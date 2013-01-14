package com.gemantic.analyse.tag.model;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.commons.lang.math.RandomUtils;

public class Tag implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 617547135594699203L;
	

	

	private Long id;

	private String name;
	
	private Long updateAt;
	
	private Long createAt;

	public Tag(String name) {
		this.id=RandomUtils.nextLong();
		this.name=name;
		this.updateAt=System.currentTimeMillis();
		this.createAt=System.currentTimeMillis();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}	

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
