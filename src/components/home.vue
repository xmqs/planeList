<template>
	<div id="home">
		<!--头部临时用-->
    <header>
     口岸新闻
      <span id="h_back"></span>
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
        <router-link :to="{path:'flight'}">
          <div style="width: 100%;margin-top: 13px;">
            <mt-button style="width: 100%;" type="default">航班动态</mt-button>
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
