<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>


<title>${room.name}-警版-葡萄藤轻游戏</title>

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



<!--main-->
<div class="content" id="content">

	<div class="tabbable">
		<ul class="nav nav-tabs">
			<li><a href="#player_list" data-toggle="tab">玩家</a></li>
			<li class="active"><a href="#game_area" data-toggle="tab" auto-bottom>游戏</a></li>
			<li class=""><a href="#die_area" data-toggle="tab" auto-bottom>亡灵</a></li>

			<li><a href="#setting_area" data-toggle="tab">设置</a></li>
			<li><a href="#music_area" data-toggle="tab">音乐</a></li>
			<li><a href="#help_area" data-toggle="tab">帮助</a></li>
		</ul>
		<div class="tab-content">

			<div class="tab-pane" id="player_list">
					<tiles:insertDefinition name="playerList" />
			</div>
			<div class="tab-pane active" id="game_area"></div>


			<div class="tab-pane" id="setting_area"></div>
			<div class="tab-pane" id="music_area">
				<tiles:insertDefinition name="musicList" />



			</div>

			<div class="tab-pane" id="help_area">
				<div class="hero-unit">

					<p></p>
					<p>
						<a href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=15"
							class="text-warning" target="_blank">1.简化术语表 &raquo;</a>
					</p>
					<p>
						<a
							href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=125&fromuid=4"
							class="text-warning" target="_blank">2.[二六八活动]索引贴 &raquo;</a>
					</p>

				</div>


			</div>

			<div class="tab-pane" id="die_area"></div>



			<!-- end of tab-content -->


		</div>
	</div>
</div>








<tiles:insertDefinition name="commonJSImport" />
<!--侦测键盘-->
<script type="text/javascript"
	src="/r/j-src/framework/audio/audio.min.js"></script>


<script
	src="<%=request.getContextPath() %>/r/j-src/web/music/music.js?v=${frontVersion}"></script>

<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/model.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/service.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/base.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/action.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/kill/accept.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/kill/view.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/view.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/comet.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/timeUtil.js?v=${frontVersion}"></script>

<script
	src="<%=request.getContextPath() %>/r/j-src/web/foot/foot.js?v=${frontVersion}"></script>

