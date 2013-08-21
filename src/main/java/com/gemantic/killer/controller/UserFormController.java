package com.gemantic.killer.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
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
import org.springframework.web.bind.support.SessionStatus;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.DESUtil;
import com.gemantic.common.util.PasswordUtils;
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.killer.exception.ServiceErrorCode;
import com.gemantic.killer.model.User;
import com.gemantic.labs.killer.service.UsersService;


@Controller
@RequestMapping(value = "/player/regedit")
public class UserFormController {
	@Autowired
	private UsersService userService;
	
	


	@Autowired
	private CookieUtil cookieUtil;

	private static final Log log = LogFactory.getLog(UserFormController.class);

	@InitBinder
	public void initBind(WebDataBinder dataBinder, HttpServletRequest request) {
		String name = dataBinder.getObjectName();
		log.debug("initBind:" + name);

	}

	@ModelAttribute("user")
	public User getUserObject() {
		return new User();
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
	public String setupForm(HttpServletRequest request, HttpServletResponse response, Model model, String type, String token) throws Exception {
		User user = new User();
		user.setName("");
		if ("edit".equals(type)) {
			Long uid = cookieUtil.getID(request, response);
			log.info("HI " + uid);

			if (uid == null) {
				model.addAttribute("code", -6004);
				return "redirect:/login";
			} else {
				user = this.userService.getObjectById(uid);
				if (user == null) {

					model.addAttribute("code", -6005);
					return "redirect:/login";
				} else {

				}

			}

		}
		;
		if ("forget".equals(type)) {
			// 用户从忘记密码点过来
			if (StringUtils.isBlank(token)) {
				log.error(" empty token ");
				model.addAttribute("code", -6006);
				return "redirect:/login";
			} else {

				String content = DESUtil.decrypt(token.getBytes());
				String[] cs = content.split(",");
				if (cs.length != 2) {
					log.error(content+" invalid token ");
					model.addAttribute("code", -6006);
					return "redirect:/login";
				}
				Long uid=Long.valueOf(cs[0]);
				Long time=Long.valueOf(cs[1]);
				if(System.currentTimeMillis()-time>5*60*1000){
					log.error(content+" invalid time ");
					model.addAttribute("code", -6007);
					return "redirect:/login";
					
				}
				user = this.userService.getObjectById(uid);
				if (user == null) {
					log.error(content+" invalid user ");
					model.addAttribute("code", -6005);
					return "redirect:/login";
				} else {
					

				}
				
				
			}

		} 
		
		if("email".equals(type)){
			
			
			
			
		}else {
			
		}
		
		
	   

		model.addAttribute("type", type);
		model.addAttribute("user", user);
		model.addAttribute("current", user);
		model.addAttribute("selfID",user.getId());
		return "/player/form/init";

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
	public String processSubmit(HttpServletRequest request, HttpServletResponse response, @ModelAttribute("user") User user, BindingResult result,
			SessionStatus status, Model model) throws Exception {
		log.info("new user regedit "+user);
		Long uid = user.getId();
		User u=null;
		boolean update = false;
		if (uid == null) {
			Long id = this.userService.getUsersIdByEmail(user.getEmail());
			if (id != null) {

				model.addAttribute("code", ServiceErrorCode.Email_Already_Exist);
				model.addAttribute("user", user);
				return "/player/form/init";
			}
			update = false;			
			
		} else {

			 u = this.userService.getObjectById(uid);
			if (u == null) {
				update = false;
			} else {
				update = true;
				
				if(user.getPassword().equals(u.getPassword())){
					
				}else{
					u.setPassword(PasswordUtils.encode(user.getPassword()));
				}
				
				u.setName(user.getName());
			}

		}
		if (update) {
			this.userService.update(u);
		} else {
			user.setPassword(PasswordUtils.encode(user.getPassword()));
			this.userService.insert(user);
		}

		// 什么时候把Cookie种下呢.
		cookieUtil.setIdentity(request, response, user.getName(), user.getId());

		// log.info("房间 "+room);

		return "redirect:/m/list.do";
	}

}
