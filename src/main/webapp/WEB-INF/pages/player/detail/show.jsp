<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../../includes/includes.jsp"%>
<!DOCTYPE HTML>


<!-- 个人信息,积分,金币 -->
<div class="span9 detail_container">
	<div id="personal" class="${class} personal well">
		<!--名字，分数-->
		<div class="row-fluid">
			<p>
				葡萄号<span class="label label-inverse"> ${current.id}</span>
			</p>
			<div class="title pull-left" id="editName"><a href="/player/detail.do?uid=${current.id}">${current.name}</a></div>
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
				,打卡时间
				<date:date pattern="yyyy年 MM月dd日  HH时mm分mm秒 "
					value="${current.punchAt}"></date:date>
			</p>
		</div>


	</div>
</div>

