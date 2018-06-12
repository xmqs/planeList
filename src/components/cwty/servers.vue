<template>
	<div id="servers">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			选择服务
				<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header>
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<ul>
				<li v-for="(element,index) in lists" :key="index">
					<div class="tishi">{{element.title}}</div>
					<div class="yaoqiu">{{element.description}}</div>
					<div @click="cost1" class="allradio">
						<label v-for="ele in element.options" v-if="ele.checked == 1" style="float: left;"  :key="ele">
							<input @click="checked($event)" class="cwtyCost" v=0 :id='element.id' :value='ele.value' checked type="radio" :name='element.title'><i>✓</i>{{ele.title}}</label>
        				<label v-else style="float: left;">
        					<input @click="checked($event)" class="cwtyCost" v=0 :id='element.id' :value='ele.value' type="radio" :name='element.title'><i>✓</i>{{ele.title}}</label>
					</div>
				</li>
			</ul>
		</div>
		<div class="serversOK">
			<button @click="submit()" class="shenbao">提交服务</button>
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
	        cost:'',
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
		},
		cost1(){
			this.cost = 0;
			var boxes1 = document.getElementsByTagName("input");
		    for(var i=0;i<boxes1.length;i++){
		        if(boxes1[i].checked == true){
					this.cost += Number(boxes1[i].value)
		        }
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
		        if(boxes[i].checked == true){
					var ser = {};
					ser.serviceId = boxes[i].id;
					ser.value = boxes[i].value;
					sers.push(ser)
					this.cost += Number(boxes[i].value)
		        }
		    }
			var that = this;
			axios.post("/eport-server/delivery/saveServices.do", {
				allCost:that.cost,
				orderNo:that.orderNo,
				services:sers,
				type:'2'
			}).then((res) => {		
				if(res.status == 200) {	
					Toast("提交成功");
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
					id:this.orderNo,
					type:'1'
				}
			}).then(function(data) {
				that.lists = data.data.data;
			})
		},
		goback(){
			this.$router.push({path: '/cwty/cwty_list/'+'tab-container2'})
		},
	},
	created: function(){
	    Bus.$on('serversId', (e) => {
	    	this.orderNo = e;
	    })
	    setTimeout(() => {
			this.getList();
	    },100)
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
        padding-top: 88px;
	}
	ul{
		-webkit-overflow-scrolling: touch;
	    overflow: auto;
	    height: 100%;
	    position: fixed;
	    padding-bottom: 96px;
        width: 100%;
	}
	li{    
		list-style: none;
		height: 31.333vw;
		background: #fff;
		border-bottom: 1.467vw solid #f5f5f5;
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
	div{
		padding: .933vw;
		font-size: 4.267vw;
		color: #333;
		padding-left: 3vw;
	}
	.yaoqiu{
		color: #999;
    	font-size: 28px;
		padding-left: 25px;
	}
	.tishi{
    	font-size: 32px;
		padding-left: 25px;
	}
	.allradio{
		white-space: nowrap;
		margin: 2.4vw .267vw .267vw 0.067vw;
		border-top: 1px solid #dfdfdf;
		line-height: 9.733vw;
		height: 10.4vw;
	}
    label {
		font-size: 4vw;
		color: #333;
		margin-right: 17%;
    }
    label i {
        font-size: 12px;
        display: inline-block;
        width: 12px;
        height: 12px;
        text-align: center;
        line-height: 12px;
        color: #fff;
        vertical-align: middle;
        margin: -2px 2px 1px 0px;
        border: #285FB1 1px solid;
    }
     
    input[type="radio"] {
    	display: none;
    }
     
    input[type="radio"]+ i {
	    width: 40px;
	    height: 40px;
	    border-radius: 50%;
	    font-size: 48px;
    }
     
    input[type="radio"]:checked+ i {
        width: 5.533vw;
		height: 5.533vw;
		border-radius: 50%;
		font-size: 6.2vw;
		text-align: left;
    }
     
    input[type="radio"]:disabled+ i {
        border-color: #ccc;
    }
     
    input[type="radio"]:checked:disabled+ i {
        background: #ccc;
    }
    .serversOK{
		height: 50px;
	    line-height: 31px;
	    background: #fff;
	    text-align: right;
	    position: fixed;
	    width: 100%;
	    bottom: 90px;
        padding: 25px 30px;
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
</style>