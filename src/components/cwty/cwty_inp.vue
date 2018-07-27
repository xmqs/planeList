<template>
	<!--选择要看的新闻类型-->
	<div id="cwty_input">
		<div style="position: fixed;top: 80px;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;" v-show="lod">
			正在加载,请稍后...
		</div>
		<!--头部临时用-->
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			宠物申报
			<router-link :to="{path: '/cwty/cwty_list/'+'tab-container1'}">
				<img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			</router-link>
		</header> -->
		<!--内容-->
		<div id="soll" class="page-tab-container">
				<div class="points1">
					<p class="pcon">本平台只提供申办渠道，由用户与托运公司双向自由交易， 平台不承担任何纠纷和法律责任，最终解释权归南京市电子口岸公司所有。建议与投诉电话：025-521637463</p>
				</div>
			<div class="points">
				<span class="">宠物信息</span>
			</div>
			<div class="ele1">
				<span class="tit">宠物照片</span>
				<img @click="myimg(1)" style="position: absolute;top: 4px;right:2px;width: 68px !important;height: 68px !important;" :src="imageUrl" class="avatar">
			</div>
			<div class="ele">
				<label class="tit">宠物种类</label>
			  	<div @click="rou_cwzl(varietys)">
					<input readonly="readonly" class="inps" type="text" placeholder="" v-model="varietys" unselectable="on" onfocus="this.blur()"/>
					<img class="po_right" src="../../../static/img/Shape.png"/>
				</div>
			</div>
			<div class="ele">
				<label class="tit">宠物品种</label>
				<input class="inps" type="text" placeholder="请输入宠物品种" v-model="cwpz" />
			</div>
			<div class="ele">
				<label class="tit">宠物名字</label>
				<input class="inps" type="text" placeholder="请输入宠物名字" v-model="cwmz" />
			</div>
			<div @click="sheet1(3)" class="ele">
				<label class="tit">宠物年龄</label>
				<input readonly="readonly" class="inps" type="text" v-model="cwnl" unselectable="on" onfocus="this.blur()"/>
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">宠物重量(公斤)</label>
				<input class="inps" type="number" placeholder="请输入宠物重量(公斤)" v-model="cwzl" />
			</div>
			<div @click="sheet1(1)" class="ele newsele">
				<label class="tit">体型尺寸</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sizes" unselectable="on" onfocus="this.blur()"/>
				<img style="top: 5.933vw;" class="po_right" src="../../../static/img/Shape.png"/>
				<div class="newsele_1">如需购买笼子，请选择宠物尺寸</div>
			</div>
			<div @click="cage(sizes1)" class="ele newsele">
				<label class="tit">笼子尺寸</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sizes1" unselectable="on" onfocus="this.blur()"/>
				<img style="top: 5.933vw;" class="po_right" src="../../../static/img/Shape.png"/>
				<div class="newsele_1">如已有笼子，请正确填写笼子尺寸</div>
			</div>
			<div @click="sheet1(2)" class="ele">
				<label class="tit">是否已办理卫生证书</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="sfblgz" unselectable="on" onfocus="this.blur()"/>
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div @click="sheet1(0)" class="ele">
				<label class="tit">是否已植入芯片</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="chip" unselectable="on" onfocus="this.blur()"/>
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<!--<div @click="gomyz" class="ele newsele">
				<label class="tit">免疫证</label>
				<input readonly="readonly" class="inps" type="text" placeholder="" v-model="myz" unselectable="on" onfocus="this.blur()"/>
				<img style="top: 5.933vw;" class="po_right" src="../../../static/img/Shape.png"/>
				<div class="newsele_1">如没有免疫证，可不填</div>
			</div>-->
      <div class="ele1">
        <span class="tit">免疫证照片(没有可不填)</span>
        <img @click="myimg(2)" style="position: absolute;top: 4px;right:2px;width: 68px !important;height: 68px !important;" :src="imageUrl2" class="avatar">
      </div>
      <div class="ele">
        <input @change="gettime('myzh')" id="time" class="chiotiem1" type="date" :max="nowdate">
        <div class="chiotiem">{{time}}
        </div>
      </div>
			<div @click="sheet1(4)" class="ele">
				<label class="tit">发货地</label>
				<input readonly="readonly" class="inps" type="text" v-model="fhd" unselectable="on" onfocus="this.blur()"/>
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>
			<div class="ele">
				<label class="tit">选择目的城市</label>
			  	<router-link :to="{name:'IndexList'}">
					<input readonly="readonly" class="inps" type="text" placeholder="" v-model="area" unselectable="on" onfocus="this.blur()"/>
					<img class="po_right" src="../../../static/img/Shape.png"/>
				</router-link>
			</div>
      <div class="ele">
        <input @change="gettime('hangban')" id="time2" class="chiotiem1" type="date" :min="nowdate">
        <div class="chiotiem">{{time2}}
        </div>
      </div>
			<div class="points">
				<span class="">主人信息</span>
			</div>
			<div class="ele">
				<label class="tit">姓名</label>
				<input class="inps" type="text" placeholder="请输入姓名" v-model="zrxm" />
			</div>
			<div class="ele">
				<label class="tit">护照信息</label>
				<input class="inps" type="text" placeholder="请输入护照信息" v-model="hzxx" />
			</div>
			<div class="ele">
				<label class="tit">机票信息</label>
				<input class="inps" type="text" placeholder="请输入航班信息" v-model="jpxx" />
			</div>
			<div class="ele">
				<label class="tit">联系方式</label>
				<input class="inps" type="number" placeholder="请输入联系方式" v-model="lxfs" />
			</div>
			<div class="ele">
				<span class="tit">是否需要上门服务</span>
				<mt-switch @change="serve_switch" class="my-switch hairlines" v-model="smfw"></mt-switch>
			</div>
			<div v-show="addr" class="ele" >
				<label class="tit">地址</label>
				<input class="inps1" type="text" placeholder="请输入地址" v-model="dz" />
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
		name: "cwty_input",
		data() {
			return {
				lods:false,
				lod:false,
				imageUrl:  '../../../static/img/Group 3.png',
				imageUrl2:  '../../../static/img/Group 3.png',
				petdemo:true,
				/*属性*/
				dz:"",
				smfw:false,
				hzxx:"",
        varietys:" ",
				lxfs:"",
				sfzh:"",
				zrxm:"",
        sfblgz:"",
				riqi:"",
				area:"",
				fhd:"",
				myz:"",
				myz1:"",
				chip:"",
				sizes:"",
				sizes1:'',
				cwzl:"",
				cwnl:"",
				jpxx:'',
				cwmz:"",
				cwpz:"",
				/*属性结束*/
				unbind:true,
				value:"",
				switch1:false,
				addr:false,
				name:"",
        time:"选择最后一次注册时间(没有可不填)",
        time2:"预计航班日期",
				actions:[],
        nowdate:'',
				actions0:[{
			        name: '是否植入芯片'
			      },{
			        name: '是',
			        method: this.chip1
			      }, {
			        name: '否',
			        method: this.chip2
			      }],
				actions1:[{
			        name: '体型尺寸'
			      },{
			        name: '大型',
			        method: this.size1
			      }, {
			        name: '中型',
			        method: this.size2
			      }, {
			        name: '小型',
			        method: this.size3
			      }],
				actions2:[{
			        name: '是否已卫生证书'
			      },{
			        name: '是',
			        method: this.sfblgz1
			      }, {
			        name: '否',
			        method: this.sfblgz2
			      }],
				actions3:[{
			        name: '宠物年龄'
			      },{
			        name: '小于1岁',
			        method: this.age1
			      }, {
			        name: '1~5岁',
			        method: this.age2
			      }, {
			        name: '5~10岁',
			        method: this.age3
			      }, {
			        name: '10岁以上',
			        method: this.age4
			      }],
				actions4:[{
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
    activated() {
			if(this.$route.params.selpet != undefined){
				this.varietys = this.$route.params.selpet;
			}
			var userinfo = sessionStorage.getItem('userifo');
			if(userinfo != null){
				userinfo = JSON.parse(userinfo);
				this.sfzh = userinfo.idNumber,
				this.lxfs = userinfo.phone
				this.zrxm = userinfo.userName
			}
		},
		methods: {
      /*修改时间*/
      gettime(mask) {

        if (mask == "myzh") {
          var times = document.getElementById("time").value;
          var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
          times = times.replace(reg, "$1年$2月$3日");

          this.myz = times;
          this.time = "最后一次注册时间：" + times;
        }
        if (mask == "hangban") {
          var times = document.getElementById("time2").value;
          var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
          times = times.replace(reg, "$1年$2月$3日");

          this.riqi = times;
          this.time2 = "预计航班日期：" + times;
        }

      },
      myimg(id) {

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

        //window.location.href += '#uploadImgByClient?imgNum=0&serverurl=http://222.190.243.8:8080/web-editor-web/public/delivery/uploadByBase64.do&selectPhotoType=photoAll';
        //e.preventdefault();
        //this.$router.push({oldUrl})
        var that = this;
        window.uploadImgOver = function (str) {
          if (id == 1) {
            that.imageUrl = JSON.parse(str).data;
          }
          if (id == 2) {
            that.imageUrl2 = JSON.parse(str).data;
            that.myz1 = JSON.parse(str).data;
          }
        }
        window.location.href = oldUrl;
      },
      cage(res) {
        this.$router.push({
          name: 'sizes',
          params: {
            sizes: res
          }
        })
      },
      clickcwzp(res) {
        setTimeout(() => {
          Bus.$emit('oldCwzp', res)
        }, 30)
        this.$router.push({path: '/chiose_rad/cwzp'})
      },
      rou_cwzl(varietys) {
        setTimeout(() => {
          Bus.$emit('varietys', varietys)
        }, 30)
        this.$router.push({path: '/chiose_rad/chiose_rad'})
      },
      chip1() {
        this.chip = '是'
      },
      chip2() {
        this.chip = '否'
      },
      size1() {
        this.sizes = '大型'
      },
      size2() {
        this.sizes = '中型'
      },
      size3() {
        this.sizes = '小型'
      },
      sfblgz1() {
        this.sfblgz = '是'
      },
      sfblgz2() {
        this.sfblgz = '否'
      },
      age1() {
        this.cwnl = '小于1岁'
      },
      age2() {
        this.cwnl = '1~5岁'
      },
      age3() {
        this.cwnl = '5~10岁'
      },
      age4() {
        this.cwnl = '10岁以上'
      },
      fhd1() {
        this.fhd = '北京'
      },
      fhd2() {
        this.fhd = '上海'
      },
      fhd3() {
        this.fhd = '南京'
      },
      serve_switch() {
        this.switch1 = !this.switch1;
        if (this.switch1 == true) {
          this.addr = true;
        } else {
          this.addr = false;
        }
      },
      sheet1(n) {
        if (n == 1) {
          this.actions = this.actions1;
        } else if (n == 2) {
          this.actions = this.actions2;
        } else if (n == 0) {
          this.actions = this.actions0;
        } else if (n == 3) {
          this.actions = this.actions3;
        } else if (n == 4) {
          this.actions = this.actions4;
        }
        this.sheetVisible2 = !this.sheetVisible2;
      },
      gomyz() {
        //window.location.href='http://222.190.243.8:8080/H5/test.html';

        this.$router.push({
          name: 'myzh',
          params: {
            time: this.myz,
            res: this.myz1
          }
        })
      },
      shenbao() {
        this.unbind = false;
        var check = true;
        var input = document.querySelectorAll('.inps');
        var label = document.getElementsByTagName('label');
        if (this.sizes == '' && this.sizes1 == '') {
          check = false;
          this.unbind = true;
          Toast('笼子尺寸与体型尺寸至少选择一种')
          return;
        }
        if (this.imageUrl.indexOf('http') == -1) {
          Toast('请上传宠物照片');
          check = false;
          this.unbind = true;
          return;
        }
        for (var i = 0; i < input.length; i++) {
          if (input[i].value == "") {
            if (label[i].innerHTML != '免疫证' && label[i].innerHTML != '笼子尺寸' && label[i].innerHTML != '体型尺寸') {
              Toast('请填写' + label[i].innerHTML)
              check = false;
              this.unbind = true;
              return;
            }
          }
        }
        if (isNaN(Number(this.cwzl))) {
          Toast('宠物重量填写有误')
          this.unbind = true;
          return;
        }
        var regName = /^[\u4e00-\u9fa5]{2,4}$/;
        if (!this.zrxm.match(regName)) {
          Toast('姓名填写有误')
          check = false;
          this.unbind = true;
          return;
        }
        // var telReg = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
        // if(!this.lxfs.match(telReg)){
        // 	Toast('请输入正确的电话号码')
        // 	check = false;
        // 	this.unbind = true;
        // 	return;
        // }
        // var cardIdReg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        // if(!this.sfzh.match(cardIdReg)){
        // 	Toast('请输入正确的身份证号码')
        // 	check = false;
        // 	return;
        // }
        // var ownerPassport = /^[a-zA-Z0-9]{5,17}$/;
        // if(!this.hzxx.match(ownerPassport)){
        //     Toast('护照号码填写有误')
        // 	check = false;
        // 	this.unbind = true;
        // 	return;
        // }
        if (this.smfw == true) {
          var input = document.querySelectorAll('.inps1');
          if (input[0].value == "") {
            Toast('请填写地址')
            check = false;
            this.unbind = true;
            return;
          }
        }
        if (check) {
          var sfxysmfu;
          var xfzrxp;
          if (this.smfw == false) {
            sfxysmfu = 0;
          } else {
            sfxysmfu = 1;
          }
          if (this.chip == "是") {
            xfzrxp = 1
          } else {
            xfzrxp = 0
          }
          axios.post("/eport-server/delivery/pet/saveOrder.do", {
            endCity: this.area,
            flightDate: this.riqi,
            homeDelivery: sfxysmfu,
            homeAddress: this.dz,
            ownerIdNo: this.sfzh,
            ownerName: this.zrxm,
            ownerPassport: this.hzxx,
            ownerTelNo: this.lxfs,
            petAge: this.cwnl,
            petBreed: this.cwpz,
            petCertificate: this.sfblgz,
            petChip: xfzrxp,
            petName: this.cwmz,
            petPicture: this.imageUrl,
            petSize: this.sizes,
            petType: this.varietys,
            petVaccineLastTime: this.myz,
            petVaccinePics: this.myz1,
            petWeight: this.cwzl,
            startCity: this.fhd,
            boxSize: this.sizes1,
            picketInfo: this.jpxx
          }).then((res) => {
            console.log(res)
            if (res.status == 200) {
              Toast("申报成功");
              setTimeout(() => {
                this.$router.replace({path: '/cwty/cwty_list/' + 'tab-container1'})
                this.unbind = true;

                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if (isAndroid) {
                  window.close();
                } else {
                  this.$router.back(-1);
                }
              }, 1000);
            } else {
              this.unbind = true;
              Toast("申报失败");
            }
          }, (res) => {
          });
          /*axios({
						method: 'POST',
						data:data,
						url: '/eport-server/delivery/pet/saveOrder.do',
						dataType: 'json',
						headers: {
				            'Content-Type': 'application/json;charset=UTF-8'
				        },
						then: function(data1) {
							console.log(data1);
							Toast("申报成功")
						}
					});*/
        }
      },
    },
      mounted() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if (isAndroid) {
          this.zrxm = this.$route.query.username;
          this.lxfs = this.$route.query.phone;
          if(this.$route.query.pet == 1){
            this.varietys = "猫";
          }
          if(this.$route.query.pet == 2){
            this.varietys = "狗";
          }
        }

        var date_now = new Date();
        var year = date_now.getFullYear();
        var month = date_now.getMonth() + 1 < 10 ? "0" + (date_now.getMonth() + 1) : (date_now.getMonth() + 1);
        var date = date_now.getDate() < 10 ? "0" + date_now.getDate() : date_now.getDate();
        this.nowdate = year + '-' + month + '-' + date;//获取当前年月日 不足10 补0

        if (this.$route.params.selpet != undefined) {
          this.varietys = this.$route.params.selpet;
        }
      },
      beforeRouteLeave(to, from, next) {
        if (to.name == "cwty_list") {
          this.area = '';
          this.riqi = "";
          this.sfxysmfu = '';
          this.dz = "";
          this.sfzh = '';
          this.zrxm = "";
          this.hzxx = '';
          this.lxfs = "";
          this.cwnl = '';
          this.cwpz = "";
          this.sfblgz = '';
          this.xfzrxp = "";
          this.cwmz = '';
          this.imageUrl = "../../../static/img/Group 3.png";
          this.imageUrl2 = "../../../static/img/Group 3.png";
          this.sizes = '';
          this.varietys = "";
          this.myz = '';
          this.myz1 = "";
          this.cwzl = '';
          this.fhd = "";
          this.sizes1 = "";
          this.jpxx = "";
          this.chip = "";
          this.switch1 = false;
          this.smfw = false;
          this.addr = false;
          this.time = "选择最后一次注册时间(没有可不填)";
          this.time2 = "预计航班日期";
        } else {
          from.meta.keepAlive = true;
        }
        next();
      },
      created: function () {
        var that = this;
        var userinfo = sessionStorage.getItem('userifo');
        if (userinfo != null) {
          userinfo = JSON.parse(userinfo);
          that.sfzh = userinfo.idNumber,
            that.lxfs = userinfo.phone;
          that.zrxm = userinfo.userName;
        }
        Bus.$on('area', (e) => {
          that.area = e;
          document.getElementById("soll").scrollTop = 350;
        })
        Bus.$on('myz', (e, el) => {
          that.myz = e;
          that.myz1 = el;
          document.getElementById("soll").scrollTop = 300;
        })
        Bus.$on('riqi', (e) => {
          that.riqi = e;
          document.getElementById("soll").scrollTop = 350;
        })
        Bus.$on('varietys', (e) => {
          that.varietys = e;
        })
        Bus.$on('sizes1', (e) => {
          that.sizes1 = e;
        })
        //     Bus.$on('cwzp', (e) => {
        // 　　　　 this.imageUrl1 = e;
        // 		if (e[0] != undefined) {
        // 			this.imageUrl = e[0];
        // 		}else{
        // 			this.imageUrl = '../../../static/img/Group 3.png';
        // 		}
        //     })
      },
      filters: {}
    }
</script>

<style scoped>
	*{
		font-family: PingFangSC;
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
	.pcon{
    background: #fff5e5;
    line-height: 5.333vw;
    padding: 2vw 1.6vw;
    height: 20vw;
    font-size: 3.467vw;
    font-family: PingFangSC-Regular;
    color: #ffb540;
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
	    height: 160px;
	    line-height: 160px;
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
		text-align: right;
		padding-right: 3.5vw;
	}
	.inps1{
	    width: 60%;
	    position: absolute;
	    right: 7px;
	    top: 3vw;
	    height: 45px;
	    border: 0;
		text-align: right;
		padding-right: 3vw;
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
	    top: 1.5vw;
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
    width: 90px;
    position: absolute;
    top: 0;
    right: 15px;
    height: 94px;
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

    .mint-switch-core:before {
    width: 6.667vw;
    height: 4vw;
    background-color: #fdfdfd;
    content: "";
}
    .mint-switch-input:checked+.mint-switch-core:after {
    -webkit-transform: translateX(2.667vw);
    transform: translateX(2.667vw);
    content: ""!important;
}
	.mint-switch-core:after {
	    width: 4vw;
	    height: 4vw;
	    background-color: #fff;
	    -webkit-box-shadow: 0 1px 0.4vw rgba(0,0,0,.4);
	    box-shadow: 0 1px 0.4vw rgba(0,0,0,.4);
	    content: ""!important;
	}
	.mint-actionsheet-button, .mint-actionsheet-listitem {
	    display: block;
	    width: 100%;
	    height: 90px;
	    line-height: 70px;
	    font-size:28px;
	    color: #333;
	    background-color: #fff;
	}
	.newsele{
		height: 160px;
	}
	.newsele_1{
    font-size: 3.733vw;
    font-family: PingFangSC-Regular;
    color: #999;
    margin-top: 0.133vw;
    width: 97%;
    line-height: 32px;
	}
	.item{
		width: 68px;
    height: 68px;
    margin: 5px 0px 0 -38px;
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

  .avatar{
    margin: 0 14px 14px 40px;
    border: 1px solid #f8f8f8;
    width: 93px;
    height: 89px;
  }

  .chiotiem1{
    width: 100%;
    background: #fff;
    border: 1px solid #f5f5f5;
    height: 10.467vw;
    font-size: 4vw;
    padding-left: 0;
    float: right;
    opacity: 0;
    position: absolute;
    z-index: 1;
    right: 0;
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
		width: 6.667vw !important;
		height: 6vw !important;
		background-color: #fdfdfd;
	}
	.mint-switch-core:after, .mint-switch-core:before {
		content: " ";
		top: -1px;
		left: 0px;
		position: absolute;
		transition: transform .3s;
		border-radius: 3vw !important;
	}
	.mint-switch-core:after {
		width: 7vw !important;
		height: 6.2vw !important;
		background-color: #fff;
		box-shadow: 0 1px 0.4vw rgba(0,0,0,.4);
	}
	.mint-switch-core {
		display: inline-block;
		position: relative;
		top: -6px;
		width: 9.933vw !important;
		height: 6.4vw !important;
		border: 1px solid #d9d9d9;
		border-radius: 3.133vw !important;
		box-sizing: border-box;
		background: #d9d9d9;
	}
</style>
