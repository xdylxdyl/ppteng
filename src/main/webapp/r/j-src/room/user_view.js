
leftView.highLight("leftNav_basic");

var userEditView = {

    showEdit:function () {
        $("#sign").attr("contenteditable", "true").addClass("border_show");
        $("#name").attr("contenteditable", "true").addClass("border_show");
        $("#portrait_edit_container").show();





        $("#user_edit").attr("command", "commit");
        $("#user_edit").html("complete");
        $("#user_cancel").show();
        $("#portrait_container").removeClass().addClass("portrait_container");
        $("#portrait_edit").removeClass().addClass("portrait_edit border_show");
        $("#music_container").removeClass().addClass("music_set_container");

        $("#password_edit").hide();
        $("#show_edit").hide();


    },
    getUser:function() {
        var id = $("#uid").val();
        var name = $("#name").text();
        var icon = $("#portrait_edit").text();
        var sign = $("#sign").text();
        var music=$("#music").text();
        return new userInfo(id, name, icon, sign,music);

    },
    getShow:function(){


        var text= $("#stageShow").text();
        if(text==""){
            return {};
        }else{
            return JSON.parse(text);
        }


    },
    updateShow:function(text){
        $("#stageShow").text(text)
    }



}