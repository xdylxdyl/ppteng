<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>


<!--left list-->

<div class="col-md-2" id="sidebar-nav">
	<div class="well autoheight_area">		
		<ul class="nav nav-list sidebar-nav" id="playerList">


		</ul>
		<div class="sidebar-toggle" id="sidebar-toggle">-</div>
	</div>
</div>

<!--main-->
<div class="col-md-10 tabbable content autoheight_area" id="mainArea">	

		

			<div class="">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#game_area" data-toggle="tab"
						auto-bottom>游戏</a></li>
					<li><a href="#description_area" data-toggle="tab">狼堡</a></li>
					<li><a href="#setting_area" data-toggle="tab">设置</a></li>
					<li><a href="#music_area" data-toggle="tab">音乐</a></li>
					<li><a href="#help_area" data-toggle="tab">帮助</a></li>


				</ul>
				<div class="tab-content">
					<div class="tab-pane active lined-paper" id="game_area"></div>

					<div class="tab-pane" id="description_area"></div>
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
			<div></div>



		</div>







<div id="secondArea" class="autoheight_area col-md-3 hide">

	  <div class="content autoheight_area">
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



<script
	src="<%=request.getContextPath() %>/r/j-src/game/wolf/burg/1.0/wolf_burg_1.0.js?v=${frontVersion}"></script>