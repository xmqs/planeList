<template>
	<div id="chiose_rad">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			免疫证号
			<img @click="bus(varietys)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header>
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<p class="tit">上传免疫证</p>
			<el-upload
			  action="/web-editor-web/public/upload/upload.do"
			  list-type="picture-card"
			  :limit="limits"
			  :on-preview="handlePictureCardPreview"
			  :on-remove="handleRemove">
			  <i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			
			<div @click="openPicker" class="time_select">{{mydate}}</div>
			<template>
			  <mt-datetime-picker
			    ref="picker"
				type="date"
      			v-model="value1"
				year-format="{value} 年"
				month-format="{value} 月"
  				date-format="{value} 日"
  				:startDate="startDate"
  				@confirm="handleConfirm">
			  </mt-datetime-picker>
			</template>
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
	        varietys:"",
	        value1:"",
	        startDate: new Date(),
	        mydate:"日期选择",
	        imgList: [],
	        size: 0,
			limits:1,//图片上传数量
			dialogImageUrl: '',
        	dialogVisible: false
	    }
   },
	methods:{
		bus (res) {
		    setTimeout(() => {
		        Bus.$emit('myz', res)
		    }, 30)
	        this.$router.back(-1)
	   },
        openPicker() {
	        this.$refs.picker.open();
	    },
	    handleConfirm(){
	    	this.mydate = this.value1;
	    	var date = new Date(this.value1);
		    this.mydate=date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate()+'日';
		    this.varietys = this.mydate;
			console.log(this.mydate)
	    } ,
		//图片上传
		 handleRemove(file, fileList) {
	        console.log(file, fileList);
	      },
	      handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	      }
		
	},
	created: function() {
        
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
	    font-size: 16px;
	    color: #333;
	    padding: 14px;
	}
	.time_select{
	    margin: 14px;
	    font-size: 16px;
	    color: #333;
	    border-top: 1px solid #e8e8e8;
	    padding: 14px 0;
	}
	/*图片上传*/

</style>