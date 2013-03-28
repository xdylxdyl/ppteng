package com.gemantic.analyse.util;

import java.io.IOException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;

import com.gemantic.common.util.FileUtil;
import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.common.util.zip.RunLengthEncoding;
import com.gemantic.killer.util.PunchUtil;

public class ZipTest {

	private static final Log log = LogFactory.getLog(ZipTest.class);

	@Test
	public void testZipUtil() {
		log.info(System.currentTimeMillis());
		// 1.用户打卡
		long interval = 3 * 24 * 60 * 60 * 1000L;
		Long start = System.currentTimeMillis() - interval;
		log.info(start);
		String content = PunchUtil.punchTheClock(System.currentTimeMillis(), start, "1N1P");

		log.info(content);

		// 2.判断用户连结打卡多少天
		int count = PunchUtil.getContinueDay(System.currentTimeMillis() - 3 * 24 * 60 * 60 * 1000L, PunchUtil.Period_Week, System.currentTimeMillis() - 3 * 24
				* 60 * 60 * 1000L, "3P10N2P");
		log.info("连续打卡~" + count);

		// 2.判断用户连结打卡多少天
		int latersCount = PunchUtil.getLatestContinueDay(System.currentTimeMillis() - 3 * 24 * 60 * 60 * 1000L, PunchUtil.Period_Week,
				System.currentTimeMillis() - 3 * 24 * 60 * 60 * 1000L, "12N4P4N1P4N1P2N1P2N3P1N1P4N8P2N2P1N2P1N6P2N1P1N2P1N5P1N2P");
		log.info("连续打卡~" + latersCount);

		int punchCount = PunchUtil.getContinueDay(PunchUtil.Punch_Time_Start, Integer.MAX_VALUE, PunchUtil.Punch_Time_Start, "10N2P");
		log.info("连续打卡~" + punchCount);
		
		List<String> punchList = RunLengthEncoding.decode2List("12N4P4N1P4N1P2N1P2N3P1N1P4N8P2N2P1N2P1N6P2N1P1N2P1N5P1N2P");
	
		log.info(punchList);

	}

	// @Test
	public void testImg() throws IOException {

		String url = "http://www.popo8.com/host/data/20121231/ac4a366.jpg";
		FileUtil.saveImage(url, "d://test");

	}
	
	public static void main(String[] args) {
		Long pre=MyTimeUtil.getPreZeroTimeMillions(1);
		log.info(pre+" day is "+MyTimeUtil.convertLong2String(pre, "yyyy-MM-dd"));
		log.info(1364309002676L+" day is "+MyTimeUtil.convertLong2String(1364309002676L, "yyyy-MM-dd"));
	}

}
