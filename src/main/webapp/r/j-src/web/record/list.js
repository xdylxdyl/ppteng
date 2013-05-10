/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-2
 * Time: 下午2:26
 * To change this template use File | Settings | File Templates.
 */


var recordView={
    getVersion:function(){
        return $("#version").val();
    }
}


$(document).ready(function() {
    headView.highLight("case");
    var version=recordView.getVersion();

     leftView.highLight("nav_"+version);

});


