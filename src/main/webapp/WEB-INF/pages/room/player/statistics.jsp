<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<script src="/r/j-src/statistics/statistics.js"></script>


<!-- container start  -->
<div class="span9">
	<div class="hero-unit">
		<h1>简化游戏统计数据</h1>


		<p>葡萄藤让你更了解自己</p>
		<p>统计数据每天晚上2点以后更新</p>
		<p>更多统计,敬请期待</p>


	</div>

	<table class="table table-bordered table-striped">
		<caption>胜负统计</caption>
		<thead>
			<tr>
				<th>序号</th>
				<th>姓名</th>
				<th>胜</th>
				<th>胜率</th>
				<th>败</th>
				<th>做水胜</th>
				<th>做水胜率</th>
				<th>做水败</th>
				<th>做水数</th>
				<th>做杀胜</th>
				<th>做杀胜率</th>
				<th>做杀败</th>
				<th>做杀数</th>
				<th>拿刀率</th>
				<th>总局数</th>

			</tr>
		</thead>
		<tbody>
			<tr class="success">
				<td>1</td>
				<td>${current.name}</td>
				<td>${statistics.win}</td>
				<td><c:choose>
						<c:when test="${statistics.all==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.win/statistics.all}"></fmt:formatNumber>
						</c:otherwise>

					</c:choose></td>
				<td>${statistics.lose}</td>
				<td>${statistics.waterWin}</td>
				<td><c:choose>
						<c:when test="${statistics.all==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.waterWin/statistics.water}"></fmt:formatNumber>


						</c:otherwise>

					</c:choose></td>
				</td>
				<td>${statistics.waterLose}</td>
				<td>${statistics.water}</td>
				<td>${statistics.killerWin}</td>
				<td><c:choose>
						<c:when test="${statistics.all==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.killerWin/statistics.killer}"></fmt:formatNumber>
						</c:otherwise>



					</c:choose></td>



				</td>
				<td>${statistics.killerLose}</td>
				<td>${statistics.killer}</td>
				<td><c:choose>
						<c:when test="${statistics.all==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.killer/statistics.all}"></fmt:formatNumber>
						</c:otherwise>



					</c:choose></td>
				<td>${statistics.all}</td>
			</tr>

		</tbody>
	</table>



</div>
<!-- container over  -->
