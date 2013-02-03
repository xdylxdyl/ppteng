package com.gemantic.analyse.chatroom.rf;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.util.CollectionUtils;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.FileUtil;
import com.gemantic.commons.push.client.PushClient;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.Record;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RecordService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.util.BombUtil;
import com.gemantic.killer.util.MessageUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class BombTest {

	private static final Log log = LogFactory.getLog(BombTest.class);
	public static final Integer Create = 0;

	private MessageService droolsGameMessageService;

	private RoomService roomService;

	private ConfigurableApplicationContext context;
	
	private PushClient pushClient;
	
	private RecordService recordService;

	//@Before
	public void init() throws ServiceException, ServiceDaoException {
		log.info("sprint load");
		context = new ClassPathXmlApplicationContext(
				"classpath:applicationContext*.xml");
		droolsGameMessageService = (MessageService) context
				.getBean("messageServiceSingleDroolsImpl");
		roomService = (RoomService) context.getBean("roomServiceImpl");
		pushClient=(PushClient)context.getBean("pushClient");
		
		recordService=(RecordService) context.getBean("recordServiceImple");
		
		
	}

	//@After
	public void destory() {
		context.close();
		log.info(" how to destory ");

	}
	//@Test
	public void testClient() throws ServiceException{
		
		
		Message m = new Message();
		m.setContent("2222222222");
		log.info(MessageUtil.escape(m.getContent()));
		m.getAccepts().add("3");
		String json = MessageUtil.convert2String(m);
		log.info(json);	

		List ls = new ArrayList();
		ls.add(m);
		String j = MessageUtil.convertMessages2String(ls);
		log.info(j);

		Map<Long, String> k = MessageUtil.groupByAccepts("", ls);
		
		Map<Long,String> maps=new HashMap();
		maps.put(3L, "中国");
		maps.put(4L, "玛玛玛玛玛玛玛玛");
		pushClient.batchPush(maps);
		log.info("=============================");
		List l=new ArrayList();
		l.add(3L);
		pushClient.push(l, j);
		log.info("=============================");
		
		MessageUtil.sendMessage("", ls, pushClient);
	}

	@Test
	public void testBombAssign() {

		List<Pair> pairs = BombUtil.getRoundPanes(Pair.of(4, 9), 9, 9);
		log.info(pairs);

		log.info(BombUtil.convertPair2String(Pair.of(3, 1)));

		// 1.生成一个系统的雷图
		String systemBombPic = BombUtil.assign(9, 9, 10);
		log.info(systemBombPic);
		systemBombPic="13*2*5*2**212210011112*1*322*22*112*";		               
		log.info(BombUtil.clickOpen(Pair.of(1, 1), systemBombPic, 9, 9));
		List<String> pic = BombUtil.printPic(systemBombPic, 9, 4);
		for (String line : pic) {
			log.info(line);
		}

		// 4.用户双击一个区域,自动打开周围所有的模块.

	}

	// @Test
	public void testSweepMine() throws Exception {

		List<String> messages = FileUtil
				.readFileAsList("src/test/resources/mine.txt");
		List<Message> ms = new ArrayList();

		Long rid = null;
		Room room = null;
		for (String message : messages) {
			if (message.startsWith("#")) {
				continue;
			}
			Message m = MessageUtil.parse("mine_1.0", message);
			m.setId(RandomUtils.nextLong());
			if (rid == null) {
				room = new Room();
				room.setId(System.currentTimeMillis());
				room.setVersion(m.getVersion());
				this.roomService.createRoom(room);
				rid = room.getId();
			} else {

				room = this.roomService.getRoom(rid);
			}
			log.info("start process use method of service  ========================= "
					+ message);

			List<Message> ls = droolsGameMessageService.generate(m, room);
			log.info(ls);

		}

		Thread.sleep(6000L);

	}

	//@Test
	public void testContact() throws IOException {

		List<String> ls = FileUtil.readFileAsList("D:/data/contact.txt");
		Map<String, List<String>> groups = new HashMap();
		Map<String, String> name_phone = new HashMap();
		String groupName = "";
		String name = "";
		String phone = "";
		for (String line : ls) {
			
			
			try {
				if(StringUtils.isBlank(line.trim())){
					continue;
				}
				String[] cns = line.split(",");
				if(cns.length<1){
					continue;
				}
				if (cns[0].contains("组") || cns[0].contains("部")) {
					groupName = cns[0].trim();
					if (StringUtils.isBlank(groupName)) {
						
						continue;

					} else {
						
					}
					name = cns[1].trim();
					if (StringUtils.isBlank(name)) {
						
						continue;

					} else {
					
					}

					phone = cns[2].trim();

				} else {
					name = cns[1].trim();
					
					if (StringUtils.isBlank(name)) {
						continue;
					} else {
						
					}
					
					if(cns.length>=3){
						phone = cns[2].trim();
					}else{
						phone="";
					}
					

				}
				List<String> members = groups.get(groupName);
				if (CollectionUtils.isEmpty(members)) {
					members = new ArrayList();
				} else {

				}
				members.add(name);
				groups.put(groupName, members);
				name_phone.put(name, phone);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				log.error(line);
			}

		}
		Gson gson = new GsonBuilder().create();

		String group = "var group_member =" + gson.toJson(groups);
		String detail = "var contacts =" + gson.toJson(name_phone);
		FileUtil.writeFile("D:/data/contact.js", false, group);
		FileUtil.writeFile("D:/data/contact.js", true, detail);
		log.info(gson.toJson(groups));
		log.info(gson.toJson(name_phone));

	}
	
	//@Test
	public void testRecord() throws ServiceException, ServiceDaoException{
		
	Record record=new Record(3L);
		record.setPath("222");
		Room r=new Room();

		//r.setCreateAt(System.currentTimeMillis());
		r.setPlayers(Arrays.asList(new Long[]{3L,5L}));
		r.setExpressions(Arrays.asList(new String[]{"3","4444"}));
		record.setRoom(r);
		//this.recordService.addRecord(record);
		
		
		
/*		Record record=this.recordService.getRecord(3L);
		record.setRoom(new Room());
		this.recordService.addRecord(record);*/
		
		List<Record> ls=this.recordService.getList(null, null);
		log.info(ls);
		
	}

}
