package com.gemantic.kill.timer;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.util.MessageUtil;

public class DirectlySendStringTask extends TimerTask {
	
	
	private static final Log log = LogFactory.getLog(DirectlySendStringTask.class);
	
	
	private Timer timer = new Timer();
    private  PushClient pushClient;  
    private  String content;
    private  Long time;
    private  String version;
    private List<Long> accepts=new ArrayList();

	@Override
	public void run() {	
			log.info(accepts+" run timer "+ content);		
			try {
				pushClient.push(accepts, content);
			} catch (ServiceException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
			
			log.info(" send success ");
		
	}

	public void start() {
	
	   timer.schedule(this, time);  // 设置该定时任务MyTimerTask在5s后执行
	   log.info("scheduled time : " + this.scheduledExecutionTime());   // 打印出定时任务执行时间
	}

	public long getScheduleTime() {
	   return this.scheduledExecutionTime();
	}
	
	
	

	public DirectlySendStringTask(PushClient pushClient,String content,String version,Long time,List<Long> accepts) {
		super();
		this.pushClient = pushClient;
		this.version=version;		
		this.time=time;
		this.accepts=accepts;
		this.content=content;
	}
	
	

	public DirectlySendStringTask() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) {
		DirectlySendStringTask mtt = new DirectlySendStringTask();
		
	   mtt.start();  

	}


	
	

}
