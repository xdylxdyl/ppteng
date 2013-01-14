/*
 * 
 *	people Search  核心文件 	
 * 
 */
 
 $register(
	'sohu.psearch.*',
	function(){
	
		sohu.psearch.Base ={
			
			init : function(options){
				
				this.opt=Object.extend({
					company: {},// 设置公司搜索
					school : {},// 设置学校搜索
					date   : {},// 设置日期选择器
					area   : {},// 设置地区选择器
			        defalutSel : 6  // 设置默认的学校 为 （大学）
					
				},options||{})
				this._box=$(this.opt.school.seTog).parent();
				this._depart=$(this.opt.school.seDph);
				this._boxHtml=this._box.html();
				this._schoolSel=$(this.opt.school.sel);
				this._schoolseDp=$(this.opt.school.seDp);
				var _date=$(this.opt.date);
				var _prov=$(this.opt.area[0]);
				var _city=$(this.opt.area[1]);
				var _country=$(this.opt.area[2])
				this.companySelector=new sohu.ctrl.CompanySelector(this.opt.company,{
					pos :[10,0],
					width:250,
					onSelect : function(name,str){
						$(this.opt.company).val(sohu.ctrl.CompanySelector._data[str].name)
				}.bind(this)});
				this.dateSelector=kola.ctrl.DateSelector.init({ele:_date,val:_date.attr('data-value')});
				this.areaSelector=sohu.ctrl.AreaSelector.init(
					{ele: _prov, val: _prov.attr('data-value')}, 
					{ele: _city, val: _city.attr('data-value')},
					{ele: _country, val: _country.attr('data-value')}
				)
				var _loadNum=this._loadData(this._schoolSel)||6;
				var _load={6:0,4:1,1:2}
				var _schoolSel=document.getElementById(this.opt.school.sel.replace("#",""));
				_schoolSel.options[_load[_loadNum]].selected=true;
				this.initSelector(_loadNum)
				this._changeSchool();
				this._changeDepart();
				
			},
			initSelector :function(value){
				var _seDp=$(this.opt.school.seDp).up('dd');
				var  _setit=$(this.opt.school.seDp+"_tit");
				if(value!=6){
					_seDp.hide();
					_setit.hide();
				}
				else{
					_seDp.show();
					_setit.show();
				}
				if(this.eventOver){
				   this._overFlowEvent();
				}
				this.eventOver=true;
				sohu.ctrl.SchoolSelector.init(
				    value,
				    this.opt.school.seName,
				    this.opt.school.seId,
				    this.opt.school.seTog,{
						deptEl:this.opt.school.seDp,
						aFilter:1,
						callBack:function(){
						}
	
				})
			
			},

			_loadData      : function(element){
				return element.attr('data-value');
					
			},
			_changeDepart  : function(){
				var _this=this;
				this._schoolseDp.on('change',function(){
					_this._depart.val(this.options[this.selectedIndex].innerHTML)
				})
			},
			_changeSchool  : function(){
				var _this=this;
				this._schoolSel.on('change',function(){
					_this.initSelector.bind(_this)(parseInt(this.value));
					
				})
			
			},
			_overFlowEvent : function(){
				 this._box.html(this._boxHtml);
			}
			
		}
		
	},"kola.ctrl.DateSelector,sohu.ctrl.CompanySelector,sohu.ctrl.SchoolSelector,sohu.ctrl.AreaSelector")