
leftView.highLight("leftNav_basic");

var userEditView1 = {
    selects: function() {
        return {
            $name: $("#editName"),
            $fraction: $("#fraction"),
            $img: $("#img"),
            $editImg: $("#editImg"),
            $signature: $("#editSignature"),
            $stats: $("#statsInfo"),
            $btn: $("#editBtn")
        }
    }



};

var userEditView = function() {
    var selects = {
        $name:      $("#editName"),
        $fraction:  $("#fraction"),
        $img:       $("#img"),
        $editImg:   $("#editImg"),
        $signature: $("#editSignature"),
        $btn:       $("#editBtn"),
        $cancel:    $("#cancelBtn"),
        $preview:   $("#preview"),
        $imgUrl:    $("#imgUrl")
    };

    return {
        hideEdit: function() {
            selects.$name.removeAttr('contenteditable');
            selects.$signature.removeAttr('contenteditable');
            selects.$fraction.show();
            selects.$editImg.hide();
            selects.$cancel.hide();
            selects.$btn.text("编辑基本信息").attr("command", "edit");
        },
        showEdit: function() {
            selects.$name.attr('contenteditable', 'true');
            selects.$signature.attr('contenteditable', 'true');
            selects.$fraction.hide();
            selects.$editImg.show();
            selects.$cancel.show();
            selects.$btn.text("完成并提交信息").attr("command", "submit");
        },
        preview: function() {
            var str = selects.$imgUrl.text();
            selects.$img.attr("src", str);
        },
        getInfo: function() {
            var id = $("#uid").val();
            var name = selects.$name.text();
            var sign = selects.$signature.text();
            var img = selects.$editImg.text();

            //var music=$("#music").text();
            //var stageShow= $("#stageShow").text();
            return new userInfo(id, name, img, sign,music,stageShow);

        },
        submitEdit: function() {

        }

    }
};