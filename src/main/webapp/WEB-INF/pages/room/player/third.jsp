<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>





<div id="wrap">

	<!-- Begin page content -->
	<div class="container">
		<div class="page-header">
			<h1>您正在使用QQ登录葡萄藤</h1>
		</div>
		<p class="lead">
			正在为您登录,如果没有在3秒内自动跳转,请点击<a href="" id="login">这里</a>
		</p>
	</div>

	<div id="push"></div>
</div>
<script src="/r/j-src/framework/jquery/jquery-1.6.1.js"></script>
<script
	src="<%=request.getContextPath()%>/r/j-src/util/comet.js?v=${frontVersion}"></script>

<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil.js"></script>
<script
	src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
	
<script type="text/javascript"
src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" charset="utf-8" data-callback="true"></script>