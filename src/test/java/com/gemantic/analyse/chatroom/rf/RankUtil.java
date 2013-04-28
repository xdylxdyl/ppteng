package com.gemantic.analyse.chatroom.rf;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;

import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.killer.util.RoleUtil;

public class RankUtil {

	private static final Log log = LogFactory.getLog(RankUtil.class);

	@Test
	public void testRandom() {
		for (int i = 0; i < 50; i++) {
			log.info(RandomUtils.nextInt(4));
		}

	}

	public RankUtil() {
		super();
		// TODO Auto-generated constructor stub
	}

	public static List<String> getRank(String type, int size) {
		// 构造HttpClient的实例
		HttpClient httpClient = new HttpClient();
		// 创建GET方法的实例
		GetMethod getMethod = new GetMethod(
				"http://192.168.11.149/getRanking?m=cyb");
		/*
		 * //使用系统提供的默认的恢复策略
		 * getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
		 * new DefaultHttpMethodRetryHandler());
		 * 
		 * getMethod.getParams().setParameter("m",type);
		 */

		try {
			// 执行getMethod
			int statusCode = httpClient.executeMethod(getMethod);
			if (statusCode != HttpStatus.SC_OK) {
				System.err.println("Method failed: "
						+ getMethod.getStatusLine());
			}
			// 读取内容
			byte[] responseBody = getMethod.getResponseBody();
			// 处理内容
			String res = new String(responseBody);

			List<String> symbols = parse(res, size);

			return symbols;

		} catch (HttpException e) {
			// 发生致命的异常，可能是协议不对或者返回的内容有问题
			System.out.println("Please check your provided http address!");
			e.printStackTrace();
		} catch (IOException e) {
			// 发生网络异常
			e.printStackTrace();
		} finally {
			// 释放连接
			getMethod.releaseConnection();
		}
		return new ArrayList();
	}

	public static void main(String[] args) {

		List<String> results = RankUtil.getRank("sz", 5);
		log.info(results);
	}

	private static List<String> parse(String res, int size) {
		log.info(res);
		List<String> symbols = new ArrayList();
		String[] strs = res.split("\r\n");
		log.info(strs.length);

		for (String line : strs) {

			String[] metas = line.split(",");
			if (metas.length < 2) {
				continue;
			}
			String[] aa = metas[1].split("_");
			if (aa.length < 2) {
				continue;
			}
			symbols.add(aa[1]);
		}

		log.info(symbols);
		List<String> ls = symbols.subList(0, size);
		log.info(ls);

		// TODO Auto-generated method stub
		return ls;
	}

	@Test
	public void assignRole() {

		Map<String, Integer> role_count = new HashMap();
		role_count.put("killer", 2);
		role_count.put("water", 8);
		List<String> ls = new ArrayList();
		for (int i = 0; i < 10; i++) {
			ls.add(String.valueOf(i));

		}
		Map<String, String> s = RoleUtil.assingRole(role_count, ls);

		log.info(s);
	}
	
	@Test
	public void testTime() throws ParseException{
		String format="yyyy-mm-dd";
		Long time=MyTimeUtil.convertString2Long("9222-01-01", format);
		log.info(time +" of long ");
	String content=	MyTimeUtil.convertLong2String(time, format);
		log.info(content +" of string ");
		
		
	}

}
