package com.gemantic.analyse.chatroom.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.analyse.chatroom.constants.Constants;
import com.gemantic.analyse.chatroom.model.User;

@Controller
public class UserController {
	private static final int FAILURE = 0;
	private static final int SUCCESS = 1;
	private static final Log log = LogFactory.getLog(UserController.class);
	
	@RequestMapping(value = "/user/checkout")
	public String checkout(HttpServletRequest request, HttpServletResponse response, ModelMap model, String name, String password) throws Exception {
		
		log.info("user name : " + name + ", password : " + password);
		
		if (StringUtils.isNotEmpty(name) && StringUtils.isNotEmpty(password) && name.equals(password)) {
			//record logined user
			User u = Constants.add(name);
			model.addAttribute("code", SUCCESS);
			model.addAttribute("user", u);
		}
		else {
			model.addAttribute("code", FAILURE);
		}
		
		return "/user/checkout";
	}
	
	@RequestMapping(value = "/user/list")
	public String getLoginUsers(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		
		List<User> userList = Constants.getUsers();
		
		model.addAttribute("users", userList);
		return "/user/list";
	}
	
	@RequestMapping(value = "/user/logout")
	public String logout(HttpServletRequest request, HttpServletResponse response, ModelMap model, String name) throws Exception {
		
		Constants.remove(name);
		model.addAttribute("code", SUCCESS);
		
		return "/user/checkout";
	}
	
	@RequestMapping(value = "/user/openid")
	public String openidCheck(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		String identity = request.getParameter("openid.identity");
		String assoc = request.getParameter("openid.assoc_handle");
		String returnTo = request.getParameter("openid.return_to");
		String name = request.getParameter("openid.username");
		String fullname = request.getParameter("openid.ax.value.fullname");
		String firstname = request.getParameter("openid.ext1.value.firstname");
		String lastname = request.getParameter("openid.ext1.value.lastname");
		String signed = request.getParameter("openid.signed");
		String sig = request.getParameter("openid.sig");
		
		if (StringUtils.isEmpty(name) && StringUtils.isNotEmpty(fullname)) name = fullname;
		if (StringUtils.isEmpty(name) && (StringUtils.isNotEmpty(firstname) || StringUtils.isNotEmpty(lastname))) name = firstname + " " + lastname;
		
		log.info("user name : " + name + ", full name : " + fullname + ", signed : " + signed);
		
		if (StringUtils.isNotEmpty(name) && StringUtils.isNotEmpty(signed)) {
			//record logined user
			User u = Constants.add(name);
			model.addAttribute("code", SUCCESS);
			model.addAttribute("user", u);
						
			return "redirect:http://10.0.0.40:8000/room/main.html?uname=" +u.getName()+ "&uid="+u.getId();
		}
		else {
			model.addAttribute("code", FAILURE);
		}
		
		return "redirect:http://10.0.0.40:8000/login.html";
	}
}
