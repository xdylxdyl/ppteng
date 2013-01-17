<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!doctype html>
<html>
<head>
<title>${room.name}</title>
<meta charset="utf-8">

<link rel="stylesheet" href="<%=request.getContextPath() %>/r/c/kill/room.css?v=${frontVersion}">
<script src="<%=request.getContextPath() %>/r/j-src/jquery/jquery-1.6.1.js"></script>
<script src="<%=request.getContextPath() %>/r/j-src/commons/model.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath() %>/r/j-src/commons/service.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath() %>/r/j-src/commons/base.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath() %>/r/j-src/commons/action.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath() %>/r/j-src/room/accept.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath() %>/r/j-src/room/view.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath() %>/r/j-src/commons/view.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath() %>/r/j-src/util/comet.js?v=${frontVersion}"></script>

<script src="<%=request.getContextPath() %>/r/j-src/util/httpUtil.js"></script>
<script src="<%=request.getContextPath() %>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath() %>/r/j-src/util/timeUtil.js?v=${frontVersion}"></script>

<input type="hidden" id="uid" value="${uid}"> <!-- 玩家ID -->
<input type="hidden"  id="rid" value="${room.id}"><!-- 房间ID -->
<input type="hidden" id="version" value="${room.version}">
<input type="hidden" id="assign" value=""><!-- 玩家角色 -->
<input type="hidden" id="time" value="over"><!-- 游戏时间白天黑夜 -->
<input type="hidden" id="createrID" value="${room.createrID}">
<input type="hidden" id="type" value="${type}">
<input type="hidden" id="recordID" value="${record.id}">
<input type="hidden" id="recordTime" value="${record.time}">
<div id="contents" class="hidden">${contents}</div>
</head>

<body>

	<header>
		<div class="role_area" id="role_area">
			<span class="phase_area" id="phase_area" style="color: #F00"></span>
		</div>
		<div class="dead_area" id="dead_area"></div>
		<div class="killer_area"></div>
	</header>
	<div class="line"></div>
	<article></article>


</body>
</html>