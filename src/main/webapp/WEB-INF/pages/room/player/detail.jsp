<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!DOCTYPE HTML>
<head>
<link href="/r/css/user_detail.css" rel="stylesheet" />
<link href="/r/css/button.css" rel="stylesheet" />
<link rel="stylesheet"
	href="<%=request.getContextPath() %>/r/css/music.css?v=${frontVersion}">




</head>
<input type="hidden" id="uid" value="${current.id}">
<input type="hidden" id="oldImg" value="${current.icon}">
<body>



	<!-- 个人信息,积分,金币 -->
	<div class="span9 detail_container">
		<div id="personal" class="personal well">
			<!--名字，分数-->
			<div class="row-fluid">
				<p>
					葡萄号<span class="label label-inverse"> ${current.id}</span>
				</p>
				<div class="title pull-left" id="editName">${current.name}</div>
				<p class="pull-right" id="fraction">
					<span class="label label-info">金币 ${current.money}</span>

				</p>
			</div>
			<!--照片，签名-->
			<div class="row-fluid">
				<div class="img pull-right">
					<img src="${current.icon}" id="img">
				</div>
				<div class="info-text">
					<p id="editSignature">${current.sign}</p>
					<div class="clearfix" id="editImg">
						输入图片地址,网页图片右键选择复制图片地址;暂不支持本地图片直接上传,可以将图片先上传到论坛:<a
							href="http://bbs.ptteng.com/forum.php?mod=forumdisplay&fid=49&page=1"
							target="_blank">葡萄藤论坛贴图区</a>
						<p contenteditable="true" id="imgUrl" class="imgUrl"></p>
						<a href="#" class="btn" id="preview">预览(若预览不成功,无法保存头像)</a>
					</div>
				</div>
			</div>
			<!--额外信息-->
			<div class="row-fluid stats" id="statsInfo">
				<p class="time">
					注册时间:
					<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
						value="${current.createAt}"></date:date>
					, 上次登录时间:
					<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
						value="${current.loginAt}"></date:date>
				</p>
			</div>


			<c:choose>
				<c:when test="${current.id==selfID}">
					<!--按钮-->
					<div class="row-fluid align-right">
						<button class="btn btn-primary pull-right" id="completeBtn">完成</button>
						<button class="btn hide pull-right" id="cancelBtn">取消</button>
						<button class="btn btn-primary pull-right" id="editBtn">编辑</button>


					</div>			


				</c:when>
				<c:otherwise>
				</c:otherwise>
			</c:choose>









			<P>
				<a href="/money/flow?uid=${current.id}">查看财务</a>
			</p>
			<P>
				<a href="/player/statistics?uid=${current.id}">查看统计</a>
			</p>

			<P>
				<a href="/record/list?uid=${current.id}&version=all">查看战例</a>
			</p>





		</div>
	</div>


	<script src="/r/j-src/framework/jquery/jquery-1.6.1.js"></script>
	<script src="/r/j-src/game/commons/model.js?v=${frontVersion}"></script>
	<script src="/r/j-src/util/stringUtil.js?v=${frontVersion}"></script>
	<script src="/r/j-src/game/commons/service.js?v=${frontVersion}"></script>

	<script src="/r/j-src/web/person/detail.js?v=${frontVersion}"></script>
	<script src="/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
	<script
		src="<%=request.getContextPath() %>/r/j-src/util/musicUtil.js?v=${frontVersion}"></script>
</body>
</html>
