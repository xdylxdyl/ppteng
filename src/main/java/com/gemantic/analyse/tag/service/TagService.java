package com.gemantic.analyse.tag.service;

import java.util.List;

import com.gemantic.analyse.tag.model.Tag;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

public interface TagService {

	Long getIDByName(String name)throws ServiceException, ServiceDaoException;

	Long add(Tag tag)throws ServiceException, ServiceDaoException;

	Tag getTagByID(Long id)throws ServiceException, ServiceDaoException;

	void update(Tag tag) throws ServiceException, ServiceDaoException;

	List<Tag> getTags(List<Long> userIDS)throws ServiceException, ServiceDaoException;

	

}
