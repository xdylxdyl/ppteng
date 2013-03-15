/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */

var punchView = {
    getPunchStart:function () {
        return parseInt($("#punchStart").val());
    },
    getPunchContent:function(){
        return $("#punch").val();
    }
}

$(document).ready(function () {

    headView.highLight("person");


    leftView.highLight("leftNav_punch");


    var container = document.getElementById('container');
    var start =punchView.getPunchStart();
    var data = [];

    var content=punchView.getPunchContent();

    for (i = 0; i < content.length; i++) {

        var y;
        console.log(content.charAt(i));
        if('N'==content.charAt(i)){
            y=0;
        }else{
            y=1;
        }
        data.push([start, y]);
        start = start + 1000 * 3600 * 24;
        console.log(start+" is "+y);
    }
    drawUtil.line(container, data)


})


