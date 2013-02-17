$(document).ready(function () {


    var videoView = {
        setVideo:function (address) {
            var html = "<embed src='" + address + "' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' wmode='opaque' width='480' height='400'></embed>";
            $("#outer").empty().html(html);
        }

    }

    var videoSettingView = {
        initSetting:function () {

        },
        getSettingParameter:function () {
            var params = jQuery("#setting").serialize();
            return params;
        },
        getVideoAddress:function () {
            var r = ($("#视频地址").val());
            return r;
        }
    }

    var videoService = {


        parseMessage:function (message) {
            switch (message.predict) {

                case "start" :
                    break;
                case "over" :
                    break;
                default:
                    console.log("not my version process " + message.predict);

            }


        },

        parseDetail:function (data) {
            roomService.parsePerson(data.person);
            roomService.parseGame(data.game);
            roomService.parseRoom(data.room);
            roomService.parseRight(data.right);


        },
        updateSetting:function (init) {

            var address = videoSettingView.getVideoAddress();
             videoView.setVideo(address);
            if (init) {

            } else {

                alert("亲爱的管理员已经更改视频了~");
            }
        }



    }


    defaultShareTitle = "我在[葡萄藤]看视频~~来跟我一起看吧~~~";

    versionFunction = {
        //"rightView":simpleRightView.branchRight,
        "initSetting":videoSettingView.initSetting,
        "getSettingParameter":videoSettingView.getSettingParameter,
        "parseMessage":videoService.parseMessage,
        "parseDetail":videoService.parseDetail,
        "init":videoService.updateSetting,
        "settingCallback":videoService.updateSetting
        //   "settingPostParameter":settingPostParameter89,,


    }


});
