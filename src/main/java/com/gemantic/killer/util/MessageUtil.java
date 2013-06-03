package com.gemantic.killer.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.gemantic.common.exception.ServiceException;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.commons.push.client.impl.HttpPushClientImpl;
import com.gemantic.killer.common.model.Message;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class MessageUtil {

	private static final Log log = LogFactory.getLog(MessageUtil.class);
	private static final Executor exec = Executors.newFixedThreadPool(10);
	public static final String Split_Comma = ",";
	public static final String Split_Space = ",";
	private static final String Replace = "<script type=\"text/javascript\">parseMessage(\"replace\");</script>";
	public static Gson gson = new GsonBuilder().disableHtmlEscaping().create();

	public static Message parse(String version, String action, String content) {

		String[] actions = action.split(MessageUtil.Split_Comma);

		log.info(ArrayUtils.toString(actions));
		String subject = actions[0];
		String predict = actions[1];
		String object = actions[2];
		String color = actions[3];
		int expression = new Integer(actions[4]);
		String where = actions[5];
		Message gm = new Message();
		gm.setColor(color);
		gm.setContent(content);
		gm.setExpression(String.valueOf(expression));
		gm.setObject(object);
		gm.setPredict(predict);
		gm.setSubject(subject);
		gm.setTime(System.currentTimeMillis());
		gm.setVersion(version);
		gm.setWhere(where);
		return gm;

	}

	public static Message parse(String version, String action) {

		String[] actions = action.split(MessageUtil.Split_Comma);

		String subject = actions[0];
		String predict = actions[1];
		String object = actions[2];
		String color = actions[3];
		int expression = new Integer(actions[4]);
		String where = actions[5];
		Message gm = new Message();
		gm.setColor(color);
		gm.setContent(actions[6]);
		gm.setExpression(String.valueOf(expression));
		gm.setObject(object);
		gm.setPredict(predict);
		gm.setSubject(subject);
		gm.setTime(System.currentTimeMillis());
		gm.setVersion(version);
		gm.setWhere(where);
		return gm;

	}

	public static String convert2String(Message m) {
	

		String json = gson.toJson(m);

		/*
		 * Map<String, String> map = new HashMap(); map.put("subject",
		 * m.getSubject()==null?"":m.getSubject().toString());
		 * map.put("predict", m.getPredict()); map.put("object",
		 * m.getObject()==null?"":m.getObject().toString()); map.put("color",
		 * m.getColor()); map.put("expression", m.getExpression());
		 * map.put("where", m.getWhere()==null?"":m.getWhere().toString());
		 * map.put("content", m.getContent());//怎么转义 map.put("time",
		 * m.getTime()==null?"":m.getTime().toString()); map.put("version",
		 * m.getVersion());
		 * 
		 * json= JSONObject.fromObject(map).toString();
		 */

		return json;
	}

	// 我怎么样才能把日志打出来.为什么这一点儿怎么都想不通.我需要同时给八个人发消息.每个人收到的消息肯定是不一样的.有一些权限信息什么的.
	// 该怎么记日志呢.
	public static void sendMessage(final String version, final List<Message> messages,
			final PushClient pushClient) throws ServiceException {
		Runnable task = new Runnable() {
			@Override
			public void run() {
				Long start=System.currentTimeMillis();
						log.info(messages+" version "+version);
				Map<Long, String> uid_content = MessageUtil.groupByAccepts(version,
						messages);
				try {
					pushClient.batchPush(uid_content);
				} catch (ServiceException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				log.info(uid_content.size()+" users use time "+(System.currentTimeMillis()-start));
				
			};
		};
		exec.execute(task);	

	


	}

	public static Map<Long, String> groupByAccepts(String version,
			List<Message> messages) {
		log.info(version+" of messages "+messages.size());
		Map<Long, String> uid_content = new HashMap();
		Map<String, List<Message>> uid_msgs = new HashMap();
		for (Message m : messages) {
			List<String> uids = m.getAccepts();
			//m.setContent( org.json.JSONObject.quote(m.getContent()));
			for (String uid : uids) {
				List<Message> msgs = uid_msgs.get(uid);
				if (msgs == null) {
					msgs = new ArrayList();

				}
				msgs.add(m);
				uid_msgs.put(uid, msgs);
			}

		}
		for (String uid : uid_msgs.keySet()) {
			List<Message> message = uid_msgs.get(uid);
			String content = MessageUtil.converts2String(version,message);
			uid_content.put(Long.valueOf(uid), content);

		}

		return uid_content;
	}

	public static String converts2String(String version, List<Message> message) {
	
		Map<String, Object> m = new HashMap();
		m.put("version", version);
		m.put("message", message);

		return gson.toJson(m);

	}

	//特殊字条转义的时候会报错怎么办.
	public static String replace(String content) {
		// parent.parseMessage
		String rcnt=content.replace("$", "\\$");		
		String str = "<script type='text/javascript'>document.domain='gemantic.com';parent.parseMessage('replace');</script>"
				.replaceAll("replace", rcnt);
		return str;

	}

	public static List<String> getSubjectByPredict(List<Message> msgs,
			String predict) {
		List<String> subjects = new ArrayList();
		for (Message msg : msgs) {
			if (predict.equals(msg.getPredict())) {
				subjects.add(msg.getSubject());
			}

		}
		log.info(predict + " get " + subjects);
		return subjects;
	};

	/**
	 * Clone一份List,从Clone的数据中删除掉Message
	 * 
	 * @param msgs
	 * @param predict
	 * @return
	 */
	public static List<Message> removeMessage(List<Message> msgs,
			List<Message> removes) {
		List<Message> ms = new ArrayList<Message>();
		for (Message msg : msgs) {
			for (Message rmv : removes) {
				if (rmv.equals(msg)) {

				} else {
					ms.add(msg);
				}
			}
		}

		return ms;
	};

	public static List<Message> getMessagesByPredict(List<Message> msgs,
			String predict) {
		List<Message> ms = new ArrayList();
		for (Message msg : msgs) {
			if (predict.equals(msg.getPredict())) {
				ms.add(msg);
			}

		}

		return ms;
	};

	public static List<Message> getMessagesByFields(List<Message> msgs,
			Map<Field, String> fields) throws IllegalArgumentException,
			IllegalAccessException {
		List<Message> ms = new ArrayList<Message>();
		for (Message msg : msgs) {
			boolean match = true;
			for (Field field : fields.keySet()) {
				String value = fields.get(field);
				field.setAccessible(true);
				if (value.equals(String.valueOf(field.get(msg)))) {

				} else {
					match = false;
					break;
				}

			}
			if (match) {
				ms.add(msg);

			}
		}

		return ms;
	}

	public static String convertMessages2String(List<Message> messages) {

	
		return gson.toJson(messages);

	}

	public static void main(String[] args) throws ServiceException {


		
	    Message m = new Message();
		m.setContent("\"<");
		log.info(MessageUtil.escape(m.getContent()));
		m.getAccepts().add("3");
		String json = MessageUtil.convert2String(m);
		log.info(json);
		Gson gson = new GsonBuilder().disableHtmlEscaping().create();
		Message obj2 = gson.fromJson(json, Message.class);
		log.info(obj2);

		List ls = new ArrayList();
		ls.add(m);
		String j = MessageUtil.convertMessages2String(ls);
		log.info(j);

		Map<Long, String> k = MessageUtil.groupByAccepts("", ls);
		log.info(k);
		
	
		
		
		HttpPushClientImpl h=new HttpPushClientImpl();
		h.setServerUri("42.121.113.70");
		h.setPath("/batchChannel");
		h.setPort(8000);	
	/*	Map<Long,String> maps=new HashMap();
		maps.put(3L, "中国");
		maps.put(4L, "玛玛玛玛玛玛玛玛");
		String s=h.batchPush(maps);
		System.out.println(s);*/
		MessageUtil.sendMessage("", ls, h);
		
		
		
		
	}
	
	public static String escape(String s){ 
        if(s==null) 
                return null; 
        StringBuffer sb=new StringBuffer(); 
        for(int i=0;i<s.length();i++){ 
                char ch=s.charAt(i); 
                switch(ch){ 
                case '"': 
                	    sb.append("\\\\"); 
                        sb.append("\\\"");
                        
                        break; 
                case '\\': 
                	sb.append("\\\\"); 
                        sb.append("\\\\"); 
                       
                        break; 
                case '\b': 
                	sb.append("\\\\"); 
                        sb.append("\\b"); 
                     
                        break; 
                case '\f': 
                	sb.append("\\\\"); 
                        sb.append("\\f"); 
                       ; 
                        break; 
                case '\n': 
                	sb.append("\\\\"); 
                        sb.append("\\n"); 
                    ; 
                        break; 
                case '\r': 
                	sb.append("\\\\"); 
                        sb.append("\\r"); 
                         
                        break; 
                case '\t': 
                	sb.append("\\\\"); 
                        sb.append("\\t"); 
                       
                        break; 
                case '/': 
                	sb.append("\\\\"); 
                        sb.append("\\/"); 
                      
                        break; 
                default: 
                       /* if(ch>='\u0000' && ch<='\u001F'){ 
                                String ss=Integer.toHexString(ch);                                 
                                sb.append("\\u"); 
                                for(int k=0;k<4-ss.length();k++){ 
                                        sb.append('0'); 
                                } 
                                sb.append(ss.toUpperCase()); 
                        } 
                        else{ 
                                sb.append(ch); 
                        } */
                        sb.append(ch);
                } 
        }//for 
        return sb.toString(); 
}

	public static Message fromString(String line) {
	
		Message obj2 = gson.fromJson(line, Message.class);
		return obj2;
	} 
	
	public static List<Message> fromStrings(String line){
	
		List<Message> messages = gson.fromJson(line, new TypeToken< List<Message>>() {}.getType());
		return messages;
	}

}
