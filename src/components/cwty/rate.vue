<template>
  <div id="rate">
    <div id="ele">
    	<div class="ele ele_1">
    		<div class="ele1">
    			<img style="width: 35px;height: 33px;margin: 12px 8px 4px 6px;" :src='cwzp'/>
    		</div>
    		<div style="margin-left:-7px;" class="ele1 ele1_1">
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
    	<textarea name="" v-model="texts" placeholder="亲！评价一下吧… Evaluate it..."></textarea>
    </div>
    <div class="ele">
    	<button @click="fabu" class="shenbao">
        <p>发布评价</p>
        <p>Post evaluation</p>
      </button>
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
      	arr:['非常差 Very poor', '差 Poor', '一般 General', '好 Good', '非常好 Very good'],
      	texts:"",
				ids:"",
				cwzp:''
      }
    },
    methods: {
      fabu(){
      	var that = this;
				axios.post("/eport-server/delivery/order/evaluate.do", {
						detail:that.texts,
						orderno:that.ids,
						score:that.value3
				}).then((res) => {
					if(res.status == 200) {
            Toast("评价成功 Evaluation of success");
            setTimeout(() => {
              that.$router.back(-1)
            },2000)
					}else{
						Toast("评价失败 Evaluation of failure");
				    return;
					}
				}, (res) => {
				});
			},
			getpetdetails(){
				var that = this;
				axios.get('/eport-server/delivery/pet/queryOrderById.do', {
					params: {
						orderNo :this.ids
					}
				}).then(function(data) {
					that.cwzp = data.data.data.petPicture;
				})
			}
    },
		created: function() {
        this.ids = this.$route.params.id;
        this.getpetdetails();
		}
  }
</script>
<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	input, textarea {
		-khtml-user-select: auto!important;
		-moz-user-select: auto!important;
		-ms-user-select: auto!important;
		-o-user-select: auto!important;
		user-select: auto!important;
		-webkit-appearance: none;
	}
	#rate{

	}
	#ele{
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
		height: 15.8vw;
    padding: 7px;
    background: #fff;
		padding-left: 3vw;
  }
  .ele1_1{
  		font-size: 4.2vw;
  	    padding: 9px;
    margin-top: 3vw;
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
	.mint-toast-text {
		font-size: 3.8vw !important;
	}
</style>

