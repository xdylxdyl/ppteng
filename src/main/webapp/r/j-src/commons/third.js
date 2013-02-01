/**
 * @directions
 * @author Jqhan <jqhan@gemantic.cn>
 */



$(document).ready(function () {

    $("#login").click(function () {

        QC.Login.getMe(login(openId, accessToken){}):void



      });

     var login=function(openId,accessToken){

         return ajaxJson("/player/openID.do?", "post", {type:"qq",openID:openID}, null, 5000, "json");




     }


});