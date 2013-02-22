<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@page contentType="text/html;charset=utf-8"%>

<json:object escapeXml="false">
	<json:property name="code" value="0"></json:property>
	<json:property name="message" value=""></json:property>
	<json:array name="infos">
		<c:forEach items="${names}" var="entry">
			<json:object>
				<json:property name="id">${entry.key}</json:property>
				<json:property name="name" value="${entry.value}"></json:property>			
			</json:object>
		</c:forEach>
	</json:array>
</json:object>



