package com.gemantic.analyse.tag.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.gemantic.analyse.tag.model.KeyBoard;
import com.gemantic.analyse.tag.service.AnalyseKeywizardService;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

@Component("keywizardServiceCompositeImpl")
public class AnalyseKeywizardServiceImpl implements AnalyseKeywizardService{
	
	private static final Log log = LogFactory.getLog(AnalyseKeywizardService.class);


	@Resource(name = "proxy_config")
	private Map<String,AnalyseKeywizardService> proxy=new HashMap();
	

	

	@PostConstruct
	public synchronized void init() {
		//加载政策term
	
		for(AnalyseKeywizardService p:this.proxy.values()){
			try {
				log.info(p+" init ");
				p.init("");
				log.info(p+" over ");
			} catch (Throwable e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		log.info("----init is over!----");
	}




	
	
	
	
	


	public Map<String, AnalyseKeywizardService> getProxy() {
		return proxy;
	}


	public void setProxy(Map<String, AnalyseKeywizardService> proxy) {
		this.proxy = proxy;
	}


	@Override
	public List<KeyBoard> getKeyBoard(String query, Integer count, String type)
			throws ServiceException, ServiceDaoException {		
		AnalyseKeywizardService proxyService = getProxyService(type);		
		return proxyService.getKeyBoard(query, count, type);
		
	}


	private AnalyseKeywizardService getProxyService(String type)
			throws ServiceException {
		AnalyseKeywizardService proxyService=this.proxy.get(type);
		if(proxyService==null){
			
			throw new ServiceException(-5400,"not support this type");
			
		}else{
			
			
			
		}
		return proxyService;
	}


	@Override
	public void addKeyBoard(String query, KeyBoard value, String type)
			throws ServiceException, ServiceDaoException {
		AnalyseKeywizardService proxyService = getProxyService(type);
		 proxyService.addKeyBoard(query, value, type);
	}


	@Override
	public void init(String type) throws ServiceException,
			ServiceDaoException {
		AnalyseKeywizardService proxyService = getProxyService(type);		
		 proxyService.init(type);
	}


	@Override
	public void removeKeyBoard(String query, KeyBoard value, String type)
			throws ServiceException, ServiceDaoException {
		AnalyseKeywizardService proxyService = getProxyService(type);
		proxyService.removeKeyBoard(query, value, type);
		
	}


	@Override
	public void clear(String type) throws ServiceException, ServiceDaoException {
		AnalyseKeywizardService proxyService = getProxyService(type);
		proxyService.clear(type);
		
	}


	@Override
	public void initKeyBoard(String type, List<KeyBoard> datas)
			throws ServiceException, ServiceDaoException {
		AnalyseKeywizardService proxyService = getProxyService(type);
		proxyService.initKeyBoard( type,datas);
	}
	
}
