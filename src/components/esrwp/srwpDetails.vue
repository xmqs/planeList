<template>
	<!--选择要看的新闻类型-->
	<div id="srwp_input">
		<!--头部临时用-->
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			物品申报
			<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header> -->
		<div style="position: fixed;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;" v-show="lod">
			正在加载,请稍后...
		</div>
		<!--内容-->
		<div id="soll" class="page-tab-container">
			<div class="points">
				<span class="">物品信息</span>
			</div>
			<div class="ele">
				<label class="tit">物品清单</label>
				<div style="line-height: 33px;" @click="disWplist(packages)" class="inps">
					<span v-for="(ele,index) in packages">
						<span v-if="index == 0">
							{{ele.name}}
						</span>
						<span v-else>
							,{{ele.name}}
						</span>
					</span>
				</div>
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">总重量(kg)</label>
				<input readonly="readonly" class="inps" type="text" placeholder="请输入物品总重量" v-model="weight" />
			</div>
			<div class="ele">
				<label class="tit">外包装尺寸(米)</label>
				<input readonly="readonly" class="inps" type="text" placeholder="请输入外包装尺寸" v-model="size" />
			</div>
			<div class="ele">
				<label class="tit">发货地</label>
				<input readonly="readonly" class="inps" type="text" placeholder="请输入发货地" v-model="startCity" />
			</div>
			<div class="ele">
				<label class="tit">目的城市</label>
				<input readonly="readonly" class="inps" type="text" placeholder="请输入发货地" v-model="endCity" />
			</div>
			<div class="points">
				<span class="">主人信息</span>
			</div>
			<div class="ele">
				<label class="tit">姓名</label>
				<input readonly="readonly" class="inps" type="text" placeholder="请输入姓名" v-model="ownerName" />
			</div>
			<div class="ele">
				<label class="tit">身份证号</label>
				<input readonly="readonly" class="inps" type="text" placeholder="请输入身份证号" v-model="ownerIdNo" />
			</div>
			<div class="ele">
				<label class="tit">联系方式</label>
				<input readonly="readonly" class="inps" type="text" placeholder="请输入联系方式" v-model="ownerTelNo" />
			</div>
			<div class="ele">
				<label class="tit">护照信息</label>
				<input readonly="readonly" class="inps" type="text" placeholder="请输入护照信息" v-model="ownerPassport" />
			</div>
			<div class="ele">
				<label class="tit">是否需要上门服务</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sfxy" />
			</div>
			<div v-if="sfxy == '是'" class="ele">
				<label class="tit">地址</label>
				<input readonly="readonly" class="inps1" type="text" placeholder="请输入地址" v-model="homeAddress" />
			</div>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	import { Toast } from 'mint-ui';
	import { formatDate } from '../../assets/js/date.js';
	import Bus from './bus.js'
	export default {
		name: "srwp_input",
		data() {
			return {
				/*属性*/
				packages:[],
				weight:'',
				size:'',
				startCity:'',
				endCity:'',
				ownerName:'',
				ownerIdNo:'',
				ownerPassport:'',
				homeAddress:'',
				ownerTelNo:'',
		        bigPackageList:[],
		        travelList1:'',
		        travelList2:'',
		        travelList:[],
		        ids:'',
		        sfxy:'',
				/*属性结束*/
				value:"",
				homeDelivery:false,
		        packagesName:'',
				lod:true
			}
		},
	    activated() {
			
		},
		methods: {
			goback(){
				this.$router.push({name: 'srwp_list',
					params:{ 
						res:'tab-container1'
					}
				})
			},
			//图片上传
			handleAvatarSuccess(res, file) {
		        this.bigPackageList.push(res.data);
		    },
		    handbefore(){
		    	
		    },
			handleAvatarSuccess1(res, file) {
		        this.travelList1 = res.data;
		    },
		    handbefore1(){
		    	
		    },
			handleAvatarSuccess2(res, file) {
		        this.travelList2 = res.data;
		    },
		    handbefore2(){
		    	
		    },
			disWplist(res){
				setTimeout(() => {
			        Bus.$emit('disWplist', res,this.ids)
			    }, 30)
				this.$router.push({path: '/srwp/disWplist'})
			},
			getDetails(){
				var that = this;
				axios.get('/eport-server/delivery/luggage/queryOrderById.do', {
					params: {
						orderNo :that.ids
					}
				}).then(function(data) {
					that.packages = data.data.data.packages;
					that.weight = data.data.data.weight;
					that.size = data.data.data.size;
					that.startCity = data.data.data.startCity;
					that.endCity = data.data.data.endCity;
					that.ownerName = data.data.data.ownerName;
					that.ownerIdNo = data.data.data.ownerIdNo;
					that.ownerPassport = data.data.data.ownerPassport;
					that.homeAddress = data.data.data.homeAddress;
					that.switch1 = data.data.data.homeDelivery;
					if (data.data.data.homeDelivery == 1) {
						that.sfxy = '是'
					} else{
						that.sfxy = '否'
					}
					that.ownerTelNo = data.data.data.ownerTelNo;
					that.bigPackageList = data.data.data.bigPackageList;
					that.travelList = data.data.data.travelList;
					setTimeout(()=>{
						that.lod = false;
					},100);
				})
			}
		},
		mounted() {
		},
		created: function() {
		    Bus.$on('area', (e) => {
		    	this.endCity = e;
		    })
		    Bus.$on('wplist1', (e) => {
		    	this.packages = e;
		    })
			this.ids = this.$route.params.id;
		    setTimeout(() => {
		        this.getDetails();
		    },100)
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
	#soll{
	    position: fixed;
	    width: 100%;
	    overflow: auto;
	    height: 100%;
	}
	.points{
	    padding: 0px 20px;
	    height: 80px;
	    line-height: 80px;
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