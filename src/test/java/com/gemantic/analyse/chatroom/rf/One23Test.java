package com.gemantic.analyse.chatroom.rf;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;



import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.drools.KnowledgeBase;
import org.drools.KnowledgeBaseFactory;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.gemantic.analyse.chatroom.test.City;
import com.gemantic.analyse.chatroom.test.Districts;
import com.gemantic.analyse.chatroom.test.Privance;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.FileUtil;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.Room;
import com.gemantic.killer.service.MessageService;
import com.gemantic.killer.service.RoomService;
import com.gemantic.killer.util.MessageUtil;

public class One23Test {

	private static final Log log = LogFactory.getLog(One23Test.class);
	public static final Integer Create = 0;

	private MessageService droolsGameMessageService;

	private RoomService roomService;
	private ConfigurableApplicationContext context;

	@Before
	public void init() throws ServiceException, ServiceDaoException {
		context = new ClassPathXmlApplicationContext("classpath:applicationContext*.xml");
		droolsGameMessageService = (MessageService) context.getBean("messageServiceSingleDroolsImpl");
		roomService = (RoomService) context.getBean("roomServiceImpl");
	}

	@After
	public void destory() {
		context.close();
		log.info(" how to destory ");

	}

	//@Test
	public void testSort() {
		List ls = new ArrayList();

		Map<String, String> ids_role = new HashMap();

		Map<String, Integer> role_count = new HashMap();
		role_count.put("killer", 1);
		role_count.put("water", 7);

		int wrongCount = 0;

		List<Integer> list = new ArrayList<Integer>();
		for (int i = 0; i < 10; i++)
			list.add(new Integer(i));
		System.out.println("打乱前:");
		System.out.println(list);

		for (int i = 0; i < 5; i++) {
			System.out.println("第" + i + "次打乱：");
			Collections.shuffle(list);
			System.out.println(list);
		}

	}

	private Map<String, String> assingRole(Map<String, Integer> role_count, List<String> ls) {

		Map<String, String> results = new HashMap();
		Collections.shuffle(ls);
		int uidIndex = 0;
		for (String role : role_count.keySet()) {

			int count = role_count.get(role);
			for (int j = 0; j == count; j++) {
				results.put(ls.get(uidIndex), role);
			}

		}

		return results;
	}

	@Ignore
	@Test
	public void testRF() throws InterruptedException {
		StringUtils.isBlank("");
		final KnowledgeBuilder kbuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();
		kbuilder.add(ResourceFactory.newClassPathResource("test.drl"), ResourceType.DRL);

		Long start = System.currentTimeMillis();
		log.info("start ");
		final KnowledgeBase kbase = KnowledgeBaseFactory.newKnowledgeBase();
		log.info(" new knowledge " + (System.currentTimeMillis() - start));
		kbase.addKnowledgePackages(kbuilder.getKnowledgePackages());
		log.info(" add knowledge " + (System.currentTimeMillis() - start));
		final StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		log.info(" session knowledge ========" + (System.currentTimeMillis() - start));
		// KnowledgeRuntimeLogger logger =
		// KnowledgeRuntimeLoggerFactory.newFileLogger(ksession,
		// "log/numberguess");

		Message m = new Message();
		m.setPredict("go");

		// ksession.insert(r2);
		ksession.insert(m);
		ksession.getAgenda().getAgendaGroup("add").setFocus();
		ksession.fireAllRules();

		/*
		 * Message m2=new Message(); m2.setPredict("go"); ksession.insert(m2);
		 * ksession.fireAllRules();
		 */

		Thread.sleep(5000L);
		log.info(" session knowledge " + (System.currentTimeMillis() - start));
		// logger.close();

		ksession.dispose();

	}

	@Ignore
	@Test
	public void testSimpleRF() throws InterruptedException {

		final KnowledgeBuilder kbuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();
		kbuilder.add(ResourceFactory.newClassPathResource("simple_room.drl"), ResourceType.DRL);
		kbuilder.add(ResourceFactory.newClassPathResource("simple_room.rf"), ResourceType.DRF);

		Long start = System.currentTimeMillis();
		log.info("start ");
		final KnowledgeBase kbase = KnowledgeBaseFactory.newKnowledgeBase();
		log.info(" new knowledge " + (System.currentTimeMillis() - start));
		kbase.addKnowledgePackages(kbuilder.getKnowledgePackages());
		log.info(" add knowledge " + (System.currentTimeMillis() - start));
		final StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		log.info(" session knowledge " + (System.currentTimeMillis() - start));
		// KnowledgeRuntimeLogger logger =
		// KnowledgeRuntimeLoggerFactory.newFileLogger(ksession,
		// "log/numberguess");

		ksession.startProcess("simple");
		ksession.fireAllRules();
		log.info(" session knowledge " + (System.currentTimeMillis() - start));
		// logger.close();
		Thread.sleep(5000L);
		log.info("sleep over ");
		ksession.dispose();

	}

	// @Test
	public void testTimerDemo() throws InterruptedException {

		final KnowledgeBuilder kbuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();

		kbuilder.add(ResourceFactory.newClassPathResource("TimeDemo.rf"), ResourceType.DRF);

		Long start = System.currentTimeMillis();
		log.info("start ");
		final KnowledgeBase kbase = KnowledgeBaseFactory.newKnowledgeBase();
		log.info(" new knowledge " + (System.currentTimeMillis() - start));
		kbase.addKnowledgePackages(kbuilder.getKnowledgePackages());
		log.info(" add knowledge " + (System.currentTimeMillis() - start));
		final StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		log.info(" session knowledge " + (System.currentTimeMillis() - start));
		// KnowledgeRuntimeLogger logger =
		// KnowledgeRuntimeLoggerFactory.newFileLogger(ksession,
		// "log/numberguess");

		ksession.startProcess("time");
		ksession.fireAllRules();
		log.info(" session knowledge " + (System.currentTimeMillis() - start));
		// logger.close();
		// Thread.sleep(5000L);
		log.info("sleep over ");
		ksession.dispose();

	}

	// @Test
	public void testSimleDemo() throws InterruptedException {

		final KnowledgeBuilder kbuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();

		kbuilder.add(ResourceFactory.newClassPathResource("simple_room.drl"), ResourceType.DRL);
		kbuilder.add(ResourceFactory.newClassPathResource("simple_room.rf"), ResourceType.DRF);

		Long start = System.currentTimeMillis();
		log.info("start ");
		final KnowledgeBase kbase = KnowledgeBaseFactory.newKnowledgeBase();
		log.info(" new knowledge " + (System.currentTimeMillis() - start));
		kbase.addKnowledgePackages(kbuilder.getKnowledgePackages());
		log.info(" add knowledge " + (System.currentTimeMillis() - start));
		final StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		log.info(" session knowledge " + (System.currentTimeMillis() - start));
		// KnowledgeRuntimeLogger logger =
		// KnowledgeRuntimeLoggerFactory.newFileLogger(ksession,
		// "log/numberguess");

		ksession.startProcess("time");
		ksession.fireAllRules();
		log.info(" session knowledge " + (System.currentTimeMillis() - start));
		// logger.close();
		// Thread.sleep(15000L);
		log.info("sleep over ");
		ksession.dispose();

	}

	//@Test
	public void testMessage() throws IOException, ServiceException, ServiceDaoException, InterruptedException {

		final KnowledgeBuilder kbuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();
		log.info("ffffffffffffffffffffffffl");
		/*
		 * kbuilder.add( ResourceFactory.newClassPathResource(
		 * "common/model/room_model.drl"),ResourceType.DRL); kbuilder.add(
		 * ResourceFactory.newClassPathResource(
		 * "common/query/room_query.drl"),ResourceType.DRL); kbuilder.add(
		 * ResourceFactory.newClassPathResource(
		 * "common/util/room_util.drl"),ResourceType.DRL ); kbuilder.add(
		 * ResourceFactory.newClassPathResource(
		 * "common/rule/room_rule.drl"),ResourceType.DRL ); kbuilder.add(
		 * ResourceFactory.newClassPathResource(
		 * "common/workflow/room_workflow.rf"),ResourceType.DRF );
		 */
		if (kbuilder.hasErrors()) {
			log.info(kbuilder.getErrors());
		}

		Long start = System.currentTimeMillis();
		log.info("start ");
		final KnowledgeBase kbase = KnowledgeBaseFactory.newKnowledgeBase();
		log.info(" new knowledge " + (System.currentTimeMillis() - start));
		// kbase.addKnowledgePackages( kbuilder.getKnowledgePackages() );
		log.info(" add knowledge " + (System.currentTimeMillis() - start));

		final StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		log.info(" session knowledge " + (System.currentTimeMillis() - start));

		List<String> messages = FileUtil.readFileAsList("src/test/resources/simple_killer.txt");
		List<Message> ms = new ArrayList();

		Long rid = null;
		Room room = null;
		for (String message : messages) {
			if (message.startsWith("#")) {
				continue;
			}
			Message m = MessageUtil.parse("simple_1.0", message);
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

			/*
			 * 
			 * Operater operater=new Operater(); ksession.insert(operater);
			 * log.info("start process ========================= "+message);
			 * 
			 * ksession.insert(m); ksession.startProcess( "room" );
			 * ksession.fireAllRules(); log.info(operater);
			 */

			log.info("start process use method of service  ========================= " + message);

			List<Message> ls = droolsGameMessageService.generate(m, room);
			log.info(ls);

		}

		log.info(" session knowledge " + (System.currentTimeMillis() - start));

		Thread.sleep(6000L);

		log.info("sleep over ");

		ksession.dispose();
		log.info(Arrays.asList("ss", "44"));

		List ls = new ArrayList();
		ls.add("ss");

	}

	

	private String getCityName(String ppname, int cnum, TreeMap<String, List<String>> cityNames) {
		// TODO Auto-generated method stub
		try {
			return cityNames.get(ppname).get(cnum);
		} catch (Exception e) {
			// TODO Auto-generated catch block

			e.printStackTrace();
		}
		return ppname;
	}

	private String getPrivanceName(int pnum, List<String> ls) {
		// TODO Auto-generated method stub
		return ls.get(pnum);
	}

}
