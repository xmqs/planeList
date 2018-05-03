<template>
	<div id="search_home">
		<!--模拟的标题-->
		<div class="header">
			<form action="javascript:search();" style="margin: 0;" id="from">
				<div id="" class="flex-box">
					<div class="flex-item item-input-wrapper">
						<span @click="searchs" class="search-icon"></span>
						<input v-model="cons" id="" type="text" v-on:blur="changeCount(cons)" placeholder="请输入搜索关键词" />	
					</div>
					<router-link :to="{path:'kaxw_list'}">
						<p id="search" class="btn-right flex-item item-nosearch">取消</p>
					</router-link>	
				</div>
			</form>
		</div>
		<!--滑动区域-->
		<div v-show="others" id="mescroll" class="mescroll">
			<div class="bgWhite" style="margin-bottom:10px;">
				<p class="search-title">
					历史记录
					<span class="edit_over" id="edit_over">完成</span>
					<span @click="delect_history" id="delects_box" class="delect_history"></span>
				</p>
				
				<ul class="search-words clearfix" id="search-words">
					<li v-for="item in page_local" class="ui-col ui-col-50 delect-item">
						{{item}}
						<i class="delect-icon"></i>
					</li>
				</ul>
			</div>	
			<!--描述：热门新闻-->
			<div v-show="others" class="bgWhite">
				<p class="hot-title">热门新闻 </p>
				<ul class="hot-words clearfix">
					<li v-for="item in remen" @click="search_cons(item.sourceLabel)" class="ui-col ui-col-50">{{item.sourceLabel}}</li>
				</ul>
			</div>
		</div>
		
		<div id="sertch-con" class="sertch-con">
			<ul id="dataList" class="data-list">
					<li v-for="item in pageList" class="infors">
						<router-link :to="{path: '/kaxw/kaxw_details/'+item.sourceId}">
							<p class="pd-name">{{item.sourceLabel}}</p>
							<!--<img class="pd-img" src=""/>-->
							<p class="pd-time">{{item.createTime | formatDate}}</p>
						</router-link>
					</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { formatDate } from '../../assets/js/date.js';
	export default {
		name: "search",
		data() {
			return {
		        searchCondition:{  //分页属性  
		    	  keyword:"",
		          pageNo:"",  
		          pageSize:""
		        },
		        remenCondition:{  //热门属性  
		    	  channelAlias:"news_redian",
		          pageNo:"",  
		          pageSize:12
		        },
	            localStorages:"",
	            page_local:[],
		        cons:"",
		        pageList:[],
		        others : true,
		        remen:[]
			}
		},
		methods: {
			delect_history: function() {
				 localStorage.removeItem("search");
				 this.page_local = []
			},
			search_cons: function(con) {
				var _that = this;
				if (con != "") {
					_that.searchCondition.keyword = con;
					axios.get('/web-editor-web/webpage/search.do?', {
						params: _that.searchCondition
					}).then(function(res) {
							_that.pageList = [];
							_that.others = false;
							if(res.data.data != undefined){
								for(var j = 0; j < res.data.data.length; j++) {
									_that.pageList.push(res.data.data[j])
								}
							}
							if (localStorage.getItem("search") != null) {
								_that.localStorages =localStorage.getItem("search") + _that.cons + ",";
							}else{
								_that.localStorages =_that.cons + ",";
							}
							localStorage.setItem("search",_that.localStorages);
							_that.cons = "";
					})
				}
			},
			//获取搜索列表信息
			searchs: function() {
				var _that = this;
				if (_that.cons != "") {
					_that.searchCondition.keyword = _that.cons;
					axios.get('/web-editor-web/webpage/search.do?', {
						params: _that.searchCondition
					}).then(function(res) {
							_that.pageList = [];
							_that.others = false;
							if(res.data.data != undefined){
								for(var j = 0; j < res.data.data.length; j++) {
									_that.pageList.push(res.data.data[j])
								}
							}
							if (localStorage.getItem("search") != null) {
								_that.localStorages =localStorage.getItem("search") + _that.cons + ",";
							}else{
								_that.localStorages =_that.cons + ",";
							}
							localStorage.setItem("search",_that.localStorages);
							_that.cons = "";
					})
				}
			},
			changeCount: function(value) {
		        if(value != ""){
		        	this.others = false;
		        }else{
		        	this.others = true;
		        }
		    },
		    getlist:function(){
	            // 查询数据  
				var _that = this;
				axios.get('/web-editor-web/channel/list.do?', {
					params: _that.remenCondition
				}).then(function(res) {
					for(var j = 0; j < res.data.data.length; j++) {
						_that.remen.push(res.data.data[j])
					}
				})
		    }
		},
		mounted() {
			
		},
		created: function() {
			var cons = localStorage.getItem("search");
			if (cons != null) {
				this.page_local = cons.split(',');
			}
			this.getlist();
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
		}
	}
</script>

<style scoped>
	/*模拟的标题*/
	body{
		background-color: #F0F0F0;
	}
	.header {
		z-index: 9990;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 44px;
		line-height: 44px;
		text-align: center;
		border-bottom: 1px solid #eee;
		background-color: #F0F0F0;
	}
	.header .flex-box{
		display: flex;
	}
	
	.item-input-wrapper{
		flex: 1;
		position: relative;
	}
	.search-icon{
		display: inline-block;
		position: absolute;	
		width: 13px;
		height: 13px;
		background: url(/static/img/Fill1.png) no-repeat;
		top:50%;
		margin-top: -7px;
		left: 30px;
	}
	.item-nosearch{
		flex:0 0 32px;
	}
	.header input {
		padding-left: 34px;
		width:calc( 100% - 34px );
		font-size: 1.2rem;
		color: #999999;
		height:28px;
		line-height:28px;
		border: 1px solid #fff;
		border-radius:30px;
		outline: none;
		-webkit-appearance: none;
		vertical-align: middle;
		
	}
	
	.header .btn-right {
		margin: 0 16px 0 0;
		color: #285FB1;
		font-size: 1.6rem;
		margin-top: 2px;
	}
	
	
	/*历史搜索*/
	
	.search-title,.hot-title{
		padding: 20px 0 20px 18px;
		font-size: 1.5rem;
		color:#333333;
		position: relative;
	}
	.search-title:before,.hot-title:before{
		display: inline-block;
		content: "";
		width: 15px;
		height: 15px;
		margin-right:12px;
		vertical-align: middle;
		margin-top:-2px;
	
	}
	
	/*删除按钮*/
	.delect_history{
		position: absolute;
		width: 12px;
		height: 14px;
		background: url(/static/img/Group2.png) no-repeat;
		right:15px;
		top: 50%;
		margin-top: -7px;	
	}
	.edit_over{/*编辑完成*/
		display: none;
		position: absolute;
		right: 15px;
		color: #999999;
		font-size: 1.2rem;
		top: 50%;
		margin-top: -8px;
	}
	
	.hot-title:before{
		background: url(/static/img/Fill11.png);	
	}
	.search-title:before{
		background: url(/static/img/Group.png);	
	}
	
	
	
	.delect-item{
		position: relative;
	}
	
	
	
	.delect-icon{
		display: none;
		position: absolute;
	    width:9px;
	    height:9px;
	    right: 18px;
	    top: 50%;
	    margin-top: -4.5px;
	    -webkit-transition: all 0.4s ease;
	    -o-transition: all 0.4s ease;
	    transition: all 0.4s ease;
	    background: url(/static/img/delect-item.png) no-repeat;
	    
	}
	.ui-col {
		float: left;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 100%;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.ui-col-50 {
		width:50%
	}
	.search-words,.hot-words{
		width: 100%;
		
	}
	.search-words li,.hot-words li{
		padding-left:16px;
		margin-bottom:25px;
		line-height: 15px;    
		font-size: 14px;
    	color: #6d6d6d;
	}
	.search-words li:nth-of-type(odd){
		border-right:1px dotted #333;
	}
	
	
	/*mescroll 滚动区域*/
	
	.mescroll {
		position: fixed;
		top: 44px;
		bottom: 0;
		height: auto;
	}
	
	
	/*搜索结果*/
	
	.data-list li {
		position: relative;
		padding: 10px 8px 10px 10px;
		border-bottom: 1px solid #eee;
	}
	.data-list{
		margin-top: 44px;
	}
	.data-list .pd-img {
		position: absolute;
		left: 18px;
		top: 4px;
		width: 80px;
		height: 80px;
	}
	.pd-time{
	    margin-top: 10px;
        color: #929292;
	}
	.data-list .pd-name {
		font-size: 16px;
		line-height: 20px;
		height: 40px;
		overflow: hidden;
	    color: #333;
	}
	
	.data-list .pd-price {
		margin-top: 8px;
		color: red;
	}
	
	.data-list .pd-sold {
		font-size: 12px;
		margin-top: 8px;
		color: gray;
	}
	/*回到顶部按钮*/
	.mescroll-totop {
		font-size: 12px;
		line-height: 10px;
		background-color: white;
		border: 1px solid gray;
		text-align: center;
	}
	
	.mescroll-totop p {
		padding-top: 6px;
		color: #666;
	}
	.mescroll {
	    width: 100%;
	    height: 100%;
	    overflow-y: auto;
	}
	
</style>