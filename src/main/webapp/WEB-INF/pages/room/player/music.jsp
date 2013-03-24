<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>


<link rel="stylesheet"
	href="<%=request.getContextPath() %>/r/css/music.css?v=${frontVersion}">
<script
	src="<%=request.getContextPath() %>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script src="/r/j-src/util/musicUtil.js?v=20.5"></script>
<script src="/r/j-src/person/music.js"></script>
<input id="uid" type="hidden" value="${current.id}" />
<input id="name" type="hidden" value="${current.name}" />



<!-- container start  -->
<div class="span9">
	<div class="hero-unit">
		<h1>给自己留下听音乐的时间</h1>
		<p>支持虾米音乐播放器</p>
		<p>自行决定是否打开音乐</p>
		<p>需要Flash支持</p>
		<p>很可惜,Pad/手机无法播放</p>

	</div>




	<input id="type" type="hidden" name="type" value="${type}" />

	<h1>${current.name }的自定义音乐</h1>


	<div id="music">${current.music}</div>
	<div id="music_play" class="music_play"></div>

	<c:choose>

		<c:when test="${self}">

			<div id="showEditContainer">
				<ul id="myTags"></ul>
				<p>输入虾米音乐播放器地址:</P>
				<input id="musicNew" type="input" name="type" value="" />
				<p>
					帮助请看<a href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=96">这里~</a>
				</p>
				<button class="btn btn-primary pull-right" id="submitShow">提交</button>
				<button class="btn btn-primary pull-right" id="cancel">取消</button>



			</div>
			<button class="btn btn-primary pull-right" id="editShow">修改</button>
		</c:when>
		<c:otherwise>

		</c:otherwise>
	</c:choose>


</div>