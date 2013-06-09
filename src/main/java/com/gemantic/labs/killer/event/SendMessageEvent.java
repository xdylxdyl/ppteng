package com.gemantic.labs.killer.event;

import org.springframework.context.ApplicationEvent;

import com.gemantic.killer.common.model.Message;

public class SendMessageEvent extends ApplicationEvent {

	private Message message;

	private Long rid;
	
	public SendMessageEvent(Object source) {
		super(source);
		// TODO Auto-generated constructor stub
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public SendMessageEvent(Object source, Message message,Long rid) {

		super(source);
		this.message = message;
		this.rid=rid;

	}

	public Message getMessage() {
		return message;
	}

	public void setMessage(Message message) {
		this.message = message;
	}

	public Long getRid() {
		return rid;
	}

	public void setRid(Long rid) {
		this.rid = rid;
	}
	
	

}
