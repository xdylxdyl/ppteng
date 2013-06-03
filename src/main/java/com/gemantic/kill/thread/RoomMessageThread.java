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

public class RoomMessageThread extends Thread {

	private static final Log log = LogFactory.getLog(RoomMessageThread.class);
	private Long rid;
	private RoomService roomService;
	private MessageService messageService;
	private PushClient pushClient;

	public RoomMessageThread(Long rid, RoomService roomService,
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
			
			List<Message> all = new ArrayList();
			while (true) {

				Room r;
				r = this.roomService.getRoom(rid);
				if (r == null) {
					log.info(rid + " no room ,will be interrupt ");
					sleep(5);
					this.interrupt();

					break;
				}
				LinkedList<Message> msgs = r.getSendMessages();

				if ((m = msgs.poll()) != null) {
					
					all.add(m);
				

				} else {

					if(CollectionUtils.isEmpty(all)){					
						
						sleep(10);
					}else{
						List<Message> sendAll = new ArrayList();
						
						sendAll.addAll(all);
						log.info(sendAll);
						MessageUtil.sendMessage(r.getVersion(), sendAll,
								this.pushClient);
						all.clear();
					}
					
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
