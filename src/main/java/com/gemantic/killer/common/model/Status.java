package com.gemantic.killer.common.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class Status implements Serializable{

	
	
	
	
	
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8425983363037547724L;


	private String name;
	
	private Long id;
	
	private String status;


	public Status(String status) {
		super();
		this.status=status;

	}

		

	
	
	
	
	
	public Status(Long id, String name, String status) {
		this.id=id;
		this.name=name;
		this.status=status;
	}








	public String getStatus() {
		return status;
	}





	public void setStatus(String status) {
		this.status = status;
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








	public String toString() {
		return ToStringBuilder.reflectionToString(this,
				ToStringStyle.MULTI_LINE_STYLE);
	}

}
