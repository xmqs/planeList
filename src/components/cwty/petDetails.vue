<template>
	<div id="pet_details">
		<!--头部临时用-->
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 99;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			订单详情
				<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header>
		<!--内容-->
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<div class="ele1">
				<img class="pet-img pet-inf" src="../../../static/img/Group 5.png"/>
				<div class="pet-inf pet-inf1">
					<div class="pet_name">嘟嘟</div>
					<div class="pet_pz">品种:金毛犬；年龄:8岁；体重:16公斤</div>
					<div class="pet_tx">体型:中型犬</div>
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
				<label class="tit">身份证号</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sfzh" />
			</div>
			<div class="ele">
				<label class="tit">联系方式</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="lxfs" />
			</div>
			<div class="ele">
				<label class="tit">护照信息</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="hzxx" />
			</div>
			<div class="ele">
				<label class="tit">是否需要上门服务</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sfxy" />
			</div>
			<div v-if="sfxy != ''" class="ele">
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

				list:[],
				ids:"",
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
						orderNo :'3C9559D9CE7D4FEE90308DF15E11DC16'
					}
				}).then(function(data) {
					that.area = data.data.data.endCity;
					that.riqi = data.data.data.flightDate;
					that.sfxysmfu = data.data.data.homeDelivery;
					that.sfzh = data.data.data.ownerIdNo;
					that.zrxm = data.data.data.ownerName;
					that.hzxx = data.data.data.ownerPassport;
					that.lxfs = data.data.data.ownerTelNo;
					that.cwnl = data.data.data.petAge;
					that.cwpz = data.data.data.petBreed;
					that.sfblgz = data.data.data.petCertificate;
					that.xfzrxp = data.data.data.petChip;
					that.cwmz = data.data.data.petName;
					that.sizes = data.data.data.petSize;
					that.varietys = data.data.data.petType;
					that.myz = data.data.data.petVaccineLastTime;
					that.cwzl = data.data.data.petWeight;
					that.fhd = data.data.data.startCity;
				})
			}
		},
		mounted() {
		    Bus.$on('list', (e) => {
		    	this.ids = e;
		    })
		},
		created: function() {
			this.getdetails();
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
	    height: 44px;
	    line-height: 44px;
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
	.pet-img{
	    margin-top: 7px;
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
	}
	.pet-inf{
		float: left;
	}
	.pet_name{
		color: #333;
   		font-weight: 600;
	}
	.pet-inf{
		height: 94px;
	    padding: 9px;
	    margin: 0;
	    line-height: 25px;
	    font-size: 15px;
	    color: #999;
	}
</style>