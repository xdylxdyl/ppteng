<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>




<div class="span9" ng-controller="publicCtrl">

	<div class="container-fluid">
		<div class="row-fluid">
			<div class="hero-unit">
				<h1>推荐好玩的游戏</h1>

			</div>
		</div>
		<hr>
		<div class="row-fluid">


			<div class="span8">
				<h2>1.过马路</h2>
				<p>这是个非常血腥 的马路游戏。游戏很简单。用方向箭控制小人儿过马路。不被车撞死就行的。
					不过要被汽车撞上的时候有黑客帝国的子弹时间效果。</p>
				<p></p>
				<p></p>
				<p>
					<a class="btn"
						href="http://www.freewebarcade.com/game/lets-go-jaywalking/"
						target="_blank">去玩一局 »</a>
				</p>
			</div>
			<div class="span4">
				<img alt="过马路"
					src="http://download.ptteng.com/group1/M00/00/00/KnlxRlIC_q7EYMGJAACyfQ89BRY539.jpg" />
			</div>
		</div>


		<hr>
		<div class="row-fluid">


			<div class="span8">
				<h2>2.新闻DNA</h2>
				<p>网易一向出神器。这个新闻DNA的测试也很好玩儿。通过对不同新闻的兴趣度，加上你的观点和立场，得出你的DNA图谱，我的是什么？看右图</p>
				<p></p>
				<p></p>
				<p>
					<a class="btn"
						href="http://dna.163.com"
						target="_blank">去玩一局 »</a>
				</p>
			</div>
			<div class="span4">
				<img alt="163DNA"
					src="http://download.ptteng.com/group1/M00/00/00/KnlxRlIDBpLtXHugAANoeh00gGw587.jpg" />
			</div>
		</div>
		<hr>
		<div class="row-fluid">

			<div class="alert">

				<h4>有更好玩的游戏。点击页面底部的QQ图标，推荐给我</h4>

			</div>
		</div>
	</div>




</div>


<script src="/r/j-src/web/tool/games.js?v=${frontVersion}"></script>
