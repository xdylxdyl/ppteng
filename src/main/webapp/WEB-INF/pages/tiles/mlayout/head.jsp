<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<div class="navbar">
	<div class="navbar-inner">

		<span class="brand"> <small><a
				href="/player/detail?uid=${room.createrID}" id="createName"></a></small>
		</span> <span class="brand"> <small id="gamePhase"></small>
		</span> <span class="brand"> <small id="playerRole"></small>
		</span> <span class="brand"> <small id="playerCard"></small>
		</span>
		<span class="brand"><span id="count"></span></span>
		<ul class="nav pull-right">
			<li><a
				href="/m/play/enter.do?rid=${room.id}&uid=${uid}&from=${switchFrom}"
				id="fromButton" rel="tooltip" title="切换访问模式(手机/电脑)"
				data-original-title="切换访问模式(手机/电脑)" data-placement="bottom">手机/电脑</a></li>
			<li><a href="#" id="exitButton" rel="tooltip" title="点此离开房间"
				data-original-title="点此离开房间" data-placement="bottom">退出房间 <i
					class="icon-off"></i></a></li>
		</ul>
	</div>
</div>
