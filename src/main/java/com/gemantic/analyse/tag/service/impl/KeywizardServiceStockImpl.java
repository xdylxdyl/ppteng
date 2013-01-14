package com.gemantic.analyse.tag.service.impl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gemantic.analyse.tag.model.KeyBoard;
import com.gemantic.analyse.tag.model.TStock;
import com.gemantic.analyse.tag.service.AnalyseKeywizardService;
import com.gemantic.analyse.tag.service.TStockService;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.util.TStockUtil;


@Component("keywizardServiceStockImpl")
public class KeywizardServiceStockImpl implements AnalyseKeywizardService {
	
	
	private static final Log log = LogFactory.getLog(KeywizardServiceStockImpl.class);
	
    private AnalyseKeywizardService trieImpl=new KeywizardServiceTrieImpl(); 
    
    @Autowired
	private TStockService tStockService;
	
		
    

	@Override
	public List<KeyBoard> getKeyBoard(String query, Integer count, String type)
			throws ServiceException, ServiceDaoException { 
		return this.trieImpl.getKeyBoard(query, count, type);
	}

	

	@Override
	public void addKeyBoard(String query, KeyBoard value, String type)
			throws ServiceException, ServiceDaoException {
		
		this.trieImpl.addKeyBoard(query, value, type);
	}



	@Override
	public void init(String type) throws ServiceException,
			ServiceDaoException {

		//不同的实现类需要更改这儿.如果支持同一个服务的多个类型,可以写多个trieImpl,做初始化的时候初始化多个数据
		List<TStock> stocks = this.tStockService.getAll( );
		log.info(" get all stocks "+ stocks.size());
			
		List<KeyBoard> datas=TStockUtil.convert2KeyBoard(stocks);
		
		
		this.trieImpl.initKeyBoard(type,datas);
		
	

	}

	@Override
	public void removeKeyBoard(String query, KeyBoard value, String type)
			throws ServiceException, ServiceDaoException {
		this.trieImpl.removeKeyBoard(query, value, type);
		
		
		
	}

	@Override
	public void clear(String type) throws ServiceException, ServiceDaoException {
	
		this.trieImpl.clear(type);
	}

	public AnalyseKeywizardService getTrieImpl() {
		return trieImpl;
	}

	public void setTrieImpl(AnalyseKeywizardService trieImpl) {
		this.trieImpl = trieImpl;
	}

	@Override
	public void initKeyBoard(String type, List<KeyBoard> datas)
			throws ServiceException, ServiceDaoException {
		this.trieImpl.initKeyBoard(type,datas);
		
	}
	
	
	



	public TStockService gettStockService() {
		return tStockService;
	}



	public void settStockService(TStockService tStockService) {
		this.tStockService = tStockService;
	}
	
	
	

	
	
	
	
	
	

}
