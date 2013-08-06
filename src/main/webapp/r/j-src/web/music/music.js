/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-7
 * Time: 下午3:21
 * To change this template use File | Settings | File Templates.
 */
/*音乐播放器*/



var musicService = {
    getMusics:function () {

        return  ajaxJson("/music/list", "get", {}, musicService.parseMusic, 5000, "json");

    },
    parseMusic:function (result) {
        return result.data;
    }
}
function MusicCtrl($scope) {
    $scope.musics = musicService.getMusics();
    $scope.refreshMusic = function() {
           $scope.musics = musicService.getMusics();
       };



};

$(function () {
    // Setup the player to autoplay the next track
    var a = audiojs.createAll({
        trackEnded:function () {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
        }
    });

    // Load in the first track
    var audio = a[0];
    first = $('ol a').attr('data-src');
    $('ol li').first().addClass('playing');
    audio.load(first);

    // Load in a track on click
    $('ol').on("click","li",function (e) {
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        audio.load($('a', this).attr('data-src'));
        audio.play();
    });
});

