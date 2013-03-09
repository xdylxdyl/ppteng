package com.gemantic.killer.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.killer.common.model.Message;



public class BombUtil {
	private static final Log log = LogFactory.getLog(BombUtil.class);
	public static final String Split_Underline = "-";
	public static final String Bomb="*";
	/**
	 * 
	 * @param row 多少行
	 * @param column 多少列
	 * @param count  
	 * @return
	 */
	
	public static String assign(int row, int column, int count) {
		log.info("init row,column,count is "+row+","+column+","+count);
		List<Pair> pairs=new ArrayList();
		List<Pair> inits=new ArrayList();
		Map<Pair,String> pair_tags=new HashMap();
		for(int i=1;i<=row;i++){
			for(int j=1;j<=column;j++){
				Pair p=Pair.of(i,j);
				//log.info(p);
				pairs.add(p);
				inits.add(p);
				pair_tags.put(p, "0");
			}			
		}
		
		//log.info(inits);
		Collections.shuffle(pairs);
		
		
		
		
		
		for(int k=0;k<count;k++){
			Pair pair=pairs.get(k);
			pair_tags.put(pair, BombUtil.Bomb);
			List<Pair> roundPanes=BombUtil.getRoundPanes(pair,row,column);
			//log.info(pair+" get round "+roundPanes);
			for(Pair pane:roundPanes){
				String tag=pair_tags.get(pane);
				if(StringUtils.isBlank(tag)){
					tag="0";
				}
				if(BombUtil.Bomb.equals(tag)){
					
				}else{
					
					Integer tagCount=Integer.valueOf(tag);
					tagCount++;
					pair_tags.put(pane, tagCount.toString());
					
				}
			}
		}
		//log.info(pair_tags);
		
		
	
		StringBuffer sb=new StringBuffer();
		for(Pair p:inits){
			sb.append(pair_tags.get(p));
		}
		log.info("get str : "+sb.toString());
		return sb.toString();
	}

	
	public static void getRoundPanes2(Pair pair, int rowCount, int columnCount,String system,Map<Pair,String> pairMap){
		
		
			
	     String systemValue=BombUtil.clickOpen(pair, system, rowCount, columnCount);
	     if(BombUtil.Bomb.equals(systemValue)){
	    	 pairMap.put(pair, systemValue);
	    	 //是雷就不再继续
	    	 return ;
	    	 
	     }else{
	    	//不是雷判断是不是空
	    	 if("0".equals(systemValue)){
	    		 if(pairMap.containsKey(pair)){
	    			 return;
	    		 }else{
	    			//继续迭代
	    			 pairMap.put(pair, systemValue);
		    		 List<Pair> pairs=BombUtil.getRoundPanes(pair, rowCount, columnCount);
		    			
		    			for(Pair p:pairs){			
		    				BombUtil.getRoundPanes2(p, rowCount, columnCount, system, pairMap);
		    		} 
	    		 } 
	    		
	    		
	    	 }else{
	    		 //到达边界,返回
	    		 pairMap.put(pair, systemValue);
	    		 return;
	    	 }
	    	 
	    	 
	     }
			
		
			
			
			
		
		
		
		
		
		
		
		
		return ;
		
		
		
	};
	
	public static List<Pair> getRoundPanes(Pair pair, int rowCount, int columnCount) {
		Long start=System.currentTimeMillis();
		//log.info(pair+"get round panes in row "+rowCount+" columnCount "+columnCount);
		List<Pair> pairs=new ArrayList();
		int row=(Integer) pair.getLeft();
		int column=(Integer) pair.getRight();
		int left=column-1;
		int right=column+1;
		int up=row-1;
		int down=row+1;
		
		if(left<1){
			left=1;			
		}
		if(right>columnCount){
			right=columnCount;
		}
		
		if(up<1){
			up=1;
		}
		if(down>rowCount){
			down=rowCount;
		}
		
		for(int i=up;i<=down;i++){
			for(int j=left;j<=right;j++){
				Pair p=Pair.of(i, j);
				
				if(pair.equals(p)){
					continue;
				}else{
					pairs.add(p);	
				}
				
			}
		}
		
		//log.info("get round use time "+(System.currentTimeMillis()-start));
		return pairs;
		
	}

	
	
	public static String clickOpen(Pair pair, String systemBombPic,int row, int column) {
		
		int r=(Integer) pair.getLeft()-1;
		int c=(Integer) pair.getRight()-1;
        int index=r*column+c;
       // log.info("index is "+index);
		String result=String.valueOf(systemBombPic.charAt(index));
		//log.info(result);
		return result;
	}

	
	public static void main(String[] args) {
		
		/*String[][] pic=new String[][]{{"1","2"},{"3","4"}};
		log.info(pic);
		
		log.info(BombUtil.convertString2Pair("3-4"));
		
		String bomb=BombUtil.initBomb(9,9);
		log.info(bomb);
		int index=BombUtil.convertIndex(3, 3, 9);
		String s=BombUtil.replaceBomb(index, bomb, "c");
		log.info(s);
		
		List<Pair> ls=BombUtil.getRoundPanes(BombUtil.convertString2Pair("1-1"), 9, 100);
		
		log.info(ls);*/
		Map pairs=new HashMap();
		String mineStr="000001*10000001*212*00112221000012322*32001*2*" +
				"2211001**2112*123222*2*10014*300112**10112121102*20000*3" +
				"21000012*112210000121100001*211*10111001*10000222011101*21011111101" +
				"*10000012*100002*3132200111011122102*3*2*2111*11221**101121212*11111**1*421000" +
				"000233100123223*21211001**100001*1*22*2*21012210000111111122*100000000000000000" +
				"11211111000000011100112*22*100000002*2001*322*2101110002*20012*1111001*100";
		Long start=System.currentTimeMillis();
		BombUtil.getRoundPanes2(BombUtil.convertString2Pair("16-18"), 20, 20, mineStr, pairs);
		log.info("usetime is "+(System.currentTimeMillis()-start)+pairs);
		Message m=new Message();
		StringBuffer sb=new StringBuffer();
		sb=sb.append(m.getSubject());
		sb=sb.append(BombUtil.Split_Underline);
		sb=sb.append(m.getObject());
		
		
		
	}

	public static String initBomb(int row, int column) {
		StringBuffer sb=new StringBuffer();
		for(int i=0;i<row*column;i++){
			sb=sb.append("n");
		}
		return sb.toString();
	}
	
	public static int convertIndex(int row,int column,int maxRow){
		//log.info("row is "+row);
		//log.info("column is "+column);
		int index=(row-1)*maxRow+(column-1);
		//log.info("index is "+index);
		return index;
	}
	
	public static String replaceBomb(int index,String source,String value) {
		  char[] cs = source.toCharArray();		  
		  cs[index]=value.toCharArray()[0];	
		  
		  return String.valueOf(cs);
	}
	

	public static List<String> printPic(String systemBombPic, int row, int column) {
		char[] c=systemBombPic.toCharArray();
		List<String> ls=new ArrayList();	
		for(int i=0;i<c.length;i=i+column){
			StringBuffer sb=new StringBuffer();
			for(int j=i;j<i+column;j++){
				
				sb.append(c[j]);
			}
			ls.add(sb.toString());
			
		}
			
			
		return ls;
	}

	public static String convertPair2String(Pair pair) {
		// TODO Auto-generated method stub
		return String.valueOf(pair.getLeft()+BombUtil.Split_Underline+pair.getRight());
	}
	public static Pair convertString2Pair(String str){
		 String[] indexs=str.split(BombUtil.Split_Underline);
		 
		return Pair.of(Integer.valueOf(indexs[0]),Integer.valueOf(indexs[1]));
		
	}

}
