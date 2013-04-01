package com.gemantic.killer.util;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;



public class RoleUtil {
	private static final Log log = LogFactory.getLog(RoleUtil.class);
	
	
	static public  Map<String, String> assingRole(
			Map<String, Integer> role_count, List<String> ls) {
		log.info("role count "+role_count+" users "+ls);
		Map<String,String> results=new HashMap();
		Collections.shuffle(ls);
		log.info(ls);
	   int index=0;
		for(String role:role_count.keySet()){	
			int count=role_count.get(role);			
			for(int j=index;j<count+index;j++){
				results.put(ls.get(j), role);
			}
			index=index+count;
		}
		

		log.info("result is "+results);
		
		return results;
	}
	
	
	
	
	public static void main(String[] args) {
		Map<String,Integer> role_count=new HashMap();
		role_count.put("killer", 1);
		role_count.put("police", 1);
		role_count.put("water", 3);
		
		RoleUtil.assingRole(role_count, Arrays.asList(new String[]{"1","2","3","4","5"}));
		
		
		
	}
	
	
	

}
