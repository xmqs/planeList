<template>
	<!--选择要看的新闻类型-->
	<div id="srwp_input">
		<!--头部临时用-->
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			物品申报
			<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header> -->
		<!--内容-->
		<div id="soll" class="page-tab-container">
			<div class="points1">
				<p class="pcon">本平台只提供申办渠道，由用户与托运公司双向自由交易， 平台不承担任何纠纷和法律责任，最终解释权归南京市电子 口岸公司所有。建议与投诉电话：025-521637463</p>
			</div>
			<div class="points">
				<span class="">物品信息</span>
			</div>
			<div class="ele">
				<label class="tit">物品清单</label>
				<div style="line-height: 23px;white-space: nowrap!important;overflow: hidden!important;text-overflow:ellipsis!important;" @click="wplist(packages)" class="inps">
					<span v-for="(ele,index) in packages"  style="white-space: nowrap!important;overflow: hidden!important;text-overflow:ellipsis!important;">
						<span v-if="index == 0">
							{{ele.name}}
						</span>
						<span v-else  style="white-space: nowrap!important;overflow: hidden!important;text-overflow:ellipsis!important;">
							,{{ele.name}}
						</span>
					</span>
				</div>
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">总重量(千克)</label>
				<input class="inps" type="number" placeholder="请输入物品总重量" v-model="weight" />
			</div>
			<div @click="cage(size)" class="ele">
				<label class="tit">外包装尺寸(米)</label>
				<input class="inps" type="text" placeholder="请输入外包装尺寸" v-model="size" />
			</div>
			<div @click="sheet1(0)" class="ele">
				<label class="tit">发货地</label>
				<input readonly="readonly" class="inps" type="text" v-model="startCity"  unselectable="on" onfocus="this.blur()"/>
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">选择目的城市</label>
			  	<router-link :to="{path:'/srwp/IndexList'}">
					<input readonly="readonly" class="inps" type="text" placeholder="" v-model="endCity" />
					<img class="po_right" src="../../../static/img/Shape.png"/>
				</router-link>
			</div>
			<div class="ele1">
				<span class="tit">大件物品照片上传</span>
				<div>
					<img @click="myimg(1)" class="item el-icon-plus" src="../../../static/img/Group 3.png"/>
					<div v-for="(ele,index) in bigPackageList" v-if="bigPackageList" class="item" :key="index">
						<img :src="ele" class="avatar">
						<img @click.stop="deleteImg(index)" :id="index" src="../../../static/img/shanchu.png" class="delect-i">
					</div>
				</div>
			</div>
			<div class="ele2">
				<span class="tit">电子机票行程单</span>
				<div>
          <div class="img_list">
            <img @click="myimg(2)" v-if="travelList1" :src="travelList1" class="item el-icon-plus">
            <img @click="myimg(2)" v-else class="item el-icon-plus" src="../../../static/img/Group 3.png"/>
            <p>正面</p>
          </div>
          <div class="img_list">
            <img @click="myimg(3)" v-if="travelList2" :src="travelList2" class="item el-icon-plus">
            <img @click="myimg(3)" v-else class="item el-icon-plus" src="../../../static/img/Group 3.png"/>
            <p>反面</p>
          </div>
				</div>
			</div>
			<div class="points">
				<span class="">主人信息</span>
			</div>
			<div class="ele">
				<label class="tit">姓名</label>
				<input class="inps" type="text" placeholder="请输入姓名" v-model="ownerName" />
			</div>
			<div class="ele">
				<label class="tit">身份证号</label>
				<input class="inps" type="text" placeholder="请输入身份证号" v-model="ownerIdNo" />
			</div>
			<div class="ele">
				<label class="tit">联系方式</label>
				<input class="inps" type="number" placeholder="请输入联系方式" v-model="ownerTelNo" />
			</div>
			<div class="ele">
				<label class="tit">护照信息</label>
				<input class="inps" type="text" placeholder="请输入护照信息" v-model="ownerPassport" />
			</div>
			<div class="ele">
				<span class="tit">是否需要上门服务</span>
				<mt-switch @change="serve_switch" class="my-switch" v-model="homeDelivery"></mt-switch>
			</div>
			<div v-show="addr" class="ele">
				<label class="tit">地址</label>
				<input class="inps1" type="text" placeholder="请输入地址" v-model="homeAddress" />
			</div>
			<div class="ele-s">
				<button @click="unbind && shenbao()" class="shenbao">申报</button>
			</div>
		</div>
		<mt-actionsheet :actions="actions" closeOnClickModal="sheetVisible1" v-model="sheetVisible2" cancel-text="取消"></mt-actionsheet>
	</div>
</template>
<script>
	import axios from "axios";
	import { Toast } from 'mint-ui';
	import { formatDate } from '../../assets/js/date.js';
	import Bus from './bus.js'
	export default {
		name: "srwp_input",
		data() {
			return {
				/*属性*/
				packages:[],
				weight:'',
				size:'',
				startCity:'',
				endCity:'',
				ownerName:'',
				ownerIdNo:'',
				ownerPassport:'',
				homeAddress:'',
				ownerTelNo:'',
        bigPackageList:[],
        travelList1:'',
        travelList2:'',
				homeDelivery:false,
				addr:false,
        travelList:[],
        packagesName:'',
				/*属性结束*/
				value:"",
				unbind:true,
				switch1:false,
				actions:[],
				actions0:[{
			        name: '北京',
			        method: this.fhd1
			      }, {
			        name: '上海',
			        method: this.fhd2
			      }, {
			        name: '南京',
			        method: this.fhd3
			      }],
		        sheetVisible2: false,
		        sheetVisible1:false
			}
		},
	    beforeRouteLeave(to, from, next) {
	        // 设置下一个路由的 meta
	        if(to.name == 'srwp_list'){
        		to.meta.keepAlive = false;
        		from.meta.keepAlive = false;
	        }else{
        		from.meta.keepAlive = true;
	        }
	        next();
	    },
	    activated() {

		},
		methods: {
			// goback(){
			// 	this.$router.push({name: 'srwp_list',
			// 		params:{
			// 			res:'tab-container1'
			// 		}
			// 	})
			// 	location.reload();
			// },
			//图片上传
			myimg(res){
				var oldUrl = window.location.href;

        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端


        if (isAndroid) {
          window.location.href += '#uploadImgByClient?imgNum=0&serverurl=http://222.190.243.8:8080/web-editor-web/public/delivery/uploadByBase64.do&selectPhotoType=photoAll';
        }

        if (isiOS) {
          window.location.href = '#uploadImgByClient?imgNum=0&serverurl=http://222.190.243.8:8080/web-editor-web/public/delivery/uploadByBase64.do&selectPhotoType=photoAll';
        }

				//e.preventdefault();
				//this.$router.push({oldUrl})
				var that = this;
				window.uploadImgOver = function(str) {
					//that.imageUrl = JSON.parse(str).data;
					if(res == 1){
						that.bigPackageList.push(JSON.parse(str).data);
					}else if(res == 2){
		        		that.travelList1 = JSON.parse(str).data;
					}else if(res == 3){
		        		that.travelList2 = JSON.parse(str).data;
					}
				}
				window.location.href = oldUrl;
			},
			cage(res){
				this.$router.push({name: 'boxsize',
					params:{
						sizes:res
					}
				})
			},
			deleteImg(res){
				this.bigPackageList.splice(res,1)
			},
			handleAvatarSuccess(res, file) {
		        this.bigPackageList.push(res.data);
		    },
		    handbefore(){

		    },
			handleAvatarSuccess1(res, file) {
		        this.travelList1 = res.data;
		    },
			handleAvatarError(err, file, fileList){
				Toast("上传失败");
			},
		    handbefore1(){

		    },
			handleAvatarSuccess2(res, file) {
		        this.travelList2 = res.data;
		    },
		    handbefore2(){

		    },
			fhd1(){
				this.startCity = '北京'
			},
			fhd2(){
				this.startCity = '上海'
			},
			fhd3(){
				this.startCity = '南京'
			},
			sheet1(n){
				if (n == 0) {
					this.actions = this.actions0;
				}
				this.sheetVisible2 = !this.sheetVisible2;
			},
			wplist(res){
				this.$router.push({name: 'wplist',params:res});
			},
			serve_switch(){
				this.switch1 = !this.switch1;
				if (this.switch1 == true) {
					this.addr = true;
				}else{
					this.addr = false;
				}
			},
			shenbao(){
				this.unbind = false;
				setTimeout(()=>{
					this.unbind = true;
				},3000);
				var check = true;
				if(this.packages.length == 0){
					Toast('请填写物品清单')
					check = false;
					return;
				}
				var input = document.querySelectorAll('.inps');
				var label = document.getElementsByTagName('label');
				this.travelList = [];
				this.travelList.push(this.travelList1);
				this.travelList.push(this.travelList2);
				for(var i =0;i < input.length;i++){
				    if (input[i].value == "") {
				    	Toast('请填写'+label[i].innerHTML)
				    	check = false;
				    	return;
				    }
				}
				if(this.bigPackageList.length == 0){
					Toast('请上传大件物品照片')
					check = false;
					return;
				}
				if(this.travelList2 == "" || this.travelList1 == ""){
					Toast('请上传电子机票行程单')
					check = false;
					return;
				}
				var regName =/^[\u4e00-\u9fa5]{2,4}$/;
				if(!this.ownerName.match(cardIdReg)){
					Toast('姓名填写有误')
					return;
				}
            	// var telReg = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
            	// if(!this.ownerTelNo.match(telReg)){
            	// 	Toast('请输入正确的电话号码')
				// 	return;
            	// }
            	var cardIdReg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
           	 	if(!this.ownerIdNo.match(cardIdReg)){
            		Toast('请输入正确的身份证号码')
					return;
            	}
           	 	// var ownerPassport = /^[a-zA-Z0-9]{5,17}$/;
           	 	// if(!this.ownerPassport.match(ownerPassport)){
			    //     Toast('护照号码填写有误')
				// 	return;
			    // }
           	 	var homeDelivery;
				if(this.homeDelivery == false){
					homeDelivery = 0;
				}else{
					homeDelivery = 1;
				}
				if (check) {
					axios.post("/eport-server/delivery/luggage/saveOrder.do", {
						packages:this.packages,
						weight:this.weight,
						size:this.size,
						startCity:this.startCity,
						endCity:this.endCity,
						ownerName:this.ownerName,
						ownerIdNo:this.ownerIdNo,
						ownerPassport:this.ownerPassport,
						homeAddress:this.homeAddress,
						homeDelivery:homeDelivery,
						ownerTelNo:this.ownerTelNo,
						bigPackageList:this.bigPackageList,
						travelList:this.travelList,
					}).then((res) => {
						console.log(res)
						if(res.status == 200) {
							Toast("申报成功");
							setTimeout(()=>{

                this.$router.replace({path: '/srwp/srwp_list'})

                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if (isAndroid) {
                  window.close();
                } else {
                  this.$router.back(-1);
                }
							},1000);
						}else{
							Toast("申报失败");
						}
					}, (res) => {
					});
				}
			}
		},
    beforeRouteLeave(to,from,next){
			if (to.name == "srwp_list"){
				this.packages = [];
				this.weight = "";
				this.size = '';
				this.startCity = "";
				this.endCity = '';
				this.ownerName = "";
				this.ownerIdNo = '';
				this.ownerPassport = "";
				this.homeAddress = '';
				this.homeDelivery = "";
				this.ownerTelNo = '';
				this.bigPackageList = [];
				this.travelList = [];
				this.travelList1 = '';
				this.travelList2 = '';
				this.homeDelivery = false;
				this.switch1 = false;
				this.addr = false;
			}else{
				from.meta.keepAlive = true;
			}
			next();
        },
	    activated() {
		    Bus.$on('area', (e) => {
		    	this.endCity = e;
			  })

		    Bus.$on('boxsizes', (e) => {
		　　　　this.size = e;
		    })
    },
		mounted() {

      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

      if (isAndroid) {
        this.ownerName = this.$route.query.username;
        this.ownerIdNo = this.$route.query.id;
        this.ownerTelNo = this.$route.query.phone;
      }else{

        var userinfo = sessionStorage.getItem('userifo');
        if(userinfo != null){
          userinfo = JSON.parse(userinfo);
          this.ownerIdNo = userinfo.idNumber;
          this.ownerTelNo = userinfo.phone;
          this.ownerName = userinfo.userName;
        }
      }
		},
		created: function() {
		},
		filters: {

		}
	}
</script>

<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	*{
		font-family: PingFangSC;
	}
	input, textarea {
		-khtml-user-select: auto!important;
		-moz-user-select: auto!important;
		-ms-user-select: auto!important;
		-o-user-select: auto!important;
		user-select: auto!important;
		-webkit-appearance: none;
	}
	 @component-namespace page {
    @component actionsheet {
      @descendent wrapper {
        padding: 0 20px;
        position: absolute 50% * * *;
        width: 100%;
        transform: translateY(-50%);
        button:first-child {
          margin-bottom: 20px;
        }
      }
    }
  }
	.pcon{
	    background: #fff5e5;
	    line-height: 40px;
	    padding: 15px 12px !important;
	    height: 150px;
	    font-size:26px;
		font-family:PingFangSC-Regular;
		color:rgba(255,181,64,1);
	}
	#soll{
	    position: fixed;
	    width: 100%;
	    overflow: auto;
	    height: 100%;
	}
	.points{
	    padding: 20px;
	    height: 80px;
	    line-height: 45px;
	    background-color: #eee;
	    font-size:28px;
		font-family:PingFangSC-Regular;
		color:rgba(170,170,170,1);
	}
	.ele1{
	    margin: 0 20px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    min-height: 282px;
	    line-height: 85px;
		font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
	}
	.ele2{
	    margin: 0 20px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    min-height: 326px;
	    line-height: 85px;
		font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
	}
	.ele{
	    margin: 0px 20px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    height: 90px;
	    line-height: 90px;
		font-size:32px;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
	}
	.tit{
		color: #333;
	}
	.inps{
	    width: 55%;
	    position: absolute;
	    right: 7px;
	    top: 3vw;
	    height: 45px;
	    border: 0;
	    outline: none;
	    font-size:32px;
		font-family:PingFangSC-Regular;
		color:#939393;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.inps1{
	    width: 60%;
	    position: absolute;
	    right: 7px;
	    top: 3vw;
	    height: 45px;
	    border: 0;
	    outline: none;
	    font-size:32px;
		font-family:PingFangSC-Regular;
		color:#939393;
	}
	.pet-img{
	    position: absolute;
	    top: 7px;
	    right: 40px;
	    width: 64pt;
	    height: 60pt;
	}
	.po_right{
		position: absolute;
	    top: 7px;
	    z-index: 999;
	    right: -6px;
	    padding: 20px 8px 19px 34px;
	}
	.my-switch{
	    position: absolute;
	    top: 23px;
	    right: 12px;
	}
	.ele-s{
	    padding: 25px 19px;
    	background: #f0f0f0;
	}
	.shenbao{
	    border: 0;
	    background: #285fb1;
	    width: 100%;
	    height: 92px;
	    font-size:34px;
		font-family:PingFangSC-Regular;
		color:rgba(255,255,255,1);
	}

	.avatar-uploader{
        display: inline;
	}
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
    width: 64pt;
    height: 64pt;
    line-height: 64pt;
    margin-top: 3px;
    text-align: center;
    float: right;
    opacity: 0;
  }
 .avatar{
    width: 64pt;
    height: 64pt;
    display: block;
    margin-top: 5px;
    float: right;
    margin-right: 18px;
}
.downwarp{
	    position: absolute;
    right: 45px;
    top: 30px;
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
      margin: 0 10px 7px 13px;
    	border: 1px solid #f8f8f8;
	    width: 160px !important;
	    height: 160px !important;
	}
	.el-icon-plus{
	    position: relative;
	    top: 0px;
	    left: 14px;
	    margin-right: 15px;
	}
	.downwarp{
		margin-top: 45%;
	}
	.delect-i{
		position: absolute;
    top: -7px;
    right: -3px;
    width: 50px;
	}
	.item{
		position: relative;
		float: left;
		padding: 7px;
		width: 172px;
		height: 172px;
	}

  .img_list{
    display: inline-block;
  }
  .img_list p{
    text-align: center;
  }
</style>
<style type="text/css">
	.mint-actionsheet-button, .mint-actionsheet-listitem {
	    height: 80px !important;
	    line-height: 80px !important;
	    font-size: 30px !important;
	}
	.mint-toast-text {
		font-size: 3.8vw !important;
	}
	.mint-switch-core:before {
		width: 6.667vw;
		height: 6vw;
		background-color: #fdfdfd;
	}
	.mint-switch-core:after, .mint-switch-core:before {
		content: " ";
		top: -1px;
		left: 0px;
		position: absolute;
		transition: transform .3s;
		border-radius: 3vw;
	}
	.mint-switch-core:after {
		width: 7vw;
		height: 6.2vw;
		background-color: #fff;
		box-shadow: 0 1px 0.4vw rgba(0,0,0,.4);
	}
	.mint-switch-core {
		display: inline-block;
		position: relative;
		top: -6px;
		width: 9.933vw;
		height: 6.4vw;
		border: 1px solid #d9d9d9;
		border-radius: 3.133vw;
		box-sizing: border-box;
		background: #d9d9d9;
	}
</style>
