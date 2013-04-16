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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>LogIn</title>
<link href="r/c/index.css" rel="stylesheet" />
<script src="r/j-src/jquery/jquery-1.6.1.js"></script>
<script type="text/javascript">

//显示灰色遮罩层
function showBg() {
    var bh = $(window).height();
    var bw = $(window).width();
    $("#mask").css({
        height:bh,
        width:bw,
        display:"block"
    });
    $("#mask").show();
}
//关闭灰色遮罩
function closeBg() {
    $("#mask").hide();
}
$(document).ready(function() {
    function checkhHtml5() {
        if (typeof(Worker) !== "undefined") {
            //什么都不用做
           // alert("支持~")
        }
        else {
            showBg();
        }
    }
    checkhHtml5();
    $(window).resize(function() {
        checkhHtml5();
    })
})
</script>
</head>
<body>
	<%--<form>--%>
	<%--<h1>Log In</h1>--%>
	<%--<fieldset class="radios">	--%>
	<%--<input type="radio" value="google" name="lei"  checked="checked">Google--%>
	<%--<input type="radio" value="yahoo" name="lei">Yahoo--%>
	<%--<input type="radio" value="cms" name="lei">cms--%>
	<%--</fieldset>--%>
	<%--<fieldset class="username">--%>
	<%--<label>USERNAME</label><input type="text"><br />--%>
	<%--<label>PASSWORD</label><input type="password">--%>
	<%--</fieldset>--%>
	<%--<fieldset class="action">--%>
	<%--<input type="submit" value="Log in">--%>
	<%--</fieldset>--%>
	<%--</form>--%>



	<form action="/player/login " method="post">
		<h1>Log In</h1>

		<fieldset class="email">
			<label>email</label><input type="text" name="email"><br />
		</fieldset>
		<fieldset class="password">
			<label>password</label><input type="password" name="password"><br />
		</fieldset>

		<div class="login_hint">
			<c:if test="${code!=0}">
				<label><spring:message code="${code}" /></label>
			</c:if>

		</div>

		<fieldset class="action">
			<input type="submit" value="Log in">
		</fieldset>

	</form>
	


	<div class="regedit">
		<a href="/player/regedit ">一分钟注册</a>

	</div>

    <div class="past">
			<p>若你肯拥抱我.手臂枯干又如何 若你肯亲吻我.双唇冰冷又如何 我不需要更多,给我更多又如何 我不想要更多,给了更多又如何</p>

			<p>若你能看着我,目光冷漠又如何 若你能陪着我,心不在焉又如何 你不用给更多,给我更多又如何 你不必给更多,给了更多又如何</p>

			<p>我全都不舍得,你全都不记得. 谁曾经不舍得,谁全都不记得. 不记得我又如何,不记得你又如何 我记得你又如何,被迫忘记又如何</p>

			<p>若你能想起我,身形模糊又如何 若你能提到我,神色轻蔑又如何 从不曾有更多,有过更多又如何 从不会有更多,会有更多又如何</p>
		</div>
    







	<div id="mask">
		<p>您的浏览器版本太低，别再使用360安全浏览器/IE 这些Toooooooooooooooold的浏览器了,他们不支持HTML5的功能,会导致样式错乱以及JS无法使用</p>
		<p>赶紧的使用最新版本的<a href="http://www.firefox.com.cn/download/">FireFox</a>/
		<a href="http://dl.pconline.com.cn/download/51614.html">Chrome</a>/
		<a href="http://ie.sogou.com/">Sogou</a>(高速模式)/
		<a href="http://chrome.360.cn/">360极速浏览器</a>(注意不是360安全浏览器,注意如果仍然出现提示框,点击地址栏之后的图标切换成极速模式,同搜狗)
		</p>
		
		
	</div>
</body>
</html>

