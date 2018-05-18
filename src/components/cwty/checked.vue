<template>
	<div id="checked">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			托运详情
			<router-link :to="{path: '/cwty/cwty_list/'+'tab-container4'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header>
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<div id="overflow">
		  		<div class="ele2">
		  			<div class="ele2-1">
		  				<img class="pet-img" src="../../../static/img/gou.png"/>
		  			</div>
		  			<div class="ele2-1 ele2-2">
			  			<p class="pet-name">豆豆(法国斗牛犬)</p>
			  			<p class="pet-where">南京->北京</p>
			  			<p class="pet-time">2小时前</p>
		  			</div>
		  		</div>
	  			<div class="ele3">
	  				<table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
	  					<tr>
	  						<td class="ele3-1" style="width: 22%;"><div class="order_time">04-25<br />11:04</div><img class="yuan" src="../../../static/img/yuan.png"/></td>
	  						<td style="width: 75%;"><div class="state">已托运</div><div class="stateCon">宠物已托运，运单号463746383</div></td>
	  					</tr>
	  					<tr>
	  						<td class="ele3-1" style="width: 22%;"><div class="order_time order_time1">04-25<br />11:04</div><img class="yuan" src="../../../static/img/yuan1.png"/></td>
	  						<td style="width: 75%;"><div class="state order_time1-1">已托运</div><div class="stateCon order_time1-1">宠物已托运，运单号463746383</div></td>
	  					</tr>
	  					<tr>
	  						<td class="ele3-1" style="width: 22%;"><div class="order_time order_time1">04-25<br />11:04</div><img class="yuan" src="../../../static/img/yuan1.png"/></td>
	  						<td style="width: 75%;"><div class="state order_time1-1">已托运</div><div class="stateCon order_time1-1">宠物已托运，运单号463746383</div></td>
	  					</tr>
	  					<tr>
	  						<td class="ele3-1" style="width: 22%;"><div class="order_time order_time1 order_time2">04-25<br />11:04</div><img class="yuan" src="../../../static/img/yuan1.png"/></td>
	  						<td style="width: 75%;"><div class="state order_time1-1">已托运</div><div class="stateCon order_time1-1">宠物已托运，运单号463746383</div></td>
	  					</tr>
	  				</table>
	  			</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: "checked",
    data(){
	    return{
	        varietys:"1",
	    }
    },
	methods:{
		
	}
}
</script>
<style scoped>
	*{
		font-family: PingFangSC;
	}
	#checked{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	#soll{
		padding: 0;
		width: 100%;
		height: 100%;
	}
	#overflow{
		width: 100%;
	    height: 100%;
	    overflow-y: auto;
	    overflow-x: hidden;
	    padding-bottom: 15px;
	}
	.ele2{
		height: 80pt;
        padding: 12px 12px 7px 12px;
	    background-color: #fff;
	}
	.pet-img{
	    width: 67pt;
    	height: 64pt;
	}
	.ele2-1{
		float: left;
	}
	.ele2-3{
	    width: 100%;
	    height: 60px;
	    border-bottom: 1px solid #efefef;
	    margin-bottom: 12px;
	}
	.ele2-4{
        width: 100%;
	    height: 24px;
	    line-height: 25px;
	    font-size: 16px;
	    color: #333;
	}
	.ele2-2{
		padding: 7px;
	}
	.pet-name{
		font-size: 14pt;
    	color: #333;
	}
	.pet-where{
	    margin-top: 23px;
	    font-size: 14px;
	    color: #999;
	}
	.pet-time{
		position: relative;
	    top: -65px;
	    left: 200px;
	    color: #999;
	}
	.ele3{
		width: 100%;
	    padding: 20px 7px 7px 7px;
	    border-top: 11px solid #f5f5f5;
	}
	.ele3-1{
		position: relative;
	}
	.order_time{
	    height: 100px;
	    border-right: 2px dotted #777;
	    text-align: center;
	    color: #285FB1;
	    font-size: 14px;
	}
	.order_time1{
	    border-right: 1px solid #ccc;
	    color: #999 !important;
	}
	.order_time1-1{
	    color: #999 !important;
	}
	.order_time2{
		border-right: 0px dotted #777 !important;
	}
	.state{
		padding-left: 20px;
	    height: 20px;
	    text-align: left;
	    color: #285FB1;
	    font-size: 14px;
	    line-height: 0px;
	    font-weight: 600;
	}
	.stateCon{
		padding-left: 20px;
	    height:80px;
	    text-align: left;
	    color: #285FB1;
	    font-size: 14px;
	}
	.yuan{
		position: absolute;
	    top: -9px;
	    left: 72px;
	}
</style>