/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午12:45
 * To change this template use File | Settings | File Templates.
 */

var headView = {
    highLight:function (v) {

        switch (v) {
            case 'index':
                $("#nav li").eq(0).addClass("active");
                break;
            case 'game':
                $("#nav li").eq(1).addClass("active");
                break;
            case 'case':
                $("#nav li").eq(2).addClass("active");
                break;
            case 'person':
                $("#nav li").eq(3).addClass("active");
                break;
            case 'about':
                $("#nav li").eq(6).addClass("active");
                break;
            default:
                ;
        }
    }

}


$(document).ready(function () {



        $("#navLogout").click(function () {
            QC.Login.signOut();
            window.location.href="/player/offline.do";
            return false;

        });

    }
)

