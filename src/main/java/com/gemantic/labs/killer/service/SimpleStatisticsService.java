package com.gemantic.labs.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.labs.killer.model.SimpleStatistics;


public interface SimpleStatisticsService {

	



   		   
		
		public Long insert(SimpleStatistics simpleStatistics)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<SimpleStatistics> insertList(List<SimpleStatistics> simpleStatisticsList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean delete(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean update(SimpleStatistics simpleStatistics)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean updateList(List<SimpleStatistics> simpleStatisticsList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public SimpleStatistics getObjectById(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<SimpleStatistics> getObjectsByIds(List<Long> ids)throws ServiceException, ServiceDaoException;
		
		
		
		public List<Long> getSimpleStatisticsIDSByQuery(String query,String secondQuery, String desc, Integer start, Integer size)throws ServiceException, ServiceDaoException;
		  
    	
	

		
	

}

