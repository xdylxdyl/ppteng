/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */


var tradeModel = {
    init:function (uid, money, comments) {
        return{
            uid:uid,
            money:money,
            comments:comments
        }
    }
}

var tradeView = {

    getTrade:function () {
        var uid = parseInt(tradeView.getUid());
        var money = parseInt(tradeView.getMoney());
        var comments = tradeView.getComments();
        return tradeModel.init(uid, money, comments);

    },
    getUserMoney:function () {
        return parseInt($("#currentMoney").text());
    },
    getUid:function () {
        return $("#uid").val();

    },
    getMoney:function () {
        return $("#money").val();

    },
    getComments:function () {
        var text = $("#comments").val();
        return  $("#hint").text(text).html();

    },
    showResult:function (result) {

        var message;
        var code = result.code;
        if (code == 0) {
            message = "转帐成功~";
            tradeView.showMoney(result.money);

        } else {
            message = result.message;
        }
        tradeView.showHint(message);
        alert(message);

    },
    showMoney:function (money) {
        $("#currentMoney").empty().text(money);
    },
    showHint:function (hint) {
        $("#hint").empty().text(hint);
    },
    disableCommit:function () {

        $("completeBtn").attr("disabled", true);
    },
    enableCommit:function () {
        $("completeBtn").attr("disabled", false);
    },
    showUser:function(data){

          var link="<a href='/player/detail?uid=" +data.id + "'>" + data.name + "</a>"
         $("#uname").empty().append(link);

         $("#icon").attr("src",data.icon);
         $("#icon").attr("alt",data.name);
     }

}
var tradeService = {
    trade:function (trade) {
        return ajaxJson("/money/trade?", "post",
            trade, tradeService.parse, 5000, "json");
    },
    search:function(uid){
          ajaxJson("/player/search?", "post", {uid:uid}, tradeService.showAjaxResult, 5000, "json");
      },
      showAjaxResult:function(data){
          if(data.code==0){
              tradeView.showUser(data);
          }else{
              tradeView.showHint("不存在的用户啊");
          }

      }
}

$(document).ready(function () {

    headView.highLight("financial");

    leftView.highLight("leftNav_trade");


    $("#completeBtn").click(function () {
        var trade = tradeView.getTrade();
        var result = tradeService.trade(trade);
        tradeView.showResult(result);

        return false;

    });


    $("#uid").blur(function () {
        var value = tradeView.getUid();
        if (/^\d+$/.test(value)) {
            tradeView.showHint("");
        } else {
            tradeView.disableCommit();
            tradeView.showHint("葡萄号只能是数字");
        }
         var result = tradeService.search(value);


    });

    $("#money").blur(function () {
        var value = tradeView.getMoney();
        if (/^\d+$/.test(value)) {

            var money = parseInt(value);
            if (money < 5) {
                tradeView.disableCommit();
                tradeView.showHint("最小转帐金额为5金币");
            } else {
                tradeView.showHint("允许转帐");
            }

        } else {
            tradeView.disableCommit();
            tradeView.showHint("金额只能输入数字");
        }
        ;


        var userMoney = tradeView.getUserMoney();
        if (value > userMoney || value <= 0) {
            tradeView.showHint("");
            tradeView.disableCommit();
            tradeView.showHint("不能输入负值或超出当账户余额");
        } else {

        }

    });

})


