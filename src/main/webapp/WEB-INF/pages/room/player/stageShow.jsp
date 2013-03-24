<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/person/stageShow.js"></script>


 <input id="uid" type="hidden" value="${user.id}" />
 <input id="name" type="hidden" value="${user.name}" />
<!-- container start  -->
<div class="span9">

	这里是个人Show
	<c:choose>
		<c:when test="${self}">
			<form action="/player/setting.do">
				<input id="type" type="hidden" value="${type}" /> <input
					id="stageShow" type="hidden" value="${user.stageShow}" /> <input
					id="submitSetting" class="submit" type="button" value="提交" />
			</form>

		</c:when>
		<c:otherwise>
		   
			<input id="type" type="hidden" value="${type}" />
			<input id="stageShow" type="hidden" value="${user.stageShow}" />
		</c:otherwise>
	</c:choose>


</div>