package com.gemantic.labs.killer.service;

import java.util.List;
import java.util.Map;

import org.eclipse.jetty.websocket.WebSocket;

import com.gemantic.killer.service.MessageService;

public interface WebSocketService {

	WebSocket createWebSocket(Long uid);

	void sendMessage(Long uid, String string);

	String batchSendMessage(List<Long> ids, String message);

	String groupSendMessage(Map<Long, String> id_comtent);

}
