package com.gemantic.killer.factory;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.drools.runtime.rule.FactHandle;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.common.model.Operater;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.impl.SessionServiceImpl;

public class MyDroolsSession implements Serializable {

	private static final Log log = LogFactory.getLog(SessionServiceImpl.class);

	/**
	 * 
	 */
	private static final long serialVersionUID = 3521914219066909392L;

	private StatefulKnowledgeSession ksession;

	public MyDroolsSession(StatefulKnowledgeSession ksession) {
		super();
		this.ksession = ksession;
	}

	public synchronized void processSession(Operater operater, Room r, boolean type)
			throws ServiceException, ServiceDaoException {

		FactHandle fo = this.ksession.insert(operater);

		// log.info(operater + " =========== after insert");
		FactHandle fm = this.ksession.insert(operater.getMessage());
		if (type) {
			// log.info("room operator " + operater.getMessage());
			this.ksession.startProcess("room");
		} else {
			// log.info("game operator " + operater.getMessage());
			this.ksession.startProcess("game");
		}

		this.ksession.fireAllRules();
		this.ksession.retract(fo);
		this.ksession.retract(fm);

	}
	
	
	

	public StatefulKnowledgeSession getKsession() {
		return ksession;
	}

	public void setKsession(StatefulKnowledgeSession ksession) {
		this.ksession = ksession;
	}



	public void dispose() {
		this.ksession.dispose();
		
	}
	
	public String toString() {
		return ToStringBuilder.reflectionToString(this,
				ToStringStyle.MULTI_LINE_STYLE);
	}

}
