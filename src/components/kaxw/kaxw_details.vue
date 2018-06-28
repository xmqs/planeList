<template>
	<!--选择要看的新闻类型-->
	<div id="home">
		<!--头部临时用-->
		<div style="position: fixed;top:80px;margin-left: 40%;" v-show="lod">
			正在加载,请稍后...
		</div>
		<!--内容-->
		<div v-show="lod1" class="page-tab-container">

			<section class="ui-container">
				<div class="content_box">
					<h3 class="news_title">{{contents.sourceLabel}}</h3>
					<p class="title_time">{{contents.createTime | formatDate}}<span class="inline_block padding_z_10">{{contents.author}}</span></p>

					<div class="contt" v-html='contents.htmlContent'>
					</div>

				</div>
				<div class="padding_x_10">
					<ul class="table_view">
						<li class="table_view_cell media">
							<p class="font_16 black_3">为你推荐</p>
						</li>
						<li	@click="th_tuijian(item.sourceId)" v-for="item in tuijian" class="table_view_cell media">
							<img style="width: 113px;height: 74px;" v-if="item.cover" class="pull_right"  :src="item.cover">
							<div class="media_body">
								<p class="font_16 font_ellipsis_multiLine">{{item.sourceLabel}}</p>
								<p class="source_time">{{item.author}}&nbsp;<span class="inline_block padding_z_10">{{item.createTime | formatDate}}</span></p>
							</div>
						</li>
					</ul>
				</div>

			</section>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
  	import { Toast } from 'mint-ui'
	import { formatDate } from '../../assets/js/date.js';
	export default {
		name: "kaxw_details",
		data() {
			return {
				sourceId: "",
				contents: "",
				tuijian:[],
		        tuijianCondition:{  //推荐属性
		    	  channelAlias:"news_tuijian",
		          pageNo:"",
		          pageSize:3
		        },
	        	lod:true,
	        	lod1:false
			}
		},
		methods: {
			th_tuijian(res){
				//查询详情
				var That = this;
				axios.get('/web-editor-web//s/h/query/'+res+'.do', {
				}).then(function(data) {
					That.contents = data.data.data;
				})
				.catch(function(err){
					Toast('网络出错')
				});
			}
		},
		mounted() {

		},
		created: function() {
			var That = this;
			axios.get('/web-editor-web/stat/r.jpg', {
				params: {
					dd: That.$route.params.sourceId,
					tp:0,
					url:window.location.href,
					ua:navigator.userAgent,
					refer:document.referrer
				}
			}).then(function(data) {

			})
			//查询详情
			axios.get('/web-editor-web//s/h/query/'+this.$route.params.sourceId+'.do', {
			}).then(function(data) {
				That.contents = data.data.data;
			})
			.catch(function(err){
				Toast('网络出错')
			});

            // 查询数据
			axios.get('/web-editor-web/channel/list.do?', {
				params: That.tuijianCondition
			}).then(function(res) {
				for(var j = 0; j < res.data.data.length; j++) {
					That.tuijian.push(res.data.data[j])
				}
				setTimeout(function() {
					That.lod = false;
					That.lod1 = true;
				},500);
			})
			.catch(function(err){
				Toast('网络出错')
			});
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			}
		}
	}
</script>

<style scoped>
	/***详情页面样式****/

	*{
	  -webkit-overflow-scrolling: touch;
	  font-family: PingFangSC;
	}
	.font_18 {
		font-size: 1.8rem;
	}

	.font_16 {
		font-size: 1.6rem;
	}

	.font_12 {
		font-size: 1.2rem;
	}
	.page-tab-container{
		background: #fff;
	}
	.inline_block {
		display: inline-block;
		font-size:24px;
	font-family:PingFangSC-Regular;
	color:rgba(153,153,153,1);
	}

	.padding_z_10 {
		padding-left: 0rem;
	}

	.padding_x_10 {
		padding-bottom: 1rem;
	}

	.black {
		color: #000000;
	}

	.black_3 {
		color: #333333;
		font-size: 32px;
		font-weight: Regular;
	}

	.dark_grey {
		color: #999999;
	}

	.bg_body_white {
		background-color: #FFFFFF;
	}

	.content_box {
    text-align: justify;
    word-break: break-all;
    word-wrap: break-word;
    color:#0D0D0D;
    line-height: 1.8;
    width: 100%;
    overflow: hidden;    
	position: relative;
	}

	.news_header {
		background: #285FB1;
		text-align: center;
		line-height: 4.5rem;
		font-size: 1.8rem;
		color: #FFFFFF;
		position: relative;
	}

	.news_title {
		font-weight: Medium;
		padding-bottom: 0.6rem;
		font-size: 36px;
		color: #0D0D0D;
		font-family: PingFangSC;
	}

	.title_time {
		color: #999999;
		font-size: 24px;
		padding-bottom: 0.7rem;
		font-family: PingFangSC;
		font-weight: Regular;
		padding-top: 4px;
	}

	.news_p {
		padding: 0.7rem 0;
		text-align: justify;
	}

	._wrap {
		word-break: break-all;
		word-wrap: break-word;
	}
	/***允许换行*****/

	.align-items {
		display: -webkit-flex;
		display: flex;
		align-items: center;
		-webkit-align-items: center !important;
	}
	/***自动垂直居中***/
	/**推荐列表**/

	.table_view {
		position: relative;
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;
		list-style: none;
		background-color: #fff;
	}

	.table_view:before {
		top: -1px;
	}

	.table_view:before {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #EEEEEE;
	}

	.table_view .media,
	.table_view .media_body {
		overflow: hidden;
	}

	.table_view_cell {
		position: relative;
		overflow: hidden;
		padding: 21px 25px;
		-webkit-touch-callout: none;
	}

	.pull_right {
		margin-left: 10px;
		width: 115px;
		height: 75px;
	}

	.table_view .media_object {
		border-radius: 0.1875rem;
	}

	.media_object {
		line-height: 42px;
		max-width: 42px;
		height: 42px;
	}

	.pull_right {
		float: right;
	}
	.contt{
		width: 100%;
	}
	img {
		border: 0;
	}

	.media_body {
		overflow: hidden;
	}

	.table_view_cell:after {
		position: absolute;
		right: 15px;
		bottom: 0;
		left: 15px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #ebebeb;
	}

	.font_ellipsis_multiLine {
		/***文字超出指定行数显示省略号***/
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/**指定行数**/
		overflow: hidden;
		font-size: 32px !important;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
	}

	.source_time {
		font-size: 3.7vw;
		color: #999999;
		padding-top: 1rem;
	}
	.downwarp-progress-s{
	    display: inline-block;
	    width: 33px;
	    height: 33px;
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
	img{
		width: 100%;
	}
</style>
