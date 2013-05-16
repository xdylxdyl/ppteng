<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<div class="span3">

	<tiles:insertDefinition name="currentUserHint" />
	<div class="well sidebar-nav">
		<ul class="nav nav-list">
			
			<li class="nav-header">全部</li>
			<li id="nav_all"><a
				href="/record/list?version=all&uid=${uid}">全部版本</a></li>	
	
			<li class="nav-header">杀人游戏</li>			
			<li id="nav_simple_1"><a href="/record/list?version=simple_1&uid=${uid}">简化</a></li>
			<li id="nav_killer_police_1"><a href="/record/list?version=killer_police_1&uid=${uid}">警版</a></li>
			<li id="nav_killer_police_secret_1"><a href="/record/list?version=killer_police_secret_1&uid=${uid}">警版不翻牌</a></li>
			<li class="nav-header">捉鬼游戏</li>		
			<li id="nav_ghost_simple_1"><a href="/record/list?version=ghost_simple_1&uid=${uid}">简版</a></li>
			<li id="nav_ghost_question_1"><a href="/record/list?version=ghost_question_1&uid=${uid}">猜词版</a></li>
			<li id="nav_ghost_soul_1"><a href="/record/list?version=ghost_soul_1&uid=${uid}">魂版</a></li>
			<li class="nav-header">扫雷</li>		
			<li id="nav_mine_1"><a href="/record/list?version=mine_1&uid=${uid}">多人扫雷</a></li>
		
		</ul>
	</div>
	<!--/.well -->
</div>
<!--/span-->
<script src="/r/j-src/game/commons/left.js"></script>

