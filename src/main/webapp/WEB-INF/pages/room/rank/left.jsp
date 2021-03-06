<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<div class="span3">
	<div class="well sidebar-nav">
		<ul class="nav nav-list">
			<li class="nav-header">社区榜单</li>
			<li id="leftNav_money"><a href="/rank/list?type=money">炫富榜</a></li>
			<li id="leftNav_punch"><a href="/rank/list?type=punch">勤奋打卡榜</a></li>
			<li class="nav-header">简化榜单</li>
			<li id="leftNav_simple"><a
				href="/rank/statistics?type=simple&query=win&secondQuery=all">胜负总榜</a></li>
			<li id="leftNav_simple_water"><a
				href="/rank/statistics?type=simple_water&query=waterWin&secondQuery=water">全部水王</a></li>
			<li id="leftNav_simple_killer"><a
				href="/rank/statistics?type=simple_killer&query=killerWin&secondQuery=killer">全部杀王</a></li>
			<li id="leftNav_simple_role"><a
				href="/rank/statistics?type=simple_role&query=killer&secondQuery=all">身份榜</a></li>
			<li id="leftNav_simple_water_third"><a
				href="/rank/statistics?type=simple_water_third&query=waterThirdWin&secondQuery=waterThird">三人水王</a></li>
			<li id="leftNav_simple_killer_third"><a
				href="/rank/statistics?type=simple_killer_third&query=killerThirdWin&secondQuery=killerThird">三人杀王</a></li>
			<li id="leftNav_simple_third"><a
				href="/rank/statistics?type=simple_third&query=thirdWin&secondQuery=third">三人总榜</a></li>
			<li class="nav-header">扫雷榜单</li>
			<li id="leftNav_level0"><a
				href="/mine/statistics/level0">初级</a></li>
			<li id="leftNav_level1"><a
				href="/mine/statistics/level1">中级</a></li>
				<li id="leftNav_level2"><a
				href="/mine/statistics/level2">高级</a></li>
				<li id="leftNav_level3"><a
				href="/mine/statistics/level3">仙级</a></li>
				<li id="leftNav_level4"><a
				href="/mine/statistics/level4">神级</a></li>
		</ul>
	</div>
	<!--/.well -->
</div>
<!--/span-->
