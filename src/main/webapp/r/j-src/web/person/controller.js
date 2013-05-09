/**
 * @directions  处理长链接
 * @author Jqhan <jqhan@gemantic.cn>
 */

$(document).ready(function () {


        headView.highLight("person");

        userEditView().hideEdit();

        $("#editBtn").click(function(e) {
            if ($(this).attr("command", "edit")) {
                userEditView().showEdit();
            } else {
                var user = userEditView.getUser();

                playerService.updateUserInfo(user);
                window.location.replace(window.location.href);


                userEditView().submitEdit();
            }
            return false;
        });

        $("#preview").click(function() {
            userEditView().preview();
            return false;
        });

        $("#cancelBtn").click(function() {
            userEditView().hideEdit();
            return false;
        });


    }
)


