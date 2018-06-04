<template>
	<div id="home">
		<transition name="fade">
			<p v-show="title_tj" id="recommend" class="recommend">成功为您推荐十条新闻</p>
		</transition>
		<!--头部临时用-->
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			口岸新闻
			<router-link :to="{path:'/'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>	
			<router-link :to="{path:'/kaxw/search'}">
				<img style="height: 19px;position: absolute;right:15px;top: 50%;margin-top:-9px;" src="./../../../static/img/Group6.png"/>
			</router-link>	
		</header>
		<!--顶部菜单-->
		<div class="header">
			<div class="scrollx mescroll-touch-x" style="width: 100%;">
				<div id="scrollxContent" class="scrollx-content">
					<ul id="nav" class="nav">
						<li v-for="(element,index) in list2" @click="select_item(active = element.alias)" :class="{'class-a':active === element.alias}">{{element.label}}</li>
					</ul>
				</div>
			</div>
			<div @click="others()" class="model_logo" id="model_logo">
				☰
				<div class="cover"></div>
				<span></span>
			</div>
		</div>
		<!--内容-->
		<div class="page-tab-container" :class="{client}">
		    <div id="soll" class="is_top">
			    <v-loadmore :top-method="loadTop" :bottomDistance="bottomDistance"
			    	:bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
						<mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
							<mt-tab-container-item class="bo-p" v-for="(element,index) in menu" v-bind:id="element.alias" :key="index">
								<div class="mt-cell mt-cell-st" v-for="(element,index) in pageList" :key="index">
									<router-link :to="{path: '/kaxw/kaxw_details/'+ element.sourceId +'/'+ searchCondition.channelAlias}">
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
									</router-link>
								</div>
							</mt-tab-container-item>
						</mt-tab-container>
			    		<div slot="top" class="mint-loadmore-top">
					      <span v-show="topStatus == 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
					      	<img class="downwarp-progress" :class="{'downwarp-progress-s':downwarp}" style="transform: rotate(1069.2deg);" src="../../../static/img/Group4.png"/>
					      </span>
					    </div>

							<div v-show="isend" class="ending">
								-- END --
							</div>
			    		<div slot="bottom" style="position: relative;top: -25px;" class="mint-loadmore-bottom">
					      <span v-show="bottomStatus == 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">
					      	<span id="">正在努力加载</span>
					      	<img class="downwarp-progress1" :class="{'downwarp-progress-s':downwarp}" style="transform: rotate(1069.2deg);" src="../../../static/img/Oval6.png"/>
					      </span>
					    </div>
			    </v-loadmore>
			    <div v-if="scrollTop" @click="backTop" class="scrollTop"></div>
		    </div>
		</div>
		<!--选择要看的新闻类型-->
		<div v-show="other" id="model-wrapper" :class="{'animation_out':animation_out,'animation_in':animation_in}" class="mode-wrapper">
			<div class="ui-container">
				<div class="content_box">
					<p><span @click="close()" class="close_column" id="close_column"></span></p>
					<p class="my_channel">我的频道<span class="font_12 dark_grey padding_z_10" id="explain_">{{paixu}}</span><span v-on:click="bj" class="btn_edit" id="btn_edit">{{edit}}</span></p>
				</div>
				<p v-show="dio" style="width:285px;position: fixed;top: 110px;left: -100px;z-index: 9999;height: 5rem;"></p>
				<div class="content_box2">
					<div id="example" v-cloak>
						<draggable :list="list2" :move="getdata" @update="datadragEnd" @sort="sort" :options="{animation: 200,handle:'.dargDiv'}">
							<transition-group name="list-complete" >
								<div v-for="element in list2" :key="element.label" class="list-complete-item ui-col ui-col-25 text_center padding_6">
									<div v-if="element.movable == 0" class="styleclass dargDiv others">
										<p>{{element.label}}</p>
										<i v-show="isShow" v-on:click="del(element.id)" class="shanchu"></i>
									</div>
									<div v-else-if="element.movable == 1" draggable="disable" class="styleclass others">
										<p>{{element.label}}</p>
									</div>
								</div>
							</transition-group>
						</draggable>
					</div>
				</div>
				<div class="content_box3">
					<p class="channel_tuijian">频道推荐<span class="font_12 dark_grey padding_z_10"><!--点击进入频道--></span></p>
					<ul v-for="ele in list1" class="list-complete-item ui-col ui-col-25 text_center padding_6">
						<li class="styleclass dargDiv others">
							<p>{{ele.label}}</p>
							<i v-show="isShow" v-on:click="add(ele.id)" class="tianjia"></i>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
    import {Loadmore} from 'mint-ui';
    import { Toast } from 'mint-ui'
	import { formatDate } from '../../assets/js/date.js';
	export default {
		name: "kaxw_list",
		data() {
			return {
		        searchCondition:{  //分页属性
		    	  channelAlias:"news_tuijian",
		          pageNo:"1",
		          pageSize:"10"
		        },
		        pageList:[],
		        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
		        scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动  ,
				con: [],
				menu: [],
				active: "news_tuijian",
				list1: [],
				list2: [],
				isShow: false,
				edit: "编辑",
				paixu: "点击进入频道",
				other: false,
				animation_out: false,
				animation_in: true,
				move:false,
				title_tj:false,
				client:500,
				animent:false,
				pagenone:"",
				topStatus: '',
				downwarp:false,
				bottomStatus:"",
				bottomDistance:1,
				scrollTop:false,
				isend : false,
				dio:false
			}
		},
	    components: {
	      'v-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
	    },
		watch: {
			active: function(newValue) {
				if (this.$route.params.flag == 1) {
					this.active = this.$route.params.con;
					this.searchCondition.channelAlias = this.$route.params.con;
					this.$route.params.flag = 0;
				}else{
					document.getElementById("soll").scrollTop = 0;
					this.isend = false;
					this.active = newValue;
					this.searchCondition.channelAlias = newValue;
					this.searchCondition.pageNo = 1;
					this.searchCondition.pageSize = 10;
					this.loadPageList();
					this.bottomStatus = "";
				}
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			}
		},
		mounted() {
			this.loadPageList();
			this.client = document.documentElement.clientHeight -3;
			document.getElementById("soll").addEventListener('scroll', this.isScrollTop)
			document.getElementById("soll").scrollTop
		},
		created() {
			this.active = this.$route.params.con;
			this.searchCondition.channelAlias = this.$route.params.con;
			this.getmenu();
			this.getAllList();
		},
		methods: {
			select_item(res){
			},
			sort:function(res){
				console.log(res)
			},
			isScrollTop:function(){
				var that = this;
				if(document.getElementById("soll").scrollTop > 1000){
					that.scrollTop = true;
				}else{
					that.scrollTop = false;
				}
			},
			backTop:function(){
				var that = this;
				var interval = setInterval(function(){
					document.getElementById("soll").scrollTop = document.getElementById("soll").scrollTop - 40;
					if(document.getElementById("soll").scrollTop <= 0) {
						document.getElementById("soll").scrollTop = 0;
            			document.documentElement.scrollTop = 0
						that.scrollTop = false;
						clearInterval(interval);
					}
				},10);
			},
			getdata: function(evt){
				if(this.edit == "编辑"){
					return false;
				}else if (this.move == true) {
					return false;
				}
			},
        	datadragEnd:function(evt){
        		
        	},
			//获取列表信息
			getAllList: function() {
				var that = this;
				setTimeout(function() {
					axios.get('/web-editor-web/channel/queryAll.do').then(function(data1) {
						for(var j = 0; j < data1.data.data.length; j++) {
							that.list1.push(data1.data.data[j])
						}

						for(var i = 0; i < that.list2.length; i++) {
							for(var j = 0; j < that.list1.length; j++) {
								if(that.list2[i].id == that.list1[j].id) {
									that.list1.splice(j, 1);
									j--;
								}
							}
						}
					})
				},1000);
			},
			//添加
			add: function(ids) {
				for(var i = 0; i < this.list1.length; i++) {
					if(this.list1[i].id == ids) {
						this.list2.push(this.list1[i]);
						this.list1.splice(i, 1)
					}
				}
			},
			//删除
			del: function(ids) {
				for(var i = 0; i < this.list2.length; i++) {
					if(this.list2[i].id == ids) {
						this.list1.push(this.list2[i]);
						this.list2.splice(i, 1)
					}
				}
			},
			//页面数据、状态绑定
			bj: function() {
				if(this.edit == "编辑") {
					this.edit = "完成";
					this.paixu = "拖拽可以排序";
					this.isShow = true;
				} else {
					this.edit = "编辑";
					this.paixu = "点击进入频道";
					this.isShow = false;
					var list2 = this.list2;
					var list3 = [];
					for(var j = 0; j < list2.length; j++) {
						list3.push(list2[j].id)
					}
					axios({
						method: 'POST',
						data: list3,
						url: '/web-editor-web/channel/save.do',
						dataType: 'json',
						success: function(data1) {

						}
					})
				}
			},
			close: function() {
				this.animation_out = true;
				this.animation_in = false;
				this.other = false;
				this.dio = false;
				if(this.edit == "完成") {
					this.edit = "编辑";
					this.paixu = "点击进入频道";
					this.isShow = false;
				}
			},
			others: function() {
				this.animation_out = true;
				this.animation_in = false;
				this.other = true;
				this.dio = true;
				//window.location.href = "/kaxw/kaxw_details"
			},
			getmenu: function() {
				var _that = this;
				axios.get('/web-editor-web/channel/query.do', {}).then(function(res) {
					for(var j = 0; j < res.data.data.length; j++) {
						_that.menu.push(res.data.data[j])
						_that.list2.push(res.data.data[j])
					}
				})
			},
	      loadTop:function() { //组件提供的下拉触发方法
	        //下拉加载
	        var that = this;
	        that.downwarp = true;
        	this.topStatus = "loading";
			setTimeout(function() {
				that.searchCondition.pageNo = 1;
				that.searchCondition.pageSize = 10;
		        that.loadPageList();
		        that.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
			}, 1500);
	      },
	      loadBottom:function() {
	      	this.animent = true;
        	this.bottomStatus = "loading";
			if (this.pagenone < this.searchCondition.pageNo) {
	        	this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        		this.bottomStatus = "";
				return false;
			}else{
		        // 上拉加载
	        	this.downwarp = true;
	        	var that = this;
				setTimeout(function() {
			        that.more();// 上拉触发的分页查询
		        	that.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
				}, 1500);
			}
	      },  
	      loadPageList:function (){
	          // 查询数据  
				var _that = this;
				axios.get('/web-editor-web/channel/list.do?', {
					params: _that.searchCondition
				}).then(function(res) {
					_that.pageList = [];
	          		// 是否还有下一页，没有下一页要禁止上拉
					_that.pagenone = res.data.data.length/10;
					if (_that.pagenone < _that.searchCondition.pageNo) {
						_that.isend = true;
					}else{
						_that.isend = false;
					}
					_that.isHaveMore(true);
					for(var j = 0; j < res.data.data.length; j++) {
						_that.pageList.push(res.data.data[j])
					}
					if(sessionStorage.getItem('recommend') == null){
			        	if(_that.searchCondition.channelAlias == "news_tuijian"){
			        		sessionStorage.setItem("recommend",'recommend');
							_that.title_tj = true;
							setTimeout(function() {
								_that.title_tj = false;
							}, 1700);
			        	}
					}
				})

	            _that.$nextTick(function () {
	            // iphone在使用-webkit-overflow-scrolling属性，移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
	            _that.scrollMode = "touch";
	        });
	      },
	      more:function (){
	          //分页查询
				var _that = this;
	       		 _that.searchCondition.pageNo = parseInt(_that.searchCondition.pageNo) + 1;
				axios.get('/web-editor-web/channel/list.do?', {
					params: _that.searchCondition
				}).then(function(res) {
					_that.animent = false;
					for(var j = 0; j < res.data.data.length; j++) {
						_that.pageList.push(res.data.data[j])
					}
					if (_that.pagenone < _that.searchCondition.pageNo) {
						_that.isend = true;
					}else{
						_that.isend = false;
					}
				})
	      },
	      isHaveMore:function(isHaveMore){
	        // 是否还有下一页，如果没有就禁止上拉刷新
	        this.allLoaded = true; //true是禁止上拉加载
	        if(isHaveMore){
	          this.allLoaded = false;
	        }
	      }
		}
	}
</script>

<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	.item {
		display: inline-block;
	}

	.nav {
		padding: 10px 0 4px 20px;
		border-bottom: 1px solid #ccc;
		padding-right: 40px;
		height: 72px;
	}

	.link {
		color: inherit;
		padding: 20px;
		display: block;
	}

	.class-a {
		border-bottom: 17px solid #3385e3 !important;
		padding: 8px 37px 0px 37px !important;
		border-radius: 0;
	}

	.bu_style {
		border-radius: 0 !important;
		border-bottom: 2px solid #fff;
		margin-right: 10px;
	}
	.recommend {
	    z-index: 9900;
	    position: fixed;
	    top: 81px;
	    left: 0;
	    width: 100%;
	    height: 30px;
	    line-height: 30px;
	    font-size: 12px;
	    text-align: center;
	    background-color: rgba(255,130,1,.7);
	    color: white;
	    -webkit-transition: top 300ms;
	    transition: top 300ms;
	}
	.mt-cell-st {
		position: relative;
		width:750px;
		height:192px;
		background:rgba(255,255,255,1);
		border-bottom: 1px solid #E8E8E8;
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
	.model_logo span {
		position: absolute;
		display: inline-block;
		z-index: 2;
		width: 10px;
		height: 12px;
		position: relative;
		top: 3px;
		left: 0;
	}

	#model_logo {    
		position: fixed;
	    top: 95px;
	    right: 0px;
	    height: 55px;
	    line-height: 60px;
	    cursor: pointer;
	    z-index: 9999;
	    background-color: #fff;
	    width: 50px;
	    font-size: 40px;
	}

	.color-item {
		float: left;
		min-width: 75px;
		height: 62px;
		overflow: hidden;
		height: 4rem;
		background: #F4F5F6;
		border-radius: 0.4rem;
		text-align: center;
		line-height: 4rem;
		color: #333333;
		margin: 0 4px 13px 10px;
		font-size: 1.6rem;
		position: relative;
	}

	.page-tab-container {
		padding-top: 158px;
	}
	/*菜单*/

	.header {
		z-index: 9990;
		position: fixed;
		/*top:0;TODO*/
		top: 88px;
		left: 0;
		width: 100%;
		height: 72px;
		line-height: 60px;
		text-align: center;
		background-color: white;
		border-bottom: 1px solid #eee;
		display: -moz-box;
		display: -webkit-box;
		display: box;
	}

	.scrollx {
		height: 72px;
		overflow: hidden;
		position: relative;
		-moz-box-flex: 1;
		-webkit-box-flex: 1;
		box-flex: 1;
	    padding-right: 30px;
	}

	.scrollx-content {
		width: 100%;
		overflow-x: auto;
		white-space: nowrap;
	}

	.nav {
		padding: 0 0px 0 10px;
	}
	.shade{
	    position: fixed;
	    top: 58px;
	    height: 112px;
	    width: 185px;
	    z-index: 9999999999;
	}
	.bo-p{
	    padding-bottom: 80px;
	}
	.nav li {
		display: inline-block;
		padding: 8px 37px 17px 37px;
		font-size: 1.6rem;
		margin-bottom: 30px;
		/*把水平滚动条撑到外面,达到隐藏的目的*/
		vertical-align: middle;
		color: #666666;
	}

	.nav .active {
		border-bottom: 2px solid #285FB1;
		font-size: 1.8rem;
		color: #285FB1;
	}
	/*动画淡入 淡出*/

	@-webkit-keyframes fadeIn {
		50% {
			opacity: 0.5;
			/*初始状态 透明度为0*/
		}
		80% {
			opacity: 0.8;
			/*中间状态 透明度为0*/
		}
		100% {
			opacity: 1;
			/*结尾状态 透明度为1*/
		}
	}

	.animation_in {
		-webkit-animation-name: fadeIn;
		/*动画名称*/
		-webkit-animation-duration: 0.3s;
		/*动画持续时间*/
		-webkit-animation-iteration-count: 1;
		/*动画次数*/
		-webkit-animation-delay: 0s;
		/*延迟时间*/
	}

	@-webkit-keyframes fadeout {
		100% {
			opacity: 1;
			/*初始状态 透明度为0*/
		}
		50% {
			opacity: 0.5;
			/*中间状态 透明度为0*/
		}
		0% {
			opacity: 0;
			/*结尾状态 透明度为1*/
		}
	}

	.animation_out {
		-webkit-animation-name: fadeout;
		/*动画名称*/
		-webkit-animation-duration: 0.3s;
		/*动画持续时间*/
		-webkit-animation-iteration-count: 1;
		/*动画次数*/
		-webkit-animation-delay: 0s;
		/*延迟时间*/
	}
	.fade-enter-active{
		transition: opacity 1s
    }
	.fade-leave-active {
		transition: opacity 3s
    }
    .fade-enter, .fade-leave-active {
		opacity: 0
    }
	.scrollTop{
		position: fixed;
	    bottom: 46px;
	    right: 48px;
	    width: 100px;
	    height: 100px;
	    background: url(../../../static/img/mescroll-totop.png) no-repeat;
	}
	.downwarp-progress {
	    display: inline-block;
	    width: 33px;
	    height: 33px;
	    vertical-align: middle;
	}

	.downwarp-progress1 {
	    display: inline-block;
	    vertical-align: middle;
	    width: 16px;
	    height: 16px;
	}
	.downwarp-progress-s{
	    display: inline-block;
		-webkit-transition-property: -webkit-transform;
	    -webkit-transition-duration: 1s;
	    -moz-transition-property: -moz-transform;
	    -moz-transition-duration: 1s;
	    -webkit-animation: rotate 3s linear infinite;
	    -moz-animation: rotate 3s linear infinite;
	    -o-animation: rotate 3s linear infinite;
	    animation: rotate 3s linear infinite;
    }
	@keyframes rotate{
		from{transform: rotate(-359deg)
		}
	    to{transform: rotate(359deg)
	    }
	}
	.is_top{
	    position: fixed;
	    width: 100%;
	    overflow: auto;
	    height: 100%;
        padding-bottom: 78px;
	}
	.ending{
		position: relative;
	    width: 100%;
	    text-align: center;
	    top: -80px;
    	margin: 32px 0;
	}
	.titile_back{
	    background: url("./../../../static/img/palne_a.png") center;
	}
</style>
