<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!DOCTYPE HTML>
<head>
<title>Room</title>
<link href="/r/c/index.css" rel="stylesheet" />
<script src="/r/j-src/jquery/jquery-1.6.1.js"></script>
<script src="/r/j-src/listall/init.js"></script>
<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>
</head>

<body>


	<form:form modelAttribute="user" action="/player/regedit"
		method="post">
		<spring:bind path="user.id">
			<input name="id" value="${user.id}" id="id" type="hidden" readonly />
		</spring:bind>
		<h1>Regedit</h1>
		<div class="regedit_input">

			<label>用户名称：</label>

			<spring:bind path="user.name">
				<input name="name" id="name" value="${user.name}" type="input" />
			</spring:bind>
			<p id="reg_name_hint" class="email_hint"></p>


			<label>用户邮箱：</label>
			<spring:bind path="user.email">
				<input value="${user.email}" id="email" name="email" type="input" />
			</spring:bind>

			<p id="reg_email_hint" class="email_hint"></p>

			<label>用户密码：</label>
			<spring:bind path="user.password">
				<input value="${user.password}" id="password" name="password"
					type="password" />
			</spring:bind>

			<input class="action_silver" type="submit" id="submit" /> <a href="\" class="return">返回登录</a>


		</div>
		<div class="regedit_hint">
			<label class="red_hint"><spring:message code="${code}" /></label>
		</div>

	</form:form>



</body>
</html>
