<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<title>排行榜-简化-杀人游戏-葡萄藤轻游戏</title>
<div class="span9">
	<input type="hidden" id="desc" value="${desc}"> <input
		type="hidden" id="query" value="${query}"> <input
			type="hidden" id="secondQuery" value="${secondQuery}"><input
				type="hidden" id="page" value="${page}"> <input
					type="hidden" id="size" value="${size}"> <input id="type"
						type="hidden" value="${type}"></input>
						<table class="table table-bordered table-striped">
							<caption class="">
								<h2>英雄榜</h2>
								<P class="text-success">20局以上生效</P>
							</caption>
							<thead>
								<tr>
									<th>排名</th>
									<th>姓名</th>
									<th id="win_all" query="win" secondQuery="all"
										class="cursor-pointer">胜率<i class=""></i></th>
									<th id="win" query="win" class="cursor-pointer">胜局<i
										class=""></i></th>


									<th id="all" query="all" class="cursor-pointer">总局<i
										class=""></i></th>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${statisticsList}" var="statistics" begin="0"
									step="1" varStatus="status">
									<c:set var="user" value="${id_users[statistics.id]}"></c:set>
									<c:set var="index" value="${(page-1)*size+status.index}"></c:set>

									<c:choose>
										<c:when test="${index<=2}">
											<c:set var="trClass" value="success"></c:set>
										</c:when>
										<c:when test="${index>2&&index<=9}">
											<c:set var="trClass" value="error"></c:set>
										</c:when>
										<c:when test="${index>9&&index<20}">
											<c:set var="trClass" value="warning"></c:set>
										</c:when>
										<c:otherwise>
											<c:set var="trClass" value="info"></c:set>
										</c:otherwise>
									</c:choose>


									<tr class="${trClass}">
										<td>${index+1}</td>
										<td><a
											href="/player/statistics?uid=${user.id}&version=statistics">${user.name}</a></td>

										<td><fmt:formatNumber pattern="0.00"
												value="${statistics.win/statistics.all}"></fmt:formatNumber></td>
										<td>${statistics.win}</td>


										<td>${statistics.all}</td>
									</tr>
								</c:forEach>
							</tbody>
						</table>

						<div class="pagination pagination-centered">
							<ul>
								<li><a
									href="/rank/statistics?type=simple&query=${query}&desc=${desc}&page=${page-1}&size=${size}"
									id="pagePrev">Prev</a></li>
								<li class="active"><a
									href="/rank/statistics?type=simple&query=${query}&desc=${desc}&page=${page}&size=${size}">${page}</a></li>
								<li><a
									href="/rank/statistics?type=simple&query=${query}&desc=${desc}&page=${page+1}&size=${size}"
									id="pageNext">Next</a></li>
							</ul>
						</div>
</div>
<script src="/r/j-src/web/rank/simple.js"></script>
<!--/row-->