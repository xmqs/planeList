<template>
	<div id="chiose_rad">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			宠物照片
			<img @click="bus(imageUrl1)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header>
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<p class="tit">宠物照片</p>
			<el-upload
			  class="avatar-uploader"
			  action="/web-editor-web/public/upload/upload.do"
			  :show-file-list="false"
			  :before-upload="handbefore"
			  :on-success="handleAvatarSuccess">
			  <img class="item el-icon-plus" src="../../../static/img/Group 3.png"/>
			  <div v-for="(ele,index) in imageUrl1" v-if="imageUrl1" class="item">
				  <img :src="ele" class="avatar">
				  <img @click.stop="deleteImg(index)" :id="index" src="../../../static/img/shanchu.png" class="delect-i">
			  </div>
			</el-upload>
		</div>
		<div v-if="lod" class="dio">
			<img class="downwarp downwarp-progress-s" src="../../../static/img/Oval6.png"/>
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
	        imageUrl1:[],
	        imageUrl:'',
	    }
   },
	methods:{
		deleteImg(res){
			this.imageUrl1.splice(res,1)
		},
		bus (imageUrl1) {
		    setTimeout(() => {
		        Bus.$emit('cwzp',imageUrl1)
		    }, 30)
	        this.$router.back(-1)
	    },
		//图片上传
		handleAvatarSuccess(res, file) {
	   		this.lod = false;
	        this.imageUrl = res.data;
	        this.imageUrl1.push(res.data);
	   },
	   handbefore(){
	   		this.lod = true;
	    	this.lod1 = false;
	   },
	   
		
	},
	created: function() {
	    Bus.$on('oldCwzp', (e) => {
	    	this.imageUrl1 = e;
	    })
	}
}
</script>
<style scoped>
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
	    padding: 24px !important;
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
	    width: 80px;
	    height: 80px;
	    line-height: 64pt;
	    text-align: center;
	    border: 1px solid #ccc;
	}
	.avatar{
	    margin: 0 14px 14px 14px;
    	border: 1px solid #f8f8f8;
	    width: 160px;
	    height: 160px;
	}
	.el-icon-plus{
	    position: relative;
	    top: 0px;
	    left: 14px;
	    margin-right: 25px;
	}
	.downwarp{
		margin-top: 45%;
	}
	.delect-i{
		position: absolute;
	    top: -12px;
	    right: -2px;
	    width: 50px;
	}
	.item{
		position: relative;
		float: left;
		padding: 7px;
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
    .dio{
    	position: fixed;
    	top:0;
    	left: 0;
    	background: #333;
    	opacity: 0.3;
    	width: 100%;
    	height: 100%;
	    text-align: center;
    	z-index: 9999999;
    }
</style>