package com.gemantic.killer.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.MemberService;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.util.MessageUtil;
import com.gemantic.labs.killer.event.SendMessageEvent;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class MessageController implements ApplicationContextAware {
	private static final Log log = LogFactory.getLog(MessageController.class);

	@Autowired
	private MessageService droolsGameMessageService;

	@Autowired
	private PushClient pushClient;

	@Autowired
	private MemberService memberService;
	@Autowired
	private RoomService roomService;

	private ApplicationContext context;

	@Autowired
	private CookieUtil cookieUtil;

	/**
	 * 接收消息
	 * 
	 * @param request
	 * @param response
	 * @param model
	 *            \
	 * @param action
	 *            0004,Login,all,,Red,兴奋的
	 * @param content
	 *            游戏开始了
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/message/accept")
	public String createQuestion(HttpServletRequest request,
			HttpServletResponse response, ModelMap model,
			@RequestParam String version, @RequestParam String action,
			String content, boolean isDrools) throws Exception {
		log.info(action + " content " + content);
		int code = 0;

		content = MessageUtil.escape(content);// 真烦啊.为什么这个地方必须要加Escape的,能不能不加啊.
		Message message = MessageUtil.parse(version, action, content);
		message.setId(RandomUtils.nextLong());
		Long rid = Long.valueOf(message.getWhere());

		Room room = this.roomService.getRoom(rid);
		if (room == null) {
			log.error(message + " no room ,can not get message ");
			model.addAttribute("code", -100);
			return "/message/accept/show";

		} else {
			room.getMessages().offer(message);

			SendMessageEvent event = new SendMessageEvent(this, message, rid);
			this.context.publishEvent(event);
		}
		// 如何保证一个房间里的消息不并发出现呢.Java Queue有没有好的Util

		if ("logout".equals(message.getPredict())) {
			this.memberService.userLogOut(rid,
					Long.valueOf(message.getSubject()));

		}

		model.addAttribute("code", code);
		return "/message/accept/show";

	}

	/**
	 * 接收消息
	 * 
	 * @param request
	 * @param response
	 * @param model
	 *            \
	 * @param action
	 *            0004,Login,all,,Red,兴奋的
	 * @param content
	 *            游戏开始了
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/message/accept2")
	public String accept(HttpServletRequest request,
			HttpServletResponse response, ModelMap model,
			@ModelAttribute Message message) throws Exception {
		// log.info(" accept  "+ message);
		int code = 0;

		Long selfID = cookieUtil.getID(request, response);
		if(selfID==null){
			code=-6008;
			model.addAttribute("code", code);
			return "/message/accept/show";
		}

		message.setId(RandomUtils.nextLong());
		message.setSubject(String.valueOf(selfID));
		Long rid = Long.valueOf(message.getWhere());

		Room room = this.roomService.getRoom(rid);
		if (room == null) {
			log.error(message + " no room ,can not get message ");
			model.addAttribute("code", -100);
			return "/message/accept/show";

		} else {
		
			
			SendMessageEvent event = new SendMessageEvent(this, message, rid);
			this.context.publishEvent(event);
			
		}
		// 如何保证一个房间里的消息不并发出现呢.Java Queue有没有好的Util

		if ("logout".equals(message.getPredict())) {
			this.memberService.userLogOut(rid,
					Long.valueOf(message.getSubject()));

		}

		model.addAttribute("code", code);
		return "/message/accept/show";

	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.context = applicationContext;

	}

}
