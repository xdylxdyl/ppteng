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
<script src="/r/j-src/commons/left.js?v=${frontVersion}"></script>
<script src="/r/j-src/room/user_view.js?v=${frontVersion}"></script>
<script src="/r/j-src/room/controller.js?v=${frontVersion}"></script>
<script src="/r/j-src/util/httpUtil2.js?v=${frontVersion}"></script>
<script
	src="<%=request.getContextPath() %>/r/j-src/util/musicUtil.js?v=${frontVersion}"></script>

</head>

<body>

	<div id="music_play" class="music_play"></div>

	<!-- 个人信息,积分,金币 -->
	<div class="span9 detail_container">
		<div id="personal" class="personal">
            <!--名字，分数-->
            <div class="row-fluid">
                <div class="title pull-left">名字名字</div>
                <p class="pull-right"><span class="label label-info">0分</span> <span class="label label-info">2000分</span></p>
            </div>
            <!--照片，签名-->
            <div class="row-fluid">
                <div class="img pull-right"><img src="/r/img/person/default-person-icon.jpg"></div>
                <div class="info-text">
                    <p>我身骑白马走三关，改换素衣回中原，放下西凉无人管，一心只想王宝钏。</p>
                </div>
            </div>
            <!--额外信息-->
            <div class="row-fluid stats">
                <p class="time">注册时间: 2013年 02月03日 14时37分37秒 , 上次登录时间: 2013年 03月24日 10时13分13秒</p>
                <span>已连续打卡6天</span>
            </div>
            <!--按钮-->
            <div class="row-fluid">
                <a href="" class="btn btn-primary  pull-right" id="user_edit" command="edit">
                    <i class="icon-pencil icon-white"></i>
                    编辑基本信息
                </a>
            </div>
    <!-- 修改个人信息-->
    <!--名字，分数-->
    <div class="row-fluid">
        <div class="title pull-left" contenteditable="true">名字名字</div>
        <p class="pull-right"><span class="label label-info">0分</span> <span class="label label-info">2000分</span></p>
    </div>
    <!--照片，签名-->
    <div class="row-fluid">
        <div class="img pull-right"><img src="/r/img/person/default-person-icon.jpg"></div>
        <div class="info-text">
            <p contenteditable="true">我身骑白马走三关，改换素衣回中原，放下西凉无人管，一心只想王宝钏。</p>
            <div class="clearfix">
                输入图片地址,网页图片右键选择复制图片地址,本地图片需要临时上传,推荐使用:<a href="http://tu.58task.com/" target="_blank">58广告任务网</a>
                <p contenteditable="true">http://</p>
                <a href="" class="btn">预览</a>
            </div>
            <div>
                在<a href="http://www.xiami.com/widget/imulti" target="_blank">虾米</a> ,粘贴Flash地址到下面
                <p contenteditable="true"></p>
                <a href="" class="btn">预览</a>
            </div>
        </div>
    </div>
    <!--按钮-->
    <div class="row-fluid">
        <a href="" class="btn btn-primary  pull-right" id="user_edit" command="edit">
            <i class="icon-pencil icon-white"></i>
            编辑基本信息
        </a>
    </div>




<br><br><br>



<!---->

			<input type="hidden" id="uid" value="${user.id}">
            <img src="${user.icon}" class="portrait" id="portrait_img" width="200">

			<div id="name" class="name">${user.name}</div>
			<span id="score" class="score"><b>${user.score}</b>分</span> <span
				id="money" class="money"><b>${user.money}</b>金币</span>


			<div id="portrait_edit_container" class="portrait_edit_container">
				<span>输入图片地址,网页图片右键选择复制图片地址,本地图片需要临时上传,推荐使用:</span> <a
					href="http://tu.58task.com/" target="_blank">58广告任务网</a> </span>

				<div id="portrait_edit" class="portrait_edit border_show"
					contenteditable="true">http://</div>
				<a href="" id="portrait_view">预览</a>
			</div>

			<div id="sign" class="sign">${user.sign}</div>




			<div id="music_container" class="music_set_container hidden">

				<span>在<a href="http://www.xiami.com/widget/imulti"
					target="_blank">虾米</a>制作自己的音乐盒,粘贴Flash地址到下面
				</span>

				<div id="music" class="music border_show" contenteditable="true">${user.music}</div>

			</div>


			<div class="user_description">
				已连续打卡${punchCount}天, 注册时间:
				<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
					value="${user.createAt}"></date:date>
				, 上次登录时间:
				<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
					value="${user.loginAt}"></date:date>

			</div>














			<c:choose>
				<c:when test="${user.id==selfID}">
					<div class="edit">
						<a href="" class="btn btn-primary" id="user_edit" command="edit">编辑</a>
						<a href="/player/regedit.do?type=edit" class="btn btn-primary" id="password_edit">修改密码</a>
						

						<a href="" id="show_edit" class="btn btn-primary">设置个人秀</a>



						<a href="" class="user_cancel" id="user_cancel">Cancel</a>
						<div id="stageShow" class="hidden">${user.stageShow}</div>	

					</div>
					
					<div id="showContainer" class="hidden">
							<span class="hint">自定义进出房间个人秀~~~每月200金币~便宜的不行~</span> <input
								id="showContent" type="text" value="" /> <span class="hint">按格式输入表情["提着剑","默默的"]~~最多五个</span>

							<a href="" class="cancel" id="showCommit">确定</a> <a href=""
								class="cancel" id="showCancel">关闭</a>
							
						</div>
				</c:when>
				<c:otherwise>
				<div class="edit">
						<a href="" class="user_cancel" id="user_cancel">Cancel</a>

					</div>
				
				</c:otherwise>
			</c:choose>

		</div>
	</div>
</body>
</html>
