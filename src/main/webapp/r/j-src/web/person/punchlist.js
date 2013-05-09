/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */

var punchView = {
    getRoleStart:function () {
        return parseInt($("#punchStart").val());
    },
    getRoleContent:function(){
        return $("#punch").val();
    },
    getUserName:function(){
        return $("#uname").val();
    }

}

var punchService={
    getData:function(){

           var start =punchView.getRoleStart();
           var data = [];

           var content=punchView.getRoleContent();

           for (i = 0; i < content.length; i++) {

               var y;
               console.log(content.charAt(i));
               if('N'==content.charAt(i)){
                   y=0.3;
               }else{
                   y=1;
               }
               data.push([start, y]);
               start = start + 1000 * 3600 * 24;
           }
        return data;
    },
    draw:function(){
        var container = document.getElementById('container');
          var data=punchService.getData();
          drawUtil.line(container, data,punchView.getUserName()+"--打卡线")

    }
}

$(document).ready(function () {

    headView.highLight("person");


    leftView.highLight("leftNav_punch");

    punchService.draw();

    $(window).resize(function() {
        punchService.draw();
    });


})


