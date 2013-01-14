package com.gemantic.killer.service;

import org.drools.runtime.StatefulKnowledgeSession;
import org.osoa.sca.annotations.Remotable;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Message;
@Remotable
public interface SessionService {

	public StatefulKnowledgeSession getSesseion(Message message)throws ServiceException,ServiceDaoException;

	public void removeSession(Message message)throws ServiceException,ServiceDaoException;;

}
