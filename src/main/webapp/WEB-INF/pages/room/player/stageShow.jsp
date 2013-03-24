<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/person/stageShow.js"></script>


    <link rel="stylesheet" href="/r/css/tagit/jquery.tagit.css">
    <link rel="stylesheet" href="/r/css/tagit/tagit.ui-zendesk.css">
    <script type="text/javascript" src="/r/j-src/jquery/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/r/j-src/jquery/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/r/j-src/tagit/tag-it.js"></script>
    <script type="text/javascript">
    $(function() {
    var tags = ['aaa', 'bbbb', 'cccc'];
        $('#myTags').tagit({
            maxTags: 5, //最大数限制
            singleField: true,
            singleFieldNode: $("#showTags")
        });
        $("#clearTag").click(function() {
            $('#myTags').tagit('removeAll')
        });
    })
    </script>


<input id="uid" type="hidden" value="${user.id}" />
<input id="name" type="hidden" value="${user.name}" />
<!-- container start  -->
<div class="span9">
	<div class="hero-unit">
		<h1>xdyl 打着伞 进入了房间</h1>
		<p>这就是出场秀</p>
		<p>给你自由想像的空间</p>

		<p>测试期内免费设置多五个出场秀</p>
		<p>每次进入房间,随机选一个出现</p>
		<p>一点点微不足道的改变,却给你带来无限可能的欢乐</p>

        <ul id="myTags"></ul>
        <input name="tags" id="showTags" value="aaaaa, bbbbb" disabled="true" class="hide">
        <button class="btn btn-primary pull-right">提 交</button>
        <button class="btn" id="clearTag">清空全部</button>
	</div>

	<c:choose>
		<c:when test="${self}">
			<form action="/player/setting.do">
				<input id="type" type="hidden"  name="type" value="${type}" />
				
				
				
				<input id="value"  name="value" type="hidden" value="${user.stageShow}" />
					
					
					
					
					
					
					
                 <input id="submitSetting" class="submit" type="submit" value="提交" />
			</form>

		</c:when>
		<c:otherwise>

			<input id="type" type="hidden" value="${type}" />
			<input id="stageShow" type="hidden" value="${user.stageShow}" />
		</c:otherwise>
	</c:choose>


</div>