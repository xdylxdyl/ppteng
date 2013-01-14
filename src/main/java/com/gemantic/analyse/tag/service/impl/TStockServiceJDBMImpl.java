package com.gemantic.analyse.tag.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.PreDestroy;

import net.kotek.jdbm.DB;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.gemantic.analyse.tag.model.TStock;
import com.gemantic.analyse.tag.service.TStockService;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.util.TStockUtil;

@Component
public class TStockServiceJDBMImpl implements TStockService {

	private static final Log log = LogFactory.getLog(TStockServiceJDBMImpl.class);

	private Map<String, String> symbol_stock = new HashMap<String, String>();

	private String stockDB = "stock";

	private boolean init = false;

	private DB db;

	//@Autowired
	//private JDBMAgent jdbmAgent;

	//@PostConstruct
	public void init() {
		if (init) {
			log.warn("already init ");
			return;
		} else {
			log.info("init start");

		}

		// 为什么会初始化两次,怎么检测某一个文件已经被使用了呢?
		log.info("=== " + TStockServiceJDBMImpl.class.getName());
		Long start = System.currentTimeMillis();
		if (db == null) {
		//	db = jdbmAgent.getDB();
			;
			log.info("=== 11111");
		}
		log.info("=== 22222");

		// ** Creates TreeMap which stores data in database. *//*
		try {
			this.symbol_stock = db.getHashMap(this.stockDB);
			log.info("stock " + this.symbol_stock.keySet().size());

		} catch (Throwable t) {
			//
			t.printStackTrace();
			log.error(t.getMessage());

			db.createHashMap(stockDB);
			db.commit();
			log.info("create success " + stockDB);

		}

		log.info("===");
		init = true;
		log.info("init use time " + (System.currentTimeMillis() - start));
	}

	@PreDestroy
	private void destory() {

		log.info("close db start");
		db.close();
		log.info("close db over");
	}

	public static void main(String[] args) throws ServiceException, ServiceDaoException {
		TStockServiceJDBMImpl service = new TStockServiceJDBMImpl();
		/*
		 * for(int i=0;i<100;i++){ Long id=service.create("测试帐户-"+i);
		 * log.info(id); }
		 */

	}

	@Override
	public void add(TStock stock) throws ServiceException, ServiceDaoException {
		Long start = System.currentTimeMillis();
		if (this.symbol_stock.containsKey(stock.getSymbol())) {

		} else {
			log.info(" insert to db ");
			this.symbol_stock.put(stock.getSymbol(), TStockUtil.user2Json(stock));
			this.db.commit();

		}
		log.info(stock.getName() + " use time " + (System.currentTimeMillis() - start));
	}

	@Override
	public TStock getTStockBySymbol(String symbol) throws ServiceException, ServiceDaoException {

		String json = this.symbol_stock.get(symbol);
		return TStockUtil.json2User(json);

	}

	@Override
	public void update(TStock stock) throws ServiceException, ServiceDaoException {
		this.symbol_stock.put(stock.getSymbol(), TStockUtil.user2Json(stock));
		this.db.commit();

	}

	@Override
	public List<TStock> getTags(List<String> symbols) throws ServiceException, ServiceDaoException {
		List<TStock> stocks = new ArrayList();
		for (String symbol : symbols) {
			TStock stock = this.getTStockBySymbol(symbol);
			stocks.add(stock);
		}
		return stocks;
	}

	@Override
	public void batchAdd(List<TStock> tstocks) throws ServiceException, ServiceDaoException {
		Long start = System.currentTimeMillis();
		for (TStock stock : tstocks) {
			if (this.symbol_stock.containsKey(stock.getSymbol())) {

			} else {
				log.info(" insert to db ");
				this.symbol_stock.put(stock.getSymbol(), TStockUtil.user2Json(stock));
				log.info(stock.getName() + " use time " + (System.currentTimeMillis() - start));
				this.db.commit();
				log.info(stock.getName() + " commint use time " + (System.currentTimeMillis() - start));

			}
		}
	
		log.info(tstocks.size() + " insert over ,user time " + (System.currentTimeMillis() - start));
	}

	@Override
	public List<TStock> getAll() throws ServiceException, ServiceDaoException {
		List<TStock> stocks=new ArrayList();
		
		for(Entry entry:this.symbol_stock.entrySet()){
			String json=(String)entry.getValue();
			TStock stock=(TStock)TStockUtil.json2User(json) ;
			stocks.add(stock);
			
		}
		return stocks;
	}

}
