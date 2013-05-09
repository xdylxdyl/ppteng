<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>


<link href="/r/css/player/punchlist.css" rel="stylesheet">



<input type="hidden" id="role" value="${statistics.unZipRole}" />
<input type="hidden" id="maxKiller" value="${statistics.maxKiller}" />
<input type="hidden" id="maxWater" value="${statistics.maxWater}" />
<input type="hidden" id="uname" value="${current.name}" />

<!-- container start  -->
<div class="span9">
	<div class="hero-unit">
		<h1>自己是万年杀么?</h1>
	

		<p>此图可为炫耀万年杀的资本啊</p>
		
	 
		
	</div>
	<div id="container" class="span9"></div>
	

</div>
<!-- container over  -->

<script src="/r/j-src/framework/flotr2/flotr2.min.js"></script>
<script src="/r/j-src/util/line.js?v=1.0"></script>
<script src="/r/j-src/web/person/role.js"></script>
