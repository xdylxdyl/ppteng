/**
 * @directions  处理长链接
 * @author Jqhan <jqhan@gemantic.cn>
 */

$(document).ready(function () {


        headView.highLight("person");


        $("#user_edit").click(function () {


            var command = $("#user_edit").attr("command");
            if ("edit" == command) {


                userEditView.showEdit();
                //edit pattern


            } else {
                //


                var user = userEditView.getUser();

                playerService.updateUserInfo(user);
                window.location.replace(window.location.href);


            }

            return false;

        });


        $("#portrait_view").click(function () {
            var s = $("#portrait_edit").text();
            $("#portrait_img").attr("src", s)
            return false;

        });

        //判断是否有音乐盒
        musicUtil.displayMusic();


        $("#show_edit").bind("click", function () {


            var stageShow = userEditView.getShow();

            var shows = stageShow.login;
            var show;
            if (shows != null) {
                show = JSON.stringify(shows);
            } else {
                show = "[]";
            }
            $("#showContent").val(show);
            $("#showContainer").removeClass().show().addClass("showCenter");
            $("#expContainer").show();

            return false;

        });

        $("#showCommit").bind("click", function () {

            var v = $("#showContent").val();

            var expArray;
            try {
                expArray = eval(v);
                if (expArray.length > 5) {
                    alert("亲,说好的五个呢,想多定义个人秀不用花钱啊");
                    return false;
                }
            } catch (err) {
                alert("会不会看格式啊亲,敢不敢靠谱一点儿");
                return false;
            }

            var stageShow = {};
            stageShow["login"] = expArray;
            playerService.updateShow(JSON.stringify(stageShow));


            $("#showContainer").hide();
            return false;

        });
        $("#showCancel").bind("click", function () {
            $("#showContainer").hide();
            return false;

        });

    }
)


