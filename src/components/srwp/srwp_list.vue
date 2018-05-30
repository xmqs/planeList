<template>
	<div id="srwp_list">
		<div style="position: fixed;top: 80px;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;" v-show="lod">
			正在加载,请稍后...
		</div>
		<!--头部临时用-->
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			私人物品申报平台
			<router-link :to="{path:'/'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header>
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
					  		<span class="zhuren">物品主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">已申报</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">
					  				<span v-for="(ele1,index) in ele.packages">
										<span v-if="index == 0">
											{{ele1.name}}
										</span>
										<span v-else>
											,{{ele1.name}}
										</span>
									</span>
					  			</p>
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
				  	<router-link :to="{path: '/srwp/srwp_inp'}">
						<header style="height: 45px;background:#285FB1;position: fixed;bottom: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
							+ 托运物品
						</header>
					</router-link>
				</mt-tab-container-item>  
				<mt-tab-container-item id="tab-container2">  
				  	<div v-for="ele in list" v-if="status == 20" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">物品主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">已提交</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">
					  				<span v-for="(ele1,index) in ele.packages">
										<span v-if="index == 0">
											{{ele1.name}}
										</span>
										<span v-else>
											,{{ele1.name}}
										</span>
									</span>
					  			</p>
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
					  		<span class="zhuren">物品主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">等待托运</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">
					  				<span v-for="(ele1,index) in ele.packages">
										<span v-if="index == 0">
											{{ele1.name}}
										</span>
										<span v-else>
											,{{ele1.name}}
										</span>
									</span>
					  			</p>
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
					  		<span class="zhuren">物品主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">托运成功</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">
					  				<span v-for="(ele1,index) in ele.packages">
										<span v-if="index == 0">
											{{ele1.name}}
										</span>
										<span v-else>
											,{{ele1.name}}
										</span>
									</span>
					  			</p>
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
		name: "srwp_list",
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
	      'v-loadmore':Loadmore 
	    },
		watch: {
		},
		filters: {
			
		},
		mounted() {
			if (this.active == undefined) {
				this.active = 'tab-container1'
			}
			this.select_item(this.active);
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
				
				this.getList();
			}
		},
		created() {
			this.login();
			this.active = this.$route.params.res;
			if (this.active == 'tab-container1') {
				this.status = 10;
			} else if (this.active == 'tab-container2'){
				this.status = 20;
			} else if (this.active == 'tab-container3'){
				this.status = 30;
			} else if (this.active == 'tab-container4'){
				this.status = 50;
			}
			this.getList();
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
		        this.$router.push({path: '/srwp/srwpDetails'})
		    },
			update (res) {
			    setTimeout(() => {
			        Bus.$emit('updateId', res)
			    }, 30)
		        this.$router.push({path: '/srwp/srwp_upd'})
		    },
			select_item(res){
				this.active = res;
			},
			tyxq(res){
				this.$router.push({name: 'srwpchecked',
					params:{ 
						testid:res
					}
				})
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
				this.$router.push({path: '/srwp/servers'})
			},
			serversDetails(res){
			    setTimeout(() => {
					Bus.$emit('DetailsId', res)
			    }, 30)
				this.$router.push({path: '/srwp/serversDetails'})
			},
			getList(){
				var that = this;
				axios.get('/eport-server/delivery/luggage/queryOrders.do', {
					params: {
						status:that.status
					}
				}).then(function(data) {
					that.list = [];
					that.list = data.data.data;
					setTimeout(()=>{
						that.lod = false;
					},700);
				})
			}
		}
	}
</script>

<style scoped>
	*{
		font-family: PingFangSC;
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
		border-bottom: 1px solid #ccc;
	    padding-right: 30px;
	    padding: 0 0px 0 10px;
	    background: #fff;
	    position: fixed;
	    top: 45px;
	    z-index: 3;
	    width: 100%;
	}
	.nav .active {    
		border-bottom: 2px solid #285FB1;
	    font-size: 1.8rem;
	    color: #285FB1;
	}
	.page-tab-container{    
		margin-top: 79px;
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    overflow-y: auto;
	    padding-bottom: 115px;
	}
	.class-a {
		border-bottom: 2px solid #285FB1 !important;
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
        font-size: 16px;
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
		height: 207px;
		background: #fff;
        border-bottom: 10px solid #f5f5f5;
	}
	.ele1{
	    padding: 9px 10px;
    	font-size: 13pt;
	}
	.sfsb{
	    float: right;
	    color: #285FB1;
	    font-size: 13pt;
	}
	.ele2{
		height: 80pt;
        padding: 12px 12px 7px 12px;
	    background-color: #FAFAFA;
	}
	.pet-img{
	    width: 67pt;
    	height: 64pt;
	}
	.ele2-1{
		float: left;
	}
	.ele2-2{
		padding: 7px;
	}
	.pet-name{    font-size: 19px;
    color: #333;
    padding: 0 !important;
    width: 160px;
    line-height: 22px;
    height: 46px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
	}
	.pet-where{
		position: absolute;
	    font-size: 14px;
	    color: #999;
	    padding: 0 !important;
        bottom: 60px;
	}
	.pet-time{
	    position: absolute;
	    top: 55px;
	    right: 10px;
	    color: #999;
	}
	.update_b{
		float: right;
	    background: #fff;
	    outline: none;
	    border: 1px solid #285FB1;
	    color: #285FB1;
	    border-radius: 6px;
	    margin:8px;
	    height: 33px;
	    width: 92px;
	    line-height: 33px;
	    text-align: center;
	    font-size: 15px;
	}
</style>