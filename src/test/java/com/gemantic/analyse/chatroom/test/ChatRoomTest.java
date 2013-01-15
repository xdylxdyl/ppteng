package com.gemantic.analyse.chatroom.test;

import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.junit.Test;

import com.gemantic.killer.common.model.Message;

public class ChatRoomTest {
	
	private static final Logger log = Logger.getLogger(ChatRoomTest.class);
	@Test
	public void testTime() {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date(1311091199999L);
		System.out.println(df.format(date));
	}
	
	@Test
	public void testString(){
		StringBuffer sb = new StringBuffer();
		String l = null;
		sb.append(l);
		
		System.out.println(sb.toString());
	}
	
	@Test
	public void testReplace() throws UnsupportedEncodingException{
		String url = "http://openid.server.com/?test=test&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns.gx=http%3A%2F%2Fopenid.net%2Fsrv%2Fax%2F1.0&openid.gx.mode=fetch_request&openid.gx.type.email=http%3A%2F%2Faxschema.org%2Fcontact%2Femail&openid.gx.type.fullname=http%3A%2F%2Faxschema.org%2FnamePerson&openid.gx.type.language=http%3A%2F%2Faxschema.org%2Fpref%2Flanguage&openid.gx.type.firstname=http%3A%2F%2Faxschema.org%2FnamePerson%2Ffirst&openid.gx.type.lastname=http%3A%2F%2Faxschema.org%2FnamePerson%2Flast&openid.gx.type.gender=http%3A%2F%2Faxschema.org%2Fperson%2Fgender&openid.gx.required=email%2Cfullname%2Clanguage%2Cfirstname%2Clastname%2Cgender&openid.return_to=http%3A%2F%2F10.0.0.40%3A9090%2Fuser%2Fopenid.do&openid.assoc_handle=3eab11d62ddb4d2845b86e7b2552677e&openid.realm=http%3A%2F%2F10.0.0.40%3A9090";
		url = java.net.URLDecoder.decode(url, "utf8");
		url = url.replaceAll("http://specs.openid.net/auth/2.0/identifier_select", java.net.URLEncoder.encode("http://openid.server.com/index.php", "utf8"));
		
		System.out.println(url);
	}
	
	
	
	@Test
	public void testCopy() throws CloneNotSupportedException{
		Message m=new Message();
		m.setColor("sss");
		List<String> accepts=new ArrayList();
		accepts.add("222");
		m.setAccepts(accepts);
		
		log.info("m is "+m);
	//Message m2=(Message) m.clone();
	//log.info(" copy m is "+ m2);
	// m2.setAccepts(new ArrayList());
	 log.info(" after modify m is "+ m);
	// log.info(" after modify cloent m is "+ m2);
	
	}

}
