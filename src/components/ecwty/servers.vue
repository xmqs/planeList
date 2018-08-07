<template>
	<div id="servers">
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			选择服务
				<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header> -->
		<div id="soll" class="page-tab-container">
			<ul>
				<li style="position: relative;" v-for="(element,index) in lists" :key="index">
					<div class="margin" v-if="element.needed == 'true'">
						<div class="tishi">
							<label>
								&nbsp;{{element.title}}
							</label>
						</div>
						<div class="allradio">
							￥{{element.price}}元
							<!-- <label v-for="ele in element.options" v-if="ele.checked == 1" style="float: right;"  :key="ele">
								<input @click="checked($event)" class="cwtyCost" v=0 :value1='ele.key' :id='element.id' :value='ele.value' checked type="radio" :name='element.id'><i><img style="position: relative;top: -1px;width: 22px;" src="./../../../static/img/serg.png" alt=""></i>&nbsp;{{ele.title}}</label>
							<label v-else style="float: right;">
								<input @click="checked($event)" class="cwtyCost" v=0 :value1='ele.key' :id='element.id' :value='ele.value' type="radio" :name='element.id'><i><img style="position: relative;top: -1px;width: 22px;" src="./../../../static/img/serg.png" alt=""></i>&nbsp;{{ele.title}}</label> -->
						</div>
					</div>
					<div class="margin" v-else>
						<div v-if="element.isSelect == 'true'" class="tishi">
							<label>
								<input checked @click="checked($event)" class="cwtyCost" v=1 :id='element.id' :value='element.price' type="radio" :name='index'><i><img style="position: relative;top: -1px;width: 22px;" src="./../../../static/img/serg.png" alt=""></i>&nbsp;{{element.title}}
							</label>
						</div>
						<div v-else class="tishi">
							<label>
								<input @click="checked($event)" class="cwtyCost" v=0 :id='element.id' :value='element.price' type="radio" :name='index'><i><img style="position: relative;top: -1px;width: 22px;" src="./../../../static/img/serg.png" alt=""></i>&nbsp;{{element.title}}
							</label>
						</div>
						<div class="allradio">
							￥{{element.price}}元
							<!-- <label v-for="ele in element.options" v-if="ele.checked == 1" style="float: right;"  :key="ele">
								<input @click="checked($event)" class="cwtyCost" v=0 :value1='ele.key' :id='element.id' :value='ele.value' checked type="radio" :name='element.id'><i><img style="position: relative;top: -1px;width: 22px;" src="./../../../static/img/serg.png" alt=""></i>&nbsp;{{ele.title}}</label>
							<label v-else style="float: right;">
								<input @click="checked($event)" class="cwtyCost" v=0 :value1='ele.key' :id='element.id' :value='ele.value' type="radio" :name='element.id'><i><img style="position: relative;top: -1px;width: 22px;" src="./../../../static/img/serg.png" alt=""></i>&nbsp;{{ele.title}}</label> -->
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="serversOK">
			<span class="allprice">合计金额：<span style="color:#285FB1">¥{{allCost}}</span></span>
			<button @click="submit()" class="shenbao">提交报价</button>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import { Toast } from 'mint-ui';
import { formatDate } from '../../assets/js/date.js';
import Bus from './bus.js'
export default {
    name: "servers",
    data(){
	    return{
	        varietys:"1",
			value:"1",
	        lists:[],
	        orderNo:"",
			allCost:0
	    }
    },
	methods:{
		checked(obj){
			var myv=obj.target.attributes["v"].nodeValue;
			if (myv==0){
				obj.target.setAttribute("v",1);
	            obj.target.checked=true;
	        }else{
				obj.target.setAttribute("v",0);
	            obj.target.checked=false;
			}
			if (obj.target.checked == true) {
				this.allCost += parseInt(obj.target.value)
			}else{
				this.allCost -= parseInt(obj.target.value)
			}
		},
		check: function(){
            console.log(this.value)
        },
		submit(){
			this.cost = 0;
			var sers = [];
			var boxes = document.getElementsByTagName("input");
		    for(var i=0;i<boxes.length;i++){
				var ser = {};
		        if(boxes[i].checked == true){
					ser.isSelect = true;
		        }else{
					ser.isSelect = false;
				}
				ser.serviceId = boxes[i].id;
				sers.push(ser)
			}
			for(var i=0;i<this.lists.length;i++){
				if (this.lists[i].needed == 'true') {
					var ser = {};
					ser.isSelect = true;
					ser.serviceId = this.lists[i].id;
					sers.push(ser)
				}
			}
			var that = this;
			axios.post("/eport-server/delivery/saveServices.do", {
				orderNo:that.orderNo,
				services:sers,
				type:'1'
			}).then((res) => {
				if(res.status == 200) {
					Toast("提交成功");
					setTimeout(() => {
                		this.$router.back(-1)
					},1500)
				}else{
					Toast("提交失败");
				}
			}, (res) => {
			});
		},
		getList(){//获取服务列表
			var that = this;
			axios.get('/eport-server/delivery/queryServices.do', {
				params: {
					id:that.orderNo,
					type:'1'
				}
			}).then(function(data) {
				that.lists = data.data.data;
				for(var i=0;i<that.lists.length;i++){
					if (that.lists[i].isSelect == 'true' || that.lists[i].needed == 'true') {
						that.allCost += parseInt(that.lists[i].price);
					}
				}
			})
		},
		goback(){
			this.$router.push({path: '/cwty/cwty_list/'+'tab-container2'})
		},
	},
	created: function(){
      this.orderNo = this.$route.params.id;
			this.getList();
	},
	mounted() {

	},
}
</script>
<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	*{
		font-family: PingFangSC;
	}
	#servers{
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
	}
	ul{
		-webkit-overflow-scrolling: touch;
	    overflow: auto;
	    height: 100%;
	    position: fixed;
    padding-bottom: 16.5vw;
        width: 100%;
	}
	li{
    list-style: none;
    min-height: 88px;
    background: #fff;
	}
	.margin{
	border-bottom: 1px solid #f5f5f5;
	margin: 0 5vw;
	}
	.where{
		float: left;
	}
	.shenbao{
	    border: 0;
	    background: #285fb1;
	    width: 240px;
	    height:100px;
	    font-size:34px;
		font-family:PingFangSC-Regular;
		color:rgba(255,255,255,1);
	}
	.yaoqiu{
width:364px;
height:40px;
font-size:28px;
font-family:PingFangSC-Regular;
color:rgba(153,153,153,1);
line-height:40px;
    padding-left: 3vw;
	padding-top: 4.5vw;
	}
	.tishi{
width:83%;
font-size:32px;
font-family:PingFangSC-Regular;
color:rgba(51,51,51,1);
line-height:45px;
    padding: 3vw 0;
	}
	.allradio{
		    position: absolute;
    top: 31%;
	right: 5vw;
	font-size:30px;
font-family:PingFangSC-Regular;
color:rgba(255,0,0,1);
	}
    label {
		font-size: 4vw;
		color: #333;
		width: 30%;
    	overflow: hidden;
    }
    label i {
        font-size: 4vw;
        display: inline-block;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        color: #fff;
        vertical-align: middle;
        margin: -2px 2px 1px 0px;
        border: #285FB1 1px solid;
    }

    input[type="radio"] {
    	display: none;
    }

    input[type="radio"]+ i {
		width: 18pt;
   		height: 18pt;
	    border-radius: 50%;
	    font-size:6.2vw;
    }

    input[type="radio"]:checked+ i {
		border-radius: 50%;
    font-size: 6.2vw;
    text-align: left;
    color: #fff;
    background: #285fb1;
    }

    input[type="radio"]:disabled+ i {
        border-color: #ccc;
    }

    input[type="radio"]:checked:disabled+ i {
        background: #ccc;
    }
    .serversOK{
	    line-height: 100px;
	    background: #fff;
	    text-align: right;
	    position: fixed;
	    width: 100%;
		bottom: 0vw;
		height: 100px;
	}
	.submit{
	    width: 120px;
	    text-align: center;
	    line-height: 50px;
	    float: right;
	    background: #285fb1;
	    height: 50px;
	    padding: 0;
	    color: #fff;
	}
	.allcost{
		padding: 0;
    float: left;
    padding: 10px 0 8px 15px;
	}
	.allprice{
		float: left;
    margin-left: 7vw;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51,51,51,1);
	}
	.dot{
    width: 1.6vw;
    height: 1.6vw;
    background: red;
    position: absolute;
    top: 5.7vw;
    border-radius: 50%;
    left: 6px;
	}
</style>
<style>
	.mint-toast-text {
		font-size: 3.8vw !important;
	}
</style>
