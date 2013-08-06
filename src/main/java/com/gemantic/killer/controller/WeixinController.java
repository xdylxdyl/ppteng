package com.gemantic.killer.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gemantic.common.util.FileUtil;
import com.gemantic.common.util.MyListUtil;
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.model.User;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.util.PunchUtil;
import com.gemantic.labs.killer.model.SimpleStatistics;
import com.gemantic.labs.killer.model.Users;
import com.gemantic.labs.killer.service.SimpleStatisticsService;
import com.gemantic.labs.killer.service.UsersService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class WeixinController {
	private static final Log log = LogFactory.getLog(WeixinController.class);
	



	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/weixin/token")
	public String index(HttpServletRequest request,
			HttpServletResponse response, ModelMap model, Integer code,String echostr)
			throws Exception {

		
		model.addAttribute("echostr", echostr);

		return "/weixin/token/show";
	}

	

}
