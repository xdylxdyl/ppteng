<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring"uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>

<json:object>

	<json:object name="message">
		<json:property name="code" value="${code}"></json:property>
		<json:property name="message" value="${message}"></json:property>	
		
	</json:object>

	<json:array name="list">
		<c:forEach items="${prompts}" var="prompt">
		<json:object>
				<json:property name="id">${prompt.id}</json:property>
				<json:property name="label" value="${prompt.name}"></json:property>
				<json:property name="pinyin" value="${prompt.pinyin}"></json:property>
				<json:property name="fpinyin" value="${prompt.full_pinyin}"></json:property>				
		</json:object>
		</c:forEach>
	</json:array>    
 </json:object>