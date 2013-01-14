 
/**
 * @fileoverview  真心话JS包
 * @author  jady@live.com
 * @version  0.1
 */

$register('sohu.truth.*',function(){
	
	var PACK = sohu.truth; 

	/********************************************* mdl *********************************************/
	
	var mdl = new sohu.core.Model({
		
		actions: {
			saveTruth: {
				url:		'/a/app/truth/savetruth.do',
				params:		['question', 'answer', 'privacy_level', 'privacy_pu'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			},
			saveAnswer: {
				url:		'/a/app/truth/saveanswer.do',
				params:		['questionid', 'answerid', 'answer', 'privacy_level', 'privacy_pu', 'friendid'],
				method: 	'post',
				format: 	'json',
				type:		'blank'
			}
		},
		url:				''
	});

	/********************************************* LaunchForm *********************************************/
	
	PACK.Form = {
		
		initQuestion: function() {
			this._type = 'question';
			this._init();
		},
		
		initAnswer: function() {
			this._type = 'answer';
			this._init();
		},
		
		_init: function() {
			this._els = {};
			
			//	保存设置
			this._options = {
				formEl: 		'#formEl',
				answerEl: 		'#answerEl',
				forAllEl: 		'#forAllEl',
				forSomeEl: 		'#forSomeEl',
				friendCtrEl: 	'#friendCtrEl',
				submitEl: 		'#submitEl'
			};
			if (this._type == 'question') this._options.questionEl = '#questionEl';
			
			//	绑定按钮功能
			this._el('forAllEl').on('click', this._e_changePrivacy.bind(this));
			this._el('forSomeEl').on('click', this._e_changePrivacy.bind(this));
			
			/*
			//	绑定验证功能
			if (this._type == 'question') this._el('questionEl').on('blur', this._e_validateEl.bind(this, this._el('questionEl')));
			this._el('answerEl').on('blur', this._e_validateEl.bind(this, this._el('answerEl')));
			*/
			
			//	绑定提交按钮
			this._el('submitEl').prop('disabled', false).on('click', this._e_submit.bindEvent(this));
		},
		
		_el: function(id) {
			return this._els[id] || (this._els[id] = $(this._options[id]));
		},
		_els: {},
		
		/*
		_e_validateEl: function(el) {
			KTV.ValidateOne(el.elements()[0], 3);
		},
		*/
		_e_submit: function(e) {
			this._el('submitEl').prop('disabled', true);
			if (this._validateForm()) {
				this._el('submitEl').html(this._type == 'question' ? '正在发起真心话' : '正在交换真心话');
				var data = kola.dom.Form.objFields(this._el('formEl'));
				mdl[this._type == 'question' ? 'saveTruth' : 'saveAnswer'](data, {
					success: this._succSave.bind(this),
					failure: this._failSave.bind(this)
				})
			} else {
				this._el('submitEl').prop('disabled', false);
			}
		},
		_succSave: function(data) {
			sohu.View.switchView(data.toView || '/app/truth/');
		},
		_failSave: function(error) {
			alert('保存失败：\n' + error.statusText);
			this._el('submitEl').prop('disabled', false).html('发起真心话');
		},
		_validateForm: function() {
			var form = this._el('formEl').elements()[0];
			if (KTV.Validate(form, 3) || KTV.Validate(form, 2)) {
				switch (this._privacyLevel()) {
					case null:
						alert('请选择可以交换真心话的好友');
						return false;
					case '3':
						if (this._friendSelector.getValue().length == 0) {
							alert('请选择可以交换真心话的好友');
							return false;
						}
				}
				return true;
			}
			return false;
		},
		
		_friendSelector: null,
		_e_changePrivacy: function() {
			switch (this._privacyLevel()) {
				case '2':
					this._el('friendCtrEl').hide();
					break;
				case '3':
					if (!this._friendSelector) {
						this._friendSelector = new sohu.friend.Selector({
							element: this._options['friendCtrEl'],
							isButton: true,
							type: 2
						});
					}
					this._el('friendCtrEl').show();
					break;
			}
		},
		_privacyLevel: function() {
			if (this._el('forAllEl').prop('checked')) return '2';
			if (this._el('forSomeEl').prop('checked')) return '3';
			return null;
		}
	}
		
}, 'sohu.core.*, kola.tool.Validator, sohu.friend.*, kola.dom.Form');