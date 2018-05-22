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
					<div class="allradio">
						<label  v-for="(ele,index) in element.options" v-if="ele.checked != null" style="float: left;"><input class="cwtyCost" :id='ele.id' :value='ele.value' checked type="radio" :name='element.title'><i>✓</i>{{ele.title}}</label><br>
        				<label v-for="(ele,index) in element.options" v-if="ele.checked == null" style="float: left;"><input class="cwtyCost" :id='ele.id' :value='ele.value' type="radio" :name='element.title'><i>✓</i>{{ele.title}}</label><br />
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import jquery from "../../../static/js/jquery-3.3.1.min.js";
import axios from "axios";
import { formatDate } from '../../assets/js/date.js';
import Bus from './bus.js'
export default {
    name: "servers",
    data(){
	    return{
	        varietys:"1",
	        value:"1",
	        lists:[],
	    }
    },
	methods:{
		check: function(){  
            console.log(this.value)  
        },
		getList(){
			var that = this;
			axios.get('/eport-server/delivery/queryServices.do', {
				params: {
					id:'3C9559D9CE7D4FEE90308DF15E11DC16',
					type:'1'
				}
			}).then(function(data) {
				that.lists = data.data.data;
			})
		},
		goback(){
			var sers = [];
			var cost = 0;
			$(".cwtyCost:checked").each(function(i,obj){
				var ser = {};
				ser.serviceId = this.id;
				ser.value = this.value;
				sers.push(ser)
				cost += Number(this.value)
			});
			axios({
				method: 'POST',
				data:{
					allCost:cost,
					orderNo:'3C9559D9CE7D4FEE90308DF15E11DC16',
					services:sers,
					type:'1'
				},
	            url: '/eport-server/delivery/saveServices.do',
				dataType: 'json',
				headers: {
		            'Content-Type': 'application/json;charset=UTF-8'
		        },
				success: function(data1) {
					
				}
			})
			this.$router.back(-1)
		},
	},
	created() {
		this.getList();
	}
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
	li{    
		list-style: none;
	    height: 145px;
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
	    margin: 7px 2px 2px 8px;
	    border-top: 1px solid #dfdfdf;
	    line-height: 15px;
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
</style>