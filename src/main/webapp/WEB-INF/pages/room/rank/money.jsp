<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/rank/money.js"></script>





<!-- container start  -->
<div class="span9">



	<c:forEach items="${users}" var="user" begin="0" step="1"
		varStatus="status">

		<c:set var="userLink" value="/player/detail.do?uid=${user.id}"></c:set>
		<c:set var="allIndex" value="${(page-1)*size+status.index+1}"></c:set>

		<c:choose>

			<c:when test="${allIndex<=3}">

				<c:if test="${allIndex==1}">
					<div class="rank_content">
				</c:if>

				<div class="rank clearfix">
					<img src="${userLink}" class="rank_img">
					<div class="rank_person">
						<a title href="${userLink}">${user.name}<span
							class="label label-important">金币${user.money}</span></a> <span>${user.sign
							}</span>

						<p>
							<small>注册时间:<date:date pattern="yyyy年 MM月dd日  HH时mm分 "
									value="${user.createAt}"></date:date>

							</small>
						</p>
					</div>
					<div class="rank_num">
						<span class="ranking">${allIndex}</span>
					</div>
				</div>


				<c:if test="${allIndex==3}">
</div>
</c:if>

</c:when>


<c:otherwise>



	<c:if test="${status.index%3==0}">

		<!-- row-fluid start  -->
		<div class=row-fluid">

			<ul class="thumbnails">
	</c:if>

	<!-- li start -->
	<li class="span2">
		<!-- div start -->
		<div class="thumbnail">

			<div class="caption">
				<span class="badge badge-info">${(page-1)*size+status.index+1}</span>

				<h3>
					<a href="/player/detail.do?uid=${user.id}" target="_blank"><c:out
							value="${user.name}"></c:out></a> <span class="label label-important">金币
						${user.money}</span>
				</h3>

				<div>

					<a href="/player/detail.do?uid=${user.id}" target="_blank"> <img
						src="http://www.ptteng.com/${user.icon}" class="thumbnail"
						style="max-width: 90%; max-height: 15%">

					</a>

					<div class="caption">
						<p class="text-success">${user.sign}</p>



						<p>
							<small>注册时间:<date:date pattern="yyyy年 MM月dd日  HH时mm分 "
									value="${user.createAt}"></date:date>

							</small>
						</p>
						<div></div>
						<!-- div over -->
						<li>
							<!-- li over --> <c:if test="${status.index%3==2||status.last}">


								</ul>
					</div>

					<!-- row-fluid over  -->
					</c:if>
</c:otherwise>


</c:choose>
</c:forEach>

</div>
<!-- container over  -->

<div class="pagination pagination-centered">
	<ul>
		<li><a
			href="/rank/list.do?type=money&page=${page-1}&size=${size}"
			id="pagePrev">Prev</a></li>
		<li class="active"><a
			href="/rank/list.do?type=money&page=${page}&size=${size}">${page}</a></li>
		<li><a
			href="/rank/list.do?type=money&page=${page+1}&size=${size}"
			id="pageNext">Next</a></li>
	</ul>
</div>