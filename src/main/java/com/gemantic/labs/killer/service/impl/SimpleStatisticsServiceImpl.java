package com.gemantic.labs.killer.service.impl;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.dal.dao.Dao;
import com.gemantic.dal.dao.exception.DaoException;
import com.gemantic.labs.killer.model.SimpleStatistics;
import com.gemantic.labs.killer.service.SimpleStatisticsService;

@Component
public class SimpleStatisticsServiceImpl implements SimpleStatisticsService {

	@Autowired
	private Dao dao;

	private static final Log log = LogFactory.getLog(SimpleStatisticsServiceImpl.class);

	public Dao getDao() {
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	@Override
	public Long insert(SimpleStatistics simpleStatistics) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert data : " + simpleStatistics);
		}
		if (simpleStatistics == null) {
			return null;
		}

		long currentTimeMillis = System.currentTimeMillis();
		simpleStatistics.setCreateAt(currentTimeMillis);
		simpleStatistics.setUpdateAt(currentTimeMillis);

		Long result = null;
		try {
			result = (Long) dao.save(simpleStatistics);
		} catch (DaoException e) {
			log.error(" insert wrong : " + simpleStatistics);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" insert data success : " + result);
		}
		return result;
	}

	@Override
	public List<SimpleStatistics> insertList(List<SimpleStatistics> simpleStatisticsList) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert lists : " + (simpleStatisticsList == null ? "null" : simpleStatisticsList.size()));
		}
		List<SimpleStatistics> resultList = null;

		if (CollectionUtils.isEmpty(simpleStatisticsList)) {
			return new ArrayList<SimpleStatistics>();
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (SimpleStatistics simpleStatistics : simpleStatisticsList) {
			simpleStatistics.setCreateAt(currentTimeMillis);
			simpleStatistics.setUpdateAt(currentTimeMillis);
		}

		try {
			resultList = (List<SimpleStatistics>) dao.batchSave(simpleStatisticsList);
		} catch (DaoException e) {
			log.error(" insert list wrong : " + simpleStatisticsList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" insert lists  success : " + (resultList == null ? "null" : resultList.size()));
		}
		return resultList;

	}

	@Override
	public boolean delete(Long id) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" delete data : " + id);
		}
		boolean result = false;

		if (id == null) {
			return true;
		}

		try {
			result = dao.delete(SimpleStatistics.class, id);
		} catch (DaoException e) {
			log.error(" delete wrong : " + id);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" delete data success : " + id);
		}
		return result;

	}

	@Override
	public boolean update(SimpleStatistics simpleStatistics) throws ServiceException, ServiceDaoException {

		log.info(" update data : " + (simpleStatistics == null ? "null" : simpleStatistics.getId()));

		boolean result = false;

		if (simpleStatistics == null) {
			return true;
		}

		simpleStatistics.setUpdateAt(System.currentTimeMillis());

		try {
			result = dao.update(simpleStatistics);
		} catch (DaoException e) {
			log.error(" update wrong : " + simpleStatistics);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update data success : " + simpleStatistics);
		}
		return result;
	}

	@Override
	public boolean updateList(List<SimpleStatistics> simpleStatisticsList) throws ServiceException, ServiceDaoException {

		log.info(" update lists : " + (simpleStatisticsList == null ? "null" : simpleStatisticsList.size()));

		boolean result = false;

		if (CollectionUtils.isEmpty(simpleStatisticsList)) {
			return true;
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (SimpleStatistics simpleStatistics : simpleStatisticsList) {
			simpleStatistics.setUpdateAt(currentTimeMillis);
		}

		try {
			result = dao.batchUpdate(simpleStatisticsList);
		} catch (DaoException e) {
			log.error(" update list wrong : " + simpleStatisticsList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update lists success : " + simpleStatisticsList.size());
		}
		return result;
	}

	@Override
	public SimpleStatistics getObjectById(Long id) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get data : " + id);
		}
		SimpleStatistics simpleStatistics = null;

		if (id == null) {
			return simpleStatistics;
		}

		try {
			simpleStatistics = (SimpleStatistics) dao.get(SimpleStatistics.class, id);
		} catch (DaoException e) {
			log.error(" get wrong : " + id);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : " + id);
		}
		return simpleStatistics;
	}

	@Override
	public List<SimpleStatistics> getObjectsByIds(List<Long> ids) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get lists : " + (ids == null ? "null" : ids));
		}
		List<SimpleStatistics> simpleStatistics = null;

		if (CollectionUtils.isEmpty(ids)) {
			return new ArrayList<SimpleStatistics>();
		}

		try {
			simpleStatistics = (List<SimpleStatistics>) dao.getList(SimpleStatistics.class, ids);
		} catch (DaoException e) {
			log.error(" get wrong : " + ids);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : " + (simpleStatistics == null ? "null" : simpleStatistics.size()));
		}
		return simpleStatistics;
	}

	@Override
	public List<Long> getSimpleStatisticsIDSByQuery(String query,String secondQuery,String desc, Integer start, Integer size) throws ServiceException, ServiceDaoException {
		
	
		
		
		String dbQuery = convertField2Query(query);
		String secondDBQuery = null;
		if(StringUtils.isNotBlank(secondQuery)){
			secondDBQuery = convertField2Query(secondQuery);
		}else{
			
		}
		
		
		if(StringUtils.isNotBlank(dbQuery)){
			String sql;
			if(StringUtils.isNotBlank(secondDBQuery)){
				 sql="select id from (select id,"+dbQuery+"/"+secondDBQuery+" as query_rate from simple_statistics where all_count >= 20 order by query_rate  "+desc +" "+"limit "+start+","+size+")as rates";
				 
			}else{
				 sql = "select id from simple_statistics where all_count >= 20 order by " + dbQuery + " "+desc +" "+"limit "+start+","+size;
			}
			
			
			 log.info(sql);
			try {
				List<Long> ids = (List<Long>) dao.excuteSimpleSql(sql, SimpleStatistics.class);
				return ids;
			} catch (DaoException e) {
				log.error(" get wrong : " + query);
				log.error(e);
				e.printStackTrace();
				throw new ServiceDaoException(e);
			}
		}else{
			throw new ServiceException(-222,"no query");
		}
		
		
		
	}

	private String convertField2Query(String query) {
		String dbQuery = null;
		if("all".equals(query)){
			dbQuery="all_count";
			
		}else{
			Field[] fields=SimpleStatistics.class.getDeclaredFields();
			
			for(Field f:fields){
			
				if(f.getName().equals(query)){
					Method[] methods=SimpleStatistics.class.getMethods();
					Method method;
					try {
						method = SimpleStatistics.class.getMethod("get"+StringUtils.capitalise(f.getName()));
						Column c=method.getAnnotation(Column.class);
						dbQuery=	c.name();
					} catch (SecurityException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (NoSuchMethodException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}				
					
					
				
					
					break;
				}else{
					continue;
				}
			}
		}
		return dbQuery;
	}
	
	public static void main(String[] args) {
		String xd=StringUtils.capitalise("xdyl");
		log.info(xd);
	}

}
