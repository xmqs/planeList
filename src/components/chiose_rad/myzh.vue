<template>
	<div id="chiose_rad">
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
            	免疫证号
            <img @click="bus(value1,imageUrl)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
        </header> -->
		<div id="soll" class="page-tab-container">
			<p class="tit">上传免疫证</p>
			<el-upload
			  class="avatar-uploader"
			  action="/web-editor-web/public/upload/upload.do"
			  :show-file-list="false"
			  :before-upload="handbefore"
			  :on-error="handleAvatarError"
			  :on-success="handleAvatarSuccess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i class="el-icon-plus avatar-uploader-icon"></i>
			  <i v-if="lod2" style="opacity: 0;" v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<img v-if="lod" style="transform: rotate(1069.2deg);" class="rotate downwarp downwarp-progress-s" src="../../../static/img/Oval6.png"/>
			<div style="position: relative;width:100%">
				<input @change="gettime" id="time" class="chiotiem1" type="date">
				<div class="chiotiem">{{time}} <span style="float:right;margin: 1vw 5vw 0 0;">︾</span></div>
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
	        imageUrl:'',
			dialogVisible: false,
			time:''
	    }
   },
	methods:{
		bus (res,imageUrl) {
            if(res != ""){
                res = new Date(res);
                res=res.getFullYear() + '年' + (res.getMonth() + 1) + '月' + res.getDate() + '日'
            }else{
                res = new Date();
                res=res.getFullYear() + '年' + (res.getMonth() + 1) + '月' + res.getDate() + '日'
            }
            setTimeout(() => {
                Bus.$emit('myz', res,imageUrl)
            }, 30)
            this.$router.back(-1)
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
		//图片上传
		handleAvatarSuccess(res, file) {
	   		this.lod = false;
	   		this.lod2 = false;
	   		this.imageUrl = '';
	        this.imageUrl = res.data;
            setTimeout(() => {
                Bus.$emit('myz', this.time,this.imageUrl)
            }, 30)
	   },
	    handleAvatarError(err, file, fileList){
	   		this.lod = false;
	    	this.lod1 = true;
	   		this.lod2 = false;
		   	Toast("上传失败");
	    },
	   handbefore(){
	   		this.lod = true;
	    	this.lod1 = false;
	   		this.lod2 = true;
	   },
	   
		
	},
	created: function() {
		if(this.$route.params.time != "" && this.$route.params.time != undefined){
			this.time = this.$route.params.time;
		}else{
			var res = new Date();
			this.time=res.getFullYear() + '年' + (res.getMonth() + 1) + '月' + res.getDate() + '日'
		}
		if(this.$route.params.res != ""){
			this.imageUrl = this.$route.params.res;
		}
	  	//this.imageUrl = this.$route.params.con;
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
		padding: 2vw 2.933vw!important;
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
	line-height:  9.467vw;
	padding-left: 2vw;
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
	    margin: 0 14px 14px 14px;
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
</style>
<style type="text/css">
	.avatar{
	    width: 180px !important;
	    height: 180px !important;
	}
	.el-date-picker .el-picker-panel__content {
	    width: 520px !important;
	}
	.el-popper{
	    width: 550px !important;
	}
	.el-date-table td {
	    padding: 20px !important;
	}
	.el-date-table td span {
	    font-size: 4.267vw !important;
	    padding: 28px 2px 28px 0px !important;
	    line-height: 2px !important;
	    width: 60px !important;
	    height: 60px !important;
	    /* text-align: center; */
	}
	.el-date-picker__header-label {
	    font-size: 32px;
	    width: 30px;
	    height: 30px;
	}
	.el-input--prefix .el-input__inner {
	    height: 70px;
	    font-size: 30px;
	}
</style>