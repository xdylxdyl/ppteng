package com.gemantic.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.labs.killer.model.MineStatistics;

public interface MineStatisticsService {

	public Long insert(MineStatistics mineStatistics) throws ServiceException,
			ServiceDaoException;

	public List<MineStatistics> insertList(
			List<MineStatistics> mineStatisticsList) throws ServiceException,
			ServiceDaoException;

	public boolean delete(Long id) throws ServiceException, ServiceDaoException;

	public boolean update(MineStatistics mineStatistics)
			throws ServiceException, ServiceDaoException;

	public boolean updateList(List<MineStatistics> mineStatisticsList)
			throws ServiceException, ServiceDaoException;

	public MineStatistics getObjectById(Long id) throws ServiceException,
			ServiceDaoException;

	public List<MineStatistics> getObjectsByIds(List<Long> ids)
			throws ServiceException, ServiceDaoException;

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long> getMineStatisticsIdsBySettingAndUidOrderByTime(
			String setting, Long uid, Integer start, Integer limit)
			throws ServiceException, ServiceDaoException;

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long> getMineStatisticsIdsBySettingOrderByTime(String setting,
			Integer start, Integer limit) throws ServiceException,
			ServiceDaoException;

	
	

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long> getRecordIdsBySettingAndUidOrderByTime(
			String setting, Long uid, Integer start, Integer limit)
			throws ServiceException, ServiceDaoException;

	/**
	 * 
	 * @param
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<Long> getRecordIdsBySettingOrderByTime(String setting,
			Integer start, Integer limit) throws ServiceException,
			ServiceDaoException;
}
