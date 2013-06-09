package com.gemantic.kill.thread;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.CollectionUtils;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.util.MessageUtil;

public class RoomThread extends Thread {

	private static final Log log = LogFactory.getLog(RoomThread.class);
	private Long rid;
	private RoomService roomService;
	private MessageService messageService;
	private PushClient pushClient;

	public RoomThread(Long rid, RoomService roomService,
			MessageService messageService, PushClient pushClient) {
		super();
		this.rid = rid;
		this.roomService = roomService;
		this.messageService = messageService;
		this.pushClient = pushClient;

	}

	public void run() {

		try {

			Message m;
			
			while (true) {

				Room r;
				r = this.roomService.getRoom(rid);
				if (r == null) {
					log.info(rid + " no room ,will be interrupt ");
					sleep(5);
					this.interrupt();

					break;
				}
				LinkedList<Message> msgs = r.getMessages();

				if ((m = msgs.poll()) != null) {
					Long start = System.currentTimeMillis();
					List<Message> messages = this.messageService.generate(m, r);

					log.info(messages.size() + " drools use time "
							+ (System.currentTimeMillis() - start));
					MessageUtil.sendMessage(r.getVersion(), messages,
							this.pushClient);
				

				} else {
				
					sleep(2);

					
				}
				continue;

			}

		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServiceDaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		}

	}

}
