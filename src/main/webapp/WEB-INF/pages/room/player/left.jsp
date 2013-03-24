<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<div class="span3">
	<div class="well sidebar-nav">
		<ul class="nav nav-list">
			<li class="nav-header">个人资料</li>
			<li id="leftNav_basic"><a
				href="/player/detail.do?uid=${user.id}">基本信息</a></li>
			<li class="nav-header">个性设置</li>
			<li id="leftNav_stageShow"><a
				href="/player/setting.do?type=stageShow">拉风出场秀</a></li>
			<li id="leftNav_expression"><a
				href="/player/setting.do?type=expression">神态随心变</a></li>
			<li id="leftNav_music"><a href="/player/setting.do?type=music">音乐伴我行</a></li>

			<li class="nav-header">财务</li>
			<li id="leftNav_moneyFlow_in">
				<a href="/money/flow.do?uid=${current.id}&type=in">现金流入</a></li>
			<li id="leftNav_moneyFlow_out"><a
				href="/money/flow.do?uid=${current.id}&type=out">现金流出</a></li>

			<li class="nav-header">打卡统计</li>
			<li id="leftNav_punch"><a
				href="/player/punchlist.do?uid=${current.id}">打卡线</a></li>
			<li class="nav-header">简化统计</li>
			<li id="leftNav_statistics"><a
				href="/player/statistics.do?uid=${current.id}&version=simple">胜负</a></li>
			<li class="nav-header">安全中心</li>
			<li id="leftNav_edit"><a href="/player/regedit.do?type=edit">修改密码</a></li>
			<li id="leftNav_email"><a href="/player/regedit.do?type=email">找回密码</a></li>
		</ul>
	</div>
	<!--/.well -->
</div>
<!--/span-->
<script src="/r/j-src/commons/left.js"></script>