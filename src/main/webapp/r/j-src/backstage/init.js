$(document).ready(function() {
    $("#add-input").tap(function() {

        var inputbox1 = '<input class="ui-input-text ui-body-css ui-corner-all ui-shadow-inset" type="text" name="name" required="required" placeholder="输入新的姓名..." />' +
                        '<input class="ui-input-text ui-body-css ui-corner-all ui-shadow-inset" type="tel" name="tel" required="required" placeholder="输入新的电话号码..." /><br/><br/>';
        $("#field").append(inputbox1);
    })
});