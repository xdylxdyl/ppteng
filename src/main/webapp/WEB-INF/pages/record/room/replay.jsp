<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!doctype html>
<html>
<head>
<script type="text/javascript">document.domain='gemantic.com';</script>
<title>${room.name}</title>
<meta charset="utf-8">
<!--[if IE]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/r/c/room.css">
<script
	src="<%=request.getContextPath()%>/r/j-src/jquery/jquery-1.6.1.js"></script>
<script
	src="<%=request.getContextPath()%>/r/j-src/record/controller.js"></script>
	
	<script src="<%=request.getContextPath() %>/r/j-src/room/model.js?v=0.6"></script>
<script src="<%=request.getContextPath() %>/r/j-src/room/service.js?v=0.8"></script>
<script src="<%=request.getContextPath() %>/r/j-src/room/base.js?v=0.8"></script>
<script src="<%=request.getContextPath() %>/r/j-src/room/accept.js?v=1.0"></script>
<script src="<%=request.getContextPath() %>/r/j-src/room/action.js?v=1.1"></script>
<script src="<%=request.getContextPath() %>/r/j-src/room/view.js?v=0.7"></script>
<script src="<%=request.getContextPath() %>/r/j-src/util/comet.js?v=0.4"></script>

<script src="<%=request.getContextPath() %>/r/j-src/util/httpUtil.js"></script>
<script src="<%=request.getContextPath() %>/r/j-src/util/httpUtil2.js"></script>

</head>



<body>

	<div id="contents">${contents}</div>

	<div id="container">
		<div class="clearfix">
			<nav>
				<article></article>
				<div class="line"></div>
				<ul>
					<b>===== 玩家列表 =====</b>					
				</ul>
			</nav>

			<section>
				<header>
					<div class="dead_area"></div>
					<div class="killer_area"></div>
				</header>
				<div class="line"></div>
				<article></article>
			</section>
		</div>


	</div>


</body>
</html>
