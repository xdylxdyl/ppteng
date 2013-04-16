
var viewUtil = {
    clearInput:function (item) {
        $(item).val("");
    }
}

var verifyUtil = {

    emailFormat:function (value) {
        var reyx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return(reyx.test(value));
    },
    emptyFormat:function (value) {
        if (value) {
            return true;
        } else {
            return false;
        }
    },
    lengthLimit:function (content, length) {
        if (content.length < length) {
            return true;
        } else {
            return false;
        }

    }
}

var regeditView = {

    wrongEmailFormat:function () {
        $("#reg_hint").html("邮箱格式不正确");
        $("#submit").attr("disabled", true);
    },
    rightEmailFormat:function () {
        $("#reg_hint").html("");
        $("#submit").attr("disabled", false);
    },

    dedupEmailFormat:function () {
        $("#reg_hint").html("晚了已经被人用了");
        $("#submit").attr("disabled", true);


    },
    noDedupEmailFormat:function () {
        $("#reg_hint").html("");
        $("#submit").attr("disabled", false);
    },

    wrongNameFormat:function () {
        $("#reg_hint").html("靠谱点敢不用空用户名么");
        $("#submit").attr("disabled", true);


    },
    rightNameFormat:function () {
        $("#reg_hint").html("");
        $("#submit").attr("disabled", false);
    },
    wrongLengthLimit:function () {
        $("#reg_hint").html("起那么长的名字是要逆天么?");
        $("#submit").attr("disabled", true);
    },
    getType:function () {
        return $("#type").val();
    }


}

var regeditService = {

    getIdByEmail:function (email) {
        return ajaxJson("/player/email?", "get", {email:email}, this.parseEmail, 5000, "json");
    },
    parseEmail:function (data) {
        return data.id;
    }

}



$(document).ready(function () {
    $("#name").focus();

    headView.highLight("person");

    var type = regeditView.getType();
    leftView.highLight("leftNav_" + type);


    $("#regedit #submit").click(function (e) {
        var content = $("#name").val();
        content = $("#escape").text(content).html();
        $("#name").val(content);
        $("#escape").empty();
        e.submit();

    })


    $("#name").bind("blur", function () {
        var r = $("#name").val();

        if (verifyUtil.emptyFormat(r)) {
            regeditView.rightNameFormat();
        } else {
            regeditView.wrongNameFormat();
            return;
        }
        ;
        if (verifyUtil.lengthLimit(r, 20)) {
            regeditView.rightNameFormat();
        } else {
            regeditView.wrongLengthLimit();
            return;
        }

    });


    $("#email").bind("keyup", function () {
        var r = $("#email").val();

        if (verifyUtil.emailFormat(r)) {
            regeditView.rightEmailFormat();
        } else {
            regeditView.wrongEmailFormat();
            return;
        }
        ;

        var id = regeditService.getIdByEmail(r);
        if (id == "" || id == undefined) {
            regeditView.noDedupEmailFormat();

        } else {
            regeditView.dedupEmailFormat();
            return;
        }

        if (verifyUtil.lengthLimit(r, 20)) {
            regeditView.rightNameFormat();
        } else {
            regeditView.wrongLengthLimit();
            return;
        }

    });



})
;
