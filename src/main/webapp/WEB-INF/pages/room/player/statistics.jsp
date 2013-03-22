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
				<th>赢</th>
				<th>输</th>
				<th>总局数</th>
			</tr>
		</thead>
		<tbody>
			<tr class="success">
				<td>1</td>
				<td>${user.name}</td>
				<td>${statistics.win}</td>
				<td>${statistics.lose}</td>
				<td>${statistics.all}</td>
			</tr>
			
		</tbody>
	</table>



</div>
<!-- container over  -->
