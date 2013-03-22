/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:26
 * To change this template use File | Settings | File Templates.
 */

var tableRankView = {
    makeLink:function (query) {
        var url = "/rank/statistics.do?type=simple";
        var desc = tableRankView.getNextDesc(query);
        var page = tableRankView.getPage();
        var size = tableRankView.getSize();
        url = url + '&query=' + query + "&desc=" + desc + "&page=" + page + "&size=" + size;
        return url;
    },
    getQuery:function () {

        return $("#query").val();
    },
    getDesc:function () {

        return $("#desc").val();
    },
    getNextDesc:function (query) {
        var oldDesc = $("#desc").val();
        var oldQuery = tableRankView.getQuery();
        if (query == oldDesc) {
            return tableRankView.revertDesc(oldDesc);
        } else {
            return oldDesc;
        }

    },
    getPage:function () {
        return $("#page").val();
    },
    getSize:function () {
        return $("#size").val();
    },
    revertDesc:function (desc) {
        if ("desc" == desc) {
            return "asc";
        } else {
            return "desc";
        }
    },
    showDesc:function () {
        var query = tableRankView.getQuery();
        var desc = tableRankView.getDesc();
        var curClass = tableRankView.getDescClass(desc);
        $("#" + query + " i").removeClass().addClass(curClass);
    },
    getDescClass:function (desc) {
        var classUp = "icon-arrow-up";
        var classDown = "icon-arrow-down";
        if ("desc" == desc) {
            return classDown;
        } else {
            return classUp;
        }
    }

}


$(document).ready(function () {

    headView.highLight("rank");
    leftView.highLight("leftNav_simple");
    tableRankView.showDesc();

    $("[query]").click(function () {
        var curQuery = $(this).attr("query");
        var link = tableRankView.makeLink(curQuery);
        window.location.href = link;
        return false;
    })

});


