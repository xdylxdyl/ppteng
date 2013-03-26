<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>
<script src="/r/j-src/person/search.js"></script>



<!-- container start  -->
<div class="span9">
	<h2>查找用户</h2>





	<label for="uid">葡萄号</label> <input type="text" id="uid" name="uid"
		placeholder="输入葡萄号" value="">





	<p id="hint" class="text-error"></p>
	<div class="row-fluid align-right">
		<button class="btn btn-primary pull-left" id="completeBtn">提交</button>



	</div>


	<div class="row span2" style="margin-bottom: 30px;">

		<h2 id="uname" class="text-info"></h2>

		<div class="span2">
			<img src="" alt="" id="icon" class="img-polaroid">
		</div>

	</div>
</div>
