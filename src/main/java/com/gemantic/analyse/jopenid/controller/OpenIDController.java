package com.gemantic.analyse.jopenid.controller;

import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.expressme.openid.Association;
import org.expressme.openid.Authentication;
import org.expressme.openid.Endpoint;
import org.expressme.openid.OpenIdException;
import org.expressme.openid.OpenIdManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gemantic.common.util.MyTimeUtil;
import com.gemantic.killer.exception.ReloadableConfig;

@Controller
public class OpenIDController {

	private static final Log log = LogFactory.getLog(OpenIDController.class);

	static final long ONE_HOUR = 3600000L;
	static final long TWO_HOUR = ONE_HOUR * 2L;
	static final String ATTR_MAC = "openid_mac";
	static final String ATTR_ALIAS = "openid_alias";
	@Resource(name = "urlMap")
	private Map urls;

	@Autowired
	private OpenIdManager manager;

	@RequestMapping(value = "/openid/login")
	public String openIDLogin(HttpServletRequest request, HttpServletResponse response, ModelMap model, @RequestParam String op, @RequestParam String url,String replace) throws Exception {
		log.info("welcome " + op);

		if (op.equals("Google") || op.equals("Yahoo") || op.equals("Gemantic")) {
			String returnTO = (String) urls.get("url");
			returnTO=urls.get("url")+url+"&op="+op;
			manager.setReturnTo(returnTO);
			// redirect to Google or Yahoo sign on page:
			Endpoint endpoint = manager.lookupEndpoint(op);
			Association association = manager.lookupAssociation(endpoint);
			log.info(request.getSession().getId());
			/*byte[] r = association.getRawMacKey();
			Cookie macCookie = new Cookie(ATTR_MAC, String.valueOf(r));
			Cookie aliasCookie = new Cookie(ATTR_ALIAS, endpoint.getAlias());

			// 生命周期
			macCookie.setMaxAge(60 * 60 * 24 * 365);
			aliasCookie.setMaxAge(60 * 60 * 24 * 365);

			response.addCookie(macCookie);
			response.addCookie(aliasCookie);

			request.getSession().setAttribute(ATTR_MAC, association.getRawMacKey());
			request.getSession().setAttribute(ATTR_ALIAS, endpoint.getAlias());*/
			String backUrl = manager.getAuthenticationUrl(endpoint, association);
			
			if (op.equals("Gemantic")&&"true".equals(replace)) {
			 backUrl = backUrl.replaceAll("http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select", java.net.URLEncoder.encode("http://dev_tjiang.gemantic.com/openid/index.php", "utf8"));
		    }

			log.info("redirect:" + backUrl);
			return "redirect:" + backUrl;
		} else {
			throw new ServletException("Unsupported OP: " + op);
		}

	}

	@RequestMapping(value = "/openid/auth")
	public String openIDAuth(HttpServletRequest request, HttpServletResponse response, ModelMap model, String url,String op) throws Exception {
		log.info(request.getSession().getId());
		log.info("welcome back ,op is "+op);
		// check sign on result from Google or Yahoo:
		checkNonce(request.getParameter("openid.response_nonce"));
		Endpoint endpoint = manager.lookupEndpoint(op);
		Association association = manager.lookupAssociation(endpoint);
		String alias =endpoint.getAlias();
		byte[] mac_key = association.getRawMacKey();
		
		Authentication authentication = manager.getAuthentication(request, mac_key, alias);
		log.info(authentication);
		response.setContentType("text/html; charset=UTF-8");
		model.addAttribute("auth", authentication);
		String identity = authentication.getIdentity();
		String name=identity;
		if("Gemantic".equals(op)){
			String[] names = identity.split("=");
			name=names[1];
		}
		
		String fullname = authentication.getFullname();
		log.info(identity + " : " + fullname);
		log.info(url);
		return "redirect:" + url + "?uname=" + fullname + "&uid=" + name;

	}

	void checkNonce(String nonce) {
		// check response_nonce to prevent replay-attack:
		log.info("nonce " + nonce);
		if (nonce == null || nonce.length() < 20) {

			throw new OpenIdException("Verify failed.");
		}
		// make sure the time of server is correct:
		long nonceTime = getNonceTime(nonce.trim());
		long diff = Math.abs(System.currentTimeMillis() - nonceTime);
		if (diff > ONE_HOUR)
			throw new OpenIdException("Bad nonce time. over one hour ");
		if (isNonceExist(nonce))
			throw new OpenIdException(" nonce exist Verify nonce failed.");
		storeNonce(nonce, nonceTime + TWO_HOUR);
	}

	long getNonceTime(String nonce) {
		try {
			return new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").parse(nonce.substring(0, 19) + "+0000").getTime();
		} catch (ParseException e) {
			throw new OpenIdException("Bad nonce time format .");
		}
	}

	// simulate a database that store all nonce:
	private Set<String> nonceDb = new HashSet<String>();

	// check if nonce is exist in database:
	boolean isNonceExist(String nonce) {
		return nonceDb.contains(nonce);
	}

	// store nonce in database:
	void storeNonce(String nonce, long expires) {
		nonceDb.add(nonce);
	}

	void showAuthentication(PrintWriter pw, Authentication auth) {
		pw
				.print("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><title>Test JOpenID</title></head><body><h1>You have successfully signed on!</h1>");
		pw.print("<p>Identity: " + auth.getIdentity() + "</p>");
		pw.print("<p>Email: " + auth.getEmail() + "</p>");
		pw.print("<p>Full name: " + auth.getFullname() + "</p>");
		pw.print("<p>First name: " + auth.getFirstname() + "</p>");
		pw.print("<p>Last name: " + auth.getLastname() + "</p>");
		pw.print("<p>Gender: " + auth.getGender() + "</p>");
		pw.print("<p>Language: " + auth.getLanguage() + "</p>");
		pw.print("</body></html>");
		pw.flush();
	}

	public static void main(String[] args) throws ParseException {
		String str = "2011-08-18T08:28:58Z5h9gMZGaJsvNOc9KfxaW0rCTeY7D2MwENA";
		long sf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").parse(str.substring(0, 19) + "+0000").getTime();
		log.info(sf);
		String str2 = "2011-08-18T17:32:21Z94e4cdc25b31d7";
		long sf2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").parse(str2.substring(0, 19) + "+0000").getTime();
		Date d = MyTimeUtil.convertLong2Date(sf2);
		log.info(d);
		long t = System.currentTimeMillis();
		log.info(t - sf2);

		log.info(sf2);
	}
}
