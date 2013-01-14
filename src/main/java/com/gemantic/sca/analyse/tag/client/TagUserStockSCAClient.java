/**
 * 
 */
package com.gemantic.sca.analyse.tag.client;

import java.util.List;

import com.gemantic.analyse.tag.model.TagUserStock;
import com.gemantic.analyse.tag.service.TagUserStockService;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

public class TagUserStockSCAClient implements TagUserStockService {

	private TagUserStockService tagUserStockService;

	public TagUserStockService getTagUserStockService() {
		return tagUserStockService;
	}

	public void setTagUserStockService(TagUserStockService tagUserStockService) {
		this.tagUserStockService = tagUserStockService;
	}

	@Override
	public Long insert(TagUserStock tagUserStock) throws ServiceException, ServiceDaoException {

		return tagUserStockService.insert(tagUserStock);

	}

	@Override
	public List<TagUserStock> insertList(List<TagUserStock> tagUserStockList) throws ServiceException,
			ServiceDaoException {

		return tagUserStockService.insertList(tagUserStockList);

	}

	@Override
	public boolean delete(Long id) throws ServiceException, ServiceDaoException {

		return tagUserStockService.delete(id);

	}

	@Override
	public boolean update(TagUserStock tagUserStock) throws ServiceException, ServiceDaoException {

		return tagUserStockService.update(tagUserStock);

	}

	@Override
	public boolean updateList(List<TagUserStock> tagUserStockList) throws ServiceException, ServiceDaoException {

		return tagUserStockService.updateList(tagUserStockList);

	}

	@Override
	public TagUserStock getObjectById(Long id) throws ServiceException, ServiceDaoException {

		return tagUserStockService.getObjectById(id);

	}

	@Override
	public List<TagUserStock> getObjectsByIds(List<Long> ids) throws ServiceException, ServiceDaoException {

		return tagUserStockService.getObjectsByIds(ids);

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

		return tagUserStockService.getTagUserStockIdsBySymbol(symbol, start, limit);

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

		return tagUserStockService.getTagUserStockIdsByUserId(userId, start, limit);

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

		return tagUserStockService.getTagUserStockIdsByTagId(tagId, start, limit);

	}

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	@Override
	public Long getTagUserStockIdBySymbolAndTagIdAndUserId(String symbol, Long tagId, Long userId)
			throws ServiceException, ServiceDaoException {

		return tagUserStockService.getTagUserStockIdBySymbolAndTagIdAndUserId(symbol, tagId, userId);

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

		return tagUserStockService.getTagUserStockIdsBySymbolAndUserId(symbol, userId, start, limit);

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

		return tagUserStockService.getTagUserStockIdsByTagIdAndUserId(tagId, userId, start, limit);

	}

}
