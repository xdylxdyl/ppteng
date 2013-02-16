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
				
				<div id="create">
					<p>

						<a href="/player/detail.do?uid=${uid}" target="_blank">${uname}</a>
						葡萄币 <span id="money">${user.money}</span>, 总注册用户:[<span
							style="color: #4B0082">${count}</span>]人
					</p>
					<p class="right">
						<a href="" class="btn btn-primary" id="createRoom">创建房间</a>
					</p>
					<h4>游戏房间列表</h4>
				</div>
				

				<c:forEach items="${rooms}" var="room"  begin="0" step="1" varStatus="status">
				
					<article class="sample">
						<img src="${users[room.createrID].icon}" class="portrait"
							id="portrait_img">
						<h2>
							第 ${status.index+1}间房 - <a href="" rid="${room.id}" uid="${uid}">${room.name}</a>
						</h2>
						
					
						
						<p class="data">
							纪元：
							<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
								value="${room.createAt}"></date:date>
							房主：<a href="/player/detail.do?uid=${room.createrID}"
								target="_blank">${users[room.createrID].name}</a>
						</p>
						

						<p class="sign"> 
                                                                    签名:   ${users[room.createrID].sign}
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
