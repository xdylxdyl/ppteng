/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午12:45
 * To change this template use File | Settings | File Templates.
 */

var headView = {
    highLight:function(v) {

        switch (v) {
            case 'game':
                $("#nav li").eq(1).addClass("on");
                break;
            case 'case':
                $("#nav li").eq(2).addClass("on");
                break;
             case 'person':
                $("#nav li").eq(3).addClass("on");
                break;
            default:
                ;
        }
    }

}


