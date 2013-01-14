<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@page contentType="text/html;charset=utf-8"%>

<json:object escapeXml="false">
	<json:property name="code" value="0"></json:property>
	<json:property name="message" value=""></json:property>
	<json:array name="infos">
		<c:forEach items="${users}" var="user">
			<json:object>
				<json:property name="id">${user.id}</json:property>
				<json:property name="name" value="${user.name}"></json:property>
				<json:property name="rid" value="${uid_rid[user.id]}"></json:property>
				<json:property name="rname" value="${rid_room[uid_rid[user.id]].name}"></json:property>
			</json:object>
		</c:forEach>
	</json:array>
</json:object>



