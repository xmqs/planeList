<template>
	<!--选择要看的新闻类型-->
	<div id="cwty_input">
		<!--头部临时用-->
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			宠物申报
			<router-link :to="{path: '/cwty/cwty_list/'+'tab-container1'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header>
		<!--内容-->
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<div class="points1">
				<p class="">本平台只提供申办渠道，由用户与托运公司双向自由交易， 平台不承担任何纠纷和法律责任，最终解释权归南京市电子 口岸公司所有。建议与投诉电话：025-521637463</p>
			</div>
			<div class="points">
				<span class="">宠物信息</span>
			</div>
			<div class="ele1">
				<span class="tit">宠物照片</span>
				<img @click="clickcwzp(imageUrl1)" style="position: absolute;top: 5px;right: 21px;width: 68px;" :src="imageUrl"/>
				<img class="po_right" style="padding: 30px 4px 35px 18px;top:4;" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">宠物种类</label>
			  	<div @click="rou_cwzl(varietys)">
					<input readonly="readonly" class="inps" type="text" placeholder="" v-model="varietys" />
					<img class="po_right" src="../../../static/img/Shape.png"/>
				</div>
			</div>
			<div class="ele">
				<label class="tit">宠物品种</label>
				<input class="inps" type="text" placeholder="请输入宠物品种" v-model="cwpz" />
			</div>
			<div class="ele">
				<label class="tit">宠物名字</label>
				<input class="inps" type="text" placeholder="请输入宠物名字" v-model="cwmz" />
			</div>
			<div @click="sheet1(3)" class="ele">
				<label class="tit">宠物年龄</label>
				<input readonly="readonly" class="inps" type="text" v-model="cwnl" />
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">宠物重量(公斤)</label>
				<input class="inps" type="number" placeholder="请输入宠物重量(公斤)" v-model="cwzl" />
			</div>
			<div @click="sheet1(1)" class="ele">
				<label class="tit">体型尺寸</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sizes" />
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div @click="sheet1(2)" class="ele">
				<label class="tit">是否办理狗(猫)证</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sfblgz" />
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div @click="sheet1(0)" class="ele">
				<label class="tit">是否已植入芯片</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="chip" />
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div @click="gomyz" class="ele">
				<label class="tit">免疫证</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="myz" />
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div @click="sheet1(4)" class="ele">
				<label class="tit">发货地</label>
				<input readonly="readonly" class="inps" type="text" v-model="fhd" />
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">选择目的城市</label>
			  	<router-link :to="{name:'IndexList'}">
					<input readonly="readonly" class="inps" type="text" placeholder="" v-model="area" />
					<img class="po_right" src="../../../static/img/Shape.png"/>
				</router-link>
			</div>
			<div style="border-bottom:0" class="ele">
				<label class="tit">预计航班日期</label>
			  	<router-link :to="{name:'calendar'}">
					<input readonly="readonly" class="inps" type="text" placeholder="" v-model="riqi" />
					<img class="po_right" src="../../../static/img/Shape.png"/>
				</router-link>
			</div>
			<div class="points">
				<span class="">主人信息</span>
			</div>
			<div class="ele">
				<label class="tit">姓名</label>
				<input class="inps" type="text" placeholder="请输入姓名" v-model="zrxm" />
			</div>
			<div class="ele">
				<label class="tit">身份证号</label>
				<input class="inps" type="text" placeholder="请输入身份证号" v-model="sfzh" />
			</div>
			<div class="ele">
				<label class="tit">联系方式</label>
				<input class="inps" type="number" placeholder="请输入联系方式" v-model="lxfs" />
			</div>
			<div class="ele">
				<label class="tit">护照信息</label>
				<input class="inps" type="text" placeholder="请输入护照信息" v-model="hzxx" />
			</div>
			<div class="ele">
				<span class="tit">是否需要上门服务</span>
				<mt-switch @change="serve_switch" class="my-switch hairlines" v-model="smfw"></mt-switch>
			</div>
			<div v-show="addr" class="ele" >
				<label class="tit">地址</label>
				<input class="inps1" type="text" placeholder="请输入地址" v-model="dz" />
			</div>
			<div class="ele-s">
				<button @click="unbind && shenbao()" class="shenbao">申报</button>
			</div>
		</div>
		<mt-actionsheet :actions="actions" closeOnClickModal="sheetVisible1" v-model="sheetVisible2" cancel-text="取消"></mt-actionsheet>
	</div>
</template>

<script>
	import axios from "axios";
	import { Toast } from 'mint-ui';
	import { formatDate } from '../../assets/js/date.js';
	import Bus from './bus.js'
	export default {
		name: "cwty_input",
		data() {
			return {
				lod:false,
				imageUrl: '../../../static/img/dogDemo.png',
				imageUrl1: [],
				petdemo:true,
				/*属性*/
				dz:"",
				smfw:false,
				hzxx:"",
		        varietys:" ",
				lxfs:"",
				sfzh:"",
				zrxm:"",
		        sfblgz:"",
				riqi:"",
				area:"",
				fhd:"",
				myz:"",
				myz1:[],
				chip:"",
				sizes:"",
				cwzl:"",
				cwnl:"",
				cwmz:"",
				cwpz:"",
				/*属性结束*/
				unbind:true,
				value:"",
				switch1:false,
				addr:false,
				name:"",
				actions:[],
				actions0:[{
			        name: '是否植入芯片'
			      },{
			        name: '是',
			        method: this.chip1
			      }, {
			        name: '否',
			        method: this.chip2
			      }],
				actions1:[{
			        name: '体型尺寸'
			      },{
			        name: '大型',
			        method: this.size1
			      }, {
			        name: '中型',
			        method: this.size2
			      }, {
			        name: '小型',
			        method: this.size3
			      }],
				actions2:[{
			        name: '是否办理狗证'
			      },{
			        name: '是',
			        method: this.sfblgz1
			      }, {
			        name: '否',
			        method: this.sfblgz2
			      }],
				actions3:[{
			        name: '宠物年龄'
			      },{
			        name: '小于1岁',
			        method: this.age1
			      }, {
			        name: '1岁',
			        method: this.age2
			      }, {
			        name: '2岁',
			        method: this.age3
			      }],
				actions4:[{
			        name: '北京',
			        method: this.fhd1
			      }, {
			        name: '上海',
			        method: this.fhd2
			      }, {
			        name: '南京',
			        method: this.fhd3
			      }],
		        sheetVisible2: false,
		        sheetVisible1:false
			}
		},
	    beforeRouteLeave(to, from, next) {
	        // 设置下一个路由的 meta
	        if(to.name == 'cwty_list'){
        		to.meta.keepAlive = false;
        		from.meta.keepAlive = false;
	        }else{
        		from.meta.keepAlive = true;
	        }
	        next();
	    },
	    activated() {
			
		},
		methods: {
			clickcwzp(res){
				setTimeout(() => {
			        Bus.$emit('oldCwzp', res)
			    }, 30)
				this.$router.push({path: '/chiose_rad/cwzp'})
			},
			rou_cwzl(varietys){
				setTimeout(() => {
			        Bus.$emit('varietys', varietys)
			    }, 30)
				this.$router.push({path: '/chiose_rad/chiose_rad'})
			},
			chip1(){
				this.chip = '是'
			},
			chip2(){
				this.chip = '否'
			},
			size1(){
				this.sizes = '大型'
			},
			size2(){
				this.sizes = '中型'
			},
			size3(){
				this.sizes = '小型'
			},
			sfblgz1() {
		        this.sfblgz = '是'
		    },
			sfblgz2() {
		        this.sfblgz = '否'
		    },
			age1(){
				this.cwnl = '小于1岁'
			},
			age2(){
				this.cwnl = '1岁'
			},
			age3(){
				this.cwnl = '2岁'
			},
			fhd1(){
				this.fhd = '北京'
			},
			fhd2(){
				this.fhd = '上海'
			},
			fhd3(){
				this.fhd = '南京'
			},
			serve_switch(){
				this.switch1 = !this.switch1;
				if (this.switch1 == true) {
					this.addr = true;
				}else{
					this.addr = false;
				}
			},
			sheet1(n){
				if (n == 1) {
					this.actions = this.actions1;
				} else if (n == 2){
					this.actions = this.actions2;
				} else if (n == 0){
					this.actions = this.actions0;
				} else if (n == 3){
					this.actions = this.actions3;
				} else if (n == 4){
					this.actions = this.actions4;
				}
				this.sheetVisible2 = !this.sheetVisible2;
			},
			gomyz(){
				this.$router.push({name: 'myzh',
					params:{ 
						res:this.myz1
					}
				})
			},
			shenbao(){
				this.unbind = false;
				setTimeout(()=>{
					this.unbind = true;
				},3000);
				var check = true;
				var input = document.querySelectorAll('.inps');
				var label = document.getElementsByTagName('label');
				if(this.imageUrl1.length == 0){
					Toast('请上传宠物照片')
					check = false;
					return;
				}
				for(var i =0;i < input.length;i++){
				    if (input[i].value == "") {
				    	Toast('请填写'+label[i].innerHTML)
				    	check = false;
				    	return;
				    }
				}
				var regName =/^[\u4e00-\u9fa5]{2,4}$/; 
				if(!this.zrxm.match(regName)){
					Toast('姓名填写有误')
					return;
				}
            	var telReg = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
            	if(!this.lxfs.match(telReg)){
            		Toast('请输入正确的电话号码')
					return;
            	}
            	var cardIdReg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
           	 	if(!this.sfzh.match(cardIdReg)){
            		Toast('请输入正确的身份证号码')
					return;
            	}
           	 	var ownerPassport = /^[a-zA-Z0-9]{5,17}$/;
           	 	if(!this.hzxx.match(ownerPassport)){
			        Toast('护照号码填写有误')
					return;
			    }
				if (this.smfw == true) {
					var input = document.querySelectorAll('.inps1');
					if (input[0].value == "") {
				    	Toast('请填写地址')
				    	check = false;
				    	return;
				    }
				}
				if (check) {
					var sfxysmfu;
					var xfzrxp;
					if(this.smfw == false){
						sfxysmfu = 0;
					}else{
						sfxysmfu = 1;
					}
					if(this.chip == "是"){
						xfzrxp = 1
					}else{
						xfzrxp = 0
					}
					axios.post("/eport-server/delivery/pet/saveOrder.do", {
						endCity:this.area,
						flightDate:this.riqi,
						homeDelivery:sfxysmfu,
						homeAddress:this.dz,
						ownerIdNo:this.sfzh,
						ownerName:this.zrxm,
						ownerPassport:this.hzxx,
						ownerTelNo:this.lxfs,
						petAge:this.cwnl,
						petBreed:this.cwpz,
						petCertificate:this.sfblgz,
						petChip:xfzrxp,
						petName:this.cwmz,
						petPicture:this.imageUrl1,
						petSize:this.sizes,
						petType:this.varietys,
						petVaccineLastTime:this.myz,
						petVaccinePics:this.myz1,
						petWeight:this.cwzl,
						startCity:this.fhd,
					}).then((res) => {		
						console.log(res)
						if(res.status == 200) {	
							Toast("申报成功");
							setTimeout(()=>{
								this.$router.push({path: '/cwty/cwty_list/'+'tab-container1'})
								this.unbind = true;
							},1500);
						}else{
							Toast("申报失败");
						}
					}, (res) => {							
					});
					/*axios({
						method: 'POST',
						data:data,
						url: '/eport-server/delivery/pet/saveOrder.do',
						dataType: 'json',
						headers: {
				            'Content-Type': 'application/json;charset=UTF-8'
				        },
						then: function(data1) {
							console.log(data1);
							Toast("申报成功")
						}
					});*/
					
				}
			}
		},
		mounted() {
		},
		created: function() {
		    Bus.$on('area', (e) => {
		    	this.area = e;
				document.getElementById("soll").scrollTop = 300;
		    })
		    Bus.$on('myz', (e,el) => {
		　　　　this.myz = e;
				this.myz1 = [];
				this.myz1.push(el);
				document.getElementById("soll").scrollTop = 300;
		    })
		    Bus.$on('riqi', (e) => {
		　　　　this.riqi = e;
				document.getElementById("soll").scrollTop = 300;
		    })
		    Bus.$on('varietys', (e) => {
		　　　　this.varietys = e;
		    })
		    Bus.$on('cwzp', (e) => {
		　　　　this.imageUrl1 = e;
				if (e[0] != undefined) {
					this.imageUrl = e[0];
				}
		    })
		},
		filters: {
			
		}
	}
</script>

<style scoped>
	*{
		font-family: PingFangSC;
	}
	 @component-namespace page {
    @component actionsheet {
      @descendent wrapper {
        padding: 0 20px;
        position: absolute 50% * * *;
        width: 100%;
        transform: translateY(-50%);
        button:first-child {
          margin-bottom: 20px;
        }
      }
    }
  }
	p{
	    background: #fff5e5;
	    line-height: 40px;
	    padding: 15px 12px;
	    height: 150px;
	    font-size:26px;
		font-family:PingFangSC-Regular;
		color:rgba(255,181,64,1);
	}
	#soll{
	    position: fixed;
	    width: 100%;
	    overflow: auto;
	    height: 100%;
	}
	.points{
	    padding: 20px;
	    height: 80px;
	    line-height: 45px;
	    background-color: #eee;
	    font-size:28px;
		font-family:PingFangSC-Regular;
		color:rgba(170,170,170,1);
	}
	.ele1{
	    margin: 0 20px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    height: 160px;
	    line-height: 160px;
		font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
	}
	.ele{
	    margin: 0px 20px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    height: 80px;
	    line-height: 80px;
		font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
	}
	.tit{
		color: #333;
	}
	.inps{
	    width: 55%;
	    position: absolute;
	    right: 7px;
	    top: 10px;
	    height: 45px;
	    border: 0;
	    outline: none;
	    font-size:32px;
		font-family:PingFangSC-Regular;
		color:#939393;
	}
	.inps1{
	    width: 60%;
	    position: absolute;
	    right: 7px;
	    top: 10px;
	    height: 45px;
	    border: 0;
	    outline: none;
	    font-size:32px;
		font-family:PingFangSC-Regular;
		color:#939393;
	}
	.pet-img{
	    position: absolute;
	    top: 7px;
	    right: 40px;
	    width: 64pt;
	    height: 60pt;
	}
	.po_right{
		position: absolute;
	    top: 0px;
	    z-index: 999;
	    right: -6px;
	    padding: 20px 8px 19px 34px;
	}
	.my-switch{
	    position: absolute;
	    top: 23px;
	    right: 12px;
	}
	.ele-s{
	    padding: 25px 19px;
    	background: #f0f0f0;
	}
	.shenbao{
	    border: 0;
	    background: #285fb1;
	    width: 100%;
	    height: 92px;
	    font-size:34px;
		font-family:PingFangSC-Regular;
		color:rgba(255,255,255,1);
	}
	
.avatar-uploader{
    width: 90px;
    position: absolute;
    top: 0;
    right: 15px;
    height: 94px;
}
	  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 64pt;
    height: 64pt;
    line-height: 64pt;
    margin-top: 3px;
    text-align: center;
    float: right;
    opacity: 0;
  }
 .avatar{
    width: 64pt;
    height: 64pt;
    display: block;
    margin-top: 5px;
    float: right;
    margin-right: 18px;
}
.downwarp{
	    position: absolute;
    right: 45px;
    top: 30px;
}
	.downwarp-progress-s{
	    display: inline-block;
		-webkit-transition-property: -webkit-transform;
	    -webkit-transition-duration: 1s;
	    -moz-transition-property: -moz-transform;
	    -moz-transition-duration: 1s;
	    -webkit-animation: rotate 3s linear infinite;
	    -moz-animation: rotate 3s linear infinite;
	    -o-animation: rotate 3s linear infinite;
	    animation: rotate 3s linear infinite;
    }
    
    .mint-switch-core:before {
    width: 6.667vw;
    height: 4vw;
    background-color: #fdfdfd;
    content: "";
}
    .mint-switch-input:checked+.mint-switch-core:after {
    -webkit-transform: translateX(2.667vw);
    transform: translateX(2.667vw);
    content: ""!important; 
}
	.mint-switch-core:after {
	    width: 4vw;
	    height: 4vw;
	    background-color: #fff;
	    -webkit-box-shadow: 0 1px 0.4vw rgba(0,0,0,.4);
	    box-shadow: 0 1px 0.4vw rgba(0,0,0,.4);
	    content: ""!important; 
	}
	.mint-actionsheet-button, .mint-actionsheet-listitem {
	    display: block;
	    width: 100%;
	    height: 90px;
	    line-height: 70px;
	    font-size:28px;
	    color: #333;
	    background-color: #fff;
	}
</style>