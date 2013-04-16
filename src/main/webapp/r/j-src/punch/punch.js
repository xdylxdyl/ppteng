/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */
var isBeautiful=false;

var punchService = {

    punch:function () {
        var data;
        $.ajax({
            url:"/player/punch",
            data:{},
            async:false,
            type:"post",
            dataType:"json",
            success:function (result) {
                if (result.code == "0") {
                    data = result;
                } else {
                    data = false;
                }
            }
        });
        return data;
    }

};

var punchView = {
    showPunch:function (data) {
        if (data != false) {
            var $over = $("#punchOver");//增加的分数
            var $money = $("#money");//总的分数
            $over.text('+' + data.money).show()
                .animate({
                    top:-100,
                    opacity:0.5,
                    fontSize:"2em"

                }, 800, "swing", function () {
                    $over.hide().css({
                        top:0,
                        opacity:1
                    });

                    $("#punchBox").hide();

                })
            ;
            $("#punch").removeClass().addClass("btn btn-warning").attr("disabled", true)
              $money.empty().html("金币 " + data.umoney);


        }
    }
};

$(document).ready(function () {
    $("#punch").bind('click', function () {

         var data = punchService.punch();
       // var data = {"umoney":2200, "money":200};
        punchView.showPunch(data);

        return false;
    })

});
