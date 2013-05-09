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

            roomService.parseRoom(data.room);
            roomService.parseRight(data.right);


        },
        updateSetting:function (init) {

            var address = videoSettingView.getVideoAddress();
            if(address==null|address==""){

            }else{
                videoView.setVideo(address);
            }

            if (init) {

            } else {

                alert("亲爱的管理员已经更改视频了~");
            }
        },
        init:function(){
            gameAreaView.systemMessage("【系统消息】亲爱的朋友,欢迎您来到" +
                "<a href='http://bbs.ptteng.com/forum.php?mod=viewthread&tid=159' target='_blank''>葡萄藤电影院</a>" +
                ",请保持安静,电影结束时,带好您的手机钱包和男朋友~" );
            videoService.updateSetting(true);

            controlView.hideButton(selects.$readyButton);
            controlView.hideButton(selects.$countDown);
        }





    }



    versionFunction = {
        //"rightView":simpleRightView.branchRight,
        "initSetting":videoSettingView.initSetting,
        "getSettingParameter":videoSettingView.getSettingParameter,
        "parseMessage":videoService.parseMessage,
        "parseDetail":videoService.parseDetail,
        "init":videoService.init,
        "settingCallback":videoService.updateSetting
        //   "settingPostParameter":settingPostParameter89,,


    }


});
