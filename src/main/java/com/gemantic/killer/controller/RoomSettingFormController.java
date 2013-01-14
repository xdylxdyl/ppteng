package com.gemantic.killer.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.common.model.Setting;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.service.SettingService;
import com.gemantic.killer.util.MessageUtil;

@Controller
@RequestMapping(value = "/m/form/setting")
public class RoomSettingFormController {

	@Autowired
	private RoomService roomService;

	@Autowired
	private SettingService settingService;

	@Autowired
	private MessageService droolsGameMessageService;

	@Autowired
	private PushClient pushClient;

	private static final Log log = LogFactory.getLog(RoomSettingFormController.class);

	@InitBinder
	public void initBind(WebDataBinder dataBinder, HttpServletRequest request) {
		String name = dataBinder.getObjectName();
		log.debug("initBind:" + name);

	}

	/**
	 * 载入Form
	 * 
	 * @param u
	 *            用户ID RequestParam
	 * @param groupId
	 *            用户分组ID 可以为空
	 * @param model
	 * @return
	 * @throws ServiceDaoException
	 * @throws ServiceException
	 */
	@RequestMapping(method = RequestMethod.GET)
	public String setupForm(Model model, @RequestParam String version, Long rid) throws Exception {

		Setting setting = null;
		if (rid == null) {
			// 新房间,没有

		} else {
			Room room = this.roomService.getRoom(rid);
			if (room == null) {
				// 不存在这个房间

				setting = settingService.getSetting(version);
				log.info(rid + " get default setting " + setting);

			} else {

				setting = room.getSetting();
				log.info(rid + " get user setting " + setting);

			}
		}

		model.addAttribute("setting", setting);
		return "/room/form/setting";

	}

	/**
	 * 处理提交Form数据
	 * 
	 * @param roomForm
	 *            表单
	 * @param result
	 * @param status
	 * @param model
	 * @return
	 */
	// TODO 切换到World
	@RequestMapping(method = RequestMethod.POST)
	public String processSubmit(@ModelAttribute Setting setting, BindingResult result, SessionStatus status, Model model)
			throws Exception {
		Long roomID = setting.getRid();
		Room room = this.roomService.getRoom(roomID);
		if (room == null) {
			// 不存在,错误

		} else {

			log.info(roomID + " modify setting  " + setting);
			room.setSetting(setting);
			this.roomService.updateRoom(room);
			List<Message> messages = this.droolsGameMessageService.updateSetting(room);
			MessageUtil.sendMessage(setting.getVersion(), messages, this.pushClient);

		}

		model.addAttribute("setting", setting);
		return "/room/form/setting";
		// return
		// "redirect:/m/form/setting.do?rid="+roomID+"&version="+setting.getVersion();
	}

}
