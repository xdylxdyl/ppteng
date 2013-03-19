package com.gemantic.killer.util;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.common.util.zip.RunLengthEncoding;
import com.gemantic.killer.model.User;

public class PunchUtil {

	private static final Log log = LogFactory.getLog(PunchUtil.class);

	/**
	 * 一周
	 */
	public static final int Period_Week = 7;

	/**
	 * 一月
	 */
	public static final int Period_Month = 30;

	/**
	 * 一年
	 */
	public static final int Period_Year = 365;

	/**
	 * 打卡起始时间 2012年12月27日
	 */
	public static final Long Punch_Time_Start = 1356602918406L;

	/**
	 * 获取从Start日起,一个Period内连续打卡的次数. 如获取从今天起一周内总共打卡的数字
	 * 
	 * @param zipContent
	 * @param zipStartTime
	 * @param currentTimeMillis
	 * @param weekOfMonth
	 * @return
	 */
	public static int getTotalDay(long start, int timePeriod, long zipStartTime, String zipContent) {

		int count = 0;
		Integer startDiffDays = Math.abs(MyTimeUtil.diffDays(zipStartTime, start));

		List<String> punchList = RunLengthEncoding.decode2List(zipContent);

		for (int i = startDiffDays; i < startDiffDays + timePeriod && i < punchList.size(); i++) {
			if (punchList.get(i).equals("P")) {
				count++;
			}
		}

		return count;
	}

	
	/**
	 * 获取从Start日起,一个Period内连续打卡的次数. 
	 * 如获取从今天起一周内连续打卡的数字
	 * @param zipContent 
	 * @param zipStartTime 
	 * @param currentTimeMillis
	 * @param weekOfMonth
	 * @return 
	 */
	public static int getContinueDay(long start, int timePeriod, long zipStartTime, String zipContent) {
		
		int count = 0;
		Integer startDiffDays = Math.abs(MyTimeUtil.diffDays(zipStartTime,start));
		
		List<String> punchList = RunLengthEncoding.decode2List(zipContent);
		List<Integer> counts = new ArrayList();
		for( int i = startDiffDays; i <  startDiffDays + timePeriod && i < punchList.size(); i++){
			//统计连续是Ｐ的个数
			if(punchList.get(i).equals("P")){
				count++;
			}else{
				if( count > 0 ){
					counts.add(count);
				}
				count = 0;
			}
		}
		
		//以Ｐ结尾的
		if( count > 0 ){
			counts.add(count);
		}
		
		int big = 0;

		for( Integer num:counts){

			if( num > big ){
				big = num;
			}
		}
		
		return big;
	}
	
	/**
	 * 获取从Start日起,一个Period内连续打卡的次数. 
	 * 如获取从今天起一周内连续打卡的数字
	 * @param zipContent 
	 * @param zipStartTime 
	 * @param currentTimeMillis
	 * @param weekOfMonth
	 * @return 
	 */
	public static int getLatestContinueDay(long start, int timePeriod, long zipStartTime, String zipContent) {
		
		int count = 0;		
		List<String> punchList = RunLengthEncoding.decode2List(zipContent);
		List<Integer> counts = new ArrayList();
		for( int i = punchList.size()-1; i >=0  ; i--){
			//统计连续是Ｐ的个数
			if(punchList.get(i).equals("P")){
				count++;
			}else{
				break;
			}
		}
		
		return count;
	}
	
	/**
	 * 打卡 默认将这次打卡和上次打卡之间的的空白期认为是无打开
	 * 
	 * @param punchTime
	 *            打卡日期
	 * @param zipStartTime
	 *            打卡统计起止日期
	 * 
	 * @param string
	 *            打卡串,如果为空则新建一个,P打表打卡,N代表无打卡
	 * @return
	 */
	public static String punchTheClock(long punchTime, long zipStartTime, String zipContent) {

		String code = "";

		Integer diffDays = MyTimeUtil.diffDays(zipStartTime, punchTime);
		diffDays = Math.abs(diffDays);
		log.info(diffDays.toString());
		if (StringUtils.isBlank(zipContent)) {
			code = diffDays.toString() + "N" + "1P";

		} else {

			String punchStr = RunLengthEncoding.decode(zipContent);
			StringBuffer puncnBuffer = new StringBuffer(punchStr);
			for (int i = 0; i < diffDays - punchStr.length(); i++) {
				puncnBuffer.append("N");
			}
			puncnBuffer.append("P");
			code = RunLengthEncoding.encode(puncnBuffer.toString());
		}
		return code;
	}

	public static boolean isPunched(User user) {
		// TODO Auto-generated method stub
		//return false;
	
		 Date date = MyTimeUtil.getDateZeroTimeMillions(user.getPunchAt());	
		 log.info(date);
		if (user.getPunchAt() == null || System.currentTimeMillis() -	date.getTime()  > 24 * 3600 * 1000L) {
			return false;
		} else {

		}
		return true;
	}
	
	public static void main(String[] args) {
		User user=new User();
		user.setPunchAt(System.currentTimeMillis()-20 * 3600 * 1000L);
		
	log.info(PunchUtil.isPunched(user));
		
		
	}
	

}
