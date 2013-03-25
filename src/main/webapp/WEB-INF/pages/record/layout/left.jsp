<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<div class="span3">
	<div class="well sidebar-nav">
		<ul class="nav nav-list">
			
			<li class="nav-header">简化统计</li>
			<li id="leftNav_statistics"><a
				href="/player/statistics.do?uid=${current.id}&version=simple">胜负</a></li>
			<li class="nav-header">简化战例</li>			
			<li id="leftNav_record"><a href="/player/regedit.do?type=email">找回密码</a></li>
		</ul>
	</div>
	<!--/.well -->
</div>
<!--/span-->
<script src="/r/j-src/commons/left.js"></script>