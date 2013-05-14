/*
 * poll ajax
 * */


var timeUtil = {
    constant:{
        Second_MILLISECOND : 1000,
        Minute_MILLISECOND:60 * 1000,
        Hour_MILLISECOND : 3600 * 1000,
        Day_MILLISECOND: 24 * 3600 * 1000,
        WEEK_MILLISECOND: 7 * 24 * 3600 * 1000,
        MONTH_MILLISECOND : 30 * 24 * 3600 * 1000,
        YEAR_MILLISECOND : 365 * 24 * 3600 * 1000
    },


    convertTime2Length:function(time) {
        var s;

        if (time <= this.constant.Minute_MILLISECOND) {
            s = time / this.constant.Second_MILLISECOND + "秒";
        } else if (time <= this.constant.Hour_MILLISECOND) {
            s = time / this.constant.Minute_MILLISECOND + "分钟";

        } else if (time <= this.constant.Day_MILLISECOND) {
            s = time / this.constant.Hour_MILLISECOND + "小时";
        } else if (time <= this.constant.WEEK_MILLISECOND) {
            s = time / this.constant.Day_MILLISECOND + "日";

        } else if (time <= this.constant.MONTH_MILLISECOND) {
            s = time / this.constant.WEEK_MILLISECOND + "周";
        } else if (time <= this.constant.YEAR_MILLISECOND) {
            s = time / this.constant.MONTH_MILLISECOND + "月";
        } else {
            s = "好长";
        }
        return s;

    },
    time2String:function(time){
        var date=new Date(time);

        return date.format("hh:mm");

   }
}


Date.prototype.format = function(format)
{
/*
* format="yyyy-MM-dd hh:mm:ss";
*/
var o = {
"M+" : this.getMonth() + 1,
"d+" : this.getDate(),
"h+" : this.getHours(),
"m+" : this.getMinutes(),
"s+" : this.getSeconds(),
"q+" : Math.floor((this.getMonth() + 3) / 3),
"S" : this.getMilliseconds()
}

if (/(y+)/.test(format))
{
format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
- RegExp.$1.length));
}

for (var k in o)
{
if (new RegExp("(" + k + ")").test(format))
{
format = format.replace(RegExp.$1, RegExp.$1.length == 1
? o[k]
: ("00" + o[k]).substr(("" + o[k]).length));
}
}
return format;
}