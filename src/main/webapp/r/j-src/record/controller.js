/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:26
 * To change this template use File | Settings | File Templates.
 */

var recordService={

 showRecord:function(messages, speed) {

    var mq = [];
    for (var index in messages) {
        var ms = messages[index];


        var msgLength = ms.length;


        for (var i = msgLength - 1; i >= 0; i--) {
            var message = ms[i];

            mq.push(message);


        }

    }
     recordService.showMessage(0, mq, speed)
},

 showMessage:function(index, messages, speed) {

    if (index >= messages.length) {
        return;
    }
    var message = messages[index];
    roomParseService.branch(message);

    if (index == message.length - 1) {
        //最后一个,无法获取下一条消息的间隔期


    } else {
        var nextMessage = messages[index + 1];
        if (nextMessage == null) {

        } else {
            recordFirstTime = message.time;
            recordSecondTime = nextMessage.time;
            //间隔期
            msg_interval = (recordSecondTime - recordFirstTime) * speed;
        }


    }
    index++;
    console.log("next message will run after " + msg_interval);
    setTimeout(showMessage, msg_interval, index, messages, speed);

}

}


$(document).ready(function() {

    var text=$("#contents").text();
    var messages=eval(text);
    parseMessage(messages);
})


