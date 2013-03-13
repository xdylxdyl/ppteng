package com.gemantic.analyse.util;

import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;

import com.gemantic.common.util.FileUtil;
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
				System.currentTimeMillis() - 3 * 24 * 60 * 60 * 1000L, "8P19N1P23N1P1N1P5N4P1N1P8N1P2N1P");
		log.info("连续打卡~" + latersCount);

		int punchCount = PunchUtil.getContinueDay(PunchUtil.Punch_Time_Start, Integer.MAX_VALUE, PunchUtil.Punch_Time_Start, "10N2P");
		log.info("连续打卡~" + punchCount);

	}

	// @Test
	public void testImg() throws IOException {

		String url = "http://www.popo8.com/host/data/20121231/ac4a366.jpg";
		FileUtil.saveImage(url, "d://test");

	}

}
