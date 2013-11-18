package com.gemantic.killer.service;

import org.drools.runtime.StatefulKnowledgeSession;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Message;

public interface SessionService {

	public StatefulKnowledgeSession getSesseion(Message message)throws ServiceException,ServiceDaoException;

	public void removeSession(Message message)throws ServiceException,ServiceDaoException;

	public void removeRoomSession(Long id)throws ServiceException,ServiceDaoException;

}
