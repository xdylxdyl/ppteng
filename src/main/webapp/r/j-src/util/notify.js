/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-5-29
 * Time: 下午5:24
 * To change this template use File | Settings | File Templates.
 */

var notifyUtil = {



    sendNotify:function (title, content, icon) {
        if (!window.webkitNotifications) {

        } else {
            if (window.webkitNotifications.checkPermission() != 0) {
                notifyUtil.RequestPermission(notifyUtil.sendNotify);
            } else {
                var notification = window.webkitNotifications.createNotification(icon, title, content);
                notification.ondisplay = function (event) {
                    setTimeout(function () {
                        event.currentTarget.cancel();
                    }, 2 * 1000);
                }

                notification.show();

            }
        }


    },
    RequestPermission:function (callback) {
        window.webkitNotifications.requestPermission(callback);
    }

}


