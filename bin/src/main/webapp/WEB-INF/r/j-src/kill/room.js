



	function loadXMLDoc(){

		$(document).ready(function () {
			var getuid = document.getElementsByName("uid")[0].value;//获取uid和rid;
			var getrid = document.getElementsByName("rid")[0].value;
			


			$.ajax({  
				             type: "POST", url: '/a/player/ready.do?', data: "rid="+getrid+"&uid="+getuid,  
				             complete: function(data){  
				                    //print results as appended   
				                   alert(data.responseText);
				                 document.getElementsByNames("game_ready")[0].style.display="none";
					           	 document.getElementById("message").innerHTML="已准备";
				                 //if (str.code=0){
				           		//{
				           		//document.getElementsByNames("game_ready")[0].style.display="none";
				           		//document.getElementById("message").innerHTML="已准备";
				           		//}
				           		//}else{
				           		//document.getElementById("message").innerHTML=str.message;
				           		//}
				                  
				               }  
				           });  
			
			}); 
		
	}

	function click_a(divDisplay)
	{
	    if(document.getElementById(divDisplay).style.display != "block")
	    {
	        document.getElementById(divDisplay).style.display = "block";
	    }
	    else
	    {
	        document.getElementById(divDisplay).style.display = "none";
	    }
	}


