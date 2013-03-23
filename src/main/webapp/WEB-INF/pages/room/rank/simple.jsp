<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<script src="/r/j-src/rank/simple.js"></script>
<html xmlns="http://www.w3.org/1999/xhtml">
<div class="span9">
	<input type="hidden" id="desc" value="${desc}">
	<input type="hidden" id="query" value="${query}">
	<input	type="hidden" id="page" value="${page}">
	<input type="hidden" id="size" value="${size}">
	<table class="table table-bordered table-striped">
		<caption class=""><h2>排行</h2></caption>
		<thead>
			<tr>
				<th>排名</th>
				<th>姓名</th>
				<th id="win" query="win" class="cursor-pointer">赢<i class=""></i></th>
				<th id="lose" query="lose" class="cursor-pointer">输<i class=""></i></th>				
				<th id="waterWin" query="waterWin" class="cursor-pointer">做水赢<i class=""></i></th>
				<th id="waterLose" query="waterLose" class="cursor-pointer">做水输<i class=""></i></th>
				<th id="water" query="water" class="cursor-pointer">做水数<i class=""></i></th>
				<th id="killerWin" query="killerWin" class="cursor-pointer">做杀赢<i class=""></i></th>
				<th id="killerLose" query="killerLose" class="cursor-pointer">做杀输<i class=""></i></th>
				<th id="killer" query="killer" class="cursor-pointer">做杀数<i class=""></i></th>
				<th id="all" query="all" class="cursor-pointer">总局数<i class=""></i></th>
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
					<td><a href="/player/statistics.do?uid=${user.id}&version=simple">${user.name}</a></td>
					<td>${statistics.win}</td>
					<td>${statistics.lose}</td>
					
					<td>${statistics.waterWin}</td>
					<td>${statistics.waterLose}</td>
					<td>${statistics.water}</td>
					<td>${statistics.killerWin}</td>
					<td>${statistics.killerLose}</td>
					<td>${statistics.killer}</td>
					<td>${statistics.all}</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>

	<div class="pagination pagination-centered">
		<ul>
			<li><a
				href="/rank/statistics.do?type=simple&query=${query}&desc=${desc}&page=${page-1}&size=${size}"
				id="pagePrev">Prev</a></li>
			<li class="active"><a
				href="/rank/statistics.do?type=simple&query=${query}&desc=${desc}&page=${page}&size=${size}">${page}</a></li>
			<li><a
				href="/rank/statistics.do?type=simple&query=${query}&desc=${desc}&page=${page+1}&size=${size}"
				id="pageNext">Next</a></li>
		</ul>
	</div>
</div>
<!--/row-->
