package com.gemantic.killer.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.model.Room;

/**
 * 管理房间和用户的对应关系  
 * @return
 */

public interface MemberService {
	
	 /**
     * 获取房间对应的成员ID列表  
     * @return
     */
	
	List<Long> getMembers(Long roomID)throws ServiceException,ServiceDaoException;

	 /**
     * 新用户进入房间  
     * @return
     */
	void newUserEnterRoom(Long roomID, Long userID)throws ServiceException,ServiceDaoException;
	
	/**
	 * 退出游戏
	 * @param rid
	 * @param uid
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	void userLogOut(Long rid, Long uid)throws ServiceException, ServiceDaoException;
	
	

	/**
	 * 准备就绪
	 * @param roomID
	 * @param userID
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public void ready(Long roomID, Long userID)throws ServiceException,ServiceDaoException;


	/**
	 * 房间是否包含用户
	 * @param roomID
	 * @param userID
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	boolean containUser(Long roomID, Long userID) throws ServiceException, ServiceDaoException;
	

	/**
	 * 获取房间中玩家的状态信息
	 * @param rid
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public Set<Long> getMembersStatus(Long rid)throws ServiceException, ServiceDaoException;

	/**
	 * 玩家死亡
	 * @param where
	 * @param waterID
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	void die(Long rid, Long uid)throws ServiceException, ServiceDaoException;

	/**
	 * 获取活着的玩家列表
	 * @param rid
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	Set<Long> getLivers(Long rid)throws ServiceException, ServiceDaoException;

	/**
	 * 游戏开始.初始化活着的玩家列表
	 * @param where
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	void initLivers(Long rid)throws ServiceException, ServiceDaoException;

	/**
	 * 游戏结束.清除存活玩家的状态
	 * @param rid
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	void clearLivers(Long rid)throws ServiceException, ServiceDaoException;

	/**
	 * 游戏结束.清除准备玩家的状态
	 * @param rid
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	void clearReadys(Long rid)throws ServiceException, ServiceDaoException;

	/**
	 * 获取用户所在的房间
	 * @param uid
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	Room getRoomOfUser(Long uid)throws ServiceException, ServiceDaoException;

	Map<Long, Long> batchGetRoomOfUser(List<Long> userIDS)throws ServiceException, ServiceDaoException;
	
    
	
	

	

	

}
