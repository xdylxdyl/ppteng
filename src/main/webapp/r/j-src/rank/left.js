/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-10
 * Time: 下午8:09
 * To change this template use File | Settings | File Templates.
 */
var leftView = {
    highLight:function (v) {

        switch (v) {
            case 'money':
                $("#leftNav_money").addClass("active");
                break;
            default:
                ;
        }
    }

}