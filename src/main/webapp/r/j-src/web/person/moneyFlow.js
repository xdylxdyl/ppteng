/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */


var moneyFlowView = {
    getType:function () {
        return $("#type").val();
    }
}

$(document).ready(function () {

    headView.highLight("financial");
    var type = moneyFlowView.getType();
    leftView.highLight("leftNav_moneyFlow_" + type);


})


