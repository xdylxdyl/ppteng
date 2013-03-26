<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>

<json:object escapeXml="false">
	<json:property name="code">${code}</json:property>
	<json:property name="id" value="${user.id}"></json:property>
	<json:property name="name" value="${user.name}"></json:property>
	<json:property name="icon" value="${user.icon}"></json:property>
</json:object>