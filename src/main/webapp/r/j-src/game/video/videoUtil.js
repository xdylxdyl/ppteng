/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-22
 * Time: 上午10:33
 * To change this template use File | Settings | File Templates.
 */



(function (document) {
    $.fn.Drag = function () {
        var M = false;
        var Rx, Ry;
        var t = $(this);
        t.mousedown(function (event) {
            Rx = event.pageX - (parseInt(t.css("left")) || 0);
            Ry = event.pageY - (parseInt(t.css("top")) || 0);
            t.css("position", "absolute").css("cursor", "move").fadeTo(20, 0.5);
            M = true;
        })
        $(document).mousemove(function (event) {

            if (M) {
                t.css({ top:event.pageY - Ry, left:event.pageX - Rx });
            }
        }).mouseup(function (event) {

                M = false;
                t.fadeTo(20, 1);
            });
        ;
    }
     videoUtil={
        drag:function(id){
            $("#"+id).Drag();

        }
    }


})(document);

