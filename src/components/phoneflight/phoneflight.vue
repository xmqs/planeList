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
			}
		}
	}
</script>
<style scoped>
</style>
