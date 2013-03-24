<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!DOCTYPE HTML>
<head>
<link href="/r/css/user_detail.css" rel="stylesheet" />
<link href="/r/css/button.css" rel="stylesheet" />
<link rel="stylesheet"
	href="<%=request.getContextPath() %>/r/css/music.css?v=${frontVersion}">



<script src="/r/j-src/jquery/jquery-1.6.1.js"></script>
<script src="/r/j-src/commons/model.js?v=${frontVersion}"></script>
<script src="/r/j-src/util/stringUtil.js?v=${frontVersion}"></script>
<script src="/r/j-src/commons/service.js?v=${frontVersion}"></script>

<script src="/r/j-src/person/detail.js?v=${frontVersion}"></script>
<script src="/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/musicUtil.js?v=${frontVersion}"></script>

</head>
<input type="hidden" id="uid" value="${user.id}">
<body>

	<div id="music_play" class="music_play"></div>

	<!-- 个人信息,积分,金币 -->
	<div class="span9 detail_container">
		<div id="personal" class="personal">
			<!--名字，分数-->
			<div class="row-fluid">
				<div class="title pull-left" id="editName">${user.name}</div>
				<p class="pull-right" id="fraction">
					<span class="label label-info">金币 ${user.money}</span>
				</p>
			</div>
			<!--照片，签名-->
			<div class="row-fluid">
				<div class="img pull-right">
					<img src="${user.icon}" id="img">
				</div>
				<div class="info-text">
					<p id="editSignature">${user.sign}</p>
					<div class="clearfix" id="editImg">
						输入图片地址,网页图片右键选择复制图片地址,本地图片需要临时上传,推荐使用:<a
							href="http://tu.58task.com/" target="_blank">58广告任务网</a>
						<p contenteditable="true" id="imgUrl"></p>
						<a href="#" class="btn" id="preview">预览(若预览不成功,无法保存头像)</a>
					</div>
					<!--<div class="clearfix" id="editMusic">
                        在<a href="http://www.xiami.com/widget/imulti" target="_blank">虾米</a> ,粘贴Flash地址到下面
                        <p contenteditable="true"></p>
                        <a href="" class="btn">预览</a>
                    </div>-->
				</div>
			</div>
			<!--额外信息-->
			<div class="row-fluid stats" id="statsInfo">
				<p class="time">
					注册时间:
					<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
						value="${user.createAt}"></date:date>
					, 上次登录时间:
					<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
						value="${user.loginAt}"></date:date>
				</p>
				<span>已连续打卡${punchCount}天</span>
			</div>


			<c:choose>
				<c:when test="${user.id==selfID}">
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














		</div>
	</div>
</body>
</html>
