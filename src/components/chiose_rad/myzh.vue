<template>
	<div id="chiose_rad">
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
            	免疫证号
            <img @click="bus(value1,imageUrl)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
        </header> -->
		<div id="soll" class="page-tab-container">
			<p class="tit">上传免疫证</p>
			<!--
			<a href='#uploadImgByClient?imgNum=2&serverurl=http://222.190.243.8:8080/web-editor-web/public/delivery/uploadByBase64.do'>
			</a> -->
			<img  :src="imageUrl" v-on:click="myimg" class="avatar"><!--  -->
			<div style="position: relative;width:100%;border-top: 1px solid #f5f5f5;">
				<input @change="gettime" id="time" class="chiotiem1" type="date" :max="nowdate">
				<div class="chiotiem">{{time}}
					<span style="margin: 1vw 5vw 0px 0px;float: left;">
						<img class="po_right" src="../../../static/img/Shape.png"/>
					</span>
				</div>
			</div>
			<!-- <div @click="gettime" class="block">
			    <el-date-picker
			      v-model="value1"
			      type="date"
			      placeholder="选择最后一次注册时间">
			    </el-date-picker>
			</div> -->
		</div>
	</div>
</template>
<script>
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import Bus from '../cwty/bus.js'
import { Toast } from 'mint-ui';
export default {
    name: "chiose_rad",
    data(){
	    return{
	    	lod:false,
	    	lod1:true,
	    	lod2:false,
        value1:"",
        mydate:"日期选择",
        imageUrl:'../../../static/img/Group 3.png',
        dialogVisible: false,
        time:'选择最后一次注册时间',
        nowdate:''
	    }
   },
	methods:{
		myimg(){
			window.location.href='https://m.mynj.cn:11162/H5/StopDetail.html/H5/test.html';
		},
	    gettime(){
			var times = document.getElementById("time").value;
			var reg =/(\d{4})\-(\d{2})\-(\d{2})/;
			times = times.replace(reg,"$1年$2月$3日");
			this.time = times;
            setTimeout(() => {
                Bus.$emit('myz',times,this.imageUrl)
            }, 30)
	    },


	},
	created: function() {

		var that = this;
		window.uploadImgOver = function(str) {
			that.imageUrl = JSON.parse(str).data;
			setTimeout(() => {
				var times;
				if (that.time == '选择最后一次注册时间') {
					times = '已上传'
				}else{
					times = that.time
				}
				Bus.$emit('myz',times,that.imageUrl)
			}, 30)
		}
		var date_now = new Date();
		var year = date_now.getFullYear();
		var month = date_now.getMonth()+1 < 10 ? "0"+(date_now.getMonth()+1) : (date_now.getMonth()+1);
		var date = date_now.getDate() < 10 ? "0"+date_now.getDate() : date_now.getDate();
		this.nowdate = year+'-'+month+'-'+date;//获取当前年月日 不足10 补0

		if(this.$route.params.time != "已上传" && this.$route.params.time != null && this.$route.params.time != '' && this.$route.params.time != undefined){
			this.time = this.$route.params.time;
		}
		if(this.$route.params.res != null && this.$route.params.res != ''){
			this.imageUrl = this.$route.params.res;
		}
		//this.imageUrl = this.$route.params.con;


		  var that = this;
			var oldUrl = window.location.href;
			window.uploadImgOver = function(str) {
				that.imageUrl = JSON.parse(str).data;
				setTimeout(() => {
					var times;
					if (that.time == '选择最后一次注册时间') {
						times = '已上传'
					}else{
						times = that.time
					}
					Bus.$emit('myz',times,that.imageUrl)
				}, 30)
			}
	}
}
</script>
<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	#chiose_rad{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
	}
	#soll{
	    background: #fff;
	}
	.tit{
	    font-size: 32px;
	    color: #333;
		width: 100%;
		padding: 2vw 4.933vw!important;
	}
	.time_select{
	    margin: 14px;
	    font-size: 16px;
	    color: #333;
	    border-top: 1px solid #e8e8e8;
	    padding: 14px 0;
	}
	.el-input__inner {
    	border: none !important;
    }
    .el-input {
	    width: 100% !important;
	}
	.chiotiem{
	width: 100%;
    background: #fff;
    border: 0px solid #f5f5f5;
    height: 9.467vw;
    font-size: 4vw;
	line-height:  8.5vw;
	margin-top: 0.5vw;
	}
	.chiotiem1{
	width: 100%;
    background: #fff;
    border: 1px solid #f5f5f5;
    height: 10.467vw;
    font-size: 4vw;
    padding-left: .233vw;
	float: right;
	opacity: 0;
	    position: absolute;
	    z-index: 1;
		right: 0;
	}
	/*图片上传*/
	.avatar-uploader-icon{
	    font-size: 28px;
	    color: #8c939d;
	    width: 64pt;
	    height: 64pt;
	    line-height: 64pt;
	    margin-top: 3px;
	    text-align: center;
	    float: right;
	    margin-left: 14px;
	    border: 1px solid #ccc;
	    margin-bottom: 14px;
	}
	.avatar{
	    margin: 0 14px 14px 40px;
    	border: 1px solid #f8f8f8;
    	width: 93px;
    	height: 89px;
	}
	.downwarp{
		position: absolute;
	    top: 125px;
	    left: 39px;
	}
	.downwarp-progress-s{
	    display: inline-block;
		-webkit-transition-property: -webkit-transform;
	    -webkit-transition-duration: 1s;
	    -moz-transition-property: -moz-transform;
	    -moz-transition-duration: 1s;
	    -webkit-animation: rotate 3s linear infinite;
	    -moz-animation: rotate 3s linear infinite;
	    -o-animation: rotate 3s linear infinite;
	    animation: rotate 3s linear infinite;
    }
	@keyframes rotate{
		from{transform: rotate(-359deg)
		}
	    to{transform: rotate(359deg)
	    }
	}
    .el-input--prefix .el-input__inner {
    padding-left: 4vw;
    height: 40px;
    font-size: 15px;
}
.po_right{
	 width: 20px;
    height: 34px;
	position: absolute;
    top: 25px;
    right: 30px;

}
</style>
