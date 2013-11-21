
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<title>${room.name}-多人扫雷-葡萄藤轻游戏</title>
<tiles:insertDefinition name="commonCSSImport" />

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/r/css/mine/mine.css?v=${frontVersion}">


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
			<div class="span9">

				<div class="tabbable">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#mine_area" data-toggle="tab">多人扫雷</a></li>

						<li><a href="#setting_area" data-toggle="tab">设置</a></li>
						<li><a href="#music_area" data-toggle="tab">音乐</a></li>
						<li><a href="#help_area" data-toggle="tab">帮助</a></li>


					</ul>
					<div class="tab-content">


						<div class="tab-pane active" id="mine_area">
							<div id="saveMineArea">
								<label for="saveMineCheckBox" class="checkbox"> <input
									type="checkbox" value="scroll" id="saveMineCheckBox">
									保存雷图
								</label>
								<div id="previewHint">
									<div class="alert">
										<button type="button" class="close" data-dismiss="alert"
											id="closePreview">×</button>
										<h4>预览雷图</h4>
										鼠标点击雷图,以鼠标为中心点，自动生成7*7的雷图预览，关闭预览重新回到页面。
									</div>
									<div class="outer">

										<div class="inner" id="innerDemo"></div>

									</div>
								</div>


							</div>


							<div class="outer">

								<div class="inner" id="inner"></div>

							</div>
						</div>
						<div class="tab-pane" id="setting_area"></div>

						<div class="tab-pane" id="music_area">
							<tiles:insertDefinition name="musicList" />



						</div>

						<div class="tab-pane" id="help_area">
							<div class="hero-unit">

								<p>多人扫雷协作版</p>


							</div>


						</div>


						<!-- advertise -->




						<!-- end of tab-content -->



					</div>
				</div>
			</div>

			<div class="span3">

				<div class="tabbable death">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#game_area" data-toggle="tab">聊天</a></li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active lined-paper" id="game_area"></div>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>




<tiles:insertDefinition name="commonJSImport" />
<script src="/r/j-src/game/mine/mine.js?v=${frontVersion}"></script>



