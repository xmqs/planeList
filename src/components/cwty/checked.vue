<template>
	<div id="checked">
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			托运详情
			<router-link :to="{path: '/cwty/cwty_list/'+'tab-container3'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header> -->
		<div id="soll" class="page-tab-container">
			<div id="overflow">
		  		<div class="ele2">
		  			<div class="ele2-1">
		  				<img class="pet-img" :src="petPicture"/>
		  			</div>
		  			<div class="ele2-1 ele2-2">
			  			<p class="pet-name">{{list.petName}}</p>
			  			<p class="pet-where">{{list.startCity}}->{{list.endCity}}</p>
			  			<p class="pet-time">{{list.createTime}}</p>
		  			</div>
		  		</div>
	  			<div class="ele3">
	  				<table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
	  					<tr v-for="(element,index) in logistics" v-if="index == 0" :key="index">
	  						<td class="ele3-1" style="width:30%;"><div class="order_time"><div style="position: absolute;top: 0;left:7px;">{{element.createTime | spilt1}}<br />{{element.createTime | spilt2}}</div></div><img class="yuan" src="../../../static/img/yuan.png"/></td>
	  						<td style="border-left: 2px dotted rgb(119, 119, 119);">
	  							<div style="color:#285FB1;font-size:16px;" class="state">{{element.title}}</div>
	  							<div v-if="element.title == '已托运'" style="color:#285FB1;font-size:14px;" class="state">宠物已托运，运单号{{courierNo}}</div>
	  							<div style="min-height: 60px;border-right: 0px solid #ccc;" class="stateCon">{{element.detail}}
	  								<div style="margin: 12px 8px;">
	  									<img class="petimg" v-for="(ele,index) in element.images" :src="ele" :key="index"/>
	  								</div>
	  							</div>
	  						</td>
	  					</tr>
	  					<tr v-else-if="index != 0">
	  						<td class="ele3-1" style="width: 30%;"><div class="order_time order_time1"><div style="position: absolute;top: 0;left:7px;">{{element.createTime | spilt1}}<br />{{element.createTime | spilt2}}</div></div><img class="yuan" src="../../../static/img/yuan1.png"/></td>
	  						<td style="border-left: 1px solid #ccc;">
								<div style="min-height: 82px;">
									<div class="state order_time1-1">{{element.title}}</div>
	  								<div v-if="element.title == '已托运'" style="font-size:14px;" class="state">宠物已托运，运单号：{{courierNo}}</div>
									<div class="stateCon order_time1-1">{{element.detail}}</div>
	  								<div style="margin:12px 8px;">
	  									<img class="petimg" v-for="(ele,index) in element.images" :src="ele" :key="index"/>
	  								</div>
								</div>
							</td>
	  					</tr>
	  				</table>
	  			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
import Bus from '../cwty/bus.js'
export default {
    name: "checked",
    data(){
	    return{
	        varietys:"1",
	        logistics:[],
	        petimg1:'',
	        petimg2:'',
			list:[],
			petPicture:'',
			courierNo:''
	    }
    },
	filters: {
		spilt1(res){
			var time = res.substring(0,10)
			return time;
		},
		spilt2(res){
			var time = res.substring(11,16)
			return time;
		}
	},
	created: function() {
	    Bus.$on('element', (e) => {
			this.list = e;
			this.petPicture = this.list.petPicture;
			this.getList();
	    })
	},
	methods:{
		getList(){
			var that = this;
			axios.get('/eport-server/delivery/queryDelivery.do', {
				params: {
					id:that.list.id,
					type:'1'
				}
			}).then(function(data) {
				that.logistics = data.data.data.logistics;
				that.courierNo = data.data.data.courierNo;
	    		console.log(that.logistics)
			})
		}
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
	#checked{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	#soll{
		padding: 0;
		width: 100%;
		height: 100%;
	}
	#overflow{
		width: 100%;
	    height: 100%;
	    overflow-y: auto;
	    overflow-x: hidden;
	    padding-bottom: 15px;
	}
	.ele2{
		height: 200px;
        padding: 28px 28px 20px 28px;
	    background-color: #fff;
	}
	.ele3{
        padding: 12px 12px 7px 12px;
	    background-color: #fff;
	}
	.ele4{
	    width: 100%;
	    margin: auto;
	    height: 50px;
	    text-align: center;
	    line-height: 50px;
	    font-size: 17px;
	    color: #333;
	}
	.points1{
	    background: #fff5e5;
	    line-height: 80px;
	    padding: 0px 22px;
	    height: 80px;
	    font-size:26px;
		font-family:PingFangSC-Regular;
		color:rgba(255,181,64,1);
	}
	.pet-img{
	    width: 150px;
    	height: 142px;
	}
	.ele2-1{
		float: left;
	}
	.ele2-3{
	    width: 100%;
	    min-height: 60px;
	    border-bottom: 1px solid #efefef;
	    margin-bottom: 12px;
	}
	.ele2-4{
        width: 100%;
	    height: 24px;
	    line-height: 25px;
	    font-size: 16px;
	    color: #333;
	}
	.ele2-2{
		padding: 7px 7px 7px 17px;
	}
	.pet-name{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 240px;
		font-size:32px;
		font-family:PingFangSC-Medium;
		color:rgba(51,51,51,1);
	}
	.pet-where{
	    margin-top: 42px;
	    font-size:28px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
	}
	.pet-time{
		position: relative;
	    top: -120px;
	    left: 260px;
	    font-size:28px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
	}
	.ele3{
		width: 100%;
	    padding: 20px 7px 7px 7px;
	    border-top: 11px solid #f5f5f5;
	}
	.ele3-1{
		position: relative;
	}
	.order_time{
	    text-align: center;
	    color: #285FB1;
	    font-size: 26px;
	}
	.order_time1{
	    color: #999 !important;
	}
	.order_time1-1{
	    color: #999 !important;
	}
	.order_time2{
		border-left: 0px dotted #777 !important;
	}
	table tr:last-child td{
		border-left: 0px solid #ccc !important;
	}
	.state{
		padding-left:35px;
	    text-align: left;
	    font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
	}
	.stateCon{
		padding-left: 35px;
		padding-top: 2vw;
	    text-align: left;
	    color: #285FB1;
	    font-size: 28px;
	}
	.yuan{
    position: absolute;
    top: 0vw;
    left: 27vw;
	width: 36px;
	height: 36px;
	}
	.petimg{
		width: 120px;
		height: 120px;
	    margin-left: 20px;
	}
</style>