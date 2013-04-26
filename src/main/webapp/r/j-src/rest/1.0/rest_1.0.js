var restModel = {
    publicFeed:[],
    privateFeed:[],
    feedUrl:{
        public:"http://pipes.yahoo.com/pipes/pipe.run?_id=7f99d978f43fc6e5013f294a38f92ee7&_render=json",
        private:""
    }

}


var restView = {

    updatePublicFeed:function (feed) {
        restModel.publicFeed = feed;

        for (var f in feed) {

            console.log(feed[f].title);

        }
    }

}

var restSettingView = {
    initSetting:function () {

    },
    getSettingParameter:function () {
        var params = jQuery("#setting").serialize();
        return params;
    }

}

var restService = {


    parseMessage:function (message) {


    },

    parseDetail:function (data) {
        roomService.parsePerson(data.person);

        roomService.parseRoom(data.room);
        roomService.parseRight(data.right);


    },
    updateSetting:function (init) {

    },
    init:function () {
        gameAreaView.systemMessage("【系统消息】足不出户.知晓天下.亲爱的朋友,欢迎您来到" +
            "<a href='http://bbs.ptteng.com/forum.php?mod=viewthread&tid=2008' target='_blank''>葡萄藤茶座</a>" +
            ",每隔一分钟,资讯会自动刷新一次~");

        controlView.hideButton(selects.$readyButton);
        controlView.hideButton(selects.$countDown);
        //restService.showFeed();

    },
    getPublicFeed:function () {

        return  ajaxJson(restModel.feedUrl.public, "get", {}, restService.parsePublicFeed, 5000, "json");

    },
    parsePublicFeed:function (feed) {
        console.log(feed.count);

       /* var feeds =JSON.stringify(feed.value.items);
        var decodeContents=  htmlDecode(feeds);
        return $.parseJSON(decodeContents);*/
        return feed.value.items;
    },


    showFeed:function () {
     /*   console.log("start get feed ");
        var feeds = restService.getPublicFeed();
        restView.updatePublicFeed(feeds);
        setTimeout(restService.showFeed, 30000);*/
    }


}


var app = angular.module('myApp', []);

app.filter('timeConvert', function() {
    return function(value) {
      return  new Date(value).toLocaleTimeString();



    }
  });



function publicCtrl($scope, $timeout) {
    $scope.publicFeed = restService.getPublicFeed();
    $scope.refresh = function() {
           $scope.publicFeed = restService.getPublicFeed();
       };
    $scope.onTimeout = function(){
            $scope.publicFeed = restService.getPublicFeed()
            mytimeout = $timeout($scope.onTimeout,120000);
        }
      var mytimeout = $timeout($scope.onTimeout,120000);


};


var versionFunction = {
    //"rightView":simpleRightView.branchRight,
    "initSetting":restSettingView.initSetting,
    "getSettingParameter":restSettingView.getSettingParameter,
    "parseMessage":restService.parseMessage,
    "parseDetail":restService.parseDetail,
    "init":restService.init,
    "settingCallback":restService.updateSetting
    //   "settingPostParameter":settingPostParameter89,,


}
