package com.gemantic.analyse.tag.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.analyse.tag.model.KeyBoard;
import com.gemantic.analyse.tag.service.AnalyseKeywizardService;
import com.gemantic.common.compare.ChineseCompare;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.trie.simple.SimpleTrie;
import com.gemantic.killer.util.KeyBoardQueryUtil;

public class KeywizardServiceTrieImpl implements AnalyseKeywizardService {
	
	
	private static final Log log = LogFactory.getLog(KeywizardServiceTrieImpl.class);
	
	private SimpleTrie trie = new SimpleTrie();
	
	private Map<String,KeyBoard> datas=new HashMap();//可以考虑用Memcache实现
	
	@Override
	public List<KeyBoard> getKeyBoard(String query, Integer count, String type)
			throws ServiceException, ServiceDaoException { 
		log.info(query+" search ");
		List values=Arrays.asList(this.trie.suggest(query));
		
		log.info(query+" serarch result "+values.size());
		 Comparator cmp = new ChineseCompare();   
	     Collections.sort(values, cmp);   
	     
	     List<KeyBoard> results=new ArrayList();
	     int size=count>values.size()?values.size():count;
	     for(int i=0;i<size;i++){
	    	 //重名问题怎么解决啊啊啊啊啊啊啊啊
	    	 KeyBoard k=this.datas.get(values.get(i));
	    	 if(k==null){
	    		 continue;
	    	 }
	    	 results.add(k);
	     }
	     
		//List values =TrieUtil.subTrie(trie,query, count,datas);
		return results;
	}

	

	@Override
	public void addKeyBoard(String query, KeyBoard value, String type)
			throws ServiceException, ServiceDaoException {
		
		Set<String> queries=KeyBoardQueryUtil.getQueries(query);		
		for(String q:queries){
			//log.info(query+" query is  "+ q);
			trie.add(q);
			this.datas.put(q, value);
			//log.info(trie);
		}
	//	log.info(type+" add "+query+" value is  "+ value);
	}



	@Override
	public void init(String type) throws ServiceException,
			ServiceDaoException {
		//没有实现类
		
		Map<String,KeyBoard> newValues=new HashMap();
		
		 
		

	}

	@Override
	public void removeKeyBoard(String query, KeyBoard value, String type)
			throws ServiceException, ServiceDaoException {
		
		Set<String> queries=KeyBoardQueryUtil.getQueries(query);		
		for(String q:queries){
			this.trie.remove(query);
		}
		
		//datas 不清空了,考虑到不会有太多的脏数据
		
		
		
	}

	@Override
	public void clear(String type) throws ServiceException, ServiceDaoException {
	
		this.trie= new SimpleTrie();
		this.datas=new HashMap();
	}


	@Override
	public void initKeyBoard(String type, List<KeyBoard> datas)
			throws ServiceException, ServiceDaoException {
		Long start=System.currentTimeMillis();
        this.clear(type);		
		for(KeyBoard kb:datas){		
			Set<String> queries=KeyBoardQueryUtil.getQueries(kb.getName());	
			for(String key:queries){				
				this.addKeyBoard(key, kb, type);
			}
		
		}
		log.info(this.datas.keySet().size()+" use time "+(System.currentTimeMillis()-start));
		
	}

}
