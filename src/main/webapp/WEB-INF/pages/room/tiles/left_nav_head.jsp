
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
 <div>
      <c:if test="${not empty current}">
     <p class="text-success">正在查看 <a href="/player/detail?uid=${current.id}">${current.name}</a>的信息</p>
   </c:if>
 
</div>