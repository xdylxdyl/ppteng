package com.gemantic.labs.killer.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.eclipse.jetty.websocket.WebSocket;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.util.MessageUtil;
import com.gemantic.labs.killer.event.SendMessageEvent;

public class TailorSocket implements WebSocket.OnTextMessage {

	private static final Log log = LogFactory.getLog(TailorSocket.class);
	private Connection _connection;

	private Long uid;

	private List<String> messages = new ArrayList();

	private MessageService messageService;

	public TailorSocket(Long uid, MessageService messageService) {

		this.uid = uid;

		this.messageService = messageService;
		log.info("create new socket " + uid);		

	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	@Override
	public void onClose(int closeCode, String message) {
		_connection.disconnect();
	}

	public void sendMessage(String data) throws IOException {

		//有可能会空
		if (_connection.isOpen()) {
			// log.info(this.uid+" send message "+data);
		
			_connection.sendMessage(data);
		} else {
			this.messages.add(data);

		}

	}

	public List<String> getMessages() {
		return messages;
	}

	public void setMessages(List<String> messages) {
		this.messages = messages;
	}

	@Override
	public synchronized void onMessage(String data) {
		processData(data);

	}

	private void processData(String data) {
		
		Message message = MessageUtil.fromString(data);
	
		log.info("will send message " + message);
		try {
			messageService.sendMessage(message);
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServiceDaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void closeConnect(){
		this._connection.close();
	};

	public boolean isOpen() {
		return _connection.isOpen();
	}

	@Override
	public void onOpen(Connection connection) {
	

		_connection = connection;		
		
		
		
		_connection.setMaxIdleTime(24*60*60*1000);
		log.info("set max idle Time "+_connection.getMaxIdleTime());
		
		try {
			if (this.messages.isEmpty()) {
				connection.sendMessage("already open ~~" + this.uid);
			} else {
				log.info(this.uid + " has messages ~~" + this.messages.size());
				List<String> ms = new ArrayList();
				ms.addAll(this.messages);
				this.messages.clear();
				for (String str : ms) {
					connection.sendMessage(str);
				}
				log.info(this.uid + " send old messages over ");

			}

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}