<template>
	<div id="srwp_list">
		<div style="position: fixed;top: 80px;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;" v-show="lod">
			正在加载,请稍后...
		</div>
		<!--头部临时用-->
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			私人物品申报平台
			<router-link :to="{path:'/'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header> -->
		<div id="con">
			<div class="nav">
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container1'}" @click.native.prevent="select_item('tab-container1')">待报价</mt-button>
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container2'}" @click.native.prevent="select_item('tab-container2')">待提交<div v-if="count20 !=0" class="dot">{{count20}}</div></mt-button>
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container3'}" @click.native.prevent="select_item('tab-container3')">待托运</mt-button>
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container4'}" @click.native.prevent="select_item('tab-container4')">待评价<div v-if="count50 !=0" class="dot">{{count50}}</div></mt-button>
			</div>
			<div class="page-tab-container" v-bind:style="{width: widthData}">
			  <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
				<mt-tab-container-item id="tab-container1">
				  	<div v-for="ele in list" v-if="status == 10" class="ele" :key="ele.id">
				  		<div class="ele1">
					  		<span class="zhuren">物品主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">已申报</span>
				  		</div>
						<a :href ="'/H5/index.html#/srwp/srwpDetails/'+ele.id">
							<div class="ele2">
								<div class="ele2-1 ele2-2">
									<p class="pet-name">
										<span v-for="(ele1,index) in ele.packages" :key="index">
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
						</a>
				  		<div class="ele3">
				  			<button @click="update(ele.id)" class="update_b">编辑</button>
				  		</div>
				  	</div>
				  	<div v-if="list.length == 0" class="kong">
				  		<img style="width: 130px;" src="../../../static/img/kong1.png"/>
						<div style="margin-top: 10px;font-size: 14px;font-family: PingFangSC-Regular;color:rgba(102,102,102,1);">暂无申报订单</div>
				  	</div>
						<div style="height: 45px;background:#285FB1;position: fixed;bottom: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;" @click="gosrwpInp">
							+ 托运物品
						</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container2">
				  	<div v-for="ele in list" v-if="status == 20 || status == 25" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">物品主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">已提交</span>
				  		</div>
						<a :href ="'/H5/index.html#/srwp/srwpDetails/'+ele.id">
							<div class="ele2">
								<div class="ele2-1 ele2-2">
									<p class="pet-name">
										<span v-for="(ele1,index) in ele.packages" :key="index">
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
						</a>
				  		<div class="ele3">
							<a :href ="'/H5/index.html#/srwp/servers/'+ele.id">
			  					<button style="position: relative;" class="update_b">选择服务<div v-if="ele.status == '20' || ele.status == '25'" class="dot1"></div></button>
			  					<!-- <button @click="serversId(ele.id)" class="update_b">选择服务</button> -->
							</a>
				  		</div>
				  	</div>
				  	<div v-if="list.length == 0" class="kong">
				  		<img style="width: 130px;" src="../../../static/img/kong1.png"/>
						<div style="margin-top: 10px;font-size: 14px;font-family: PingFangSC-Regular;color:rgba(102,102,102,1);">暂无提交订单</div>
				  	</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container3">
				  	<div v-for="ele in list" v-if="status == 40" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">物品主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">等待托运</span>
				  		</div>
						<a :href ="'/H5/index.html#/srwp/srwpDetails/'+ele.id">
							<div class="ele2">
								<div class="ele2-1 ele2-2">
									<p class="pet-name">
										<span v-for="(ele1,index) in ele.packages" :key="index">
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
						</a>
				  		<div class="ele3">
							<a :href ="'/H5/index.html#/srwp/srwpchecked/'+ele.id">
                <button class="update_b">
                  <p class="btn_p">托运详情</p>
                  <p class="btn_p">The shipping details</p>
                </button>
							</a>
							<a :href ="'/H5/index.html#/srwp/serversDetails/'+ele.id">
                <button class="update_b">
                  <p class="btn_p">服务详情</p>
                  <p class="btn_p">Service details</p>
                </button>
							</a>

				  		</div>
				  	</div>
				  	<div v-if="list.length == 0" class="kong">
				  		<img style="width: 130px;" src="../../../static/img/kong1.png"/>
						<div style="margin-top: 10px;font-size: 14px;font-family: PingFangSC-Regular;color:rgba(102,102,102,1);">暂无托运订单</div>
				  	</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container4">
				  	<div v-for="ele in list" v-if="status == 50" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">物品主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">托运成功</span>
				  		</div>

						<a :href ="'/H5/index.html#/srwp/srwpDetails/'+ele.id">
							<div class="ele2">
								<div class="ele2-1 ele2-2">
									<p class="pet-name">
										<span v-for="(ele1,index) in ele.packages" :key="index">
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
						</a>
				  		<div class="ele3">
							<a v-if="ele.status == '50'" :href ="'/H5/index.html#/srwp/srwprate/'+ele.id">
                <button class="update_b">
                  <p class="btn_p">评价</p>
                  <p class="btn_p">Evaluation</p>
                  <div class="dot1"></div>
                </button>
							</a>
              <button v-if="ele.status == '60'" class="update_b">
                <p class="btn_p">已评价</p>
                <p class="btn_p">Have evaluation</p>
              </button>
							<a :href ="'/H5/index.html#/srwp/srwpchecked/'+ele.id">
			  					<button style="border-color: #999;color: #333;" class="update_b">托运详情</button>
			  					<!-- <p @click="tyxq(ele)" style="border-color: #999;color: #333;" class="update_b">托运详情</p> -->
							</a>

				  		</div>
				  	</div>
				  	<div v-if="list.length == 0" class="kong">
				  		<img style="width: 130px;" src="../../../static/img/kong1.png"/>
						<div style="margin-top: 10px;font-size: 14px;font-family: PingFangSC-Regular;color:rgba(102,102,102,1);">暂无评价订单</div>
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
				lod:true,
				count50:'',
				count20:'',
				petselect:''
			}
		},
	    components: {
	      'v-loadmore':Loadmore
	    },
		mounted() {

		},
		watch: {
			active: function(newValue) {
				if (newValue == 'tab-container1') {
					this.status = 10;
				} else if (newValue == 'tab-container2'){
					this.status = 20;
				} else if (newValue == 'tab-container3'){
					this.status = 40;
				} else if (newValue == 'tab-container4'){
					this.status = 50;
				}
				sessionStorage.setItem("active",newValue)
				this.getList();
			}
		},
		created() {
			//this.login();
			this.gettolits();
			if (sessionStorage.getItem("active") != null) {
				this.active = sessionStorage.getItem("active");
				sessionStorage.removeItem("active");
			}
			if (this.active == 'tab-container1') {
				this.status = 10;
			} else if (this.active == 'tab-container2'){
				this.status = 20;
			} else if (this.active == 'tab-container3'){
				this.status = 40;
			} else if (this.active == 'tab-container4'){
				this.status = 50;
			}
			setTimeout(() => {
				this.getList();
			}, 500)
			this.widthData = document.documentElement.clientHeight -115;
		},
		methods: {
      gosrwpInp(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){


          var userinfo = sessionStorage.getItem('userifo');
          if(userinfo != null){
            userinfo = JSON.parse(userinfo);
          }

          window.location.href = 'https://m.mynj.cn:11162/cwty/index.html#/srwp/srwp_inp?username='+userinfo.userName+'&phone='+userinfo.phone+'&id='+userinfo.idNumber;

        }else{
          this.$router.push({name: 'srwp_inp',
            params:{
              reload:'reload'
            }
          })
        }
      },

			gettolits(){
				var that = this;
				axios.get('/eport-server/delivery/getOrderCountByStatus.do', {
					params: {
						type:'LUGGAGE'
					}
				}).then(function(data) {
					var num1 = data.data.data[0]['20'];
					var num2 = data.data.data[0]['25'];
					that.count20 = parseInt(num1) + parseInt(num2);
					that.count50 = data.data.data[0]['50'];
					//console.log(data.data.data[0]['20'])
				})
			},
			bus (res) {
			    setTimeout(() => {
			        Bus.$emit('list', res)
			    }, 500)
		        this.$router.push({path: '/srwp/srwpDetails'})
		    },
			update (res) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

        if(isAndroid){
          window.location.href = 'https://m.mynj.cn:11162/cwty/index.html#/srwp/srwp_upd/'+res;
        }else{
          this.$router.push({path: '/srwp/srwp_upd/'+res})
        }


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
			    }, 500)
				this.$router.push({path: '/cwty/rate'})
			},
			serversId(res){
			    setTimeout(() => {
					Bus.$emit('serversId', res)
			    }, 500)
				this.$router.push({path: '/srwp/servers'})
			},
			serversDetails(res){
			    setTimeout(() => {
					Bus.$emit('DetailsId', res)
			    }, 500)
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
					},500);
				})
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
		margin-top: 9vw;
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    overflow-y: auto;
	    padding-bottom: 19.2vw;
	}
	.class-a {
		border-bottom:4px solid #285FB1 !important;
		border-radius: 0;
		color: #285FB1 !important;
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
	.zhuren{
		font-size:26px;
font-family:PingFangSC-Regular;
color:rgba(102,102,102,1);
	}
	.ele2{
		height: 180px;
	    background-color: #FAFAFA;
	    padding: 0 18px;
	}
	.ele3{
		height: 80px;
		width: 100%;
		padding-right: 1.5vw;
	}
	.pet-img{
	    width: 67pt;
    	height: 64pt;
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
		font-weight: 600;
	}
	.pet-where{
		position: absolute;
	    bottom: 95px;
	    padding: 0 !important;

	    font-size:28px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
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
	.dot{
    position: absolute;
    top:8px;
    margin-left: 75%;
	width: 4vw;
    height: 4vw;
    border: 1px solid #de0909;
    position: absolute;
    border-radius: 50%;
    line-height: 3.5vw;
    font-size: 22px;
    color: #de0909;
    background: #fff;
    text-align: center;
	}
	.dot1{
		width: 1.6vw;
    height: 1.6vw;
    background: red;
    position: absolute;
    top: -0.8vw;
    right: -2.5px;
    border-radius: 50%;
	}
</style>
<style>
.mint-button:after {
    background-color: #fff !important;
}
</style>
