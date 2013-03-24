<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="/r/j-src/person/stageShow.js"></script>


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
	</div>

	<c:choose>
		<c:when test="${self}">
			<form action="/player/setting.do">
				<input id="type" type="hidden"  name="type" value="${type}" />
				
				
				
				 <input id="value"  name="value"
					type="hidden" value="${user.stageShow}" />
					
					
					
					
					
					
					
					 <input
					id="submitSetting" class="submit" type="submit" value="提交" />
			</form>

		</c:when>
		<c:otherwise>

			<input id="type" type="hidden" value="${type}" />
			<input id="stageShow" type="hidden" value="${user.stageShow}" />
		</c:otherwise>
	</c:choose>


</div>