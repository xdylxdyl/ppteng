/**
 * @directions
 * @author Jqhan <jqhan@gemantic.cn>
 */
$(document).ready(function() {

    headView.highLight("game");

  //  hint();

    function hint() {
        var old = $("#oldRoom").val();
        if (old == "") {

        } else {
            alert("亲,不要脚踏两只船好么,你已经在房间" + old + "中就不要再往这个房间里挤了,赶紧的退出来再进好吧..");
        }

    }

    $("h4 a").bind('click', function() {

        var uid = $(this).attr("uid");
        var rid = $(this).attr("rid");
        var oldRoom = playerService.getRoomOfPerson(uid);
        if (oldRoom != null && oldRoom.id != rid) {
            alert(" 已经在一个房间 ["+oldRoom.name+"] 里了,怎么可以再进另一个,你当我写的程序是假的啊亲..");
            return false;
        }
        redirect("/m/play/enter.do?rid=" + rid +"&uid ="+uid);

        return false;

    });


    $(".sample").hover(function() {
        $(this).addClass("samplehover");
    }, function() {
        $(this).removeClass("samplehover");
    });


    /*
    * 创建房间
    * */
    $("#createRoom").bind('click', function() {
        var uid = $("#uid").val();

        var oldRoom = playerService.getRoomOfPerson(uid);
        if (oldRoom != null) {
            alert(" 已经在一个房间 ["+oldRoom.name+"] 里了,怎么可以再创建另一个,你当我写的程序是傻的啊亲..");
            return false;
        }


        $.ajax({
            url : "/m/form/init.do",
            data : {uid : uid},
            type: "GET",
            success : function(data) {
                //loadIn(data);
                modal.open(data);
            }
        });
        /**/
        return false;
    });

    $("#punch").bind('click', function() {
        var p = $("#punch").attr("punch");
        if ("true" == p) {
            return false;
        }
        $("#punch").attr("punch", true);
        $("#punch").html("已打卡");
        $("#punch").removeClass().addClass("button");


        var uid = $("#uid").val();

        $.ajax({
            url : "/player/punch.do",
            data : {},
            type: "post",
            dataType:"json",
            success : function(data) {

                if (data.code == "0") {
                    $("#money").empty().html("金币 "+data.umoney );
                }


            }
        })

        /**/
        return false;
    });


    /*
    * 弹出层
    * */
    var modal = (function() {
        var $overlay = $('<div id="overlay"></div>'),
            $modal = $('<div id="modal"></div>'),
            $content = $('<div id="modal-content"></div>'),
            $close = $('#close-content');
        var method = {};

        $modal.hide();
        $overlay.hide();
        $modal.append($content);
        $(document).ready(function(){
            $('body').append($overlay, $modal);
        });

        method.center = function() {
            var left = Math.max($(window).width() - $modal.outerWidth() , 0) / 2;
            var top = Math.max($(window).height() - $modal.outerHeight() , 0) / 2;

            $modal.css({
                top: top + $(window).scrollTop(),
                left: left + $(window).scrollLeft()
            })
        };

        method.open = function(data) {
            $content.empty().append(data);
            method.center();
            $(window).bind('resize.modal', this.center);

            $modal.show();
            $overlay.show();
        };

        method.close = function() {
            $modal.hide();
            $overlay.hide();
            $content.empty();
            $(window).unbind('resize.modal');
        };

        return method;
    }());


    $(".cancel").click(function() {
        $("#uplayer").hide();
    });
    $("#cancel").click(function() {
        $("#uplayer").hide();
    })


})