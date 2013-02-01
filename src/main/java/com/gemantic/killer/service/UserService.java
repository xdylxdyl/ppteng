package com.gemantic.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.model.User;

/**
 * 提供用户的基本信息 
 * @return
 */
public interface UserService {

	/**
	 * 通过IDS提供USERS (SOA的年代,提供用户列表的服务就应该是一个List)
	 * @param List<Long> userIDS
	 * @returnList<User>
	 */
	public List<User> getUsers(List<Long> userIDS)throws ServiceException, ServiceDaoException;

	/**
	 * 创建用户
	 * @param email TODO
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public Long create(String name, String email)throws ServiceException, ServiceDaoException;

	/**
	 * 根据用户ID获取用户
	 * @param uid
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public User getUserByID(Long uid)throws ServiceException, ServiceDaoException;
	/**
	 * 更新用户
	 * @param user
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */

	public void update(User user)throws ServiceException, ServiceDaoException;
	
	/**
	 * 验证用户名和密码
	 * @param id
	 * @param password
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */

	public boolean verify(Long id, String password)throws ServiceException, ServiceDaoException;

	/**
	 * 创建用户
	 * @param user
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public Long insertUser(User user)throws ServiceException, ServiceDaoException;

	/**
	 * 
	 * @param email
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public Long getIdByEmail(String email)throws ServiceException, ServiceDaoException;
	
	/**
	 * 
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */

	public Integer getTotalCount()throws ServiceException, ServiceDaoException;
	

	public Long getIdByThird(String type, String key)throws ServiceException, ServiceDaoException;
	
	


	
	
	
	

}
