package com.gemantic.killer.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.common.util.MyListUtil;
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.killer.model.User;
import com.gemantic.labs.killer.model.MoneyFlow;
import com.gemantic.labs.killer.service.MoneyFlowService;
import com.gemantic.labs.killer.service.UsersService;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class MoneyController {
	private static final Log log = LogFactory.getLog(MoneyController.class);

	

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
	@RequestMapping(value = "/money/flow")
	public String list(HttpServletRequest request, HttpServletResponse response, ModelMap model, Integer page, Integer size, Long uid, String type) throws Exception {

		if (uid == null) {
			uid = cookieUtil.getID(request, response);
		}
		if ("out".equals(type)) {

		} else {
			type = "in";
		}
		log.info(uid + " start get money list " + type);
		if (page == null) {
			page = 1;
		}
		if (page < 1) {
			page = 1;
		}
		if (size == null) {
			size = 21;
		}
		Integer start = (page - 1) * size;
		List<Long> userIDS = new ArrayList();
		List<User> users = new ArrayList();
		List<Long> ids = new ArrayList();
		if ("in".equals(type)) {
			ids = this.moneyFlowService.getMoneyFlowIdsByUid(uid, start, size);
		} else {
			ids = this.moneyFlowService.getMoneyFlowIdsByFid(uid, start, size);
		}

		List<MoneyFlow> mfs = this.moneyFlowService.getObjectsByIds(ids);
		Set<Long> uids = new HashSet();
		uids.add(uid);
		for (MoneyFlow mf : mfs) {
			uids.add(mf.getFid());
		}

		users = this.userSevice.getObjectsByIds(new ArrayList(uids));
		Map<Long, User> ids_user = new HashMap();
		if("in".equals(type)){
			 ids_user = MyListUtil.convert2Map(MoneyFlow.class.getDeclaredField("fid"), mfs);	
		}else{
			ids_user = MyListUtil.convert2Map(MoneyFlow.class.getDeclaredField("uid"), mfs);	
		}
	
		log.info("money all "+ids_user);

		users = this.userSevice.getObjectsByIds(userIDS);
		
		model.addAttribute("uid", uid);
		model.addAttribute("mfs", mfs);
		model.addAttribute("id_users", ids_user);
		model.addAttribute("tye", type);
		model.addAttribute("page", page);
		model.addAttribute("size", size);
		
		
		return "/room/player/moneyFlow";
	}

	
}
