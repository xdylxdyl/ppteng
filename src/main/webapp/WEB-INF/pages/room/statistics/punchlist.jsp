<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<link href="/r/css/player/punchlist.css" rel="stylesheet">
<title>打卡统计-${current.name}-葡萄藤轻游戏</title>


<input type="hidden" id="punch" value="${punch}" />
<input type="hidden" id="punchStart" value="${punchStart}" />
<input type="hidden" id="punchStart" value="${punchStart}" />
<input type="hidden" id="uname" value="${user.name}" />

<!-- container start  -->
<div class="span9">
	<div class="hero-unit">
		<h1>如何通过打卡获取更多金币?</h1>

		<p>除获取基本金币以外</p>
		
		<p>连续打卡的天数越多,获得的金币越多</p>

		<p>若完成打卡成就,更可获取大笔金币</p>
	</div>
	<div id="container" class="span9"></div>

</div>
<!-- container over  -->

<script src="/r/j-src/framework/flotr2/flotr2.min.js"></script>
<script src="/r/j-src/util/line.js?v=1.0"></script>
<script src="/r/j-src/web/person/punchlist.js"></script>
