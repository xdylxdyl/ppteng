$(document).ready(function() {
      $("#name").focus();


    $("#room .text").blur(function() {
        if ($(this).val() == "") {
            $(this).nextAll("span").html("　　　　　&nbsp;房间名不能为空");
        } else {
            $(this).nextAll("span").html("");
        }
    })
        .focus(function() {
            $(this).nextAll("span").html("");
        });

    $("#room .submit").click(function(e) {
        if ($("#room .text").val() == "") {
            $("#room .text").nextAll("span").html("　　　　　&nbsp;房间名不能为空");
            e.preventDefault();
        } else {
            $("#mask").show();
            e.submit();
        }
    })


    $("#name").bind("blur", function() {
        var r = $("#name").val();

        if (verifyUtil.emptyFormat(r)) {
            regeditView.rightNameFormat();
        } else {
            regeditView.wrongNameFormat();
            return;
        };
        


    });

    $("#email").bind("keyup", function() {
        var r = $("#email").val();

        if (verifyUtil.emailFormat(r)) {
            regeditView.rightEmailFormat();
        } else {
            regeditView.wrongEmailFormat();
            return;
        }
        ;

        var id = regeditService.getIdByEmail(r);
        if (id == "") {
            regeditView.noDedupEmailFormat();
        } else {
            regeditView.dedupEmailFormat();
        }

    });


    var viewUtil = {
        clearInput:function(item) {
            $(item).val("");
        }
    }

    var verifyUtil = {

        emailFormat:function(value) {
            var reyx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return(reyx.test(value));
        },
        emptyFormat:function(value) {
            if (value) {
                return true;
            } else {
                return false;
            }
        }
    }

    var regeditView = {

        wrongEmailFormat:function() {
            $("#reg_email_hint").html("邮箱格式不正确");
            $("#submit").attr("disabled", true);


        },
        rightEmailFormat:function() {
            $("#reg_email_hint").html("");
            $("#submit").attr("disabled", false);
        },

        dedupEmailFormat:function() {
            $("#reg_email_hint").html("晚了已经被人用了");
            $("#submit").attr("disabled", true);


        },
        noDedupEmailFormat:function() {
            $("#reg_email_hint").html("");
            $("#submit").attr("disabled", false);
        },

        wrongNameFormat:function() {
            $("#reg_name_hint").html("靠谱点敢不用空用户名么");
            $("#submit").attr("disabled", true);


        },
        rightNameFormat:function() {
            $("#reg_name_hint").html("");
            $("#submit").attr("disabled", false);
        }



    }

    var regeditService = {

        getIdByEmail:function(email) {
            return ajaxJson("/player/email.do?", "get", {email:email}, this.parseEmail, 5000, "json");
        },
        parseEmail:function(data) {
            return data.id;
        }

    }


});
