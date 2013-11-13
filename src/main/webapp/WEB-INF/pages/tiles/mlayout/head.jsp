<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<div class="col-sm-12 well header clickHide" id='roomHeader'>


	<h3>
		<span id="playerRole">杀手</span> <small><span id="gamePhase">未开始</span>
			</span> <span class="brand"> </span> <span class="brand"> <small
				id="playerRole"></small>
		</span> <span class="brand"> <small id="playerCard"></small>
		</span> <span class="brand"> <span id="count"></span></span> </small>
	</h3>
	<div class="btn-toolbar" role="toolbar">
		<button type="button" class="btn btn-primary" id="readyButton">准备</button>
		<button type="button" class="btn btn-primary" id="startButton">开始</button>

		<button type="button" class="btn  btn-danger pull-right"
			id="exitButton">退出</button>

		<a
			href="/m/play/enter.do?rid=${room.id}&uid=${uid}&from=${switchFrom}"
			id="fromButton" rel="tooltip" title="切换访问模式"
			data-original-title="切换访问模式" data-placement="bottom">宽屏</a>

	</div>


</div>
<span id="countDown" class="badge fixTop">04:00</span>
