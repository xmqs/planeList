<template>
	<div id="servers">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			选择服务
			<router-link :to="{path: '/cwty/cwty_list/'+'tab-container2'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header>
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<ul>
				<li>
					<div class="tishi">购买笼子及包装</div>
					<div class="yaoqiu">符合民航运输要求的笼子</div>
					<div class="allradio">
						<label><input type="radio" name="price"><i>✓</i>普通￥20</label><br>
        				<label style="position: relative;top: -24px;left: 180px;"><input type="radio" name="price" checked><i>✓</i>加急￥28</label><br>
					</div>
				</li>
				<li>
					<div class="tishi">购买笼子及包装</div>
					<div class="yaoqiu">符合民航运输要求的笼子</div>
					<div class="allradio">
						<label><input type="radio" name="price1"><i>✓</i>普通￥20</label><br>
        				<label style="position: relative;top: -24px;left: 180px;"><input type="radio" name="price1" checked><i>✓</i>加急￥28</label><br>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
    name: "servers",
    data(){
	    return{
	        varietys:"1",
	        value:"1",
	        options : [{  
	            label: '普通￥20',  
	            value: '1'
            },  
            {  
	            label: '加急￥28',  
	            value: '2'  
            }]  
	    }
    },
	methods:{
		check: function(){  
            console.log(this.value)  
        } 
	}
}
</script>
<style scoped>
	*{
		font-family: PingFangSC;
	}
	#servers{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
		padding: 0;
		margin: 0;
	}
	#soll{
		padding: 0;
	}
	li{    
		list-style: none;
	    height: 145px;
	    background: #fff;
	    border-bottom: 11px solid #f5f5f5;
	}
	div{
		padding: 7px;
		font-size: 17px;
		color: #333;
	}
	.yaoqiu{
		color: #999;
    	font-size: 14px;
	}
	.allradio{
		white-space: nowrap;
	    margin: 7px 2px 2px 8px;
	    padding: 14px 0 0 0;
	    border-top: 1px solid #dfdfdf;
	}
    label {
		font-size: 17px;
		color: #333;
    }
    label i {
        font-size: 12px;
        display: inline-block;
        width: 12px;
        height: 12px;
        text-align: center;
        line-height: 12px;
        color: #fff;
        vertical-align: middle;
        margin: -2px 2px 1px 0px;
        border: #285FB1 1px solid;
    }
     
    input[type="radio"] {
        display: none;
    }
     
    input[type="radio"]+ i {
	    width: 16px;
	    height: 16px;
	    border-radius: 50%;
        font-size: 18px;
    }
     
    input[type="radio"]:checked+ i {
        background: #285FB1;
	    width: 16px;
	    height: 16px;
	    border-radius: 50%;
        font-size: 18px;
    }
     
    input[type="radio"]:disabled+ i {
        border-color: #ccc;
    }
     
    input[type="radio"]:checked:disabled+ i {
        background: #ccc;
    }
</style>