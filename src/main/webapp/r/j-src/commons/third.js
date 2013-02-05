/**
 * @directions
 * @author Jqhan <jqhan@gemantic.cn>
 */



$(document).ready(function () {


     var login=function(type,openID,name){

         return ajaxJson("/player/openID.do?", "post", {type:type,openID:openID,name:name}, null, 5000, "json");


     }

    var paras = {};

    //用JS SDK调用OpenAPI
    QC.api("get_user_info", paras)
    	//指定接口访问成功的接收函数，s为成功返回Response对象
    	.success(function(s){
    		//成功回调，通过s.data获取OpenAPI的返回数据
    		alert("获取用户信息成功！当前用户昵称为："+s.data.nickname);

    	})
    	//指定接口访问失败的接收函数，f为失败返回Response对象
    	.error(function(f){
    		//失败回调
    		alert("获取用户信息失败！");
    	})
    	//指定接口完成请求后的接收函数，c为完成请求返回Response对象
    	.complete(function(c){
    		//完成请求回调
    		alert("获取用户信息完成！");
    	});


});