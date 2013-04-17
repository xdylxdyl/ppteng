package com.gemantic.killer.service.impl;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.kill.timer.SendGameMessageTask;
import com.gemantic.kill.timer.SendMessageTask;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.GameMessage;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.service.RoomTimerService;

@Component("roomTimerService")
public class RoomTimerServiceImpl implements RoomTimerService {

	private static final Log log = LogFactory.getLog(RoomTimerServiceImpl.class);

	// private ConcurrentMap<Long,SendGameMessageTask> roomID_GameMessage=new
	// ConcurrentHashMap<Long,SendGameMessageTask>();

	private ConcurrentMap<Long, SendMessageTask> roomID_Message = new ConcurrentHashMap<Long, SendMessageTask>();

	@Autowired
	private PushClient pushClient;

	

	@Autowired
	private MessageService droolsGameMessageService;
	
	@Autowired
	private RoomService roomService;

	@Override
	public void removeRoomTimer(Long rid) throws ServiceException, ServiceDaoException {

		log.info(rid + " time will be remove ");
		SendMessageTask sm2 = this.roomID_Message.get(rid);
		if (sm2 != null) {
			log.info(sm2.toString());
			sm2.cancel();
		}
		this.roomID_Message.remove(rid);

		log.info(rid + " time message remove sucdess");

	}

	@Override
	public void nextGameMessage(GameMessage gm) throws ServiceException, ServiceDaoException {

		log.info(" time message is " + gm.toString());
		SendGameMessageTask sm = new SendGameMessageTask(pushClient, gm);

		// this.roomID_GameMessage.put(gm.getWhere(), sm);

	}

	@Override
	public void nextMessage(Message m) {

		log.info("timer message " + m);
		if (this.roomID_Message.containsKey(Long.valueOf(m.getWhere()))) {

			SendMessageTask old = this.roomID_Message.get(Long.valueOf(m.getWhere()));
			if (old == null) {

			} else {
				log.info("remove old timer");
				old.cancel();
			}
		}
		SendMessageTask sm = new SendMessageTask(pushClient, m, droolsGameMessageService,roomService);
		sm.start();
		this.roomID_Message.put(Long.valueOf(m.getWhere()), sm);

	}

	@Override
	public void nextMessages(List<Message> messages) throws ServiceException, ServiceDaoException {
		for (Message m : messages) {

			this.nextMessage(m);

		}

	}




}
