<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!DOCTYPE HTML>
<head>
<title>Room</title>

<script src="/r/j-src/listall/roomInit.js?v=${frontVersion}"></script>
</head>

<body>
	<form:form modelAttribute="room" action="/m/form/init.do" method="post">
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
			<select name="version">
				<option value="simple_1.0"
					<c:if test="${room.version=='simple_1.0'}">selected="selected"</c:if>>简化</option>
				<%-- <option value="color_game_1.0"
					<css:if test="${room.version=='color_game_1.0'}">selected="selected"</css:if>>猜颜色</option>--%>
				<option value="mine_1.0"
					<c:if test="${room.version=='mine_1.0'}">selected="selected"</c:if>>多人扫雷[测试版]</option>
				<option value="video_1.0"
					<c:if test="${room.version=='video_1.0'}">selected="selected"</c:if>>一起看视频[测试版]</option>
			</select>
		</spring:bind>

		<%--设置:--%>
		<%--<css:forEach items="${room.setting}" var="entry"> --%>
		<%--<spring:bind path="${entry.key}"> </spring:bind>: <spring:bind path="${entry.value}"></spring:bind>--%>
		<%--</css:forEach>--%>

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
</body>
</html>
