var storage = window.localStorage;


function checkLocalStorage() {
    if (storage) {

    } else {
        console.log("浏览不支持localStorage");
    }
}


function storeStock(result) {
    console.log("accept data ");
    //console.log(result);
    var allStock = JSON.stringify(result["-1"]);
    console.log("getstocks " + allStock);
    storage.stock = allStock;
}

function isUpdateStock() {
    var stockStorage = eval('(' + storage.getItem("stock") + ')');//js has constant?
    if (stockStorage && stockStorage != "undefined") {

        console.log("localhost stock " + stockStorage.length);
        return false;


    } else {
        console.log("not have stock data in local ");
        return true;
    }

}

function getStockAgent(e) {
    var id = getID.call(this, e);
    console.log("you click " + id);

    var page = parseInt($("#" + id).attr('page'));
    var size = parseInt($("#" + id).attr('size'));
    console.log(page + " size is " + size);
    //用来判断是否有下一页.如果取出来的数据多一条,那么就表示有下一页.
    return getStock.call(this, page, size + 1);
}

//怎么解决有部分在本地部分获取不到呢?
function getStockDetailAgent(symbols) {
    var details = getStockDetailFromLocal(symbols);

    if (details == null) {
        //从服务器获取数据的时候不能有返回值吗
        console.log("get   detail  from server");
        details = getStockDetailFromServer(symbols);
        storeStockDetailToLcoal(details);

    } else {

        console.log("get details from local ");

    }
    return details;

}


function storeStockDetailToLcoal(details) {
    console.log("accept details of stock ");
    var stockDetailName = "stockDetail";
    /*  jQuery.each(details, function(i, value) {
     //事先对Match中需要匹配的内容做转换?
     value.name=RegExp.escape(value.name);
     }
     )*/


    var allStockDetails = JSON.stringify(details);
    console.log("allStockDetails " + allStockDetails);
    storage[stockDetailName] = allStockDetails;
    console.log("accept details of stock success ");


}

function getStockDetailFromLocal(symbols) {
    var details = {};
    var detailsName = "stockDetail";
    var detailStorage = eval('(' + storage.getItem(detailsName) + ')');//js has constant?
    if (detailStorage == null) {
        return null;
    }
    else {

        if (symbols == null) {

            //怎么判断要不要更新呢?

            return detailStorage;


        } else {
            jQuery.each(symbols, function(i, value) {
                // console.log("detailsName is "+detailsName);

                //  console.log("detail storage is "+JSON.stringify(detailStorage));

                var detail = detailStorage[value];
                if (detail != null) {
                    details[value] = detail;
                } else {

                }
            });

        }


    }
    return details;


}

function parse(details) {

    var result = details["detail"];


    //  console.log("==================="+result);
    return result;

}

function test() {
    var result = getStockDetailFromServer(null);
}

function getStockDetailFromServer(symbols) {
    var params = {
        "symbols":symbols
    }
    //how to trun symbols to an array?
    var details = null;
    var d = (symbols == null) ? {} : params;
    jQuery.ajaxSettings.traditional = true,
        $.ajax({
            type : 'POST',
            url : "/stock/detail.do",
            async: false,
            data:d,
            dataType:"json",

            success : function(result) {
                // console.log("get data from server "+result);
                details = parse(result);
            }
        });

    //console.log(details);

    return details;


}


function getStock(page, size) {
    console.log(page + " is page and size is " + size);
    //判断是否需要更新.需要就从服务器取数据,否则就从本地取数据
    var updateStock = isUpdateStock();
    if (updateStock) {
        console.log(" need update data,please wait ");
        getStockFromServer(); //这里已经更新数据到本地了

    } else {
        console.log(" get data from local ");

    }

    return getStockFromLocal(page, size);


}

function getStockFromLocal(page, size) {
    console.log(page + " local get is page and size is " + size);
    var stockStorage = eval('(' + storage.getItem("stock") + ')');//js has constant?
    var length = stockStorage.length;

    var start = (page - 1) * size;
    if (start < 0) {
        start = 0;
    }
    if (start > length) {
        return null;
    }
    var end = page * size;


    if (end > length) {
        end = length - 1;
    }
    console.log(start + " and end is " + end);
    var stock = $(stockStorage).slice(start, end);
    console.log("localhost stock " + stock.length);
    return stock;
}
function getStockFromServer() {
    $.ajax({
        type : 'POST',
        url : "/stock/list.do",
        dataType:"json",
        success : function(result) {
            storeStock(result);

        }
    })
}


function initTriple() {

    var stockStorage = storage.getItem("triple");//js has constant?
    if (stockStorage) {
        console.log("localhost triple " + stockStorage);

    } else {
        console.log("triple from server ");


    }


}
function initTag() {

    var tags = getAllTags();
    showTags(tags);


}

function getTag(symbol) {

    console.log("start get tag'");


}


function getTagsOfSymbol(symbol) {
    var tagsName = "tags";
    var tags = storage.getItem(tagsName);//js has constant?

    if (tags == null) {
        console.log(" not any symbol have tag ");
        return {};
    } else {
        console.log("get  tags " + tags);
        var tagList = eval('(' + tags + ')')
        var symbolTags = tagList[symbol];
        if (symbolTags == null) {
            console.log(symbol + "dont have  tags ");
            return {};
        } else {
            console.log(symbol + " have  tags " + symbolTags);
            return symbolTags;
        }

    }

}

function getSymbolsOfTag(tag) {
    var symbolsName = "symbols";
    var symbols = storage.getItem(symbolsName);//js has constant?

    if (symbols == null) {
        console.log(" not any tag have symbols ");
        return {};
    } else {
        console.log("get  symbols " + tag);
        var symbolList = eval('(' + symbols + ')')
        var tagSymbols = symbolList[tag];
        if (tagSymbols == null) {
            console.log(tag + "dont have  symbols ");
            return {};
        } else {
            console.log(tag + " have  symbols " + tagSymbols);
            return tagSymbols;
        }

    }

}


function addTagOfSymbol(symbol, tag) {
    console.log(symbol + "add  tag " + tag);
    var tagsName = "tags";
    var tags = storage.getItem(tagsName);//js has constant?
    var tagList = {};
    if (tags == null) {
        console.log(symbol + " init  tag ");
        tagList = {

        };
    } else {
        console.log(symbol + "old  tags " + tags);

        tagList = eval('(' + tags + ')')
    }
    var symbolTags = tagList[symbol];
    if (symbolTags == null) {
        symbolTags = new Array();
    } else {

    }
    //不能重复
    if ($.inArray(tag, symbolTags) > -1) {
        console.log("already exist " + tag);

    } else {

        symbolTags.push(tag);
        tagList[symbol] = symbolTags;
        var newTags = JSON.stringify(tagList);
        console.log(newTags);
        storage[tagsName] = newTags;
        console.log("over " + storage.getItem(tagsName));

    }


}


function delTagOfSymbol(symbol, tag) {
    console.log(symbol + "del  tag " + tag);
    var tagsName = "tags";
    var tags = storage.getItem(tagsName);//js has constant?
    var tagList = {};
    if (tags == null) {
        return;
    } else {
        console.log(symbol + "old  tags " + tags);

        tagList = eval('(' + tags + ')')
    }
    var symbolTags = tagList[symbol];
    if (symbolTags == null) {
        return;
    } else {

    }
    //不能重复
    if ($.inArray(tag, symbolTags) > -1) {
        console.log("already exist " + tag);
        symbolTags = jQuery.grep(symbolTags, function(value) {
            return value != tag;
        });
        tagList[symbol] = symbolTags;
        storage[tagsName] = JSON.stringify(tagList);

    } else {

        return;

    }


}


function addSymbolOfTag(symbol, tag) {
    console.log(symbol + "add  tag " + tag);
    var symbolsName = "symbols";
    var symbols = storage.getItem(symbolsName);//js has constant?
    var symbolList = {};
    if (symbols == null) {
        console.log(tag + " init  symbol ");
        symbolList = {

        };
    } else {
        console.log(tag + "old  symbol " + symbols);

        symbolList = eval('(' + symbols + ')')
    }
    var tagSymbols = symbolList[tag];
    if (tagSymbols == null) {
        tagSymbols = new Array();
    } else {

    }

    if ($.inArray(symbol, tagSymbols) > -1) {
        console.log("already exist " + symbol);

    } else {

        tagSymbols.push(symbol);
        symbolList[tag] = tagSymbols;


        var newSymbols = JSON.stringify(symbolList);
        console.log(newSymbols);
        storage[ symbolsName] = newSymbols;
        console.log("over " + storage.getItem(symbolsName));

    }


}


function delSymbolOfTag(symbol, tag) {
    console.log(symbol + "del  tag " + tag);
    var symbolsName = "symbols";
    var symbols = storage.getItem(symbolsName);//js has constant?
    var symbolList = {};
    if (symbols == null) {
        console.log(tag + " init  symbol ");
        return;
    } else {
        console.log(tag + "old  symbol " + symbols);
        symbolList = eval('(' + symbols + ')')
    }
    var tagSymbols = symbolList[tag];
    if (tagSymbols == null) {
        return;
    } else {

    }

    if ($.inArray(symbol, tagSymbols) > -1) {
        console.log("already exist " + symbol);

        tagSymbols = jQuery.grep(tagSymbols, function(value) {
            return value != symbol;
        });
        symbolList[tag] = tagSymbols;
        storage[symbolsName] = JSON.stringify(symbolList);


    } else {


    }


}


function getAllTags() {

    console.log("get all  tag ");
    var storageName = "allTags";
    var storageContent = storage.getItem(storageName);//js has constant?
    var storageList = {};
    if (storageContent == null) {
        console.log(storageName + " init ");
        storageList = {
        };
    } else {
        console.log(storageName + "old " + storageContent);

        storageList = eval('(' + storageContent + ')')
    }
    return storageList;
}


function addTags(tag) {
    console.log("add  tag " + tag);
    var storageName = "allTags";
    var storageContent = storage.getItem(storageName);//js has constant?
    var storageList = {};
    if (storageContent == null) {
        console.log(storageName + " init ");
        storageList = new Array();
    } else {
        console.log(storageName + "old " + storageContent);

        storageList = eval('(' + storageContent + ')')
    }
    if ($.inArray(tag, storageList) > -1) {
        console.log("already exist " + tag);

    } else {
        storageList.push(tag);
        storageContent = JSON.stringify(storageList);
        console.log(storageContent);
        storage[ storageName] = storageContent;
        console.log(tag + " over ");

    }


}


function delTags(tag) {
    console.log("del  tag " + tag);
    var storageName = "allTags";
    var storageContent = storage.getItem(storageName);//js has constant?
    var storageList = {};
    if (storageContent == null) {
        console.log(storageName + " init ");
        return;
    } else {
        console.log(storageName + "old " + storageContent);

        storageList = eval('(' + storageContent + ')')
    }
    if ($.inArray(tag, storageList) > -1) {

        console.log("already exist " + tag);
        storageList = jQuery.grep(storageList, function(value) {
            return value != tag;
        });
        storage[storageName] = JSON.stringify(storageList);


    } else {

        return;

    }


}


function storeStock(result) {
    console.log("accept data ");
    //console.log(result);
    //-1表示全部数据
    var allStock = JSON.stringify(result["-1"]);
    console.log("getstocks " + allStock);
    storage.stock = allStock;
}

function isUpdateStock() {
    var stockStorage = eval('(' + storage.getItem("stock") + ')');//js has constant?
    if (stockStorage && stockStorage != "undefined") {

        console.log("localhost stock " + stockStorage.length);
        return false;


    } else {
        console.log("not have stock data in local ");
        return true;
    }

}


function getStock(page, size) {
    console.log(page + " is page and size is " + size);
    //判断是否需要更新.需要就从服务器取数据,否则就从本地取数据
    var updateStock = isUpdateStock();
    if (updateStock) {
        console.log(" need update data,please wait ");
        getStockFromServer(); //这里已经更新数据到本地了

    } else {
        console.log(" get data from local ");

    }

    return getStockFromLocal(page, size);


}

function getStockFromLocal(page, size) {
    console.log(page + " local get is page and size is " + size);
    var stockStorage = eval('(' + storage.getItem("stock") + ')');//js has constant?
    if (stockStorage == null) {
        console.error("not get local data");
        return {};
    }
    var length = stockStorage.length;

    var start = (page - 1) * size;
    if (start < 0) {
        start = 0;
    }
    if (start > length) {
        return null;
    }
    var end = page * size;


    if (end > length) {
        end = length - 1;
    }
    console.log(start + " and end is " + end);
    var stock = stockStorage.slice(start, end);
    console.log("localhost stock " + stock.length);
    return stock;
}
function getStockFromServer() {
    $.ajax({
        type : 'POST',
        url : "/stock/list.do",
        async: false,
        dataType:"json",
        success : function(result) {
            storeStock(result);

        }
    })
}


function getLocalStore(name) {


    var store = jQuery.parseJSON(storage.getItem(name));//js has constant?
    if (store == null) {
        console.info(name + " not get local data");
        return null;
    } else {

        return deserialize(store);
    }
}


function saveLocalStore(name, object) {
    console.log("save " + name);
    storage.setItem(name, JSON.stringify(object));

}

function keywizardSearch(query,count,type) {




    var start=new Date().getTime();
    //对这个输入串有过滤的要求

    query = RegExp.escape(query.toUpperCase());

    var stocks = getStockDetailAgent();
    var lists = new Array();
    var c=0;
    jQuery.each(stocks, function(i, value) {

            if(c>=count){
                   return;
            }else{
                 if (value.name.match("^" + query) == query || value.code.match("^" + query) == query || value.pinyin.match("^" + query) == query) {
                lists.push(value);
                c++;
            }
            else {

            }
            }
        }


    )

    console.log(stocks.length+" use time "+(new Date().getTime()-start));
    return lists;


}
