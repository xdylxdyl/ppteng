/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function () {

    headView.highLight("person");
    leftView.highLight("leftNav_punch");

    var  container = document.getElementById('container');
    var start = new Date("2009/01/01 01:00:00").getTime();
    var data = [];

    for (i = 0; i < 100; i++) {
        x = start + (i * 1000 * 3600 * 24 * 100);
        data.push([x, Math.floor(Math.random() * 2 + 4)]);
    }
    drawUtil.line(container, data)


})


