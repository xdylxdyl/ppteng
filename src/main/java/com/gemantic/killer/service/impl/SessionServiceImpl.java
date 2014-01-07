package com.gemantic.killer.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
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
import org.drools.runtime.rule.FactHandle;
import org.springframework.stereotype.Component;

import com.gemantic.common.drools.util.ResourceTypeUtil;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.common.model.Operater;
import com.gemantic.killer.factory.MyDroolsSession;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.SessionService;

@Component
public class SessionServiceImpl implements SessionService {
	private static final Log log = LogFactory.getLog(SessionServiceImpl.class);

	@Resource(name = "version_path_simple")
	private Map<String, List<String>> version_path = new HashMap();

	@Resource(name = "roomRulePaths")
	private List<String> rules = new ArrayList();

	private Map<Long, MyDroolsSession> roomID_Session = new HashMap();

	private Map<String, KnowledgeBase> version_kBase = new HashMap();

	@PostConstruct
	private void initKBase() throws ServiceException {

		Long time = System.currentTimeMillis();
		for (String version : version_path.keySet()) {
			Long vtime = System.currentTimeMillis();
			this.initSession(version);
			log.info(version + " init kbase use time "
					+ (System.currentTimeMillis() - vtime));
		}
		log.info("init over ,use time " + (System.currentTimeMillis() - time));

	}

	public MyDroolsSession getSesseion(Message message)
			throws ServiceException, ServiceDaoException {

		Long roomID = Long.valueOf(message.getWhere());
		String version = message.getVersion();
		MyDroolsSession session = this.roomID_Session.get(roomID);
		if (session == null) {
			session = this.initSession(version);
			roomID_Session.put(roomID, session);
		}
		return session;

	}

	private MyDroolsSession initSession(String version)
			throws ServiceException {

		KnowledgeBase kbase = this.version_kBase.get(version);
		if (kbase == null) {
			log.info("first init " + version);
			try {
				List<String> allPaths = new ArrayList();
				allPaths.addAll(this.rules);

				List<String> path = this.version_path.get(version);
				if (CollectionUtils.isEmpty(path)) {
					log.info(version + " no config  ,only room rules ");
					path = new ArrayList();
				}
				allPaths.addAll(path);

				kbase = this.initKbase(allPaths);
				this.version_kBase.put(version, kbase);

			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				// 加载版本对应的规则失败
				log.error(version);
				throw new ServiceException(-1314);
			}
		} else {
			log.info("already cache " + version);

		}

		StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		MyDroolsSession s=new MyDroolsSession(ksession);
		return s;
	}

	private KnowledgeBase initKbase(List<String> paths) throws ServiceException {

		KnowledgeBuilder kbuilder = KnowledgeBuilderFactory
				.newKnowledgeBuilder();
		Long start = System.currentTimeMillis();
		KnowledgeBuilderErrors errors = kbuilder.getErrors();
		log.info("start init " + paths.toString());
		for (String path : paths) {
			Long m = System.currentTimeMillis();
			ResourceType type = ResourceTypeUtil.parseType(path);
			if (type == null) {
				throw new ServiceException(-1315, "unknown file type ");

			}
			// 耗时最长
			kbuilder.add(ResourceFactory.newClassPathResource(path), type);

			errors = kbuilder.getErrors();
			if (errors.size() > 0) {
				for (KnowledgeBuilderError error : errors) {
					log.error(path + " ================== " + error);
				}
				throw new IllegalArgumentException("Could not parse knowledge "
						+ path);
			}

		}

		KnowledgeBase kbase = KnowledgeBaseFactory.newKnowledgeBase();
		kbase.addKnowledgePackages(kbuilder.getKnowledgePackages());

		log.info("init " + paths.toString() + " use time "
				+ (System.currentTimeMillis() - start));
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
		Long roomID = Long.valueOf(message.getWhere());
		MyDroolsSession session = this.roomID_Session.get(roomID);
		if (session == null) {
			return;
		} else {
			session.dispose();
			this.roomID_Session.remove(roomID);
		}
	}

	public Map<String, KnowledgeBase> getVersion_kBase() {
		return version_kBase;
	}

	public void setVersion_kBase(Map<String, KnowledgeBase> version_kBase) {
		this.version_kBase = version_kBase;
	}

	@Override
	public void removeRoomSession(Long id) throws ServiceException,
			ServiceDaoException {

		MyDroolsSession session = this.roomID_Session.get(id);
		if (session == null) {
			return;
		} else {
			session.dispose();
			this.roomID_Session.remove(id);
		}
	}

	@Override
	public void processSession(Operater operater, Room r, boolean type)
			throws ServiceException, ServiceDaoException {
		MyDroolsSession ksession = this.getSesseion(operater
				.getMessage());

		ksession.processSession(operater, r, type);
	

	}

}
