<template>
	<div id="kaxw_list">
		<div style="position: fixed;top:36px;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;" v-show="lod">
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
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container2'}" @click.native.prevent="select_item('tab-container2')">待提交<div v-if="count20 !=0" class="dot">{{count20}}</div></mt-button>
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container3'}" @click.native.prevent="select_item('tab-container3')">待托运</mt-button>
			  <mt-button class="tips" size="small" :class="{'class-a':active === 'tab-container4'}" @click.native.prevent="select_item('tab-container4')">待评价<div v-if="count50 !=0" class="dot">{{count50}}</div></mt-button>
			</div>

			<div class="page-tab-container" v-bind:style="{width: widthData}">
			  <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
				<mt-tab-container-item id="tab-container1" style="padding-bottom:50px">
				  	<div v-for="ele in list" v-if="status == 10" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">宠物主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">已申报</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1">
				  				<img class="pet-img" :src="ele.petPicture"/>
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
				  	<div v-if="list.length == 0" @click.stop="select_pet('猫')" class="kong">
						<div class="catdiv">
				  			<img class="catimg" src="../../../static/img/cat.png"/>
							<div style="margin-top: 10px;font-size: 16px;font-family: PingFangSC-Regular;color: rgba(51,51,51,1);    margin-top: -26px;">猫</div>
						</div>
						<div @click.stop="select_pet('狗')" class="dogdiv">
				  			<img class="dogimg" src="../../../static/img/dog.png"/>
							<div style="margin-top: 0px;font-size: 16px;font-family: PingFangSC-Regular;color: rgba(51,51,51,1);">狗</div>
						</div>
				  	</div>
					<div @click="gocwtyInp" style="height: 45px;background:#285FB1;position: fixed;bottom: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
						+ 托运宠物
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container2">
				  	<div v-for="ele in list" v-if="status == 20 || status == 25" class="ele">
				  		<div class="ele1">
					  		<span class="zhuren">宠物主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">已提交</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1">
				  				<img class="pet-img" :src="ele.petPicture"/>
				  			</div>
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">{{ele.petName}}({{ele.petBreed}})</p>
					  			<p class="pet-where">{{ele.startCity}}->{{ele.endCity}}</p>
					  			<p class="pet-time">{{ele.createTime}}</p>
				  			</div>
				  		</div>
				  		<div class="ele3">
			  				<button style="position: relative;" @click="serversId(ele.id)" class="update_b">选择服务<div v-if="ele.status == '20' || ele.status == '25'" class="dot1"></div></button>
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
					  		<span class="zhuren">宠物主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">等待托运</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1">
				  				<img class="pet-img" :src="ele.petPicture"/>
				  			</div>
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">{{ele.petName}}({{ele.petBreed}})</p>
					  			<p class="pet-where">{{ele.startCity}}->{{ele.endCity}}</p>
					  			<p class="pet-time">{{ele.createTime}}</p>
				  			</div>
				  		</div>
				  		<div class="ele3">
		  					<button @click="tyxq(ele.id)" class="update_b">托运详情</button>
			  				<button @click="serversDetails(ele.id)" style="border-color: #999;color: #333;" class="update_b">服务详情</button>
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
					  		<span class="zhuren">宠物主人：{{ele.ownerName}}</span>
					  		<span class="sfsb">托运成功</span>
				  		</div>
				  		<div class="ele2" @click="bus(ele.id)">
				  			<div class="ele2-1">
				  				<img class="pet-img" :src="ele.petPicture"/>
				  			</div>
				  			<div class="ele2-1 ele2-2">
					  			<p class="pet-name">{{ele.petName}}({{ele.petBreed}})</p>
					  			<p class="pet-where">{{ele.startCity}}->{{ele.endCity}}</p>
					  			<p class="pet-time">{{ele.createTime}}</p>
				  			</div>
				  		</div>
				  		<div class="ele3">
			  				<div style="position: relative;" v-if="ele.status == '50'" @click="text(ele.id,ele.petPicture)" class="update_b">评价<div class="dot1"></div></div>
			  				<p v-if="ele.status == '60'" class="update_b" @click="totext(ele.id)">已评价</p>
			  				<p @click="tyxq(ele.id)" style="border-color: #999;color: #333;" class="update_b">托运详情</p>
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
		name: "kaxw_list",
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
	      'v-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
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
					this.status = 40;
				} else if (newValue == 'tab-container4'){
					this.status = 50;
				}
				sessionStorage.setItem("active",newValue)
				this.lod = true;
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

			if (this.active == 'tab-container1') {
				setTimeout(() => {
					this.getList();
				}, 100)
			}

			this.widthData = document.documentElement.clientHeight -115;
		},
		methods: {
      totext(res){
        this.$router.push({path: '/rate/'+res});
      },

			select_pet(res){

        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if(isAndroid){
          var userinfo = sessionStorage.getItem('userifo');
          if(userinfo != null){
            userinfo = JSON.parse(userinfo);
          }
          let pet = "";
          if(res == "猫"){
             pet = 1;
          }
          if(res == "狗"){
             pet = 2;
          }


          window.location.href = 'http://222.190.243.8:8080/cwty/index.html#/cwty/cwty_inp?username='+userinfo.userName+'&phone='+userinfo.phone+'&pet='+pet;



        }else{
          this.$router.push({name: 'cwty_inp',
            params:{
              reload:'reload',
              selpet:res
            }
          })
        }
			},
			gocwtyInp(){

        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){


          var userinfo = sessionStorage.getItem('userifo');
          if(userinfo != null){
            userinfo = JSON.parse(userinfo);
          }

          window.location.href = 'http://222.190.243.8:8080/cwty/index.html#/cwty/cwty_inp?username='+userinfo.userName+'&phone='+userinfo.phone;

        }else{
          this.$router.push({name: 'cwty_inp',
            params:{
              reload:'reload'
            }
          })
        }
			},
			bus (res) {
		        this.$router.push({path: '/cwty/petDetails/'+res})
		    },
			update (res) {
			    /*setTimeout(() => {
			        Bus.$emit('updateId', res)
			    }, 100)*/
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

          if(isAndroid){
            window.location.href = 'http://222.190.243.8:8080/cwty/index.html#/cwty/cwty_upd/'+res;
          }else{
            this.$router.push({path: '/cwty/cwty_upd/'+res})
          }
		    },
			select_item(res){
				this.active = res;
			},
			tyxq(res){
				/*setTimeout(() => {
					Bus.$emit('element', res)
			    }, 500)*/
				this.$router.push({path: '/cwty/checked/'+res})
			},
			text(res,img){
			    /*setTimeout(() => {
					Bus.$emit('ids', res,img)
			    }, 500)*/
				this.$router.push({path: '/cwty/rate/'+res+'/'+img})
			},
			serversId(res){
				this.$router.push({path: '/cwty/servers/'+res})
			},
			serversDetails(res){
			   /* setTimeout(() => {
					Bus.$emit('serversDetailsId', res)
			    }, 500)*/
				this.$router.push({path: '/cwty/serversDetails/'+res})
			},


			gettolits(){
				var that = this;
				axios.get('/eport-server/delivery/getOrderCountByStatus.do', {
					params: {
						type:'PET'
					}
				}).then(function(data) {
					var num1 = data.data.data[0]['20'];
					var num2 = data.data.data[0]['25'];
					that.count20 = parseInt(num1) + parseInt(num2);
					that.count50 = data.data.data[0]['50'];
					//console.log(data.data.data[0]['20'])
				})
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
					},500);
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
	input, textarea {
		-khtml-user-select: auto!important;
		-moz-user-select: auto!important;
		-ms-user-select: auto!important;
		-o-user-select: auto!important;
		user-select: auto!important;
		-webkit-appearance: none;
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
	    padding-bottom: 10vw;
		background: #f5f5f5;
	}
	.class-a {
		border-bottom:4px solid #285FB1 !important;
		border-radius: 0 !important;
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
	    height: 9.4vw;
		font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(102,102,102,1);
		border-bottom:4px solid #fff;
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
		height: 54px;
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
	.hidden{
		display: none;
	}
	.dogdiv{
		width: 280px;
		height: 280px;
		background: #fff !important;
		margin: 80px auto;
	}
	.catdiv{
		width: 280px;
		height: 280px;
		margin: auto;
		background: #fff !important;
	}
	.catimg{
width: 40.067vw;
    height: 40.2vw;
		margin-top: -4.333vw;
	}
	.dogimg{
    width: 29vw;
    height: 25.267vw;
		margin-top:20px;
	}
	.selpet{
		color: #285fb1 !important;
	}
</style>
<style>
.mint-button:after {
    background-color: #fff !important;
}
</style>
