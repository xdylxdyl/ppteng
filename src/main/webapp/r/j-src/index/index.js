/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-29
 * Time: 下午7:28
 * To change this template use File | Settings | File Templates.
 */

function ImgCtrl($scope, Image) {
    $scope.imgs = Image.query();
    $('.carousel').carousel();

}

angular.module('imgList', [ 'imgListServices'])


/* Services */

angular.module('imgListServices', ['ngResource']).
    factory('Image', function ($resource) {
        return $resource('/r/json/index.json', {}, {
            query:{method:'GET', params:{}, isArray:true}
        });
    });


headView.highLight("index");