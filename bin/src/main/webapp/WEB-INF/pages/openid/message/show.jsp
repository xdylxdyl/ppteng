<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<HTML>
<HEAD>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
 <h1>You have successfully signed on!</h1>
 
 
 
	      <p>Identity: " ${auth.identity}</p>
	      
	      
	       <p>Email: "  ${auth.email}</p>
	       <p>Full name: "  ${auth.fullname}</p>
	       <p>First name: " ${auth.firstname}</p>
	       <p>Last name: " ${auth.lastname}</p>
	       <p>Gender: " ${auth.gender}</p>
	       <p>Language: "  ${auth.language} </p>
	       

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
				<td >用户名： </td>
				<td><input id="userName" type="text" value=""/></td>
			</tr>
			
			<tr>
				<td >密码： </td>
				<td><input id="userPwd" type="password" value=""/></td>
			</tr>
			
			<tr>
				<td colspan="2"><input id="btn_userLogin_submit" type="submit" value="确定" /> <input type="reset" value="Reset" /></td>
			</tr>
		</tbody>
	</table>
  </div>
</div>

</BODY>
</HTML>