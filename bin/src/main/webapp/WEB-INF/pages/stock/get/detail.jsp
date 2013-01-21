<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>

<json:object>
	<json:property name="code" value="${code}"></json:property>
	<json:property name="message">
		<spring:message code="${code}" />
	</json:property>
	   <json:object name="detail">
	   <c:forEach items="${symbols}" var="symbol">
	    <json:object name="${symbol}">
			<json:property name="code" value="${symbol}"></json:property>
			<json:property name="name" value="${symbolMap[symbol].name}"></json:property>
			<json:property name="pinyin" value="${symbolMap[symbol].pinyin}"></json:property>
		</json:object>
	   </c:forEach>
	   </json:object>
</json:object>