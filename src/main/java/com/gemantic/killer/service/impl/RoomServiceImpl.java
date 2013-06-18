package com.gemantic.killer.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.util.MapDataUtil;
@Component
public class RoomServiceImpl implements RoomService {
	private Map<Long,Room> roomID_Room=new HashMap<Long, Room>();
	private Map<Long,Set<Long>> roomID_readyUID=new HashMap<Long,Set<Long>>();
	private Set<Long> timerRoomID=new HashSet();
	private static final Log log = LogFactory
			.getLog(RoomServiceImpl.class);

	@Override
	public Long createRoom(Room room) throws ServiceException, ServiceDaoException{
		log.info(roomID_Room);
		
		roomID_Room.put(room.getId(), room);
		//每次创建Room的时候就创建一个线程.这个线程就用来不间断的收消息发消息.这个怎么感觉用Erlang做最合适呢.
		
		
		return room.getId();
	}

	@Override
	public List<Room> getList()throws ServiceException, ServiceDaoException {
		List<Room> rooms=new ArrayList<Room>();
		MapDataUtil.getListValue(roomID_Room,null,rooms);
		return rooms;
	}

	@Override
	public Room getRoom(Long roomID) {
		log.info(roomID_Room);
		return roomID_Room.get(roomID);
	}

	@Override
	public boolean updateRoom(Room room) throws ServiceException, ServiceDaoException{
		roomID_Room.put(room.getId(),room);	
		return true;
	}

	@Override
	public void start(Long rid, Long uid) throws ServiceException, ServiceDaoException {
		
		Room r=this.getRoom(rid);
		r.setStatus(r.status_start);	
		this.updateRoom(r);
		//TODO 暂时不做人数限制
		
		
	}

	public void removeRoom(Long roomID) throws ServiceException,
			ServiceDaoException {
		
		this.roomID_Room.remove(roomID);
	}

	
	
	
	
	

}
