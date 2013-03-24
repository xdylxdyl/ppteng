<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/person/music.js"></script>


<!-- container start  -->
<div class="span9">

这里是个人音乐
<form action="/player/setting.do">
<input id="type" type="hidden" value="${type}" />
<input id="music" type="hidden" value="${user.music}" />
<input id="submitSetting" class="submit" type="button" value="提交" />
</form>

	
</div>