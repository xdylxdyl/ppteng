/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */
var isBeautiful=false;

var punchService = {

    punch:function (isBeautiful) {
        var data;
        $.ajax({
            url:"/player/punch.do",
            data:{isBeautiful:isBeautiful},
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

        alert("哈哈哈哈哈哈,今天是愚人节~\n我是黑客Mr.X啊,我入侵网站了~\n我是不会放过这个捉弄你们的机会么?");
        alert("好吧.你猜我会不会说,今天打卡是要扣钱的啊,\n不过现在你害怕也没有用啊.已经这样了!");
        alert("嘿嘿.逗你玩呢.打卡还是要给钱的.\n不过呢.在打卡之前,你要先回答一个问题啊,\n回答的对了,打卡钱加三倍!,回答的错了!就么有钱了!");
        isBeautiful=  confirm("老板是不是很漂亮啊?\n是就点确定,不是就点取消~\n一定要慎重啊,选错了说不定还要扣钱呢!");
        alert("好吧,你已经选过了~\n是对是错.嘿嘿.接下来看看打卡钱就知道了~");
        alert("哈哈哈哈哈,我又捉弄你们了,\n其实不管怎么选,钱都不会变的啊.\n站长自己不是一个开心的人,但是希望你们每一个人都可以开开心心~\n希望你们记着我,黑客Mr.x~我们明年见~");
         var data = punchService.punch(isBeautiful);
       // var data = {"umoney":2200, "money":200};
        punchView.showPunch(data);

        return false;
    })

});
