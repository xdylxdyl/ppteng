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
                $("#nav_index").addClass("active");
                break;
            case 'game':
                $("#nav_game").addClass("active");
                break;
            case 'case':
                $("#nav_case").addClass("active");
                break;
            case 'person':
                $("#nav_person").addClass("active");
                break;
            case 'about':
                $("#nav_about").addClass("active");
                break;
            case 'rank':
                $("#nav_rank").addClass("active");
                break;
            default:
                ;
        }
    }


}

function AddFavorite(sURL, sTitle) {
    if (sTitle == '') {
        sTitle = '葡萄藤';
    }
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("按下Ctrl+D加入收藏夹~");
        }
    }


    ;
}

$(document).ready(function () {


        $("#navLogout").click(function () {


            return true;

        });


        $("#mobinav").bind("click", function () {
            $("#main_menu").slideToggle();
        });

    }
)

