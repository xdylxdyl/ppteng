

$register('sohu.status.*', function(){
    var PACK=sohu.status;

    PACK.input = function(inputEl, str){
        var inputEle = $(inputEl);
        inputEle.val(str);
        inputEle.attr('style','color:#999');
        inputEle.on('focus', function(){
            if(inputEle.val() == str)
            inputEle.val('');
            inputEle.attr('style','');
        });
        inputEle.on('blur', function(){
            if(inputEle.val() == ''){
                inputEle.val(str);
                inputEle.attr('style','color:#999');
            }
        });
    };

    /********************************************* statusMdl *********************************************/
    var statusMdl = new sohu.core.Model({
        actions: {
            add: {
                url:        '/add.do',
                params:     ['type', 'content'],
                method:    'post',
                format:     'json',
                type:       'one'
            },
            del: {
                url:        '/del.do',
                params:     [],
                method:     'post',
                format:     'json',
                type:       'blank'
            }
        },
        url:                '/a/status/info'
    });

    /********************************************* StatusCtl *********************************************/
    PACK.StatusCtl={
      init: function(options){
        this.options = options;
        this.body = $(options.body);
        this.status = this.body.down(options.status);
        this.form = $(options.form);
        this.submit= this.form.down('button[type=submit]');
        this.type = options.type;
        this.tab = options.tab;
        var delBtn = this.body.down(options.delBtn);
        PACK.input(this.form.down('input'), '你正在做什么？');
        if(this.status.text() == ''){
            this._initInput();
        }
        if(this.type == 2){
            this.statusNo=$(options.statusNo);
            this.body.down(options.editBtn).on('click', function(){
                this.body.hide();
                this.form.parent().show();
            }.bind(this));
            this.form.down('.cancel').on('click', function(){
                if(this.status.text() == '')
                    this.statusNo.show();
                else
                    this.body.show();
                this.form.parent().hide();
            }.bind(this));
            this.statusNo.down('a').on('click', function(){
                this.statusNo.hide();
                this.form.parent().show();
            }.bind(this));
        }
        delBtn.on('click', function(){
            this.del();
        }.bind(this));
        this.form.on('submit', function(){
            this.add();
            return false;
        }.bind(this));
      },
      add: function(){
          var input = this.form.down('input');
          var value = input.val();
          if(value == '' || value == '你正在做什么？'){
              input.elements()[0].focus();
              return;
          }
          this.submit.attr('disabled','disabled');
          this.form.down('input').attr('disabled','disabled');
          this.submit.text('提交中');
          this.status.html(value);
          this.body.down('.time').html('0秒前');
          this.body.show();
          if(this.type == 2)
              this.form.parent().hide();
          input.val('');
          statusMdl.add({
              type: this.type,
              content: value
          },{
              success: function(){
                  this.submit.elements()[0].disabled=false;
                  this.form.down('input').elements()[0].disabled=false;
                  this.submit.text('提交');
                  this.form.down('input').elements()[0].blur();
                  if (this.type == 1)
                    this.tab.active('newsfeed',true);
                  else
                    this.tab.active('0',true);
              }.bind(this),
              failure: function() {}
          });
      },

      del: function(){
          this.status.html('');
          this._initInput();
          statusMdl.del({},{
              success: function(data){}.bind(this),
              failure: function() {}
          });
      },

      _initInput: function(){
          this.body.hide();
          if(this.type == 1){
              this.form.parent().show();
          }
          else
            $(this.options.statusNo).show();
      }
    };
}, 'sohu.core.*');