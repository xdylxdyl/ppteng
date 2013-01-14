package com.gemantic.killer.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.common.model.Setting;

public class Room implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -52337690841447045L;

	
	public static int status_start=0;
	public static int status_wait=1;
	
	
	private Long id;
	
	private String name="";	
	
	
	private Long createrID;
		
	private int status=status_wait;	
	
	private Long worldID;
	
	
	private String version;    

	
	private Long createAt;
	
	private Setting setting;	
	
	private Long startAt=System.currentTimeMillis()*2;//默认的时间要远远大于当前时间.
	
	
	private LinkedList<Message> messages=new LinkedList<Message>();
	
	private List<String> expressions=new ArrayList();
	
	
	private List<Long> players=new ArrayList();
	
	
	
	public Setting getSetting() {
		return setting;
	}
	public void setSetting(Setting setting) {
		this.setting = setting;
	}
	
	public Room(String name, Long createID,String version) {
		
		this.name=name;
		this.createrID=createID;	
		this.version=version;
		
	}
	public Room() {
		// TODO Auto-generated constructor stub
	}
	public Long getCreaterID() {
		return createrID;
	}
	public void setCreaterID(Long createrID) {
		this.createrID = createrID;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}		
	
	public Long getWorldID() {
		return worldID;
	}
	public void setWorldID(Long worldID) {
		this.worldID = worldID;
	}
	
	
	
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	
	
	
	public Long getCreateAt() {
		return createAt;
	}
	public void setCreateAt(Long createAt) {
		this.createAt = createAt;
	}
	
	
	
	public Long getStartAt() {
		return startAt;
	}
	public void setStartAt(Long startAt) {
		this.startAt = startAt;
	}
	
	
	
	
	public LinkedList<Message> getMessages() {
		return messages;
	}
	public void setMessages(LinkedList<Message> messages) {
		this.messages = messages;
	}
	
	
	
	
	
	
	
	
	
	
	
	public List<Long> getPlayers() {
		return players;
	}
	public void setPlayers(List<Long> players) {
		this.players = players;
	}
	public List<String> getExpressions() {
		return expressions;
	}
	public void setExpressions(List<String> expressions) {
		this.expressions = expressions;
	}
	public String toString() {
	        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	    }
}
