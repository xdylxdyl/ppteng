package com.gemantic.kill.timer;

import java.util.Timer;
import java.util.TimerTask;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.common.exception.ServiceException;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.GameMessage;

public class SendGameMessageTask extends TimerTask {
	
	
	private static final Log log = LogFactory.getLog(SendGameMessageTask.class);
	
	private int index = 0;
	private Timer timer = new Timer();
    private  PushClient pushClient;
    private  GameMessage gameMessage;
      

	@Override
	public void run() {
		try {
			log.info(" run timer "+ gameMessage);
			pushClient.push(gameMessage.getAccepts(), gameMessage.toAction());
			log.info(" success timer "+ gameMessage);
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void start() {
	   timer.schedule(this, gameMessage.getTime());  // 设置该定时任务MyTimerTask在5s后执行
	   log.info("scheduled time : " + this.scheduledExecutionTime());   // 打印出定时任务执行时间.
	}

	public long getScheduleTime() {
	   return this.scheduledExecutionTime();
	}
	
	
	

	public SendGameMessageTask(PushClient pushClient,GameMessage gameMessage) {
		super();
		this.pushClient = pushClient;
		this.gameMessage=gameMessage;
	}

	public SendGameMessageTask() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) {
		SendGameMessageTask mtt = new SendGameMessageTask();  
	   mtt.start();  

	}


	
	

}
