<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!DOCTYPE HTML>
<head>
<title>Room</title>

</head>

<body>
	<form:form modelAttribute="room" action="/m/form/init " method="post">
		<spring:bind path="room.id">
			<input name="id" value="${room.id}" type="hidden" readonly />
		</spring:bind>
		<spring:bind path="room.createrID">
			<input name="createrID" value="${room.createrID}" type="hidden"
				readonly />
		</spring:bind>

		<label>房间名称：</label>
		<spring:bind path="room.name">
			<input value="${status.value}" id="inputtext" name="name" type="text"
				class="text" />
		</spring:bind>
		<br />
		<label>游戏版本：</label>
		<spring:bind path="room.version">
			<select name="version" id="versionSelect">
				<option value="simple_1.0"
					<c:if test="${room.version=='simple_1.0'}">selected="selected"</c:if>>杀人游戏[简化]</option>
				<option value="killer_police_1.0"
					<c:if test="${room.version=='killer_police_1.0'}">selected="selected"</c:if>>杀人游戏[警版]</option>
			   <option value="killer_police_secret_1.0"
					<c:if test="${room.version=='killer_police_secret_1.0'}">selected="selected"</c:if>>杀人游戏[警版不翻牌]</option>
				<option value="mine_1.0"
					<c:if test="${room.version=='mine_1.0'}">selected="selected"</c:if>>多人扫雷</option>
				<option value="video_1.0"
					<c:if test="${room.version=='video_1.0'}">selected="selected"</c:if>>虚拟电影院</option>
					<option value="ghost_simple_1.0"
					<c:if test="${room.version=='ghost_simple_1.0'}">selected="selected"</c:if>>捉鬼[简化]</option>
					<option value="ghost_question_1.0"
					<c:if test="${room.version=='ghost_question_1.0'}">selected="selected"</c:if>>捉鬼[猜词]</option>
					<option value="ghost_soul_1.0"
					<c:if test="${room.version=='ghost_soul_1.0'}">selected="selected"</c:if>>捉鬼[魂版]测试版</option>
					
				<option value="rest_1.0"
					<c:if test="${room.version=='rest_1.0'}">selected="selected"</c:if>>茶座休息室</option>	
			</select>
		</spring:bind>

		

		<br />
		<br />
		<input class="btn btn-primary" type="submit" value="创建房间"
			id="roomSubmit" />
		<a href="" id="modal-close" class="btn">取消</a>
		


		<br />
		<br />
		<P class="c-green" id="roomSubmitHint">
			测试期间每局游戏获取1000葡萄币~~~~<br>测试版不保证游戏可以正常使用,遇到错误,退出重新登录即可
			
		</P>
	</form:form>
	<div id="mask"></div>
	
	
<script src="/r/j-src/web/listall/roomInit.js?v=${frontVersion}"></script>
</body>
</html>
