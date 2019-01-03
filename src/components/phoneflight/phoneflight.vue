<template>
	<div id="phoneflight">
    1、手机值机一般在航班计划起飞前<span class="fwb">24小时</span>开始，至计划起飞前<span class="fwb">60分钟</span>结束。若手机值机无法成功，请前往值机柜台人工办理。人工柜台提前<span class="fwb">40分钟</span>停止办理值机手续。
    <br>
    2、手机值机特别适合<span class="fwb">无托运行李</span>的旅客。如您需要托运，亦可先在手机选座完成值机手续后前往柜台办理托运。
    <br>
    3、旅客直接通过安检应持有<span class="fwb">电子二维码</span>，必须提前<span class="fwb">60分钟</span>通过安检。
    <br>
    4、目前，手机值机支持<span class="fwb">国内航线</span>绝大部分航班，<span class="fwb">不含不包括不支持</span>9C春秋航空及AQ九元航空的航班。
    <br>
    服务电话：<a href="tel:025-96066">025-96066</a>
    <div class="zjbutton" @click="token()">我已阅读以上内容，开始值机</div>
    <a style="text-align: center;display: block" href="https://m.mynj.cn:11162/s/img/20180912/765E4049F31947F687F72EF3773F8914.jpg">
      <img src="https://m.mynj.cn:11162/s/img/20180912/765E4049F31947F687F72EF3773F8914.jpg" alt="" style="width: 50%;margin: 0 auto">
    </a>
  </div>
</template>
<script>
	import axios from "axios";
	export default {
		name: "phoneflight",
		data() {
			return {

			}
		},
		methods: {
			token(){
				//if(sessionStorage.getItem('fg') == 1){
					var userinfo = sessionStorage.getItem('userifo');

					if(userinfo==null||userinfo==undefined){
            window.location = "http://n5.njiairport.com/WeixinCKI/login.jsp"
          }
					userinfo = JSON.parse(userinfo);
					axios.post('/eport-server/checkin/reminder.do', {
            idNumber:userinfo.idNumber,
						telephone:userinfo.phone
					})
					.then(function (response) {
						  //sessionStorage.removeItem('fg');
              //this.$router.replace({path: response.data.data})
              window.location = response.data.data;
					})
					.catch(function (error) {
					    console.log(error);
					});
				//}else{
				//}
			}
		},
	}
</script>
<style scoped>
  #phoneflight{
    padding: 30px;
    font-size: 36px;
  }
  .zjbutton{
    padding: 6px 0;
    text-align: center;
    margin-top: 36px;
    background: #0d9bf2;
    color: #fff;
    border-radius: 4px;
  }
  .fwb{
    font-size: 36px;
    font-weight: 600!important;
  }
</style>
