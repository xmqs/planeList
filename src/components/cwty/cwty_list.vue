<template>
	<div id="kaxw_list">
		<div style="position: fixed;top: 80px;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;" v-show="lod">
			正在加载,请稍后...
		</div>
		<!--头部临时用-->
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			宠物申报平台
			<router-link :to="{path:'/'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header> -->
		<div id="con">  
			<div class="nav">  
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container1'}" @click.native.prevent="select_item('tab-container1')">待报价</mt-button>  
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container2'}" @click.native.prevent="select_item('tab-container2')">待提交</mt-button>  
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container3'}" @click.native.prevent="select_item('tab-container3')">待托运</mt-button>  
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container4'}" @click.native.prevent="select_item('tab-container4')">待评价</mt-button>  
			</div>
			<div class="page-tab-container" v-bind:style="{width: widthData}">  
			  <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>  
				<mt-tab-container-item id="tab-container1">  
				  	<div v-for="ele in list" v-if="status == 10" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">宠物主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">已申报</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1">
				  				<img class="pet-img" :src="ele.petPicture[0]"/>
				  			</div>
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">{{ele.petName}}({{ele.petBreed}})</p>
					  			<p class="pet-where">{{ele.startCity}}->{{ele.endCity}}</p>
					  			<p class="pet-time">{{ele.createTime}}</p>
				  			</div>
				  		</div>
				  		<div class="ele3">
				  			<button @click="update(ele.id)" class="update_b">编辑</button>
				  		</div>
				  	</div>
				  	<div v-if="list.length == 0" class="kong">
				  		<img style="width: 130px;" src="../../../static/img/kong1.png"/>
				  	</div>
				  	<router-link :to="{path: '/cwty/cwty_inp'}">
						<div style="height: 45px;background:#285FB1;position: fixed;bottom: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
							+ 托运宠物
						</div>
					</router-link>
				</mt-tab-container-item>  
				<mt-tab-container-item id="tab-container2">  
				  	<div v-for="ele in list" v-if="status == 20" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">宠物主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">已提交</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1">
				  				<img class="pet-img" :src="ele.petPicture[0]"/>
				  			</div>
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">{{ele.petName}}({{ele.petBreed}})</p>
					  			<p class="pet-where">{{ele.startCity}}->{{ele.endCity}}</p>
					  			<p class="pet-time">{{ele.createTime}}</p>
				  			</div>
				  		</div>
				  		<div class="ele3">
			  				<button @click="serversId(ele.id)" class="update_b">选择服务</button>
				  		</div>
				  	</div> 
				  	<div v-if="list.length == 0" class="kong">
				  		<img style="width: 130px;" src="../../../static/img/kong1.png"/>
				  	</div>
				</mt-tab-container-item>  
				<mt-tab-container-item id="tab-container3">  
				  	<div v-for="ele in list" v-if="status == 30" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">宠物主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">等待托运</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1">
				  				<img class="pet-img" :src="ele.petPicture[0]"/>
				  			</div>
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">{{ele.petName}}({{ele.petBreed}})</p>
					  			<p class="pet-where">{{ele.startCity}}->{{ele.endCity}}</p>
					  			<p class="pet-time">{{ele.createTime}}</p>
				  			</div>
				  		</div>
				  		<div class="ele3">
		  					<button @click="tyxq(ele)" class="update_b">托运详情</button>
			  				<button @click="serversDetails(ele.id)" style="border-color: #999;color: #333;" class="update_b">服务详情</button>
				  		</div>
				  	</div>
				  	<div v-if="list.length == 0" class="kong">
				  		<img style="width: 130px;" src="../../../static/img/kong1.png"/>
				  	</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container4">  
				  	<div v-for="ele in list" v-if="status == 50" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">宠物主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">托运成功</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1">
				  				<img class="pet-img" :src="ele.petPicture[0]"/>
				  			</div>
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">{{ele.petName}}({{ele.petBreed}})</p>
					  			<p class="pet-where">{{ele.startCity}}->{{ele.endCity}}</p>
					  			<p class="pet-time">{{ele.createTime}}</p>
				  			</div>
				  		</div>
				  		<div class="ele3">
			  				<p @click="text(ele.id,ele.petPicture[0])" class="update_b">评价</p>
			  				<p @click="tyxq(ele)" style="border-color: #999;color: #333;" class="update_b">托运详情</p>
				  		</div>
				  	</div>
				  	<div v-if="list.length == 0" class="kong">
				  		<img style="width: 130px;" src="../../../static/img/kong1.png"/>
				  	</div>
				</mt-tab-container-item>  
			  </mt-tab-container>  
			</div>  
		</div> 
	</div>
</template>

<script>
	import axios from "axios"
    import {Loadmore} from 'mint-ui';  
    import { Toast } from 'mint-ui'
	import { formatDate } from '../../assets/js/date.js';
	import Bus from './bus.js'
	export default {
		name: "kaxw_list",
		data() {
			return {
				active: 'tab-container1',
				widthData:0,
				status:10,
				list:[],
				lod:true
			}
		},  
	    components: {  
	      'v-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  
	    },
		watch: {
		},
		filters: {
			
		},
		mounted() {
			
		},
	    beforeRouteLeave(to, from, next) {
	        // 设置下一个路由的 meta
	        if(to.name == 'cwty_inp'){
		        to.meta.keepAlive = true;
	        }
	        next();
	    },
		watch: {
			active: function(newValue) {
				if (newValue == 'tab-container1') {
					this.status = 10;
				} else if (newValue == 'tab-container2'){
					this.status = 20;
				} else if (newValue == 'tab-container3'){
					this.status = 30;
				} else if (newValue == 'tab-container4'){
					this.status = 50;
				}
				sessionStorage.setItem("active",newValue)
				this.getList();
			}
		},
		created() {
			this.login();
			if (sessionStorage.getItem("active") != null) {
				this.active = sessionStorage.getItem("active");
				sessionStorage.removeItem("active");
			}
			if (this.active == 'tab-container1') {
				this.status = 10;
			} else if (this.active == 'tab-container2'){
				this.status = 20;
			} else if (this.active == 'tab-container3'){
				this.status = 30;
			} else if (this.active == 'tab-container4'){
				this.status = 50;
			}
			
			if (this.active == 'tab-container1') {
				setTimeout(() => {
					this.getList();
				}, 500)
			}
			this.widthData = document.documentElement.clientHeight -115;
		},
		methods: {
			login(){
		        let test2 = {
		            msg: "操作成功",
		            data: 'dLrEF9ZmVxlQrMtvx0qQaI2v3pjPA6amn7Z9RHFpniqQ465BeOuyMFQAdTratX0JM1h9maM7MGngUSL0l28D8+QhJQkq6gHFUmukpAPv5eIwIH5ymE5zUbxd9CcZ6NRLgiO8+dfxghYgmt1Wsy1I1vKLBpTGhgzedR/6yzK1ehhP3kchQJD9J2ahfk6UebJvp4g6vsY2EdK7PaJ34xzrvI0rU3QDEebWL68AEYOsyp8RC5e2Q8/duihRLNXD/AtTVMsJi4Fm3l0uJf3nxKiAaVzyMOzth0B7YjunhxfjCiaLuU3h4CucHUL4BT2o4miEzszOm7BA3JRBfne60Rf6Og==',
		            success: "true",
		            sign: 'ZwYpjoj/L7GJu9WgmNcagtQD9UhH9V6Ecykn5rAzkre51zBbBmxhpYriCJ6OBBNmvV4kcgwmkEk1ELaRrGvLjB8qAtS7m4EZaJ3tGN2X+6gawowlsy0v0dYhYiWJetYAw+yQCYzfLR/rxPorAMhLt3nb3yFsw9GRFY+X+lH+uko=',
		            signType: "RSA"
		        }
		        test2 = JSON.stringify(test2);
				axios({
					method: 'POST',
					data:test2,
		            url: '/eport-server/auth/mynj/getInfo.do',
					dataType: 'json',
					headers: {
			            'Content-Type': 'application/json;charset=UTF-8'
			        },
					success: function(data1) {
						
					}
				})
			},
			bus (res) {
			    setTimeout(() => {
			        Bus.$emit('list', res)
			    }, 30)
		        this.$router.push({path: '/cwty/petDetails'})
		    },
			update (res) {
			    setTimeout(() => {
			        Bus.$emit('updateId', res)
			    }, 30)
		        this.$router.push({path: '/cwty/cwty_upd'})
		    },
			select_item(res){
				this.active = res;
			},
			tyxq(res){
				setTimeout(() => {
					Bus.$emit('element', res)
			    }, 30)
				this.$router.push({path: '/cwty/checked'})
			},
			text(res,img){
			    setTimeout(() => {
					Bus.$emit('ids', res,img)
			    }, 30)
				this.$router.push({path: '/cwty/rate'})
			},
			serversId(res){
			    setTimeout(() => {
					Bus.$emit('serversId', res)
			    }, 30)
				this.$router.push({path: '/cwty/servers'})
			},
			serversDetails(res){
			    setTimeout(() => {
					Bus.$emit('serversDetailsId', res)
			    }, 30)
				this.$router.push({path: '/cwty/serversDetails'})
			},
			getList(){
				var that = this;
				axios.get('/eport-server/delivery/pet/queryOrders.do', {
					params: {
						status:this.status
					}
				}).then(function(data) {
					that.list = [];
					that.list = data.data.data;
					setTimeout(()=>{
						that.lod = false;
					},100);
				})
			}
		}
	}
</script>

<style scoped>
	*{
		font-family: PingFangSC;
	  -webkit-overflow-scrolling: touch;
	}
	#con{
		background: #eee;
	}
	.nav li{
	    display: inline-block;
	    padding: 10px 12px 8px 12px;
	    font-size: 1.6rem;
	    margin-bottom: 30px;
	    vertical-align: middle;
	    color: #666666;
	}
	.nav {
		border-bottom: 1px solid #f5f5f5;
	    padding-right: 30px;
	    padding: 0 0px 0 10px;
	    background: #fff;
	    position: fixed;
	    z-index: 3;
	    width: 100%;
	    height: 72px;
	}
	.nav .active {    
		border-bottom: 2px solid #285FB1;
	    font-size: 1.8rem;
	    color: #285FB1;
	}
	.page-tab-container{    
		margin-top: 9.1vw;	
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    overflow-y: auto;
	    padding-bottom: 7vw;
		background: #f5f5f5;
	}
	.class-a {
		border-bottom:4px solid #285FB1 !important;
		border-radius: 0;
		color: #285FB1;
	}
	.mt-cell-st {
		position: relative;
		height: 100px;
		border-bottom: 1px solid #ccc;
	}
	.tips{    
		width: 23%;
	    border: 0;
	    background: #fff;
	    height: 68px;
		font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(102,102,102,1);
	}
	.tips:active{    
	    background: #fff;
	}
	.mint-button--default {
	    -webkit-box-shadow: 0 0 0px #b8bbbf;
	    box-shadow: 0 0 0px #b8bbbf;
	}
	.kong{
	    text-align: center;
   		margin-top: 30%;
	}
	.ele{
		width: 100%;
		position: relative;
		height: 355px;
		background: #fff;
        border-bottom: 15px solid #f5f5f5;
	}
	.ele1{
	    height: 80px;
	    line-height: 80px;
	    padding: 0 25px;
    	font-size: 13pt;
	}
	.sfsb{
	    float: right;
font-size:26px;
font-family:PingFangSC-Regular;
color:rgba(40,95,177,1);
	}
	.ele2{
		height: 180px;
	    background-color: #FAFAFA;
	}
	.ele3{
		height: 80px;
		width: 100%;
		padding-right: 2vw;
	}
	.pet-img{
	    width: 150px;
    	height: 142px;
	}
	.ele2-1{
		float: left;
		padding: 25px;
	}
	.ele2-2{
		padding: 7px;
	}
	.pet-name{
		width: 250px;
	    padding: 0 !important;
	    margin-top: 30px;
	    font-size:32px;
		font-family:PingFangSC-Medium;
		color:rgba(51,51,51,1);
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.pet-where{
		position: absolute;
	    bottom: 95px;
	    padding: 0 !important;
	    
	    font-size:28px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
	}
	.zhuren{
		font-size:26px;
font-family:PingFangSC-Regular;
color:rgba(102,102,102,1);
	}
	.pet-time{
	    position: absolute;
	    top: 120px;
	    right: 18px;
	    font-size:26px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
	}
	.update_b{
		float: right;
	    background: #fff;
	    outline: none;
	    border-radius:12px;
		border:1px solid rgba(40,95,177,1);
	    border-radius: 10px;
	    margin:14px;
		height: 7.2vw;
	    width: 150px;
	    text-align: center;
	    line-height: 7vw;
	    font-size:26px;
		font-family:PingFangSC-Regular;
		color:rgba(40,95,177,1);
	}
</style>