<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/flotr2/flotr2.min.js"></script>
<script src="/r/j-src/util/line.js?v=1.0"></script>
<script src="/r/j-src/person/punchlist.js"></script>
<link href="/r/css/player/punchlist.css" rel="stylesheet">



<input type="hidden" id="punch" value="${punch}" />
<input type="hidden" id="punchStart" value="${punchStart}" />
<input type="hidden" id="punchStart" value="${punchStart}" />
<input type="hidden" id="uname" value="${user.name}" />

<!-- container start  -->
<div class="span9">
	<div class="hero-unit">
		<h1>如何通过打卡获取更多金币?</h1>

		
		
		<p>连续打卡的天数越多,获得的金币越多</p>

		<p>周打卡次数超过5天,可获取更多金币</p>
	</div>
	<div id="container" class="span9"></div>

</div>
<!-- container over  -->
