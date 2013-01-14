package com.gemantic.analyse.tag.service;

import java.util.List;

import org.osoa.sca.annotations.Remotable;

import com.gemantic.analyse.tag.model.KeyBoard;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

@Remotable
public interface AnalyseKeywizardService {
	

	

	
	/**
	 * 获取键盘精灵的接口
	 * @param query
	 * @param count
	 * @param type
	 * @return
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public List<KeyBoard> getKeyBoard(String query, Integer count, String type)throws ServiceException, ServiceDaoException;;
	
	
	/**
	 * 实时添加的接口
	 * @param query
	 * @param value
	 * @param type
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public void addKeyBoard(String query, KeyBoard value, String type)throws ServiceException, ServiceDaoException;
	
	
	
	
	/**
	 * 初始化数据
	 * @param type
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public void init(String type)throws ServiceException, ServiceDaoException;
	
	
	
	/**
	 * 
	 * @param query
	 * @param value
	 * @param type
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public void removeKeyBoard(String query, KeyBoard value, String type)throws ServiceException, ServiceDaoException;
	
	
	
	
	/**
	 * 
	 * @param type
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	
	public void clear(String type)throws ServiceException, ServiceDaoException;
	


	
	/**
	 * init keyboard
	 * @param datas
	 * @throws ServiceException
	 * @throws ServiceDaoException
	 */
	public void initKeyBoard(String type,List<KeyBoard> datas)throws ServiceException, ServiceDaoException;
}
