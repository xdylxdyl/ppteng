package com.gemantic.analyse.tag.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PreDestroy;

import net.kotek.jdbm.DB;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.gemantic.analyse.tag.model.Tag;
import com.gemantic.analyse.tag.service.TagService;
import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.killer.util.MapDataUtil;
import com.gemantic.killer.util.TagUtil;

@Component
public class TagServiceJDBMImpl implements TagService {

	private static final Log log = LogFactory.getLog(TagServiceJDBMImpl.class);

	private Map<Long, String> tid_tag = new HashMap<Long, String>();

	private Map<String, Long> name_tid = new HashMap<String, Long>();

	private String tagDB = "name_tid";

	private String nameDB = "tag";

	private boolean init = false;

	private DB db;
  
	//@Autowired
	//private JDBMAgent jdbmAgent;
	
	@Override
	public List<Tag> getTags(List<Long> userIDS) {
		List<Tag> tags = new ArrayList<Tag>();
		List<String> jsons = new ArrayList();
		MapDataUtil.getListValue(tid_tag, userIDS, jsons);
		for (String json : jsons) {
			Tag tag = TagUtil.json2User(json);
			tags.add(tag);

		}
		return tags;
	}

	@Override
	public Tag getTagByID(Long uid) throws ServiceException, ServiceDaoException {
		String json = this.tid_tag.get(uid);

		return TagUtil.json2User(json);
	}

	@Override
	public void update(Tag tag) throws ServiceException, ServiceDaoException {
		this.tid_tag.put(tag.getId(), TagUtil.user2Json(tag));
		this.name_tid.put(tag.getName(), tag.getId());
		this.db.commit();

	}

	//@PostConstruct
	public void init() {
		if (init) {
			log.warn("already init ");
			return;
		} else {
			log.info("init start");

		}

		// 为什么会初始化两次,怎么检测某一个文件已经被使用了呢?
		log.info("===");
		Long start = System.currentTimeMillis();
		if (db == null) {
			//db=jdbmAgent.getDB();		;
			
		}
	

		// ** Creates TreeMap which stores data in database. *//*
		try {
			this.tid_tag = db.getHashMap(this.tagDB);
			log.info("tid_tag " + this.tid_tag.keySet().size());

		} catch (Throwable t) {
			//
			t.printStackTrace();
			log.error(t.getMessage());

			db.createHashMap(tagDB);
			db.commit();
			log.info("create success " + tagDB);

		}

		// ** Creates TreeMap which stores data in database. *//*
		try {

			this.name_tid = db.getHashMap(this.nameDB);
			log.info("name " + name_tid.keySet().size());

		} catch (Throwable t) {
			t.printStackTrace();
			log.error(t.getMessage());

			db.createHashMap(this.nameDB);
			db.commit();
			log.info("create success " + nameDB);

		}

		log.info("===");
		init = true;
		log.info("init use time " + (System.currentTimeMillis() - start));
	}

	@PreDestroy
	private void destory() {

		log.info("close db start");
		db.close();
		log.info("close db over");
	}
	
	
	

	public static void main(String[] args) throws ServiceException, ServiceDaoException {
		TagServiceJDBMImpl service = new TagServiceJDBMImpl();
		/*
		 * for(int i=0;i<100;i++){ Long id=service.create("测试帐户-"+i);
		 * log.info(id); }
		 */

	}

	@Override
	public Long add(Tag tag) throws ServiceException, ServiceDaoException {

		log.info(" insert user " + tag);
		Long uid = tag.getId();
		if (uid == null) {
			uid = RandomUtils.nextLong();
		}

		if (this.tid_tag.containsKey(uid)) {

		} else {
			tag.setId(uid);
			tid_tag.put(uid, TagUtil.user2Json(tag));

			this.name_tid.put(tag.getName(), tag.getId());
			this.db.commit();
		}
		return uid;

	}

	@Override
	public Long getIDByName(String name) throws ServiceException, ServiceDaoException {
		// TODO Auto-generated method stub
		return this.name_tid.get(name);
	}

}
