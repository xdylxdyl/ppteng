<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<c:choose>
<c:when test="${'simple_1.0'==version}">
杀人游戏[简化]
</c:when>

<c:when test="${'killer_police_1.0'==version}">
杀人游戏[警版][测试版]
</c:when>

<c:when test="${'mine_1.0'==version}">
多人扫雷[测试版]
</c:when>
<c:when test="${'video_1.0'==version}">
一起看视频
</c:when>


<c:when test="${'ghost_simple_1.0'==version}">
捉鬼[简化][测试版]
</c:when>
<c:when test="${'ghost_question_1.0'==version}">
捉鬼[猜词版][测试版]
</c:when>
<c:when test="${'ghost_soul_1.0'==version}">
捉鬼[魂版][测试版]
</c:when>

<c:when test="${'rest_1.0'==version}">
茶座休息室
</c:when>
<c:otherwise>
</c:otherwise>
</c:choose>
