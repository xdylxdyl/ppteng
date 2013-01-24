<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!DOCTYPE HTML>
<head>
<title>葡萄藤轻游戏-注册</title>
<script src="/r/j-src/jquery/jquery-1.6.1.js"></script>
<script src="/r/j-src/listall/init.js"></script>
<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>
<!-- Le styles -->

<link href="/r/css/reboot.css" rel="stylesheet">
<link href="/r/css/theme.css" rel="stylesheet">
</head>

<body>

	<div class="signin">
		<div class="content clearfix">
			<form:form modelAttribute="user" action="/player/regedit.do" method="post">



				<spring:bind path="user.id">
					<input name="id" value="${user.id}" id="id" type="hidden" readonly />
				</spring:bind>

				<h1>Create Your Account</h1>
				<div class="signin-social">
					<p>第三方注册</p>
					<a href="#"><img src="/r/img/qq_login.png" alt=""></a> <a
						href="#"><img src="/r/img/weibo_login.png" alt=""></a>
				</div>

				<div class="signin-action">
					<p>一分钟注册:</p>
					<label for="name">name</label>
					<spring:bind path="user.name">
					<input type="text" id="name" name="name" placeholder="Name" class="sign" value="${user.name}"> 
					</spring:bind>
					<label for="email">email</label> 
					<spring:bind path="user.email">
					<input type="text" id="email" name="email" placeholder="Email" class="sign" value="${user.email}">
					</spring:bind>
					
					<label for="password">password</label>
					<spring:bind path="user.password">
					 <input type="password" id="password" 	name="password" placeholder="Password" class="sign"  value="${user.password}">		
					</spring:bind>		
				</div>
				<div class="signin-action">
					<input class="btn btn-primary btn-large pull-right" type="submit" id="submit" />
				</div>
				<div id="escape"></div>
				

<%-- 
				<label>用户名称：</label>

				<spring:bind path="user.name">
					<input name="name" id="name" value="${user.name}" type="input"
						placeholder="Name" class="sign" />
				</spring:bind>
				<p id="reg_name_hint" class="email_hint"></p>


				<label>用户邮箱：</label>
				<spring:bind path="user.email">
					<input value="${user.email}" id="email" name="email" type="input"
						placeholder="Name" class="sign" />
				</spring:bind>

				<p id="reg_email_hint" class="email_hint"></p>

				<label>用户密码：</label>
				<spring:bind path="user.password">
					<input value="${user.password}" id="password" name="password"
						type="password" placeholder="Password" class="sign" />
				</spring:bind>

				<div class="signin-action">
					<input class="btn btn-primary btn-large pull-right" type="submit"
						id="submit" />

				</div> --%>
				<a href="/" class="return">返回登录</a>
		</div>
		<div class="regedit_hint">
			<label class="hint" id="reg_hint"><spring:message code="${code}" /></label>
		</div>
		</form:form>
	</div>
	</div>





</body>
</html>
