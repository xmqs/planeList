<template>
	<div @click="showhistry=false" id="hwcx">
		<!-- <mt-header style="font-size: 17px;height:45px;background-color:#285FB1;" title="货运查询">
			<router-link :to="{path:'/'}" slot="left">
		    	<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</mt-header> -->
		<div class="content-box">
			<input type="text" class="gang se" value="" readonly="readonly" v-model="select_txt" placeholder="请选择货运方式"/>
			<div @click.stop="toogle_list" class="sj"><a class="sanjiao"></a></div>
			<input type="text" class="gang" value="" @focus="order()" @keyup="up($event)" v-model="dingdanhao" maxlength="11" placeholder="请输入11位订单号"/>
			<div v-show="shanchu" @click="deletes" style="padding: 7px;width: 40px; height: 40px;font-size: 23px;position: absolute;top: 79px;right: 13px;line-height: 20px;">×</div>
			<div type="button" @click="select" :class="{ 'bgColor': bgColor === true }" class="bgColor1">查询</div>
			<ul v-show="showhistry" class="myhistry1">
				<li @click="getarr(ele)" v-for="(ele,index) in myhistry" :key="index" class="myhistrylist">{{ele}}</li>
			</ul>
		</div>
		<div class="content-box1">
			<div style="height: calc(100% - 31.733vw);overflow: auto;" v-if="active == 'CI' && status == 0 && flag == 0">
				<div v-show="clList" class="cl">
					<span style="font-size: 16pt;color: #333;">主运单信息</span>
					<p class="things">件数：{{list.PC}}；重量：{{list.Weight}}；品名：{{list.Goods}}；承运人：{{list.Carrier}}；起运港：{{list.Origin}}；目的港：{{list.Dest}}</p>
				</div>
				<div v-for="(ele,index) in list.mwList" class="cl" :key="index">
					<div style="font-size: 13pt;color: #333;">
						<div style="background: #f9f9f9;padding: 3vw;margin-bottom: 16px;padding-bottom: 0.1vw;" :key="index">
							<div style="font-size: 14pt;color: #333;">货物信息</div>
							<p v-if="ele.ManiFest.ActualArrival == ''" class="things">件数：{{ele.ManiFest.PC}}；重量：{{ele.ManiFest.Weight}}；航班号：{{ele.ManiFest.Fno}}  {{ele.WareHouse.FDate}}</p>
							<p v-else class="things">件数：{{ele.ManiFest.PC}}；重量：{{ele.ManiFest.Weight}}；航班号：{{ele.ManiFest.Fno}}  {{ele.ManiFest.ActualArrival}}</p>
						</div>
						<div style="background: #f9f9f9;padding: 3vw;margin-bottom: 16px;padding-bottom: 0.1vw;" :key="index">
							<div style="font-size: 14pt;color: #333;">入库信息</div>
							<p class="things">入库理货完成时间：{{ele.WareHouse.OPDate}}</p>
						</div>
						<div v-if="ele.WareHouse.PickTime != ''" style="background: #f9f9f9;padding: 3vw;margin-bottom: 16px;" :key="index">
							<div style="font-size: 14pt;color: #333;">提取信息</div>
							<p class="things">提取时间：{{ele.WareHouse.PickTime}}</p>
						</div>
					</div>
				</div>
			</div>
			<div style="height: calc(100% - 31.733vw);overflow: auto;" v-else-if="active == 'CO' && status == 0 && flag == 0">
				<div v-show="clList" class="cl">
					<span style="font-size: 16pt;color: #333;">主运单信息</span>
					<p class="things">件数：{{list.PC}}；重量：{{list.Weight}}；品名：{{list.Goods}}； 承运人：{{list.Carrier}}；起运港：{{list.Origin}}；目的港：{{list.Dest}}；货物入库时间：{{list.mwList[0].WareHouse.OPDate}}</p>
				</div>
				<div v-for="(ele,index) in list.mwList" class="cl" :key="index">
					<div style="font-size: 13pt;color: #333;">
						<div style="background: #f9f9f9;padding: 3vw;margin-bottom: 16px;padding-bottom: 0.1vw;" :key="index">
							<div style="font-size: 14pt;color: #333;">货物信息</div>
							<p class="things">件数：{{ele.WareHouse.PC}}；重量：{{ele.WareHouse.Weight}}；航班号：{{ele.WareHouse.Fno}}  {{ele.WareHouse.FDate}}</p>
						</div>
					</div>
				</div>
			</div>
			<div style="height: calc(100% - 31.733vw);overflow: auto;" v-else-if="active == 'II' && status == 0 && flag == 0">
				<div v-show="clList" class="cl">
					<span style="font-size: 16pt;color: #333;">主运单信息</span>
					<p class="things">件数：{{list.PC}}；重量：{{list.Weight}}；品名：{{list.Goods}}； 承运人：{{list.Carrier}}；起运港：{{list.Origin}}；目的港：{{list.Dest}}；海关放行指令：{{list.RELStatus}}；原始舱单状态：{{list.mftStatus}}；货物理货状态：{{list.tallyStatus}}</p>
				</div>
				<div v-for="(ele,index) in list.mwList" class="cl" :key="index">
					<div style="font-size: 13pt;color: #333;">
						<div style="background: #f9f9f9;padding: 3vw;padding-bottom: 0.1vw;margin-bottom: 16px;" :key="index">
							<div style="font-size: 14pt;color: #333;">货物信息</div>
							<p v-if="ele.ManiFest.ActualArrival == ''" class="things">件数：{{ele.ManiFest.PC}}；重量：{{ele.ManiFest.Weight}}；航班号：{{ele.ManiFest.Fno}}  {{ele.WareHouse.FDate}}</p>
							<p v-else class="things">件数：{{ele.ManiFest.PC}}；重量：{{ele.ManiFest.Weight}}；航班号：{{ele.ManiFest.Fno}}  {{ele.ManiFest.ActualArrival}}</p>
						</div>
						<div style="background: #f9f9f9;padding: 3vw;padding-bottom: 0.1vw;margin-bottom: 16px;" :key="index">
							<div style="font-size: 14pt;color: #333;">入库信息</div>
							<p class="things">入库理货完成时间：{{ele.WareHouse.OPDate}}</p>
						</div>
						<div v-if="ele.WareHouse.PickTime != ''" style="background: #f9f9f9;padding: 3vw;" :key="index">
							<div style="font-size: 14pt;color: #333;">转库信息</div>
							<p class="things">转入货代监管库时间：{{ele.WareHouse.PickTime}}</p>
						</div>
					</div>
				</div>
				<div v-for="(ele,index) in list.Hawb" class="cl" :key="index">
					<span style="font-size: 13pt;color: #333;">分运单号：{{ele.Hno}}</span>
					<p class="things">件数：{{ele.PC}}；重量：{{ele.Weight}}；品名：{{ele.Goods}}； 海关放行指令：{{ele.RELStatus}}；原始舱单状态：{{ele.mftStatus}}；货物理货状态：{{ele.tallyStatus}}</p>
				</div>
			</div>
			<div style="height: calc(100% - 31.733vw);overflow: auto;" v-else-if="active == 'IO' && status == 0 && flag == 0">
				<div v-show="clList" class="cl">
					<span style="font-size: 16pt;color: #333;">主运单信息</span>
					<p class="things">件数：{{list.PC}}；重量：{{list.Weight}}；品名：{{list.Goods}}； 承运人：{{list.Carrier}}；起运港：{{list.Origin}}；目的港：{{list.Dest}}；商检放行指令：{{list.CIQStatus}}；海关放行指令：{{list.CMDStatus}}；货物入库时间：{{list.mwList[0].WareHouse.OPDate}}</p>
				</div>
				<div v-for="(ele,index) in list.mwList" class="cl" :key="index">
					<div style="font-size: 13pt;color: #333;">
						<div style="background: #f9f9f9;padding: 3vw;padding-bottom: 0.1vw;margin-bottom: 16px;" :key="index">
							<div style="font-size: 14pt;color: #333;">货物信息</div>
							<p class="things">件数：{{ele.WareHouse.PC}}；重量：{{ele.WareHouse.Weight}}；航班号：{{ele.WareHouse.Fno}}  {{ele.WareHouse.FDate}}</p>
						</div>
					</div>
				</div>
				<div v-for="(ele,index) in list.Hawb" class="cl" :key="index">
					<span style="font-size: 13pt;color: #333;">分运单号：{{ele.Hno}}</span>
					<p class="things">件数：{{ele.PC}}；重量：{{ele.Weight}}；品名：{{ele.Goods}}； 海关放行指令：{{ele.RELStatus}}；原始舱单状态：{{ele.MFTStatus}}；货物理货状态：{{ele.tallyStatus}}</p>
				</div>
			</div>
			<div v-else-if="status == 0 && flag == 1">
				<transition name="fade">
					<img src="../../../static/img/kong.png"/>
				</transition>
			</div>
			<div v-else-if="status == 1 && flag == 2">

				<ul v-show="showhistry0" class="myhistrys">
          <a style="display:block;padding-left: 4vw;margin-bottom: 3vw;margin-top: 16px;height: 7vw;" href="tel:025-69820886">服务电话：025-69820886</a>
					<p style="padding-left: 4vw;margin-bottom: 3vw;margin-top: 6px;height: 7vw;">历史记录</p>

					<li @click="getarr0(ele)" v-for="(ele,index) in myhistry0" :key="index" class="myhistrylist">
						<div v-if="index % 2 ==0" style="background:#f5f5f5;padding-left: 4vw;">
							<span>{{ele | strs}}</span><span style="float:right;margin-right: 6vw;">{{ele | strs1}}</span>
						</div>
						<div v-else style="padding-left: 4vw;">
							<span>{{ele | strs}}</span><span style="float:right;margin-right: 6vw;">{{ele | strs1}}</span>
						</div>
					</li>
					<!-- background: rgb(249, 249, 249); -->
				</ul>
			</div>
		</div>
		<div class="content-box2">
			<transition name="fade">
				<ul v-show="ul_list" id="to-list" transiton="fade">
					<li @click.stop="kangkou('II','国际进港')" :class="{'list-a':active === 'II'}" class="list-c">国际进港</li>
					<li @click.stop="kangkou('IO','国际出港')" :class="{'list-a':active === 'IO'}" class="list-c">国际出港</li>
					<li @click.stop="kangkou('CI','国内进港')" :class="{'list-a':active === 'CI'}" class="list-c">国内进港</li>
					<li @click.stop="kangkou('CO','国内出港')" :class="{'list-a':active === 'CO'}" class="list-c">国内出港</li>
				</ul>
			</transition>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
    import { Toast } from 'mint-ui'
	export default {
		name: "hwcx",
		data() {
			return {
				select_txt:"",
				dingdanhao:"",
				active:"",
				ul_list:false,
				bgColor:false,
				clList:false,
				clList1:false,
				status:1,
				list:[],
				arr:'',
				shanchu:false,
				flag:2,
				histry:'',
				histrylist:[],
				showhistry:false,
				showhistry0:true,
				idNumber:'',
				showhistrylist:[],
				myhistry:[],
				myhistry0:[],
			}
		},
		created: function() {
			this.active = "II";
			this.select_txt = '国际进港';
			this.getuserinfor();
			this.gethistry();
		},
		filters: {
			strs(str){
				return str.substring(0,11);
			},
			strs1(str){
				return str.substring(12,str.length);
			},
		},
		methods: {
			gethistry(){
				if(localStorage.getItem('histry') != null){
					this.myhistry0 = [];
					this.showhistrylist = JSON.parse(localStorage.getItem('histry'));
					for(var i =0;i<this.showhistrylist.length;i++){
						if(this.idNumber == this.showhistrylist[i].id){
							for (let j = 0; j < this.showhistrylist[i].histry.length; j++) {
								this.myhistry0.push(this.showhistrylist[i].histry[j])
							}
						}
					}
					this.myhistry0 = this.myhistry0.reverse();
				}
			},
			getuserinfor(){
				var userinfo = sessionStorage.getItem('userifo');
				userinfo = JSON.parse(userinfo);
				this.idNumber = userinfo.idNumber;
				//this.idNumber = '320322199307121932';
			},
			getarr(ele){
				this.dingdanhao = ele.substring(0,11);
				this.select_txt = ele.substring(12,ele.length);
				if (this.select_txt == '国际进港') {
					this.active = 'II'
				} else if (this.select_txt == '国际出港') {
					this.active = 'IO'
				} else if (this.select_txt == '国内进港') {
					this.active = 'CI'
				} else if (this.select_txt == '国内出港') {
					this.active = 'CO'
				}
				this.showhistry0=false
				this.showhistry=false
				this.select();
			},
			getarr0(ele){
				this.dingdanhao = ele.substring(0,11);
				this.select_txt = ele.substring(12,ele.length);
				if (this.select_txt == '国际进港') {
					this.active = 'II'
				} else if (this.select_txt == '国际出港') {
					this.active = 'IO'
				} else if (this.select_txt == '国内进港') {
					this.active = 'CI'
				} else if (this.select_txt == '国内出港') {
					this.active = 'CO'
				}
				this.showhistry0=false
				this.showhistry=false
				this.select();
			},
			deletes(){
				this.status = 1;
				this.flag = 2;
				this.dingdanhao = "";
				this.showhistry0=true;
				this.shanchu = false;
				this.gethistry();
			},
			kangkou:function(res,con){//口岸选择
				this.status = 1;
				this.active = res;
				this.select_txt = con;
				this.ul_list = !this.ul_list;
				//this.ul_list = false;
				if(this.dingdanhao != "" && con != ""){
					this.bgColor = true;
				}else{
					this.bgColor = false;
				}
			},
			toogle_list:function(){//底部列表toggle
				this.ul_list = !this.ul_list
			},
			select:function(){//点击查询
				this.clList1 = true;
				if(this.dingdanhao != "" && this.select_txt != ""){
					axios.post("/eport-server/airFreight/getAirFreight.do", {
						awbNumber:this.dingdanhao,
						awbType:this.active
					}).then((res) => {
						if(res.status == 200) {
							this.status = 0;
							this.list = res.data.data;
							if(this.list != '{}'){
								this.arr = JSON.stringify(res.data.data);
								if(this.arr == '{}'){
									this.flag = 1;
								}else{
									if(JSON.parse(localStorage.getItem('histry')) != null){
										this.histrylist = JSON.parse(localStorage.getItem('histry'));
									}

									if (JSON.stringify(this.histrylist).indexOf(this.idNumber) != -1) {
										for (let i = 0; i < this.histrylist.length; i++) {
											if (JSON.stringify(this.histrylist[i].histry).indexOf(this.dingdanhao) == -1) {
												if (this.histrylist[i].histry.length > 9) {
													this.histrylist[i].histry.shift();
													this.histrylist[i].histry.push(this.dingdanhao+'/'+this.select_txt)
												}else{
													this.histrylist[i].histry.push(this.dingdanhao+'/'+this.select_txt)
												}
											}
										}
									} else {
										var arr =[];
										arr.push(this.dingdanhao+'/'+this.select_txt)
										this.histrylist.push({
											id:this.idNumber,
											histry:arr
										})
									}

									localStorage.setItem('histry',JSON.stringify(this.histrylist));
									console.log(JSON.stringify(this.histrylist))
									this.flag = 0;
								}
							}else{
								this.flag = 0;
							}
							setTimeout(()=>{
								this.clList = true;
								this.clList1 = false;
							},100);
						}else{
							Toast("查询失败");
						}
					}, (res) => {
					});
				}
			},
			order(){
				this.shanchu = true;
			},
			up:function(e){//键盘抬起事件
				if(this.dingdanhao != "" && this.select_txt != ""){
					this.bgColor = true;
				}else{
					this.bgColor = false;
				}
				if(this.dingdanhao != ""){
					this.showhistry0=false
					this.shanchu = true;
				}else{
					this.status = 1;
					this.flag = 2;
					this.showhistry0=true;
					this.shanchu = false;
					this.gethistry();
				}
				if(localStorage.getItem('histry') != null){
					this.myhistry = [];
					console.log(localStorage.getItem('histry'))
					this.showhistrylist = JSON.parse(localStorage.getItem('histry'));
					for(var i =0;i<this.showhistrylist.length;i++){
						if(this.idNumber == this.showhistrylist[i].id){
							for (let j = 0; j < this.showhistrylist[i].histry.length; j++) {
									var selectstr = '';
								for (let n = 0; n < this.dingdanhao.length; n++) {
									selectstr += this.showhistrylist[i].histry[j][n];
									if(selectstr == this.dingdanhao){
										this.myhistry.push(this.showhistrylist[i].histry[j])
									}
								}
							}
						}
					}
					if (this.dingdanhao.length == 11) {
						this.showhistry =false;
					}else{
						this.showhistry =true;
					}
					console.log(this.myhistry)
				}
			},
		    getlist:function(){
	            // 查询数据
				/*var _that = this;
				axios.get('/web-editor-web/channel/list.do?', {
					params: _that.remenCondition
				}).then(function(res) {
					for(var j = 0; j < res.data.data.length; j++) {
						_that.remen.push(res.data.data[j])
					}
				})*/
		    }
		}
	}
</script>

<style scope>
	*{
		font-family: PingFangSC;
	    -webkit-overflow-scrolling: touch;
		-webkit-tap-highlight-color:transparent;
	}
	input::-ms-clear{display:block !important}
	#hwcx{
		margin: 0;
		height: 100%;
		width: 100%;
		background: #f5f5f5;
		position: fixed;
	}
	.content-box{
	    margin: auto;
	    background-color: #fff !important;
		padding: 2.667vw 5vw 5.333vw 5vw;
	    position: relative;
	}
	.content-box1{
padding: 1.5% 4% 0;
    background-color: #f5f5f5;
    width: 100%;
    overflow: auto;
    height: 100%;
    padding-bottom: 25vw;
	}
	.bgColor1{
	    background-color: rgb(184, 207, 241);
	    width: 100%;
	    margin-top: 3vw;
	    height: 12.267vw;
	    border: none;
	    color: #fff;
	    font-size: 4.533vw;
	    border-radius: 8px;
		text-align: center;
    line-height: 12.267vw;
	}
	.bgColor{
		background-color: rgb(40, 95, 177);
	}
	.gang{
		height: 11.733vw;
	    outline: none;
	    border: none;
	    font-size: 30px;
	    width: 100%;
	    border-radius: 8px;
	    background-color: #f5f5f5;
	    margin: 1.833vw 0;
	    padding: 0 7px;
		padding-left: 4%;
		-webkit-appearance: none;
		-moz-user-select: auto!important;
		-ms-user-select: auto!important;
		-o-user-select: auto!important;
		-webkit-user-select: auto!important;
		user-select: auto!important;
		border: 0px solid #f5f5f5;
	}
	.sj{
    position: absolute;
    top: 5.333vw;
    right: 2.667vw;
    padding-right: 5vw;
    height: 11.733vw;
    width: 100%;
    text-align: right;
    line-height: 9vw;
	}
	.sanjiao{
	    display: inline-block;
	    width: 0;
	    height: 0;
	    line-height: 0;
	    border: 16px solid transparent;
	    border-top-color: #ccc;
	    border-bottom-width: 0;
	}
	.cl{
 	background: #fff;
    line-height: 4.133vw;
    font-size: 2vw;
    padding: 5.4vw 3vw 1vw 3vw;
    margin-top: 3.5vw;

	}
	#to-list{
	    background-color: #fff;
	    position: fixed;
	    bottom: 0;
	    width: 100%;
		padding-left: 0;
		margin: 0;
	}
	.list-a{
	    background: url(../../../static/img/hycxgou.png) no-repeat right;
		background-size: 7.667vw 5.667vw;
	    color: rgb(40, 95, 177);
	}
	.list-c{
	    list-style: none;
	    width: 95%;
	    height: 100px;
	    font-size: 30px;
	    border-bottom: 1px solid #f7f0f0;
	    margin-left: 15px;
	    line-height: 100px;
	}
	.txt{
		color: #333;
    	font-size: 16px;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.7s
    }
    .fade-enter, .fade-leave-active {
		opacity: 0
    }
	.toast{
		width: 60%;
	}
	.things{
		    margin-top: 3vw;
    font-size: 3.5vw;
	color: #999;
	line-height: 1.6;
	}
	.myhistry1{
    position: fixed;
    top: 31vw;
    background: #fff;
    border: 1px solid #f5f5f5;
    border-top: 0;
    width: 90%;
	padding-left: 0;
	margin: 0;
	z-index: 1;
	}
	.myhistrys{
    position: fixed;
    top:49.3vw;
    background: #fff;
    border: 1px solid #f5f5f5;
    border-top: 0;
    width: 100%;
    padding-left: 0;
    left: 0;
	height: 100%;
	padding-bottom: 49.3vw;
	overflow: auto;
	}
	.myhistrylist{
		    list-style: none;
    height: 10vw;
    line-height: 10vw;

	}
</style>
<style type="text/css">
	.mint-toast-text {
		font-size: 3.8vw !important;
	}
</style>
