<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../includes/includes.jsp"  %>
<%@page contentType="text/html;charset=utf-8"%>
<json:object escapeXml="false">
	<json:array name="data">
        <c:forEach items="${users}" var="user">
        	<json:object>
            	<json:property name="id" value="${user.id}"></json:property>
            	<json:property name="name" value="${user.name}"></json:property>
            </json:object>
        </c:forEach>
    </json:array>    
 </json:object>