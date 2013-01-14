package com.gemantic.killer.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.sun.tools.javac.util.Pair;
import com.sun.tools.javac.util.Pair;

public class BombUtil {
	private static final Log log = LogFactory.getLog(BombUtil.class);
	private static final String Split_Underline = "-";
	private static final String Bomb="*";
	/**
	 * 
	 * @param row 多少行
	 * @param column 多少列
	 * @param count  
	 * @return
	 */
	
	public static String assign(int row, int column, int count) {
		
		List<Pair> pairs=new ArrayList();
		List<Pair> inits=new ArrayList();
		Map<Pair,String> pair_tags=new HashMap();
		for(int i=1;i<=row;i++){
			for(int j=1;j<=column;j++){
				Pair p=new Pair(i,j);
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

	public static List<Pair> getRoundPanes(Pair pair, int rowCount, int columnCount) {
		List<Pair> pairs=new ArrayList();
		int row=(Integer) pair.fst;
		int column=(Integer) pair.snd;
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
				Pair p=new Pair(i,j);
				if(pair.equals(p)){
					continue;
				}else{
					pairs.add(p);	
				}
				
			}
		}
		
		
		return pairs;
	}

	
	
	public static String clickOpen(Pair pair, String systemBombPic,int row, int column) {
		
		int r=(Integer) pair.fst-1;
		int c=(Integer) pair.snd-1;
        int index=r*row+c;
        log.info("index is "+index);
		String result=String.valueOf(systemBombPic.charAt(index));
		log.info(result);
		return result;
	}

	
	public static void main(String[] args) {
		
		String[][] pic=new String[][]{{"1","2"},{"3","4"}};
		log.info(pic);
		
		log.info(BombUtil.convertString2Pair("3-4"));
		
		String bomb=BombUtil.initBomb(9,9);
		log.info(bomb);
		int index=BombUtil.convertIndex(3, 3, 9);
		String s=BombUtil.replaceBomb(index, bomb, "c");
		log.info(s);
		
	}

	public static String initBomb(int row, int column) {
		StringBuffer sb=new StringBuffer();
		for(int i=0;i<row*column;i++){
			sb=sb.append("n");
		}
		return sb.toString();
	}
	
	public static int convertIndex(int row,int column,int maxRow){
		log.info("row is "+row);
		log.info("column is "+column);
		int index=(row-1)*maxRow+(column-1);
		log.info("index is "+index);
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
		return String.valueOf(pair.fst+BombUtil.Split_Underline+pair.snd);
	}
	public static Pair convertString2Pair(String str){
		 String[] indexs=str.split(BombUtil.Split_Underline);
		 
		return new Pair(Integer.valueOf(indexs[0]),Integer.valueOf(indexs[1]));
		
	}

}
