/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-29
 * Time: 下午7:55
 * To change this template use File | Settings | File Templates.
 */

function loveCtrl($scope) {
  $scope.format = 'yyyy-mm-dd HH:mm:ss';
}

angular.module('time', []).directive('myMissYouTime', function($timeout,$filter) {
    // return the directive link function. (compile function not needed)
        var timeFunction=function(scope,element){
        }
    return timeFunction;
  });




var boyfriend1=function($timeout,$filter){

     return function(scope,element){


         console.log("very love you ");
     }
}


var boyfriend2=function($timeout,$filter){


    return function(scope,element){
        console.log(" love you too.i think ");
     }
}

var boyfriendFactory=function(boy){
       film=boy;

}


var boyfriendAgent={
      boyfriend:boyfriendFactory(boyfriend1)
}

var girfriend=function(){

    boyfriendAgent.boyfriend.film();

}