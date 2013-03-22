package com.gemantic.killer.util;

import java.io.File;
import java.util.Hashtable;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.FileAppender;
import org.apache.log4j.Layout;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;

import com.gemantic.killer.common.model.Message;

public class JobLogger {
	private static Hashtable<String, Logger> m_loggers = new Hashtable<String, Logger>();// 什么时候清空呢.
	private static String m_filename = "record"; // Root log directory
	private static final Log log = LogFactory.getLog(JobLogger.class);

	public static synchronized void logMessage(String jobName, Message message) {
		log.info(jobName+" : "+message);

		String json = MessageUtil.convert2String(message);
		Logger l = getJobLogger(jobName);
		l.info(json);
	}

	public static synchronized void log(String jobName, String message) {
		log.info(jobName+" : "+message);
		Logger l = getJobLogger(jobName);
		l.info(message);
	}

	public static synchronized void logException(String jobName, Exception e) {
		Logger l = getJobLogger(jobName);
		l.info(e.getMessage(), e);
	}

	private static synchronized Logger getJobLogger(String jobName) {
		Logger logger = m_loggers.get(jobName);
		if (logger == null) {
			Layout layout = new PatternLayout("%m%n");
			logger = Logger.getLogger(jobName);
			m_loggers.put(jobName, logger);
			try {
				File file = new File(m_filename);
				file.mkdirs();
				file = new File(m_filename + "/" + jobName+".txt");
				FileAppender appender = new FileAppender(layout, file.getAbsolutePath(), true);
				logger.removeAllAppenders();
				logger.addAppender(appender);
			} catch (Exception e) {

			}
		}
		return logger;
	}

	public static void main(String[] args) {

		JobLogger.log("test", "hello world");

	}

	public static void logMessages(String jobName, List<Message> messages) {
		//log.info(jobName+" : "+messages);
		String json = MessageUtil.convertMessages2String(messages);
		Logger l = getJobLogger(jobName);
		l.info(json);
		
	}
	
	
}