<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/person/music.js"></script>
<script	src="/r/j-src/util/musicUtil.js?v=20.5"></script>


<!-- container start  -->
<div class="span9">
<div class="hero-unit">
		<h1>给自己留下听音乐的时间</h1>
		<p>支持虾米音乐播放器</p>
		<p>自行决定是否打开音乐</p>
		<p>需要Flash支持</p>
		<p>很可惜,Pad/手机无法播放</p>
		
	</div>


<form action="/player/setting.do" method="post" id="musicForm">
<input id="type" name="type" type="hidden" value="${type}" />
<input id="value" name="value" type="hidden" value="${user.music}" />
<input id="submit" class="submit" type="submit" value="提交" />


</form>

	
</div>