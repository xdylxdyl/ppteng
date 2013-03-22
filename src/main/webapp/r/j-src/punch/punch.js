/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */

var punchService = {

    punch:function () {
        var data;
        $.ajax({
            url:"/player/punch.do",
            data:{},
            async: false,
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
                    top: -20,
                    opacity: 0
                },
                function() {
                    $over.hide().css({
                        top: 0,
                        opacity: 1
                    });
                });

            $money.empty().html("金币 "+data.umoney );
        }
    }
};

$(document).ready(function () {
    $("#punch").bind('click', function () {

        var data = punchService.punch();
        punchView.showPunch(data);

        return false;
    })

});
