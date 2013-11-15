<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>

<tiles:insertDefinition name="commonCSSImport" />

<title>${room.name}-炸狼堡-葡萄藤轻游戏</title>

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
						<li class="active"><a href="#game_area" data-toggle="tab"
							auto-bottom>游戏</a></li>
						<li><a href="#description_area" data-toggle="tab">狼堡</a></li>
						<li><a href="#setting_area" data-toggle="tab">设置</a></li>
						<li><a href="#music_area" data-toggle="tab">音乐</a></li>
						<li><a href="#help_area" data-toggle="tab">帮助</a></li>


					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="game_area"></div>

						<div class="tab-pane" id="description_area">
							<div class="container-fluid">
								<div class="row-fluid">

									<div class="span12">
										<h3 id="detail_process"></h3>
									</div>
									<hr>
									<div class="span12">
										<h3 id="detail_1_h">
											一号狼堡 <span class="text-error" id="detail_1_result"></span>
										</h3>
										<div class="row-fluid">
											<div class="span4">
												<h3>第一次</h3>
												<p>
													村长:<span id="detail_1_1_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_1_1_member"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_1_1_dismissal"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_1_1_action"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第二次</h3>
												<p class="">
													村长:<span id="detail_1_2_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_1_2_member"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_1_2_dismissal"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_1_2_action"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第三次</h3>
												<p class="">
													村长:<span id="detail_1_3_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_1_3_member"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_1_3_dismissal"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_1_3_action"></span>
												</p>
											</div>
										</div>
									</div>
								</div>
								<hr>
								<div class="row-fluid">
									<div class="span12">
										<h3>
											二号狼堡 <span class="text-success"></span>
										</h3>
										<div class="row-fluid">
											<div class="span4">
												<h3>第一次</h3>
												<p>
													村长:<span id="detail_2_1_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_2_1_member"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_2_1_dismissal"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_2_1_action"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第二次</h3>
												<p class="">
													村长:<span id="detail_2_2_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_2_2_member"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_2_2_dismissal"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_2_2_action"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第三次</h3>
												<p class="">
													村长:<span id="detail_2_3_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_2_3_member"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_2_3_dismissal"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_2_3_action"></span>
												</p>
											</div>
										</div>
									</div>
								</div>
								<hr>
								<div class="row-fluid">
									<div class="span12">
										<h3>三号狼堡</h3>
										<div class="row-fluid">
											<div class="span4">
												<h3>第一次</h3>
												<p>
													村长:<span id="detail_3_1_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_3_1_member"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_3_1_dismissal"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_3_1_action"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第二次</h3>
												<p class="">
													村长:<span id="detail_3_2_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_3_2_member"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_3_2_dismissal"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_3_2_action"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第三次</h3>
												<p class="">
													村长:<span id="detail_3_3_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_3_3_member"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_3_3_dismissal"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_3_3_action"></span>
												</p>
											</div>
										</div>
									</div>
								</div>
								<hr>
								<div class="row-fluid">
									<div class="span12">
										<h3>四号狼堡</h3>
										<div class="row-fluid">
											<div class="span4">
												<h3>第一次</h3>
												<p>
													村长:<span id="detail_4_1_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_4_1_member>"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_4_1_dismissal>"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_4_1_action>"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第二次</h3>
												<p class="">
													村长:<span id="detail_4_2_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_4_2_member>"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_4_2_dismissal>"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_4_2_action>"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第三次</h3>
												<p class="">
													村长:<span id="detail_4_3_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_4_3_member>"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_4_3_dismissal>"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_4_3_action>"></span>
												</p>
											</div>
										</div>
									</div>
								</div>
								<hr>
								<div class="row-fluid">
									<div class="span12">
										<h3>五号狼堡</h3>
										<div class="row-fluid">
											<div class="span4">
												<h3>第一次</h3>
												<p>
													村长:<span id="detail_5_1_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_5_1_member>"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_5_1_dismissal>"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_5_1_action>"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第二次</h3>
												<p class="">
													村长:<span id="detail_5_2_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_5_2_member>"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_5_2_dismissal>"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_5_2_action>"></span>
												</p>
											</div>
											<div class="span4">
												<h3>第三次</h3>
												<p class="">
													村长:<span id="detail_5_3_king"></span>
												</p>
												<p class="">
													小组名单:<span id="detail_5_3_member>"></span>
												</p>
												<p class="">
													审核结果:<span id="detail_5_3_dismissal>"></span>
												</p>
												<p class="">
													行动结果:<span id="detail_5_3_action>"></span>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>




						</div>
						<div class="tab-pane" id="setting_area"></div>
						<div class="tab-pane" id="music_area">
							<tiles:insertDefinition name="musicList" />



						</div>

						<div class="tab-pane" id="help_area">
							<div class="hero-unit">

								<p></p>
								<p>
									<a
										href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=3399&page=1&extra=#pid14703"
										class="text-warning" target="_blank">1.炸狼堡规则&raquo;</a>
								</p>

								<p class="text-error">特别提示,游戏还在公测中.如果发现问题,可以先尝试刷新,如果能记录发生问题的情形并反馈给我,会更加感谢</p>

								<p class="text-success">简要帮助:</p>
								<p class="text-success">1.狼堡共五个,行动小组的人数为23233</p>
								<p class="text-success">2.小组中有一个人选择"不炸",行动就失败.三个狼堡失败,水民输</p>
								<p class="text-success">3.连续三次罢免村长,此次行动失败.</p>
								<p class="text-success">4.默认按对狼人有利规则.如到审核时间未投票,那么默认为不通过</p>
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
						<li class="active"><a href="#die_area" data-toggle="tab">观战</a></li>
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



<script
	src="<%=request.getContextPath() %>/r/j-src/game/wolf/burg/1.0/wolf_burg_1.0.js?v=${frontVersion}"></script>



