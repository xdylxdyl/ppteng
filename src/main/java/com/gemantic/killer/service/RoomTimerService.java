package com.gemantic.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.GameMessage;

/**
 * 游戏房间服务
 * @return
 */

public interface RoomTimerService {



		
	/**
	 * 去除房间的
	 * @param where
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */

	public void removeRoomTimer(Long rid)throws ServiceException,ServiceDaoException;
	/**
	 * 下一个消息
	 * @param nightGM
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */

	public void nextGameMessage(GameMessage nightGM)throws ServiceException,ServiceDaoException;
	
	
	/**
	 * 下一组消息
	 * @param timerMessages
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public void nextMessages(List<Message> messages)throws ServiceException,ServiceDaoException;
	
	
	
	/**
	 * 下一个消息
	 * @param nightGM
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */

	void nextMessage(Message m)throws ServiceException,ServiceDaoException;
	

	



}
