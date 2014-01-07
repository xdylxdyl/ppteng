<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!doctype html>
<html ng-app="myApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">


<link href="/r/j-src/framework/bootstrap/3.0.2/bootstrap.min.css"
	rel="stylesheet">
<link href="/r/j-src/framework/grumble/css/grumble.min.css"
	rel="stylesheet">
	<link href="/r/j-src/framework/bootstrap/bootstrap-multiselect2.css"
	rel="stylesheet">
<link rel="stylesheet" href="/r/css/animate/animate.min.css">
<link href="/r/css/bootstrap-multiselect.css" rel="stylesheet">
<link href="/r/css/room/3.0/style.css" rel="stylesheet">

<input type="hidden" id="bootstrapVersion" value="3">
<input type="hidden" id="switchFrom" value="${switchFrom}">
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
<input type="hidden" id="type" value="${type}">
<input type="hidden" id="recordID" value="${record.id}">
<input type="hidden" id="recordTime" value="${record.time}">
<input type="hidden" id="first" value="${first}">
<div id="stageShow" class="hide">${stageShow}</div>
<div id="contents" class="hide">${contents}</div>

<div id="escape" class="hide"></div>


<script type="text/javascript"
	src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript"
	src="/r/j-src/framework/bootstrap/bootstrap-dropdown.js"></script>
<script type="text/javascript"
	src="/r/j-src/framework/bootstrap/bootstrap-tab.js"></script>
<script type="text/javascript"
	src="/r/j-src/framework/bootstrap/bootstrap-modal.js"></script>
	<script type="text/javascript"
	src="/r/j-src/framework/bootstrap/bootstrap-multiselect2.js"></script>
<script type="text/javascript"
	src="/r/j-src/framework/bootstrap/3.0.2/bootstrap.min.js"></script>
<script type="text/javascript"
	src="/r/j-src/framework/bootstrap/bootstrap-tooltip.js"></script>
<script type="text/javascript" src="/r/j-src/framework/kibo/kibo.js"></script>
<script type="text/javascript"
	src="/r/j-src/framework/audio/audio.min.js"></script>
<script src="/r/j-src/framework/angular/angular.min.js"></script>
<script src="/r/j-src/framework/bootstrap/box/bootbox.min.js"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/2.0/common_util.js?v=${frontVersion}"></script>

	
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/3.0/common_game.js?v=${frontVersion}"></script>


</head>
<body>

	<div class='my-fluid-container'>
		<div class='row header'>
			<tiles:insertAttribute name="header" />
		</div>
		<div class='row'>

			<tiles:insertAttribute name="body" />

		</div>
		<div class='row foot'>

			<tiles:insertAttribute name="footer" />

		</div>
	</div>





</body>
</html>