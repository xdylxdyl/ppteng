var list_class = "ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c";
//var title_class="ui-li ui-li-divider ui-btn ui-bar-b ui-corner-top ui-corner-bottom";
$(document).ready(function() {
    checkhHtml5();
    init();
});


//显示灰色遮罩层
function showBg() {
    var bh = $(window).height();
    var bw = $(window).width();
    $("#mask").css({
        height:bh,
        width:bw,
        display:"block"
    });
    $("#mask").show();
}
//关闭灰色遮罩
function closeBg() {
    $("#mask").hide();
}


function checkhHtml5() {
    if (typeof(Worker) == "undefined") {
        alert("not support ");
        showBg();
    }
}


function init() {
    //console.log("get group");
    var t = new Date().getTime();
    var groups = new Array();
    jQuery.each(group_member, function(key, value) {
            //  console.log(key + " : " + value);
            groups.push(key);
        }
    );

    console.log("init use time " + (new Date().getTime() - t));
    t = new Date().getTime();
    showList("groupList", "组名", groups, showGroupList);
    console.log("show list use time " + (new Date().getTime() - t));


}


function showList(id, title, groups, showMethod) {
    //console.log("show group " + groups);
    $("#" + id).empty();
    //$("#" + id).append('<li id=' + id + 'Head data-role="list-divider" role="heading">' + title + '</li>');
    //  $("#"+id).addClass(title_class);
    jQuery.each(groups, function(index, key, value) {
            showMethod(id, key);
        }
    );

    $("#" + id).listview("refresh");

}
function showMemberList(id, key) {
    var value = contacts[key];
    var content = "<a href='tel:+86" + value + "'>" +
        "<h3>" + key + "</h3>" +
        "<p>" + value + "</p>" +
        "</a>" +
        '<a phone="'+value+'" href="sms:+86' + value + '"></a>';
    return $("#" + id).append('<li id=' + key + '>' + content + ' ');

}

function showGroupList(id, name) {
    var count = group_member[name].length;
    return $("#" + id).append('<li id=' + name + '><h2 id=' + name + '>' + name + '</h2><span class="ui-li-count" id=' + name + '>' + count + '</span> ');

}


//
function onSuccess(contacts) {
    for (var i = 0; i < contacts.length; i++) {
        console.log("Display Name = " + contacts[i].displayName);
    }
}

// onError: Failed to get the contacts
//
function onError(contactError) {
    alert('onError!');
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var myContact = navigator.contacts.create({"displayName": "Test User"});
    myContact.gender = "male";
    console.log("The contact, " + myContact.displayName + ", is of the " + myContact.gender + " gender");
}


$(function() {

    $("#contactListHead").click(function(e) {
        var start = new Date().getTime();
        $.mobile.changePage("#group", { transition: null});
        /*   console.log("change page group use time " + (new Date().getTime() - start));*/

    });
    $("#groupList").click(function(e) {
        var start = new Date().getTime();
        var id = e.target.id;
        if (id == "groupListHead") {
            return;
        }
        // alert("组名 " +id);

        $.mobile.changePage("#contact", { transition: null});
        console.log("change page  contact use time " + (new Date().getTime() - start));
        start = new Date().getTime();
        var list = group_member[id];
        showList("contactList", id + "成员", list, showMemberList);
        console.log("show memberlist use time " + (new Date().getTime() - start));
    });


    $("#contact").swipeleft(function() {
        $.mobile.changePage("#group", { transition: null});


    });

   /* $("#contact").swiperight(function() {
        alert("create success start");
        try {
          var contact= window.navigator.contacts.create({"displayName": "Test User"});
        } catch(err) {
            console.log(err.description);
        }

        alert("create success");

        contact.save(onSuccess,onError);

         alert("save success");


    });*/


});