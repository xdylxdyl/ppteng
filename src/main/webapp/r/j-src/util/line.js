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


        var option = {
            xaxis:{
                ticks:null, // => format: either [1, 3] or [[1, 'a'], 3]
                minorTicks:null, // => format: either [1, 3] or [[1, 'a'], 3]
                showLabels:true, // => setting to true will show the axis ticks labels, hide otherwise
                showMinorLabels:false, // => true to show the axis minor ticks labels, false to hide
                labelsAngle:30, // => labels' angle, in degrees
                title:'日期', // => axis title
                titleAngle:0, // => axis title's angle, in degrees
                noTicks:30, // => number of ticks for automagically generated ticks
                minorTickFreq:1, // => number of minor ticks between major ticks for autogenerated ticks
                tickFormatter:Flotr.defaultTickFormatter, // => fn: number, Object -> string
                tickDecimals:null, // => no. of decimals, null means auto
                min:null, // => min. value to show, null means set automatically
                max:null, // => max. value to show, null means set automatically
                autoscale:false, // => Turns autoscaling on with true
                autoscaleMargin:0, // => margin in % to add if auto-setting min/max
                color:null, // => color of the ticks
                mode:'time', // => can be 'time' or 'normal'
                timeFormat:null,
                timeMode:'UTC', // => For UTC time ('local' for local time).
                timeUnit:'millisecond', // => Unit for time (millisecond, second, minute, hour, day, month, year)
                scaling:'linear', // => Scaling, can be 'linear' or 'logarithmic'
                base:Math.E,
                titleAlign:'center',
                margin:true           // => Turn off margins with false

            },
            yaxis:{
                ticks:[[1, '打卡'], 3], // => format: either [1, 3] or [[1, 'a'], 3]
                minorTicks:null, // => format: either [1, 3] or [[1, 'a'], 3]
                showLabels:true, // => setting to true will show the axis ticks labels, hide otherwise
                showMinorLabels:false, // => true to show the axis minor ticks labels, false to hide
                labelsAngle:0, // => labels' angle, in degrees
                title:null, // => axis title
                titleAngle:90, // => axis title's angle, in degrees
                noTicks:1, // => number of ticks for automagically generated ticks
                minorTickFreq:null, // => number of minor ticks between major ticks for autogenerated ticks
                tickFormatter:Flotr.defaultTickFormatter, // => fn: number, Object -> string
                tickDecimals:null, // => no. of decimals, null means auto
                min:0, // => min. value to show, null means set automatically
                max:1.4, // => max. value to show, null means set automatically
                autoscale:false, // => Turns autoscaling on with true
                autoscaleMargin:0, // => margin in % to add if auto-setting min/max
                color:null, // => The color of the ticks
                scaling:'linear', // => Scaling, can be 'linear' or 'logarithmic'
                base:Math.E,
                titleAlign:'center',
                margin:true           // => Turn off margins with false
            },


            selection:{
                mode:'x'
            },
            HtmlText:false,
            title:'打卡线'
        }


        // Draw Graph
        graph = Flotr.draw(canv, [ xdata ], option);
    }
}

