/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(function () {

    headView.highLight("person");

    leftView.highLight("leftNav_music");

   //判断是否有音乐盒
        musicUtil.displayMusic();
})


