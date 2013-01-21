<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>
<json:object escapeXml="false">

	<json:array name="person">
		<c:forEach items="${room.players}" var="person">
			<json:object>
				<json:property name="id">${person}</json:property>
				<json:property name="status" value="unready"></json:property>
			</json:object>
		</c:forEach>
	</json:array>

	<json:object name="room">
		<json:property name="creater" value="${room.createrID}"></json:property>
		<json:property name="id" value="${room.id}"></json:property>
		<json:property name="name" value="${room.name}"></json:property>

		<json:property name="status" value="${room.status}"></json:property>
		<json:property name="version" value="${room.version}"></json:property>

		<json:object name="setting">
			<c:forEach items="${room.setting.setting}" var="entry">
				<json:property name="${entry.key}}" value="${entry.value}"></json:property>
			</c:forEach>

		</json:object>
	</json:object>
</json:object>