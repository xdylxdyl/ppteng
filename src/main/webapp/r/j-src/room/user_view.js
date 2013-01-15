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
    },
    getUser:function() {
        var id = $("#uid").val();
        var name = $("#name").text();
        var icon = $("#portrait_edit").text();
        var sign = $("#sign").text();
        return new userInfo(id, name, icon, sign);

    }


}