package com.gemantic.labs.killer.event;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.service.MessageService;

@Component
public class SendMessageListen implements ApplicationListener<SendMessageEvent> {
	private static final Log log = LogFactory.getLog(SendMessageListen.class);

	@Autowired
	private MessageService messageService;

	// listener实现
	public void onApplicationEvent(SendMessageEvent event) {	
		log.info("event "+event);
		try {
			Message message = event.getMessage();
			messageService.sendMessage(message);
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServiceDaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}