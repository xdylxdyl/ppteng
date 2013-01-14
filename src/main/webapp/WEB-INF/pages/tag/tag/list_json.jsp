<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="pinyin" uri="http://www.gemantic.com/taglibs/pinyin"%>
<%@page contentType="text/html;charset=utf-8"%>
<json:object escapeXml="false">
	<json:property name="code" value="${code}"></json:property>
	<json:property name="message">
		<spring:message code="${code}" />
	</json:property>
	<json:array name="tag">
		<c:forEach items="${tags}" var="tag" varStatus="rowCounter">
			<json:object>
				<json:property name="id" value="${tag.id}"></json:property>
				<json:property name="name" value="${tag.name}"></json:property>
				<json:property name="pinyin">
				<pinyin:pinyin value="${tag.name}" pattern="acronmy" />
				</json:property>
			</json:object>
		</c:forEach>
	</json:array>
</json:object>

