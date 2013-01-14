<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../includes/includes.jsp"  %>
<%@page contentType="text/html;charset=utf-8"%>
<json:object escapeXml="false">
	<json:object name="message">
		<json:property name="code" value="${code}"></json:property>
	</json:object>
	<c:if test="${user != null}">
		<json:object name="user">
			<json:property name="id" value="${user.id}"></json:property>
			<json:property name="name" value="${user.name}"></json:property>
		</json:object>
	</c:if>
 </json:object>