<template>
	<div id="phoneflight">
		
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
		watch: {

		},
		mounted() {
        	//auth.getAccessToken({appId:"elecPort"});
		},
		created() {
			this.token();
		},
		methods: {
			token(){
				if(sessionStorage.getItem('fg') == 1){
					var userinfo = sessionStorage.getItem('userifo');
					userinfo = JSON.parse(userinfo);
					axios.post('/eport-server/checkin/reminder.do', {
					    idNumber:userinfo.idNumber,
						telephone:userinfo.phone
					})
					.then(function (response) {
						sessionStorage.removeItem('fg');
					    window.location = response.data.data;
					})
					.catch(function (error) {
					    console.log(error);
					});
				}else{
					window.location = 'http://222.190.243.8:8080/H5/index.html#/'
				}
			}
		}
	}
</script>
<style scoped>
</style>
