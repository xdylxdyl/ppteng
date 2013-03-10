package com.gemantic.labs.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.model.User;


public interface UsersService {

	



   		   
		
		public Long insert(User users)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<User> insertList(List<User> usersList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean delete(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean update(User users)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean updateList(List<User> usersList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public User getObjectById(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<User> getObjectsByIds(List<Long> ids)throws ServiceException, ServiceDaoException;
		  
    	
	

			
			
	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public Long  getUsersIdByOpenID(String openID)throws ServiceException, ServiceDaoException;
			
			
	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public Long  getUsersIdByEmail(String email)throws ServiceException, ServiceDaoException;



	public boolean verify(Long uid, String password)throws ServiceException, ServiceDaoException;



	public Integer getTotalCount()throws ServiceException, ServiceDaoException;



	/**
	 * 得到金钱排名
	 * @param start
	 * @param size
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long> getUIdsOrderByMoney(Integer start, Integer size)throws ServiceException, ServiceDaoException;;
		
	

}

