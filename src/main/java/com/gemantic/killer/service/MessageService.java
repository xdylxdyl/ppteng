package com.gemantic.killer.service;

import java.util.List;



import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.Room;


public interface MessageService {

	
	
	
	/**
	 * 根据逻辑处理Message
	 * 并生成新的Message
	 * @param message
	 * @param room TODO
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Message> generate(Message message, Room room) throws ServiceException,ServiceDaoException;

	/**
	 * 	 
	 * @param queryMessage
	 * @param room TODO
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	
	public String getSnapshots(Message queryMessage, Room room)throws ServiceException,ServiceDaoException;
	
	/**
	 * 
	 * @param room
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */

	public List<Message> createRoom(Room room)throws ServiceException,ServiceDaoException;
	/**
	 * 
	 * @param room
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */

	public List<Message> updateSetting(Room room)throws ServiceException,ServiceDaoException;
	
	
	public void sendMessage(Message message) throws ServiceException,ServiceDaoException;
	
	
	public void removeRoom(Room room)throws ServiceException,ServiceDaoException;
	


	
	



	
	

}
