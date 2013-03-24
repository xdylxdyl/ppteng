<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/person/expression.js"></script>


<!-- container start  -->
<div class="span9">
<div class="hero-unit">
		<h1>xdyl 站在天桥上 说:长日落日圆,大漠孤烟直</h1>
		<p>葡萄藤的神态不多?</p>
		<p>那么展示自我吧</p>

		<p>管理员可设置最多五个自定义的神态</p>
		<p>只要你想</p>
		<p>让生活每天都有所不同</p>
	</div>

<form action="/player/setting.do">
<input id="type" name="type"  type="hidden" value="${type}" />
<input id="expression" name="value"  type="hidden" value="${user.expression}" />
<input id="submitSetting" class="submit" type="submit" value="提交" />
</form>

	
</div>