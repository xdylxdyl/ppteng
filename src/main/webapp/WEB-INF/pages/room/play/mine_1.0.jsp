<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!doctype html>
<html>
<head>

<title>${room.name}</title>
<meta charset="utf-8">




<link rel="stylesheet"
	href="<%=request.getContextPath()%>/r/css/common/room.css?v=${frontVersion}">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/r/css/mine/mine.css?v=${frontVersion}">
<link rel="stylesheet"
	href="<%=request.getContextPath() %>/r/css/music.css?v=${frontVersion}">

<script src="/r/j-src/jquery/jquery-1.6.1.js"></script>


<script
	src="<%=request.getContextPath()%>/r/j-src/util/comet.js?v=${frontVersion}"></script>

<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil.js"></script>
<script
	src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath()%>/r/j-src/util/timeUtil.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/musicUtil.js?v=${frontVersion}"></script>

<script src="/r/j-src/mine/mine.js?v=${frontVersion}"></script>
<script src="/r/j-src/commons/model.js?v=${frontVersion}"></script>
<script src="/r/j-src/commons/view.js?v=${frontVersion}"></script>
<script src="/r/j-src/commons/service.js?v=${frontVersion}"></script>
<script src="/r/j-src/commons/base.js?v=${frontVersion}"></script>
<script src="/r/j-src/commons/action.js?v=${frontVersion}"></script>



<input type="hidden" id="uid" value="${uid}">
<!-- 玩家ID -->
<input type="hidden" id="rid" value="${room.id}">
<!-- 房间ID -->
<input type="hidden" id="version" value="${room.version}">
<input type="hidden" id="assign" value="">
<!-- 玩家角色 -->
<input type="hidden" id="time" value="over">
<!-- 游戏时间白天黑夜 -->
<input type="hidden" id="createrID" value="${room.createrID}">
<input type="hidden" id="type" value="game">
<input type="hidden" id="recordID" value="${record.id}">
<input type="hidden" id="recordTime" value="${record.time}">
<div id="contents" class="hidden">${contents}</div>


</head>

<body>

	<div id="music" class="hidden">${music}</div>

	<div id="music_play" class="music_play"></div>

	<div id="music_container" class="music_container">
		<img id="music_controller" src="/r/img/music/music.jpg">
	</div>

	<header>

		<div class="remainMine" id="remainMine">
			剩余雷数<span id="count"></span>
		</div>

		<div id="outer" class="outer">
			<div id="inner" class="inner"></div>
		</div>











	</header>
	<div class="line"></div>




	<article></article>






</body>

</html>