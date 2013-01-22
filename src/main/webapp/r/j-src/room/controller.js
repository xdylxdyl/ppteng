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

    }
)


