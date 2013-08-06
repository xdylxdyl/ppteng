package com.gemantic.killer.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.drools.runtime.rule.FactHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.common.model.Operater;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.model.User;
import com.gemantic.killer.service.MemberService;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.MineStatisticsService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.service.RoomTimerService;
import com.gemantic.killer.service.SessionService;
import com.gemantic.killer.util.MessageUtil;
import com.gemantic.killer.util.RoomUtil;
import com.gemantic.labs.killer.model.MineStatistics;
import com.gemantic.labs.killer.model.Records;
import com.gemantic.labs.killer.model.UserRecord;
import com.gemantic.labs.killer.service.RecordService;
import com.gemantic.labs.killer.service.UserRecordService;
import com.gemantic.labs.killer.service.UsersService;

//这段代码有点乱.有时间整理一下.
//太多需要重构的地方了.判断是哪一个Process启动.不应该通过配置文件.而是应该通过游戏房间的状态.
//用户名什么时候应该传进去.Snapshot应该如何处理.
@Component
public class MessageServiceSingleDroolsImpl implements MessageService {

	private static final Log log = LogFactory
			.getLog(MessageServiceSingleDroolsImpl.class);

	private static final Log recordLog = LogFactory.getLog("gameRecord");

	@Autowired
	private RoomTimerService roomTimerSevice;
	@Autowired
	private SessionService sessionService;

	@Autowired
	private UsersService userService;

	@Autowired
	private RoomService roomService;

	@Autowired
	private RecordService recordService;

	@Autowired
	private UserRecordService userRecordService;

	@Autowired
	private MineStatisticsService mineStatisticService;

	@Autowired
	private PushClient pushClient;
	@Autowired
	private MemberService memberService;

	@Resource(name = "roomAction")
	private Set<String> roomAction = new HashSet();

	public List<Message> generate(Message message, Room room)
			throws ServiceException, ServiceDaoException {
		// 根据不同的房间ID创建不同的Session.这样怎么能支持扩展性呢.Session能否序列化.除非支持按房间分布Service的Session.

		Long start = System.currentTimeMillis();
		Operater operater = new Operater(message);
		try {
			process(operater, room);
		} catch (Throwable t) {
			t.printStackTrace();
			log.error(t);
			log.error("error room is " + room + " message is " + message);
			log.info("because room error so retract room ");
			roomService.removeRoom(room.getId());

		}
		// 应该是开始游戏之后才记录.

		if (CollectionUtils.isEmpty(operater.getTimerMessages())) {

			// log.info(message.getId() + " not have time ");

		} else {
			log.info(message.getId() + " have time "
					+ operater.getTimerMessages());
			roomTimerSevice.nextMessages(operater.getTimerMessages());
		}
		// 怎么对顺序排序
		/*
		 * log.info(message.getId() + " user time is " +
		 * (System.currentTimeMillis() - start));
		 */

		// log.info(operater.getNextMessages());
		return operater.getNextMessages();

	}

	private Operater process(Operater operater, Room r)
			throws ServiceException, ServiceDaoException {

		Long roomID = Long.valueOf(operater.getMessage().getWhere());
		// 大爷的.这个时候还没有Room
		// log.info(operater +
		// " =========== start,room  ======================== " + r);
		Long start = System.currentTimeMillis();
		StatefulKnowledgeSession ksession = sessionService.getSesseion(operater
				.getMessage());

		FactHandle fo = ksession.insert(operater);

		// log.info(operater + " =========== after insert");
		FactHandle fm = ksession.insert(operater.getMessage());
		if (IsRoomMessage(operater.getMessage(), r)) {
			// log.info("room operator " + operater.getMessage());
			ksession.startProcess("room");
		} else {
			// log.info("game operator " + operater.getMessage());
			ksession.startProcess("game");
		}

		ksession.fireAllRules();
		ksession.retract(fo);
		ksession.retract(fm);

		// 什么时候关闭Session呢.规则里触发游戏结束的事件.

		// log.info(" use time " + (System.currentTimeMillis() - start));
		// log.info(operater + " =========== over");
		List<Message> messages = new ArrayList();
		messages = operater.getNextMessages();

		if (operater.getGameStart()) {
			// 创建的时候不会更新.因为创建的时候不会是Start
			// log.info("game start");//
			// 主要是在Session里.愁死我了.Gameover的时候不能把Session给Remove了.
			r.setStartAt(System.currentTimeMillis());

			r.setStatus(Room.status_start);
			r.setPlayers(operater.getPlayers());
			
			this.roomService.updateRoom(r);

		}

		Long prevStart = r.getStartAt();
		Long end = System.currentTimeMillis();
		Long time = end - prevStart;

		if (operater.getGameOver()) {

			log.info("game over " + operater.getRecordID());// 主要是在Session里.愁死我了.Gameover的时候不能把Session给Remove了.

			this.roomTimerSevice.removeRoomTimer(Long.valueOf(operater
					.getMessage().getWhere()));
			operater.getTimerMessages().clear();

			r.setStartAt(System.currentTimeMillis() * 2);// 设置游戏的开始时间远远大于现在.
			r.setStatus(Room.status_wait);

			this.roomService.updateRoom(r);
			// 从哪知道游戏里的玩家呢...

			boolean isSaveRecord = this.isSaveRecord(r, time, messages);
			if (isSaveRecord) {
				// 六人局才发钱和超过三分钟才给钱存战例

				Map<Long, Integer> m = operater.getMoney();
				log.info("mone is " + m);
				for (Long uid : r.getPlayers()) {

					User u = this.userService.getObjectById(uid);
					this.giveMoney(u, r, m);

					this.userService.update(u);

				}

				// 更新战例记录
				Records record = new Records();
				record.setId(operater.getRecordID());
				record.setPath("record/" + operater.getRecordID() + ".txt");
				record.setTime(time);
				record.setRoom(r);
				record.setVersion(r.getVersion());

				List<Long> ls = r.getPlayers();
				List<User> users = this.userService.getObjectsByIds(ls);
				Map<Long, String> uid_names = new HashMap();
				for (User user : users) {
					uid_names.put(user.getId(), user.getName());
				}
				record.setUid_names(uid_names);
				Long rid = this.recordService.insert(record);

				// 更新玩家的战例记录

				for (Long uid : r.getPlayers()) {

					UserRecord ur = new UserRecord();
					ur.setRid(rid);
					ur.setRecordAt(System.currentTimeMillis());
					ur.setUid(uid);
					ur.setVersion(r.getVersion());
					String settingVersion = RoomUtil.getMIneSettingVersion(r);
					if (StringUtils.isNotBlank(settingVersion)) {

						MineStatistics mineStatistics = new MineStatistics();
						mineStatistics.setRid(rid);
						mineStatistics.setUid(uid);

						mineStatistics.setSetting(settingVersion);
						mineStatistics.setTime(time);
						this.mineStatisticService.insert(mineStatistics);
					} else {

					}
					this.userRecordService.insert(ur);

				}

			} else {
				// 扫雷输了。就扣钱。扣其他的人钱的总数
				if (r.getVersion().contains("mine")) {

					String settingVersion = RoomUtil.getMIneSettingVersion(r);
					if (StringUtils.isNotBlank(settingVersion)) {
						for (Message m : messages) {
							if ("wrong".equals(m.getPredict())) {
								Integer i = 0;
								Long wuid = Long.valueOf(m.getSubject());
								Map<Long, Integer> money = operater.getMoney();
								log.info("mone is " + money);
								for (Long uid : money.keySet()) {

									i = i + money.get(uid);

								}
								User wuser = this.userService
										.getObjectById(wuid);
								wuser.setMoney(wuser.getMoney() - i);
								this.userService.update(wuser);

							}
						}
					} else {

					}

				}

			}

		}

		// 开始之后就没有了计房间的状态了.

		// log.info(roomID + " room is  empty ?  " + operater.getRoomEmpty());

		if (operater.getRoomEmpty()) {
			log.info("room empty ");

			this.roomService.removeRoom(roomID);
			this.sessionService.removeSession(operater.getMessage());
			// log.info("room over ===================" + r);

		}

		return operater;
	}

	private void giveMoney(User u, Room r, Map<Long, Integer> m) {
		if (r.getVersion().contains("mine")) {
			String settingVersion = RoomUtil.getMIneSettingVersion(r);
			if (StringUtils.isNotBlank(settingVersion)) {

				u.setMoney(u.getMoney() + m.get(u.getId()) * 10);//

			} else {

			}

		} else {
			u.setMoney(u.getMoney() + 1000);//
		}

	}

	private boolean isSaveRecord(Room r, Long time, List<Message> messages) {
		String version = r.getVersion();

		if (version.contains("kill")) {
			// 杀人游戏6人三分钟
			if (r.getPlayers().size() >= 6 && time > 3 * 60 * 1000) {
				return true;
			}

		}

		if (version.contains("ghost")) {
			// 捉鬼游戏 四人 三分钟
			if (r.getPlayers().size() >= 4 && time > 3 * 60 * 1000) {
				return true;
			}

		}

		if (version.contains("mine")) {
			
			String level=r.getSetting().getSetting().get("mineLevel");
			if("level6"!=level){
				for (Message m : messages) {
					if (("over".equals(m.getPredict()))
							&& ("win".equals(m.getObject()))) {
						return true;
					}
				}
			}else{
				//训练模式下没有金币
				
			}
			

		}

		return false;
	}

	private boolean IsRoomMessage(Message message, Room r) {

		
		if ("video_1.0".equals(r.getVersion())) {
			return true;
		}

		if ((Room.status_start == r.getStatus() || "start".equals(message
				.getPredict()))) {
			return false;
		} else {
			return true;

		}

		/*
		 * String predict = message.getPredict();
		 * 
		 * if (predict.equals("query") && !gameOver) { //
		 * 如果是查询,而且游戏又没有进行完.走的Game规则的查询接口. return false;
		 * 
		 * }
		 * 
		 * return this.roomAction.contains(message.getPredict());
		 */
	}

	public Set<String> getRoomAction() {
		return roomAction;
	}

	public void setRoomAction(Set<String> roomAction) {
		this.roomAction = roomAction;
	}

	@Override
	public String getSnapshots(Message queryMessage, Room room)
			throws ServiceException, ServiceDaoException {
		Operater operator = new Operater(queryMessage);
		// 这儿还是会是空的
		process(operator, room);

		return operator.getSnapshots();
	}

	@Override
	public List<Message> createRoom(Room room) throws ServiceException,
			ServiceDaoException {
		Message createMessage = MessageUtil
				.parse(room.getVersion(), room.getCreaterID()
						+ ",create,-500,1000000,78," + room.getId(), "我创建了房间");

		Operater operator = new Operater(createMessage);
		operator.setSetting(room.getSetting());
		process(operator, room);

		if (CollectionUtils.isEmpty(operator.getTimerMessages())) {

		} else {
			roomTimerSevice.nextMessages(operator.getTimerMessages());
		}

		return operator.getNextMessages();

	}

	@Override
	public List<Message> updateSetting(Room room) throws ServiceException,
			ServiceDaoException {
		Message createMessage = MessageUtil.parse(
				room.getVersion(),
				room.getCreaterID() + ",setting,update,1000000,78,"
						+ room.getId(), "");

		Operater operator = new Operater(createMessage);
		operator.setSetting(room.getSetting());
		process(operator, room);
		// 怎么对顺序排序

		return operator.getNextMessages();

	}

	@Override
	public void sendMessage(Message message) throws ServiceException,
			ServiceDaoException {

		Room r = this.roomService.getRoom(Long.valueOf(message.getWhere()));
		if(r==null){
			return;
		}
		//log.info("get room is "+r);
		List<Message> messages = this.generate(message, r);

		MessageUtil.sendMessage(r.getVersion(), messages, this.pushClient);
		
		//log.info(messages);

		if ("logout".equals(message.getPredict())) {
			this.memberService.userLogOut(Long.valueOf(message.getWhere()),
					Long.valueOf(message.getSubject()));

		}

	}

}
