/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-3-7
 * Time: 下午4:57
 * To change this template use File | Settings | File Templates.
 */
function DBC2SBC(str) {
    var result = '';
    for (i = 0; i < str.length; i++) {
        code = str.charCodeAt(i);//获取当前字符的unicode编码
        if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已及各种字符
        {
            result += String.fromCharCode(str.charCodeAt(i) - 65248);//把全角字符的unicode编码转换为对应半角字符的unicode码
        } else if (code == 12288)//空格
        {
            result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
        } else {
            result += str.charAt(i);
        }
    }
    return result;
}

function full2half(str) {
    str = str.replace('，', ',');
    str = str.replace('“', '"');
    str = str.replace('”', '"');
    return str
}

function format(str) {
    str = DBC2SBC(str);
    str = full2half(str);
    return str;
}


function htmlEncode(value) {
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}
function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    }
    else {
        return '';
    }
}

function isJson(content) {
    if (content.match("^\{(.+:.+,*){1,}\}$")) {
        return true;
    } else {
        return false;
    }
}

function array2splitString(arrays, split) {

    var result = "";
    for (var i = 0; i < arrays.length; i++) {
        if (i == arrays.length - 1) {
            result = result + arrays[i];
        } else {
            result = result + arrays[i] + split;
        }

    }

    return result;

}

function splitString2Array(string, split) {
    if(string==null){
        string=="";
    }else{
        var result = string.split(split)
          return result;
    }


}