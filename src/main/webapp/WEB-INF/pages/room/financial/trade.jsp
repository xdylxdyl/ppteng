<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>
<script src="/r/j-src/person/trade.js"></script>



<!-- container start  -->
<div class="span9">
    <div class="well">
	<h2>
		${current.name}当前有资金<span id="currentMoney">${current.money}<span></span>
	</h2>

	<label for="uid">对方葡萄号</label> <input type="text" id="uid" name="uid"
		placeholder="输入对方葡萄号,可在对方个人主页上查看" value=""> 

		<label for="money">转出金额</label>
	<input type="text" id="money" name="money" placeholder="输入金额,只允许输入整数"
		class="sign" value=""> 

		<label for="comments">赠言</label> <input
		type="text" id="comments" name="comments" placeholder="此处填写转帐备注~"
		class="sign" value="">

	<p id="hint" class="text-error">注意葡萄号为数字,并非登录邮箱.转帐会收取百分之五的手续费,上不封顶,最少转帐金额为五金币</p>
	<div class="form-actions">
		<button class="btn btn-primary pull-left" id="completeBtn">提交</button>
	</div>
    </div>
</div>
