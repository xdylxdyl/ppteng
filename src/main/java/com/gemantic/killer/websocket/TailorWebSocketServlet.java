package com.gemantic.killer.websocket;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.gemantic.labs.killer.service.WebSocketService;

public class TailorWebSocketServlet extends WebSocketServlet {
	private static final long serialVersionUID = -7289719281366784056L;
	private static final Log log = LogFactory
			.getLog(TailorWebSocketServlet.class);
	public static String newLine = System.getProperty("line.separator");

	private WebSocketService webSocketService;
	
	
	private ServletContext servletContext;

	@Override
	public void init() throws ServletException {

		try {

			servletContext = this.getServletContext();
			WebApplicationContext ctx = WebApplicationContextUtils
					.getWebApplicationContext(servletContext);

			webSocketService = (WebSocketService) ctx
					.getBean("webSocketService");
			
			

			super.init();
		} catch (ServletException se) {
			throw se;
		} catch (Exception e) {
			throw new ServletException(e);
		}

	}

	public WebSocket doWebSocketConnect(HttpServletRequest request,
			String protocol) {
		Long uid = Long.valueOf(request.getParameter("uid"));
		log.info("you access me " + uid);
		WebSocket ws = webSocketService.createWebSocket(uid);
		return ws;
	}

}