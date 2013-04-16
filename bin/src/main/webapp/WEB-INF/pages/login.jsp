<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<HTML>
<HEAD>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<script src="/resource/jquery.js"></script>

<script type="text/javascript">
function displayMsg(msg) {
	$("#div_msg_show").html(msg);
}

function loginSuccess(code) {
	if (code == 1) return true;
	return false;
}



$(document).ready(function() {

	$("#btn_userLogin_submit").click(function(){
		$("#btn_userLogin_submit").attr("disabled","disabled");
		$.ajax({ 
			type: 'POST',
			url: "/user/checkout ",
			dataType: "json",
			data: {
				name: $("#userName").val(),
				password: $("#userPwd").val()
			},
			success : function(data){
				//redirect to chatroom page
				if (loginSuccess(data.message.code)) {
					user = data.user;
					$(location).attr('href', '/xroom/main?name=' + user.name);
				}
				else {
					displayMsg("Login error : name or password error, try again please.");
				};
				$("#btn_userLogin_submit").removeAttr("disabled");
			},
			error : function(xhr, ajaxOptions, thrownError){
				displayMsg("Error status : " + xhr.status);
				$("#btn_userLogin_submit").removeAttr("disabled");
			}
		})
	})
})
</script>

</HEAD>
<BODY>

	<div id="user_login">
		<div id="login_form">
			<table>
				<tbody>
					<tr>
						<td colspan="2"><div id="div_msg_show"></div></td>
					</tr>

					<tr>
						<td>邮箱：</td>
						<td><input id="userName" type="text" value="" /></td>
					</tr>

					<tr>
						<td>密码：</td>
						<td><input id="userPwd" type="password" value="" /></td>
					</tr>

					<tr>
						<td colspan="2"><input id="btn_userLogin_submit"
							type="submit" value="确定" /> <input type="reset" value="Reset" /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div>
			<p>若你肯拥抱我.手臂枯干又如何 若你肯亲吻我.双唇冰冷又如何 我不需要更多,给我更多又如何 我不想要更多,给了更多又如何</p>

			<p>若你能看着我,目光冷漠又如何 若你能陪着我,心不在焉又如何 你不用给更多,给我更多又如何 你不必给更多,给了更多又如何</p>

			<p>我全都不舍得,你全都不记得. 谁曾经不舍得,谁全都不记得. 不记得我又如何,不记得你又如何 我记得你又如何,被迫忘记又如何</p>

			<p>若你能想起我,身形模糊又如何 若你能提到我,神色轻蔑又如何 从不曾有更多,有过更多又如何 从不会有更多,会有更多又如何</p>
		</div>

		<div>
			<a href="/player/regedit ">注册:</a>

		</div>

	</div>

</BODY>
</HTML>