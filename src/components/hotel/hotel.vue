<template>
	<!--选择要看的新闻类型-->
	<div id="hotel">
		<!--头部临时用-->
		<!--<div style="position: fixed;top:80px;margin-left: 40%;" v-show="lod">
			正在加载,请稍后...
		</div>-->
		<!--内容-->
		<div class="page-tab-container">
			<section class="ui-container">
				<div class="content_box">
					<h3 class="news_title">
						<img style="position: relative;top: 9px;width: 30px;height: 30px;border-radius: 50%;" src="../../../static/img/Rectangle181.png"/>&nbsp;&nbsp;南京禄口国际机场铂尔曼大酒店
					</h3>
					<div id="contt" class="contt" :class="{'clamp':clamp == true}">
						<p style="padding: 10px 0;">南京禄口机场铂尔曼大酒店坐落于南京禄口国际机场两座航站楼之间的中心位置。酒店至出发大厅步行仅需30秒钟，乘搭地铁至市区仅需30分钟，酒店地下层的交通中心同时为您准备了发往市区及周边城市的旅客大巴，其优越的地理位置保证您出行无忧。时尚而人性化的设计以及高科技元素的融入，更是令商务及旅游人士尽情感受“轻松入住，优越尽享”。
						酒店拥有312间宽敞明亮的客房，全部配备电子设备扩展坞座，无线高速上网，以及高质量的双层隔音落地窗，其中行政客房配备奈斯派索Nespresso ®咖啡机。为了满足客人多方面的需求，酒店还有1个无柱大型宴会厅，3个汇集中外美食的餐厅，10间多功能会议室，以及设施齐备的健身中心和水疗中心。舒适宽敞的高质量隔音客房和完善的休闲娱乐设施，让旅客在一天的劳累后于充满关爱和轻松的环境中重塑活力！</p>
						<img src="../../../static/hotelImg/h1.png"/>
						<p style="width: 100%;text-align: center;padding: 3px 0 16px 0;font-size: 3.6vw;">酒店大堂</p>
						<img src="../../../static/hotelImg/h2.png"/>
						<p style="width: 100%;text-align: center;padding: 3px 0 16px 0;font-size: 3.6vw;">酒店客房</p>
						<img src="../../../static/hotelImg/h3.png"/>
						<p style="width: 100%;text-align: center;padding: 3px 0 3px 0;font-size: 3.6vw;">“紫金”中餐厅</p>
						<p style="width: 100%;text-align: left;padding: 3px 0 16px 0;">
						经典中式珍馐配合现代浪漫的氛围，在传承淮扬菜精湛烹饪文化的同时，为客人提供精品粤菜及川湘美味。9个别致的包厢，3个典雅贵宾包间更是私人聚会的首选。</p>
						<img src="../../../static/hotelImg/h4.png"/>
						<p style="width: 100%;text-align: center;padding: 3px 0 3px 0;font-size: 3.6vw;">“雅韵”西餐厅（全日制餐厅）</p>
						<p style="width: 100%;text-align: left;padding: 3px 0 16px 0;">
						优雅舒适的全日制餐厅全天候供应中西合璧的点菜菜单和国际自助餐。在开放式的厨房，各地名厨现场烹制中外美食，让客人亲历美食之旅。</p>
						<img src="../../../static/hotelImg/h5.png"/>
						<p style="width: 100%;text-align: center;padding: 3px 0 3px 0;font-size: 3.6vw;">“咔牛屋”特色餐厅</p>
						<p style="width: 100%;text-align: left;padding: 3px 0 16px 0;">
						提供一流的牛扒和西餐精选，更有铂尔曼Vinoteca葡萄酒体验服务，畅享惬意时光。特色甘醇红酒和牛肉完美结合，环境优雅，让您体验舒心静谧时刻，安享美食。</p>
						<img src="../../../static/hotelImg/h6.png"/>
						<p style="width: 100%;text-align: center;padding: 3px 0 3px 0;font-size: 3.6vw;">“天港”大堂吧</p>
						<p style="width: 100%;text-align: left;padding: 3px 0 16px 0;">
						品尝高品质铂尔曼Vinoteca红酒，享用铂尔曼咖啡和茗茶，以及铂尔曼Tapastry小食艺术。这里的作为商务会谈或休闲放松的绝佳场所，可与朋友们在这里放松心情，尽享惬意。</p>
						<img src="../../../static/hotelImg/h7.png"/>
						<img src="../../../static/hotelImg/h8.png"/>
						<p style="width: 100%;text-align: center;padding: 3px 0 3px 0;font-size: 3.6vw;">健身中心</p>
						<p style="width: 100%;text-align: left;padding: 3px 0 16px 0;">
						在两场合同签订会议之间，在颠倒时差之后，铂尔曼健身就是这个问题的最佳答案。找到属于自己的时间，让身心全面充电，重展活力与舒体均衡。按自己的意愿，尽享舒畅时光。</p>
						<img src="../../../static/hotelImg/h9.png"/>
						<p style="width: 100%;text-align: center;padding: 3px 0 3px 0;font-size: 3.6vw;">水疗中心</p>
						<p style="width: 100%;text-align: left;padding: 3px 0 16px 0;">
						谁说工作与休闲不可同时兼顾？水疗中心提供多项美容护肤、身体按摩项目，创造熟悉美妙的体验。</p>
						联系方式：<br />
						电话：(86)25-69836888<br />
						传真：(86)25-69836999<br />
						邮箱：H8737@accor.com

					</div>
					<div v-if="mores == true" @click="more" style="margin: 7px auto;margin-top: 25px;height: 26px;width: 80px;line-height: 26px;text-align: center;font-size: 12px;border: 1px solid #285FB1;color: #285FB1;border-radius: 4px;" class="">
						展开更多
					</div>
					<div v-if="mores == false" @click="less" style="margin: 7px auto;height: 38px;width: 124px;line-height: 38px;text-align: center;
    					font-size: 16px;border-radius: 20px !important;color: #333;border: 1px solid #333;position: fixed;bottom: 11px;background: #fff;left: 0;right: 0;z-index: 999;" class="">
						收起
					</div>
				</div>
				<div class="padding_x_10">
					<ul class="table_view">
						<li class="table_view_cell media">
							<p class="font_16 black_3">为你推荐</p>
						</li>
						<li @click="godetails(item.originUrl)" v-for="item in list" class="table_view_cell media">
							<img style="width: 113px;height: 74px;" class="pull_right" :src="item.cover">
							<div class="media_body">
								<p class="font_16 font_ellipsis_multiLine">{{item.sourceLabel}}</p>
								<p class="source_time">{{item.createTime | formatDate}}</p>
							</div>
						</li>
					</ul>
				</div>
			</section>
		</div>
	</div>
</template>
<script>
	import { formatDate } from "../../assets/js/date.js";
	import axios from "axios";
	export default {
		name: "hotel",
		data() {
			return {
	        	clamp:true,
	        	mores:true,
	        	list:[]
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			}
		},
		methods: {
			lists(){
				//查询详情
				var That = this;
				axios.post('/web-editor-web/public/catalog/querySource.do?catalogAlias=news_boerman_news&sourceType=03', {
				}).then(function(data) {
					//console.log(data.data.data)
					That.list = data.data.data;
				})
			},
			more(){
				//document.getElementById("contt").style.animation = "mynewmove 4s 2";
				document.getElementById("contt").style.height='3680px';
				setTimeout(()=>{
					this.clamp = !this.clamp;
					this.mores = false;
				},1000);
			},
			less(){
				//document.getElementById("contt").style.animation = "mynewmove 4s 2";
				document.getElementById("contt").style.height='93px';
				setTimeout(()=>{
					this.clamp = !this.clamp;
					this.mores = true;
				},1000);
			},
			godetails(res){
        window.location.href = res;
				//window.location.href='http://localhost:9900/#/kaxw/kaxw_list/news_tuijian/0';
			}
		},
		mounted() {
			document.getElementById("contt").style.height='93px';
		},
		created: function() {
			this.lists();
		}
	}
</script>

<style scoped>
	/***详情页面样式****/
	html,body{
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
	}

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
	.contt{
	    transition:height 1s;
		font-size: 3.82vw;
	    font-weight: Light;
	    color: #333;
	    line-height: 2;
	    overflow : hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}
	.clamp{
		-webkit-line-clamp: 3;
	}
	.content_box {
    text-align: justify;
    word-break: break-all;
    word-wrap: break-word;
    color:#0D0D0D;
    line-height: 1.8;
    width: 100%;
    overflow: hidden;
    padding: 36px;
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
	    text-align: center;
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
		padding: 21px 36px;
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

	img {
		border: 0;
	    width: 100%;
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
		font-size: 1.2rem;
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
</style>
