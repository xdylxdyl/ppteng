/**
 * @fileoverview Flash图片上传JS控制组件
 * @author Neo
 * @versio v0.1
 * @base swfUpload.js kola
 **/
$register(
	'sohu.album.swfUpload',	
	function(){	
		sohu.album.swfUpload = {};
		sohu.album.swfUpload.PhotoUploader = Class.create({
			/**
			 * 
			 */		 
			 initialize:function(initObj,callBack){
			 	//接口页面无onload事件直接检测是否加载到SWFUpload			 	
			 	this.interval=window.setInterval(this.checkInit.bind(this,initObj,callBack),10);
			 	
			 },
			 
			 checkInit:function(initObj,callBack){
			 	//alert('check');			 	
			 	if (SWFUpload != undefined) {
			 		this.interval=window.clearInterval(this.interval);
			 		this.initUploader(initObj,callBack);
				}
			 },
			 
			 /**
			 * 初始化图片上传组件
			 */
			 initUploader:function(initObj,callBack){
			 	
			 	this.stopped=true;
			 	//文件队列的总量
			 	this.totalFiles = 0;
			 	//队列中文件总字节数
			 	this.totalSize = 0;
			 	//已上传的个数
			 	this.uploaded = 0;
			 	//超过单个文件大小的总数
			 	this.overSizeLimit = 0;
			 	//超过文件总数的个数
			 	this.overTotalLimit = 0;
			 	//自定义设置对象
			 	this.settings = initObj;
			 	//上传完成后的回调方法
			 	this.callBack = callBack;
			 	
			 	//每个li的高度
			 	this.liHeight = 0;
			 	
			 	//整个列表容器高度
			 	this.containerHeight = 0;
			 	
			 	//滚动到的索引
			 	this.scrollIndex = 0;
			 	
			 	this.tryFlag = 15;
			 	
			 	this.returDataAry = [];
			 	
			 	this.totalLimit = this.settings.file_upload_limit;
			 	
			 	this.container=this.settings.custom_settings.progressTarget;
			 	
			 	//	取得基本变量
			 	this.settings.swfupload_loaded_handler = this.swfuploaded.bind(this);
			 	this.settings.file_dialog_complete_handler = this.fileDialogComplete.bind(this);
			 	this.settings.file_queued_handler = this.fileQueued.bind(this);
				this.settings.file_queue_error_handler = this.fileQueueError.bind(this);
				this.settings.upload_start_handler = this.uploadStart.bind(this);
				this.settings.upload_progress_handler = this.uploadProgress.bind(this);
				this.settings.upload_error_handler = this.uploadError.bind(this);
				this.settings.upload_complete_handler = this.uploadComplete.bind(this);
				this.settings.queue_complete_handler = this.queueComplete.bind(this);
				this.settings.upload_success_handler = this.uploadSuccess.bind(this);
				
				this.swfu = new SWFUpload(this.settings);
				//初始化一些显示容器
				//错误提示容器
				if($('#'+this.settings.custom_settings.errorTipContainer)){
					this.errorTips = this.settings.custom_settings.errorTipContainer;
				}else{
					this.errorTips = null;
				}
				
				//初始化功能按钮监听
				//上传按钮
				this.starUploadButton=$('#'+this.settings.custom_settings.uploadButtonId);
				this.starUploadButton.on('click', this.startUpload.bind(this));
				
				//清空按钮
				this.cancleQueueButton=$('#'+this.settings.custom_settings.cancelQueueId);
				this.cancleQueueButton.on('click', this.deletAllFileInQueue.bind(this));
				
				
				//显示选择文件视图
				this._selectView(true);				
			 },
			 
			 /**
			  * 
			  */
			 swfuploaded:function(){
			 	if($('#'+this.settings.custom_settings.loadingContainer)){
			 		$('#'+this.settings.custom_settings.loadingContainer).hide();
			 	}
			 },
			 
			 /**
			  * 选择文件视图
			  */
			 _selectView:function(isInit){
			 	//alert('_selectView');
			 	
			 	this.stopped=true;
			 	//将越界文件归零
			 	this.overSizeLimit = 0;
			 	this.overTotalLimit = 0;
			 	
			 	//置空服务器返回数组
			 	this.returDataAry=[];
			 	$('#'+this.settings.custom_settings.uploadWrapper).hide();
			 	
			 	this._clearErrorTips();
			 	
			 	if(!isInit){
			 		try{
				 		var img = this.settings.custom_settings.button_image_url;
					 	var width = parseInt(this.settings.custom_settings.button_width);
					 	var height = parseInt(this.settings.custom_settings.button_height);
					 	
					 	this.swfu.setButtonText('<span class="redText"></span>');
						this.swfu.setButtonDimensions(width,height);
						this.swfu.setButtonImageURL(img);
			 		}catch(ex){
			 			//alert(ex);
			 			this.swfu.debug('error:'+ex);
			 			this.swfu.debug(ex);
			 		}
			 	}
			 	
			 	this.starUploadButton.prop('disabled',false);
				this.starUploadButton.text('上传照片');
			 	
			 	if($('#'+this.settings.custom_settings.stepContainer)){
			 		$('#'+this.settings.custom_settings.stepContainer).html('第二步');
			 	}
			 	
			 	if($('#selectTip')){
			 		$('#selectTip').show();
			 	}
			 },
			 
			 /**
			  * 显示文件视图
			  */
			 _filesView:function(){
			 	
			 	if($('#selectTip')){
			 		$('#selectTip').hide();
			 	}
			 	
			 	$('#'+this.settings.custom_settings.uploadWrapper).show();
			 	
			 	if($('#fileContainer')){
			 		this.containerHeight = $('#fileContainer').height();
			 	}
			 	
			 	this.swfu.setButtonText('<span class="redText">继续添加照片»</span>');
			 	this.swfu.setButtonTextStyle('.redText { color: #983402; }');
				this.swfu.setButtonDimensions(85,26);
				this.swfu.setButtonImageURL('about:blank');
				if($('#'+this.settings.custom_settings.stepContainer)){
			 		$('#'+this.settings.custom_settings.stepContainer).html('第三步');
			 	}
			 	
			 	this._toggleVisible($('#'+this.settings.custom_settings.pauseButtonId),false);
			 	this._toggleVisible($('#'+this.settings.custom_settings.cancelButtonId),true);
			 	
			 	if($('#'+this.settings.custom_settings.cancelButtonId)){
			 		$('#'+this.settings.custom_settings.cancelButtonId).on('click', this.deletAllFileInQueue.bind(this));
			 	}
			 	
			 	if($('#'+this.settings.custom_settings.pauseButtonId)){
			 		$('#'+this.settings.custom_settings.pauseButtonId).on('click', this.pauseUpload.bind(this));
			 	}
			 	
			 	if(this.totalFiles === 0){
			 		//alert('no files');
			 		this.starUploadButton.prop('disabled',true);
					this.starUploadButton.text('请先选择照片');
			 	}else{
			 		//alert('got files');
			 		this.starUploadButton.prop('disabled',false);
					this.starUploadButton.text('上传照片');
			 	}
			 	
			 },
			 
			 /**
			  * 浏览文件对话框完成的处理
			  */
			 fileDialogComplete:function(selected,queued,totalQueued){
			 	//alert('selected:'+selected+'qued:'+queued+'totalQueued:'+totalQueued);
			 	if(totalQueued === 0&&selected === 0){
			 		//显示选择文件视图
			 		this._selectView();
			 	}else{
			 		//显示文件信息视图
			 		this._filesView();
			 	}
			 },
			 
			 /**
			  * 文件进入队列的处理
			  */
			 fileQueued:function(file){			 	
			 	//总文件数增加
			 	//alert(file.filestatus);
			 	this.totalFiles++;
			 	this.totalSize+=file.size;
			 	var fileItem=new sohu.album.swfUpload.FileStatus(file,this.container);
			 	//添加删除按钮的响应事件
			 	fileItem.addDeletListener(this,true);
			 	
			 	this._displayTotal();
			 },	
			 
			 /**
			  * 开始上传事件监听的响应
			  */
			 startUpload:function(){
			 	//增加停止队列标识 
			 	this.swfu.pauseQueue = false;
			 	this.uploadStart();
			 	this.starUploadButton.prop('disabled',true);
				this.starUploadButton.text('上传中...');

			 },
			 
			 /**
			  * 开始上传
			  */
			 uploadStart:function(){
			 	
			 	this.swfu.startUpload();
			 	this.stopped=false;
			 	this._toggleAllDelet(false);
			 	//显示暂停隐藏取消
			 	this._toggleVisible($('#'+this.settings.custom_settings.pauseButtonId),true);
			 	this._toggleVisible($('#'+this.settings.custom_settings.cancelButtonId),false);
			 },
			 
			 /**
			  * 暂停上传
			  */
			 pauseUpload:function(){
			 	//alert('pause upload');
			 	this.stopped=true;
			 	//增加停止队列标识 
			 	this.swfu.pauseQueue = true;
			 	this.swfu.stopUpload();
			 	//显示取消隐藏暂停
			 	this._toggleVisible($('#'+this.settings.custom_settings.pauseButtonId),false);
			 	this._toggleVisible($('#'+this.settings.custom_settings.cancelButtonId),true);
			 	this.starUploadButton.prop('disabled',false);
				this.starUploadButton.text('继续上传');
			 },
			 
			 /**
			  * 取消上传
			  */
			 cancleUpload:function(){
			 	this.queueComplete();
			 },
			 
			 /**
			  * 显示隐藏对象
			  */
			 _toggleVisible:function(target,visible){
			 	if(target){
			 		visible?target.show('inline'):target.hide();
			 	}
			 },
			 
			 /**
			  * 显示总文件信息
			  */
			 _displayTotal:function(){
			 	
			 	if(this.totalFiles == 0){
			 		//alert('display total to set select view');
			 		if($('#'+this.container+'>li')){
				 		$('#'+this.container+'>li').remove();
				 	}
				 	this._selectView();
			 	}
			 	//总文件数增加
			 	$('#'+this.settings.custom_settings.totalFileContainer).html('共'+this.totalFiles+'张照片');
			 	$('#'+this.settings.custom_settings.totalSizeContainer).html('总计:'+kola.tool.Formatter.formatByte(this.totalSize));
			 	
			 },
			 
			 /**
			  * 控制错误提示Tips
			  */
			 _displayErrorTips:function(){
			 	
			 	if(this.errorTips){
			 		$('#'+this.errorTips).show();
			 		
			 		//单个文件超限的检测并显示
			 		if(this.overSizeLimit >= 1){
			 			//有大文件
			 			var overSizeMsg='其中<strong>'+this.overSizeLimit+'</strong>张照片大小超过<strong>'+this.settings.file_size_limit+'</strong>的限制，将不会被上传。';	
			 			$('#'+this.errorTips+'>ul>#overSize').show('').html(overSizeMsg);
			 		}else{
			 			//无大文件
			 			//alert('no overSize');
			 			$('#'+this.errorTips+'>ul>#overSize').hide();
			 		}
			 		
			 		//总数超限的检测并显示
			 		if(this.overTotalLimit >= 1){
			 			//有大文件
			 			var overTotalMsg='您选择的文件超过本次上传的最大文件数<strong>'+this.totalLimit+'</strong>，最后<strong>'+this.overTotalLimit+'</strong>张照片将不会被上传。';	
			 			$('#'+this.errorTips+'>ul>#overTotal').show('').html(overTotalMsg);
			 		}else{
			 			//无大文件
			 			//alert('no overSize');
			 			$('#'+this.errorTips+'>ul>#overTotal').hide();
			 		}
			 		
			 		
			 		
			 		//无错误文件显示隐藏提示
			 		if(this.overTotalLimit === 0 && this.overSizeLimit === 0){
			 			this._clearErrorTips();
			 		}
			 	}
			 },
			 
			  /**
			  * 清空错误提示Tips
			  */
			 _clearErrorTips:function(){

			 	if(this.errorTips){
			 		//alert('remove all error li');
			 		$('#'+this.errorTips+'>ul>li').hide();
				 	$('#'+this.errorTips).hide();
			 	}
			 },
			 
			 /**
			  * 文件进度
			  */
			 uploadProgress:function(file, bytesLoaded, bytesTotal){
			 	var target=this.settings.custom_settings.progressTarget;
			 	//alert('target');
			 	try {
					var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
			
					var progress = new sohu.album.swfUpload.FileStatus(file,target );
					progress.setProgress(percent);
					//progress.setStatus("Uploading...");
				} catch (ex) {
					//alert('进度错误：'+ex);
				}
			 },
			 
			 /**
			  * 删除队列中的单个文件
			  */
			 deletFileInQueue:function(file,normalDelet){
			 	//alert('fileSize:'+file.size);
			 	if(normalDelet){
			 		//alert('deletNormal');
			 		this.totalSize-=file.size;
			 		this.totalFiles--;
			 		this.swfu.cancelUpload(file.id);
			 	}else{
			 		
			 		switch (file.errorMsg) {
			 		
			 		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			 			this.overTotalLimit--;
			 			break;
			 			
					case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
						this.overSizeLimit--;
						break;
						
					case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
						break;
					case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
						break;
					default:
						if (file !== null) {
							//progress.setStatus("Unhandled Error");
						}
						break;
					}
					
					this._displayErrorTips();
			 		
			 	}			 	
			 	this._displayTotal();
			 	
			 },
			 
			 /**
			  * 删除所有文件
			  */
			 deletAllFileInQueue:function(){
			 	this.swfu.cancelQueue();
			 	//alert();
			 	this.totalSize=0;
			 	this.totalFiles=0;
			 	this._displayTotal();
			 	if($('#'+this.container+'>li')){
			 		$('#'+this.container+'>li').remove();
			 	}
			 },
			 
			 /**
			  * 隐藏或显示所有删除按钮
			  */
			 _toggleAllDelet:function(show){
			 	this._toggleVisible($('.j-delet'),show);
			 },
			 
			 /**
			  * 文件队列错误处理
			  */
			 fileQueueError:function(file, errorCode, message){
			 	//alert('errorCode:'+errorCode+'error:'+SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED);
			 	try {					
					var target=this.settings.custom_settings.progressTarget;
					
					var progress = new sohu.album.swfUpload.FileStatus(file,this.container);
					progress.setError();
					progress.setErrorMsg(errorCode);
					//progress.deletFile(true,this.swfu);
					progress.addDeletListener(this,false);
					
					//总数超限
					if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
						this.overTotalLimit++;
						//alert("You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
						//return;
					}
			
					switch (errorCode) {
						//单个文件大小超限
					case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
						//progress.setStatus("File is too big.");
						this.swfu.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
						//fileItem.addDeletListener(this,this.fileId,false);
						this.overSizeLimit++;
						break;
					case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
						//progress.setStatus("Cannot upload Zero Byte files.");
						this.swfu.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
						break;
					case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
						//progress.setStatus("Invalid File Type.");
						this.swfu.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
						break;
					default:
						if (file !== null) {
							//progress.setStatus("Unhandled Error");
						}
						this.swfu.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
						break;
					}
					
					this._displayErrorTips();
					
				} catch (ex) {
					//alert(ex);
			        this.swfu.debug(ex);
			    }
			 },
			 
			 /**
			  * 文件上传错误的处理方法
			  */
			 uploadError:function(file, errorCode, message){
			 	try {
					var target=this.settings.custom_settings.progressTarget;
					
					var progress = new sohu.album.swfUpload.FileStatus(file, target);
					
					progress.setError();
			
					switch (errorCode) {
						case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
							progress.setStatus("存储失败: " + message);
							this.swfu.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
							break;
						case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
							progress.setStatus("存储失败");
							this.swfu.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
							break;
						case SWFUpload.UPLOAD_ERROR.IO_ERROR:
							progress.setStatus("服务器IO错误");
							this.swfu.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
							break;
						case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
							progress.setStatus("安全验证失败，上传取消");
							this.swfu.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
							break;
						case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
							progress.setStatus("已达上传上限");
							this.swfu.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
							break;
						case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
							progress.setStatus("验证失败，上传取消");
							this.swfu.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
							break;
						case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
							progress.setStatus("已取消");
							progress.setCancelled();
							//progress.removeSelf();
							break;
						case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
							//progress.setStatus("Stopped");
							progress.setStopped();
						
							break;
						default:
							progress.setStatus("存储错误: " + errorCode);
							this.swfu.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
							break;
					}
				} catch (ex) {
			        this.swfu.debug(ex);
			    }
			 },
			 
			  /**
			  * 文件上传成功
			  */
			 uploadComplete:function(file){
			 	this.uploaded = this.totalFiles-this.swfu.getStats().files_queued;
			 	var target=this.settings.custom_settings.progressTarget;
			 	var progress = new sohu.album.swfUpload.FileStatus(file,target );
			 	//alert("完成第："+this.uploaded+":"+file);
			 	
			 	if(this.liHeight == 0){
			 		this.liHeight = progress.fileItem.box().height;
			 	}
			 	
			 	this._setScroll();
			 	//alert(this.liHeight);
			 	
			 	//this._getScrollIndex(this.uploaded)
			 	
			 	/*if(this.swfu.getStats() === 0){
			 		//队列中文件已经上传完毕
			 	}else{
			 		//队列未上传完毕
			 		//alert('catch complete');
			 		if(!this.stopped){
			 			//this.uploadStart();
			 		}
			 	}*/
			 },
			 
			 /**
			  * 服务器存储成功
			  */
			 uploadSuccess:function(file,msg){
			 	//alert('sever save success');
			 	var target=this.settings.custom_settings.progressTarget;
			 	var progress = new sohu.album.swfUpload.FileStatus(file,target );
			 	progress.setComplete();
			 	this.returDataAry.push(msg);
			 	
			 	//this.swfu.debug('length:'+this.returDataAry.length);
			 },
			 
			  /**
			  * 文件队列上传成功
			  */
			 queueComplete:function(){
			 	//alert('the queue has been uploaded completly');
			 	this._clearErrorTips();
			 	this.callBack(this.returDataAry);
			 },
			 
			  /**
			  * 获得需要向上滚动的索引
			  */
			 _getScrollIndex:function(fIndex){
			 	var height=this.liHeight*fIndex;
				var index=Math.ceil((this.liHeight*fIndex)/this.containerHeight)-1;
				//alert("contentHeight:"+this.containerHeight);
				return index;
			 },
			 
			  /**
			  * 控制滚动
			  */
			 _setScroll:function(){
			 	var index=this._getScrollIndex(this.uploaded+1);
			 	
			 	if(index > this.scrollIndex){
			 		var divScrollTo=this.containerHeight*index;
					//$('#fileContainer').prop("scrollTop",divScrollTo);
					var moveTarget = $('#fileContainer');
					//alert(moveTarget.prop("scrollHeight"));
					if(this.moveInterval == null){
						this.moveInterval=window.setInterval(this._moveContent.bind(this,moveTarget,divScrollTo),10);
						this.tryFlag = 15;
					}
					this.scrollIndex = index;
			 	}else{
			 		//alert("not yet")
			 	}
				
			 },
			 
			 /**
			  * 移动内容
			  */
			 _moveContent:function(moveTarget,toTarget){
			 	
			 	this.tryFlag--;
			 	
			 	var oriScoll = moveTarget.prop("scrollTop");
			 	
			 	var toScoll =oriScoll+(toTarget-oriScoll)/3;
			 	
			 	//alert('oriScoll:'+oriScoll+"toScoll"+toScoll+"target:"+toTarget);
			 	
			 	//alert("after move:"+moveTarget.prop("scrollTop"));
			 	if(oriScoll>=toTarget-3||this.tryFlag<=0){
			 		oriScoll=toTarget
			 		this.moveInterval=window.clearInterval(this.moveInterval);
			 		this.moveInterval=null;
			 		//alert("arrived");
			 	}
			 	
			 	moveTarget.prop("scrollTop",toScoll);
			 	
			 	
			 }
					 
		});
		/**
		 *  创建一个新的PhotoUploader 对象并返回该对象实例
		 */
		sohu.album.swfUpload.PhotoUploader.init = function(uploadUrl,alumbId,from,callBack,sizeLimit,totalLimit,customSettings){
			//alert('init');
			this.uploadUrl = uploadUrl;
			this.alumbId = alumbId;
			this.from = from;
			this.desc = "not yet";
			
			try{
				if(Me.pp()){
					this.passport=Me.pp();
				}else{
					this.passport="null";
				}
			}catch(e){
				this.passport="neoy.cn@gmail.com";
			}
			
			if(sizeLimit){
				this.sizeLimit=sizeLimit;
			}else{
				this.sizeLimit="5 MB";
			}
			
			if(totalLimit&&totalLimit>=1){
				if(totalLimit>60){
					this.totalLimit=60;
				}else{
					this.totalLimit=totalLimit;
				}
			}else{
				this.totalLimit=60;
			}
				
			this.settings = Object.extend( {
				flash_url : "../../r/f/album/upload/SWFUpload.swf",
				upload_url: this.uploadUrl,	// Relative to the SWF file
				post_params: {"alumbId" : this.alumbId , "cookie" : this.passport , "from" : this.from , "desc" : this.desc},
				file_size_limit : this.sizeLimit,
				file_types : "*.jpg;*.jpeg;*.gif;*.png;*.tif;*.tiff",
				file_types_description : "图片文件",
				file_upload_limit : this.totalLimit,
				file_queue_limit : 0,
				liHeight : 31,
				custom_settings : {
					//基本容器定义
					//整个上传应用的容器
					uploadWrapper : "uploadArea",
					//文件信息进度显示列表容器
					progressTarget : "fileWrapper",
					//上传按钮Id
					uploadButtonId : "uploadButton", 
					//暂停按钮Id
					pauseButtonId : "pauseButton", 
					//取消按钮Id
					cancelButtonId : "cancelButton",
					//清空按钮Id
					cancelQueueId : "cancelAll",
					//显示总文件个数容器
					totalFileContainer : "totalFile",
					//显示总文件大小容器
					totalSizeContainer : "totalSize",
					//显示步骤容器
					stepContainer : "stepContainer",
					//显示tip容器
					errorTipContainer : "errorTips",
					//加载进度容器
					loadingContainer : "loadingContainer",
					
					
					//custom button
					//按钮背景文件
					button_image_url : "../../r/f/album/upload/uploadBtnBig.png",
					//按钮宽度
					button_width: "100",
					//按钮高度
					button_height: "32"
				},
				debug: true,

				//Default button settings
				button_image_url: "../../r/f/album/upload/uploadBtnBig.png",	// Relative to the Flash file
				button_width: "100",
				button_height: "32",
				button_text_style : ".redText { color: #983402; }", 
				button_disabled : false, 
				button_cursor : SWFUpload.CURSOR.HAND,
				button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT, 
				button_placeholder_id: "flashButtonHolder",

				button_text_style: ".theFont { font-size: 16; }",
				button_text_left_padding: 0,
				button_text_top_padding: 0

			},customSettings||{});
			
			return new sohu.album.swfUpload.PhotoUploader(this.settings,callBack);
			
		};
		
		/**
		 *  文件状态显示对象类
		 */
		sohu.album.swfUpload.FileStatus = Class.create({
			/**
			 * 
			 */		 
			 initialize:function(file,targetId){			 	
				this.init(file,targetId);
			 },
			 
			 /**
			 * 初始化文件状态
			 */
			 init:function(file,targetId){
			 	this.file = file;
			 	this.size = this.file.size;
			 	this.fileProgressID = this.file.id;
			 	this.fileWrapper = $('#'+targetId);
				//this.opacity = 100;
				//this.height = 0;		
				
				this.fileProgressWrapper = $('#'+this.fileProgressID)?true:false;
				
				if(!this.fileProgressWrapper){
					//未找到该id对应的容器
					//alert('not exist');
					this.fileItem = kola.Element.create('li',{'id':this.fileProgressID});
					
					this.fileName = kola.Element.create('span',{'class':'name'});
					this.fileName.html('');
					
					this.fileSize = kola.Element.create('span',{'class':'size'});
					this.fileSize.html('');
					
					this.fileOp = kola.Element.create('span',{'class':'del'});
					this.fileOp.html('');
					
					this.deletBtn = kola.Element.create('a',{'class':'j-delet icon img-del','href':'javascript:void(0);'});
					this.deletBtn.html('x');
					this.fileOp.append(this.deletBtn);
					
					
					this.fileItem.append(this.fileName);
					this.fileItem.append(this.fileSize);
					this.fileItem.append(this.fileOp);
					
					this.fileWrapper.append(this.fileItem);
					
					this._reset();
					
					return this;
				}else{
					//该id对应的容器已存在
					//alert('already exist')
					this.fileItem=$('#'+this.fileProgressID);
					//this.fileName=this.fileItem.first('span');
					this.fileName=this.fileItem.children().get(0);
					this.fileSize=this.fileItem.children().get(1);
					this.fileOp=this.fileItem.children().get(2);
					return this;
				}
			 },
			 
			 /**
			  * 设置错误信息
			  */			 
			 setErrorMsg:function(msg){
			 	this.file.errorMsg=msg;
			 },
			 
			 /**
			  * 重设显示状态
			  */
			 _reset:function(){
			 	this.fileName.html(this.file.name);
			 	this.fileSize.html(kola.tool.Formatter.formatByte(this.file.size));
			 	this.setProgress(0);
			 },
			 
			 /**
			  * 显示上传进度
			  */
			 setProgress:function(progress){
			 	//alert('percent:'+progress)
			 	//alert(this.fileItem);
			 	var percent=-progress+'%';
			 	this.fileItem.css('backgroundPosition',percent+' 0');
			 },
			 
			 /**
			  * 显示停止
			  */
			 
			 setStopped:function(){
			 	this.fileItem.removeClass('error');
			 },
			 
			 /**
			  * 显示完成状态
			  */
			 setComplete:function(){
			 	this.fileItem.prop('className','finished');
			 	this.setProgress(0);
			 	this.fileOp.html('完成');
			 },
			 
			 /**
			  * 显示错误状态
			  */
			 setError:function(){
			 	this.fileItem.prop('className','error');
			 },
			 
			 /**
			  * 显示取消状态
			  */
			 setCancelled:function(){
			 	//alert('cancled');
			 	this.removeSelf();
			 },
			 
			 /**
			  * 显示自定义状态
			  */
			 setStatus:function(status){
			 	//alert('status')
			 	this.fileName.html(status);
			 },
			 
			 /**
			  * 添加删除事件
			  */
			 addDeletListener:function(target,normalDelet){			 	
			 	this.deletBtn.on('click', this._deleteHandler.bind(this,target,this.file,normalDelet));
			 },
			 
			 /**
			  * 删除正常文件处理方法
			  */
			 _deleteHandler:function(target,file,normalDelet){
			 	if(!normalDelet){
			 		this.removeSelf();
			 	}
			 	target.deletFileInQueue(file,normalDelet);
			 },
			 
			 /**
			  * 删除错误文件处理方法
			  */
			 /*_deleteErroHandler:function(target){
			 	this.removeSelf();
			 	//检测是否需要回到初始选择文件状态
			 	target._displayTotal();
			 },*/
			 
			 /**
			  * 删除自身节点
			  */
			 removeSelf:function(){
			 	//alert('fadeSelf');
			 	//kola.anim.FadeOut(this.fileItem,0);
			 	this.fileItem.remove();
			 }
					 
		});
	},'kola.tool.Formatter'
);