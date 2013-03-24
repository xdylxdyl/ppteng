<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/person/expression.js"></script>


<!-- container start  -->
<div class="span9">

这里是自定义神态
<form action="/player/setting.do">
<input id="type" type="hidden" value="${type}" />
<input id="expression"} type="hidden" value="${user.expression}" />
<input id="submitSetting" class="submit" type="button" value="提交" />
</form>

	
</div>