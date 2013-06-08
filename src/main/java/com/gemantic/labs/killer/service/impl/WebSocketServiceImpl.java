package com.gemantic.labs.killer.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.eclipse.jetty.websocket.WebSocket;
import org.springframework.stereotype.Component;

import com.gemantic.killer.websocket.TailorWebSocketServlet;
import com.gemantic.labs.killer.model.TailorSocket;
import com.gemantic.labs.killer.service.WebSocketService;

public class WebSocketServiceImpl implements WebSocketService {

	private static final Log log = LogFactory
			.getLog(TailorWebSocketServlet.class);

	private final Map<Long, TailorSocket> webSockets = new HashMap<Long, TailorSocket>();
	
	
	
	

	public WebSocketServiceImpl() {
		super();
		// TODO Auto-generated constructor stub
		log.info(" i will be create ");
	}

	@Override
	public WebSocket createWebSocket(Long uid) {
		if (webSockets.containsKey(uid)) {

		} else {
			log.info(uid+" will be create new socket");
			TailorSocket socket = new TailorSocket(uid);
			webSockets.put(uid, socket);

		}
		log.info(webSockets);
		return webSockets.get(uid);
	}

	@Override
	public void sendMessage(Long uid, String string) {
		TailorSocket socket = null;
		log.info(webSockets);
		if (webSockets.containsKey(uid)) {
			socket = webSockets.get(uid);
		} else {

			log.warn("not create socket "+uid);
			return ;
		}
		try {
			socket.sendMessage(string);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public String batchSendMessage(List<Long> ids, String message) {
		for(Long id:ids){
			this.sendMessage(id, message);
		}
		return "";
	}

	@Override
	public String groupSendMessage(Map<Long, String> id_comtent) {
		for(Long id:id_comtent.keySet()){
			this.sendMessage(id, id_comtent.get(id));
		}
		return "";
	
	}

}
