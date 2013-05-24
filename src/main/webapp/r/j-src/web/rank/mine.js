/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:26
 * To change this template use File | Settings | File Templates.
 */

var mineRankView = {

    getType:function(){

        return $("#version").val();
    }


}


$(document).ready(function () {

    headView.highLight("rank");
    var type=mineRankView.getType();
    leftView.highLight("leftNav_"+type);


});


