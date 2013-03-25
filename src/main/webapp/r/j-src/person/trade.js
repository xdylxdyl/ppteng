/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */


var tradeModel = {
    init:function (id, money, comments) {
        return{
            id:id,
            money:money,
            comments:comments
        }
    }
}

var tradeView = {

    getTrade:function () {
        var id = parseInt(tradeView.getId());
        var money = parseInt(tradeView.getMoney());
        var comments = tradeView.getComments();
         return tradeModel.init(id, money, comments);

    },
    getId:function () {
        return $("#id").val();

    },
    getMoney:function () {
        return $("#money").val();

    },
    getComments:function () {
        return $("#comments").text();
    },
    showResult:function (result) {

        var message;
        var code = result.code;
        if (code == 0) {
            message = "转帐成功~";
            tradeView.showMoney(result.money);
        } else {
            tradeView.showHint(result.message);
        }

    },
    showMoney:function (money) {
        $("#currentMoney").empty().text(money);
    },
    showHint:function (hint) {
        $("#hint").empty().text(hint);
    }

}
var tradeService = {
    trade:function (trade) {
        return ajaxJson("/money/trade.do?", "post",
            trade, tradeService.parse, 5000, "json");
    }
}

$(document).ready(function () {

    headView.highLight("person");

    leftView.highLight("leftNav_trade");


    $("#completeBtn").click(function () {
        var trade = tradeView.getTrade();
        var result = tradeService.trade(trade);
        tradeView.showHint(result.message);

        return false;

    });


})


