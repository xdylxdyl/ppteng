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

public class DirectlySendMessageTask extends TimerTask {
	
	
	private static final Log log = LogFactory.getLog(DirectlySendMessageTask.class);
	
	
	private Timer timer = new Timer();
    private  PushClient pushClient;  
    private  List<Message> messages;
    private  Long time;
    private  String version;
    private List<String> accepts=new ArrayList();

	@Override
	public void run() {	
			log.info(" run timer "+ messages);		
		    for(Message m:messages){		    	
		    	m.setAccepts(accepts);
		    }		
			try {
				MessageUtil.sendMessage(version,messages,this.pushClient);
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
	
	
	

	public DirectlySendMessageTask(PushClient pushClient,List<Message> messages,String version,Long time,List<String> accepts) {
		super();
		this.pushClient = pushClient;
		this.version=version;
		this.messages=messages;
		this.time=time;
		this.accepts=accepts;
	}
	
	

	public DirectlySendMessageTask() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) {
		DirectlySendMessageTask mtt = new DirectlySendMessageTask();
		
	   mtt.start();  

	}


	
	

}
