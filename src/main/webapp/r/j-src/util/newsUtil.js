var app = angular.module('myApp', []);
app.filter('timeConvert', function () {
    return function (value) {
        return  new Date(value).toLocaleTimeString();


    }
});

var restModel = {
    publicFeed:[],
    privateFeed:[],
    feedUrl:{
        public:"/r/json/news.json?v=" + jQuery.now(),
        private:""
    }

}


var newsService = {


    getPublicFeed:function () {

        return  ajaxJson(restModel.feedUrl.public, "get", {}, newsService.parsePublicFeed, 5000, "json");

    },
    parsePublicFeed:function (feed) {
        console.log(feed.count);

        /* var feeds =JSON.stringify(feed.value.items);
         var decodeContents=  htmlDecode(feeds);
         return $.parseJSON(decodeContents);*/
        return feed.value.items;
    }
}


function publicCtrl($scope, $timeout) {
    $scope.publicFeed =  newsService.getPublicFeed();
    $scope.refresh = function () {
        $scope.publicFeed = newsService.getPublicFeed();
    };
    $scope.onTimeout = function () {
        $scope.publicFeed = newsService.getPublicFeed()
        mytimeout = $timeout($scope.onTimeout, 600000);
    }
    var mytimeout = $timeout($scope.onTimeout, 600000);


};
