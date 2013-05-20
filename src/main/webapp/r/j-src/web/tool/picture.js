/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */

window.onload = function () {
    xiuxiu.embedSWF("altContent", 3, "100%", "100%");
    /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
    xiuxiu.setUploadURL("http://imgkaka.meitu.com/picsave.php");//修改为您自己的上传接收图片程序
    xiuxiu.onInit = function () {
        xiuxiu.loadPhoto("http://open.web.meitu.com/sources/images/1.jpg");
    }
    xiuxiu.onUploadResponse = function (data) {
        //alert("上传响应" + data);  可以开启调试
    }
}


$(document).ready(function () {
    headView.highLight("tool");
    leftView.highLight("nav_picture");

})
