<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@page contentType="text/html;charset=utf-8"%>


<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="<%=request.getContextPath()%>/r/c/tag/tag.css">
<script
	src="<%=request.getContextPath()%>/r/j-src/jquery/jquery-1.6.1.js"></script>
<title>股票-----标记</title>
</head>


<body>


<div class="rightBody">
	<div class="menuList">
		<c:forEach items="${tags}" var="tag" varStatus="rowCounter" >
			<c:choose>
				<c:when test="${rowCounter.count % 3 == 1||rowCounter.first==true}">
					<ul>
				</c:when>
			</c:choose>
			<li class="columnLI" tagID="${tag.id}"><a href="/tag/remove?name=${tag.name}&symbol=${symbol}"><span>${tag.name}</span><strong>X</strong></a>
			</li>
			<c:choose>
				<c:when test="${rowCounter.count % 3 == 0||rowCounter.last==true}">
					</ul>
				</c:when>
			</c:choose>
		</c:forEach>
	</div>


</div>

</body>
</html>




