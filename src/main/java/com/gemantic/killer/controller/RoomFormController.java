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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Setting;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.model.User;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.service.SettingService;
import com.gemantic.killer.service.UserService;
import com.gemantic.labs.killer.service.UsersService;


@Controller
@RequestMapping(value = "/m/form/init")
public class RoomFormController {
	@Autowired
    private RoomService roomService;


	
	@Autowired
	private PushClient pushClient;
	
	@Autowired
	private SettingService settingService;
	
	@Autowired	
	private MessageService droolsGameMessageService;
	
	@Autowired
	private CookieUtil cookieUtil;
	
	
	@Autowired
	private UsersService userService;
	

    private static final Log log = LogFactory.getLog(RoomFormController.class);
    
    @InitBinder
    public void initBind(WebDataBinder dataBinder, HttpServletRequest request) {
        String name = dataBinder.getObjectName();
        log.debug("initBind:" + name);

    }

    /**
       * 载入Form
       * @param u 用户ID RequestParam
       * @param groupId 用户分组ID 可以为空
       * @param model
       * @return
     * @throws ServiceDaoException 
     * @throws ServiceException 
       */
    @RequestMapping(method = RequestMethod.GET)
    public String setupForm(Model model, Long id,@RequestParam Long uid) throws Exception {
    	
    	
    	
    	
    	log.debug("HI "+ uid);
    	Room room=new Room();
    	if(id==null){
    		//新房间
    		room.setCreaterID(uid);
    		
    	}else{
    		
    		room=this.roomService.getRoom(id);
    		if(room==null){
    			//不存在这个房间
    			room=new Room();
    		}else{
    			
    		}
    	}
    	model.addAttribute("room", room);
    	model.addAttribute("uid", uid);
        return "/room/form/init";
    	
    }

    /**
     * 处理提交Form数据
     * @param roomForm 表单 
     * @param result 
     * @param status 
     * @param model
     * @return
     */
    //TODO 切换到World
    @RequestMapping(method = RequestMethod.POST)
    public String processSubmit(HttpServletRequest request, HttpServletResponse response,@ModelAttribute
    Room room, BindingResult result, SessionStatus status, Model model) throws Exception {
    	Long uid = cookieUtil.getID(request, response);
		if (uid == null) {
			// 登录不成功,重新登录
			return "redirect:/";
		}
		
    	Long roomID=null;
    	String version=room.getVersion(); 
    	//房间要创建,World也要创建. 但是World的ID和房间的ID要分开.
    	//算了.还是不要Game,只有World吧.
        if (room.getId() == null) {
        	
        	roomID=System.currentTimeMillis();
    		room.setId(roomID);
    		Setting s=room.getSetting();
    		if(s==null){
    			s=settingService.getSetting(version);
    			room.setSetting(s);
    		}
    		s.setRid(roomID);        
        	room.setCreateAt(System.currentTimeMillis());        
        	
        	
        	this.droolsGameMessageService.createRoom(room);       
        
        	User user=userService.getObjectById(room.getCreaterID());
        	room.setExpressions(user.getExpression());
    		this.addRoom(room);//这个时候会出问题.Room已经创建好,别人可以进.可是还没有初始化好.
    		
    
    		
/*
    		RoomThread r=new RoomThread(roomID, roomService, droolsGameMessageService, pushClient);
    		r.start();*/
    		
    		/*RoomMessageThread rm = new RoomMessageThread(roomID, roomService,
    				droolsGameMessageService, pushClient);
    		rm.start();*/
    		
    		
    		
    		
            // 新建组
        	
        } else {
            // 更新组--基本上不会用到这个
        	 
             this.updateRoom(room);
             roomID=room.getId();
        }
        log.debug("roomID is "+ roomID);
       // log.info("房间 "+room);

    	return "redirect:/m/play/enter.do?rid="+roomID+"&uid="+room.getCreaterID();
    }

    /**
     * 更新房间设置
     * @param roomForm
     * @return
     * @throws ServiceDaoException 
     * @throws ServiceException 
     */
    private void updateRoom(Room room) throws ServiceException, ServiceDaoException {          
            roomService.updateRoom(room);
    }

  

    /**
     * 新建房间
     * @param roomForm
     * @return
     * @throws Exception 
     */
    private Long addRoom(Room room) throws Exception { 
    	
    	
    	
    	
            Long id = roomService.createRoom(room); 
            return id;
   

    }



 

}
