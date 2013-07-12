<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>

<title>${room.name}-虚拟电影院-葡萄藤轻游戏</title>

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
			<li class="active"><a href="#video_area" data-toggle="tab" >电影</a></li>
			<li class=""><a href="#game_area" data-toggle="tab" auto-bottom>小树林</a></li>
			<li><a href="#setting_area" data-toggle="tab">设置</a></li>
		</ul>
		<div class="tab-content">

			<div class="tab-pane" id="player_list">
					<tiles:insertDefinition name="playerList" />
			</div>
			<div class="tab-pane active" id="video_area">
				<!--新添视频部分-->
				<div class="video">
					<blockquote>
						<p>葡萄藤虚拟电影院</p>
						<small>这样的一个夜晚.有你有我.</small>

					</blockquote>
					<div class="video-player" id="outer">
						<!--从网页中找到的部分-->
						<embed
							src="http://player.youku.com/player.php/sid/XNTI2NjI3MTY4/v.swf"
							allowFullScreen="true" quality="high" width="480" height="400"
							align="middle" allowScriptAccess="always"
							type="application/x-shockwave-flash"></embed>
					</div>
				</div>
				<!--新添视频部分结束-->
			</div>
			<div class="tab-pane" id="setting_area"></div>
			<div class="tab-pane" id="game_area"></div>
		</div>
		<!-- end of tab-content -->
	</div>

</div>








<tiles:insertDefinition name="commonJSImport" />

<script src="/r/j-src/game/video/video.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/model.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/service.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/base.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/game/commons/action.js?v=${frontVersion}"></script>
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





