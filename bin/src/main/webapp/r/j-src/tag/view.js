function displayTagBySymbol(id) {

    var stockDetail = getStockDetailAgent(new Array(id));
    var name = "";
    if (stockDetail != null) {
        var d = stockDetail[id];
        if (d != null) {
            name = stockDetail[id].name;
        }

    }
    listTag(id, name);
    focusCSS(id, "heighlight");
}
/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-2-13
 * Time: 下午5:09
 * To change this template use File | Settings | File Templates.
 */


function showStocks(stocks) {

    if (stocks == null) {
        console.log("not data ");

    } else {
        console.log(stocks.length);
        var stockDetail = getStockDetailAgent(stocks);
        //  console.log("get detail " + JSON.stringify(stockDetail));


        $("#stockList").empty();
        jQuery.each(stocks, function(i, value) {
                //console.log(this.symbol);
                //onclick
                var name = stockDetail[value].name;
                $("#stockList").append('<li class="columnLI" stockName=' + name + ' id=' + value + '>' + i + " " + value + " " + name + '');
                $("#" + value).live('click', function(e) {
                    var id = e.target.id;
                    // alert("id is "+id);
                    console.log(id + " start get tag ");
                    // $("#" + id).slideDown();
                    displayTagBySymbol(id);
                });

                $("#" + value).live('dbclick', function(e) {
                    console.log("you are click ,right ?");
                });

            }


        )

    }
}

function listTag(symbol, stockName) {
    showStockSymbol(symbol, stockName);
    var tags = getTagsOfSymbol(symbol);
    showTags(tags);


}

function showStockSymbol(symbol, stockName) {
    console.log(stockName);
    $("#symbolLabel").text(stockName);
    $("#symbolLabel").attr("symbol", symbol);

}


function displayStocksByTag(id) {
    var symbols = getSymbolsOfTag(id);
    showStocks(symbols);
    focusCSS(id, "heighlight");
}
function showTags(tags) {

    $("#tagList").empty();
    jQuery.each(tags, function(i, value) {
            var id = value;
            //   console.log("id = " + id);
            $("#tagList").append('<li class="columnLI" id=' + id + '> ' + value + '<span>X</span></li> ');
            $("#" + id).live('click', function(e) {
                var id = e.target.id;
                // alert("id is "+id);
                //   console.log(id + " start get stock ");
                displayStocksByTag(id);
            });
            $("#" + id).hover(function() {
                focusChildrenCSS(id, "span", "inline");
            })
            $("#" + id).children("span").click(function() {
                var symbol = $("#symbolLabel").attr("symbol");
                deleteTag(symbol, id);

            })
        }
    )

    $("#addTag").val("");
}


function deleteTag(symbol, tag) {
    if (symbol == null || symbol == "") {

        alert("先选择一个股票再删除Tag好不好啊亲");


    } else {
        delTagOfSymbol(symbol, tag);
        delSymbolOfTag(symbol, tag);
        var symbols = getSymbolsOfTag(tag);
        if (symbols == null || symbols.length == 0) {
            delTags(tag);
        } else {

        }
        var tags = getTagsOfSymbol(symbol);
        showTags(tags);

    }


}

//怎么判断是否禁用了
function moveButton(id, direct) {

    console.log(id + " and direct " + direct);
    var page = parseInt($("#" + id).attr('page'));
    if ("next" == direct) {
        page = page + 1;

    } else {
        page = page - 1;
        if (page < 0) {
            page = 0;
        }
    }
    console.log(id + " after direct " + direct + " page " + page);
    $("#" + id).attr("page", page);
    console.log($("#" + id).attr('page'));


}


$("#tagInput").click(function(e) {
    clear.call(this, e);


})


$("#tagInput").keyup(function(e) {
    var query = $("#tagInput").val();


    //console.profile("keywizard");
    var result = keywizardSearch(query, 10,"tag");
    //console.profileEnd();
    console.log(result);
    $("#dropdown").empty().hide();
    if (result.length > 0) {
        $("#dropdown").show();
        for (var i = 0; i < result.length; i++) {
            $("#dropdown").append("<li code='" + result[i].code + "'>" + result[i].name + " " + result[i].code + " " + result[i].pinyin + "</li>");
        }
    }
    $("#dropdown li").click(function() {
        $("#stockInput").val($(this).attr("code"));
        $("#dropdown").empty().hide();
    })
})






$("#stockInput").click(function(e) {
    clear.call(this, e);
})

$("#stockInput").keyup(function(e) {
    var query = $("#stockInput").val();


    //console.profile("keywizard");
    var result = keywizardSearch(query, 10,"stock");
    //console.profileEnd();
    console.log(result);
    $("#dropdown").empty().hide();
    if (result.length > 0) {
        $("#dropdown").show();
        for (var i = 0; i < result.length; i++) {
            $("#dropdown").append("<li code='" + result[i].code + "'>" + result[i].name + " " + result[i].code + " " + result[i].pinyin + "</li>");
        }
    }
    $("#dropdown li").click(function() {
        $("#stockInput").val($(this).attr("code"));
        $("#dropdown").empty().hide();
    })
})


$("#prev").click(function(e) {

    var stocks = getStockAgent.call(this, e);
    var page = parseInt($("#" + e.target.id).attr('page'));
    var hasPrev = hasPrevPage(page);
    var prevId = $("#prev").attr('id');
    var nextId = $("#next").attr('id');

    if (hasPrev) {
        showStocks(stocks);

        moveButton(prevId, "prev");
        moveButton(nextId, "prev");
        setDisableButton(nextId, false);
        setDisableButton(prevId, false);
    } else {

        setDisableButton(prevId, true);

    }


})


$("#next").click(function(e) {

    var stocks = getStockAgent.call(this, e);
    var size = parseInt($("#" + e.target.id).attr('size'));
    var hasNext = hasNextPage(stocks.length, size);

    var prevId = $("#prev").attr('id');
    var nextId = $("#next").attr('id');

    if (hasNext) {
        showStocks($(stocks).slice(0, size - 1));
        moveButton(prevId, "next");
        moveButton(nextId, "next");
        setDisableButton(prevId, false);
        setDisableButton(nextId, false);//只有一页的时候还是会出问题

    } else {
        setDisableButton(nextId, true);
    }
})


$("#tagButton").click(function(e) {
    var tag = $("#addTag").val();
    var symbol = $("#symbolLabel").attr("symbol");
    if (symbol == "") {
        alert("not select stock");
        //应该直接禁用掉
        $("#addTag").val("");
        return;
    }

    addTagOfSymbol(symbol, tag);
    addSymbolOfTag(symbol, tag);
    addTags(tag);
    var tags = getTagsOfSymbol(symbol);
    showTags(tags);


})


$("#test").click(function(e) {


    /*    var params = new Array("600001", "600002");
     var details = getStockDetailFromServer(params);
     console.log(" real get data " + details);*/


    var tree = new RadixTree();
    for (i = 0; i < 1; i++) {
        tree.insert( i,i);
    }
    var content = JSON.stringify(tree);
    console.log(content);
    var object = deserialize( jQuery.parseJSON(content));
    var ls = object.search("i");
    console.log("success " + JSON.stringify(tree));
    console.log("search result " + ls);


})

$("#queryStock").click(function(e) {

    var symbol = $("#stockInput").val();
    console.log(symbol);
    displayTagBySymbol(symbol);


})


$("#queryTag").click(function(e) {
    var tag = $("#tagInput").val();
    console.log(tag);
    displayStocksByTag(tag);


})


function test(){

    RadixTree tr=new RadixTree();
    tr.getNumberOfNodes



}