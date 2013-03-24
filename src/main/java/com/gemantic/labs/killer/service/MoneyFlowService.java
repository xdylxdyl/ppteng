package com.gemantic.labs.killer.service;

import java.util.List;
import java.util.Map;



import com.gemantic.labs.killer.model.MoneyFlow;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;


public interface MoneyFlowService {

	



   		   
		
		public Long insert(MoneyFlow moneyFlow)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<MoneyFlow> insertList(List<MoneyFlow> moneyFlowList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean delete(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean update(MoneyFlow moneyFlow)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public boolean updateList(List<MoneyFlow> moneyFlowList)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public MoneyFlow getObjectById(Long id)throws ServiceException, ServiceDaoException;
		  
    	   
		
		public List<MoneyFlow> getObjectsByIds(List<Long> ids)throws ServiceException, ServiceDaoException;
		  
    	
	

			
			
	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long>  getMoneyFlowIdsByFid(Long fid,Integer start,Integer limit)throws ServiceException, ServiceDaoException;
			
			
	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long>  getMoneyFlowIdsByUid(Long uid,Integer start,Integer limit)throws ServiceException, ServiceDaoException;
		
	

}

