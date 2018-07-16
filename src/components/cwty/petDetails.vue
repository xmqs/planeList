<template>
	<div id="pet_details">
		<!--头部临时用-->
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 99;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			订单详情
				<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header> -->
		<div style="position: fixed;top: 80px;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;" v-show="lod">
			正在加载,请稍后...
		</div>
		<!--内容-->
		<div id="soll" class="page-tab-container">
			<div class="ele1">
				<img style="width:75px;height: 75px;" class="pet-img pet-inf" :src="cwzp"/>
				<div class="pet-inf pet-inf1">
					<div class="pet_name">{{cwmz}}</div>
					<div class="pet_pz">品种:{{cwpz}}；年龄:{{cwnl}}；体重:{{cwzl}}公斤； 体型:{{sizes}}</div>
					<div class="pet_tx"></div>
				</div>
			</div>
			<div class="ele">
				<label class="tit">是否已办理狗证</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sfblgz" />
			</div>
			<div class="ele">
				<label class="tit">是否已植入芯片</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="chip" />
			</div>
			<div class="ele">
				<label class="tit">免疫证</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="myz" />
			</div>
			<div class="ele">
				<label class="tit">发货地</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="fhd" />
			</div>
			<div class="ele">
				<label class="tit">选择目的城市</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="area" />
			</div>
			<div style="border-bottom:0" class="ele">
				<label class="tit">航班日期</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="riqi" />
			</div>
			<div class="points">
				<span class="">主人信息</span>
			</div>
			<div class="ele">
				<label class="tit">姓名</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="zrxm" />
			</div>
			<div class="ele">
				<label class="tit">联系方式</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="lxfs" />
			</div>
			<div class="ele">
				<label class="tit">机票信息</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="jpxx" />
			</div>
			<div class="ele">
				<label class="tit">护照信息</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="hzxx" />
			</div>
			<div class="ele">
				<label class="tit">是否需要上门服务</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sfxy" />
			</div>
			<div v-if="sfxy == '是'" class="ele">
				<label class="tit">地址</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="dz" />
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { formatDate } from '../../assets/js/date.js';
	import Bus from './bus.js'
	export default {
		name: "pet_details",
		data() {
			return {
				/*属性*/
				dz:"",
				cwzp:'',
				smfw:false,
				hzxx:"",
		        varietys:"",
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
				sfxy:"",
				jpxx:'',

				list:[],
				ids:"",
				lod:true
			}
		},
	    activated() {
	    	
		},
		methods: {
			goback(){
				this.$router.back(-1)
			},
			getdetails(){
				var that = this;
				axios.get('/eport-server/delivery/pet/queryOrderById.do', {
					params: {
						orderNo :this.ids
					}
				}).then(function(data) {
					that.cwzp = data.data.data.petPicture;
					that.area = data.data.data.endCity;
					that.riqi = data.data.data.flightDate;
					if (data.data.data.homeDelivery == 1) {
						that.sfxy = '是'
					} else{
						that.sfxy = '否'
					}
					that.jpxx = data.data.data.picketInfo;
					that.sfzh = data.data.data.ownerIdNo;
					that.zrxm = data.data.data.ownerName;
					that.hzxx = data.data.data.ownerPassport;
					that.lxfs = data.data.data.ownerTelNo;
					that.cwnl = data.data.data.petAge;
					that.cwpz = data.data.data.petBreed;
					that.sfblgz = data.data.data.petCertificate;
					if (data.data.data.petChip == 0) {
						that.chip = '否'
					} else{
						that.chip = '是'
					}
					that.cwmz = data.data.data.petName;
					that.sizes = data.data.data.petSize;
					that.varietys = data.data.data.petType;
					that.myz = data.data.data.petVaccineLastTime;
					that.cwzl = data.data.data.petWeight;
					that.fhd = data.data.data.startCity;
					that.dz = data.data.data.homeAddress;
					setTimeout(()=>{
						that.lod = false;
					},100);
				})
			}
		},
		mounted() {
		    Bus.$on('list', (e) => {
		    	this.ids = e;
		    })
		    setTimeout(() => {
		        this.getdetails();
		    },100)
		},
		created: function() {
		},
		filters: {
			
		}
	}
</script>

<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	*{
		font-family: PingFangSC;
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
	    line-height: 85px;
		font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
	}
	.ele2{
	    margin: 0 20px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    height: 326px;
	    line-height: 85px;
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
	    top: 0;
	    left: 0;
	    height: 154px;
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
	.pet-inf{
		float: left;
	}
	.pet_name{
		color: #333;
   		font-weight: 600;
   		font-size: 32px;
	}
	.pet-inf{
	    padding: 9px;
	    margin: 0;
	    font-size: 15px;
	    color: #999;
	}
	.pet_pz{
		word-wrap: break-word;
	}
	.pet-inf1{
    position: absolute;
    left: 23vw;
    width: 72%;
        line-height: 46px;
    font-size: 28px;
	}
</style>