package com.gemantic.killer.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.common.util.MyListUtil;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.model.Record;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.model.User;
import com.gemantic.killer.service.RecordService;
import com.gemantic.killer.service.UserService;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class RecordController {
	private static final Log log = LogFactory.getLog(RecordController.class);

	@Autowired
	private RecordService recordService;
	@Autowired
	private PushClient pushClient;

	@Autowired
	private UserService userSevice;

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/record/list")
	public String list(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		log.debug("start get room list ");

		List<Record> records = recordService.getList(System.currentTimeMillis(), System.currentTimeMillis() - 24 * 60 * 60 * 1000L);
		log.info("get record size " + records.size());
		model.addAttribute("records", records);

		List<Long> userIDS = new ArrayList();
		for (Record record : records) {
			Room r = record.getRoom();
			userIDS.add(r.getCreaterID());

		}
		List<User> users = this.userSevice.getUsers(userIDS);
		Map id_user = MyListUtil.convert2Map(User.class.getDeclaredField("id"), users);

		model.addAttribute("records", records);
		model.addAttribute("users", id_user);
		return "/record/list/all";
	}

	/**
	 * 游戏开始
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/record/replay")
	public String createRoom(HttpServletRequest request, HttpServletResponse response, ModelMap model, Long recordID, String version, Long rid, Long uid)
			throws Exception {
		log.debug("HI");
		// 先创建一个假房间?那房间里的Query怎么办.

		this.recordService.play(recordID, rid);

		// MessageUtil.sendMessage(version,messages,this.pushClient);
		model.addAttribute("uid", uid);
		model.addAttribute("rid", rid);
		return "/common/success";
	}

	/**
	 * 游戏开始
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/record/enter")
	public String enter(HttpServletRequest request, HttpServletResponse response, ModelMap model, Long recordID) throws Exception {
		log.debug("HI");
		// 先创建一个假房间?那房间里的Query怎么办.

		Record record = this.recordService.getRecord(recordID);

		List<String> contents = this.recordService.getContent(recordID);

		String version = record.getRoom().getVersion();
		model.addAttribute("contents", contents);
		model.addAttribute("record", record);
		model.addAttribute("room", record.getRoom());
		model.addAttribute("type", "record");
		return "/room/play/" + version;
	}

	/**
	 * 游戏开始
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/record/detail")
	public String getRecordDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model, Long recordID) throws Exception {
		log.debug("HI");
		// 先创建一个假房间?那房间里的Query怎么办.

		Record record = this.recordService.getRecord(recordID);

		model.addAttribute("record", record);
		model.addAttribute("room", record.getRoom());

		return "/record/detail/show";
	}

	/**
	 * 游戏开始
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/record/setting")
	public String getRecordSetting(HttpServletRequest request, HttpServletResponse response, ModelMap model, Long recordID) throws Exception {
		log.debug("HI");
		// 先创建一个假房间?那房间里的Query怎么办.

		Record record = this.recordService.getRecord(recordID);

		model.addAttribute("record", record);
		model.addAttribute("room", record.getRoom());
		model.addAttribute("setting", record.getRoom().getSetting());
		return "/room/form/setting";
	}

	/**
	 * 游戏开始
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/record/expression/show")
	public String getRecordExpression(HttpServletRequest request, HttpServletResponse response, ModelMap model, Long recordID) throws Exception {
		log.debug("HI");
		// 先创建一个假房间?那房间里的Query怎么办.

		Record record = this.recordService.getRecord(recordID);

		model.addAttribute("record", record);
		model.addAttribute("room", record.getRoom());

		List<String> ls = new ArrayList();
		ls = record.getRoom().getExpressions();
		model.addAttribute("code", "0");
		model.addAttribute("express", ls);
		return "/room/express/show";
	}

}
