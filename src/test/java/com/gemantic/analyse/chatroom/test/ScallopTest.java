package com.gemantic.analyse.chatroom.test;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;

import scallop.api.ScallopRemoteException;
import scallop.core.Resource;
import scallop.core.ScallopClient;
import scallop.sca.binding.rmi.provider.RMIResourceParser;

public class ScallopTest {
	private static final Log log = LogFactory.getLog(ScallopTest.class);
	
	//@Test
	public void testGetResource() throws ScallopRemoteException{
		
		 //解析配置文件是哪儿的.
		
		  Resource resource = ScallopClient.getInstance().getResource("http://gemantic.scallop.resource:8182", "gemantic-entity-stock-service-rmi", new RMIResourceParser());
		
		  log.info(resource.getAddress());
		  log.info(resource.getName());
		  log.info(resource.getResource());
		  log.info(ScallopClient.getInstance().getRmiExecuteTimesPrintInterval());
		  log.info(ScallopClient.getInstance().getRmiShowParameters());
		  log.info(ScallopClient.getInstance().getRealRegistryCenter(null));
		  
		
	}
	@Test
	public void testNUll(){
		
	}

}
