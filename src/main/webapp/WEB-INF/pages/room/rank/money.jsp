<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/rank/rank.js"></script>
<!-- container start  -->
<div class="span9">



	<c:forEach items="${users}" var="user" begin="0" step="1"
		varStatus="status">
		<c:if test="${status.index%3==0}">

			<!-- row-fluid start  -->
			<div class=row-fluid">

				<ul class="thumbnails">
		</c:if>

		<!-- li start -->
		<li class="span3">
			<!-- div start -->
			<div class="thumbnail">

				<div class="caption">
					<span class="badge badge-info">${(page-1)*size+status.index+1}</span>
					
					<h3>
						<a href="/player/detail.do?uid=${user.id}" target="_blank"><c:out value="${user.name}"></c:out></a>
						<span class="label label-important">金币 ${user.money}</span>
					</h3>

					<div>

						<img src="http://www.ptteng.com/${user.icon}" class="thumbnail"
							style="max-width: 90%; max-height: 15%">



						<div class="caption">
							<p class="text-success">${user.sign}</p>

							<small>上次登录:<date:date pattern="yyyy年 MM月dd日  HH时mm分 "
									value="${user.loginAt}"></date:date>


							</small>

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
	</c:forEach>

</div>
<!-- container over  -->

<div class="pagination pagination-centered">
  <ul>
    <li><a href="/rank/list.do?type=money&page=${page-1}&size=${size}" id="pagePrev">Prev</a></li>   
      <li class="active"><a href="/rank/list.do?type=money&page=${page}&size=${size}">${page}</a></li>
    <li><a href="/rank/list.do?type=money&page=${page+1}&size=${size}" id="pageNext">Next</a></li>
  </ul>
</div>