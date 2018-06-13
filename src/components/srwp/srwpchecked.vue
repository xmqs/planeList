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
			  			<p class="pet-name">已托运</p>
			  			<p class="pet-time">
			  				<span>{{ownerName}}</span>
			  			</p>
			  			<p class="pet-where">{{startCity}}->{{endCity}}</p>
		  			</div>
		  		</div>
	  			<div class="ele3">
	  				<table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
	  					<tr v-for="(element,index) in logistics" v-if="index == 0">
	  						<td class="ele3-1" style="width: 22%;"><div class="order_time">{{element.date}}<br />11:04</div><img class="yuan" src="../../../static/img/yuan.png"/></td>
	  						<td style="">
	  							<div class="state">{{element.title}}</div>
	  							<div style="min-height: 90px;border-right: 0px solid #ccc;border-left: 2px dotted #777;" class="stateCon">{{element.detail}}
	  								<div style="margin: 7px 0 0 -19px;">
	  									<img class="petimg" v-for="ele in element.images" :src="ele"/>
	  								</div>
	  							</div>
	  						</td>
	  					</tr>
	  					<tr v-else-if="index != 0">
	  						<td class="ele3-1" style="width: 22%;border-right: 1px solid #ccc;"><div class="order_time order_time1"><br />11:04</div><img class="yuan" src="../../../static/img/yuan1.png"/></td>
	  						<td style="width: 75%;"><div class="state order_time1-1">{{element.title}}</div><div class="stateCon order_time1-1">{{element.detail}}</div></td>
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
		height: 80pt;
        padding: 12px 12px 7px 12px;
	    background-color: #fff;
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
	    height: 60px;
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
    	color: #237cd7;
	}
	.pet-where{
	    margin-top: 4px;
	    font-size: 4vw;
	    color: #999;
	}
	.pet-time{
	    font-size: 4vw;
	    color: #999;
	    margin-top: 5px;
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
	    height: 100px;
	    text-align: center;
	    color: #285FB1;
	    font-size: 14px;
	}
	.order_time1{
	    color: #999 !important;
	}
	.order_time1-1{
	    color: #999 !important;
	}
	.order_time2{
		border-right: 0px dotted #777 !important;
	}
	table tr:last-child td{
		border-right: 0px solid #ccc !important;
	}
	.state{
		padding-left: 4.667vw;
		text-align: left;
		color: #285fb1;
		font-size: 4.367vw;
	    height: 20px;
	    font-weight: 600;
	}
	.stateCon{
	    text-align: left;
	    color: #285FB1;
		 padding-left: 2.667vw;
		font-size: 3.5vw;
		padding: 4.2vw;
	}
	.yuan{
		position: absolute;
		top: .267vw;
		left: 19.2vw;
	}
	.petimg{
		width: 45px;
		height: 45px;
	    margin-left: 20px;
	}
</style>