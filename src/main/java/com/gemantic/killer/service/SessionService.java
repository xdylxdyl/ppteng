package com.gemantic.killer.service;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.common.model.Operater;
import com.gemantic.killer.factory.MyDroolsSession;
import com.gemantic.killer.model.Room;

public interface SessionService {

	public MyDroolsSession getSesseion(Message message)throws ServiceException,ServiceDaoException;

	public void removeSession(Message message)throws ServiceException,ServiceDaoException;

	public void removeRoomSession(Long id)throws ServiceException,ServiceDaoException;

	public void processSession(Operater operater, Room r, boolean type) throws ServiceException, ServiceDaoException;

}
