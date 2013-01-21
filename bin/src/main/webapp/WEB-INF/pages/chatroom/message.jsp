<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../includes/includes.jsp"  %>
<%@page contentType="application/x-javascript;charset=utf-8"%>
<json:object escapeXml="false">
	<json:object name="message">
		<json:property name="code" value="${code}"></json:property>
		<json:property name="from" value="${from}"></json:property>
		<json:property name="to" value="${to}"></json:property>
		<json:property name="message" value="${message}"></json:property>
	</json:object>
 </json:object>