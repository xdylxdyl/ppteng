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
            type:"post",
            dataType:"json",
            success:function (result) {
                if (result.code == "0") {
                    data = result;
                }
            }
        })
    }

}

var punchView = {
    showPunch:function (data) {

        $("#money").empty().html("金币 " + data.umoney);
        //动画


    }
}

$(document).ready(function () {
    $("#punch").bind('click', function () {
        var data = punchService.punch();
        punchView.showPunch(data);
        /**/
        return false;
    })

})
