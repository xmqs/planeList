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
				var retData;
				var test;
				var that = this;
				var params = {
		            "appId": "elecPort"
		        };
		        //调用原生方法
		        auth.getAccessToken(JSON.stringify(params));
	            //原生回调
			    function getAccessTokenCallback(resopnse) {
			        retData = JSON.parse(resopnse);
			    }
			    function getUserInfoByToken() {
			        var params = {
			            "accessToken": retData.data.accessToken,
			            "appId": "elecPort"
			        };
			        auth.getUserInfoByToken(JSON.stringify(params));
			    }
		        function getUserInfoByTokenCallback(params) {
					$axios({
					    method: 'post',
					    url:'/znmhH5/auth/getUserInfo',
					    data:{
					    	resp : params
					    }
					}).then((res)=>{
					    testinfo();
					});
			    }
	            function testinfo() {
			        let test2 = {
			          data:test.data,
			          msg:"操作成功",
			          sign:test.sign,
			          signType:test.sign_type
			        };
			        test = JSON.parse(test);
			        let test2 = {
			            msg: "操作成功",
			            data: test.data,
			            success: "true",
			            sign: test.sign,
			            signType: "RSA"
			        }
			        test2 = JSON.stringify(test2);
			        
			        $axios({
					    method: 'post',
					    url:'/eport-server/auth/mynj/getInfo.do',
					    data:test2,
			            dataType: 'json',
			            contentType: 'Application/json',
					}).then((res)=>{
					    that.idNumber = res.idNumber;
					    that.telephone = res.telephone;
					});
					axios.post('/eport-server/checkin/reminder.do', {
					    idNumber:that.idNumber,
						telephone:that.telephone
					})
					.then(function (response) {
					    window.location = response.data.data;
					})
					.catch(function (error) {
					    console.log(error);
					});
			    }
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
			},*/
      flightM:function () {
        window.location += "flight";
      }

		}
	}
</script>
