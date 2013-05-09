<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>



<link href="/r/css/user_detail.css" rel="stylesheet" />
<link href="/r/css/button.css" rel="stylesheet" />



<!-- container start  -->
<div class="span9">

<c:set var="class" value="background-first" scope="session"></c:set>
<c:set var="indexClass" value="badge badge-important" scope="session"></c:set>

	<c:forEach items="${users}" var="user" begin="0" step="1"
		varStatus="status">
		<div class="container row-fluid">
			<c:set var="current" value="${user}" scope="session"></c:set>
				<c:if test="${((page-1)*size+status.index+1)> 3}">
				<c:set var="class" value="" scope="session"></c:set>
				<c:set var="indexClass" value="badge badge-info" scope="session"></c:set>
			</c:if>
			<p>
				<span class="${indexClass}">${(page-1)*size+status.index+1}
				</span> <span class="${indexClass}"><date:date
						pattern="HH时mm分mm秒 " value="${current.punchAt}"></date:date></span>
			<p>
				<tiles:insertDefinition name="personCard" />
		</div>

	</c:forEach>

</div>
<!-- container over  -->

<div class="pagination pagination-centered">
	<c:set var="link" value="/rank/list?type=punch"></c:set>
	<ul>
		<li><a href="${link}&page=${page-1}&size=${size}" id="pagePrev">Prev</a></li>
		<li class="active"><a href="${link}&page=${page}&size=${size}">${page}</a></li>
		<li><a href="${link}&page=${page+1}&size=${size}" id="pageNext">Next</a></li>
	</ul>
</div>

<script src="/r/j-src/web/rank/punch.js"></script>