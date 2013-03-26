<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/person/moneyFlow.js"></script>
<c:set var="current" value="${id_users[uid]}"></c:set>
<c:set var="prevPageLink"
	value="/money/flow.do?uid=${uid}&type=${type}&page=${page-1}&size=${size}"></c:set>
<c:set var="nextPageLink"
	value="/money/flow.do?uid=${uid}&type=${type}&page=${page+1}&size=${size}"></c:set>
<c:set var="curPageLink"
	value="/money/flow.do?uid=${uid}&type=${type}&page=${page}&size=${size}"></c:set>
<input type="hidden" id="type" value="${type}">
<c:choose>
	<c:when test="${'in'==type}">
		<c:set var="typeName" value="流入"></c:set>
		<c:set var="typeHead" value="来自"></c:set>
	</c:when>
	<c:otherwise>
		<c:set var="typeName" value="流出"></c:set>
		<c:set var="typeHead" value="转给"></c:set>
	</c:otherwise>
</c:choose>



<!-- container start  -->
<div class="span9">

	<table class="table table-bordered table-striped">
		<caption class="">
			<h2>${current.name}的资金${typeName}单</h2>
		</caption>
		<thead>
			<tr>
				<th>序号</th>
				<th>数量</th>

				<th>${typeHead}</th>

				<th>备注</th>
				<th>时间</th>

			</tr>
		</thead>
		<tbody>
			<c:forEach items="${mfs}" var="mf" begin="0" step="1"
				varStatus="status">

				<c:set var="index" value="${(page-1)*size+status.index}"></c:set>

				<c:choose>
					<c:when test="${'in'==type}">
						<c:set var="user" value="${id_users[mf.fid]}"></c:set>
						<c:set var="userLink"
							value="money/flow.do?uid=${user.id}&type=out"></c:set>
					</c:when>
					<c:otherwise>
						<c:set var="user" value="${id_users[mf.uid]}"></c:set>
						<c:set var="userLink" value="money/flow.do?uid=${user.id}&type=in"></c:set>
					</c:otherwise>
				</c:choose>




				<c:choose>
					<c:when test="${index/2==1}">
						<c:set var="trClass" value="success"></c:set>
					</c:when>
					<c:otherwise>
						<c:set var="trClass" value="info"></c:set>
					</c:otherwise>
				</c:choose>


				<tr class="${trClass}">
					<td>${index+1}</td>
					<td>${mf.money}</td>
					<td><a href="${userLink}">${user.name}</a></td>
					<td>${mf.comments}</td>
					<td><date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
							value="${mf.createAt}"></date:date></td>

				</tr>
			</c:forEach>
		</tbody>
	</table>

	<div class="pagination pagination-centered">
		<ul>
			<li><a href="${prevPageLink}" id="pagePrev">Prev</a></li>
			<li class="active"><a href="${curPageLink}">${page}</a></li>
			<li><a href="${nextPageLink}" id="pageNext">Next</a></li>
		</ul>
	</div>
</div>
