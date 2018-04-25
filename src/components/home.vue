<template>
	<div id="home">
		<!--头部临时用-->
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			口岸新闻
			<span style="display: inline-block;width:10px;height: 16px;background: url(../../../static/img/Back.png) no-repeat;position: absolute;left:15px;top: 50%;margin-top:-8px;"></span>
			<!--<span style="display: inline-block;width:19px;height: 19px;background: url(../../../static/img/Group6.png) no-repeat;position: absolute;right:15px;top: 50%;margin-top:-9px;"></span>-->
		</header>
		<div class="page-tab-container">
			<div style="position: absolute;top: 57px;width: 100%;" class="">
				<router-link :to="{path:'kaxw/kaxw_list'}">
					<div style="width: 100%;">
						<mt-button style="width: 100%;" type="default">口岸新闻</mt-button>
					</div>
				</router-link>	
				
				<div @click="zhiji" style="width: 100%;margin-top: 13px;">
					<mt-button style="width: 100%;" type="default">手机值机</mt-button>
				</div>
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
			}
		}
	}
</script>

<style>

</style>