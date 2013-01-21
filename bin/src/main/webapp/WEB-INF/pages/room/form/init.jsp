<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!DOCTYPE HTML>
<head>
<title>Room</title>
<script src="/r/j-src/jquery/jquery-1.6.1.js"></script>
<script src="/r/j-src/listall/init.js"></script>
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
		<span></span>
		<br />
		<label>游戏版本：</label>
		<spring:bind path="room.version">
			<select name="version">
				<option value="simple_1.0"
					<c:if test="${room.version=='simple_1.0'}">selected="selected"</c:if>>简化</option>
				<%-- <option value="color_game_1.0"
					<c:if test="${room.version=='color_game_1.0'}">selected="selected"</c:if>>猜颜色</option>--%>
				<option value="mine_1.0"
					<c:if test="${room.version=='mine_1.0'}">selected="selected"</c:if>>扫雷</option> 
			</select>
		</spring:bind>
		<br />

		<%--设置:--%>
		<%--<c:forEach items="${room.setting}" var="entry"> --%>
		<%--<spring:bind path="${entry.key}"> </spring:bind>: <spring:bind path="${entry.value}"></spring:bind>--%>
		<%--</c:forEach>--%>

		<br />
		<input class="submit" type="submit" />
		<a href="" class="cancel">取消并返回房间列表</a>


		<P class="hint">测试期间每局游戏获取2000葡萄币~~~~</P>
	</form:form>
	<div id="mask"></div>
</body>
</html>
