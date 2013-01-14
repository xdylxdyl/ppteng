package com.gemantic.killer.util;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.common.util.PinyinUtil;

public class KeyBoardQueryUtil {
	private static final Log log = LogFactory.getLog(KeyBoardQueryUtil.class);
	
	
	public static Set<String> getQueries(String query) {
		//判断是中文还是英文,是英文就不必加拼音了
		//直接使用Set去重,是英文也没关系
		Set<String> results=new HashSet();
		
			String[] full_pinyins = PinyinUtil.getPinyinAcronym(query);		//这儿有问题.多音字会给出数据出
			
			for(String s:full_pinyins){
				StringBuffer sb=new StringBuffer();
				sb=sb.append(s);
				results.add(sb.toString());
				
				String lowcase=s.toLowerCase();
				results.add(lowcase);
				
				
			}	
			results.add(query);
			//log.info(results.toString());
		return results;
	}
	
	public static List<String> splitQuery(String query) {
		char[] cs=query.toCharArray();
		List<String> ls=new ArrayList();
		StringBuffer sb=new StringBuffer();
		/*for(char ch:cs){
			sb=sb.append(ch);
			ls.add(sb.toString());
			
			
		}*/		

		  ls.add(query);

		return ls;
	}

	public static void main(String[] args) {
		
		
		Set<String> ls=KeyBoardQueryUtil.getQueries("陈俊");		
		log.info(ls);
		Set<String> ls2=KeyBoardQueryUtil.getQueries("李亚");
		log.info(ls2);
		
		
		
		
		
		
		
	}
}
