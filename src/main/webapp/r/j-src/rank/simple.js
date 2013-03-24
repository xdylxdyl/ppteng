/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:26
 * To change this template use File | Settings | File Templates.
 */

var tableRankView = {
    makeLink:function (query,secondQuery) {
        var url = "/rank/statistics.do?type=simple";

        var desc = tableRankView.getNextDesc(query);
        var page = tableRankView.getPage();
        var size = tableRankView.getSize();
        url = url + '&query=' + query + "&desc=" + desc + "&page=" + page + "&size=" + size;
        if(secondQuery!=null&&secondQuery!=''){
            url=url+"&secondQuery="+secondQuery;
        }
        return url;
    },
    getQuery:function () {

        return $("#query").val();
    },
    getSecondQuery:function(){
        return $("#secondQuery").val();
    },
    getDesc:function () {

        return $("#desc").val();
    },
    getNextDesc:function (query) {
        var oldDesc = $("#desc").val();
        var oldQuery = tableRankView.getQuery();
        if (query == oldQuery) {
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
        var secondQuery=tableRankView.getSecondQuery();
        var id=query;
        if(secondQuery==null||secondQuery==''){

        }else{
            id=query+"_"+secondQuery;
        }
        var desc = tableRankView.getDesc();
        var curClass = tableRankView.getDescClass(desc);
        $("#" + id + " i").removeClass().addClass(curClass);
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
        var secondQuery=$(this).attr("secondQuery");
        var link = tableRankView.makeLink(curQuery,secondQuery);
        window.location.href = link;
        return false;
    })

});

