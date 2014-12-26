<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<html ng-app="">
<head>
<meta charset=utf-8">
<title>${uname}-葡萄藤轻游戏</title>


<input type="hidden" value="${oldRoom}" id="oldRoom">

</head>

<body>


	<div class="container">
		<div class="row section">
			<div class="span3">




				<div class="row  left-box">
					<div class="left-box-in">
						<h4>
							<small>欢迎你</small>,${uname}
						</h4>
						<img src="http://www.ptteng.com${user.icon}" class="portrait"
							id="portrait_img" style="max-width: 16em; height: 8em"> <br>
						<br>
						<blockquote>
							<small id="money">金币 ${user.money}</small>
							<c:choose>
								<c:when test="${empty punchCount}">
									<div id="punchBox">
										<div id="punchOver"></div>
										<span class="btn btn-primary" id="punch">打卡</span>
									</div>
								</c:when>
								<c:otherwise>
									<small>连续打卡${punchCount}天,额外获取金币 ${punchCount}*100</small>
								</c:otherwise>
							</c:choose>
						</blockquote>
						<c:if test="${empty my_room}">
							<a href="" class="btn btn-primary" id="createRoom">创建房间</a>
						</c:if>

					</div>
				</div>
				<hr>
				<div class="row left-box">
					<div class="span12 left-box-in">
						<img
							src="http://bbs.ptteng.com/data/attachment/forum/201412/18/143718br3tba3u3xrr53ax.png"
							class="portrait" style="max-width: 16em; height: 8em"> <br>
						<h4><span>扫码领红包,人民币,最高1000元，骗你是小狗~~</span></h4>
						<h4><small>圣诞&元旦【小礼物】</small></h4>
						<a
							href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=5792&extra="
							class="btn btn-primary"  target="_blank">查看详情</a>
					</div>
				</div>
				
				
				<hr>
				<div class="row left-box">
					<div class="span12 left-box-in">
						<img
							src="http://bbs.ptteng.com/data/attachment/forum/201412/26/144537wlyjfz7t8jjyol63.jpg"
							class="portrait" style="max-width: 16em; height: 8em"> <br>
						<h4><span>加入戳群来一起玩吧</span></h4>
						
						
					</div>
				</div>


			</div>



			<div class="span9">

				<!-- start of tabbale-->
				<div class="tabbable">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#roomList" data-toggle="tab">房间列表</a></li>
						<li class=""><a href="#roomCreate" data-toggle="tab">创建房间</a></li>

					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="roomList">
							<!-- advertise -->
							<tiles:insertDefinition name="roomList" />
						</div>
						<div class="tab-pane" id="roomCreate"
							ng-controller="VersionConfigCtrl">

							<div class="row">


								<div class="span3" ng-repeat="config in versionConfig">
									<h3 class="" ng-cloak>{{config.title}}</h3>


									<img class="img-polaroid fix-img" ng-src="{{config.img}}">



									<h3>
										<a href="" class="btn btn-primary  createCategory"
											version="{{config.version}}">创建</a>
									</h3>
									<hr>

								</div>





							</div>

						</div>



					</div>


				</div>

				<!-- end of tabbale-->




			</div>

			<input type="hidden" id="uid" value="${uid}" />
		</div>
	</div>
</body>
</html>
<link href="/r/css/all2.css" rel="stylesheet" type="text/css" />
<script src="/r/j-src/framework/angular/angular.min.js"></script>

<script type="text/javascript"
	src="/r/j-src/framework/bootstrap/bootstrap-tab.js"></script>



<script src="/r/j-src/web/listall/all.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath()%>/r/j-src/game/commons/service.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/r/j-src/web/punch/punch.js?version=${frontVersion}"></script>
