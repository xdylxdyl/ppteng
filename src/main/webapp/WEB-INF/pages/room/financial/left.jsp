<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<div class="span3">
		<tiles:insertDefinition name="currentUserHint" />
	<div class="well sidebar-nav">
		<ul class="nav nav-list">

			<li class="nav-header">财务</li>
			<li id="leftNav_moneyFlow_in">
				<a href="/money/flow?uid=${current.id}&type=in">现金流入</a></li>
			<li id="leftNav_moneyFlow_out"><a
				href="/money/flow?uid=${current.id}&type=out">现金流出</a></li>
				<li id="leftNav_trade"><a
				href="/money/trade ">转账</a></li> 
			
		</ul>
	</div>
	<!--/.well -->
</div>
<!--/span-->
<script src="/r/j-src/commons/left.js"></script>