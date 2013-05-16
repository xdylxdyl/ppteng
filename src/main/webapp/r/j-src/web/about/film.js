/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */

/*<li data-row="4" data-col="4" data-sizex="1" data-sizey="1"
 class="gs_w" style="position: absolute;"></li>

 <li data-row="4" data-col="1" data-sizex="2" data-sizey="1"
 class="gs_w" style="position: absolute;"></li>
 <li data-row="2" data-col="3" data-sizex="2" data-sizey="2"
 class="gs_w" style="position: absolute;"></li>

 <li class="gs_w" data-row="1" data-col="3" data-sizex="1"
 data-sizey="1" style="position: absolute;"></li>
 <li data-row="1" data-col="1" data-sizex="2" data-sizey="1"
 class="gs_w" style=""></li>
 <li data-row="1" data-col="4" data-sizex="1" data-sizey="1"
 class="gs_w" style="position: absolute;"></li>

 <li data-row="3" data-col="1" data-sizex="1" data-sizey="1"
 class="gs_w" style="position: absolute;"></li>
 <li data-row="4" data-col="3" data-sizex="1" data-sizey="1"
 class="gs_w" style="position: absolute;"></li>

 <li data-row="1" data-col="5" data-sizex="1" data-sizey="1"
 class="gs_w" style="position: absolute;"></li>
 <li data-row="2" data-col="5" data-sizex="1" data-sizey="2"
 class="gs_w player-revert" style="position: absolute;"></li>*/

function FilmConfigCtrl($scope) {
    $scope.test = "love";
    $scope.film = [
        {
            img:"http://img.ledanji.com/other/news/Article/UploadFiles/201011/20101109121212479.jpg",
            title:"月球",
            link:"http://bbs.ptteng.com/forum.php?mod=viewthread&tid=188&extra=page%3D1",
            row:"1",
            col:"1",
            x:"1",
            y:"2"


        },
        {
            img:"http://img.ledanji.com/other/news/Article/UploadFiles/201011/20101109121212479.jpg",
            title:"葬礼上的死亡",
            link:"http://bbs.ptteng.com/forum.php?mod=viewthread&tid=242",
            row:"2",
            col:"2",
            x:"1",
            y:"1"

        },
        {
            img:"http://img.ledanji.com/other/news/Article/UploadFiles/201011/20101109121212479.jpg",
            title:"幽灵公主",
            link:"http://bbs.ptteng.com/forum.php?mod=viewthread&tid=287",
            row:"3",
            col:"1",
            x:"2",
            y:"1"

        },
        {
            img:"http://img.ledanji.com/other/news/Article/UploadFiles/201011/20101109121212479.jpg",
            title:"你好,陌生人",
            link:"http://bbs.ptteng.com/forum.php?mod=viewthread&tid=419",
            row:"1",
            col:"2",
            x:"1",
            y:"1"

        },
        {
            img:"http://img.ledanji.com/other/news/Article/UploadFiles/201011/20101109121212479.jpg",
            title:"东邪西毒",
            link:"http://bbs.ptteng.com/forum.php?mod=viewthread&tid=503",
            row:"1",
            col:"1",
            x:"2",
            y:"2"

        }
    ]

};


$(document).ready(function () {
    headView.highLight("about");
    leftView.highLight("film");


    var gridster;
    gridster = $(".gridster > ul").gridster({
        widget_margins:[10, 10],
        widget_base_dimensions:[140, 140]

    }).data('gridster');


    var note = $('#note');


    var filmDate = new Date();
    var week = filmDate.getDay();

    filmDate.setHours(20);
    filmDate.setMinutes(30);


    var w = 0;
    if (week <= 4) {
        w = 4 - week;
    } else {
        w = 11 - week;
    }
    ts = filmDate.getTime() + w * 24 * 60 * 60 * 1000;

    stopCountDown = true;


    if ((new Date()) > ts) {
        // The new year is here! Count towards something else.
        // Notice the *1000 at the end - time must be in milliseconds

        stopCountDown = false;
    }

    $('#countdown').countdown({
        timestamp:ts,
        callback:function (days, hours, minutes, seconds) {

            var message = "";

            message += days + " 天" + ( days == 1 ? '' : '' ) + ", ";
            message += hours + " 小时" + ( hours == 1 ? '' : '' ) + ": ";
            message += minutes + " 分" + ( minutes == 1 ? '' : '' ) + " : ";
            message += seconds + " 秒" + ( seconds == 1 ? '' : '' ) + " <br />";


            note.html(message);
        }
    });


})
