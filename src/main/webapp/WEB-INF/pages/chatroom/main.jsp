<HTML>
<HEAD>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<!-- 
<script type="text/javascript" src="http://flxhr.flensed.com/code/build/flXHR.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script src="/resource/jquery.flXHRproxy.js"></script>
<script src="/resource/json.js"></script>
<script src="/resource/jquery.comet.js"></script>
-->


<script src="/resource/jquery.js"></script>
<script type="text/javascript">

function logoutSuccess(code) {
	if (code == 1) return true;

	return false;
}

// Accepts a url and a callback function to run.  
function requestCrossDomain( site, callback ) {  
  
    // If no url was passed, exit.  
    if ( !site ) {  
        alert('No site was passed.');  
        return false;  
    }  
  
    // Take the provided url, and add it to a YQL query. Make sure you encode it!  
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"') + '&format=xml&callback=cbFunc';  
  
    // Request that YSQL string, and run a callback function.  
    // Pass a defined function to prevent cache-busting.  
    $.getJSON( yql, cbFunc );  
  
    function cbFunc(data) {  
    // If we have something to work with...  
    if ( data.results[0] ) {  
        // Strip out all script tags, for security reasons.  
        // BE VERY CAREFUL. This helps, but we should do more.  
        data = data.results[0].replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');  
  
        // If the user passed a callback, and it  
        // is a function, call it, and send through the data var.  
        if ( typeof callback === 'function') {  
            callback(data);  
        }  
    }  
    // Else, Maybe we requested a site that doesn't exist, and nothing returned.  
    else throw new Error('Nothing returned from getJSON.');  
    }  
} 

function appendChatMsg(message) {
	$("#div_msg_list").html(message);
}

function appendUserMsg(message) {
	$("#div_user_list").html(message);
}

$(document).ready(function() {
	var name = $("#userName").val();
	var uId = $("#userId").val();
	
	//loading all login user list
	$.ajax({ 
		type: 'POST',
		url: "/user/list.do",
		dataType: "json",
		success : function(data){
			//format user list selection
			userList = data.data;

			$.each(userList, function(index, user) {
				$("#slt_user_list").append(
						$("<option></option>").attr("value", user.name).text(user.name)
				);
			})
		},
		error : function(xhr, ajaxOptions, thrownError){
		}
	})
	
	//init btns
	$("#btn_logout").click(function(){
		$.ajax({ 
			type: 'POST',
			url: "/user/logout.do",
			dataType: "json",
			data: {
				name: name
			},
			success : function(data){
				//redirect to login page
				if (logoutSuccess(data.message.code)) {
					$(location).attr('href', '/login.do');
				}
				else {
					displayMsg("Logout error : can not logout.");
				};
			},
			error : function(xhr, ajaxOptions, thrownError){
			}
		})
	})

	$("#btn_send_msg").click(function(){
		$.ajax({ 
			type: 'POST',
			url: "/xroom/send.do",
			dataType: "json",
			data: {
				from: name,
				to: $("#slt_user_list").val(),
				message : $("#txt_msg").val()
			},
			success : function(data){
				
			},
			error : function(xhr, ajaxOptions, thrownError){
			}
		})
	})

	//$.comet.init("http://10.0.0.40:8000");
    //$.comet.subscribe("/test/1", appendChatMsg);

	//jQuery.flXHRproxy.registerOptions("http://10.0.0.40:8000",{xmlResponseText:false, loadPolicyURL:"http://10.0.0.40:8000/policy.xml"});
})
var usecount = 0;
function doit() {
	jQuery.ajaxSetup({error:handleError});
	$.comet.init("http://10.0.0.40:8000");
	$.comet.subscribe("/test/1", appendChatMsg);
	//var count = (usecount+1);
	//for (var i=0; i<count; i++) {
		//var requestbody = "My name is jQuery-Test (#"+(++usecount)+")";
		//jQuery.ajaxSetup({error:handleError});
		//jQuery.post(
		//	"http://10.0.0.40:8000/textme.html",
		//	requestbody,
		//	handleLoading
		//);
	//}
}

function handleLoading(data,status,jqXHR) {
	var XHRobj = jqXHR.__flXHR__;
	if (XHRobj.readyState == 4) {
		alert("readyState:"+XHRobj.readyState
			+"\nresponseText:"+XHRobj.responseText
			+"\nstatus:"+XHRobj.status
			+"\nstatusText:"+XHRobj.statusText
			+"\nSource Object Id: "+XHRobj.instanceId
		);
	}
}

function handleError(jqXHR,errtype,errObj) {
	var XHRobj = jqXHR.__flXHR__;
	alert("Error: "+errObj.number
		+"\nType: "+errObj.name
		+"\nDescription: "+errObj.description
		+"\nSource Object Id: "+XHRobj.instanceId
	);
}

function test()
{
    pipeFrame.testIframe();
}
</script>

</HEAD>
<BODY>
<div id="test"> </div>
<div><input id="userName" type="hidden" value="${name}" /><input id="userId" type="hidden" value="${id}" /></div>
<div id="room_main">
  <div id="div_user_list">
  </div>
  
  <div id="div_msg_list">
  </div>
  
  <div id="div_toolbar">
  	<input type="text" id="txt_msg" value=""/><select id="slt_user_list"><option>All</option></select><input type="button" id="btn_send_msg" value="Send" />
  </div>
  
  <div id="div_logout">
  	<input type="button" id="btn_logout" value="Logout" />
  </div>
</div>
<input type="button" value="Hop" onclick="test();" />
<iframe id="pipeFrame" name="pipeFrame" src="http://10.0.0.40:8000/test/1"></iframe>

<input type="button" value="Click Me" onClick="doit();" />

</BODY>
</HTML>