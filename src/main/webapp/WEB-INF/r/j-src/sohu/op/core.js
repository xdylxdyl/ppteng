

$register('sohu.op.*', function() {
	
	var PACK = sohu.op;

	/********************************************* SettingWgt *********************************************/
	PACK.SettingWgt = {
		
		init: function(ctrEl, appSel) {
			this.ctrEl = $(ctrEl); 
			this.appSel = appSel;
			
			//	TODO: 需要增加拖拽排序的功能，下面的代码临时去掉
			/*
			new kola.anim.Order({
				element: this.appSel,
				onStop: this._newOrder.bind(this)
			});
			*/
		},
		
		_newOrder: function() {
			/*
			var orders = [];
			$(this.appSel).each(function(app) {
				orders.push(app.data('id'));
			});
			sohu.appSettingMdl.setOrder({
				orderlist: orders.join(',')
			}, {
				success: function(data) {},
				failure: function(error) {}
			});
			*/
		},
		
		//	显示设置的方法
		showConfig: function(id) {
			
			//	加载对话框
			var dialog = new sohu.ctrl.Dialog({
				title: '设置',
				content: '加载中...',
				mask: true,
				buttons: [
					{
						html: '关闭',
						close: true
					}
				]
			});
			dialog.show();
			
			//	获取设置内容
			sohu.appSettingMdl.getConfig({
				id: id
			}, {
				success: function(data) {
					dialog.setContent(data.content);
					new kola.ctrl.PageTab($('#opTab>li', dialog.body), {
						pages: $('.body>div', dialog.body)
					});
					dialog.setButton([
						{
							html: '保存',
							func: sohu.op.SettingWgt._saveConfig.bind(sohu.op.SettingWgt, id, dialog)
						},
						{
							html: '取消',
							close: true
						}
					]);
				},
				failure: function(error) {
					
				}
			});
		},
		_saveConfig: function(id, dialog) {
			var data = kola.dom.Form.objFields(dialog.body);
			data.id = id;
			dialog.setContent('正在保存');
			dialog.setButton();
			sohu.appSettingMdl.setConfig(data, {
				success: function(data) {
					dialog.close();
				},
				failure: function(error) {
					dialog.setContent(error.statusText);
				}
			});
		},
		
		//	卸载方法
		uninstallAndDel: function(id, el) {
			sohu.ctrl.Dialog.confirm('确定要卸载吗？', {
				yes: function() {
					$(el).hide();
					sohu.appSettingMdl.uninstall({
						id: id
					}, {
						success: function(data) {
							sohu.AppBarWgt.refresh(true);
							$(el).remove();
						},
						failure: function(error) {
							sohu.ctrl.Dialog.alert('删除失败', error.statusText);
							$(el).show();
						}
					});
				}
			});
		},
		uninstallAndRefresh: function(id) {
			sohu.ctrl.Dialog.confirm('确定要卸载吗？', {
				yes: function() {
					sohu.appSettingMdl.uninstall({
						id: id
					}, {
						success: function(data) {
							location.reload();
						},
						failure: function(error) {
							sohu.ctrl.Dialog.alert('删除失败', error.statusText);
						}
					});
				}
			});
		}
	}
	
}, 'sohu.core.*, sohu.ctrl.Dialog, kola.dom.Form, kola.ctrl.PageTab');