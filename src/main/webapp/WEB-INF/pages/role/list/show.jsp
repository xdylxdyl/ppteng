<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring"uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>

<json:object escapeXml="false">
	<json:property name="code" value="${code}"></json:property>	
	<json:property name="message" >
		<spring:message code="${code}"/>
	</json:property>
	
	
	<c:forEach items="${roles}" var="role">
	<json:object name="role">
	<json:property name="id" value="${role.id}"></json:property>	
	<c:set  var="profession" value="" />
	<!-- die ,or self or is kill companion -->
	 <c:if test="${status[role.id].status=='die'||role.id==uid}">
	 	<c:set  var="profession" value="${role.profession}" />
	 </c:if>
	<json:property name="profession" value="${profession}"></json:property>	
	</json:object>
	</c:forEach>
	
</json:object>