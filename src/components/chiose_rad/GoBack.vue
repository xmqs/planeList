<template>
	<div id="GoBack">
		<div style="position: fixed;top: 80px;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;">
			
		</div>
	</div>
</template>

<script>
export default {
    name: "GoBack",
    data(){
	    return{
	    }
    },
	methods:{
	},
    created: function() {
        this.$router.push({name: 'cwty_inp'})
	},
}
</script>
<style scoped>
</style>