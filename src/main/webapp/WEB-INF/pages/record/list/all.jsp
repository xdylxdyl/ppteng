<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<html>
<head>
<meta charset=utf-8">
<title>LogIn</title>
<link href="/r/css/all.css" rel="stylesheet" />
<script src="/r/j-src/jquery/jquery-1.6.1.js"></script>
<script src="/r/j-src/listall/record_list.js"></script>

</head>

<body>


	<div id="wrap">
		<div id="content">
			<header></header>
			<nav></nav>
			<div id="index">

				<c:forEach items="${records}" var="record">


					<article class="sample">

						<img src="${users[record.room.createrID].icon}" class="portrait"
							id="portrait_img">
						<h2>
							<a
								href="/record/enter.do?recordID=${record.id}">${record.room.name}</a>
						</h2>
						<p class="data">
							纪元：
							<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
								value="${record.createAt}"></date:date>
							房主：<a href="/player/detail.do?uid=${record.room.createrID}"
								target="_blank">${users[record.room.createrID].name}</a>
						</p>
						<c:set var="version" value="${record.room.version}"></c:set>

						<p class="describe">
							版本[<span style="color: #4B0082"><%@ include
									file="../../room/version/show.jsp"%></span>] ,
							用时[ <span style="color: #4B0082"> <date:length
									date="${record.time}"></date:length>
							</span>]
						</p>

					</article>

				</c:forEach>
			</div>
		</div>
	</div>
	<input type="hidden" id="uid" value="${uid}" />
</body>
</html>
