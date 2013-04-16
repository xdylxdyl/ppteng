<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/rank/money.js"></script>


<link href="/r/css/user_detail.css" rel="stylesheet" />
<link href="/r/css/button.css" rel="stylesheet" />



<c:set var="class" value="background-first" scope="session"></c:set>
<c:set var="indexClass" value="badge badge-important" scope="session"></c:set>
<!-- container start  -->
<div class="span9">



	<c:forEach items="${users}" var="user" begin="0" step="1"
		varStatus="status">

		<c:set var="userLink" value="/player/detail?uid=${user.id}"></c:set>
		<c:set var="allIndex" value="${(page-1)*size+status.index+1}"></c:set>
	
			<c:if test="${((page-1)*size+status.index+1)> 3}">
				<c:set var="class" value="" scope="session"></c:set>
					<c:set var="indexClass" value="badge badge-info" scope="session"></c:set>
			</c:if>
		<div class="container">
			<c:set var="current" value="${user}" scope="session"></c:set>
				<p>
			<span class="${indexClass}">${(page-1)*size+status.index+1} 	</span> <span class="${indexClass}">${user.money}</span><p>
			<tiles:insertDefinition name="personCard" />
		</div>
		
		

</c:forEach>

</div>
<!-- container over  -->

<div class="pagination pagination-centered">
	<ul>
		<li><a
			href="/rank/list?type=money&page=${page-1}&size=${size}"
			id="pagePrev">Prev</a></li>
		<li class="active"><a
			href="/rank/list?type=money&page=${page}&size=${size}">${page}</a></li>
		<li><a
			href="/rank/list?type=money&page=${page+1}&size=${size}"
			id="pageNext">Next</a></li>
	</ul>
</div>