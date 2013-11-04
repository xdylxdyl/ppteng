package com.gemantic.analyse.chatroom.test;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import junit.framework.Assert;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;

import com.gemantic.common.util.DESUtil;
import com.gemantic.common.util.RandomGroupUtils;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.util.MessageUtil;
import com.google.gson.Gson;

public class RankdomUtilTest {
	
	private static final Log log = LogFactory.getLog(RankdomUtilTest.class);
	
	
	@Test
	public void testRandom(){
	
		
		Map groups=new HashMap();
		List<Long> ls=new ArrayList();
		for(int i=0;i<10;i++){
			ls.add(Long.valueOf(i));
		}
		String water="water";
		int waterSize=8;
		String kill="kill";
		int killSize=2;
		Map<String,Integer> groupSize=new HashMap();
		groupSize.put(water, waterSize);
		groupSize.put(kill, killSize);
		groups=RandomGroupUtils.group(ls,groupSize);
		List waters=(List)groups.get(water);
		List kills=(List)groups.get(kill);
		
		log.info(kills.toString().replace("[", "").replace("]", ""));
		
		
		Assert.assertEquals(waterSize, waters.size());
		Assert.assertEquals(killSize, kills.size());
		log.info(groups);
	
		
	}
	
	@Test
	public void testRandomInteger(){
		
		List<Message> msgs=new ArrayList();   
	      Map<String,String> word_color=new HashMap();	      
	      word_color.put("#FF0000","红");
	      word_color.put("#FF7F24","橙");
	      word_color.put("#FFFF00","黄");
	      word_color.put("#00FF00","绿");
	      word_color.put("#00EEEE","青");
	      word_color.put("#0000FF","蓝");
	      word_color.put("#D02090","紫");
	      
	      List<String> words=new ArrayList(word_color.values());
	      List<String> colors=new ArrayList(word_color.keySet());	  
	      StringBuffer questions=new StringBuffer();
	      int count=8;
	      for(int i =0;i<count;i++){			
				int index=RandomUtils.nextInt(words.size());
				String w=words.get(index);
				String color=colors.get(index);
				Message msg=new Message("-500","assign",w);
				msg.setColor(color);
				log.info(msg);
				questions.append(color);
				if(i==count){
					   
				}else{
				  questions.append(",");
				}
				
			}
	   
		log.info(questions.toString());
		String sss="我喜欢谁";
		char[] cs=sss.toCharArray();
		for(char c:cs){
			log.info(c);
		}
		
		
		 StringBuffer right=new StringBuffer();
		String answers="#0000,#000002";
		String[] q=questions.toString().split(",");
		String[] a=answers.split(",");
		int mcount=Math.min(q.length,a.length);
		for(int i=0;i<mcount;i++){
			if(q[i].equals(a[i])){
				right.append(q[i]);
				if(i==mcount){
					   
				}else{
					right.append(",");
				}
				
			}
			
		}
		log.info("rights "+ right.toString());
		
	}
	
	@Test
	public void testTextRank(){
		
		
		
		Message m1=MessageUtil.parse("ss", "3,4,4,4,4,4,4,4,4,4");
		Message m2=MessageUtil.parse("ss", "3,4,4,4,4,4,4,4,4,4");
		
		
			log.info(m2.equals(m1));
	
		List ls=new ArrayList();
		Gson gson=new Gson();
		String json=gson.toJson(ls, List.class);
		log.info(json);
	}
	
	
	@Test
	public void testUri() throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, NoSuchPaddingException{
		String token=DESUtil.encrypt((String.valueOf(3L)+","+String.valueOf(System.currentTimeMillis())).getBytes());;
		log.info(token);
		String result=DESUtil.decrypt(token.getBytes());
		log.info(result);
	}
	
	
	@Test
	public void testList(){
		List<String> ls =new ArrayList<String>();
		ls.add("2");
		ls.add("3");
		
		log.info("test list "+ls);
		
		
	   Map<Integer,Integer[]> memberConfig=new HashMap<Integer,Integer[]>();
	   memberConfig.put(5, new Integer[]{2,3,2,3,3});
	   memberConfig.put(6, new Integer[]{2,3,4,3,4});
	   memberConfig.put(7, new Integer[]{2,3,3,4,4});
	   memberConfig.put(8, new Integer[]{3,4,4,5,5});
	   memberConfig.put(9, new Integer[]{3,4,4,5,5});
	   memberConfig.put(10, new Integer[]{3,4,4,5,5});
	   
	   
	   
	   Map<Integer,Integer[]> bombWolfConfig=new HashMap<Integer,Integer[]>();
	   bombWolfConfig.put(5, new Integer[]{1,1,1,1,1});
	   bombWolfConfig.put(6, new Integer[]{1,1,1,1,1});
	   bombWolfConfig.put(7, new Integer[]{1,1,1,2,1});
	   bombWolfConfig.put(8, new Integer[]{1,1,1,2,1});
	   bombWolfConfig.put(9, new Integer[]{1,1,1,2,1});
	   bombWolfConfig.put(10, new Integer[]{1,1,1,2,1});
	  
	   
	 
	    int memberCount=memberConfig.get(5)[1];
	    log.info(memberCount);
	    int bombWolfCount=bombWolfConfig.get(7)[3];
	    log.info(bombWolfCount);
	   
	}
	
}
