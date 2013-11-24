<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="author" content="chill">
<!-- baidu -->

<meta name="baidu-site-verification" content="04YDpDPg12" />
<!-- bing -->
<meta name="msvalidate.01" content="51CEFB2B69018B64000F7820DB27B187" />
<!-- qq -->
<meta property="qc:admins" content="540035117760445676375" />
<!-- sina -->
<meta property="wb:webmaster" content="d87661ee04c7da95" />

<meta name="keywords" content="杀人游戏,简化,在线杀人,线杀,扫雷,多人扫雷">
<metaname
	="description"  content="葡萄藤是一个集杀人游戏,多人在线扫雷等多种休闲娱乐在一起的轻游戏网站,支持房主自定义神态,自定义背景音乐,和朋友或者是自己一起相处着这静静的时光">
<!-- Le styles -->
<link href="/r/css/bootstrap.css" rel="stylesheet">
<link href="/r/css/bootstrap-responsive.css" rel="stylesheet">
<link href="/r/css/reboot.css" rel="stylesheet">
<link href="/r/css/theme.css" rel="stylesheet">
<link href="/r/css/layout/header.css" rel="stylesheet">
</head>


<div class="container preheader">
	<div class="mobinav" id="mobinav">
		<i class="icon-th-list icon-white"></i>
	</div>
	<ul id="firstHead" class="social">

		<li><a href="http://bbs.ptteng.com/forum.php" target="_blank">论坛</a></li>
		<li><a href="http://ptteng.lofter.com/" target="_blank">博客</a></li>
		<li id="nav_favorite"><a
			href="javascript:AddFavorite('http://www.ptteng.com/','葡萄藤')">收藏</a></li>
		<li id="nav_quit"><a href="/player/offline" id="navLogout">退出</a></li>
	</ul>
</div>
<div class="header clearfix">
	<div class="container">
		<div id="main_menu" class="smoothmenu">
			<ul>
				<li id="nav_index"><a href="/">首页</a></li>
				<li id="nav_game"><a href="/m/list ">游戏</a></li>
				<li id="nav_rank"><a href="/rank/list?type=money">排行</a></li>
				<li id="nav_statistics"><a href="/player/statistics ">统计</a></li>
				<li id="nav_case"><a href="/record/list?version=all">战例</a></li>
				<li id="nav_person"><a href="/player/detail">设置</a></li>
				<li id="nav_financial"><a href="/money/flow ">财务</a></li>
				<li id="nav_tool"><a href="/tool/news">工具</a></li>
				<li id="nav_about"><a href="/about?type=about">帮助</a></li>
			</ul>
		</div>
		<div id="logo">
			<a href="/"><img src="/r/img/logo.png" alt=""></a>
		</div>
	</div>
</div>






<!--[if lte IE 9]>
<script type="text/javascript"
	src="http://libs.baidu.com/jquery/1.8.3/jquery.min.js"></script>	
<![endif]-->

<script type="text/javascript"
	src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>

<script type="text/javascript"
	src="/r/j-src/util/html5Check.js?v=${frontVersion}"></script>



<script
	src="<%=request.getContextPath() %>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>

<script src="/r/j-src/web/foot/head_view.js"></script>

</body>
</html>