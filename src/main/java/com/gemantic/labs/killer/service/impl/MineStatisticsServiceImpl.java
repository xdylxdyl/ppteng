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
import com.gemantic.killer.service.MineStatisticsService;
import com.gemantic.labs.killer.model.MineStatistics;


@Component
public class MineStatisticsServiceImpl implements MineStatisticsService {

	@Autowired
    private Dao dao;

	private static final Log log = LogFactory.getLog(MineStatisticsServiceImpl.class);

	public Dao getDao() {
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}


		   
		@Override
		public Long insert(MineStatistics mineStatistics)throws ServiceException, ServiceDaoException{
		
	
		           if(log.isInfoEnabled()){	
    log.info(" insert data : " + mineStatistics);
 }
		if (mineStatistics == null) {
			return null;
		}

		long currentTimeMillis = System.currentTimeMillis();
		mineStatistics.setCreateAt(currentTimeMillis);
		mineStatistics.setUpdateAt(currentTimeMillis);

		Long result = null;
		try {
			result = (Long) dao.save(mineStatistics);
		} catch (DaoException e) {
			log.error(" insert wrong : " + mineStatistics);
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
		public List<MineStatistics> insertList(List<MineStatistics> mineStatisticsList)throws ServiceException, ServiceDaoException{
		
	
		          	 if(log.isInfoEnabled()){
        log.info(" insert lists : " + (mineStatisticsList == null ? "null" : mineStatisticsList.size()));
      }
		List<MineStatistics> resultList = null;

		if (CollectionUtils.isEmpty(mineStatisticsList)) {
			return new ArrayList<MineStatistics>();
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (MineStatistics mineStatistics : mineStatisticsList) {
			mineStatistics.setCreateAt(currentTimeMillis);
			mineStatistics.setUpdateAt(currentTimeMillis);
		}

		try {
			resultList = (List<MineStatistics>) dao.batchSave(mineStatisticsList);
		} catch (DaoException e) {
			log.error(" insert list wrong : " + mineStatisticsList);
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
			result = dao.delete(MineStatistics.class, id);
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
		public boolean update(MineStatistics mineStatistics)throws ServiceException, ServiceDaoException{
		
	
		          
	log.info(" update data : " + (mineStatistics == null ? "null" : mineStatistics.getId()));

		boolean result = false;

		if (mineStatistics == null) {
			return true;
		}

		mineStatistics.setUpdateAt(System.currentTimeMillis());

		try {
			result = dao.update(mineStatistics);
		} catch (DaoException e) {
			log.error(" update wrong : " + mineStatistics);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
       if(log.isInfoEnabled()){
		log.info(" update data success : " + mineStatistics);
       }
		return result;	
		}	
		  
    	   
		@Override
		public boolean updateList(List<MineStatistics> mineStatisticsList)throws ServiceException, ServiceDaoException{
		
	
		          log.info(" update lists : " + (mineStatisticsList == null ? "null" : mineStatisticsList.size()));

		boolean result = false;

		if (CollectionUtils.isEmpty(mineStatisticsList)) {
			return true;
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (MineStatistics mineStatistics : mineStatisticsList) {
			mineStatistics.setUpdateAt(currentTimeMillis);
		}

		try {
			result = dao.batchUpdate(mineStatisticsList);
		} catch (DaoException e) {
			log.error(" update list wrong : " + mineStatisticsList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
         if(log.isInfoEnabled()){
		log.info(" update lists success : " + mineStatisticsList.size());
         }
		return result;	
		}	
		  
    	   
		@Override
		public MineStatistics getObjectById(Long id)throws ServiceException, ServiceDaoException{
		
	
		                 if(log.isInfoEnabled()){
        log.info(" get data : " + id);
       }
		MineStatistics mineStatistics = null;

		if (id == null) {
			return mineStatistics;
		}

		try {
			mineStatistics = (MineStatistics) dao.get(MineStatistics.class, id);
		} catch (DaoException e) {
			log.error(" get wrong : " + id);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
       if(log.isInfoEnabled()){
		log.info(" get data success : " + id);
        }
		return mineStatistics;		
		}	
		  
    	   
		@Override
		public List<MineStatistics> getObjectsByIds(List<Long> ids)throws ServiceException, ServiceDaoException{
		
	
		          	  if(log.isInfoEnabled()){
	    log.info(" get lists : " + (ids == null ? "null" : ids));
      }
		List<MineStatistics> mineStatistics = null;

		if (CollectionUtils.isEmpty(ids)) {
			return new ArrayList<MineStatistics>();
		}

		try {
			mineStatistics = (List<MineStatistics>) dao.getList(MineStatistics.class, ids);
		} catch (DaoException e) {
			log.error(" get wrong : " + ids);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
     if(log.isInfoEnabled()){
		log.info(" get data success : " + (mineStatistics == null ? "null" : mineStatistics.size()));
     }
		return mineStatistics;	
		}	
		  
    	
		
	
	
			
			
		/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	 @Override
	public List<Long>  getMineStatisticsIdsBySettingAndUidOrderByTime(String setting,Long uid,Integer start,Integer limit)throws ServiceException, ServiceDaoException{
		
		       if(log.isInfoEnabled()){
      log.info(" get ids by setting,uid,start,limit  : " + setting+" , "+uid+" , "+start+" , "+limit );
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
		idList = dao.getIdList("getMineStatisticsIdsBySettingAndUidOrderByTime", new Object[] { setting,uid},start,limit, false);

   
   } catch (DaoException e) {
			log.error(" get ids  wrong by setting,uid,start,limit)  : " + setting+" , "+uid+" , "+start+" , "+limit );
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
	public List<Long>  getMineStatisticsIdsBySettingOrderByTime(String setting,Integer start,Integer limit)throws ServiceException, ServiceDaoException{
		
		       if(log.isInfoEnabled()){
      log.info(" get ids by setting,start,limit  : " + setting+" , "+start+" , "+limit );
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
		idList = dao.getIdList("getMineStatisticsIdsBySettingOrderByTime", new Object[] { setting},start,limit, false);

   
   } catch (DaoException e) {
			log.error(" get ids  wrong by setting,start,limit)  : " + setting+" , "+start+" , "+limit );
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

