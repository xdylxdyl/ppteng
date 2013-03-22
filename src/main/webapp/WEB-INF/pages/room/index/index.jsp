<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ include file="../../includes/includes.jsp"%>

<!DOCTYPE HTML>
<html>
<head>
<title>葡萄藤轻游戏"</title>
<meta name="keywords" content="杀人游戏,简化,警版,电影院,扫雷,多人扫雷">
<metaname
	="description"  content="葡萄藤是一个集杀人游戏,多人在线扫雷等多种休闲娱乐在一起的轻游戏网站,支持房主自定义神态,自定义背景音乐,和朋友或者是自己一起相处着这静静的时光">

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="/r/j-src/bootstrap/carousel.js"></script>
<script
	src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script type="text/javascript">
    $(function() {
        $('.carousel').carousel();
    })
     headView.highLight("index");
</script>
</head>


<body>



	<div class="banner">
		<div class="container">
			<div class="row">
				<c:choose>
					<c:when test="${empty user}">
						<div class="span4">
							<form action="/player/login.do" method="post" class="login-box">
								<h2>Login 总用户${count}人</h2>


								<p>使用您的注册邮箱登录:</p>
								<label for="email">email</label> <input type="text" id="email"
									name="email" placeholder="Please enter your e-mail here"
									class="login email-input"> <label for="password">password</label>
								<input type="password" id="password" name="password"
									placeholder="Please enter your password here"
									class="login password-input">
								<c:if test="${code!=0}">
									<p class="hint">
										<spring:message code="${code}" />
									</p>
								</c:if>

								<div class="login-action">
                                    <span class="login-checkbox"><a href="/player/regedit.do?type=email">忘记密码</a></span>
									<button class="btn btn-primary btn-large pull-right">登录</button>
								</div>

								<div class="login-social">
									<p>
										使用以下方式登录，或者 <a href="/player/regedit.do">一分钟注册</a>
									</p>
                                    <span id="qqLoginBtn"></span>
                                    <span id="wb_connect_btn"></span>
								</div>
							</form>
						</div>
					</c:when>
					<c:otherwise>
						<div class="span3 box">
							<h4>
								<small>总用户${count}人 欢迎你:</small> ${user.name}
							</h4>
							<img src="http://www.ptteng.com/${user.icon}" class="portrait"
								id="portrait_img" style="max-width: 16em; height: 8em">
                            <br><br>
							<blockquote>
								<small>上次登录:<date:date pattern="yyyy年 MM月dd日  HH时mm分 "
										value="${user.loginAt}"></date:date></small>
								<c:choose>
									<c:when test="${empty punchCount}">
                                    <div id="punchBox">
                                        <div id="punchOver"></div>
                                        <span class="btn btn-primary" id="punch">打卡</span>
                                    </div>
									</c:when>
									<c:otherwise>
										<small>已连续打卡${punchCount}天</small>
										<small>金币 ${user.money}</small>

									</c:otherwise>
								</c:choose>
							</blockquote>

								<a class="btn btn-primary" href="/m/list.do">进入游戏</a>

							<input type="hidden" id="uid" value="${user.id}" /> <input
								type="hidden" id="type" value="" />

						</div>
					</c:otherwise>
				</c:choose>


				<div class="span8 banner-screen">
					<div id="indexCarousel" class="carousel">
						<div class="carousel-inner">
							<div class="active item">
								<img src="/r/img/img_banner_3.jpg" alt="杀人游戏">
								<div class="carousel-caption">
									<h4>368活动</h4>
									<p>每周三,周六晚上八点半,约在一起玩简化</p>
								</div>
							</div>
							<div class="item">
								<img src="/r/img/img_banner_1.jpg" alt="杀人游戏">
								<div class="carousel-caption">
									<h4>葡萄藤电影院</h4>
									<p>和朋友一起,约个时间,一边看电影,一边聊天</p>
								</div>
							</div>
							<div class="item">
								<img src="/r/img/img_banner_2.jpg" alt="简化">
								<div class="carousel-caption">
									<h4>自古太监功夫高</h4>
									<p>游戏通常分为两大阵营，水民和杀手；水民以投票为手段投死杀手获取最后胜利，杀手方隐匿于水民中间，靠夜晚杀人和白天伪装成水民,坚持活到最后为胜利</p>
								</div>
							</div>

						</div>
						<a class="carousel-control left" href="#indexCarousel"
							data-slide="prev">&lsaquo;</a> <a class="carousel-control right"
							href="#indexCarousel" data-slide="next">&rsaquo;</a>
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
					<h3>葡萄藤轻游戏</h3>
					<div class="row-fluid">
						<div class="span6">
							<div class="chapter">
								<div class="chapter-body">
                                    <a href="#" class="pull-left"><img src="/r/img/icon_movie.png" alt="电影院" width="64" height="64"></a>
									<h4>电影院</h4>
									<p>有了葡萄藤电影院，妈妈再也不用担心我单独看电影了</p>
									<p>
										<a class="btn"
											href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=159"
											target="_blank">活动报名&raquo;</a>
									</p>
								</div>
							</div>
							<div class="chapter">
                                <a href="#" class="pull-left"><img src="/r/img/icon_killer.png" alt="杀人游戏简化版" width="64" height="64"></a>
								<div class="chapter-body">
									<h4>杀人游戏[简化版]</h4>
									<p>高雅的简化,妙趣横生的对话,风格迥异的人物,知性漂亮的姑娘</p>

								</div>
							</div>
						</div>
						<div class="span6">
							<div class="chapter">
                                    <a href="#" class="pull-left"><img src="/r/img/icon_clearance.png" alt="多人扫雷" width="64" height="64"></a>
                                    <div class="chapter-body">
									<h4>扫雷[多人版]</h4>
									<p>玩过单机扫雷,有没有和朋友一起玩过联机扫雷?</p>
								</div>
							</div>
							<div class="chapter">
                                <a href="#" class="pull-left"><img src="/r/img/icon_design.png" alt="多人扫雷" width="64" height="64"></a>
								<div class="chapter-body">
									<h4>这些游戏都不喜欢?</h4>
									<p>设计一个自己喜欢的游戏吧?强权外交?可以.三国杀?可以.吹牛骰子?可以.捉鬼?可以~</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="span4">
					<h3>本周英雄榜</h3>
					<table class="table ranking">
						<tbody>
							<tr>
								<td class="score">54903</td>
								<td class="name">小午</td>
							</tr>
							<tr>
								<td class="score">1314</td>
								<td class="name">子氏</td>
							</tr>
							<tr>
								<td class="score">44903</td>
								<td class="name">白菜</td>
							</tr>
							<tr>
								<td class="score">41902</td>
								<td class="name">七八</td>
							</tr>
							<tr>
								<td class="score">33902</td>
								<td class="name">月落</td>
							</tr>
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
				<div class="span4">
					<p>
						<a href="http://www.pickupstudio.org/" target="_blank">皮卡工作室</a>
					<p>
					<p>
						<a href="http://www.15tiance.com/" target="_blank">天策策划</a>
					<p>
				</div>
				<div class="span4">
					<p>
						<a href="http://www.qqwaiyu.com/" target="_blank">青青外语</a>
					<p>
					<p>
						<a href="http://womenaikan.com/" target="_blank">我们爱看</a>
					<p>
				</div>
				<div class="span4">
					<p>
						<a href="http://www.j-show.com/" target="_blank">吉时吉会展</a>
					<p>
					<p>
						<a href="http://zhujiusanguo.5d6d.net/" target="_blank">煮酒三国文史论坛</a>
					<p>
				</div>
			</div>
		</div>
		
	 <script
	type="text/javascript"
	src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js"
	data-appid="100372616"
	data-redirecturi="http://www.ptteng.com/qc_callback.html"
	charset="utf-8"></script> <script
	src=" http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=1999911523"
	type="text/javascript" charset="utf-8"></script> 
	<script type="text/javascript" src="/r/j-src/commons/third.js?version=${frontVersion}"></script>
    <script type="text/javascript" src="/r/j-src/punch/punch.js?version=${frontVersion}"></script>
</body>
</html>

