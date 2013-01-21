<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring"uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>

<json:object escapeXml="false">
	<json:property name="code" value="${code}"></json:property>	
	<json:property name="message" >
		<spring:message code="${code}"/>
	</json:property>
	<c:forEach items="${names}" var="name">
	<json:object name="resource">
	<json:property name="name" value="${name}"></json:property>	
	<json:property name="resource" value="${need_ids[name]}"></json:property>	
	</json:object>
	</c:forEach>
</json:object>