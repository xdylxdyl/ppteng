package com.gemantic.killer.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.RoomService;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能 
 * @author xdyl
 *
 */
@Controller
public class GameController {
    private static final Log log = LogFactory.getLog(GameController.class);
	private RoomService roomService;

	
    /**
     * 游戏准备
     * @param request
     * @param response
     * @param model
     * @return
     * @throws Exception 
     */
    @RequestMapping(value = "/index")
    public String index(HttpServletRequest request, HttpServletResponse response, ModelMap model,Integer code
         ) throws Exception {
    	  	
    	if(code==null){
    		code=0;
    	}
    	log.info("======================");
    	model.addAttribute("code", code);
        return "/room/index/index";
    }

	
    
    /**
     * 游戏准备
     * @param request
     * @param response
     * @param model
     * @return
     * @throws Exception 
     */
    @RequestMapping(value = "/game/ready")
    public String createQuestion(HttpServletRequest request, HttpServletResponse response, ModelMap model,
            @RequestParam Long roomID) throws Exception {
    	log.debug("start get room list ");
    	
    	List<Room> rooms=roomService.getList();    	
    	model.addAttribute("rooms", rooms);
        return "/room/player/list";
    }

   
    	
    	/**
         * 游戏开始
         * @param request
         * @param response
         * @param model
         * @return
         * @throws Exception 
         */
        @RequestMapping(value = "/game/start")
        public String createRoom(HttpServletRequest request, HttpServletResponse response, ModelMap model,
                String name) throws Exception {
        	log.debug("HI");
        	model.addAttribute("name", name);

            return "/game/room/show";
        }
    
    
}
