<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@page contentType="text/html;charset=utf-8"%>


<json:object escapeXml="false">
	<json:property name="code" value="0"></json:property>
	<json:property name="message" value=""></json:property>
	<json:object name="user">
		<json:property name="id">${user.id}</json:property>
		<json:property name="name" value="${user.name}"></json:property>	
	</json:object>

</json:object>
