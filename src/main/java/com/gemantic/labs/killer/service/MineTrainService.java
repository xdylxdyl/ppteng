package com.gemantic.labs.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.labs.killer.model.MineTrain;


public interface MineTrainService {

	



   		   
		
		public Long insert(MineTrain mineTrain)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<MineTrain> insertList(List<MineTrain> mineTrainList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean delete(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean update(MineTrain mineTrain)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean updateList(List<MineTrain> mineTrainList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public MineTrain getObjectById(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<MineTrain> getObjectsByIds(List<Long> ids)throws ServiceException, ServiceDaoException;
		
		
		
		public List<Long> getList(Integer start,Integer limit) throws ServiceException, ServiceDaoException;
		  
    	
	

		
	

}

