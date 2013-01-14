package com.gemantic.analyse.tag.service;

import java.util.List;

import com.gemantic.analyse.tag.model.TStock;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

public interface TStockService {
		
	
	
	void add(TStock stock)throws ServiceException, ServiceDaoException;

	TStock getTStockBySymbol(String symbol)throws ServiceException, ServiceDaoException;

	void update(TStock stock) throws ServiceException, ServiceDaoException;

	List<TStock> getTags(List<String> symbols)throws ServiceException, ServiceDaoException;

	void batchAdd(List<TStock> tstocks)throws ServiceException, ServiceDaoException;

	List<TStock> getAll()throws ServiceException, ServiceDaoException;

	

}
