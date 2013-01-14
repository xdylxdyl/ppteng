/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-2-13
 * Time: 下午3:21
 * To change this template use File | Settings | File Templates.
 */

var stockTree = new RadixTree();

$(document).ready(function() {

    init();


});


function init() {
    // console.profile("Measuring time");
    console.log(" init data start ");
    var stocks = initStockDetail();
    console.log(" init stock detail over  ");
    initStockList();
    console.log("  initStockList  over  ");
    initTriple();
    console.log("  initTriple  over  ");
    initTag();
    console.log("  init tag  over  ");

    // /这可是每次刷新都要执行一次的操作啊.
    //setTimeout('initKeyBoardSpirit()', 10000);
   // initKeyBoardSpirit();
    console.log("  int keyboard spirit  over  ");
    console.log(" init over ");
    //console.profileEnd();


}
function initStockList() {


    var size = parseInt($("#prev").attr('size'));
    var stockList = getStock(1, size);
    console.log("localhost stock " + stockList.length);
    showStocks(stockList);


}
function initStockDetail() {
    //获取所有数据
    return getStockDetailAgent(null);


}

function initKeyBoardSpirit(stocks) {
    console.profile('Measuring time');
    var start = new Date().getTime();


    var stockTrieTreeName = "stockTree";
    var localStockTrie = getLocalStore(stockTrieTreeName);

    if (localStockTrie == null) {

        stockTree = convertStockTrie(stocks);
        saveLocalStore(stockTrieTreeName, stockTree);

    } else {

        stockTree = localStockTrie;

    }
    //怎么判断要不要更新呢?不知道Trie能否持久化
    //如果不能序列化就只能每次都加载到内存里了.

    console.log(stockTree.getNumberOfRealNodes());
    console.log(" init use time " + (new Date().getTime() - start));
    console.profileEnd();
}


function convertStockTrie(stocks) {

    var stockTree = new RadixTree();

    if (stocks == null) {
        stocks = initStockDetail();
    }

    var size = stockTree.getNumberOfRealNodes();
    if (size > 0) {
        console.log(" already have data ");
        return;
    }

    jQuery.each(stocks, function(i, value) {
        // console.log("detailsName is "+detailsName);

        //  console.log("detail storage is "+JSON.stringify(detailStorage));


        try {
            //  var start=new Date().getTime();
            var code = value.code;
            stockTree.insert(value.code, code);
            stockTree.insert(value.name, code);
            //拼音有重复的怎么办?如果重复了就插入拼音和名字的组合.这样总能找到数据了吧.
            var exist=stockTree.find(value.pinyin);
            var myPinYin = value.pinyin;
              if(exist!=null){
               myPinYin=value.pinyin+"-"+value.name;
             }else{

             }
             stockTree.insert(myPinYin,code);
            //  console.log(" use time "+(new Date().getTime()-start));


        } catch(e) {
            console.log(e);
            console.log(value);
        }
    });

    return stockTree;


}



