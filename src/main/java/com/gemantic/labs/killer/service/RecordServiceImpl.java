package com.gemantic.labs.killer.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.FileUtil;
import com.gemantic.dal.dao.Dao;
import com.gemantic.dal.dao.exception.DaoException;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.service.MemberService;
import com.gemantic.killer.util.MessageUtil;
import com.gemantic.labs.killer.model.Records;

@Component
public class RecordServiceImpl implements RecordService {

	@Autowired
	private Dao dao;

	
	private String path = "record";

	@Autowired
	private MemberService memberService;
	
	private static final Log log = LogFactory.getLog(RecordServiceImpl.class);

	public Dao getDao() {
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	@Override
	public Long insert(Records record) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert data : " + record);
		}
		if (record == null) {
			return null;
		}

		long currentTimeMillis = System.currentTimeMillis();
		record.setCreateAt(currentTimeMillis);
		record.setUpdateAt(currentTimeMillis);

		Long result = null;
		try {
			result = (Long) dao.save(record);
		} catch (DaoException e) {
			log.error(" insert wrong : " + record);
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
	public List<Records> insertList(List<Records> recordList) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert lists : " + (recordList == null ? "null" : recordList.size()));
		}
		List<Records> resultList = null;

		if (CollectionUtils.isEmpty(recordList)) {
			return new ArrayList<Records>();
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (Records record : recordList) {
			record.setCreateAt(currentTimeMillis);
			record.setUpdateAt(currentTimeMillis);
		}

		try {
			resultList = (List<Records>) dao.batchSave(recordList);
		} catch (DaoException e) {
			log.error(" insert list wrong : " + recordList);
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
			result = dao.delete(Records.class, id);
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
	public boolean update(Records record) throws ServiceException, ServiceDaoException {

		log.info(" update data : " + (record == null ? "null" : record.getId()));

		boolean result = false;

		if (record == null) {
			return true;
		}

		record.setUpdateAt(System.currentTimeMillis());

		try {
			result = dao.update(record);
		} catch (DaoException e) {
			log.error(" update wrong : " + record);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update data success : " + record);
		}
		return result;
	}

	@Override
	public boolean updateList(List<Records> recordList) throws ServiceException, ServiceDaoException {

		log.info(" update lists : " + (recordList == null ? "null" : recordList.size()));

		boolean result = false;

		if (CollectionUtils.isEmpty(recordList)) {
			return true;
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (Records record : recordList) {
			record.setUpdateAt(currentTimeMillis);
		}

		try {
			result = dao.batchUpdate(recordList);
		} catch (DaoException e) {
			log.error(" update list wrong : " + recordList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update lists success : " + recordList.size());
		}
		return result;
	}

	@Override
	public Records getObjectById(Long id) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get data : " + id);
		}
		Records record = null;

		if (id == null) {
			return record;
		}

		try {
			record = (Records) dao.get(Records.class, id);
		} catch (DaoException e) {
			log.error(" get wrong : " + id);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : " + id);
		}
		return record;
	}

	@Override
	public List<Records> getObjectsByIds(List<Long> ids) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get lists : " + (ids == null ? "null" : ids));
		}
		List<Records> record = null;

		if (CollectionUtils.isEmpty(ids)) {
			return new ArrayList<Records>();
		}

		try {
			record = (List<Records>) dao.getList(Records.class, ids);
		} catch (DaoException e) {
			log.error(" get wrong : " + ids);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : " + (record == null ? "null" : record.size()));
		}
		return record;
	}

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	@Override
	public List<Long> getRecordIdsByVersion(String version, Integer start, Integer limit) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get ids by version,start,limit  : " + version + " , " + start + " , " + limit);
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
			//idList = (List<Long>) dao.excuteSimpleSql("select id from records where version = "+version, Records.class);
			idList = dao.getIdList("getRecordIdsByVersion", new Object[] { version }, start, limit, false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by version,start,limit)  : " + version + " , " + start + " , " + limit);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get ids success : " + (idList == null ? "null" : idList.size()));
		}
		return idList;

	}

	@Override
	public List<Long> getList(Integer start, Integer limit) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get all ids ,start,limit  :  " + start + " , " + limit);
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
			//idList = (List<Long>) dao.excuteSimpleSql("select id from records where version = "+version, Records.class);
			idList = dao.getIdList("getAll", new Object[] {  }, start, limit, false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by version,start,limit)  , " + start + " , " + limit);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get ids success : " + (idList == null ? "null" : idList.size()));
		}
		return idList;

	}
	
	@Override
	public List<String> getContent(Long recordID) throws ServiceException, ServiceDaoException {
		try {
			
			Records r=this.getObjectById(recordID);
			if(r==null){
				return new ArrayList();
			}
			List<String> lines = FileUtil.readFileAsList(r.getPath(),"utf-8");
		
			return lines;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ArrayList();
	}

	@Override
	public List<Long> getRecordIdsByVersionAndCreateAt(String version, Long createAt, Integer start, Integer limit) throws ServiceException,
			ServiceDaoException {
		if (log.isInfoEnabled()) {
			log.info(" get all ids ,start,limit  :  " + start + " , " + limit);
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
			//idList = (List<Long>) dao.excuteSimpleSql("select id from records where version = "+version, Records.class);
			idList = dao.getIdList("getRecordIdsByVersionAndCreateAt", new Object[] { version,createAt }, start, limit, false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by version,start,limit)  , " + start + " , " + limit);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get ids success : " + (idList == null ? "null" : idList.size()));
		}
		return idList;
	}


}
