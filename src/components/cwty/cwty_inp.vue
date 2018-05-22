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
				<el-upload
				  class="avatar-uploader"
				  action="/web-editor-web/public/upload/upload.do"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<img class="po_right" style="padding: 38px 8px 42px 22px;top:4;" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">宠物种类</label>
				  	<router-link :to="{path:'/chiose_rad/chiose_rad'}">
						<input readonly="readonly" class="inps" type="text" placeholder="" v-model="varietys" />
						<img class="po_right" src="../../../static/img/Shape.png"/>
					</router-link>
			</div>
			<div class="ele">
				<label class="tit">宠物品种</label>
				<input class="inps" type="text" placeholder="请输入宠物品种" v-model="cwpz" />
			</div>
			<div class="ele">
				<label class="tit">宠物名字</label>
				<input class="inps" type="text" placeholder="请输入宠物名字" v-model="cwmz" />
			</div>
			<div class="ele">
				<label class="tit">宠物年龄</label>
				<input class="inps" type="text" placeholder="请输入宠物年龄" v-model="cwnl" />
			</div>
			<div class="ele">
				<label class="tit">宠物重量(公斤)</label>
				<input class="inps" type="text" placeholder="请输入宠物重量(公斤)" v-model="cwzl" />
			</div>
			<div @click="sheet1(1)" class="ele">
				<label class="tit">体型尺寸</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sizes" />
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div @click="sheet1(2)" class="ele">
				<label class="tit">是否已办理狗证</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sfblgz" />
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div @click="sheet1(0)" class="ele">
				<label class="tit">是否已植入芯片</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="chip" />
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">免疫证</label>
			  	<router-link :to="{name:'myzh'}">
					<input readonly="readonly" class="inps" type="text" placeholder="" v-model="myz" />
					<img class="po_right" src="../../../static/img/Shape.png"/>
				</router-link>
			</div>
			<div class="ele">
				<label class="tit">发货地</label>
				<input class="inps" type="text" placeholder="请输入发货地" v-model="fhd" />
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
				<input class="inps" type="text" placeholder="请输入联系方式" v-model="lxfs" />
			</div>
			<div class="ele">
				<label class="tit">护照信息</label>
				<input class="inps" type="text" placeholder="请输入护照信息" v-model="hzxx" />
			</div>
			<div class="ele">
				<span class="tit">是否需要上门服务</span>
				<mt-switch @change="serve_switch" class="my-switch" v-model="smfw"></mt-switch>
			</div>
			<div v-show="addr" class="ele">
				<label class="tit">地址</label>
				<input class="inps1" type="text" placeholder="请输入地址" v-model="dz" />
			</div>
			<div class="ele-s">
				<button @click="shenbao" class="shenbao">申报</button>
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
				imageUrl: '',
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
				chip:"",
				sizes:"",
				cwzl:"",
				cwnl:"",
				cwmz:"",
				cwpz:"",
				/*属性结束*/
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
			        name: '大型犬',
			        method: this.size1
			      }, {
			        name: '中型犬',
			        method: this.size2
			      }, {
			        name: '小型犬',
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
		        sheetVisible2: false,
		        sheetVisible1:false,
			}
		},
	    beforeRouteLeave(to, from, next) {
	        // 设置下一个路由的 meta
        	to.meta.keepAlive = true;
	        next();
	    },
	    activated() {
			
		},
		methods: {
			handleAvatarSuccess(res, file) {
		        console.log(res.data)
		        this.imageUrl = res.data;
		    },
			chip1(){
				this.chip = '是'
			},
			chip2(){
				this.chip = '否'
			},
			size1(){
				this.sizes = '大型犬'
			},
			size2(){
				this.sizes = '中型犬'
			},
			size3(){
				this.sizes = '小型犬'
			},
			sfblgz1() {
		        this.sfblgz = '是'
		    },
			sfblgz2() {
		        this.sfblgz = '否'
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
				}
				this.sheetVisible2 = !this.sheetVisible2;
			},
			shenbao(){
				var check = true;
				var input = document.querySelectorAll('.inps');
				var label = document.getElementsByTagName('label');
				/*for(var i =0;i < input.length;i++){
				    if (input[i].value == "") {
				    	Toast('请填写'+label[i].innerHTML)
				    	check = false;
				    	return;
				    }
				}*/
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
					var data = JSON.stringify({
							endCity:this.area,
							flightDate:this.riqi,
							homeDelivery:sfxysmfu,
							ownerIdNo:this.sfzh,
							ownerName:this.zrxm,
							ownerPassport:this.hzxx,
							ownerTelNo:this.lxfs,
							petAge:this.cwnl,
							petBreed:this.cwpz,
							petCertificate:this.sfblgz,
							petChip:xfzrxp,
							petName:this.cwmz,
							petPicture:this.imageUrl,
							petSize:this.sizes,
							petType:this.varietys,
							petVaccineLastTime:this.myz,
							petVaccinePics:[],
							petWeight:this.cwzl,
							startCity:this.fhd,
					});
					axios({
						method: 'POST',
						data:data,
						url: '/eport-server/delivery/pet/saveOrder.do',
						dataType: 'json',
						headers: {
				            'Content-Type': 'application/json;charset=UTF-8'
				        },
						then: function(data1) {
							Toast("申报成功")
						}
					})
				}
			}
		},
		mounted() {
		},
		created: function() {
		    Bus.$on('area', (e) => {
		    	this.area = e;
		    })
		    Bus.$on('myz', (e) => {
		　　　　this.myz = e;
		    })
		    Bus.$on('riqi', (e) => {
		　　　　this.riqi = e;
		    })
		    Bus.$on('varietys', (e) => {
		　　　　this.varietys = e;
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
		color: #FFB540;
	    background: #fff5e5;
	    font-size: 13px;
	    line-height: 22px;
	    padding: 7px 12px;
	}
	#soll{
	    position: fixed;
	    width: 100%;
	    overflow: auto;
	    height: 100%;
	}
	.points{
	    padding: 10px;
	    height: 40px;
	    line-height: 23px;
	    font-size: 16px;
	    background-color: #eee;
	    color: #a5a5a5;
	}
	.ele1{
	    margin: 0 10px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    height: 95px;
	    line-height: 95px;
	    font-size: 16px;
	}
	.ele{
	    margin: 0px 10px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    height: 46px;
	    line-height: 45px;
	    font-size: 16px;
	}
	.tit{
		color: #333;
	}
	.inps{
	    width: 60%;
	    position: absolute;
	    right: 7px;
	    top: 8px;
	    height: 30px;
	    border: 0;
	    outline: none;
	    font-size: 16px;
	    color: #777;
	}
	.inps1{
	    width: 60%;
	    position: absolute;
	    right: 7px;
	    top: 8px;
	    height: 30px;
	    border: 0;
	    outline: none;
	    font-size: 16px;
	    color: #777;
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
	    top: 9px;
	    right: 2px;
	}
	.ele-s{
	    padding: 25px 19px;
    	background: #f0f0f0;
	}
	.shenbao{
	    border: 0;
	    background: #285fb1;
	    color: #fff;
	    width: 100%;
	    height: 45px;
	    font-size: 16px;
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
  }
 .avatar{
    width: 64pt;
    height: 64pt;
    display: block;
    margin-top: 5px;
    float: right;
    margin-right: 18px;
}
</style>