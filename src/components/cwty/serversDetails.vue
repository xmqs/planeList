<template>
	<div id="serversDetails">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			服务详情
			<router-link :to="{path: '/cwty/cwty_list/'+'tab-container3'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header>
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<p class="points1">如需更改服务请拨打电话025-521637463</p>
			<div id="overflow">
		  		<div class="ele2">
		  			<div class="ele2-1">
		  				<img class="pet-img" :src="petPicture"/>
		  			</div>
		  			<div class="ele2-1 ele2-2">
			  			<p class="pet-name">{{petName}}</p>
			  			<p class="pet-where">{{startCity}}->{{endCity}}</p>
			  			<p class="pet-time">{{createTime}}</p>
		  			</div>
		  		</div>
		  		<div style="margin-top: 11px;" class="ele3">
		  			<div v-for="(element,index) in lists1" class="ele2-3">
						<div class="tishi">{{element.title}}</div>
						<div class="yaoqiu">{{element.description}}</div>
						<div v-for="(ele,index) in element.options" v-if="ele.checked != null" class="price">{{ele.title}}</div>
		  			</div>
		  			<!--<div class="ele2-3">
						<div class="tishi">上面提货</div>
						<div class="yaoqiu">根据距离收取相应费用</div>
						<div class="price">普通￥20</div>
		  			</div>-->
		  			<div v-if="homeAddress != null" class="ele2-4">
						<div class="addr">地址</div>
						<div class="addr addr1">{{homeAddress}}</div>
		  			</div>
		  		</div>
		  		<div class="ele4">
		  			其他收费服务
		  		</div>
		  		<div style="margin-top: 11px;" class="ele3">
		  			<div v-for="(element,index) in lists2" class="ele2-3">
						<div class="tishi">{{element.title}}</div>
						<div class="yaoqiu">{{element.description}}</div>
						<div v-for="(ele,index) in element.options" class="price">{{ele.title}}</div>
		  			</div>
		  			<!--<div class="ele2-3">
						<div class="tishi">上面提货</div>
						<div class="yaoqiu">根据距离收取相应费用</div>
						<div class="price">普通￥20</div>
						<div class="price">加急￥28</div>
		  			</div>
		  			<div class="ele2-3">
						<div class="tishi">上面提货</div>
						<div class="yaoqiu">根据距离收取相应费用</div>
						<div class="price">普通￥20</div>
						<div class="price">加急￥28</div>
		  			</div>
		  			<div class="ele2-3">
						<div class="tishi">上面提货</div>
						<div class="yaoqiu">根据距离收取相应费用</div>
						<div class="price">普通￥20</div>
						<div class="price">加急￥28</div>
		  			</div>-->
		  		</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { formatDate } from '../../assets/js/date.js';
import Bus from './bus.js'
export default {
    name: "serversDetails",
    data(){
	    return{
	        varietys:"1",
	        gou1:false,
	        gou2:false,
	        lists:[],
	        lists1:[],
	        lists2:[],
	        petPicture:'',
	        endCity:'',
	        petName:'',
	        startCity:'',
	        createTime:'',
	        homeAddress:'',
	    }
    },
	methods:{
		getList(){//获取服务列表
			var that = this;
			axios.get('/eport-server/delivery/queryServices.do', {
				params: {
					id:this.orderNo,
					type:'1'
				}
			}).then(function(data) {
				that.lists = data.data.data;
				for (var i=0;i<that.lists.length;i++) {
					if (that.lists[i].options[0].checked == null && that.lists[i].options[1].checked == null) {
						that.lists2.push(that.lists[i])
					} else{
						that.lists1.push(that.lists[i])
					}
				}
			})
		},
		getdetails(){
			var that = this;
			axios.get('/eport-server/delivery/pet/queryOrderById.do', {
				params: {
					orderNo :this.orderNo
				}
			}).then(function(data) {
				that.petPicture = data.data.data.petPicture[0];
				that.endCity = data.data.data.endCity;
				that.petName = data.data.data.petName;
				that.startCity = data.data.data.startCity;
				that.createTime = data.data.data.createTime;
				that.homeAddress = data.data.data.homeAddress;
			})
		}
	},
	created: function(){
	    Bus.$on('serversDetailsId', (e) => {
	    	this.orderNo = e;
	    })
	    setTimeout(() => {
			this.getList();
			this.getdetails();
	    },100)
	}
}
</script>
<style scoped>
	*{
		font-family: PingFangSC;
	}
	#serversDetails{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
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
	    padding-bottom: 15px;
	}
	.ele2{
		height: 80pt;
        padding: 12px 12px 7px 12px;
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
	    color: #FFB540;
	    background: #fff5e5;
	    font-size: 13px;
	    line-height: 22px;
	    padding: 7px 12px;
	}
	.pet-img{
	    width: 67pt;
    	height: 64pt;
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
		padding: 7px;
	}
	.pet-name{
		font-size: 14pt;
    	color: #333;
	}
	.pet-where{
	    margin-top: 23px;
	    font-size: 14px;
	    color: #999;
	}
	.pet-time{
		position: relative;
	    top: -65px;
	    left: 200px;
	    color: #999;
	}
	
	.tishi,.yaoqiu{
		font-size: 17px;
		color: #333;
	}
	.yaoqiu{
		padding-top: 7px;
		color: #999;
    	font-size: 14px;
    	width: 70%;
	}
	.price{
	    font-size: 17px;
	    color: #333;
	    position: relative;
	    top: -52px;
	    left: 270px;
	}
	.addr{
		float: left;
	}
	.addr1{
		margin-left: 24px;
		color: #999;
	}
</style>