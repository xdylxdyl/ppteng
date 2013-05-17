package com.gemantic.killer.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.common.util.http.HttpClientUtil;
import com.gemantic.common.util.http.HttpUrl;
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.labs.killer.service.MoneyFlowService;
import com.gemantic.labs.killer.service.UsersService;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class MusicController {
	private static final Log log = LogFactory.getLog(MusicController.class);

	@Autowired
	private UsersService userSevice;

	@Autowired
	private MoneyFlowService moneyFlowService;

	@Autowired
	private CookieUtil cookieUtil;

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/music/list")
	public String list(HttpServletRequest request, HttpServletResponse response, ModelMap model, Integer page, Integer size, Long uid, String type) throws Exception {

		
		
		//http://www.duole.com/api/scene/get_all
	   // http://www.duole.com/api/mood/get_all?client=pc
		

		HttpUrl url=new HttpUrl();
		HashMap<Object, Object> params=new HashMap();	
		params.put("scene_id", "10");		
		params.put("limit", "10");	
		params.put("mood_id", "6");
		
		url.setHost("www.duole.com");
		url.setParams(params);
		url.setPath("/api/song/get_song_play_list");
		String result=HttpClientUtil.getInstance().get(url,"utf-8");
		
		model.addAttribute("result", result);

		return "/music/list/show";
	}



}
