package com.gemantic.labs.killer.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceException;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.labs.killer.service.WebSocketService;
@Component
public class PushClientWebsocketImpl implements PushClient {
	
	
	
	private static final Log log = LogFactory.getLog(PushClientWebsocketImpl.class);
	
	
	@Autowired
	private WebSocketService webSocketService;

	@Override
	public String push(List<Long> ids, String message) throws ServiceException {
		// TODO Auto-generated method stub
		return webSocketService.batchSendMessage(ids, message);
	}

	@Override
	public String batchPush(Map<Long, String> id_comtent)
			throws ServiceException {
		// TODO Auto-generated method stub
		return webSocketService.groupSendMessage(id_comtent);
		}
	

}
