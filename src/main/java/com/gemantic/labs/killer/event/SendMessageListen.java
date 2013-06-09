package com.gemantic.labs.killer.event;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.util.MessageUtil;

@Component
public class SendMessageListen implements ApplicationListener<SendMessageEvent> {
	private static final Log log = LogFactory.getLog(SendMessageListen.class);

	@Autowired
	private RoomService roomService;
	@Autowired
	private MessageService messageService;
	@Autowired
	private PushClient pushClient;

	// listener实现
	public void onApplicationEvent(SendMessageEvent event) {
		Long start = System.currentTimeMillis();
		Room r;
		try {
			r = this.roomService.getRoom(event.getRid());
			List<Message> messages = this.messageService.generate(
					event.getMessage(), r);

			log.info(messages.size() + " drools use time "
					+ (System.currentTimeMillis() - start));
			MessageUtil.sendMessage(r.getVersion(), messages, this.pushClient);
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