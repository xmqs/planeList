<template>
	<div id="hwcx" @click="hid">
		<mt-header style="font-size: 17px;height:45px;background-color:#285FB1;" title="货运查询">
			<router-link :to="{path:'/'}" slot="left">
		    	<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="content-box">
			<input type="text" class="gang se" value="" readonly="readonly" v-model="select_txt" placeholder="请选择货运方式"/>
			<div @click.stop="toogle_list" class="sj"><a class="sanjiao"></a></div>
			<input type="number" class="gang" value="" @keyup="up($event)" v-model="dingdanhao" placeholder="请输入订单号"/>
			<input type="button" value="查询" @click="select" :class="{ 'bgColor': bgColor === true }" class="bgColor1"/>
		</div>
		<div class="content-box1">
			<div class="txt">&nbsp;&nbsp;{{select_txt}}</div>
			<div v-show="clList" class="cl">
				<span style="font-size: 17px;color: #333;">状态</span>&nbsp;&nbsp;&nbsp;<span id="">2018-02-02 10:10:10</span>
				<p>您的第一批货物等待提取</p>
			</div>
			<div v-show="clList1">
				<img src="../../../static/img/kong.png"/>
			</div>
		</div>
		<div class="content-box2">
			<transition name="fade">
				<ul v-show="ul_list" id="to-list" transiton="fade">
					<li @click.stop="kangkou(0,'国内进港')" :class="{'list-a':active === 0}" class="list-c">国内进港</li>
					<li @click.stop="kangkou(1,'国内出港')" :class="{'list-a':active === 1}" class="list-c">国内出港</li>
					<li @click.stop="kangkou(2,'国际进港')" :class="{'list-a':active === 2}" class="list-c">国际进港</li>
					<li @click.stop="kangkou(3,'国际出港')" :class="{'list-a':active === 3}" class="list-c">国际出港</li>
				</ul>
			</transition>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
    import { Toast } from 'mint-ui'
	export default {
		name: "hwcx",
		data() {
			return {
				select_txt:"",
				dingdanhao:"",
				active:"",
				ul_list:false,
				bgColor:false,
				clList:false,
				clList1:true
			}
		},
		created: function() {
			
		},
		methods: {
			kangkou:function(res,con){//口岸选择
				this.active = res;
				this.select_txt = con;
				//this.ul_list = false;
				if(this.dingdanhao != "" && con != ""){
					this.bgColor = true;
				}else{
					this.bgColor = false;
				}
			},
			toogle_list:function(){//底部列表toggle
				this.ul_list = !this.ul_list
			},
			hid:function(){
				this.ul_list = false
			},
			select:function(){//点击查询
				if(this.dingdanhao != "" && this.select_txt != ""){
					if(isNaN(this.dingdanhao)){
						Toast({
						  message: '订单号输入有误，请重新输入',
						  position: 'bottom',
						  className:'toast'
						});
					}else{
						this.clList = true;
						this.clList1 = false;
					}
				}
			},
			up:function(e){//键盘抬起事件
				if(this.dingdanhao != "" && this.select_txt != ""){
					this.bgColor = true;
				}else{
					this.bgColor = false;
				}
			},
		    getlist:function(){
	            // 查询数据  
				/*var _that = this;
				axios.get('/web-editor-web/channel/list.do?', {
					params: _that.remenCondition
				}).then(function(res) {
					for(var j = 0; j < res.data.data.length; j++) {
						_that.remen.push(res.data.data[j])
					}
				})*/
		    }
		}
	}
</script>

<style scope>
	body{
		background-color: #F5F5F5;
	}
	#hwcx{
		margin: 0;
		height: 100%;
		width: 100%;
	}
	.content-box{
	    margin: auto;
	    background-color: #fff !important;
	    padding: 20px 15px 25px 15px;
	    position: relative;
	}
	.content-box1{
	    padding: 15px 10px 25px 10px;
	    background-color: #f5f5f5;
    	width: 100%;
	}
	.bgColor1{
	    background-color: rgb(184, 207, 241);
	    width: 100%;
	    margin-top: 12px;
	    height: 45px;
	    border: none;
	    color: #fff;
	    font-size: 17px;
	    border-radius: 4px;
	}
	.bgColor{
		background-color: rgb(40, 95, 177);
	}
	.gang{
		height: 45px;
	    outline: none;
	    border: none;
	    font-size: 17px;
	    width: 100%;
	    border-radius: 5px;
	    background-color: #f5f5f5;
	    margin: 7px 0;
	    padding: 0 7px;
	}
	.sj{
	    position: absolute;
	    top: 30px;
	    right: 20px;
	    padding: 12px;
	}
	.sanjiao{
	    display: inline-block;
	    width: 0;
	    height: 0;
	    line-height: 0;
	    border: 8px solid transparent;
	    border-top-color: #ccc;
	    border-bottom-width: 0;
	}
	.cl{
		background: #fff;
	    line-height: 31px;
	    font-size: 15px;
	    padding: 18px 3px 18px 15px;
	    margin-top: 15px;
	}
	#to-list{
	    background-color: #fff;
	    position: fixed;
	    bottom: 0;
	    width: 100%;
	}
	.list-a{
	    background: url(../../../static/img/gou.png) no-repeat right;
	    color: rgb(40, 95, 177);
	}
	.list-c{
	    list-style: none;
	    width: 95%;
	    height: 50px;
	    font-size: 17px;
	    border-bottom: 1px solid #f7f0f0;
	    margin-left: 15px;
	    line-height: 50px;
	}
	.txt{
		color: #333;
    	font-size: 16px;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.7s
    }
    .fade-enter, .fade-leave-active {
		opacity: 0
    }
	.toast{
		width: 60%;
	}
</style>