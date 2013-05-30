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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.MyListUtil;
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.model.User;
import com.gemantic.killer.service.MineStatisticsService;
import com.gemantic.killer.service.SettingService;
import com.gemantic.labs.killer.etl.RecordStastisticsEtl;
import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.service.RecordService;
import com.gemantic.labs.killer.service.UserRecordService;
import com.gemantic.labs.killer.service.UsersService;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class MineRankController {
	private static final Log log = LogFactory.getLog(MineRankController.class);

	@Autowired
	private PushClient pushClient;

	@Autowired
	private RecordService recordService;

	@Autowired
	private UserRecordService userRecordService;

	@Autowired
	private SettingService settingService;

	@Autowired
	private UsersService userSevice;
	@Autowired
	private RecordStastisticsEtl recordStastisticsEtl;

	@Autowired
	private MineStatisticsService mineStatisticService;
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
	@RequestMapping(value = "/mine/statistics/{smallVersion}")
	public String list(HttpServletRequest request,
			HttpServletResponse response, ModelMap model,@PathVariable String smallVersion,
			Integer page, Integer size, Long uid) throws Exception {

		
		log.info("start get room list " + smallVersion);
		Long selfID = cookieUtil.getID(request, response);

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

		List<Records> records = this.getRecords(smallVersion, uid, start, size);

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

		if (uid != null) {
			User u = this.userSevice.getObjectById(uid);
			if (u == null) {

			} else {
				log.info(uid + "get user " + u);
				model.addAttribute("current", u);
			}
		}

		model.addAttribute("selfID", selfID);
		model.addAttribute("uid", uid);

		model.addAttribute("records", records);
		model.addAttribute("users", id_user);
		model.addAttribute("page", page);
		model.addAttribute("size", size);
		model.addAttribute("smallVersion", smallVersion);

		return "/room/rank/mine_rank";
	}

	private List<Records> getRecords(String version, Long uid, Integer start,
			Integer size) throws ServiceException, ServiceDaoException {
		List<Long> ids = new ArrayList();

		if (uid == null) {
			// get all

			ids = this.mineStatisticService
					.getMineStatisticsIdsBySettingOrderByTime(version, start,
							size);

		} else {
			// get persion

			ids = this.mineStatisticService
					.getMineStatisticsIdsBySettingAndUidOrderByTime(version,
							uid, start, size);

		}

		List<Records> records = recordService.getObjectsByIds(ids);
		return records;
	}

}
