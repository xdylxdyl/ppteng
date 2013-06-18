package com.gemantic.killer.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.drools.KnowledgeBase;
import org.drools.KnowledgeBaseFactory;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderError;
import org.drools.builder.KnowledgeBuilderErrors;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.springframework.stereotype.Component;

import com.gemantic.common.drools.util.ResourceTypeUtil;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.service.SessionService;


public class SessionServiceImpl implements SessionService {
	private static final Log log = LogFactory.getLog(SessionServiceImpl.class);
	

	private Map<String,List<String>> version_path=new HashMap();
	

	private List<String> rules=new ArrayList();

	private Map<Long,StatefulKnowledgeSession> roomID_Session=new HashMap();

	public StatefulKnowledgeSession getSesseion(Message message)
			throws ServiceException, ServiceDaoException {
		
			Long roomID=Long.valueOf(message.getWhere());
			String version=message.getVersion();
			StatefulKnowledgeSession session=this.roomID_Session.get(roomID);
			if(session==null){
				session=this.initSession(version);
				roomID_Session.put(roomID, session);
			}
			return session;
	



	}

	private StatefulKnowledgeSession initSession(String version) throws ServiceException {
		KnowledgeBase kbase = null;
			try {
				List<String> allPaths=new ArrayList();
				allPaths.addAll(this.rules);
				
				List<String> path=this.version_path.get(version);
				if(CollectionUtils.isEmpty(path)){
					log.info(version + " no config  ,only room rules ");
					path=new ArrayList();
				}				
				allPaths.addAll(path);
				
				kbase=this.initKbase(allPaths);
			
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				//加载版本对应的规则失败
				log.error(version);
				throw new ServiceException(-1314);
			}
		
		StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		return ksession;
	}
	
	
	private  KnowledgeBase initKbase(List<String> paths) throws ServiceException{	
		
	   KnowledgeBuilder kbuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();
		Long start=System.currentTimeMillis();
		KnowledgeBuilderErrors errors = kbuilder.getErrors();
		log.info("start init "+ paths.toString());
		for(String path:paths){
			ResourceType type=ResourceTypeUtil.parseType(path);
			if(type==null){
				throw new ServiceException(-1315,"unknown file type ");
				
			}
			kbuilder.add(ResourceFactory.newClassPathResource(path),type);
			errors = kbuilder.getErrors();
			if (errors.size() > 0) {
				for (KnowledgeBuilderError error : errors) {
					log.error(path+" ================== "+error);
				}
				throw new IllegalArgumentException("Could not parse knowledge "+ path);
			}
			
		}
		
		
		KnowledgeBase kbase = KnowledgeBaseFactory.newKnowledgeBase();
		kbase.addKnowledgePackages(kbuilder.getKnowledgePackages());
		log.info("init "+ paths.toString() +" use time "+ (System.currentTimeMillis()-start));
		return kbase;
	}

	public Map<String, List<String>> getVersion_path() {
		return version_path;
	}

	public void setVersion_path(Map<String, List<String>> version_path) {
		this.version_path = version_path;
	}

	public List<String> getRules() {
		return rules;
	}

	public void setRules(List<String> rules) {
		this.rules = rules;
	}

	public void removeSession(Message message) throws ServiceException,
			ServiceDaoException {
		Long roomID=Long.valueOf(message.getWhere());
		StatefulKnowledgeSession session=this.roomID_Session.get(roomID);
		if(session==null){
			return ;
		}else{
			session.dispose();
			this.roomID_Session.remove(roomID);
		}
	}
	
	
	
	
	

}
