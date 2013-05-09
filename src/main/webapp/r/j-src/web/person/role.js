/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */

var roleView = {
    getRoleStart:function () {
        return parseInt(1);
    },
    getRoleContent:function(){
        return $("#role").val();
    },
    getUserName:function(){
        return $("#uname").val();
    },
    getMaxKiller:function(){
        return $("#maxKiller").val();
    },
    getMaxWater:function(){
          return $("#maxWater").val();
      }

}

var punchService={
    getData:function(){

           var start =roleView.getRoleStart();
           var data = [];

           var content=roleView.getRoleContent();

           for (i = 0; i < content.length; i++) {

               var y;
               console.log(content.charAt(i));
               if('W'==content.charAt(i)){
                   y=0.3;
               }else{
                   y=1;
               }
               data.push([start, y]);
               start = start + 1;
           }
        return data;
    },
    draw:function(){
        var container = document.getElementById('container');
          var data=punchService.getData();
          drawUtil.lineRole(container, data,roleView.getUserName()+"--身份线 最大连杀 "+roleView.getMaxKiller()+" 最大连水 "+roleView.getMaxWater())

    }
}

$(document).ready(function () {

    headView.highLight("person");


    leftView.highLight("leftNav_role");

    punchService.draw();

    $(window).resize(function() {
        punchService.draw();
    });


})


