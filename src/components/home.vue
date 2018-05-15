<template>
	<div id="home">
		<!--头部临时用-->
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			口岸新闻
			<span style="display: inline-block;width:10px;height: 16px;background: url(./static/img/Back.png) no-repeat;position: absolute;left:15px;top: 50%;margin-top:-8px;"></span>
			<!--<span style="display: inline-block;width:19px;height: 19px;background: url(../../../static/img/Group6.png) no-repeat;position: absolute;right:15px;top: 50%;margin-top:-9px;"></span>-->
		</header>
		<div class="page-tab-container">
			<div style="position: absolute;top: 57px;width: 100%;" class="">
				<router-link :to="{path: '/kaxw/kaxw_list/'+'news_tuijian'+'/'+0}">
					<div style="width: 100%;">
						<mt-button style="width: 100%;" type="default">口岸新闻</mt-button>
					</div>
				</router-link>

				<div @click="zhiji" style="width: 100%;margin-top: 13px;">
					<mt-button style="width: 100%;" type="default">手机值机</mt-button>
				</div>

        <router-link :to="{path:'flight/Destination'}">
          <div style="width: 100%;margin-top: 13px;">
            <mt-button style="width: 100%;" type="default">航班动态</mt-button>
          </div>
        </router-link>

				<router-link :to="{path:'hwcx/hwcx'}">
				<div style="width: 100%;margin-top: 13px;">
					<mt-button style="width: 100%;" type="default">货物查询</mt-button>
				</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		name: "home",
    www:"",
		data() {
			return {

			}
		},
		watch: {

		},
		mounted() {
      auth.getAccessToken({appId:"elecPort"});
		},
		created() {

		},
		methods: {
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
			},
      flightM:function () {
        window.location += "flight";
      }

		}
	}
</script>
<style>
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
    background-color: #fff;
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
</style>
