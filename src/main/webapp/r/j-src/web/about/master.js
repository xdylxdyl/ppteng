/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */
var a;
clippy.load('Merlin', function (agent) {
    // Do anything with the loaded agent
    a=agent;
    a.show();
    a.moveTo(800, 150);
    a.speak("HI,亲爱的朋友们.我这个老站长可以为你做点什么呢");

});


$(document).ready(function () {
    headView.highLight("about");
    leftView.highLight("master");


    $(".action").bind("click", function () {
        var action = $(this).attr("data-id");
        a.play(action);



    });

})
