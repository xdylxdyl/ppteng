 
/**
 * @fileoverview  投票JS包
 * @author  jady@live.com
 * @version  0.1
 */

$register('sohu.vote.*',function(){
	
	var PACK = sohu.vote;

	/********************************************* mdl *********************************************/
	
	var mdl = new sohu.core.Model({
		
		actions: {
			take: {
				url:		'/a/app/vote/take.do',
				params:		['id', 'answer', 'creatorid'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			addOption: {
				url:		'/a/app/vote/addoption.do',
				encode:		'uri',
				params:		['id', 'option'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			updateItemDesc: {
				url:		'/a/app/vote/updateitemdesc.do',
				encode:		'uri',
				params:		['id', 'itemdesc'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			updateDeadline: {
				url:		'/a/app/vote/updatedeadline.do',
				params:		['id', 'year', 'month', 'date', 'hour', 'minute'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			stop: {
				url:		'/a/app/vote/stop.do',
				params:		['id'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			del: {
				url:		'/a/app/vote/del.do',
				params:		['id'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			add: {
				url:		'/a/app/vote/add.do',
				encode:		'uri',
				method: 	'post',
				format: 	'json',
				type:		'blank'
			}
		},
		url:				''
	});

	/********************************************* VoteForm *********************************************/
	
	PACK.VoteForm = {
		init: function(options) {
			this._options = Object.extend({
				max:			1,
				id:				1,
				
				formEl:			'#formEl',
				submitEl:		'#submitEl',
				optionCtrEl:	'#optionCtrEl',
				addOptionEl:	'#addOptionEl',
				editOptionDescEl:'#editOptionDescEl',
				optionDescEl:	'#optionDescEl',
				editDeadlineEl:	'#editDeadlineEl',
				stopEl:			'#stopEl',
				delEl:			'#delEl'
			}, options || {});
			
			this._els = {};
			
			//	如果没有提交按钮，那就不再进行后面的初始化
			if (!this._el('submitEl')) return;
			
			//	根据可选数量绑定相应的按钮
			if (this._options.max > 1) {
				this._el('optionCtrEl').down('input').on('change', this._e_optionChange.bindEvent(this));
			}
			
			//	绑定事件
			this._canEdit = !!this._el('addOptionEl');
			if (this._canEdit) {
				this._el('addOptionEl').on('click', this._e_addOption.bindEvent(this));
				this._el('editOptionDescEl').on('click', this._e_editOptionDesc.bindEvent(this));
				this._el('editDeadlineEl').on('click', this._e_editDeadline.bindEvent(this));
				this._el('stopEl').on('click', this._e_stop.bindEvent(this));
				this._el('delEl').on('click', this._e_del.bindEvent(this));
			}
			
			//	绑定提交事件
			this._el('submitEl').on('click', this._e_submit.bindEvent(this));
		},
		
		_e_editDeadline: function(e) {
			this._dialog = new sohu.ctrl.Dialog({
				title: '修改截止时间',
				content: '<div class="voteDialog voteDialog-editTime">截止时间：<br /><select class="select year" name="year"><option selected="selected">请选择年</option></select>年<select class="select month" name="month"><option selected="selected">请选择月</option></select>月<select class="select day" name="date"><option selected="selected">请选择日</option></select>日<br /><select class="select hour" name="hour"></select>时<select class="select minute" name="minute"></select>分</div>',
				mask: true,
				buttons: [
					{
						html: '确定',
						func: this._sureEditDeadline.bind(this)
					},
					{
						html: '取消',
						close: true
					}
				]
			});
			//	初始化日期
			var el = this._el('editDeadlineEl'),
				year = parseInt(el.data('year') || 0),
				month = parseInt(el.data('month') || 0),
				date = parseInt(el.data('date') || 0),
				hour = parseInt(el.data('hour') || 0),
				minute = parseInt(el.data('minute') || 0),
				yearNow = (new Date()).getFullYear();
			var dates = this._dialog.body.down('select');
			kola.ctrl.DateSelector.init({
				ele: dates.get(0),
				opt: {"0": "请选择"},
				from: year == 0 ? yearNow : Math.min(year, yearNow),
				to: year == 0 ? yearNow + 5 : Math.max(year, yearNow + 5),
				val: year
			}, {
				ele: dates.get(1),
				opt: {"0": "请选择"},
				val: month
			}, {
				ele: dates.get(2),
				opt: {"0": "请选择"},
				val: date
			});
			dates.get(3).addRange(0, 23, 1).val(hour);
			dates.get(4).addRange(0, 59, 1).val(minute);
			
			//	显示dialog
			this._dialog.show();
		},
		_sureEditDeadline: function() {
			var data = kola.dom.Form.val(this._dialog.body);
			data.id = this._options.id;
			this._dialog.setButton([
				{
					html: '正在保存'
				}
			]);
			mdl.updateDeadline(data, {
				success: this._succEditDeadline.bind(this),
				failure:this._failEditDeadline.bind(this)
			})
		},
		_succEditDeadline: function(data) {
			this._dialog.close();
			this._dialog = null;
		},
		_failEditDeadline: function(error) {
			this._dialog.setContent(error.statusText);
			this._dialog.setButton([
				{
					html: '关闭',
					close: true
				}
			]);
		},
		
		_e_stop: function(e) {
			this._dialog = new sohu.ctrl.Dialog({
				title: '终止投票',
				content: '<div class="voteDialog voteDialog-stop"><h4>你确定要结束此投票么？</h4><p>结束投票后，您和其他人都将不能再投票</p></div>',
				mask: true,
				buttons: [
					{
						html: '确定',
						func: this._sureStop.bind(this)
					},
					{
						html: '取消',
						close: true
					}
				]
			});
			this._dialog.show();
		},
		_sureStop: function() {
			mdl.stop({
				id:	this._options.id
			}, {
				success: this._succStop.bind(this),
				failure:this._failStop.bind(this)
			})
		},
		_succStop: function(data) {
			sohu.View.switchView(data.toView);
		},
		_failStop: function(error) {
			this._dialog.setContent(error.statusText);
			this._dialog.setButton([
				{
					html: '关闭',
					close: true
				}
			]);
		},
		
		
		_e_del: function(e) {
			this._dialog = new sohu.ctrl.Dialog({
				title: '删除投票',
				content: '<div class="voteDialog voteDialog-stop"><h4>你确定要删除此投票么？</h4></div>',
				mask: true,
				buttons: [
					{
						html: '确定',
						func: this._sureDel.bind(this)
					},
					{
						html: '取消',
						close: true
					}
				]
			});
			this._dialog.show();
		},
		_sureDel: function() {
			mdl.del({
				id:	this._options.id
			}, {
				success: this._succDel.bind(this),
				failure:this._failDel.bind(this)
			})
		},
		_succDel: function(data) {
			sohu.View.switchView(data.toView);
		},
		_failDel: function(error) {
			this._dialog.setContent(error.statusText);
			this._dialog.setButton([
				{
					html: '关闭',
					close: true
				}
			]);
		},
		
		_e_editOptionDesc: function(e) {
			this._dialog = new sohu.ctrl.Dialog({
				title: '修改选项说明',
				content: '<div class="voteDialog voteDialog-editOptionDesc"><label for="optionDesc">选项说明：</label><br /><textarea id="optionDesc" class="text" cols="10" rows="3"></textarea></div>',
				mask: true,
				buttons: [
					{
						html: '确定',
						func: this._sureEditOptionDesc.bind(this)
					},
					{
						html: '取消',
						close: true
					}
				]
			});
			this._dialog.body.down('textarea').val(this._el('optionDescEl').text());
			this._dialog.show();
		},
		_sureEditOptionDesc: function() {
			var value = this._dialog.body.down('textarea').val();
			if (value.length == 0) {
				alert('请填入选项说明');
				return;
			}
			this._dialog.setButton([
				{
					html: '正在保存'
				}
			]);
			mdl.updateItemDesc({
				id:	this._options.id,
				itemdesc:	value
			}, {
				success: this._succEditOptionDesc.bind(this, value),
				failure:this._failEditOptionDesc.bind(this)
			})
		},
		_succEditOptionDesc: function(desc, data) {
			this._editOptionDesc(desc);
			this._dialog.close();
			this._dialog = null;
		},
		_failEditOptionDesc: function(error) {
			this._dialog.setContent(error.statusText);
			this._dialog.setButton([
				{
					html: '关闭',
					close: true
				}
			]);
		},
		_editOptionDesc: function(desc) {
			this._el('optionDescEl').text(desc);
		},
		
		_e_addOption: function(e) {
			this._dialog = new sohu.ctrl.Dialog({
				title: '添加选项',
				content: '<div class="voteDialog voteDialog-addOption">请输入候选项：<br /><input type="text" class="text" /></div>',
				mask: true,
				buttons: [
					{
						html: '确定',
						func: this._sureAddOption.bind(this)
					},
					{
						html: '取消',
						close: true
					}
				]
			});
			this._dialog.show();
		},
		_sureAddOption: function() {
			var value = this._dialog.body.down('input').val();
			if (value.length == 0) {
				alert('请填入选项');
				return;
			}
			this._dialog.setButton([
				{
					html: '正在保存'
				}
			]);
			mdl.addOption({
				id:	this._options.id,
				option:	value
			}, {
				success: this._succAddOption.bind(this),
				failure:this._failAddOption.bind(this)
			})
		},
		_succAddOption: function(data) {
			this._addOption(data.html);
			this._dialog.close();
			this._dialog = null;
		},
		_failAddOption: function(error) {
			this._dialog.setContent(error.statusText);
			this._dialog.setButton([
				{
					html: '关闭',
					close: true
				}
			]);
		},
		_addOption: function(option) {
			this._el('optionCtrEl').append(option).last().down('input').on('change', this._e_optionChange.bindEvent(this));
		},
		
		_e_optionChange: function(e) {
			var count = 0;
			this._el('optionCtrEl').down('input').each(function(el) {
				if (el.prop('checked')) count++;
			});
			if (count > this._options.max) {
				alert('最多只能选择' + this._options.max + '项');
				var el = kola.Event.element(e).upWithMe('input');
				if (el) el.prop('checked', false);
			}
		},
		
		_el: function(id) {
			return this._els[id] || (this._els[id] = $(this._options[id]));
		},
		_els: {},
		
		/**
		 * 提交处理方法
		 */
		_e_submit: function(e) {
			if (this._validateForm()) {
				this._el('submitEl').html('正在投票');
				var data = kola.dom.Form.val(this._el('formEl'));
				data.answer = data.option.join ? data.option.join(',') : data.option;
				mdl.take(data, {
					success: this._succTake.bind(this),
					failure: this._failTake.bind(this)
				});
			}
		},
		_succTake: function(data) {
			sohu.View.switchView(data.toView || '/app/truth/');
		},
		_failTake: function(error) {
			alert('保存失败：\n' + error.statusText);
			this._el('submitEl').html('投票');
		},
		
		/**
		 * 验证窗口
		 */
		_validateForm: function() {
			var count = 0;
			this._el('optionCtrEl').down('input').each(function(el) {
				if (el.prop('checked')) count++;
			});
			if (count == 0) {
				alert('至少需要选择一个选项');
				return false;
			}
			if (count > this._options.max) {
				alert('最多只能选择' + this._options.max + '项');
				return false;
			}
			return true;
		}
	}

	/********************************************* NewVoteForm *********************************************/
	
	PACK.NewVoteForm = {
		
		init: function() {
			//	保存设置
			this._options = {
				titleEl: 		'#titleEl',
				itemDescEl: 	'#itemDescEl',
				max1El: 		'#max1El',
				max2El: 		'#max2El',
				yearEl: 		'#yearEl',
				monthEl: 		'#monthEl',
				dateEl: 		'#dateEl',
				hourEl: 		'#hourEl',
				minuteEl: 		'#minuteEl',
				
				max1El:			'#max1El',
				max2El:			'#max2El',
				optionCtrEl:	'#optionCtrEl',
				addOptionEl:	'#addOptionEl',
				maxMoreEl:		'#maxMoreEl',
				
				formEl: 		'#formEl',
				submitEl: 		'#submitEl'
			};
			
			this._els = {};
			
			//	初始化候选项部分
			this._initOptions();
			
			//	初始化年月日
			this._initDateSelector();
			
			//	初始化表单验证
			this._initValidator();
			
			//	绑定提交按钮
			this._el('submitEl').on('click', this._e_submit.bindEvent(this));
		},
		_initOptions: function() {
			this._el('optionCtrEl').on('click', this._e_clickOptionCtr.bindEvent(this));
			this._el('addOptionEl').on('click', this._e_newOption.bindEvent(this));
		},
		_initDateSelector: function() {
			kola.ctrl.DateSelector.init({
				ele: this._el('yearEl'),
				opt: {"0": "请选择"},
				from: (new Date()).getFullYear(),
				to: (new Date()).getFullYear() + 5
			}, {
				ele: this._el('monthEl'),
				opt: {"0": "请选择"}
			}, {
				ele: this._el('dateEl'),
				opt: {"0": "请选择"}
			});
			
			this._el('hourEl').addRange(0, 23, 1);
			this._el('minuteEl').addRange(0, 59, 1);
		},
		_initValidator: function() {
			this._el('titleEl').on('blur', this._e_validateEl.bind(this, this._el('titleEl')));
		},
		
		/**
		 * 有关选项的操作方法
		 */
		_optionCount: 5,
		_index: 5,
		_e_newOption: function(e) {
			if (this._optionCount >= 30) {
				this._el('addOptionEl').hide();
				return;
			}
			var addCount = Math.min(5, 30 - this._optionCount),
				arr = [];
			for (var j=0; j<addCount; j++) {
				var i = ++this._index;
				arr.push('<dt><label for="optionEl' + i + '">候选项' + (++this._optionCount) + '：</label></dt>' +
					'<dd><input id="optionEl' + i + '" name="option" type="text" class="text" />&nbsp;<a href="javascript:void(0);" class="icon i-del">删除</a></dd>');
			}
			this._el('optionCtrEl').append(arr.join(''));
			this._refreshMax();
		},
		_e_clickOptionCtr: function(e) {
			var el = kola.Event.element(e).upWithMe('a');
			if (el) {
				var el1 = el.upWithMe('dd');
				if (el1.prev()) el1.prev().remove();
				el1.remove();
				this._refreshOptionIndex();
				this._refreshMax();
			}
		},
		_refreshOptionIndex: function() {
			this._optionCount = this._el('optionCtrEl').down('dt').each(function(el, i) {
				el.first().html('候选项' + (i + 1) + '：');
			}).size();
		},
		
		/**
		 * 有关选项数量的操作方法
		 */
		_refreshMax: function() {
			var length = this._el('maxMoreEl').elements()[0].options.length;
			if (length == this._optionCount - 1) return;
			if (length < this._optionCount - 1) {
				for (var i=length+2; i<=this._optionCount; i++) {
					var obj = {};
					obj['' + i] = '最多选' + i + '项';
					this._el('maxMoreEl').addOptions(obj);
				}
			} else {
				this._el('maxMoreEl').elements()[0].options.length = this._optionCount - 1;
			}
			var valueNow = this._el('maxMoreEl').val();
			this._el('max2El').val(valueNow && parseInt(valueNow) > this._optionCount ? this._optionCount : 2);
			
			if (this._optionCount >= 30) {
				this._el('addOptionEl').hide();
			} else {
				this._el('addOptionEl').show();
			}
		},
		_maxValue: function() {
			if (this._el('max1El').prop('checked')) return this._el('max1El').val();
			if (this._el('max2El').prop('checked')) return this._el('max2El').val();
			return null;
		},
		
		_el: function(id) {
			return this._els[id] || (this._els[id] = $(this._options[id]));
		},
		_els: {},
		
		/**
		 * 提交处理方法
		 */
		_e_submit: function(e) {
			if (this._validateForm()) {
				this._el('submitEl').html('正在发起投票');
				var data = kola.dom.Form.val(this._el('formEl'));
				mdl.add(data, {
					success: this._succAdd.bind(this),
					failure: this._failAdd.bind(this)
				});
			}
		},
		_succAdd: function(data) {
			sohu.View.switchView(data.toView || '/app/truth/');
		},
		_failAdd: function(error) {
			alert('保存失败：\n' + error.statusText);
			this._el('submitEl').html('发起投票');
		},
		
		/**
		 * 验证某个选项
		 */
		_e_validateEl: function(el) {
			KTV.ValidateOne(el.elements()[0], 3);
		},
		/**
		 * 验证窗口
		 */
		_validateForm: function() {
			var form = this._el('formEl').elements()[0];
			if (KTV.Validate(form, 3) || KTV.Validate(form, 2)) {
				var countNow = 0;
				this._el('optionCtrEl').down('dd input').each(function(el) {
					if (el.val().trim()) countNow++;
				});
				if (countNow < this._maxValue()) {
					alert('至少需要填写' + this._maxValue() + '个选项');
					return false;
				}
				return true;
			}
			return false;
		}
	}
		
}, 'sohu.core.*, kola.tool.Validator, kola.dom.Form, kola.ctrl.DateSelector, sohu.ctrl.Dialog');