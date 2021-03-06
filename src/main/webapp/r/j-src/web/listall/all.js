/**
 * @directions
 * @author Jqhan <jqhan@gemantic.cn>
 */
version = "xxxx";


/*
 * 弹出层
 * */
var modal = (function () {
    var $overlay = $('<div id="overlay"></div>'),
        $modal = $('<div id="modal"></div>'),
        $content = $('<div id="modal-content"></div>'),
        $close = $('#close-content');
    var method = {};

    $modal.hide();
    $overlay.hide();
    $modal.append($content);
    $(document).ready(function () {
        $('body').append($overlay, $modal);
    });

    method.center = function () {
        var left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;
        var top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;

        $modal.css({
            top:top + $(window).scrollTop(),
            left:left + $(window).scrollLeft()
        })
    };

    method.open = function (data) {

        $content.empty().append(data);
        method.center();
        $(window).bind('resize.modal', this.center);

        $modal.show();
        $overlay.show();


    };

    method.close = function () {
        $modal.hide();
        $overlay.hide();
        $content.empty();
        $(window).unbind('resize.modal');
    };

    return method;
}());

function createRoom(v) {

    version = v;
    var uid = $("#uid").val();

    var oldRoom = playerService.getRoomOfPerson(uid);
    if (oldRoom != null) {
        alert(" 已经在一个房间 [" + oldRoom.name + "] 里了,怎么可以再创建另一个,你当我写的程序是傻的啊亲..");
        return false;
    }


    $.ajax({
        url:"/m/form/init",
        data:{uid:uid, version:v},
        type:"GET",
        success:function (data) {
            modal.open(data);
        }
    });
    return false;

}


var defaultImg = "/r/img/room/wait.jpg";


function VersionConfigCtrl($scope) {
    $scope.test = "xx";
    $scope.versionConfig = [
        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111240tbpbm4hh422azsva.jpg",
            version:"simple_1.0",
            title:"杀人游戏 简化版"
        },
        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111241h67tuc6gfzreceki.jpg",
            version:"killer_police_1.0",
            title:"杀人游戏 警版"
        },
        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111241b4j5orcp5xuc9auc.jpg",
            version:"killer_police_secret_1.0",
            title:"杀人游戏 警版不翻牌"
        },
        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111243mn5n2x256xj22szn.jpg",
            version:"ghost_simple_1.0",
            title:"捉鬼游戏 简化版"
        },

        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111244a9rhzmmh0rqzmz1b.jpg",
            version:"ghost_question_2.0",
            title:"捉鬼游戏 猜词版"
        },
        /* {
         img:"http://download.ptteng.com/group1/M00/00/00/KnlxRlGLfr7O0rCtAAIoXr_bQgo287.jpg",
         version:"ghost_soul_1.0",
         title:"捉鬼游戏 魂版"
         },*/


        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111242foxwxjpapbiz8fpp.jpg",
            version:"wolf_burg_1.0",
            title:"炸狼堡"
        },



        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111239tccjmmq7wd2ss62z.jpg",
            version:"mine_1.0",
            title:"多人扫雷"
        },
        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111242cmiccyy0ucayk00q.jpg",
            version:"video_1.0",
            title:"虚拟电影院"
        },
        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111238y1c1m71pjl5ajhhv.jpg",
            version:"labs_diy_1.0",
            title:"DIY游戏室"
        },
        {
            img:"http://bbs.ptteng.com/data/attachment/forum/201504/30/111238vbjep7vbyuypuvx9.jpg",
            version:"rest_1.0",
            title:"茶座"
        }
    ]

};


$(document).ready(function () {

    headView.highLight("game");

    //  hint();

    function hint() {
        var old = $("#oldRoom").val();
        if (old == "") {

        } else {
            alert("亲,不要脚踏两只船好么,你已经在房间" + old + "中就不要再往这个房间里挤了,赶紧的退出来再进好吧..");
        }

    }

    $(".enterRoom").bind('click', function () {

        var uid = $(this).attr("uid");
        var rid = $(this).attr("rid");
        var oldRoom = playerService.getRoomOfPerson(uid);
        if (oldRoom != null && oldRoom.id != rid) {
            alert(" 已经在一个房间 [" + oldRoom.name + "] 里了,怎么可以再进另一个,你当我写的程序是假的啊亲..");
            return false;
        }
        redirect("/m/play/enter?rid=" + rid + "&uid=" + uid);

        return false;

    });


    $(".sample").hover(function () {
        $(this).addClass("samplehover");
    }, function () {
        $(this).removeClass("samplehover");
    });


    /*
     * 创建房间
     * */
    $("#createRoom").bind('click', function () {
        return createRoom("");
    });

    /*
     * 创建房间
     * */
    $(".createCategory").on('click', function () {
        var v = $(this).attr("version");
        return createRoom(v);
    });


    /*
     $(".cancel").click(function() {
     $("#uplayer").hide();
     });
     $("#cancel").click(function() {
     $("#uplayer").hide();
     })*/


});
