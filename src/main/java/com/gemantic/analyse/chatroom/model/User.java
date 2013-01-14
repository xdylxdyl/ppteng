package com.gemantic.analyse.chatroom.model;

import java.io.Serializable;

public class User implements Serializable, Comparable<User> {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7278131888006151018L;
	
	private Long id;
	private String name;
	
	public User(String name) {
		this.name = name;
	}

	public User(Long id, String name) {
		this.id = id;
		this.name = name;
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
	
	@Override
	public int compareTo(User o) {
		return this.name.compareTo(o.name);
	}
	
}
