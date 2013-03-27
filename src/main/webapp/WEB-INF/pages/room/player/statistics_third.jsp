<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<script src="/r/j-src/statistics/statistics_third.js"></script>


<!-- container start  -->
<div class="span9">
	<div class="hero-unit">
		<h1>简化游戏三人局统计数据</h1>


		<p>三人局不是唯一</p>
		<p>但却让可以你更了解自己</p>
		<p>做为水民,未必一定要进三.但是如果已经进三了呢</p>
		<p>统计数据每天晚上2点以后更新</p>


	</div>

	<table class="table table-bordered table-striped">
		<caption>做为一个水,${current.name} 在 [${statistics.water}] 局游戏中进三 [${statistics.waterThird}] 次</caption>
		<thead>
			<tr>
				<th>序号</th>
				<th>姓名</th>
				<th>胜</th>
				<th>进三</th>
				<th>做水</th>
				<th>胜率</th>
				<th>进三率</th>

			</tr>
		</thead>
		<tbody>
			<tr class="success">
				<td>1</td>
				<td>${current.name}</td>
				<td>${statistics.waterThirdWin}</td>
				<td>${statistics.waterThird}</td>
				<td>${statistics.water}</td>
				<td><c:choose>
						<c:when test="${statistics.waterThird==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.waterThirdWin/statistics.waterThird}"></fmt:formatNumber>


						</c:otherwise>

					</c:choose></td>
				</td>
				<td><c:choose>
						<c:when test="${statistics.water==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.waterThird/statistics.water}"></fmt:formatNumber>
						</c:otherwise>

					</c:choose></td>




			</tr>

		</tbody>
	</table>

	<table class="table table-bordered table-striped">
		<caption>做为一个杀,${current.name} 在 [${statistics.killer}] 局游戏中进三 [${statistics.killerThird}] 次</caption>
		<thead>
			<tr>

				<th>序号</th>
				<th>姓名</th>
				<th>胜</th>
				<th>进三</th>
				<th>做杀</th>
				<th>胜率</th>
				<th>进三率</th>



			</tr>
		</thead>
		<tbody>
			<tr class="success">
				<td>1</td>
				<td>${current.name}</td>
				<td>${statistics.killerThirdWin}</td>
				<td>${statistics.killerThird}</td>
				<td>${statistics.killer}</td>
				<td><c:choose>
						<c:when test="${statistics.killerThird==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.killerThirdWin/statistics.killerThird}"></fmt:formatNumber>
						</c:otherwise>


					</c:choose></td>
				<td><c:choose>
						<c:when test="${statistics.waterThird==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.killerThird/statistics.waterThird}"></fmt:formatNumber>
						</c:otherwise>

					</c:choose></td>

				</td>







			</tr>

		</tbody>
	</table>

	<table class="table table-bordered table-striped">
		<caption>共计在 [${statistics.all}] 局游戏中,进三 [${statistics.third}] 次</caption>
		<thead>
			<tr>

				<th>序号</th>
				<th>姓名</th>
				<th>胜</th>
				<th>进三</th>
				<th>总数</th>
				<th>胜率</th>
				<th>进三率</th>




			</tr>
		</thead>
		<tbody>
			<tr class="success">
				<td>1</td>
				<td>${current.name}</td>


				<td>${statistics.thirdWin}</td>


				<td>${statistics.third}</td>
				<td>${statistics.all}</td>



				<td><c:choose>
						<c:when test="${statistics.third==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.thirdWin/statistics.third}"></fmt:formatNumber>
						</c:otherwise>


					</c:choose></td>

				<td><c:choose>
						<c:when test="${statistics.all==0}">0</c:when>
						<c:otherwise>
							<fmt:formatNumber pattern="0.00"
								value="${statistics.third/statistics.all}"></fmt:formatNumber>
						</c:otherwise>


					</c:choose></td>






			</tr>

		</tbody>
	</table>


</div>
<!-- container over  -->
