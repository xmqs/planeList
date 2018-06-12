<template>
	<div id="chiose_rad">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
            	免疫证号
            <img @click="bus(value1,imageUrl)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
        </header>
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<p class="tit">上传免疫证</p>
			<el-upload
			  class="avatar-uploader"
			  action="/web-editor-web/public/upload/upload.do"
			  :show-file-list="false"
			  :before-upload="handbefore"
			  :on-success="handleAvatarSuccess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i class="el-icon-plus avatar-uploader-icon"></i>
			  <i v-if="lod2" style="opacity: 0;" v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<img v-if="lod" class="downwarp downwarp-progress-s" src="../../../static/img/Oval6.png"/>
			<div @click="gettime" class="block">
			    <el-date-picker
			      v-model="value1"
			      type="date"
			      placeholder="选择最后一次注册时间">
			    </el-date-picker>
			</div>
		</div>
	</div>
</template>
<script>
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import Bus from '../cwty/bus.js'
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
	    	
	    },
		//图片上传
		handleAvatarSuccess(res, file) {
	   		this.lod = false;
	   		this.lod2 = false;
	   		this.imageUrl = '';
	        this.imageUrl = res.data;
	   },
	   handbefore(){
	   		this.lod = true;
	    	this.lod1 = false;
	   		this.lod2 = true;
	   },
	   
		
	},
	created: function() {
	  this.imageUrl = this.$route.params.con;
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
	    padding: 15px 18px;
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