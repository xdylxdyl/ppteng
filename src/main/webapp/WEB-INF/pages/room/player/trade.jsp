<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>
<script src="/r/j-src/person/trade.js"></script>



<!-- container start  -->
<div class="span9">
	<h2>
		${current.name}当前有资金<span id="currentMoney">${current.money}<span></span>
	</h2>



	<label for="id">对方葡萄号</label> <input type="text" id="id" name="id"
		placeholder="输入对方葡萄号,可在对方个人主页上查看" class="sign" value=""> <label
		for="money">转出金额</label> <input type="text" id="money" name="money"
		placeholder="输入金额,只允许输入整数" class="sign" value=""> <label
		for="comments">赠言</label> <input type="text" id="comments"
		name="comments" placeholder="输入注释~" class="sign" value="">



	<p id="hint">注意葡萄号为数字,并非登录邮箱</p>
	<div class="row-fluid align-right">
		<button class="btn btn-primary pull-right" id="completeBtn">提交</button>



	</div>
</div>
