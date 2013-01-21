<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>

<json:object escapeXml="false">
	<json:property name="code" value="${code}"></json:property>
	<json:property name="message">
		<spring:message code="${code}" />
	</json:property>
	<json:property name="id" value="${room.id}"></json:property>
	<json:property name="name" value="${room.name}"></json:property>
	<!-- right -->
	 <json:property name="rights">
	<c:forEach items="${user_info}" var="user_info">
		<json:object name="info">
			<json:property name="id" value="${user_info.key}"></json:property>
			<json:property name="name" value="${users[id].name}"></json:property>
			<c:forEach items="${user_info,value}" var="entry">
				<json:property name="${entry.key}" value="${entry.value}"></json:property>				
			</c:forEach>			
		</json:object>
	</c:forEach>
	</json:property>
	
	
	
</json:object>