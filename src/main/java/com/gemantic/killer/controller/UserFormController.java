package com.gemantic.killer.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.killer.exception.ServiceErrorCode;
import com.gemantic.killer.model.User;
import com.gemantic.killer.service.UserService;

@Controller
@RequestMapping(value = "/player/regedit")
public class UserFormController {
	@Autowired
	private UserService userService;

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
	public String setupForm(HttpServletRequest request, HttpServletResponse response,Model model) throws Exception {
		Long uid=null;
		User user=null;
		log.debug("HI " + uid);
		if(uid==null){
			user=new User();
			user.setName("");
		}else{
			
			user = this.userService.getUserByID(uid);	
			if (user == null) {
				user=new User();
				user.setName("");
			}else{
				
			}
			
		}
		
	
		model.addAttribute("user", user);
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
    public String processSubmit(HttpServletRequest request, HttpServletResponse response,@ModelAttribute("user")
    User user, BindingResult result, SessionStatus status, Model model) throws Exception {
    	Long uid=user.getId();    
    	boolean update=false;
        if (uid == null) {
        	Long id=this.userService.getIdByEmail(user.getEmail());
        	if(id!=null){    
        		
        		model.addAttribute("code", ServiceErrorCode.Email_Already_Exist);
        		model.addAttribute("user", user);
            	return "/player/form/init";
        	}
        	update=false;
    		this.userService.insertUser(user);
        } else {
           
        	User u=this.userService.getUserByID(uid);
        	 if(u==null){
        		 update=false;
        	 }else{
        		 update=true;
        	 }
            
        }
        if(update){
        	this.userService.update(user);
        }else{
        	this.userService.insertUser(user);
        }
        
        //什么时候把Cookie种下呢.
        cookieUtil.setIdentity(request, response, user.getName(), user.getId());
        
      
       // log.info("房间 "+room);

    	return "redirect:/m/list.do";
    }

	

}
