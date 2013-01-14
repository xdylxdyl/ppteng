package com.gemantic.killer.service.impl;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import net.kotek.jdbm.DB;
import net.kotek.jdbm.DBMaker;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.gemantic.common.exception.ServiceDaoException;
import com.gemantic.common.exception.ServiceException;
import com.gemantic.common.util.FileUtil;
import com.gemantic.killer.common.model.Message;
import com.gemantic.killer.model.Record;
import com.gemantic.killer.service.MemberService;
import com.gemantic.killer.service.RecordService;
import com.gemantic.killer.service.RoomTimerService;
import com.gemantic.killer.service.compare.RecordCompare;
import com.gemantic.killer.util.MessageUtil;
import com.gemantic.killer.util.RecordUtil;

@Component
public class RecordServiceImple implements RecordService {

	private static final Log log = LogFactory.getLog(RecordServiceImple.class);
	private String path = "record";
	@Autowired
	private RoomTimerService roomTimerSevice;

	@Autowired
	private MemberService memberService;

	private Map<Long, String> id_recordContext = new HashMap();
	

	

	private String recordDB = "record";
	
	

	
	@Autowired
	@Qualifier("recordMaker")
	private DBMaker maker;
	
	private DB db;
	
	@PostConstruct
	public void init(){

		
		
    //为什么会初始化两次,怎么检测某一个文件已经被使用了呢?
	log.info("get record ===");
		Long start=System.currentTimeMillis();
		if(db==null){		
			db = maker.build();			   
				
		}

		//** Creates TreeMap which stores data in database. *//*
		try {
		
			this.id_recordContext = db.getHashMap(recordDB);		
			log.info("record "+this.id_recordContext.keySet().size());	
			

		} catch (Throwable t) {
			//
			t.printStackTrace();
			log.error(t.getMessage());

			db.createHashMap(recordDB);
			db.commit();
			log.info("create success " + recordDB);

		}
		
       log.info("init use time "+(System.currentTimeMillis()-start));
	
	}
	
	

	@Override
	public List<Record> getList(Long start, Long end) throws ServiceException, ServiceDaoException {
	/*	File file = new File(path);
		File[] files = file.listFiles();
		List<Record> ls = new ArrayList();
		for (File f : files) {

			Long recordID;
			try {

				recordID = Long.valueOf(f.getName());
			} catch (NumberFormatException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				log.error(f.getName() + " not a record file");
				continue;
			}
			Record record = id_record.get(recordID);
			if (record == null) {
				log.info(recordID + " not record object ");
				record = new Record(recordID);

			}
			ls.add(record);

		}*/
		List<Record> records=new ArrayList<Record>(); 
		for(Long id:this.id_recordContext.keySet()){
			Record r=this.getRecord(id);
			records.add(r);
		}
		Collections.sort(records, new RecordCompare());
		return  records;

	}

	@Override
	public void play(Long recordID, Long rid) throws ServiceException, ServiceDaoException {

		List<Long> uids = this.memberService.getMembers(rid);

		Long start = this.getStart(recordID);
		log.info("start "+start);
		List<Message> ms = new ArrayList();
		try {

			List<String> lines = FileUtil.readFileAsList(path + "/" + recordID);
			for (String line : lines) {
				Message m =MessageUtil.fromString(line);
						
				
				ms.add(m);

			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private Long getStart(Long rid) {
		// TODO Auto-generated method stub
		return rid;
	}

	public static void main(String[] args) throws ServiceException, ServiceDaoException, IOException, ParseException {

		RecordServiceImple r = new RecordServiceImple();
		Record record=new Record(33L);
		DBMaker maker=new DBMaker("db/game");
		//JDBMAgent agent=new JDBMAgentImpl();
	
		r.addRecord(record);
		List<Record> ls = r.getList(null, null);
		log.info(ls);
		
		/*
		List<Record> ls = r.getList(null, null);
		for (Record record : ls) {

		}
		// r.play(1326350543036L, null);

		List<String> lines = FileUtil.readFileAsList("record/1326352013192");
		for (String line : lines) {
			String[] linearray = line.split("&&"); // 如果内容中有||转义的问题再解决了.
			if (linearray.length < 2) {
				continue;
			}
			String content = linearray[1];

			Long time = MyTimeUtil.convertString2Long(linearray[0], "yyyy-MM-dd HH:mm:ss,SSS");
             if(time<=1326352013192L){
            	 log.info("what happen? is time back ");
             }
			log.info(time);
			Gson gson = new GsonBuilder().disableHtmlEscaping().create();
			
			
			
			
			

		}*/
	}

	@Override
	public void addRecord(Record record) throws ServiceException, ServiceDaoException {

		
		record.setCreateAt(System.currentTimeMillis());
		this.id_recordContext.put(record.getId(), RecordUtil.record2Json(record));			
		this.updateTable();
		

	}

	@Override
	public List<String> getContent(Long recordID) throws ServiceException, ServiceDaoException {
		try {
			
			Record r=this.getRecord(recordID);
			List<String> lines = FileUtil.readFileAsList(r.getPath());
			return lines;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ArrayList();
	}



	@Override
	public Record getRecord(Long recordID) throws ServiceException, ServiceDaoException {
		// TODO Auto-generated method stub
		String context=id_recordContext.get(recordID);
		Record record=RecordUtil.json2Record(context);
		return record;
	}

	private synchronized void updateTable() {
		db.commit();
		

	}
}
