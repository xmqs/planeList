<template>
	<!--选择要看的新闻类型-->
	<div id="srwp_input">
		<!--头部临时用-->
		<!--<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			物品申报
			<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header>-->
		<!--内容-->
		<div id="soll" class="page-tab-container">
			<div class="points1">
				<p class="">本平台只提供申办渠道，由用户与托运公司双向自由交易， 平台不承担任何纠纷和法律责任，最终解释权归南京市电子 口岸公司所有。建议与投诉电话：025-521637463</p>
			</div>
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
				})
			}
		},
		mounted() {
		    Bus.$on('area', (e) => {
		    	this.endCity = e;
		    })
		    Bus.$on('wplist1', (e) => {
		    	this.packages = e;
		    })
		    Bus.$on('wplistID', (e) => {
		    	this.ids = e;
		    })
		},
		created: function() {
		    Bus.$on('updateId', (e) => {
		    	this.ids = e;
		    })
		    Bus.$on('list', (e) => {
		    	this.ids = e;
		    })
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
	    height: 282px;
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
        display: inline;
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
	/*图片上传*/
	.avatar-uploader-icon{
	    font-size: 28px;
	    color: #8c939d;
	    width: 80px;
	    height: 80px;
	    line-height: 64pt;
	    text-align: center;
	    border: 1px solid #ccc;
	}
	.avatar{
        margin: 0 5px 7px 13px;
    	border: 1px solid #f8f8f8;
	    width: 80px;
	    height: 80px;
	}
	.el-icon-plus{
	    position: relative;
	    top: 0px;
	    left: 14px;
	    margin-right: 15px;
	}
	.downwarp{
		margin-top: 45%;
	}
	.delect-i{
		position: absolute;
	    top: 0px;
	    right: 3px;
	    width: 25px;
	}
	.item{
		position: relative;
		float: left;
		padding: 7px;
	}
</style>