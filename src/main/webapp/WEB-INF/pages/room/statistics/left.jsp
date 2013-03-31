<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<div class="span3">
   		<tiles:insertDefinition name="currentUserHint" />
	<div class="well sidebar-nav">
		<ul class="nav nav-list">			

			<li class="nav-header">打卡统计</li>
			<li id="leftNav_punch"><a
				href="/player/punchlist.do?uid=${current.id}">打卡线</a></li>
			<li class="nav-header">简化统计</li>
			<li id="leftNav_statistics"><a
				href="/player/statistics.do?uid=${current.id}&version=statistics">总计</a></li>
				<li id="leftNav_statistics_third"><a
				href="/player/statistics.do?uid=${current.id}&version=statistics_third">三人局</a></li>			
		</ul>
	</div>
	<!--/.well -->
</div>
<!--/span-->
<script src="/r/j-src/commons/left.js"></script>