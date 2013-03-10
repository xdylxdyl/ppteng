package com.gemantic.killer.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.common.util.MyListUtil;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.model.User;
import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.service.RecordService;
import com.gemantic.labs.killer.service.UsersService;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class RankController {
	private static final Log log = LogFactory.getLog(RankController.class);

	@Autowired
	private PushClient pushClient;

	@Autowired
	private RecordService recordService; 
	
	@Autowired
	private UsersService userSevice;

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rank/list")
	public String list(HttpServletRequest request, HttpServletResponse response, ModelMap model,Integer page,Integer size,String type) throws Exception {
		log.info("start get rank list ");
		
		if(StringUtils.isBlank(type)){
			type="money";
		}
		if(page==null){
			page=1;
		}
		if(page<1){
			page=1;
		}
		if(size==null){
			size=21;
		}
		Integer start=(page-1)*size;
		

		List<Long> userIDS=this.userSevice.getUIdsOrderByMoney(start,size);
		List<User> users = this.userSevice.getObjectsByIds(userIDS);
		
		model.addAttribute("users", users);
		model.addAttribute("type", type);
		model.addAttribute("page", page);
		model.addAttribute("size", size);
		return "/room/rank/money";
	}

	

}
