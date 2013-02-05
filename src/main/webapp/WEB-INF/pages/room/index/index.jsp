<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json"%>

<!DOCTYPE HTML>
<html>
<head>
<title>葡萄藤轻游戏"</title>
<meta name="keywords" content="杀人游戏,简化,警版,3.0,扫雷,多人扫雷">
<metaname
	="description"  content="葡萄藤是一个集杀人游戏,多人在线扫雷等多种休闲娱乐在一起的轻游戏网站,支持房主自定义神态,自定义背景音乐,和朋友或者是自己一起相处着这静静的时光">

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script type="text/javascript" src="/r/j-src/jquery/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/r/j-src/bootstrap/carousel.js"></script>
<script type="text/javascript">
    $(function() {
        $('.carousel').carousel();
    })
     headView.highLight("index");
</script> 
<script type="text/javascript"
	src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js"
	data-appid="100686632" data-redirecturi="http://www.ptteng.com/player/openID.do?type=qq" charset="utf-8"></script>
</head>
<body>



	<div class="banner">
		<div class="container">
			<div class="row">
				<div class="span4">
					<form action="/player/login.do" method="post" class="login-box">
						<h2>Login</h2>


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
						<p>
							<a href="/player/regedit.do?type=email">忘记密码</a>
						</p>
						<div class="login-action">

							<span class="login-checkbox"> <input type="checkbox"
								id="keep" name="keep" class="login-checkbox"> <label
								for="keep" class="choice">两周内保持登录</label>
							</span>

							<button class="btn btn-primary btn-large pull-right">登录</button>

						</div>

						<div class="login-social">
							<p>
								使用以下方式登录，或者 <a href="/player/regedit.do">一分钟注册</a>
							</p>
							<span id="qqLoginBtn"></span>
							<script type="text/javascript">
                                  QC.Login({
                                       btnId:"qqLoginBtn"	//插入按钮的节点id
                                    });
                             </script>
							<!-- 	<a href="#"><img src="/r/img/weibo_login.png" alt="微博登录"></a> <a
								href="#"><img src="/r/img/qq_login.png" alt="QQ登录"></a> -->
						</div>
					</form>
				</div>
				<div class="span8 banner-screen">
					<div id="indexCarousel" class="carousel">
						<div class="carousel-inner">
							<div class="active item">
								<img src="/r/img/img_banner_1.jpg" alt="杀人游戏">
								<div class="carousel-caption">
									<h4>武功再高也怕菜刀</h4>
									<p>杀人游戏是一类注重分析和推理的游戏,而简化是诸多版本中最能将分析/推理/说服/计谋等多种能力展现淋漓尽致的版本</p>
								</div>
							</div>
							<div class="item">
								<img src="/r/img/img_banner_2.jpg" alt="简化">
								<div class="carousel-caption">
									<h4>自古太监功夫高</h4>
									<p>游戏通常分为两大阵营，水民和杀手；水民以投票为手段投死杀手获取最后胜利，杀手方隐匿于水民中间，靠夜晚杀人和白天伪装成水民,坚持活到最后为胜利</p>
								</div>
							</div>
							<div class="item">
								<img src="/r/img/img_banner_3.jpg" alt="杀人游戏">
								<div class="carousel-caption">
									<h4>双拳难敌四手</h4>
									<p>交识朋友，可以和各种职业、各种类型的人结交朋友，通过游戏了解对方的性格特点并借助游戏中的交流加深彼此间的了解。</p>
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
									<h4>
										<a
											href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=5">静静的</a>
									</h4>
									<p>你可以和朋友一起玩[杀人游戏],[多人扫雷],或者你什么都不做,就只是静静待着,和我一样.</p>
								</div>
							</div>
							<div class="chapter">
								<a
									href="http://42.121.113.70:800/forum.php?mod=viewthread&tid=7"
									class="pull-left"><img src="/r/img/icon_alpaca.png"
									alt="杀人游戏简化版" width="64" height="64"></a>
								<div class="chapter-body">
									<h4>
										<a
											href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=7">杀人游戏[简化版]</a>
									</h4>
									<p>
										杀人游戏,尤其是简化版,用高雅和艺术形容,一点都不过份.游戏中经常可以看到妙趣横生的对话,风格迥异的人物,和各种知性漂亮的姑娘...
									</p>
								</div>
							</div>
						</div>
						<div class="span6">
							<div class="chapter">
								<a
									href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=6"
									class="pull-left"><img src="/r//img/icon_alpaca.png"
									alt="多人扫雷" width="64" height="64"></a>
								<div class="chapter-body">
									<h4>
										<a
											href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=6">扫雷[多人版]</a>
									</h4>
									<p>可以和你的朋友一起 玩这个简单有趣的小游戏了~体验一下三五个人去扫一个[100*100]超大雷区的冒险历程?</p>
								</div>
							</div>
							<div class="chapter">
								<a
									href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=5"
									class="pull-left"><img src="/r//img/icon_alpaca.png"
									alt="设计游戏" width="64" height="64"></a>
								<div class="chapter-body">
									<h4>
										<a
											href="http://bbs.ptteng.com/forum.php?mod=viewthread&tid=5">这些游戏都不喜欢?</a>
									</h4>
									<p>想过设计一个自己喜欢的游戏呢?强权外交?可以.三国杀?可以.吹牛骰子?可以.捉鬼?可以!来联系我吧~</p>
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
		<p>友情链接</p>
		<div class="container">
			<div class="row">
				<div class="span1">
					<p>
						<a href="http://www.pickupstudio.org/" target="_blank">皮卡工作室</a>
					<p>
					<p>
						<a href="http://www.15tiance.com/" target="_blank">天策策划</a>
					<p>
				</div>
				<div class="span2">
					<p>
						<a href="http://www.qqwaiyu.com/" target="_blank">青青外语</a>
					<p>
					<p>
						<a href="http://womenaikan.com/" target="_blank">我们爱看</a>
					<p>
				</div>
			</div>
		</div>
</body>
</html>

