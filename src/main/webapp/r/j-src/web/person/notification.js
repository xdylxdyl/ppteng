/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(function () {

    headView.highLight("person");

    leftView.highLight("leftNav_notification");


    $("#settingButton").click(function () {
        notifyUtil.sendNotify("亲爱的", "这就是通知的样子～", "");

     });



})


