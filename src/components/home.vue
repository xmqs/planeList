<template>
	<div id="home">
		<!--头部临时用-->
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			口岸新闻
			<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../static/img/Back.png"/>
		</header>
		<div class="page-tab-container">
			<div style="position: absolute;top: 57px;width: 100%;" class="">
				<router-link :to="{path: '/kaxw/kaxw_list/'+'news_tuijian'+'/'+0}">
					<div style="width: 100%;">
						<mt-button style="width: 100%;" type="default">口岸新闻</mt-button>
					</div>
				</router-link>

				<div @click="token" style="width: 100%;margin-top: 13px;">
					<mt-button style="width: 100%;" type="default">手机值机</mt-button>
				</div>

        <router-link :to="{path:'flight'}">
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
		data() {
			return {

			}
		},
		watch: {

		},
		mounted() {

		},
		created() {
		},
		methods: {
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
