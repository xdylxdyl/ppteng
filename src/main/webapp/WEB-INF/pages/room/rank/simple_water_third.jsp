<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<script src="/r/j-src/rank/simple.js"></script>
<html xmlns="http://www.w3.org/1999/xhtml">

<div class="span9">
	<input type="hidden" id="desc" value="${desc}"> <input
		id="type" type="hidden" value="${type}"></input> <input type="hidden"
		id="query" value="${query}"> <input type="hidden"
			id="secondQuery" value="${secondQuery}"><input type="hidden"
				id="page" value="${page}"> <input type="hidden" id="size"
					value="${size}">

						<div class="hero-unit">
							<h1>三人局显然不是水民的目标</h1>

							<p>进三后的水民责任更大</p>
							<p>你的出票决定着整局游戏的胜负</p>							
							<p>杀助往往指进三后出错票的水民</p>
							<p class="text-warning">注意水民能否进三有太多不确定,所以进三率仅以用来自嘲</p>



						</div>
						<table class="table table-bordered table-striped">
							<caption class="">
								<h2>三人局强水榜</h2>
								<P class="text-success">20局以上生效</P>
							</caption>

							<thead>
								<tr>
									<th>序号</th>
									<th>姓名</th>
									<th id="waterThirdWin" query="waterThirdWin">胜<i></i></th>
									<th id="waterThird" query="waterThird" class="cursor-pointer">进三<i></i></th>
									<th id="water" query="water">做水<i></i></th>
									<th id="waterThirdWin_waterThird" query="waterThirdWin"
										secondQuery="waterThird">胜率<i></i></th>
									<th id="waterThird_water" query="waterThird"
										secondQuery="water">进三率<i></i></th>

								</tr>
							</thead>

							<tbody>
								<c:forEach items="${statisticsList}" var="statistics" begin="0"
									step="1" varStatus="status">
									<c:set var="user" value="${id_users[statistics.id]}"></c:set>
									<c:set var="index" value="${(page-1)*size+status.index}"></c:set>
									<c:set var="personLink"
										value="/player/statistics?uid=${user.id}&version=statistics_third"></c:set>
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
										<td><a href="${personLink}">${user.name}</a></td>
										<td>${statistics.waterThirdWin}</td>
										<td>${statistics.waterThird}</td>
										<td>${statistics.water}</td>
										<td><fmt:formatNumber pattern="0.00"
												value="${statistics.waterThirdWin/statistics.waterThird}"></fmt:formatNumber></td>

										<td><fmt:formatNumber pattern="0.00"
												value="${statistics.waterThird/statistics.water}"></fmt:formatNumber></td>


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
<!--/row-->