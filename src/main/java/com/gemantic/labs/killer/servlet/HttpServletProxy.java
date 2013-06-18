package com.gemantic.labs.killer.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.gemantic.killer.websocket.TailorWebSocketServlet;

public class HttpServletProxy extends HttpServlet {

	private static final long serialVersionUID = -7208519469035631940L;

	private static final Log log = LogFactory
			.getLog(TailorWebSocketServlet.class);

	private String targetServlet;

	private HttpServlet proxy;

	public void init() throws ServletException {

		this.targetServlet = getInitParameter("targetBean");

		getServletBean();
		proxy.init(getServletConfig());

		log.info(targetServlet
				+ " was inited by HttpServletProxy  successfully......");
	}

	private void getServletBean() {
		WebApplicationContext wac = WebApplicationContextUtils
				.getRequiredWebApplicationContext(getServletContext());
		this.proxy = (HttpServlet) wac.getBean(targetServlet);

		for (String str : wac.getBeanDefinitionNames()) {
			log.info("get bean is " + str);
		}

	}

	@Override
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, RuntimeException {

		proxy.service(request, response);

	}

}
