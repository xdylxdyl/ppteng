package com.gemantic.labs.killer.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
@Entity
@Table(name = "money_flow")
public class MoneyFlow implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3580005407190719488L;	
	
		
   	 
    private  Long id;
	
  	 
    private  Long uid;
	
  	 
    private  Long fid;
	
  	 
    private  Integer money;
	
  	 
    private  String comments;
	
  	 
    private  Long happenAt;
	
  	 
    private  Long updateAt;
	
  	 
    private  Long createAt;
	
  
	
		 	
         	 	   @Id
     	   @GeneratedValue(strategy = GenerationType.AUTO)
              	@Column(name = "id")
	public Long getId() {
		return id;
	}
	
	
	public void setId(Long id) {
		this.id = id;
	}
		 	@Column(name = "uid")
	public Long getUid() {
		return uid;
	}
	
	
	public void setUid(Long uid) {
		this.uid = uid;
	}
		 	@Column(name = "fid")
	public Long getFid() {
		return fid;
	}
	
	
	public void setFid(Long fid) {
		this.fid = fid;
	}
		 	@Column(name = "money")
	public Integer getMoney() {
		return money;
	}
	
	
	public void setMoney(Integer money) {
		this.money = money;
	}
		 	@Column(name = "comments")
	public String getComments() {
		return comments;
	}
	
	
	public void setComments(String comments) {
		this.comments = comments;
	}
		 	@Column(name = "happen_at")
	public Long getHappenAt() {
		return happenAt;
	}
	
	
	public void setHappenAt(Long happenAt) {
		this.happenAt = happenAt;
	}
		 	@Column(name = "update_at")
	public Long getUpdateAt() {
		return updateAt;
	}
	
	
	public void setUpdateAt(Long updateAt) {
		this.updateAt = updateAt;
	}
		 	@Column(name = "create_at")
	public Long getCreateAt() {
		return createAt;
	}
	
	
	public void setCreateAt(Long createAt) {
		this.createAt = createAt;
	}
		
	public String toString() {
		return ToStringBuilder.reflectionToString(this,
				ToStringStyle.MULTI_LINE_STYLE);
	}

}

