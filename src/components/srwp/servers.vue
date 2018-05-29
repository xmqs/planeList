<template>
	<div id="servers">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			选择服务
				<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header>
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<ul>
				<li v-for="(element,index) in lists">
					<div class="tishi">{{element.title}}</div>
					<div class="yaoqiu">{{element.description}}</div>
					<div @click="cost1" class="allradio">
						<label v-for="ele in element.options" v-if="ele.checked == 1" style="float: left;">
							<input @click="checked($event)" class="cwtyCost" v=0 :id='element.id' :value='ele.value' checked type="radio" :name='element.title'><i>✓</i>{{ele.title}}</label>
        				<label v-else style="float: left;">
        					<input @click="checked($event)" class="cwtyCost" v=0 :id='element.id' :value='ele.value' type="radio" :name='element.title'><i>✓</i>{{ele.title}}</label>
					</div>
				</li>
			</ul>
		</div>
		<div class="serversOK">
			<div class="allcost">合计金额:<span style="color: #285fb1;">￥{{cost}}</span></div>
			<div @click="submit" class="submit">提交服务</div>
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
	        value:"1",
	        lists:[],
	        orderNo:"",
	        servers:[],
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
		selectOption: function(element, key) {
			var ser = {};
			ser.serviceId = key;
			ser.value = element;
			this.servers.push(ser)
			this.cost += Number(element)
			console.log(this.servers,this.cost)
		},
		
		check: function(){  
            console.log(this.value)  
        },
		getList(){//获取服务列表
			var that = this;
			axios.get('/eport-server/delivery/queryServices.do', {
				params: {
					id:this.orderNo,
					type:'2'
				}
			}).then(function(data) {
				that.lists = data.data.data;
			})
		},
		goback(){
			this.$router.push({name: 'srwp_list',
				params:{ 
					res:'tab-container2'
				}
			})
		},
	},
	created: function(){
	    Bus.$on('serversId', (e) => {
	    	this.orderNo = e;
	    })
	    setTimeout(() => {
			this.getList();
	    },100)
	    setTimeout(() => {
	   		this.cost1()
	    },500)
	},
	mounted() {
	},
}
</script>
<style scoped>
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
	    padding-bottom: 96px;
        width: 100%;
	}
	li{    
		list-style: none;
	    min-height: 145px;
	    background: #fff;
	    border-bottom: 11px solid #f5f5f5;
	}
	div{
		padding: 7px;
		font-size: 17px;
		color: #333;
	}
	.yaoqiu{
		color: #999;
    	font-size: 14px;
	}
	.allradio{
		white-space: nowrap;
	    margin: 18px 2px 2px 8px;
	    border-top: 1px solid #dfdfdf;
	    line-height: 28px;
        height: 48px;
	}
    label {
		font-size: 17px;
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
	    width: 19px;
	    height: 19px;
	    border-radius: 50%;
	    font-size: 24px;
    }
     
    input[type="radio"]:checked+ i {
        background: #285FB1;
	    width: 19px;
	    height: 19px;
	    border-radius: 50%;
	    font-size: 24px;
    }
     
    input[type="radio"]:disabled+ i {
        border-color: #ccc;
    }
     
    input[type="radio"]:checked:disabled+ i {
        background: #ccc;
    }
    .serversOK{
		padding: 0;
		height: 50px;
	    line-height: 31px;
	    background: #fff;
	    text-align: right;
	    position: fixed;
	    width: 100%;
	    bottom: 0;
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