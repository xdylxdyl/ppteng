package com.gemantic.labs.killer.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;


@Entity
@Table(name = "names")
public class Names implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5385537507647440496L;
	


	private Long id;
	private String content;
	
	
	
	
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	public Long getId() {
		return id;
	}







	public void setId(Long id) {
		this.id = id;
	}






	@Column(name = "content")
	public String getContent() {
		return content;
	}







	public void setContent(String content) {
		this.content = content;
	}







	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}

	
	
	

}
