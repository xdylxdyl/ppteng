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
        console.log("start get feed ");
        var feeds = restService.getPublicFeed();
        restView.updatePublicFeed(feeds);
        setTimeout(restService.showFeed, 20000);
    }


}


var app = angular.module('myApp', []);
/*app.run(function ($rootScope, $timeout, ngRestAgentService) {
    console.log('starting run');
    *//* 使用setInterval重复执行
    var timer = setInterval(function(){
        console.log("Update Once");
        ngRestAgentService.updateFeed();
    }, 6000);*//*

    //使用timeout重复执行
    var refresh = $timeout(function myFunction() {
        console.log("time run");
        ngRestAgentService.updateFeed();
        refresh = $timeout(myFunction, 10000);
    });

    *//*销毁之前定义的重复执行事件
    $scope.$on('$destroy', function(e) {
        $timeout.cancel(refresh);
    });*//*
});
app.service('ngRestAgentService', function (ngRestService, $timeout) {
    this.updateFeed = function () {
        console.log('starting update');

        ngRestService.publicFeed =  restService.getPublicFeed();


    };

});
app.service('ngRestService', function ($rootScope) {
    //object example
    this.publicFeed = restService.getPublicFeed();

});*/

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
            mytimeout = $timeout($scope.onTimeout,1000);
        }
      var mytimeout = $timeout($scope.onTimeout,1000);




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
