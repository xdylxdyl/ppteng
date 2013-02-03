package com.gemantic.labs.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.labs.killer.model.Records;


public interface RecordService {

	



   		   
		
		public Long insert(Records record)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<Records> insertList(List<Records> recordList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean delete(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean update(Records record)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean updateList(List<Records> recordList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public Records getObjectById(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<Records> getObjectsByIds(List<Long> ids)throws ServiceException, ServiceDaoException;
		  
    	
	

			
			
	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long>  getRecordIdsByVersion(String version,Integer start,Integer limit)throws ServiceException, ServiceDaoException;



	public List<Long> getList(Integer start,Integer limit) throws ServiceException, ServiceDaoException;



	List<String> getContent(Long recordID) throws ServiceException, ServiceDaoException;;
		
	

}

