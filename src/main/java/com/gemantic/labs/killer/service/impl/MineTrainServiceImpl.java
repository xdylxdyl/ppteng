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
import com.gemantic.labs.killer.model.MineTrain;
import com.gemantic.labs.killer.service.MineTrainService;

@Component
public class MineTrainServiceImpl implements MineTrainService {

	@Autowired
	private Dao dao;

	private static final Log log = LogFactory
			.getLog(MineTrainServiceImpl.class);

	public Dao getDao() {
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	@Override
	public Long insert(MineTrain mineTrain) throws ServiceException,
			ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert data : " + mineTrain);
		}
		if (mineTrain == null) {
			return null;
		}

		long currentTimeMillis = System.currentTimeMillis();
		mineTrain.setCreateAt(currentTimeMillis);
		mineTrain.setUpdateAt(currentTimeMillis);

		Long result = null;
		try {
			result = (Long) dao.save(mineTrain);
		} catch (DaoException e) {
			log.error(" insert wrong : " + mineTrain);
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
	public List<MineTrain> insertList(List<MineTrain> mineTrainList)
			throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert lists : "
					+ (mineTrainList == null ? "null" : mineTrainList.size()));
		}
		List<MineTrain> resultList = null;

		if (CollectionUtils.isEmpty(mineTrainList)) {
			return new ArrayList<MineTrain>();
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (MineTrain mineTrain : mineTrainList) {
			mineTrain.setCreateAt(currentTimeMillis);
			mineTrain.setUpdateAt(currentTimeMillis);
		}

		try {
			resultList = (List<MineTrain>) dao.batchSave(mineTrainList);
		} catch (DaoException e) {
			log.error(" insert list wrong : " + mineTrainList);
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
			result = dao.delete(MineTrain.class, id);
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
	public boolean update(MineTrain mineTrain) throws ServiceException,
			ServiceDaoException {

		log.info(" update data : "
				+ (mineTrain == null ? "null" : mineTrain.getId()));

		boolean result = false;

		if (mineTrain == null) {
			return true;
		}

		mineTrain.setUpdateAt(System.currentTimeMillis());

		try {
			result = dao.update(mineTrain);
		} catch (DaoException e) {
			log.error(" update wrong : " + mineTrain);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update data success : " + mineTrain);
		}
		return result;
	}

	@Override
	public boolean updateList(List<MineTrain> mineTrainList)
			throws ServiceException, ServiceDaoException {

		log.info(" update lists : "
				+ (mineTrainList == null ? "null" : mineTrainList.size()));

		boolean result = false;

		if (CollectionUtils.isEmpty(mineTrainList)) {
			return true;
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (MineTrain mineTrain : mineTrainList) {
			mineTrain.setUpdateAt(currentTimeMillis);
		}

		try {
			result = dao.batchUpdate(mineTrainList);
		} catch (DaoException e) {
			log.error(" update list wrong : " + mineTrainList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update lists success : " + mineTrainList.size());
		}
		return result;
	}

	@Override
	public MineTrain getObjectById(Long id) throws ServiceException,
			ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get data : " + id);
		}
		MineTrain mineTrain = null;

		if (id == null) {
			return mineTrain;
		}

		try {
			mineTrain = (MineTrain) dao.get(MineTrain.class, id);
		} catch (DaoException e) {
			log.error(" get wrong : " + id);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : " + id);
		}
		return mineTrain;
	}

	@Override
	public List<MineTrain> getObjectsByIds(List<Long> ids)
			throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get lists : " + (ids == null ? "null" : ids));
		}
		List<MineTrain> mineTrain = null;

		if (CollectionUtils.isEmpty(ids)) {
			return new ArrayList<MineTrain>();
		}

		try {
			mineTrain = (List<MineTrain>) dao.getList(MineTrain.class, ids);
		} catch (DaoException e) {
			log.error(" get wrong : " + ids);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : "
					+ (mineTrain == null ? "null" : mineTrain.size()));
		}
		return mineTrain;
	}

	public List<Long> getList(Integer start, Integer limit)
			throws ServiceException, ServiceDaoException {

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
			// idList = (List<Long>)
			// dao.excuteSimpleSql("select id from records where version = "+version,
			// Records.class);
			idList = dao.getIdList("getMineTrainAll", new Object[] {}, start, limit,
					false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by version,start,limit)  , " + start
					+ " , " + limit);
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
