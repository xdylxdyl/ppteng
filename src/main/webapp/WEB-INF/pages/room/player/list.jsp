<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@page contentType="text/html;charset=utf-8"%>

<json:object escapeXml="false">
	<json:property name="code" value="${event.id}"></json:property>
	<json:property name="message" value="${event.title}"></json:property>
	



	<json:array name="playlists">
		<c:forEach items="${users}" var="user">
			<json:object>
			   
				<json:property name="${user.id}" value="${user.status}"></json:property>			
			</json:object>
		</c:forEach>
	</json:array>

</json:object>



