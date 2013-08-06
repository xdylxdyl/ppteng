package com.gemantic.killer.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.common.util.http.HttpClientUtil;
import com.gemantic.common.util.http.HttpUrl;
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.labs.killer.model.MineTrain;
import com.gemantic.labs.killer.service.MineTrainService;
import com.gemantic.labs.killer.service.UsersService;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class mineController {
	private static final Log log = LogFactory.getLog(mineController.class);

	@Autowired
	private UsersService userSevice;

	@Autowired
	private MineTrainService mineTrainService;

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
	@RequestMapping(value = "/mine/train/list")
	public String list(HttpServletRequest request, HttpServletResponse response, ModelMap model, Integer page, Integer size, Long uid, String type) throws Exception {

		
		
		//http://www.duole.com/api/scene/get_all
	   // http://www.duole.com/api/mood/get_all?client=pc
		

		List<Long> ids=this.mineTrainService.getList(0, Integer.MAX_VALUE);
		List<MineTrain> mineTrains=this.mineTrainService.getObjectsByIds(ids);
		
		
		model.addAttribute("trains", mineTrains);

		return "/mine/train/jlist";
	}



}
