<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>




<link rel="stylesheet" href="/r/css/tagit/jquery.tagit.css">
<link rel="stylesheet" href="/r/css/tagit/tagit.ui-zendesk.css">
<input id="uid" type="hidden" value="${current.id}" />
<input id="name" type="hidden" value="${current.name}" />
<!-- container start  -->
<div class="span9">
	<div class="well">
		<h2>什么样的出场最摇摆</h2>
		<p>给你自由想像的空间</p>
		<p>可免费设置多达五个出场秀</p>
		<p>进入房间,随机选择一个</p>
		<p>一点点微不足道的改变,给你带来无限可能的欢乐</p>

        <h3>玩家秀:</h3>
        <div id="stageShow">${current.stageShow}</div>
        <input id="type" type="hidden" name="type" value="${type}" />
        <div id="showArea"></div>
    <div class="form-actions">
        <div id="showEditContainer">
        <c:choose>
        <c:when test="${self}">
            <ul id="myTags"></ul>
            <input name="tags" id="showTags" value="" disabled="true" class="hide">
            <button class="btn btn-primary pull-right" id="submitShow">提交</button>
            <button class="btn pull-right" id="cancel">取消</button>
            <button class="btn" id="clearTag">清空全部</button>
        </div>

            <button class="btn btn-primary pull-right" id="editShow">修改</button>
        </div>
    </div>
        </c:when>
        <c:otherwise>

        </c:otherwise>
        </c:choose>
	</div>











</div>









</div>


<script type="text/javascript" src="/r/j-src/framework/jquery/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/r/j-src/framework/jquery/jquery-ui.min.js"></script>
<script type="text/javascript" src="/r/j-src/framework/tagit/tag-it.js"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script src="/r/j-src/web/person/stageShow.js"></script>