package com.gemantic.killer.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.MyListUtil;
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.model.User;
import com.gemantic.killer.service.SettingService;
import com.gemantic.labs.killer.etl.RecordStastisticsEtl;
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
public class RecordController {
	private static final Log log = LogFactory.getLog(RecordController.class);

	@Autowired
	private PushClient pushClient;

	@Autowired
	private RecordService recordService;
	
	@Autowired
	private SettingService settingService;

	@Autowired
	private UsersService userSevice;
	@Autowired
	private RecordStastisticsEtl recordStastisticsEtl;

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
	@RequestMapping(value = "/record/list")
	public String list(HttpServletRequest request,
			HttpServletResponse response, ModelMap model, String version,
			Integer page, Integer size, Long uid) throws Exception {
		log.info("start get room list " + version);

		if (page == null) {
			page = 1;
		}
		if (page < 1) {
			page = 1;
		}
		if (size == null) {
			size = 20;
		}
		Integer start = (page - 1) * size;

		List<Records> records = this.getRecords(version, uid, start, size);

		log.info("get record size " + records.size());
		model.addAttribute("records", records);

		List<Long> userIDS = new ArrayList();
		for (Records record : records) {
			Room r = record.getRoom();
			userIDS.add(r.getCreaterID());

		}
		List<User> users = this.userSevice.getObjectsByIds(userIDS);
		Map id_user = MyListUtil.convert2Map(User.class.getDeclaredField("id"),
				users);

		model.addAttribute("records", records);
		model.addAttribute("users", id_user);
		model.addAttribute("page", page);
		model.addAttribute("size", size);
		model.addAttribute("version", version);

		return "/record/list/all";
	}

	private List<Records> getRecords(String version, Long uid, Integer start,
			Integer size) throws ServiceException, ServiceDaoException {
		List<Long> ids = new ArrayList();
		
		if(uid==null){
			//get all
			
			if (StringUtils.isBlank(version) || "all".equals(version)) {
				version = "all";
				// 考虑分页问题.分页暂时不做.先切数据库.看看数据库对不对.
				ids = recordService.getList(start, size);

			}else{
				ids = recordService.getRecordIdsByVersion(version + ".0", start,
						size);
			}
		}else{
		   //get persion	
			
		
			
		}

		


		List<Records> records = recordService.getObjectsByIds(ids);
		return records;
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
	/*
	 * @RequestMapping(value = "/record/replay") public String
	 * createRoom(HttpServletRequest request, HttpServletResponse response,
	 * ModelMap model, Long recordID, String version, Long rid, Long uid) throws
	 * Exception { log.debug("HI"); // 先创建一个假房间?那房间里的Query怎么办.
	 * 
	 * this.recordService.play(recordID, rid);
	 * 
	 * // MessageUtil.sendMessage(version,messages,this.pushClient);
	 * model.addAttribute("uid", uid); model.addAttribute("rid", rid); return
	 * "/common/success"; }
	 */

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
	public String enter(HttpServletRequest request,
			HttpServletResponse response, ModelMap model, Long recordID)
			throws Exception {
		log.debug("HI");
		// 先创建一个假房间?那房间里的Query怎么办.

		Records record = this.recordService.getObjectById(recordID);

		List<String> contents = this.recordService.getContent(recordID);

		String version = record.getVersion();
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
	public String getRecordDetail(HttpServletRequest request,
			HttpServletResponse response, ModelMap model, Long recordID)
			throws Exception {
		log.debug("HI");
		// 先创建一个假房间?那房间里的Query怎么办.

		Records record = this.recordService.getObjectById(recordID);

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
	public String getRecordSetting(HttpServletRequest request,
			HttpServletResponse response, ModelMap model, Long recordID)
			throws Exception {
		log.debug("HI");
		// 先创建一个假房间?那房间里的Query怎么办.

		Records record = this.recordService.getObjectById(recordID);
		model.addAttribute("record", record);
		model.addAttribute("room", record.getRoom());
		model.addAttribute("setting", record.getRoom().getSetting());

		Map<String,String> settingDisplay=this.settingService.getSettingDisplay();
		
		model.addAttribute("settingDisplay", settingDisplay);
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
	public String getRecordExpression(HttpServletRequest request,
			HttpServletResponse response, ModelMap model, Long recordID)
			throws Exception {
		log.debug("HI");
		// 先创建一个假房间?那房间里的Query怎么办.

		Records record = this.recordService.getObjectById(recordID);

		model.addAttribute("record", record);
		model.addAttribute("room", record.getRoom());

		List<String> ls = new ArrayList();
		ls = record.getRoom().getExpressions();
		model.addAttribute("code", "0");
		model.addAttribute("express", ls);
		return "/room/express/show";
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
	@RequestMapping(value = "/record/calculate")
	public String calculate(HttpServletRequest request,
			HttpServletResponse response, ModelMap model, String version,
			String type, String[] functionTypes) throws Exception {

		// 先创建一个假房间?那房间里的Query怎么办.
		// 没有Email再判断是否是cookie
		Long uid = cookieUtil.getID(request, response);
		if (uid != 256L && uid != 245L) {
			log.info("not limt " + uid);
		} else {

			Set<String> ftSet = null;
			if (functionTypes == null) {

			} else {
				ftSet = new HashSet();
				for (String ft : functionTypes) {
					ftSet.add(ft);
				}
			}
			log.info("start calculate " + type + " function type " + ftSet);
			recordStastisticsEtl.calculateProcess(type, ftSet);
		}

		model.addAttribute("code", "0");

		return "/common/success";
	}

}
