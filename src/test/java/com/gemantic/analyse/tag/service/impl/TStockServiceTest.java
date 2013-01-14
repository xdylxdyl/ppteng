package com.gemantic.analyse.tag.service.impl;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.gemantic.analyse.convert.model.GStock;
import com.gemantic.analyse.convert.service.StockService;
import com.gemantic.analyse.tag.model.TStock;
import com.gemantic.analyse.tag.service.TStockService;
import com.gemantic.analyse.tag.service.TagUserStockService;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;

public class TStockServiceTest {

	private static final Log log = LogFactory.getLog(TStockServiceTest.class);

	private TagUserStockService tagUserStockService;
    private ConfigurableApplicationContext  context;
    
    private TStockService stockService;
    
    
	@Before
	public void setUp() throws Exception {
      
		
		log.info(" load spring ");
		// dao
		context =new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
		tagUserStockService = (TagUserStockService) context.getBean("tagUserStockServiceImpl");
		stockService = (TStockService) context.getBean("TStockServiceJDBMImpl");
		
		
		// local server
		/**
		 * tagUserStockService = (TagUserStockService)
		 * Naming.lookup("//localhost:8371/TagUserStockRMIService");
		 **/

		/**
		 * test client ApplicationContext context = new
		 * ClassPathXmlApplicationContext
		 * ("classpath:META-INF/spring/applicationContext-sca.xml");
		 * tagUserStockService = (TagUserStockService)
		 * context.getBean("tagUserStockService");
		 **/

	}
	@After
	public void destory(){
		context.close();
		log.info(" how to destory ");
		
	}

	
	
	
	
	@Ignore
	@Test
	public void testStockService() throws MalformedURLException, RemoteException, NotBoundException, ServiceException, ServiceDaoException{
		StockService service = (StockService) Naming.lookup("//10.0.0.40:8231/StockRMIService");
		List<Long> stockIDS = service.getIdsByLogicTypeAndStatus(GStock.STOCK_LOGIC_TYPE_CHINA_PRINCIPAL, GStock.STOCK_STATUS_LISTING);
		if(CollectionUtils.isEmpty(stockIDS)){
			
			log.info(" get all stock 0");
		}else{
			log.info(" get all stock "+ stockIDS.size());
			List<GStock> stocks=service.getObjectsByIds(stockIDS);
			Long start=System.currentTimeMillis();
			List<TStock> tstocks=new ArrayList();
			
			for(GStock stock:stocks){
				
				TStock tstock=new TStock(stock.getCode(), stock.getName(), stock.getSpellingName());
				tstocks.add(tstock);
				
				
				
			}
			
			stockService.batchAdd(tstocks);
			log.info(stocks.size()+" insert use time "+(System.currentTimeMillis()-start));			
				
			}
			
	
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
