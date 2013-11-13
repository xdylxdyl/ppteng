<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ include file="../../includes/includes.jsp"%>

<!DOCTYPE HTML>
<html ng-app="imgList">
<head>
<title>葡萄藤轻游戏"</title>
<meta name="keywords" content="杀人游戏,简化,警版,电影院,扫雷,多人扫雷">
<metaname
	="description"  content="葡萄藤是一个集杀人游戏,多人在线扫雷等多种休闲娱乐在一起的轻游戏网站,支持房主自定义神态,自定义背景音乐,和朋友或者是自己一起相处着这静静的时光">

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>


<body>




	<div class="container">
		<div class="row">
			<div class="span6 offset3">
				<form action="/player/login" method="post" class="login-box">
					<br> <br>
					<h3>使用您的注册邮箱/葡萄号登录:</h3>
					<label for="email">email</label> <input type="text" id="email"
						name="email" placeholder="邮箱/葡萄号" class="login email-input">
					<label for="password">密码</label> <input type="password"
						id="password" name="password"
						placeholder="Please enter your password here"
						class="login password-input">
					<c:if test="${code!=0}">
						<p class="hint">
							<spring:message code="${code}" />
						</p>
					</c:if>

					<div class="login-action">
						<span class="login-checkbox"><a
							href="/player/regedit?type=email">忘记密码</a></span>
						<button class="btn btn-primary btn-large pull-right">登录</button>
					</div>
				</form>
				<div class="login-social">
					<p>
						使用以下方式登录，或者 <a href="/player/regedit ">一分钟注册</a>
					</p>

					<form action="/player/qq/login" method="post"
						style="display: inline; margin-right: 1em">
						<a href="javascript:;" onclick="parentNode.submit();"><img
							src="/r/img/login/qq_connect_logo_7.png" class="" alt="QQ登录"></a>
					</form>
					<form action="/player/weibo/login" method="post"
						style="display: inline; margin-right: 1em">
						<a href="javascript:;" onclick="parentNode.submit();"><img
							src="/r/img/login/weibo_loginButton_16a.png" class="" alt="微博登录">微博登录</a>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- /banner -->


	
	<script type="text/javascript"
		src="/r/j-src/web/punch/punch.js?version=${frontVersion}"></script>


	<script
		src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>

	<script src="/r/j-src/web/index/index.js?v=${frontVersion}"></script>
	<script type="text/javascript"
		src="/r/j-src/framework/bootstrap/carousel.js"></script>
</body>
</html>

