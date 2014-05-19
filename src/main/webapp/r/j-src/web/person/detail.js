/**
 * @directions  处理长链接
 * @author Jqhan <jqhan@gemantic.cn>
 */



var userInfo = function (id, name, icon, sign) {
    return {
        id:id,
        name:name,
        icon:icon,
        sign:sign

    }
}


var userEditView = function () {
    var selects = {
        $name:$("#editName"),
        $fraction:$("#fraction"),
        $img:$("#img"),
        $editImg:$("#editImg"),
        $signature:$("#editSignature"),
        $btn:$("#editBtn"),
        $cancel:$("#cancelBtn"),
        $preview:$("#preview"),
        $imgUrl:$("#imgUrl"),
        $completeBtn:$("#completeBtn"),
        $oldImg:$("#oldImg")
    };

    return {
        hideEdit:function () {
            selects.$name.removeAttr('contenteditable');
            selects.$signature.removeAttr('contenteditable');
            selects.$fraction.show();
            selects.$editImg.hide();
            selects.$cancel.hide();
            selects.$completeBtn.hide();
            selects.$btn.show();

        },
        showEdit:function () {
            selects.$name.attr('contenteditable', 'true');
            selects.$signature.attr('contenteditable', 'true');
            selects.$fraction.hide();
            selects.$editImg.show();
            selects.$cancel.show();
            selects.$btn.hide();
            selects.$completeBtn.show();
        },
        preview:function () {
            var str = selects.$imgUrl.text();
            selects.$img.attr("src", str);
        },
        rollbackImg:function () {
            var str = selects.$oldImg.val();
            selects.$img.attr("src", str);
        },
        getInfo:function () {
            var id = $("#uid").val();
            var name = selects.$name.text();
            var sign = selects.$signature.text();
            var img = selects.$imgUrl.text();
            return new userInfo(id, name, img, sign);

        }


    }
};

function PreviewImage() {

};


$(document).ready(function () {


        headView.highLight("person");
        leftView.highLight("leftNav_basic");

        userEditView().hideEdit();
        $("#completeBtn").click(function (e) {

            var user = userEditView().getInfo();

            playerService.updateUserInfo(user);
            window.location.replace(window.location.href);


            return false;
        });
        $("#editBtn").click(function (e) {

            userEditView().showEdit();

            return false;
        });

        $("#preview").click(function () {
            userEditView().preview();
            return false;
        });

        $("#cancelBtn").click(function () {
            userEditView().hideEdit();
            //恢复用户头像
            userEditView().rollbackImg();
            return false;
        });

        $("#file_upload").click(function () {

            var xhr = new XMLHttpRequest();

            var formData = new FormData();

            formData.append("file", $('#icon_file')[0].files[0]);

            xhr.upload.addEventListener("progress", uploadProgress, false);

            xhr.addEventListener("load", uploadComplete, false);

            xhr.addEventListener("error", uploadFailed, false);

            xhr.addEventListener("abort", uploadCanceled, false);


            xhr.open("POST", "/player/icon");


            xhr.send(formData);


        })
        $("#icon_file").on("change", function () {
            var oFReader = new FileReader();
            oFReader.readAsDataURL($("#icon_file")[0].files[0]);

            oFReader.onload = function (oFREvent) {
                $("#img").attr("src", oFREvent.target.result)  ;
            };
        });

        //上传进度

        function uploadProgress(evt) {

            if (evt.lengthComputable) {

                var percentComplete = Math.round(evt.loaded * 100 / evt.total);

                document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';

            }

            else {

                document.getElementById('progressNumber').innerHTML = 'unable to compute';

            }

        }


        function uploadComplete(evt) {

            alert("上传成功");

        }


        //上传失败
        function uploadFailed(evt) {

            alert("上传失败");

        }


        function uploadCanceled(evt) {

            alert("您取消了本次上传.");

        }


    }
)


