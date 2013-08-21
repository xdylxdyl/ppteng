package com.gemantic.killer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gemantic.common.util.http.cookie.CookieUtil;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.util.BombUtil;
import com.gemantic.labs.killer.model.MineTrain;
import com.gemantic.labs.killer.service.MineTrainService;
import com.gemantic.labs.killer.service.UsersService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * 提供游戏房间的创建,删除,玩家列表等功能
 * 
 * @author xdyl
 * 
 */
@Controller
public class MineController {
	private static final Log log = LogFactory.getLog(MineController.class);

	@Autowired
	private UsersService userSevice;

	@Autowired
	private MineTrainService mineTrainService;
	
	
	@Autowired
	private RoomService roomService;

	@Autowired
	private CookieUtil cookieUtil;
	
	

	@Autowired
	private MessageService droolsGameMessageService;

	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mine/train/list")
	public String list(HttpServletRequest request, HttpServletResponse response, ModelMap model, Integer page, Integer size, Long uid, String type) throws Exception {

		
		
		//http://www.duole.com/api/scene/get_all
	   // http://www.duole.com/api/mood/get_all?client=pc
		

		List<Long> ids=this.mineTrainService.getList(0, Integer.MAX_VALUE);
		List<MineTrain> mineTrains=this.mineTrainService.getObjectsByIds(ids);
		
		
		model.addAttribute("trains", mineTrains);

		return "/mine/train/jlist";
	}

	
	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mine/train/generate")
	public String generate(HttpServletRequest request, HttpServletResponse response, ModelMap model, Integer row, Integer column, String systemContent, String userContent) throws Exception {

		
		String newSystemContent=BombUtil.generateSystemContent(row, column, systemContent);
		String newUserContent=BombUtil.generateUserContent(userContent, newSystemContent);
		Integer mine=BombUtil.countMine(systemContent);
		MineTrain train=new MineTrain(row,column,mine,newUserContent,newSystemContent);
		model.addAttribute("train", train);	
		return "/mine/train/jgenerate";
	}
	
	
	
	/**
	 * 游戏准备
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mine/train/preview")
	public String generatePreview(HttpServletRequest request, HttpServletResponse response, ModelMap model, Integer x, Integer y, Long rid) throws Exception {
		Long uid = cookieUtil.getID(request, response);
		if (uid == null) {
			// 登录不成功,重新登录
			return "redirect:/login?code=-6008";
		}
		Room room = this.roomService.getRoom(rid);
		Map<Long, Map<String, Set<String>>> user_info = new HashMap();
		String version = room.getVersion();
		Message queryMessage = new Message(uid.toString(), "query", "-500",
				"#0000FF", "78", rid.toString(), "我查询", version,
				System.currentTimeMillis());	
		String snapshots = this.droolsGameMessageService.getSnapshots(
				queryMessage, room);
		log.info("get snapshot is " + snapshots);
		Gson gson = new GsonBuilder().create();
		Map map = gson.fromJson(snapshots, new TypeToken<Map<String,Object>>() {}.getType());
		log.info(map);

	/*	//1.get preview area
		
	    int divCount = 3;

	    int leftTopX = (x - divCount) < 1 ? 1 : x - divCount;

	    int leftTopY = (y - divCount) < 1 ? 1 : y - divCount;

	    int rightTopX = leftTopX;
	    int rightTopY = (y + divCount) > mineView.setting.column ? mineView.setting.column : y + divCount;

	    int leftBottomX = (x + divCount) > mineView.setting.row ? mineView.setting.row : x + divCount;
	    int leftBottomY = rightTopY;

	    int rightBottomX = leftBottomX;
	    int rightBottomY = rightTopY;

	    int rowCount = leftBottomY - leftTopY;
	    int columnCount = rightTopY - leftTopY;
        log.info(leftTopX + "," + leftTopY + "  -   " + rightTopX + "," + rightTopY + "  -   " + leftBottomX + "," + leftBottomY + "  -   " + rightBottomX + "," + rightBottomY);
*/
		
		/*String newSystemContent=BombUtil.generateSystemContent(row, column, systemContent);
		String newUserContent=BombUtil.generateUserContent(userContent, systemContent);
		Integer mine=BombUtil.countMine(systemContent);
		MineTrain train=new MineTrain(row,column,mine,newUserContent,newSystemContent);
		model.addAttribute("train", train);	*/
		return "/mine/train/jgenerate";
	}

	
	


}
