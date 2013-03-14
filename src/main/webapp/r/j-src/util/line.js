/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-14
 * Time: 下午5:10
 * To change this template use File | Settings | File Templates.
 */


var drawUtil = {
    line:function (canv, xdata) {

        var graph;


        var option = { xaxis:{
            mode:'time',
            labelsAngle:45
        }, selection:{
            mode:'x'
        },
            HtmlText:false,
            title:'Time'
        }


        // Draw Graph
        graph = Flotr.draw(canv, [ xdata ], option);
    }
}

