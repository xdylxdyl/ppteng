package com.gemantic.analyse.tag.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gemantic.analyse.tag.model.TagUserStock;
import com.gemantic.analyse.tag.service.TagUserStockService;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.dal.dao.Dao;
import com.gemantic.dal.dao.exception.DaoException;

@Component
public class TagUserStockServiceImpl implements TagUserStockService {

	@Autowired
	private Dao dao;

	private static final Log log = LogFactory.getLog(TagUserStockServiceImpl.class);

	public Dao getDao() {
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	@Override
	public Long insert(TagUserStock tagUserStock) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert data : " + tagUserStock);
		}
		if (tagUserStock == null) {
			return null;
		}

		long currentTimeMillis = System.currentTimeMillis();
		tagUserStock.setCreateAt(currentTimeMillis);
		tagUserStock.setUpdateAt(currentTimeMillis);

		Long result = null;
		try {
			result = (Long) dao.save(tagUserStock);
		} catch (DaoException e) {
			log.error(" insert wrong : " + tagUserStock);
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
	public List<TagUserStock> insertList(List<TagUserStock> tagUserStockList) throws ServiceException,
			ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" insert lists : " + (tagUserStockList == null ? "null" : tagUserStockList.size()));
		}
		List<TagUserStock> resultList = null;

		if (CollectionUtils.isEmpty(tagUserStockList)) {
			return new ArrayList<TagUserStock>();
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (TagUserStock tagUserStock : tagUserStockList) {
			tagUserStock.setCreateAt(currentTimeMillis);
			tagUserStock.setUpdateAt(currentTimeMillis);
		}

		try {
			resultList = (List<TagUserStock>) dao.batchSave(tagUserStockList);
		} catch (DaoException e) {
			log.error(" insert list wrong : " + tagUserStockList);
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
			result = dao.delete(TagUserStock.class, id);
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
	public boolean update(TagUserStock tagUserStock) throws ServiceException, ServiceDaoException {

		log.info(" update data : " + (tagUserStock == null ? "null" : tagUserStock.getId()));

		boolean result = false;

		if (tagUserStock == null) {
			return true;
		}

		tagUserStock.setUpdateAt(System.currentTimeMillis());

		try {
			result = dao.update(tagUserStock);
		} catch (DaoException e) {
			log.error(" update wrong : " + tagUserStock);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update data success : " + tagUserStock);
		}
		return result;
	}

	@Override
	public boolean updateList(List<TagUserStock> tagUserStockList) throws ServiceException, ServiceDaoException {

		log.info(" update lists : " + (tagUserStockList == null ? "null" : tagUserStockList.size()));

		boolean result = false;

		if (CollectionUtils.isEmpty(tagUserStockList)) {
			return true;
		}

		long currentTimeMillis = System.currentTimeMillis();
		for (TagUserStock tagUserStock : tagUserStockList) {
			tagUserStock.setUpdateAt(currentTimeMillis);
		}

		try {
			result = dao.batchUpdate(tagUserStockList);
		} catch (DaoException e) {
			log.error(" update list wrong : " + tagUserStockList);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" update lists success : " + tagUserStockList.size());
		}
		return result;
	}

	@Override
	public TagUserStock getObjectById(Long id) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get data : " + id);
		}
		TagUserStock tagUserStock = null;

		if (id == null) {
			return tagUserStock;
		}

		try {
			tagUserStock = (TagUserStock) dao.get(TagUserStock.class, id);
		} catch (DaoException e) {
			log.error(" get wrong : " + id);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : " + id);
		}
		return tagUserStock;
	}

	@Override
	public List<TagUserStock> getObjectsByIds(List<Long> ids) throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get lists : " + (ids == null ? "null" : ids));
		}
		List<TagUserStock> tagUserStock = null;

		if (CollectionUtils.isEmpty(ids)) {
			return new ArrayList<TagUserStock>();
		}

		try {
			tagUserStock = (List<TagUserStock>) dao.getList(TagUserStock.class, ids);
		} catch (DaoException e) {
			log.error(" get wrong : " + ids);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get data success : " + (tagUserStock == null ? "null" : tagUserStock.size()));
		}
		return tagUserStock;
	}

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	@Override
	public List<Long> getTagUserStockIdsBySymbol(String symbol, Integer start, Integer limit) throws ServiceException,
			ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get ids by symbol,start,limit  : " + symbol + " , " + start + " , " + limit);
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
			idList = dao.getIdList("getTagUserStockIdsBySymbol", new Object[] { symbol }, start, limit, false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by symbol,start,limit)  : " + symbol + " , " + start + " , " + limit);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
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
	public List<Long> getTagUserStockIdsByUserId(Long userId, Integer start, Integer limit) throws ServiceException,
			ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get ids by userId,start,limit  : " + userId + " , " + start + " , " + limit);
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
			idList = dao.getIdList("getTagUserStockIdsByUserId", new Object[] { userId }, start, limit, false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by userId,start,limit)  : " + userId + " , " + start + " , " + limit);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
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
	public List<Long> getTagUserStockIdsByTagId(Long tagId, Integer start, Integer limit) throws ServiceException,
			ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get ids by tagId,start,limit  : " + tagId + " , " + start + " , " + limit);
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
			idList = dao.getIdList("getTagUserStockIdsByTagId", new Object[] { tagId }, start, limit, false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by tagId,start,limit)  : " + tagId + " , " + start + " , " + limit);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get ids success : " + (idList == null ? "null" : idList.size()));
		}
		return idList;

	}

	/*
	 * @param
	 * 
	 * @return
	 * 
	 * @throws ServiceException
	 * 
	 * @throws ServiceDaoException
	 */
	@Override
	public Long getTagUserStockIdBySymbolAndTagIdAndUserId(String symbol, Long tagId, Long userId)
			throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get id by symbol,tagId,userId  : " + symbol + " , " + tagId + " , " + userId);
		}
		Long id = null;

		// TODO 参数检查!

		try {

			id = (Long) dao.getMapping("getTagUserStockIdBySymbolAndTagIdAndUserId", new Object[] { symbol, tagId,
					userId });
		} catch (DaoException e) {
			log.error(" get id wrong by symbol,tagId,userId  : " + symbol + " , " + tagId + " , " + userId);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
			log.info(" get id success : " + id);
		}
		return id;

	}

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	@Override
	public List<Long> getTagUserStockIdsBySymbolAndUserId(String symbol, Long userId, Integer start, Integer limit)
			throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get ids by symbol,userId,start,limit  : " + symbol + " , " + userId + " , " + start + " , "
					+ limit);
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
			idList = dao.getIdList("getTagUserStockIdsBySymbolAndUserId", new Object[] { symbol, userId }, start,
					limit, false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by symbol,userId,start,limit)  : " + symbol + " , " + userId + " , " + start
					+ " , " + limit);
			log.error(e);
			e.printStackTrace();
			throw new ServiceDaoException(e);
		}
		if (log.isInfoEnabled()) {
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
	public List<Long> getTagUserStockIdsByTagIdAndUserId(Long tagId, Long userId, Integer start, Integer limit)
			throws ServiceException, ServiceDaoException {

		if (log.isInfoEnabled()) {
			log.info(" get ids by tagId,userId,start,limit  : " + tagId + " , " + userId + " , " + start + " , "
					+ limit);
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
			idList = dao.getIdList("getTagUserStockIdsByTagIdAndUserId", new Object[] { tagId, userId }, start, limit,
					false);

		} catch (DaoException e) {
			log.error(" get ids  wrong by tagId,userId,start,limit)  : " + tagId + " , " + userId + " , " + start
					+ " , " + limit);
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
