<template>
	<div id="home">
		<!--头部临时用-->
		<div class="page-tab-container">
			<div style="width: 100%;" class="">
				<div class="swipe-wrapper">
			        <mt-swipe :speed="1300" :auto="5000" ref="swipeWrapper">
			            <mt-swipe-item v-for="ele in imageMenuList" class="item">
			            	<img class="swpUrl" :src="ele.iconUrl"/>
			            </mt-swipe-item>
			        </mt-swipe>
			    </div>
				<div style="display: inline-block;width: 100%;background: #fff;">
					<!--<router-link :to="{path: '/kaxw/kaxw_list/'+'news_tuijian'+'/'+0}">
						<div class="tips" type="default">口岸新闻</div>
					</router-link>
					<div @click="token">
						<div class="tips" type="default">手机值机</div>
					</div>
			        <router-link :to="{path:'flight/Destination'}">
			            <div class="tips" type="default">航班动态</div>
			        </router-link>
					<router-link :to="{path:'hwcx/hwcx'}">
						<div class="tips" type="default">货物查询</div>
					</router-link>
					
					<div @click="goback()">
						<div class="tips" type="default">私人物品</div>
					</div>
						<div class="tips" type="default">def</div>
						<div class="tips" type="default">def</div>-->
					<!--<div @click="goback()">
						<div class="tips" type="default">私人物品</div>
					</div>-->
					<div v-for="ele1 in menuList" @click="goothers(ele1.targetUrl)" class="tips" type="default">
						<img class="iconUrl" :src="ele1.iconUrl"/>
						<div class="icontitle">
							{{ele1.title}}
						</div>
					</div>
				</div>
				<div style="height: 61px;padding-left: 21px;font-size: 18px;color: #333;border-bottom: 1px solid #f5f5f5;border-top: 10px solid #f5f5f5;margin-top: -6px;">
					<div style="height: 20px;border-left: 4px solid rgb(40, 95, 177);margin-top: 18px;line-height: 20px;">
						&nbsp;&nbsp;资讯
					</div>
				</div>
				<div class="mt-cell mt-cell-st" @click="gokaxwdetails(element.sourceId)" v-for="(element,index) in pageList" :key="index">
					<div style="color: #666666">
						<div v-if="element.cover">
							<img class="pd-img"  :src="element.cover">
							<p style="width: 58%;" class="label-name">{{element.sourceLabel}}</p>
						</div>
						<div v-else>
							<p class="label-name">{{element.sourceLabel}}</p>
						</div>
						<p class="time-name">{{element.author}} {{element.createTime | formatDate}}</p>
					</div>
				</div>
				<div style="width: 100%;background: rgb(255, 255, 255);height: 70px;line-height: 70px;margin-top: -16px;padding-top: 28px;">
					<div @click="gokaxw" class="more">
						查看更多
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script scoped>
	import axios from "axios";
	import { formatDate } from '../assets/js/date.js';
	export default {
		name: "home",
    www:"",
		data() {
			return {
		        searchCondition:{  //分页属性
		    	  channelAlias:"news_tuijian",
		          pageNo:"1",
		          pageSize:"3"
		        },
		        pageList:[],
		        imageMenuList:[],
		        menuList:[],
			}
		},
		watch: {

		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			}
		},
		mounted() {
        	//auth.getAccessToken({appId:"elecPort"});
		},
		created() {
			this.getlist();
		},
		methods: {
			goback(){
				this.$router.push({name: 'srwp_list',
					params:{ 
						res:'tab-container1'
					}
				})
			},
			goothers(res){
				console.log(res)
			    window.location = res;
			},
			select_item(){
				
			},
			gokaxw(){
		        //this.$router.push({path: '/hotel/hotel'})
		        this.$router.push({path: '/kaxw/kaxw_list/'+'news_tuijian'+'/'+0})
			},
			gokaxwdetails(res){
				 this.$router.push({path: '/kaxw/kaxw_details/'+ res +'/'+ this.searchCondition.channelAlias})
			},
			getlist(){
	        	var _that = this;
				axios.get('/web-editor-web/channel/list.do?', {
					params: _that.searchCondition
				}).then(function(res) {
					console.log(res.data)
					_that.pageList = [];
					for(var j = 0; j < res.data.data.length; j++) {
						_that.pageList.push(res.data.data[j])
					}
				})
				axios.get('/eport-server/index/menu/query.do?channel=MYNJ', {
				}).then(function(res) {
					_that.imageMenuList = [];
					_that.imageMenuList = res.data.data.imageMenuList
					_that.menuList = [];
					_that.menuList = res.data.data.menuList
				})
			},
			token(){
				var userinfo = sessionStorage.getItem('userifo');
				userinfo = JSON.parse(userinfo);
				axios.post('/eport-server/checkin/reminder.do', {
				    idNumber:userinfo.idNumber,
					telephone:userinfo.phone
				})
				.then(function (response) {
				    window.location = response.data.data;
				})
				.catch(function (error) {
				    console.log(error);
				});
			}/*,
			zhiji:function(){
				var that = this;
				axios.post('/eport-server/checkin/reminder.do', {
				    idNumber:"320322199401121818",
					telephone:"13880522168"
				})
				.then(function (response) {
					//console.log(response.data.data);
				    window.location = response.data.data;
				})
				.catch(function (error) {
				    console.log(error);
				});
			},*/,
      flightM:function () {
        window.location += "flight";
      }

		}
	}
</script>
<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
  html {
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
    /*解决chrome浏览器下字体不能小于12px*/ }

  body {
    overflow-x: auto;
    font-size: 14px;
    color: #333;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    background: #f5f5f5;
  }

  a {
    outline: none;
    text-decoration: none;
    color: inherit; }

  a:hover {
    text-decoration: none; }

  html {
    zoom: 1; }

  html * {
    outline: 0;
    zoom: 1; }

  html button::-moz-focus-inner {
    border-color: transparent !important; }

  /*设置margin和padding为0*/
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0; }

  table {
    border-collapse: collapse;
    border-spacing: 0; }

  fieldset, a img {
    border: 0; }

  address, caption, cite, code, dfn, em, th, var，i {
    font-style: normal;
    font-weight: normal; }

  li {
    list-style: none; }

  caption, th {
    text-align: left; }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal; }

  q:before, q:after {
    content: ''; }

  em, i {
    font-style: normal; }

  input[type="submit"], input[type="reset"], input[type="button"], input[type=date], button, select, input[type=text] {
    /*去掉苹果的默认UI来渲染按钮 、解决部分手机浏览器对border：none无效办法*/
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /*去掉微信端input-text在ios轻快下的点击出先黑色半透明背景*/
    tap-highlight-color: transparent !important; }

  a, input[type=text], select, input[type=password], textarea {
    /*去掉微信端input-text在ios轻快下的点击出先黑色半透明背景*/
    tap-highlight-color: transparent !important; }

  input::-webkit-input-placeholder {
    color: #aaa; }
    
    /*轮播组件*/
    .swipe-wrapper{
        width: 100%;
        height: 300px;
        background: #fff;
    }
    .item{
        text-align: center;
        font-size: 40px;
        color: white;
    }

    .button-wrapper{
        display: flex;
        height: 100px;
    }
    .flex-item{
        flex: 1;
        display: inline-block;
        text-align: center;
        height: 100%;
        line-height: 100%;
        font-size: 40px;
    }
   /* list样式*/
  
	.time-name {
		position: absolute;
		left: 40px;
		bottom: 25px;
	    font-size:24px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
		line-height:24px;
	}
	.pd-img{
		margin-top: 13px;
	    position: absolute;
        top: 10px;
    	right: 33px; 
	    width: 224px;
    	height: 146px;
	}
	.label-name {
		position: absolute;
		left: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
        margin: 29px 54px 29px 32px;
        font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
		line-height:47px;
	    height: 94px;
	    
	    display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
		overflow: hidden;
	}
		.mt-cell-st {
		position: relative;
		width:750px;
		height:192px;
		background:rgba(255,255,255,1);
		border-bottom: 1px solid #F5F5F5;
	}
	.allitems{
	    width: 100%;
		height: 90px;
    	line-height: 90px;
    	font-size: 32px;
    	border-bottom: 1px solid #f5f5f5;
    	background: #fff;
    	margin-top:12px;
	}
	.items{
		float: left;
	    width: 21%;
	    border: 0;
	    text-align: center;
	    margin: 0 2%;
	}
	.class-a {
		border-bottom: 4px solid #3385e3 !important;
		color: #3385e3;
		height: 88px;
	}
	.more{
	    width: 270px;
	    height: 66px;
	    text-align: center;
	    line-height: 66px;
	    border-radius: 100px;
	    border: 1px solid #444;
	    color: #444;
	    margin: 0 auto;
	    background: #fff;
	    font-size: 28px;
	}
	.tips{
		width: 49.5%;
		float: left;
		height: 110px;
		line-height: 110px;
		text-align: center;
		font-size: 32px;
		color: #333;
	    border-bottom: 1px solid #f6f6f6;
    	border-left: 1px solid #f6f6f6;
    	position: relative;
	}
	.swpUrl{
	    width: 100%;
   		height: 375px;
	}
	.iconUrl{
		height: 32px;
	    line-height: 8px;
	    position: absolute;
	    top: 30px;
	    left: 34px;
	    height: 50px;
	    width: 47px;
	}
	.icontitle{
	    margin-left: 104px;
	    text-align: left;
	}
</style>
<style>
	.mint-toast-text {
		font-size: 3.8vw !important;
	}
</style>

