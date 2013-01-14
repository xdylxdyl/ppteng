function clear(e) {
    var id = getID.call(this, e);
    console.log("clear " + id);
    $("#" + id).val("");
    console.log("clear success " + id);
}

function getID(e) {
    return e.target.id;

}


//如果真正的数据比原来的分页多.就说明有下一条
function hasNextPage(realSize, initSize) {
    if (realSize > initSize) {
        return true;
    } else {
        return false;
    }

}

//如果真正的数据比原来的分页多.就说明有下一条
function hasPrevPage(page) {
    if (page <= 0) {
        return false;
    } else {
        return true;
    }

}

//怎么判断是否禁用了
function setDisableButton(id, value) {
    $("#" + id).attr("disabled", value);
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


function focusChildrenCSS(id, children, css) {
    var siblings = $("#" + id).siblings();
    console.log("sublings " + siblings);
    $("#" + id).siblings().children(children).removeClass(css);
    $("#" + id).children(children).addClass(css);

}


function focusCSS(id, css) {
    var siblings = $("#" + id).siblings();
    console.log("sublings " + siblings);
    $("#" + id).siblings().removeClass(css);
    $("#" + id).addClass(css);

}

RegExp.escape = function(text) {
    if (!arguments.callee.sRE) {
        var specials = [
            '/', '.', '*', '+', '?', '|',
            '(', ')', '[', ']', '{', '}', '\\'
        ];
        arguments.callee.sRE = new RegExp(
            '(\\' + specials.join('|\\') + ')', 'g'
        );
    }
    return text.replace(arguments.callee.sRE, '\\$1');
}
