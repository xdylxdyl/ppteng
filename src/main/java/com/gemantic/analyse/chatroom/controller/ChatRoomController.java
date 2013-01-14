package com.gemantic.analyse.chatroom.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.analyse.chatroom.constants.Constants;
import com.gemantic.analyse.chatroom.model.User;
import com.gemantic.commons.push.client.PushClient;


@Controller
public class ChatRoomController {
	private static final int SUCCESS = 1;

	private static final String ALL = "All";

	private static final Log log = LogFactory.getLog(ChatRoomController.class);
	
	@Autowired
	private PushClient pushClient;

	@RequestMapping(value = "/xroom/send")
	public String send(HttpServletRequest request, HttpServletResponse response, ModelMap model, String from, String to, String message) throws Exception {
		Long start = System.currentTimeMillis();
		
		log.info("Send message from : " + from + ", to : " + to + ", message : " + message);
		
		List<Long> ids = getUserIdsByNames(to, from);
		
		String pack = message;
		
		pushClient.push(ids, pack);
		log.info("send to ids : " + ids.toString());
		
		log.info("==== Time comsume (send) : " + (System.currentTimeMillis() - start) + " ====");
		
		model.addAttribute("code", SUCCESS);
		model.addAttribute("from", from);
		model.addAttribute("to", to);
		model.addAttribute("message", message);
		
		return "/chatroom/message";
	}
	
	private List<Long> getUserIdsByNames(String to, String from) {
		List<Long> ids = new ArrayList<Long>();
		if (StringUtils.isEmpty(to) || to.equals(ALL)) {
			List<User> users = Constants.getUsers();
			for(User u : users) {
				ids.add(u.getId());
			}
		}
		else {
			User u = Constants.getUser(to);
			if (null != u) ids.add(u.getId());
			
			//Add self
			u = Constants.getUser(from);
			if (null != u && !ids.contains(u.getId())) ids.add(u.getId());
		}
		
		return ids;
	}
}
