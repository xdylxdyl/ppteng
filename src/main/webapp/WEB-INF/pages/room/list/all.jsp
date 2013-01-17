<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<html>
<head>
<meta charset=utf-8">
<title>LogIn</title>
<link href="/r/css/all.css?v=${frontVersion}" rel="stylesheet" />
<link href="/r/css/button.css?v=${frontVersion}" rel="stylesheet" />
<script src="/r/j-src/jquery/jquery-1.6.1.js"></script>
<script src="/r/j-src/listall/all.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath()%>/r/j-src/commons/service.js?v=${frontVersion}"></script>
<script src="<%=request.getContextPath()%>/r/j-src/util/httpUtil2.js"></script>

<input type="hidden" value="${oldRoom}" id="oldRoom">
</head>

<body>



	<div id="wrap">
		<div id="content">
			<header></header>
			<nav></nav>
			<div id="index">
				<div class="punch_area">
					<c:choose>
						<c:when test="${punch}">
							<span class="button orange glossy" id="punch">打卡</span>
						</c:when>
						<c:otherwise>
							<span class="button" id="punch" punch="true">已打卡</span>
						</c:otherwise>
					</c:choose>
					<span id="punch_hint" class="punch_hint"></span>
				</div>
				<div id="create">
					<p>

						<a href="/player/detail.do?uid=${uid}" target="_blank">${uname}</a>
						葡萄币 <span id="money">${user.money}</span>, 总注册用户:[<span
							style="color: #4B0082">${count}</span>]人
					</p>
					<p>
						您是要进入一个房间呢呢还是创建一个房间呢还是什么都不想干呢 ,或者直接 ~~~ <a
							href="/player/offline.do">走你~~~ </a>
					</p>
					<p class="right">
						<a href="" class="button blue serif glossy skew" data-icon="♛">Create
							Room </a>
					</p>
				</div>

				<c:forEach items="${rooms}" var="room">
					<article class="sample">
						<img src="${users[room.createrID].icon}" class="portrait"
							id="portrait_img">
						<h2>
							<a href="" rid="${room.id}" uid="${uid}">${room.name}</a>
						</h2>
						
					
						
						<p class="data">
							纪元：
							<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
								value="${room.createAt}"></date:date>
							房主：<a href="/player/detail.do?uid=${room.createrID}"
								target="_blank">${users[room.createrID].name}</a>
						</p>
						

						<p class="sign">    
			<c:choose>
              <c:when test="${users[room.createrID].sign==''}">
                  我想我是一个杀手,我和你们不一样.我说我很孤独,因为你和他们一样.可是如果没有我,没有这样一个不一样的人,还有谁,能证明你和他们一样的             
              </c:when>
              <c:otherwise>
                 ${users[room.createrID].sign}
              </c:otherwise>
            </c:choose>
						
			</p>
			
			<c:set var="version" value="${room.version}"></c:set>

						<p class="describe">
							版本[<span style="color: #4B0082"><%@ include
									file="../version/show.jsp"%></span>],有玩家 [<span
								style="color: #4B0082">${room_count[room.id]}</span>] 人
						</p>
						
							
					</article>
				</c:forEach>
			</div>
		</div>
		<div id="uplayer"></div>
	</div>
	<!-- <div id="foot" class="foot_nav">
		<ul style="">
			<li><a href="http://dicewar.cloudfoundry.com/" target="_blank">骰子游戏</a>
			</li>
			<li><a href="http://114.242.145.78:17788/" target="_blank">通讯录</a>
			</li>
			<li><a href="http://hot.zq88.cn/" target="_blank">财经热点新闻</a></li>
			<li><a href="http://semantic.zq88.cn/" target="_blank">财经新闻贴</a>
			</li>

		</ul>

	</div> -->
	<input type="hidden" id="uid" value="${uid}" />
</body>
</html>
