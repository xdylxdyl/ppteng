/*
 * 顶部js控件
 * yunyan@sohu-inco.com
 */

$register('sohu.navbar.*', function() {
    var PACK = sohu.navbar;

    var navbarMdl = new sohu.core.Model({
        actions:{
            get:{
                url :       '/navbar/info/get.do',
                params:     [],
                method:     'get',
                format:     'json',
                type:       'one'
            },

            notice:{
                url :       '/notice/info/list.do',
                params:     ['cate','start','size'],
                method:     'get',
                format:     'json',
                type:       'one'
            }
        },
        url:                '/a'
    });

    PACK.navbarCtl = {
        msgCount: 0,
        init: function(inboxEl,noticeEl){
            this.inboxEl=$(inboxEl);
            this.noticeEl=$(noticeEl);
            this.get();
            return this;
        },
        get: function(){
            navbarMdl.get({} ,{
                success: function(data){
                    data.inbox_count=parseInt(data.inbox_count);
                    data.notice_count=parseInt(data.notice_count);
                    if(data.inbox_count>0){
                        this.inboxEl.show('block');
                        if(data.inbox_count>100)
                            this.inboxEl.down('span').html(""+ data.inbox_count +"+");
                        else
                            this.inboxEl.down('span').html(""+ data.inbox_count +"");
                    }
                    this.msgCount = data.notice_count;
                    if(data.notice_count>0){
                        this.noticeEl.show('block');
                        if(data.notice_count>100)
                            this.noticeEl.down('span').html(""+ data.notice_count +"+");
                        else
                            this.noticeEl.down('span').html(""+ data.notice_count +"");
                    }
                }.bind(this),
                failure: function() {}
            });
        },
        /*
         * _hit 记录用户点击消息的次数
         */
        _hit :0,
        notice: function(element){
            element=$(element);
            if(element.hasClass('flyout')){
                element.removeClass('flyout');
                return;
            }else{
                this._hit++;
                this.noticeEl.hide();
                element.addClass('flyout');
            }
            element.out('click',function(){
                element.removeClass('flyout');
            });
            var contentEl = element.down('.j-body');
            if(this.msgCount == 0 && this._hit > 1)return;
            if(this.msgCount< 5 )
                this.msgCount = 5;
            navbarMdl.notice({
                start: 0,
                size: this.msgCount
            } ,{
                success: function(data){
                    contentEl.html(data.list);
                    this.msgCount = 0;
                }.bind(this),
                failure: function() {}
            });
        },

        setting:function(element){
            var arr = ['账号设置','隐私设置','应用设置', '聊天设置'];
            var topSetting = new sohu.ctrl.MenuTip({
                element: element,
                show: 'mouseover',
                content:arr,
                position:[-5,5],
                width:64,
                onSelect:function(i){
                    if(i==arr[0])
                        document.location = '/user/name.do';
                    if(i==arr[1])
                        document.location = '/privacy.do';
                    if(i==arr[2])
                        document.location = '/apps/myapps.do';
                    if(i==arr[3])
                        document.location = '/im/setting.do';
                }
            });
        }
    }

},'sohu.core.*,sohu.ctrl.TipSuggest');

