<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>

<tiles:insertDefinition name="commonCSSImport" />

<title>${room.name}-DIY游戏室-葡萄藤轻游戏</title>

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



<!--left list-->
<div class="sidebar-nav" id="sidebar-nav">
	<ul class="nav nav-list" id="playerList">


	</ul>
	<div class="sidebar-toggle" id="sidebar-toggle">-</div>
</div>

<!--main-->
<div class="content" id="content">
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span12" id="mainArea">

				<div class="tabbable">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#game_area" data-toggle="tab" auto-bottom>游戏</a></li>						
						<li><a href="#setting_area" data-toggle="tab">设置</a></li>
						<li><a href="#music_area" data-toggle="tab">音乐</a></li>
						<li><a href="#help_area" data-toggle="tab">帮助</a></li>


					</ul>
					<div class="tab-content">
					
						<div class="tab-pane active lined-paper christmas_background tree" id="game_area"></div>
						
						
						<div class="tab-pane" id="setting_area"></div>
						<div class="tab-pane" id="music_area">
							<tiles:insertDefinition name="musicList" />



						</div>

						<div class="tab-pane" id="help_area">
							<div class="hero-unit">

								
							</div>






						</div>

						<!-- advertise -->




						<!-- end of tab-content -->


					</div>


				</div>
			</div>

			<div id="secondArea" class="hide">

				<div class="tabbable death">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#die_area" data-toggle="tab">旁观</a></li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="die_area"></div>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>



<tiles:insertDefinition name="commonJSImport" />
<%-- 
	<script
	src="<%=request.getContextPath() %>/r/j-src/util/snow.js?v=${frontVersion}"></script> --%>

<script
	src="<%=request.getContextPath() %>/r/j-src/game/labs/diy/1.0/labs_diy_1.0.js?v=${frontVersion}"></script>

