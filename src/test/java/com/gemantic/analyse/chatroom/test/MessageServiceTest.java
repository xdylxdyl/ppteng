	/*
package com.gemantic.analyse.chatroom.test;

import java.io.IOException;
import java.net.URL;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;

import sun.tools.java.ClassPath;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.FileUtil;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.common.model.World;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.WorldService;
import com.gemantic.killer.util.MessageUtil;
public class MessageServiceTest {

	private static final Log log = LogFactory.getLog(MessageServiceTest.class);
	
	
	private MessageService messageService;

	private WorldService worldService;
	
	//@Before
	public void init(){		
	
		ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");	
		messageService= (MessageService) ac.getBean("droolMessageServcie");
		worldService=(WorldService)ac.getBean("worldServiceImpl");
		
		
	}
	
	//@Test
	public void testSendMessage() throws ServiceException, ServiceDaoException, IOException{
		String filenameOnClasspath = "/message.txt" ;// Located in a directory which is on the classpath
			URL url = getClass().getResource(filenameOnClasspath);
			String fullyQualifiedFilename = url.getFile();
		log.info(fullyQualifiedFilename);
		
		
		
		
		World world=new World("god", 0004L, "simple_1.0");
		world.setId(5000L);
		worldService.createWorld(world);
		log.info("world "+world);
		String version="simple_1.0";
		String action="7831086384873123840,ready,-500,#000000,000,"+world.getId() ;
		Message m2=MessageUtil.parse(version,action,"aaa");
		log.info(m2);
		List<String> ls=FileUtil.readFileAsList(fullyQualifiedFilename);
		log.info(ls);
		for(String str:ls){
			Message m=MessageUtil.parse(version,str);
			log.info(" message "+ m);
			Long start=System.currentTimeMillis();
			List<Message> messages=messageService.process(m);
			log.info(" use time "+(System.currentTimeMillis()-start));
			log.info(messages);			
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
	

	

}
	*/
