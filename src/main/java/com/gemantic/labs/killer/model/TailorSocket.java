package com.gemantic.labs.killer.model;

import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.eclipse.jetty.websocket.WebSocket;

import com.gemantic.killer.websocket.TailorWebSocketServlet;

public class TailorSocket implements WebSocket.OnTextMessage {
	
	private static final Log log = LogFactory
			.getLog(TailorSocket.class);
	private Connection _connection;

	private Long uid;
	
	
	
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
	
		log.info(this.uid+" send message "+data);
		_connection.sendMessage(data);	
		
	
	
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
			connection.sendMessage("already open ~~"+this.uid);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}