package com.gemantic.kill.timer;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.common.constant.TimeDateConstant;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.util.MessageUtil;

public class SendMessageTask extends TimerTask {
	
	
	private static final Log log = LogFactory.getLog(SendMessageTask.class);
	
	
	private Timer timer = new Timer();
    private  PushClient pushClient;
    private  MessageService messageService;
    private  Message message;
    private  RoomService roomService;

	@Override
	public void run() {
		try {
			log.info(" run timer "+ message);
			List<Message> msgs=this.messageService.generate(message, roomService.getRoom(Long.valueOf(message.getWhere())));
			log.info(" timer messages "+msgs);
			MessageUtil.sendMessage(message.getVersion(),msgs,this.pushClient);			
			log.info(" send success ");
			
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServiceDaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void start() {
	  log.info(message.getTime()+"start scheduled message "+message);
	   timer.schedule(this, message.getScheduledTime());  // 设置该定时任务MyTimerTask在5s后执行
	   log.info("scheduled time : " + MyTimeUtil.convertLong2String(this.scheduledExecutionTime(), TimeDateConstant.yyyy_MM_dd_HH_mm_ss));   // 打印出定时任务执行时间
	}

	public long getScheduleTime() {
	   return this.scheduledExecutionTime();
	}
	
	
	

	public SendMessageTask(PushClient pushClient,Message message, MessageService messageService,RoomService roomService) {
		super();
		this.pushClient = pushClient;
		this.message=message;	
		this.messageService=messageService;
		this.roomService=roomService;
	}
	
	

	public SendMessageTask() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) {
	/*	SendMessageTask mtt = new SendMessageTask();
		
	   mtt.start();  */
	   
	  log.info(MyTimeUtil.convertLong2String(2710604578704L, TimeDateConstant.yyyy_MM_dd_HH_mm_ss));

	}


	
	

}
