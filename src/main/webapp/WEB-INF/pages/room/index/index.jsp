<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ include file="../../includes/includes.jsp"%>

<!DOCTYPE HTML>
<html ng-app="imgList">
<head>
<title>葡萄藤轻游戏"</title>
<meta name="keywords" content="杀人游戏,简化,警版,电影院,扫雷,多人扫雷">
<metaname
	="description"  content="葡萄藤是一个集杀人游戏,多人在线扫雷等多种休闲娱乐在一起的轻游戏网站,支持房主自定义神态,自定义背景音乐,和朋友或者是自己一起相处着这静静的时光">

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>


<body>



	<div class="banner">
		<div class="container">
			<div class="row">
				<c:choose>
					<c:when test="${empty user}">
						<div class="span4">
							<form action="/player/login " method="post" class="login-box">
								<h2>Login 总用户${count}人</h2>


								<p>使用您的注册邮箱/葡萄号登录:</p>
								<label for="email">email</label> <input type="text" id="email"
									name="email" placeholder="邮箱/葡萄号" class="login email-input">
								<label for="password">密码</label> <input type="password"
									id="password" name="password"
									placeholder="Please enter your password here"
									class="login password-input">
								<c:if test="${code!=0}">
									<p class="hint">
										<spring:message code="${code}" />
									</p>
								</c:if>

								<div class="login-action">
									<span class="login-checkbox"><a
										href="/player/regedit?type=email">忘记密码</a></span>
									<button class="btn btn-primary btn-large pull-right">登录</button>
								</div>

								<div class="login-social">
									<p>
										使用以下方式登录，或者 <a href="/player/regedit ">一分钟注册</a>
									</p>
									<span id="qqLoginBtn"></span> <span id="wb_connect_btn"></span>
								</div>
							</form>
						</div>
					</c:when>
					<c:otherwise>
						<div class="span3 box">
							<h4>
								<small>总用户${count}人 欢迎你:</small> ${user.name}
							</h4>
							<img src="http://www.ptteng.com${user.icon}" class="portrait"
								id="portrait_img" style="max-width: 16em; height: 8em"> <br>
							<br>
							<blockquote>
								<small>上次登录:<date:date pattern="yyyy年 MM月dd日  HH时mm分 "
										value="${user.loginAt}"></date:date></small> <small>金币
									${user.money}</small>
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

							<a class="btn btn-primary" href="/m/list ">进入游戏</a> <input
								type="hidden" id="uid" value="${user.id}" /> <input
								type="hidden" id="type" value="" />

						</div>
					</c:otherwise>
				</c:choose>



				<div class="span8 banner-screen">
					<%-- 
					<div id="indexCarousel" class="carousel ng-scope" interval="500"
						ng-controller="ImgCtrl">
						<div class="carousel-inner">
							<tiles:insertDefinition name="carousel" />
						</div>
						<!-- <a class="carousel-control left" href="#indexCarousel"
							data-slide="prev">&lsaquo;</a> <a class="carousel-control right"
							href="#indexCarousel" data-slide="next">&rsaquo;</a> -->
					</div> --%>
					<div class="item">
						<img src="/r/img/img_banner_3.jpg" alt="杀人游戏">
						
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /banner -->

	<div class="content">
		<div class="container">
			<div class="row">
				<div class="span8">
					<h3 class="" style="color:#0088cc">葡萄藤-好玩的在线桌游</h3>
					<hr>					
					<div class="row-fluid">
						<div class="span6">
							<div class="chapter">
								<div class="chapter-body">
									<span class="pull-left"><img src="/r/img/icon_movie.png"
										alt="电影院" width="64" height="64"></span>
									<h4>虚拟电影院</h4>
									<p>有了葡萄藤电影院，妈妈再也不用担心我单独看电影了</p>
								
								</div>
							</div>
							<div class="chapter">
								<span class="pull-left"><img src="/r/img/icon_killer.png"
									alt="杀人游戏简化版" width="64" height="64"></span>
								<div class="chapter-body">
									<h4>杀人游戏</h4>
									<p>三个版本的杀人游戏,高雅的简化,平衡的警版,惊喜的不翻牌</p>
								

								</div>
							</div>
						</div>
						<div class="span6">
							<div class="chapter">
								<span class="pull-left"><img
									src="/r/img/icon_clearance.png" alt="多人扫雷" width="64"
									height="64"></span>
								<div class="chapter-body">
									<h4>炸狼堡</h4>
									<p>又叫抵抗组织~厌倦了杀手?那么来炸狼堡吧</p>
								
								</div>

							</div>
							<div class="chapter">
								<span class="pull-left"><img src="/r/img/icon_design.png"
									alt="多人扫雷" width="64" height="64"></span>
								<div class="chapter-body">
									<h4>捉鬼</h4>
									<p>两个版本的谁是卧底,不知道自己身份的简化版本,和妙趣横生的猜词版</p>
								</div>

							</div>
						</div>
					</div>
				</div>
				<div class="span4">
					<h3>
						<a
							href="/rank/statistics?type=simple&query=killerWin&desc=desc&page=1&size=20&secondQuery=killer">金牌杀手榜</a>
					</h3>
					<table class="table ranking">
						<thead>
							<tr>
								<th>胜率</th>
								<th>玩家</th>
							</tr>
						</thead>
						<tbody>
							<c:forEach items="${statisticsList}" var="statistics">
								<c:set var="user" value="${id_users[statistics.id]}"></c:set>
								<tr>
									<td class="score"><fmt:formatNumber pattern="0.00"
											value="${statistics.killerWin/statistics.killer}"></fmt:formatNumber></td>
									<td class="name"><a
										href="player/statistics?uid=${user.id}">${user.name}</a></td>
								</tr>
							</c:forEach>

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>


	<div id="friendLink" class="friendLink">

		<div class="container">
			<p>友情链接</p>
			<div class="row">
				<div class="span3">

					<p>
						<a href="http://www.15tiance.com/" target="_blank">天策策划</a>
					<p>
					<p>
						<a href="http://www.neiht.com/" target="_blank">内涵图</a>
					<p>
					<p>
						<a href="http://www.sjwyb.com/" target="_blank">手机网游帮</a>
					<p>
					<p>
						<a href="http://www.yoyone.net" target="_blank">优选网站目录</a>
					</p>
				</div>
				<div class="span3">
					<p>
						<a href="http://www.qqwaiyu.com/" target="_blank">青青外语</a>
					<p>
					<p>
						<a href="http://womenaikan.com/" target="_blank">我们爱看</a>
					<p>
					<p>
						<a href="http://www.wargamechina.com/" target="_blank">中国兵棋网</a>
					<p>
					<p>
						<a href="http://v.500178.com/" target="_blank">游戏视频</a>
					<p>
				</div>
				<div class="span3">

					<p>
						<a href="http://www.duole.com/" target="_blank">多乐音乐电台</a>
					<p>
					<p>
						<a href="http://fifa.wemvp.com/" target="_blank">FIFA14</a>
					<p>
					<p>
						<a href="http://www.yiyuanerci.com/" target="_blank">一元二次游戏网</a>
					<p>
					<p>
						<a href="http://456game.goseesee.com/" target="_blank">456游戏</a>
					<p>
				</div>
				<div class="span">
					<p>
						<a href="http://www.joywi.com/" target="_blank">乐唯网</a>
					<p>
					<p>
						<a href="http://www.baimeiba.com/" target="_blank">性感MM</a>
					<p>
					<p>
						<a href="http://www.neihan8.com/gaoxiaomanhua/" target="_blank">搞笑漫画</a>
					<p>
				</div>
			</div>
		</div>

		<script type="text/javascript"
			src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js"
			data-appid="100372616"
			data-redirecturi="http://www.ptteng.com/qc_callback.html"
			charset="utf-8"></script>
		<script
			src=" http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=1999911523"
			type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript"
			src="/r/j-src/game/commons/third.js?version=${frontVersion}"></script>
		<script type="text/javascript"
			src="/r/j-src/web/punch/punch.js?version=${frontVersion}"></script>

		<script src="/r/j-src/web/index/index.js?v=${frontVersion}"></script>
		<script type="text/javascript"
			src="/r/j-src/framework/bootstrap/carousel.js"></script>
</body>
</html>

