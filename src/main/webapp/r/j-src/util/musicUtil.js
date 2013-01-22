/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-22
 * Time: 上午10:33
 * To change this template use File | Settings | File Templates.
 */

var musicUtil = {
    displayMusic:function () {
        var music = $("#music").text();
        if (music == "") {

        } else {
            var html = "<embed src='" + music + "' type='application/x-shockwave-flash' width='235' height='346' wmode='opaque'></embed>";
            $("#music_play").empty().html(html);

        }
    }
}
