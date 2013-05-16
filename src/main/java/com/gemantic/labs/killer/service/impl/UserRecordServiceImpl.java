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
import com.gemantic.labs.killer.model.UserRecord;
import com.gemantic.labs.killer.service.UserRecordService;
@Component
public class UserRecordServiceImpl implements UserRecordService {

	@Autowired
	private Dao dao;

	private static final Log log = LogFactory
			.getLog(UserRecordServiceImpl.class);

	public Dao getDao() {
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	@Override
	public Long insert(UserRecord userRecord) throws ServiceException,
			ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert data : " + userRecord);
		}
		if (userRecord == null) {
			return null;
		}

		long currentTimeMillis = System.currentTimeMillis();
		userRecord.setCreateAt(currentTimeMillis);
		userRecord.setUpdateAt(currentTimeMillis);

		Long result = null;
		try {
			result = (Long) dao.save(userRecord);
		} catch (DaoException e) {
			log.error(" insert wrong : " + userRecord);
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
	public List<UserRecord> insertList(List<UserRecord> userRecordList)
			throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert lists : "
					+ (userRecordList == null ? "null" : userRecordList.size()));
		}
		List<UserRecord> resultList = null;

		if (CollectionUtils.isEmpty(userRecordList)) {
			return new ArrayList<UserRecord>();
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (UserRecord userRecord : userRecordList) {
			userRecord.setCreateAt(currentTimeMillis);
			userRecord.setUpdateAt(currentTimeMillis);
		}

		try {
			resultList = (List<UserRecord>) dao.batchSave(userRecordList);
		} catch (DaoException e) {
			log.error(" insert list wrong : " + userRecordList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" insert lists  success : "
					+ (resultList == null ? "null" : resultList.size()));
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
			result = dao.delete(UserRecord.class, id);
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
	public boolean update(UserRecord userRecord) throws ServiceException,
			ServiceDaoException {

		log.info(" update data : "
				+ (userRecord == null ? "null" : userRecord.getId()));

		boolean result = false;

		if (userRecord == null) {
			return true;
		}

		userRecord.setUpdateAt(System.currentTimeMillis());

		try {
			result = dao.update(userRecord);
		} catch (DaoException e) {
			log.error(" update wrong : " + userRecord);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update data success : " + userRecord);
		}
		return result;
	}

	@Override
	public boolean updateList(List<UserRecord> userRecordList)
			throws ServiceException, ServiceDaoException {

		log.info(" update lists : "
				+ (userRecordList == null ? "null" : userRecordList.size()));

		boolean result = false;

		if (CollectionUtils.isEmpty(userRecordList)) {
			return true;
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (UserRecord userRecord : userRecordList) {
			userRecord.setUpdateAt(currentTimeMillis);
		}

		try {
			result = dao.batchUpdate(userRecordList);
		} catch (DaoException e) {
			log.error(" update list wrong : " + userRecordList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update lists success : " + userRecordList.size());
		}
		return result;
	}

	@Override
	public UserRecord getObjectById(Long id) throws ServiceException,
			ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get data : " + id);
		}
		UserRecord userRecord = null;

		if (id == null) {
			return userRecord;
		}

		try {
			userRecord = (UserRecord) dao.get(UserRecord.class, id);
		} catch (DaoException e) {
			log.error(" get wrong : " + id);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : " + id);
		}
		return userRecord;
	}

	@Override
	public List<UserRecord> getObjectsByIds(List<Long> ids)
			throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get lists : " + (ids == null ? "null" : ids));
		}
		List<UserRecord> userRecord = null;

		if (CollectionUtils.isEmpty(ids)) {
			return new ArrayList<UserRecord>();
		}

		try {
			userRecord = (List<UserRecord>) dao.getList(UserRecord.class, ids);
		} catch (DaoException e) {
			log.error(" get wrong : " + ids);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : "
					+ (userRecord == null ? "null" : userRecord.size()));
		}
		return userRecord;
	}

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	@Override
	public List<Long> getUserRecordIdsByVersionAndUidOrderByRecordAt(
			String version, Long uid, Integer start, Integer limit)
			throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get ids by version,uid,start,limit  : " + version
					+ " , " + uid + " , " + start + " , " + limit);
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
			idList = dao.getIdList(
					"getUserRecordIdsByVersionAndUidOrderByRecordAt",
					new Object[] { version, uid }, start, limit, false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by version,uid,start,limit)  : "
					+ version + " , " + uid + " , " + start + " , " + limit);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get ids success : "
					+ (idList == null ? "null" : idList.size()));
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
	public List<Long> getUserRecordIdsByUidOrderByRecordAt(Long uid,
			Integer start, Integer limit) throws ServiceException,
			ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get ids by uid,start,limit  : " + uid + " , " + start
					+ " , " + limit);
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
			idList = dao.getIdList("getUserRecordIdsByUidOrderByRecordAt",
					new Object[] { uid }, start, limit, false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by uid,start,limit)  : " + uid + " , "
					+ start + " , " + limit);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get ids success : "
					+ (idList == null ? "null" : idList.size()));
		}
		return idList;

	}

}
