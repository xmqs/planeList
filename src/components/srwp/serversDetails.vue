<template>
	<div id="serversDetails">
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			服务详情
			<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header> -->
		<div id="soll" class="page-tab-container">
			<p class="points1">如需更改服务请拨打电话025-521637463</p>
			<div id="overflow">
		  		<div class="ele2">
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
						<div style="position: absolute;right: 3vw;top: 4vw;" v-for="(ele,index) in element.options" v-if="ele.checked != null" class="price">{{ele.title}}</div>
		  			</div>
		  			<!--<div class="ele2-3">
						<div class="tishi">上面提货</div>
						<div class="yaoqiu">根据距离收取相应费用</div>
						<div class="price">普通￥20</div>
		  			</div>-->
		  			<div class="ele2-4">
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
						<div class="rio"><div v-for="(ele,index) in element.options" class="price">{{ele.title}}</div></div>
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
	        endCity:'',
	        petName:'',
	        startCity:'',
	        createTime:'',
	        homeAddress:'',
	    }
    },
	methods:{
		// goback(){
		// 	this.$router.push({name: 'srwp_list',
		// 		params:{ 
		// 			res:'tab-container3'
		// 		}
		// 	})
		// },
		getList(){//获取服务列表
			var that = this;
			axios.get('/eport-server/delivery/queryServices.do', {
				params: {
					id:that.orderNo,
					type:'2'
				}
			}).then(function(data) {
				that.lists = data.data.data;
				for (var i=0;i<that.lists.length;i++) {
					if (that.lists[i].options[0].checked == null && that.lists[i].options[1].checked == null) {
						that.lists2.push(that.lists[i])
						that.lists1.push(that.lists[i])
					} else{
						that.lists1.push(that.lists[i])
					}
				}
			})
		},
		getdetails(){
			var that = this;
			axios.get('/eport-server/delivery/luggage/queryOrderById.do', {
				params: {
					orderNo :that.orderNo
				}
			}).then(function(data) {
				that.endCity = data.data.data.endCity;
				that.petName = data.data.data.ownerName;
				that.startCity = data.data.data.startCity;
				that.createTime = data.data.data.createTime
				that.homeAddress = data.data.data.homeAddress
			});
		}
	},
	created: function(){
		this.orderNo = this.$route.params.id;
	    setTimeout(() => {
			this.getList();
			this.getdetails();
	    },100)
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
		position: relative;
	}
	.ele3{
        padding: 12px 12px 7px 12px;
	    background-color: #fff;
	}
	.ele4{
    width: 100%;
    margin: auto;
    height: 8.267vw;
    text-align: center;
    line-height: 11.267vw;
    font-size: 3.967vw;
    color: #333;
	}
	.points1{
	color: #ffb540;
    background: #fff5e5;
    font-size: 3.833vw;
    line-height: 2.933vw;
    padding: 3.833vw 1.6vw 3.833vw 5.6vw !important;
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
		padding:2.8vw;
		position: relative;
	}
	.rio{
		position: absolute;
		right: 3vw;
		top: 3.5vw;
	}
	.ele2-4{
		width: 100%;
		height: 8.2vw;
		line-height: 8.2vw;
		font-size: 4.133vw;
		color: #333;
		padding-left: 2vw;
	}
	.ele2-2{
		padding: 7px;
	}
	.pet-name{
	font-size: 4.767vw;
    color: #333;
    width: 51vw;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
	}
	.pet-where{
    font-size: 3.867vw;
    color: #999;
    position: absolute;
    bottom: 3vw;
	}
	.pet-time{
    position: absolute;
    top: 3.333vw;
    right: 2vw;
    color: #999;
    font-size: 4.2vw;
	}
	
	.tishi,.yaoqiu{
		font-size: 4.267vw;
		color: #333;
	}
	.yaoqiu{
		padding-top: 2.933vw;
		color: #999;
    	font-size: 3.867vw;
    	width: 70%;
	}
	.price{
	    font-size: 4vw;
	    color: #333;
	}
	.addr{
		float: left;
	}
	.addr1{
		margin-left: 24px;
		color: #999;
	}
</style>