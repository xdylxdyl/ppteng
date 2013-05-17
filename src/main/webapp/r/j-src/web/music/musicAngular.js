var musicService = {
    getMusics:function () {

        return  ajaxJson("/music/list", "get", {}, musicService.parseMusic, 5000, "json");

    },
    parseMusic:function (result) {
        return result.data;
    }
}
function MusicCtrl($scope, $timeout) {
    $scope.musics = musicService.getMusics();


};