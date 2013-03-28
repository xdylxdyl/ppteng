/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午12:45
 * To change this template use File | Settings | File Templates.
 */
var headLink = function (link, name) {
    return{
        link:link,
        name:name
    }

}

var headView = {
    highLight:function (v) {
        var id="nav_"+v;
        $("#"+id).addClass("active");

    },
    showSelf:function (link) {

        var selfNode = " <li><a href='" + link.link + "'>" + link.name + "</a></li>";
        $(selfNode).insertBefore($("#firstHead li:eq(0)"));

    }


}

var headService = {
    initSelf:function () {
        var hl = headService.getLink();
        headView.showSelf(hl);
    },
    ajaInitSelf:function(){
        ajaxJson("/player/self.do?", "post", {}, headService.showAjaxResult, 5000, "json",true);
    },
    getLink:function () {
        var name = headService.getSelf();
        if (name == null) {
            return new headLink("/", "登录");
        } else {
            return new headLink("/player/detail.do", name);
        }
    },
    getSelf:function () {

        return ajaxJson("/player/self.do?", "post", {}, this.parseName, 5000, "json");

    },
    parseName:function (result) {
        return result.name;

    },
    showAjaxResult:function (result) {
        var hl;
        if (result.code != 0) {
            hl = new headLink("/", "登录");
        } else {
            hl = new headLink("/player/detail.do", result.name);
        }
        headView.showSelf(hl);

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


        //set self
        headService.ajaInitSelf();
    }
)

