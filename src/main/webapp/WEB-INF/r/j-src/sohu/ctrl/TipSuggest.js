/**
 * @fileoverview  自动提示框，支持提示的下拉选择（鼠标及键盘选择），可运用于注册提示，以及选择框提示（学校选择等）
 * @authot  yunyan@sohu-inc.com
 * @version  0.1
 */
 

function fOnpropertychange(XEle, XFunc, bCapture){							// hongwei 2009-01-05 17:01
	// 兼容 ie 及 ff 的 时间监听函数，可以获取表单对象的实时改变，然后响应事件。
	// 避免了有输入法情况下的不必要的数据请求。
	try{
		if(document.addEventListener) {return XEle.addEventListener("input", XFunc, bCapture);}
		if(document.attachEvent) return XEle.attachEvent("onpropertychange",XFunc);
		throw new Error("浏览器不支持 fOnpropertychange 函数!");
	}catch(e){alert(e)}
}

$register(
	"sohu.ctrl.TipSuggest",
	function(){
		sohu.ctrl.TipSuggest=Class.create({
			/**
			 * @constructor  TipSuggest类的构造函数
			 * @param 
			 **/
			initialize:function(options){
				this.body=$(document.body);
                this.element=[];
				this.posto=[];
				this.position=[];
				this.popLayer=null;
				this.onli='on';
				this.width=null;
				this.hide=true;
				this._tip(options);
				this.lastMatch="";											// hongwei 2009-01-05 17:01
            },
			
			_tip:function(options){
				var settings={
					element:null,  ///目标对象，字符或数组
					posto:null, ///做为参考坐标的对象,字符或数组
					position: [0,0], ///提示框将以目标为参考物作为坐标，然后移位
					width:null,  ///提示框的默认宽度
					event:null,  ///事件数组，格式为[{e:'focus',f:function(){}},{e:'click',f:function(){}}]
					name:"" ///对象名，用于生成一个div对象
				};
				Object.extend(settings,options);
                this.settings=settings;
				e="dropWrap_"+settings.name;
				var str="<div id='"+e+"' class='popLayer' style='display:none;z-index:2101;'>"
					+ "<div class='decor'></div>"
					+"<div class='content'><ul class='dropList'></ul></div></div>"
				if (!document.getElementById(e)) {
					this.body.append(str);
                }
                this.position=settings.position;
                this.width=settings.width;
                this.popLayer=$('#'+e);
                this._canChange = true;
                var _this=this;
                if(settings.element){
                    this._setElement(settings.element,settings.posto);
                    var _bindEvent=function(e){
                        arguments[1].apply(null,[arguments[2],e]);
                    };
                    var _bindChange=function(e){
                        if(this._canChange){
                           arguments[1].apply(null,[arguments[2],e]);
                       }
                    };
                    settings.event.each(function(i){
                        this.element.each(function(ii,yy){
                            if(i.e == 'change'){
                                fOnpropertychange(ii.elements()[0],_bindChange.bindEvent(this,i.f,yy),true);
                            }
                            else{
                                ii.on(i.e,_bindEvent.bindEvent(this,i.f,yy));
                            }
                        }.bind(this));
                    }.bind(this));
                }
                return this;
			},

            _check: function(o){
                var r=[];
                if(o.constructor==String){
                    r.push($(o));
                }else{
                    o.each(function(i){
                        if(i.constructor==String){
                            r.push($(i));
                        }else{
                            r.push(i);
                        }
                    });
                }
                return r;
            },
            _setElement: function(el,posto){
                this.element=this._check(el);
                if(posto==null)
                    this.posto=this.element;
                else{
                    this.posto=this._check(posto);
                }
            },

            setChange: function(bool){
              this._canChange = bool;
            },

            setElement: function(el,posto,e){
                this._setElement(el,posto);
                this.settings.event.each(function(i){
                    if(i.e == e){
                        i.f.apply(null,[]);
                    }
                }.bind(this));
            },
			
			tipContent:function(str){
				if(str.indexOf('li')<0){
					str="<li class='default'><span>"+str+"</span></li>";
				}
				this.popLayer.down('.dropList').html(str);
			},
			
			tipAddLi:function(str,id){
				if(this.popLayer.down('.dropList .default'))
					this.popLayer.down('.dropList .default').remove();
				var temp='';
				if(id){temp=" value='"+id+"'"}
				this.popLayer.down('.dropList').append('<li'+temp+'>'+str+'</li>');
			},
			
			tipFirstLiOn:function(){
				this.popLayer.down('.dropList li').get(0).addClass(this.onli);
			},
			
			tipHide:function(){
				if(!this.popLayer)this.popLayer=arguments[0].popLayer;
				if(!this.hide)this.hide=arguments[0].hide;
				if(this.hide){
					this.popLayer.hide();
				}
			},
			
			tipShow:function(){
				var e=null;
				if(arguments.length<1){
					e=this.posto[0];
				}else{
					e=this.posto[arguments[0]];
				}
				this.popLayer.css('left',(e.pos().left+this.position[0])+'px');
				this.popLayer.css('top',(e.pos().top+e.height()+this.position[1])+'px');
				if(this.width)this.popLayer.css('width',this.width+'px');
				this.popLayer.show();
			},
			
			keyAction:function(event,fun){
				var _this=this;
				var keys=[38,40,13,9];
				if(!event)return;
				if(keys.include(event.keyCode)){
					if(event.type=='keydown'){
						var index=function(li,cur){  ///查看this.onli在第几位
							for (var i=0;i<li.size();i++) {
								if (li.get(i).attr('value') == cur.attr('value')) return i;
							};
							return -1;
						};
						var li=this.popLayer.down('.dropList li');
						var onli='.dropList li[class='+this.onli+']';
						var flag=0;
						if(li.get(0).attr('class')=='default')return;
						
						if(!this.popLayer.down(onli)){
							flag=-1;
						}else{
							flag=index(li,this.popLayer.down(onli));
							this.popLayer.down(onli).removeClass(this.onli);
						}
						var size=li.size();
						switch (event.keyCode){
							case 38:{  ///向上
								if(flag==-1 || flag==0){
									li.get(size-1).addClass(this.onli);
								}else{
									li.get(flag-1).addClass(this.onli);
								}
								break;
							}
							case 40:{  ///向下
								if(flag==-1 || flag==size-1){
									li.get(0).addClass(this.onli);
								}else{
									li.get(flag+1).addClass(this.onli);
								}
								break;
							}
							case 13:{ ///确认
								var r=null;
								if(flag!=-1){
									r={text:li.get(flag).text(),value:li.get(flag).attr('value')};
                                    _this.hide=true;
                                    _this.tipHide();
                                    fun.apply(null,[r]);
                                    this.lastMatch=r.value;								 // hongwei 2009-01-05 17:01
								}
                                kola.Event.stop(event);
								break;
							}
                            case 9:{ ///tab确认键
                                var r = null;
								if(flag!=-1){
									r={text:li.get(flag).text(),value:li.get(flag).attr('value')};
                                    _this.hide=true;
                                    _this.tipHide();
                                    fun.apply(null,[r]);
                                    this.lastMatch=r.value;								 // hongwei 2009-01-05 17:01
								}
                                //kola.Event.stop(event);
								break;
                            }
						}
					}
					return;
				}
			},
		
			mouseAction:function(fun){
				var _this=this;
				this.popLayer.on('mouseout',function(){_this.hide=true;}).on('mouseover',function(){_this.hide=false;});
                
				var li=this.popLayer.down('.dropList li');
				if(li.get(0).attr('class')=='default')return;
                if(this.onMouseOver){
                    li.un('mouseover',this.onMouseOver);
                }else{
                    this.onMouseOver = this._bindLiOver.bind(this);
                }
                if(this.onClick){
                    li.un('mouseover',this.onClick);
                }else{
                    this.onClick = this._bindLiClick.bind(this,fun);
                }
				li.on('mouseover',this.onMouseOver);
				li.on('click',this.onClick);
			},

            _bindLiOver: function(e){
                var el=kola.Event.element(e).upWithMe('li');
                var onli=this.popLayer.down('.dropList li[class='+this.onli+']');
                if(onli)onli.removeClass(this.onli);
                el.addClass(this.onli);
            },

            _bindLiClick: function(fun){
                var event = arguments[1];
                var el=kola.Event.element(event).upWithMe('li');
                var r={text:el.text(),value:el.attr('value')};
                this.hide=true;
                this.tipHide();
                fun.apply(null,[r]);
                this.lastMatch=r.value;
            }
		});
	}
);
/**
 * 文字提示
 */
$register(
	"sohu.ctrl.ToolTip",
	function(){
		sohu.ctrl.ToolTip=Class.create({
			initialize:function(options){
				var settings={
					element:null,///必选参数，显示小提示的目标对象，支持数组，格式如'#help1',['#help1','#help2']
					content:null,///必选参数，提示内容，默认为String，支持数组,格式如'提示1',['提示1','提示2']
					show:'mouseover',///显示方式,有两种：mouseover(鼠标经过显示，默认),click(鼠标点击显示)
					close:null,///提示关闭方式，默认为鼠标移开即关闭，为0时表示永不关闭，为非0数字是表示几秒后自动关闭
					position:[0,0], ///显示位置，默认为目标对象的下方对齐，[5,-10]表示left+5,height-10;
					name:'tooltip',
					width:null
				};
				Object.extend(settings,options);
				var getContent=function(i){
					if(settings.content.constructor==String){
						return settings.content;
					}else{
						return settings.content[i];
					}
				};

				var tooltip=new sohu.ctrl.TipSuggest({
					element:settings.element,
					name:settings.name,
					position:settings.position,
					width:settings.width,
					event:[
						{e:settings.show,f:function(i){
							tooltip.tipContent(getContent(i));
							tooltip.tipShow(i);
							if(settings.close!=null && settings.close!=0){tooltip.tipHide.bind(tooltip).timeout(settings.close);};
						}},
						{e:'mouseout',f:function(){if (settings.close == null) {tooltip.tipHide();}}}
					]
				});
			}
		});
	}
);
/**
 * 菜单提示选择器
 */
$register(
	"sohu.ctrl.MenuTip",
	function(){
		sohu.ctrl.MenuTip=Class.create({
			initialize:function(options){
				var settings={
					element:null,
					content:[],
					onSelect:function(){},
					show:'click',
					position:[0,0],
					name:'MenuTip',
                    width:null
				};
				Object.extend(settings,options);
				var menutip=new sohu.ctrl.TipSuggest({
					element:settings.element,
					name:settings.name,
					position:settings.position,
					width:settings.width,
					event:[
						{e:settings.show,f:function(i){
							menutip.tipContent('');
							settings.content.each(function(i){
								menutip.tipAddLi(i);
							});
							menutip.tipShow(i);
                            menutip.popLayer.out('click',function(){
                                menutip.tipHide();
                            });
							menutip.mouseAction(function(t){
								settings.onSelect.apply(null,[t.text, i])
                                menutip.tipHide();
							});
						}}
					]
				});
			}
		});
	}
);
/**
 * 模拟html中select控件
 */
$register(
	"sohu.ctrl.SelectTip",
	function(){
		sohu.ctrl.SelectTip=Class.create({
			initialize: function(options){
				var settings = {
					element: null,
					content: [],
					value:[],
					onSelect: function(){},
					position: [0, 0],
					name: 'selecttip',
					width: null
				};
				Object.extend(settings, options);
				if(settings.value.length<1){
					settings.content.each(function(i,t){settings.value.push(t);})
				}
				var selecttip = new sohu.ctrl.TipSuggest({
					element: settings.element,
					name: settings.name,
					position: settings.position,
					width: settings.width,
					event: [
						{e: 'focus',f: function(){
							selecttip.tipContent('');
							settings.content.each(function(i,t){
								selecttip.tipAddLi(i,settings.value[t]);
							});
							selecttip.tipShow(0);
							selecttip.tipFirstLiOn();
							selecttip.mouseAction(function(t){
								$(settings.element).val(t.text);
								settings.onSelect.apply(null, [t.text])
							});
						}}, 
						{e: 'blur',f: function(){selecttip.tipHide(0);}},
						{e: 'keyup',f: function(){_keyaction(arguments[1]);}},
						{e: 'keydown',f: function(){_keyaction(arguments[1]);}}
					]
				});
				function _keyaction(e){
					selecttip.keyAction(e, function(t){
						$(settings.element).val(t.text);
					});
				}
			}
		});
	}
);
/**
 * 文本框输入提示
 */
$register(
	"sohu.ctrl.SelectChangeTip",
	function(){
		sohu.ctrl.SelectChangeTip=Class.create({
			initialize: function(options){
				this.obj=null;
				this.settings=null;
                this.value="";
				var settings = {
					element: null,
					onFocus: function(){},
                    onChange: function(){},
					onSelect: function(){},
					position: [0, 0],
					posto:null,
					name: 'changetip',
					width: null
				};
				Object.extend(settings, options);
				var selectchangetip=new sohu.ctrl.TipSuggest({
					element:settings.element,
					name:settings.name,
					position:settings.position,
					width:settings.width,
					posto:settings.posto,
					event:[
						{e:'focus',f:settings.onFocus},
						{e:'blur',f:function(){selectchangetip.tipHide(0);}},
						{e:'keyup',f: function(){
							var event = arguments[1];
							if ([38, 40, 13].include(event.keyCode)) {
								_keyaction();
								return;
							}
							}
						},
						{e: 'keydown',f: function(){_keyaction(arguments[1]);}},
						{e: 'change',f: function(){
                            settings.element=$(settings.element);
							var v = settings.element.val();
                            if(v != this.value && v!=""){
                                this.value = v;
                                //settings.element.val('')
                                settings.onChange.apply(null, [v]);
                            }
                        }.bind(this)}
					]
				});
				function _keyaction(e){
					selectchangetip.keyAction(e, function(t){
                        if(t){
                            settings.onSelect.apply(null, [t.text,t.value]);
                        }
					}.bind(this));
				}
				this.obj=selectchangetip;
				this.settings=settings;
			},
			
			content:function(str){
				this.obj.tipContent(str);
				this.obj.tipShow(0);
			},
			
			add:function(str,id){
				this.obj.tipAddLi(str,id);
				this.obj.tipShow(0);
			},
			
			firstOn:function(){
				this.obj.tipFirstLiOn();
                this.obj.mouseAction(function(t){
					this.settings.onSelect.apply(null, [t.text,t.value]);
				}.bind(this));
			},
			/**
			 * 设置tip的change事件是否激活
			 */
			setChange: function(bool){
				this.obj.setChange(bool);
			}
		});
	}
);
