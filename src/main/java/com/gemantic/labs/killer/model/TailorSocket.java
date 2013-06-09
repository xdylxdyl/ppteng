package com.gemantic.labs.killer.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.eclipse.jetty.websocket.WebSocket;

public class TailorSocket implements WebSocket.OnTextMessage {
	
	private static final Log log = LogFactory
			.getLog(TailorSocket.class);
	private Connection _connection;

	private Long uid;
	
	private List<String> messages=new ArrayList();
	
	public TailorSocket(Long uid) {

		this.uid=uid;
		log.info("create new socket "+uid);

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
	
		if(_connection.isOpen()){
			log.info(this.uid+" send message "+data);
			_connection.sendMessage(data);	
		}else{
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
	public void onMessage(String data) {
		
	}

	public boolean isOpen() {
		return _connection.isOpen();
	}

	@Override
	public void onOpen(Connection connection) {
	
		_connection = connection;
		try {
			if(this.messages.isEmpty()){
				connection.sendMessage("already open ~~"+this.uid);
			}else{
				log.info(this.uid+" has messages ~~"+this.messages.size());
				connection.sendMessage(this.uid+" has messages ~~"+this.messages.size());
				List<String> ms=new ArrayList();
				ms.addAll(this.messages);
				this.messages.clear();
				for(String str:ms){
					connection.sendMessage(str);
				}
				log.info(this.uid+" send old messages over ");
				
			}
		
		} catch (IOException e) {
			e.printStackTrace();
		}
	
	}
}