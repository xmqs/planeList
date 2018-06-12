<template>
  <div id="rate">
  	<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			托运详情
			<router-link :to="{path: '/cwty/cwty_list/'+'tab-container4'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header>
    <div id="ele">
    	<div class="ele ele_1">
    		<div class="ele1">
    			<img style="width: 40px;height: 4	0px;" src="../../../res/img/Rectangle183.png"/>
    		</div>
    		<div style="margin-left: 14px;" class="ele1 ele1_1">
    			综合评价
    		</div>
    		<div class="ele1 ele1_1">
    			<el-rate
    				:texts='arr'
					  v-model="value3"
					  change="score"
					  show-text>
					</el-rate>
    		</div>
    </div>
    <div class="ele">
    	<textarea name="" v-model="texts" placeholder="亲！评价一下吧…"></textarea>
    </div>
    <div class="ele">
    	<button @click="fabu" class="shenbao">发布评价</button>
    </div>
    </div>
  </div>
</template>

<script>
	import 'element-ui/lib/theme-chalk/index.css';
	import axios from "axios";
	import { Toast } from 'mint-ui';
	import Bus from './bus.js'
  export default {
    name: 'rate',
    data() {
      return {
      	value3: null,
      	arr:['差', '比较差', '一般', '比较好', '好'],
      	texts:"",
      	ids:""
      }
    },
    methods: {
    	score(){
    	},
      fabu(){
      	var that = this;
				axios.post("/eport-server/delivery/order/evaluate.do", {
						detail:that.texts,
						orderno:that.ids,
						score:that.value3
				}).then((res) => {		
					if(res.status == 200) {	
				    setTimeout(() => {
							that.$router.push({path: '/cwty/cwty_list/'+'tab-container4'})
				    },2000)
					}else{
						Toast("评价失败");
				    return;
					}
				}, (res) => {							
				});
      }
    },
		created: function() {
		    Bus.$on('ids', (e,img) => {
		    	this.ids = e;
		    })
		}
  }
</script>
<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	#rate{
		
	}
	#ele{
		margin-top: 14vw;
		width: 100%;
    position: fixed;
    height: 100%;
    background: #F5F5F5;
	}
  .ele{
  	
  }
  .ele1{
  	float: left;
  }
  .ele_1{
		height: 17.8vw;
    padding: 7px;
    background: #fff;
		padding-left: 3vw;
  }
  .ele1_1{
  		font-size: 4.2vw;
  	    padding: 9px;
    margin-top: 10px;
  }
  textarea{
    width: 100%;
    height: 48vw;
    resize: none;
    border: 0;
    border-top: 1px solid #ccc;
    padding: 1.933vw;
    font-size: 3.77vw;
  }
	.shenbao{
	    border: 0;
	    background: #285fb1;
	    color: #fff;
	    width: 90%;
			height: 11vw;
   		font-size: 4.133vw;
    	margin-left: 5%;
    	margin-top: 14px;
	}
</style>
<style>
.el-rate__icon {
    font-size: 5.7vw;
    margin-right: .8vw;
    color: #c0c4cc;
    transition: .3s;
}
.el-rate__text {
    font-size: 3.867vw;
    vertical-align: middle;
}
</style>

