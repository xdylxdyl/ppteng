<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<c:choose>
<c:when test="${fn:contains(version, 'simple')&&!fn:contains(version, 'ghost')}">
杀人游戏[简化]
</c:when>

<c:when test="${fn:contains(version, 'killer_police')}">
杀人游戏[警版]
</c:when>
<c:when test="${fn:contains(version, 'killer_police_secret')}">
杀人游戏[警版不翻牌]
</c:when>
<c:when test="${fn:contains(version, 'mine')}">
多人扫雷[测试版]
</c:when>
<c:when test="${fn:contains(version, 'video')}">
一起看视频
</c:when>


<c:when test="${fn:contains(version, 'ghost_simple')}">
捉鬼[简化][测试版]
</c:when>
<c:when test="${fn:contains(version, 'ghost_question')}">
捉鬼[猜词版][测试版]
</c:when>
<c:when test="${fn:contains(version, 'ghost_soul')}">
捉鬼[魂版][测试版]
</c:when>

<c:when test="${fn:contains(version, 'wolf_burg')}">
炸狼堡
</c:when>

<c:when test="${fn:contains(version, 'labs_diy')}">
DIY游戏室
</c:when>

<c:when test="${fn:contains(version, 'rest')}">
茶座休息室
</c:when>
<c:otherwise>
全部
</c:otherwise>
</c:choose>
