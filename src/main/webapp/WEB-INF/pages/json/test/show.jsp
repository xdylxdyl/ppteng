<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring"uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>


	<c:forEach items="${list}" var="msg">	

<c:set var="sss" value="${msg}" scope="session"></c:set>
  <jsp:include page="subject.jsp" />
	</c:forEach>
