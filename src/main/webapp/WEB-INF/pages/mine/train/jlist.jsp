<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>
<json:array name="list">
	<c:forEach items="${trains}" var="train">
		<json:object>
			<json:property name="id">${train.id}</json:property>
			<json:property name="row" value="${train.rowCount}"></json:property>
			<json:property name="column" value="${train.columnCount}"></json:property>
			<json:property name="mine" value="${train.mineCount}"></json:property>
			<json:property name="content" value="${train.content}"></json:property>
			<json:property name="systemContent" value="${train.systemContent}"></json:property>
		</json:object>
	</c:forEach>
</json:array>
