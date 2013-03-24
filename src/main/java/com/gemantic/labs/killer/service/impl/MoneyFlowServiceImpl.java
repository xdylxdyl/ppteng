package com.gemantic.labs.killer.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.dal.dao.Dao;
import com.gemantic.dal.dao.exception.DaoException;
import com.gemantic.labs.killer.model.MoneyFlow;
import com.gemantic.labs.killer.service.MoneyFlowService;


@Component
public class MoneyFlowServiceImpl implements MoneyFlowService {

	@Autowired
    private Dao dao;

	private static final Log log = LogFactory.getLog(MoneyFlowServiceImpl.class);

	public Dao getDao() {
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}


		   
		@Override
		public Long insert(MoneyFlow moneyFlow)throws ServiceException, ServiceDaoException{
		
	
		           if(log.isInfoEnabled()){	
    log.info(" insert data : " + moneyFlow);
 }
		if (moneyFlow == null) {
			return null;
		}

		long currentTimeMillis = System.currentTimeMillis();
		moneyFlow.setCreateAt(currentTimeMillis);
		moneyFlow.setUpdateAt(currentTimeMillis);

		Long result = null;
		try {
			result = (Long) dao.save(moneyFlow);
		} catch (DaoException e) {
			log.error(" insert wrong : " + moneyFlow);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
      if(log.isInfoEnabled()){
		log.info(" insert data success : " + result);
      }
return result;	
		}	
		  
    	   
		@Override
		public List<MoneyFlow> insertList(List<MoneyFlow> moneyFlowList)throws ServiceException, ServiceDaoException{
		
	
		          	 if(log.isInfoEnabled()){
        log.info(" insert lists : " + (moneyFlowList == null ? "null" : moneyFlowList.size()));
      }
		List<MoneyFlow> resultList = null;

		if (CollectionUtils.isEmpty(moneyFlowList)) {
			return new ArrayList<MoneyFlow>();
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (MoneyFlow moneyFlow : moneyFlowList) {
			moneyFlow.setCreateAt(currentTimeMillis);
			moneyFlow.setUpdateAt(currentTimeMillis);
		}

		try {
			resultList = (List<MoneyFlow>) dao.batchSave(moneyFlowList);
		} catch (DaoException e) {
			log.error(" insert list wrong : " + moneyFlowList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
     if(log.isInfoEnabled()){
		log.info(" insert lists  success : " + (resultList == null ? "null" : resultList.size()));
      }
		return resultList;
		
		
			
		}	
		  
    	   
		@Override
		public boolean delete(Long id)throws ServiceException, ServiceDaoException{
		
	
		             if(log.isInfoEnabled()){
	    log.info(" delete data : " + id);
    }
		boolean result = false;

		if (id == null) {
			return true;
		}

		try {
			result = dao.delete(MoneyFlow.class, id);
		} catch (DaoException e) {
			log.error(" delete wrong : " + id);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
   if(log.isInfoEnabled()){
		log.info(" delete data success : " + id);
    }
		return result;
		
		}	
		  
    	   
		@Override
		public boolean update(MoneyFlow moneyFlow)throws ServiceException, ServiceDaoException{
		
	
		          
	log.info(" update data : " + (moneyFlow == null ? "null" : moneyFlow.getId()));

		boolean result = false;

		if (moneyFlow == null) {
			return true;
		}

		moneyFlow.setUpdateAt(System.currentTimeMillis());

		try {
			result = dao.update(moneyFlow);
		} catch (DaoException e) {
			log.error(" update wrong : " + moneyFlow);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
       if(log.isInfoEnabled()){
		log.info(" update data success : " + moneyFlow);
       }
		return result;	
		}	
		  
    	   
		@Override
		public boolean updateList(List<MoneyFlow> moneyFlowList)throws ServiceException, ServiceDaoException{
		
	
		          log.info(" update lists : " + (moneyFlowList == null ? "null" : moneyFlowList.size()));

		boolean result = false;

		if (CollectionUtils.isEmpty(moneyFlowList)) {
			return true;
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (MoneyFlow moneyFlow : moneyFlowList) {
			moneyFlow.setUpdateAt(currentTimeMillis);
		}

		try {
			result = dao.batchUpdate(moneyFlowList);
		} catch (DaoException e) {
			log.error(" update list wrong : " + moneyFlowList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
         if(log.isInfoEnabled()){
		log.info(" update lists success : " + moneyFlowList.size());
         }
		return result;	
		}	
		  
    	   
		@Override
		public MoneyFlow getObjectById(Long id)throws ServiceException, ServiceDaoException{
		
	
		                 if(log.isInfoEnabled()){
        log.info(" get data : " + id);
       }
		MoneyFlow moneyFlow = null;

		if (id == null) {
			return moneyFlow;
		}

		try {
			moneyFlow = (MoneyFlow) dao.get(MoneyFlow.class, id);
		} catch (DaoException e) {
			log.error(" get wrong : " + id);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
       if(log.isInfoEnabled()){
		log.info(" get data success : " + id);
        }
		return moneyFlow;		
		}	
		  
    	   
		@Override
		public List<MoneyFlow> getObjectsByIds(List<Long> ids)throws ServiceException, ServiceDaoException{
		
	
		          	  if(log.isInfoEnabled()){
	    log.info(" get lists : " + (ids == null ? "null" : ids));
      }
		List<MoneyFlow> moneyFlow = null;

		if (CollectionUtils.isEmpty(ids)) {
			return new ArrayList<MoneyFlow>();
		}

		try {
			moneyFlow = (List<MoneyFlow>) dao.getList(MoneyFlow.class, ids);
		} catch (DaoException e) {
			log.error(" get wrong : " + ids);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
     if(log.isInfoEnabled()){
		log.info(" get data success : " + (moneyFlow == null ? "null" : moneyFlow.size()));
     }
		return moneyFlow;	
		}	
		  
    	
		
	
	
			
			
		/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	 @Override
	public List<Long>  getMoneyFlowIdsByFid(Long fid,Integer start,Integer limit)throws ServiceException, ServiceDaoException{
		
		       if(log.isInfoEnabled()){
      log.info(" get ids by fid,start,limit  : " + fid+" , "+start+" , "+limit );
	  }
	 	List<Long> idList = null;
        
        // TODO 参数检查!

        if (start == null) {
            start = 0;
        }

        if (limit == null) {
            limit = Integer.MAX_VALUE;
        }

	try {
		idList = dao.getIdList("getMoneyFlowIdsByFid", new Object[] { fid},start,limit, false);

   
   } catch (DaoException e) {
			log.error(" get ids  wrong by fid,start,limit)  : " + fid+" , "+start+" , "+limit );
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
  if(log.isInfoEnabled()){
   log.info(" get ids success : " + (idList == null ? "null" : idList.size()));
  }
		return idList;
		
	
	
	}
	
			
			
		/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	 @Override
	public List<Long>  getMoneyFlowIdsByUid(Long uid,Integer start,Integer limit)throws ServiceException, ServiceDaoException{
		
		       if(log.isInfoEnabled()){
      log.info(" get ids by uid,start,limit  : " + uid+" , "+start+" , "+limit );
	  }
	 	List<Long> idList = null;
        
        // TODO 参数检查!

        if (start == null) {
            start = 0;
        }

        if (limit == null) {
            limit = Integer.MAX_VALUE;
        }

	try {
		idList = dao.getIdList("getMoneyFlowIdsByUid", new Object[] { uid},start,limit, false);

   
   } catch (DaoException e) {
			log.error(" get ids  wrong by uid,start,limit)  : " + uid+" , "+start+" , "+limit );
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
  if(log.isInfoEnabled()){
   log.info(" get ids success : " + (idList == null ? "null" : idList.size()));
  }
		return idList;
		
	
	
	}
	
		
	

}

