<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>

<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<link rel="stylesheet" href="/r/css/tagit/jquery.tagit.css">
<link rel="stylesheet" href="/r/css/tagit/tagit.ui-zendesk.css">

<title>${current.name}-神态-葡萄藤轻游戏</title>
<input id="uid" type="hidden" value="${current.id}" />
<input id="name" type="hidden" value="${current.name}" />



<!-- container start  -->
<div class="span9">
	<div class="well">
		<h2>葡萄藤的神态不多?</h2>
		<p>那么展示自我吧</p>

		<p>管理员可随意设置最多五个自定义的神态</p>
		<p>只要你想</p>
		<p>让生活每天都有所不同</p>
		
		
	


	<div id="expression">${current.expressionContent}</div>
	<input id="type" type="hidden" name="type" value="${type}" />
	<h3>玩家自定义神态:</h3>
	<div id="showArea"></div>
	<c:choose>
			<c:when test="${self}">
    <div class="form-actions">
	    <div id="showEditContainer">
				<ul id="myTags"></ul>
				<input name="tags" id="showTags" value="" disabled="true"
					class="hide">
				<button class="btn btn-primary pull-right" id="submitShow">提交</button>
				<button class="btn btn-primary pull-right" id="cancel">取消</button>
				
				<button class="btn" id="clearTag">清空全部</button>

				
		</div>
		<button class="btn btn-primary pull-right" id="editShow">修改</button>
    </div>
		</c:when>
		<c:otherwise>

		</c:otherwise>
	</c:choose>
    </div>
    

<script type="text/javascript" src="/r/j-src/framework/jquery/jquery-ui.min.js"></script>
<script type="text/javascript" src="/r/j-src/framework/tagit/tag-it.js"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script src="/r/j-src/web/person/expression.js?v=${frontVersion}"></script>
</div>