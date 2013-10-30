/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-2-16
 * Time: 下午1:16
 * To change this template use File | Settings | File Templates.
 */

checkhHtml5();

//显示灰色遮罩层
function showBg() {

    document.getElementById("#mask").show();


}
//关闭灰色遮罩
function closeBg() {
    document.getElementById("#mask").hide();
}

function checkhHtml5() {

    if ("WebSocket" in window) {
        //什么都不用做


    }
    else {

        showBg();
    }

}



