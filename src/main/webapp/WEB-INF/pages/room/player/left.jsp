<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<div class="span3">

  		<tiles:insertDefinition name="currentUserHint" />
	<div class="well sidebar-nav">
		<ul class="nav nav-list">
			<li class="nav-header">个人资料</li>
			<li id="leftNav_basic"><a
				href="/player/detail?uid=${current.id}">基本信息</a></li>
			<li class="nav-header">个性设置</li>
			<li id="leftNav_stageShow"><a
				href="/player/setting?type=stageShow&uid=${current.id}">拉风出场秀</a></li>
			<li id="leftNav_expression"><a
				href="/player/setting?type=expression&uid=${current.id}">神态随心变</a></li>
			<li id="leftNav_music"><a
				href="/player/setting?type=music&uid=${current.id}">音乐伴我行</a></li>
			<c:if test="${current.id==selfID}">
				<li class="nav-header">安全中心</li>
				<li id="leftNav_edit"><a href="/player/regedit?type=edit">修改密码</a></li>
				<li id="leftNav_email"><a href="/player/regedit?type=email">找回密码</a></li>
			</c:if>
			<li class="nav-header">查找用户</li>
			<li id="leftNav_search"><a href="/player/search ">查找用户</a></li>
		</ul>
	</div>
	<!--/.well -->
</div>
<!--/span-->
<script src="/r/j-src/commons/left.js"></script>