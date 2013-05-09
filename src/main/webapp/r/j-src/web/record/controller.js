/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:26
 * To change this template use File | Settings | File Templates.
 */



$(document).ready(function() {

    var text=$("#contents").text();
    var messages=eval(text);
    parseMessage(messages);
})


