package com.gemantic.labs.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.labs.killer.model.UserRecord;


public interface UserRecordService {

	



   		   
		
		public Long insert(UserRecord userRecord)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<UserRecord> insertList(List<UserRecord> userRecordList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean delete(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean update(UserRecord userRecord)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean updateList(List<UserRecord> userRecordList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public UserRecord getObjectById(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<UserRecord> getObjectsByIds(List<Long> ids)throws ServiceException, ServiceDaoException;
		  
    	
	

			
			
	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long>  getUserRecordIdsByVersionAndUidOrderByRecordAt(String version,Long uid,Integer start,Integer limit)throws ServiceException, ServiceDaoException;
			
			
	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long>  getUserRecordIdsByUidOrderByRecordAt(Long uid,Integer start,Integer limit)throws ServiceException, ServiceDaoException;
		
	

}

