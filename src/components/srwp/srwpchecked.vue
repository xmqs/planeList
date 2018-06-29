<template>
	<div id="srwpchecked">
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			托运详情
			<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header> -->
		<div id="soll" class="page-tab-container">
			<div id="overflow">
		  		<div class="ele2">
		  			<div class="ele2-1">
		  				<img class="pet-img" :src="bigPackageList"/>
		  			</div>
		  			<div class="ele2-1 ele2-2">
			  			<p class="pet-state">已托运</p>
			  			<p class="pet-name">
			  				<span>{{ownerName}}</span>
			  			</p>
			  			<p class="pet-where">{{startCity}}->{{endCity}}</p>
		  			</div>
		  		</div>
	  			<div class="ele3">
	  				<table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
	  					<tr v-for="(element,index) in logistics" v-if="index == 0">
	  						<td class="ele3-1" style="width: 30%;"><div class="order_time"><div style="position: absolute;top: 0;">{{element.createTime}}</div></div><img class="yuan" src="../../../static/img/yuan.png"/></td>
	  						<td style="border-left: 2px dotted rgb(119, 119, 119);">
	  							<div style="color:#285FB1;font-size:14px;" class="state">{{element.title}}</div>
	  							<div style="min-height: 60px;border-right: 0px solid #ccc;" class="stateCon">{{element.detail}}
	  								<div style="margin: 12px 8px;">
	  									<img class="petimg" v-for="ele in element.images" :src="ele"/>
	  								</div>
	  							</div>
	  						</td>
	  					</tr>
	  					<tr v-else-if="index != 0">
	  						<td class="ele3-1"><div class="order_time order_time1"><div style="position: absolute;top: 0;">{{element.createTime}}</div></div><img class="yuan" src="../../../static/img/yuan1.png"/></td>
	  						<td style="border-left: 1px solid #ccc;">
								<div style="min-height: 82px;">
								    <div class="state order_time1-1">{{element.title}}</div>
								    <div class="stateCon order_time1-1">{{element.detail}}</div>
	  								<div style="margin:12px 8px;">
	  									<img class="petimg" v-for="ele in element.images" :src="ele"/>
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
    name: "srwpchecked",
    data(){
	    return{
	        varietys:"1",
	        logistics:[],
	        petimg1:'',
			petimg2:'',
			bigPackageList:'',
			endCity:'',
			ownerName:'',
			startCity:'',
			createTime:''
	    }
    },
	created: function() {
	    setTimeout(() => {
			this.getList();
			this.getdetails();
	    }, 100)
	},
	methods:{
		goback(){
			this.$router.push({name: 'srwp_list',
				params:{
					res:'tab-container3'
				}
			})
		},
		getList(){
			var that = this;
			var id = that.$route.params.id;
			axios.get('/eport-server/delivery/queryDelivery.do', {
				params: {
					id:id,
					tyep:'2'
				}
			}).then(function(data) {
				if(data.data.data != null){
					that.logistics = data.data.data.logistics;
				}
			})
		},
		getdetails(){
			var that = this;
			axios.get('/eport-server/delivery/luggage/queryOrderById.do', {
				params: {
					orderNo :that.$route.params.id
				}
			}).then(function(data) {
				that.bigPackageList = data.data.data.bigPackageList[0];
				that.endCity = data.data.data.endCity;
				that.ownerName = data.data.data.ownerName;
				that.startCity = data.data.data.startCity;
				that.createTime = data.data.data.createTime;
			});
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
    height: 21.5vw;
    padding: 3vw 3.733vw 0 3.733vw;
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
		padding: 0 7px 7px 17px;
	}
	.pet-name{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-size:28px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);    
		margin: 1.7vw 0 0 0;
	}
	.pet-state{
		margin-top: 0;
		margin-bottom: 0;
	}
	.pet-where{
	    margin-top: 42px;
	    font-size:28px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
		margin: 1.7vw 0 0 0;
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
	    font-size:26px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
	}
	.stateCon{
		padding-left: 35px;
		padding-top: 2vw;
	    text-align: left;
	    color: #285FB1;
	    font-size: 14px;
	}
	.yuan{
    position: absolute;
    top: .167vw;
    left: 27vw;
	}
	.petimg{
		width: 120px;
		height: 120px;
	    margin-left: 20px;
	}
</style>