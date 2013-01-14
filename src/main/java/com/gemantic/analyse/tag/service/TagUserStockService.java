package com.gemantic.analyse.tag.service;

import java.util.List;
import java.util.Map;

import org.osoa.sca.annotations.Remotable;

import com.gemantic.analyse.tag.model.TagUserStock;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

@Remotable
public interface TagUserStockService {

	public Long insert(TagUserStock tagUserStock) throws ServiceException, ServiceDaoException;

	public List<TagUserStock> insertList(List<TagUserStock> tagUserStockList) throws ServiceException,
			ServiceDaoException;

	public boolean delete(Long id) throws ServiceException, ServiceDaoException;

	public boolean update(TagUserStock tagUserStock) throws ServiceException, ServiceDaoException;

	public boolean updateList(List<TagUserStock> tagUserStockList) throws ServiceException, ServiceDaoException;

	public TagUserStock getObjectById(Long id) throws ServiceException, ServiceDaoException;

	public List<TagUserStock> getObjectsByIds(List<Long> ids) throws ServiceException, ServiceDaoException;

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long> getTagUserStockIdsBySymbol(String symbol, Integer start, Integer limit) throws ServiceException,
			ServiceDaoException;

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long> getTagUserStockIdsByUserId(Long userId, Integer start, Integer limit) throws ServiceException,
			ServiceDaoException;

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long> getTagUserStockIdsByTagId(Long tagId, Integer start, Integer limit) throws ServiceException,
			ServiceDaoException;

	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public Long  getTagUserStockIdBySymbolAndTagIdAndUserId(String symbol,Long tagId,Long userId)throws ServiceException, ServiceDaoException;
		
	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long>  getTagUserStockIdsByTagIdAndUserId(Long tagId,Long userId,Integer start,Integer limit)throws ServiceException, ServiceDaoException;
			
	
			
	/**
	 * 
	 * @param 
	 * @return 
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long>  getTagUserStockIdsBySymbolAndUserId(String symbol,Long userId,Integer start,Integer limit)throws ServiceException, ServiceDaoException;

}
