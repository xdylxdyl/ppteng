package com.gemantic.killer.service;

import java.util.List;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.Record;

public interface RecordService {
	
	
	

	/**
	 * get history record list
	 * @param start
	 * @param end
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	List<Record> getList(Long start, Long end)throws ServiceException,ServiceDaoException;

	
	/**
	 * replay
	 * @param uid playerid
	 * @param rid TODO
	 * @param id recordid
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */

	void play(Long recordID, Long rid)throws ServiceException,ServiceDaoException;


	/**
	 * 创建一条新记录
	 * @param record
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	void addRecord(Record record)throws ServiceException,ServiceDaoException;
	

    /**
     * 
     * @param recordID
     * @return
     * @throws ServiceException
     * @throws ServiceDaoException
     */
	List<String> getContent(Long recordID)throws ServiceException,ServiceDaoException;
	/**
	 * 
	 * @param recordID
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	
	Record getRecord(Long recordID) throws ServiceException,ServiceDaoException;

}
