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
					<%--<li><a class="unready">一个闲人</a><img alt="人" src="/r/img/icon_sex.gif"/><span>（管理员）</span></li>--%>
					<%--<li><a class="ready">一个准备的男人</a><img alt="男人" src="/r/img/icon_sex_male.gif"/><img>+1</img></li>--%>
					<%--<li><a class="living">一个活的女人</a><img alt="女人" src="/r/img/icon_sex_female.gif"/></li>--%>
					<%--<li><a class="dead">一个死人</a><img alt="人" src="/r/img/icon_sex.gif"/></li>--%>
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
