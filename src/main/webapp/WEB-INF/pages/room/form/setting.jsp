<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!DOCTYPE HTML>
<head>
<script src="/r/j-src/util/stringUtil.js?v=${frontVersion}"></script>
<style type="text/css">
form {
	padding-left: 10px;
}

#setting input {
	width: 80px;
	margin: 10px 0 0 10px;
	border: 1px solid #d9d5be;
}

input:focus {
	-moz-box-shadow: inset 0 0 1px 1px #ddd;
	-webkit-box-shadow: inset 0 0 1px 1px #ddd;
	box-shadow: inset 0 0 1px 1px #ddd;
}

input.submit {
	margin: 10px auto;
	background: -moz-linear-gradient(top, #00779E, #005C7A);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(#00779E),
		to(#005C7A) );
	background: -o-linear-gradient(top, #00779E, #005C7A);
	border: medium none;
	border-radius: 5px 5px 5px 5px;
	color: #FFFFFF;
	cursor: pointer;
	font-family: '微软雅黑';
	font-size: 12px;
	height: 23px;
	text-shadow: 1px 1px #000000;
	width: auto;
}
</style>

</head>

<body>
	<%--action="/m/form/setting.do"--%>
	<div id="versionDefined"></div>
		<form:form modelAttribute="setting">	
		<spring:bind path="setting.version">
			<input name="version" value="${setting.version}" type="hidden"
				readonly />
		</spring:bind>
		<spring:bind path="setting.rid">
			<input name="rid" value="${setting.rid}" type="hidden" readonly />
		</spring:bind>

		<c:forEach items="${setting.setting}" var="entry">
			<c:choose>
				<c:when test="${empty settingDisplay[entry.key]}">
             ${entry.key}
     </c:when>
				<c:otherwise>
    ${settingDisplay[entry.key]}
    </c:otherwise>
			</c:choose>  :
        <spring:bind path="setting.setting[${entry.key}]">
				<input id="${entry.key}" name="setting[${entry.key}]"
					value="${entry.value}" type="text" />
				<br />
			</spring:bind>
		</c:forEach>
		<input id="submitSetting" class="submit" type="button" value="提交设置" />
	
	</form:form>


</body>
</html>
