$(document).ready(function () {
    $("#name").focus();


    $("#roomSubmit").click(function (e) {
        if ($("#inputtext").val() == "") {
            $("#inputtext").val("葡萄藤轻游戏[ "+new Date(jQuery.now()).format("yyyy-MM-dd hh:mm:ss")+" ]");

        } else {


        }
        $("#roomSubmit").hide();
        $("#modal-close").hide();
        $("#roomSubmitHint").empty().text("正在为您创建房间,初始化需要2~3秒,请耐心稍候");

       // e.submit();

    })

    $("#modal-close").click(function (e) {
        modal.close();
        return false;
    })

});


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