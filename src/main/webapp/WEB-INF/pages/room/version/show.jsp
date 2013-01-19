<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<c:choose>
<c:when test="${'simple_1.0'==version}">
简化
</c:when>
<c:when test="${'mine_1.0'==version}">
扫雷
</c:when>
<c:otherwise>
</c:otherwise>
</c:choose>
