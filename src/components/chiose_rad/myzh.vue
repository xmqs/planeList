<template>
	<div id="chiose_rad">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			免疫证号
			<img @click="bus(varietys)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header>
		<div style="padding-top: 45px;" id="soll" class="page-tab-container">
			<p class="tit">上传免疫证</p>
			<div style="width: 100px;height: 100px;" class="">
				<el-upload
				  class="avatar-uploader"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>
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
import Bus from '../cwty/bus.js'
export default {
    name: "chiose_rad",
    data(){
	    return{
	        varietys:"",
	        gou1:true,
	        gou2:false,
	        value1:"",
	        startDate: new Date(),
	        mydate:"日期选择",
	        imageUrl: ''
	    }
   },
	methods:{
		bus (res) {
	        Bus.$emit('myz', res)
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
	    handleAvatarSuccess(res, file) {
	        this.imageUrl = URL.createObjectURL(file.raw);
	    },
	    beforeAvatarUpload(file) {
	        /*const isJPG = file.type === 'image/jpeg';
	        const isLt2M = file.size / 1024 / 1024 < 2;
	
	        if (!isJPG) {
	          this.$message.error('上传头像图片只能是 JPG 格式!');
	        }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isJPG && isLt2M;*/
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
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 100px;
	    height: 100px;
	    line-height: 100px;
	    border: 1px dashed #ccc;
	    margin-left: 14px;
	    text-align: center;
	  }
	  .avatar {
	    width: 100px;
	    height: 100px;
	    display: block;
	    border: 1px dashed #ccc;
	    margin-left: 14px;
	  }
</style>