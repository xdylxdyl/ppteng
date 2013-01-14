/**
 * @fileoverview  多方式图片选择控件类实现
 * @author  springwang@sohu-inc.com
 * @version  0.1
 * 
 * @requires 	kola.core,
 * 				kola.lang,
 * 				kola.dom,
 * 				kola.bom 
 * 				sohu.core.*,
 * 				sohu.ctrl.TipSuggest	packages
 */
 $register(
	"sohu.ctrl.MultiPhotoSelector",function(){
	
		sohu.ctrl.MultiPhotoSelector = Class.create({
			/**
			 * 构造图片选择器
			 */
			initialize: function(element,options){
				this._setInstance();
				this._initProperties();
				this._setOptions(options);
				this._build(element);
				this._initElements(element);
				this._initEvents();
				this._initCtrl();
				return this;
			},
			
			/**
			 * 显示选择器
			 */
			show: function(){
				this._els.selector.show();
			},
			
			/**
			 * 隐藏选择器
			 */
			hide: function(){
				this._els.selector.hide();
			},
			
			/**
			 * 初始化相关属性
			 */
			_initProperties: function(){
				this._images = [];
			},
			
			/**
			 * 设置参数
			 */
			_setOptions: function(options){
				this._opts = Object.extend({
					type: 3,
					button: '确定',
					selectCallback: this.hide.bind(this),
					cancelCallback: this.hide.bind(this)
				},options||{});
			},
			
			/**
			 * 设置实例对象，为了能在外引用实例值，所以这里保存了实例
			 */
			_setInstance: function(){
				this._instanceName = 'inst' + (new Date()).getTime();
				sohu.ctrl.MultiPhotoSelector.instances[this._instanceName] = this;
			},
			
			/**
			 * 构建整个选择器的html
			 */
			_build: function(element){
				var str = '<div class="updatePhoto">'+
					            '<ul class="fix">'+
					                '<li key="Upload" class="on" >上传照片</li>'+
					                '<li key="Link" >网络照片</li>'+
					                '<li key="Album" >我的相册</li>'+
					            '</ul>'+
					            '<div id="tC_1" class="j-selectView">'+
					                '<dl class="fieldset">'+
					                    '<dt>选择照片：</dt>'+
					                    '<dd>'+
					                       '<form><input type="file" class="file" name="file[0]"/></form>'+
					                        '<div class="meta">照片大小不超过5M</div>'+
					                    '</dd>'+
					               '</dl>'+
					            '</div>'+
					            '<div id="tC_2" class="j-selectView" style="display:none" >'+
					                '<dl class="fieldset">'+
					                    '<dt>链接地址：</dt>'+
					                    '<dd>'+
					                        '<input type="text" class="text j-linkUrl" value="http://" onfocus="this.select()"/>'+
					                    '</dd>'+ 
					                '</dl>'+
					            '</div>'+
					            '<div id="tC_3" class="j-selectView" style="display:none">'+         
					            '</div>'+
					            '<div class="myAlbumBtn">'+
				                    '<span class="button button-main"><span>' +
				                    	'<button type="button">'+ this._opts.button +'</button>' +
				                    '</span></span> '+
					                '<a href="javascript:void(0)" class="j-cancelLink">取消</a> ' +
					            '</div>'+
					        '</div>';
					        
				$(element).html(str);
			},
			
			/**
			 * 初始化需要使用的标签对象
			 */
			_initElements: function(parent){
				parent = $(parent);
				this._els = {
					parent: parent,
					selector: parent.down('div.updatePhoto'),
					tabs: parent.down('li'),
					contents: parent.down('div.j-selectView'),
					uploadForm: parent.down('form'),
					linkUrl: parent.down('input.j-linkUrl'),
					selectBtn: parent.down('button'),
					cancelLink: parent.down('a.j-cancelLink')
				};
			},
			
			/**
			 * 绑定相应的事件
			 */
			_initEvents: function(){
				this._els.selectBtn.on('click',this._saveImages.bind(this));
				this._els.cancelLink.on('click',this._opts.cancelCallback.bind(this));
			},
			
			/**
			 * 初始化控件
			 */
			_initCtrl: function(){
				new kola.ctrl.PageTab(this._els.tabs, {
					pages: this._els.contents,
					callback: this._tabSwitchCallback.bind(this)
				});
				sohu.ctrl.UpLoad.FaceUp(this._els.uploadForm,
					'sohu.ctrl.MultiPhotoSelector.instances[\''+this._instanceName+'\']._saveUploadImg'
				);
			},
			
			/**
			 * tab切换后的回调处理方法，根据不同的方式进行对应的处理
			 */
			_tabSwitchCallback: function(tab){
				// 如果切换到从相册选择图片方式，才加载相册选择类，并初始化
				if(tab.attr('key') == sohu.ctrl.MultiPhotoSelector.TYPE.album){
					var _this = this;
					$call(function(){
						_this._photoSelector = new sohu.album.PhotoSelector({
							u: sohu.user.id,
							element: _this._els.contents.get(2),
							type: 2
						});
					},'sohu.album.PhotoSelector');
				}
			},
			
			/**
			 * 设置当前选择的tab键值
			 */
			_getSelectType: function(){
				return this._els.selector.down('li.on').attr('key');
			},
			
			/**
			 * 上传头像
			 */
			_uploadImage: function(){
				this._els.uploadForm.elements()[0].submit();
			},
			
			/**
			 * 保存上传的图片
			 */
			_saveUploadImg: function(rsp){
				if(rsp.status == 1){
					this._images.push(rsp.data.large);
					this._selectImages();
				}
				else{
					alert('上传头像错误：' + rsp.statusText);
				}
			},
			
			/**
			 * 保存网络地址图片
			 */
			_saveLinkImg: function(){
				this._images.push(this._els.linkUrl.val());
			},
			
			
			/**
			 * 保存相册选择的图片
			 */
			_saveAlbumImg: function(){
				var imgs = this._photoSelector.get(true);
				for(var i = 0 ;i< imgs.length; i++){
					this._images.push(imgs[i].url);
				}
			},
			
			/**
			 * 根据不同的方式获取所选择的图片
			 */
			_saveImages: function(){
				var type = this._getSelectType();
				this._images =[]; // 清空之前的选择的图片
				if(type == sohu.ctrl.MultiPhotoSelector.TYPE.upload){
					this._uploadImage();
				} else {
					if(type == sohu.ctrl.MultiPhotoSelector.TYPE.link){
						this._saveLinkImg();
					} else if(type == sohu.ctrl.MultiPhotoSelector.TYPE.album){
						this._saveAlbumImg();
					}
					this._selectImages();
				}
			},
			
			/**
			 * 确定选择图片
			 */
			_selectImages: function(){
				this._opts.selectCallback(this._images);
				this.hide();
			}
			
		});
		
		/**
		 * 图片选择方式
		 */
		sohu.ctrl.MultiPhotoSelector.TYPE = {
			upload: 'Upload',	// 本地上传
			link: 'Link',		// 网络图片
			album: 'Album'		// 相册选择
		};
		
		// 该选择器的当前实例，主要是上传需要回调该实例的方法
		sohu.ctrl.MultiPhotoSelector.instances = {};
		
	},'kola.ctrl.PageTab,sohu.ctrl.UpLoad')