/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午7:23
 * To change this template use File | Settings | File Templates.
 */


var musicView = {

    getOldMusic:function () {

        var text = $("#music").text();

       return text;


    },
    getNewMusic:function(){
         return $("#musicNew").val();
    },
    init:function () {


        //判断是否有音乐盒
        musicUtil.displayMusic();

        musicView.viewStatus();


    },

    editStatus:function () {
        $("#showEditContainer").show();
        $("#editShow").hide();
    },
    viewStatus:function () {
        $("#showEditContainer").hide();
        $("#editShow").show();
    },
    getUserName:function () {
        return $("#name").val();
    }
}

var stageShowService = {
    updateShow:function (show) {
        return ajaxJson("/player/setting.do?", "post", {type:"music", value:show}, null, 5000, "json");
    }
}
$(document).ready(function () {

    headView.highLight("person");

    leftView.highLight("leftNav_music");

    musicView.init()


    $("#submitShow").click(function () {
        var value = musicView.getNewMusic();
        stageShowService.updateShow(value);
        musicView.viewStatus();
        window.location.href = window.location.href;
        return true;

    });

    $("#cancel").click(function () {
           musicView.viewStatus();
       });


    $("#editShow").click(function () {
        musicView.editStatus();
    });
})


