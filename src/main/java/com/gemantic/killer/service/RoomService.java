package com.gemantic.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.model.Room;

/**
 * 游戏房间服务
 * @return
 */

public interface RoomService {

	  /**
     * 获取房间列表  
     * 
     * @return
     */
	
	public List<Room> getList()throws ServiceException,ServiceDaoException;
	
	
	 /**
     * 获取房间信息  
     * @return
     */
	public Room getRoom(Long roomID)throws ServiceException,ServiceDaoException;
	 /**
     *创建房间  
     * @return
     */
	public Long createRoom(Room room)throws ServiceException,ServiceDaoException;

	 /**
     * 更新房间信息  
     * @return
     */
	public boolean updateRoom(Room room)throws ServiceException,ServiceDaoException;


	/**
	 * 游戏开始
	 * @param rid
	 * @param uid
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public void start(Long rid, Long uid)throws ServiceException,ServiceDaoException;


	/**
	 * 删除
	 * @param roomID
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public void removeRoom(Long roomID)throws ServiceException,ServiceDaoException;;





}
