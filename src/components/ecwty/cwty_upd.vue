<template>
  <div id="cwty_input">
    <div style="position: fixed;top: 80px;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;" v-show="lod">
      正在加载,请稍后...
    </div>
    <div id="soll" class="page-tab-container">
      <div class="points1">
        <p class="pcon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本平台只提供申办渠道，由用户与托运公司双向自由交易， 平台不承担任何纠纷和法律责任，最终解释权归南京市电子口岸公司所有。建议与投诉电话：025-521637463<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This platform only provides the bidding channel, which is two-way free transaction between the user and the consignment company. The platform does not bear any disputes and legal liabilities, and the final interpretation power is Nanjing electronics.All port compa nies. Advice and complaint phone: 025-521637463
        </p>
      </div>
      <div class="points">
        <span class="">宠物信息</span>
        <p>Pet information</p>
      </div>
      <div class="ele1">
        <div class="tit2">
          <div class="cntit">宠物照片</div>
          <div class="entit">Pet pictures</div>
        </div>
        <img @click="myimg(1)" :src="imageUrl" class="avatar">
      </div>
      <div class="ele eleright">
        <div class="tit">
          <div class="cntit">宠物种类</div>
          <div class="entit">Pet type</div>
        </div>
        <div @click="rou_cwzl(varietys)" class="elecontent">
          <input readonly="readonly" class="inps" type="text" placeholder="" v-model="varietys" unselectable="on" onfocus="this.blur()"/>
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">宠物品种</div>
          <div class="entit">Pet breed</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="text" placeholder="请输入宠物品种" v-model="cwpz" />
          <p class="enph">Please enter a pet variet</p>
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">宠物名称</div>
          <div class="entit">Pet name</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="text" placeholder="请输入宠物名字" v-model="cwmz" />
          <p class="enph">Please enter a pet name</p>
        </div>
      </div>
      <div @click="sheet1(3)" class="ele eleright">
        <div class="tit">
          <div class="cntit">宠物年龄</div>
          <div class="entit">Pet age</div>
        </div>
        <div class="elecontent">
          <input readonly="readonly" class="inps" type="text" v-model="cwnl" unselectable="on" onfocus="this.blur()"/>
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">宠物重量(公斤)</div>
          <div class="entit">Pet weight(KG)</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="number" placeholder="请输入宠物重量(公斤)" v-model="cwzl" />
          <p class="enph">Please enter a pet weight</p>
        </div>
      </div>
      <div @click="sheet1(1)" class="ele newsele eleright">
        <div class="tit">
          <div class="cntit">体型尺寸</div>
          <div class="entit">Pet size</div>
        </div>
        <div class="elecontent">
          <input v-show="sizes!==''" readonly="readonly" class="inps" type="text" placeholder="" v-model="sizes" unselectable="on" onfocus="this.blur()"/>
          <p v-show="sizes==''" class="enph">如须购买笼子 请选择体型尺寸</p>
          <p v-show="sizes==''" class="enph">If you want to buy a cage, please choose the pet size</p>
        </div>
      </div>
      <div @click="cage(sizes1)" class="ele newsele eleright">
        <div class="tit">
          <div class="cntit">笼子尺寸</div>
          <div class="entit">Pet cage size</div>
        </div>
        <div class="elecontent">
          <input  v-show="sizes1!==''&&sizes1!==null" readonly="readonly" class="inps" type="text" placeholder="" v-model="sizes1" unselectable="on" onfocus="this.blur()"/>
          <p v-show="sizes1==''||sizes1==null" class="enph">如已有笼子请正确填写笼子尺寸</p>
          <p v-show="sizes1==''||sizes1==null" class="enph">If you have a cage, please fill in the cage size correctly</p>
        </div>
      </div>
      <div @click="sheet1(2)" class="ele eleright">
        <div class="tit2">
          <div class="cntit">是否已办理卫生证书</div>
          <div class="entit">Have The health certificate or no</div>
        </div>
        <div class="elecontent3">
          <input readonly="readonly" class="inps" type="text" placeholder="" v-model="sfblgz" unselectable="on" onfocus="this.blur()"/>
        </div>
      </div>
      <div @click="sheet1(0)" class="ele eleright">
        <div class="tit2">
          <div class="cntit">是否已植入芯片</div>
          <div class="entit">Implanted chip or no</div>
        </div>
        <div class="elecontent3">
          <input readonly="readonly" class="inps" type="text" placeholder="" v-model="chip" unselectable="on" onfocus="this.blur()"/>
        </div>
      </div>
      <div class="ele1">
        <div class="tit2">
          <div class="cntit">免疫证照片</div>
          <div class="entit">Pet immunization certificate</div>
        </div>
        <img @click="myimg(2)" :src="imageUrl2" class="avatar">
      </div>
      <div class="ele">
        <input @change="gettime('myzh')" id="time" class="chiotiem1" type="date" :max="nowdate">
        <div class="chiotiem">
          {{time}}
          <p  class="entit">Last injection time</p>
        </div>
      </div>
      <div @click="sheet1(4)" class="ele eleright">
        <div class="tit">
          <div class="cntit">发货地</div>
          <div class="entit">Place of dispatch</div>
        </div>
        <div class="elecontent">
          <input readonly="readonly" class="inps" type="text" v-model="fhd" unselectable="on" onfocus="this.blur()"/>
        </div>
      </div>
      <div class="ele eleright">
        <div class="tit">
          <div class="cntit">选择目的城市</div>
          <div class="entit">Select the destination city</div>
        </div>
        <div class="elecontent">
          <router-link :to="{name:'enIndexList'}">
            <input readonly="readonly" class="inps" type="text" placeholder="" v-model="area" unselectable="on" onfocus="this.blur()"/>
          </router-link>
        </div>
      </div>
      <div class="ele">
        <input @change="gettime('hangban')" id="time2" class="chiotiem1" type="date" :min="nowdate">
        <div class="chiotiem">
          {{time2}}
          <p  class="entit">Estimated flight date</p>
        </div>
      </div>
      <div class="points">
        <span class="">主人信息</span>
        <p>Pet owner information</p>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">姓名</div>
          <div class="entit">The name</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="text" placeholder="请输入姓名" v-model="zrxm" />
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">护照信息</div>
          <div class="entit">Passport information</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="text" placeholder="请输入护照信息" v-model="hzxx" />
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">机票信息</div>
          <div class="entit">Ticket information</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="text" placeholder="请输入机票信息" v-model="jpxx" />
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">联系方式</div>
          <div class="entit">Contact information</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="number" placeholder="请输入联系方式" v-model="lxfs" />
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">是否需要上门服务</div>
          <div class="entit">If you need Door-to-door service</div>
        </div>
        <mt-switch @change="serve_switch" class="my-switch hairlines" v-model="smfw"></mt-switch>
      </div>
      <div v-show="addr" class="ele" >
        <div class="tit2">
          <div class="cntit">地址</div>
          <div class="entit">Address</div>
        </div>
        <div class="elecontent">
          <input class="inps" type="text" placeholder="请输入地址" v-model="dz" />
        </div>
      </div>
      <div class="ele-s">
        <button @click="unbind && shenbao()" class="shenbao">保存<br>Save</button>
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
        ids:"",
        home:true,
        /*属性结束*/
        unbind:true,
        value:"",
        switch1:false,
        addr:false,
        name:"",
        time:"最后一次注射时间",
        time2:"预计航班日期",
        actions:[],
        nowdate:'',
        actions0:[{
          name: '是否已植入芯片(Implanted chip or not)'
        },{
          name: '是(Yes)',
          method: this.chip1
        }, {
          name: '否(No)',
          method: this.chip2
        }],
        actions1:[{
          name: '体型尺寸(Pet size)'
        },{
          name: '大型(Large)',
          method: this.size1
        }, {
          name: '中型(Medium)',
          method: this.size2
        }, {
          name: '小型(Small)',
          method: this.size3
        },{
          name: '不需要笼子(Don\'t need a cage)',
          method: this.size4
        }],
        actions2:[{
          name: '是(Yes)',
          method: this.sfblgz1
        }, {
          name: '否(No)',
          method: this.sfblgz2
        }],
        actions3:[{
          name: '宠物年龄(Pet age)'
        },{
          name: '小于1岁(Less than 1 year old)',
          method: this.age1
        }, {
          name: '1~5岁(1-5 years of age)',
          method: this.age2
        }, {
          name: '5~10岁(5-10 years old)',
          method: this.age3
        }, {
          name: '10岁以上(More than 10 years old)',
          method: this.age4
        }],
        actions4:[{
          name: '北京(BeiJing)',
          method: this.fhd1
        }, {
          name: '上海(ShangHai)',
          method: this.fhd2
        }, {
          name: '南京(NanJing)',
          method: this.fhd3
        }],
        sheetVisible2: false,
        sheetVisible1:false
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
          this.time = "最后一次注射时间：" + times;
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
          window.location.href += '#uploadImgByClient?imgNum=0&serverurl=https://m.mynj.cn:11162/web-editor-web/public/delivery/uploadByBase64.do&selectPhotoType=photoAll';
        }

        if (isiOS) {
          window.location.href = '#uploadImgByClient?imgNum=0&serverurl=https://m.mynj.cn:11162/web-editor-web/public/delivery/uploadByBase64.do&selectPhotoType=photoAll';
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
        if (isAndroid) {
          this.$router.go(-1);
        }
      },
			cage(res){
				this.$router.push({name: 'ensizes',
					params:{
						sizes:res
					}
				})
			},
			rou_cwzl(varietys){
        this.$router.push({path: '/chiose_rad/en_chiose_rad'})
			},
      chip1() {
        this.chip = '是(Yes)'
      },
      chip2() {
        this.chip = '否(No)'
      },
      size1() {
        this.sizes = '大型(Large)'
      },
      size2() {
        this.sizes = '中型(Medium)'
      },
      size3() {
        this.sizes = '小型(Small)'
      },
      size4() {
        this.sizes = ''
      },
      sfblgz1() {
        this.sfblgz = '是(Yes)'
      },
      sfblgz2() {
        this.sfblgz = '否(No)'
      },
      age1() {
        this.cwnl = '小于1岁(Less than 1 year old)'
      },
      age2() {
        this.cwnl = '1~5岁(1-5 years of age)'
      },
      age3() {
        this.cwnl = '5~10岁(5-10 years old)'
      },
      age4() {
        this.cwnl = '10岁以上(More than 10 years old)'
      },
      fhd1() {
        this.fhd = '北京(BeiJing)'
      },
      fhd2() {
        this.fhd = '上海(ShangHai)'
      },
      fhd3() {
        this.fhd = '南京(NanJing)'
      },
			serve_switch(){
				this.switch1 = !this.switch1;
				if (this.switch1 == true) {
					this.addr = true;
				}else{
					this.addr = false;
				}
			},
			sheet1(n){
				if (n == 1) {
					this.actions = this.actions1;
				} else if (n == 2){
					this.actions = this.actions2;
				} else if (n == 0){
					this.actions = this.actions0;
				} else if (n == 3){
					this.actions = this.actions3;
				} else if (n == 4){
					this.actions = this.actions4;
				}
				this.sheetVisible2 = !this.sheetVisible2;
			},
			shenbao(){
				this.unbind = false;
				var check = true;
        /*宠物照片*/
        if (this.imageUrl.indexOf('http') == -1) {
          Toast('请上传宠物照片 Please upload your pet photo');
          check = false;
          this.unbind = true;
          return;
        }
        /*请选择宠种类*/
        if(this.varietys == ""){
          Toast('请选择宠种类 Please select the pet type');
          check = false;
          this.unbind = true;
          return;
        }
        /*请选择宠品种*/
        if(this.cwpz == ""){
          Toast('请填写宠物品种 Please fill in the pet species');
          check = false;
          this.unbind = true;
          return;
        }
        /*请天写宠物名称*/
        if(this.cwmz == ""){
          Toast('请填写宠物名称 Please fill in the pet name');
          check = false;
          this.unbind = true;
          return;
        }

        /*请选择宠物年龄*/
        if(this.cwnl == ""){
          Toast('请选择宠物年龄 Please choose your pet\'s age');
          check = false;
          this.unbind = true;
          return;
        }
        /*重量*/
        if(this.cwzl == ""){
          Toast('请填写宠物重量 Please fill in the pet weight');
          check = false;
          this.unbind = true;
          return;
        }

        if(isNaN(Number(this.cwzl))){
          Toast('宠物重量填写有误 Incorrect pet weight entry/The pet weight was incorrectly filled in')
          check = false;
          this.unbind = true;
          return;
        }

        /*体型尺寸*/
        if (this.sizes == ""&&this.sizes1 == "") {
          Toast('笼子尺寸与体型尺寸至少选择一种 Choose at least one cage size and body size')
          check = false;
          this.unbind = true;
          return;
        }

        /*TODO 添加新判断 卫生证书 和 芯片*/

        if(this.sfblgz==""){
          Toast('请选择是否办理卫生证书 Please choose whether to apply for a health certificate');
          check = false;
          this.unbind = true;
          return;
        }

        if(this.chip==""){
          Toast('请选择是否已植入芯片 Please select whether the chip has been implanted');
          check = false;
          this.unbind = true;
          return;
        }
        /*请上传免疫证照片*/
        if (this.myz1.indexOf('http') == -1) {
          Toast('请上传免疫证照片 Please upload the photo of immunization certificate')
          check = false;
          this.unbind = true;
          return;
        }

        if(this.fhd == ""){
          Toast('请选择发货地 Please choose the place of shipment')
          check = false;
          this.unbind = true;
          return;
        }

        if(this.area == ""){
          Toast('请选择目的城市 Please select the destination city')
          check = false;
          this.unbind = true;
          return;
        }


        if(this.time2 == "预计航班日期："||this.time2 == "预计航班日期"){
          Toast('请选择目的城市 Please select the destination city')
          check = false;
          this.unbind = true;
          return;
        }

        if (this.zrxm == "") {
          Toast('请填写姓名 Please fill in your name')
          check = false;
          this.unbind = true;
          return;
        }

        if(this.hzxx == ""){
          Toast('请填写护照信息 Please fill in the passport information')
          check = false;
          this.unbind = true;
          return;
        }

        if(this.jpxx == ""){
          Toast('请填写机票信息 Please fill in the ticket information')
          check = false;
          this.unbind = true;
          return;
        }

        if(this.lxfs == ""){
          Toast('请填写联系方式 Please fill in the contact information')
          check = false;
          this.unbind = true;
          return;
        }

        if (this.smfw == true) {
          if (this.dz == "") {
            Toast('请填写地址 Please fill in the address')
            check = false;
            this.unbind = true;
            return;
          }
        }

				if (check) {
					var sfxysmfu;
					var xfzrxp;
					if(this.smfw == false){
						sfxysmfu = 0;
					}else{
						sfxysmfu = 1;
					}
					if(this.chip == "是(Yes)"){
						xfzrxp = 1
					}else{
						xfzrxp = 0
					}
					axios.post("/eport-server/delivery/pet/saveOrder.do", {
						id:this.ids,
						endCity:this.area,
						flightDate:this.riqi,
						homeDelivery:sfxysmfu,
						ownerIdNo:this.sfzh,
						ownerName:this.zrxm,
						ownerPassport:this.hzxx,
						ownerTelNo:this.lxfs,
						petAge:this.cwnl,
						petBreed:this.cwpz,
						petCertificate:this.sfblgz,
						petChip:xfzrxp,
						petName:this.cwmz,
						petPicture:this.imageUrl,
						petSize:this.sizes,
						petType:this.varietys,
						petVaccineLastTime:this.myz,
						petVaccinePics:this.myz1,
						petWeight:this.cwzl,
						startCity:this.fhd,
						homeAddress:this.dz,
						boxSize:this.sizes1,
						picketInfo:this.jpxx
					}).then((res) => {
						if(res.status == 200) {
              Toast("修改成功 Modify Success");
							setTimeout(()=> {
                this.unbind = true;
                /*TODO  修改添加*/
                /*var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if (isAndroid) {
                  Toast("修改成功,返回即可 Modify Success,Please Back");
                  //window.history.go(-1);
                } else {*/
                this.$router.back(-1);
              /*}*/
							},1000);
						}else{
							Toast("修改失败 Modify false");
						}
					}, (res) => {
					});
				}
			},
		},
    activated(){
		  if(this.home){
        this.ids = this.$route.params.id;
        axios.get('/eport-server/delivery/pet/queryOrderById.do', {
          params: {
            orderNo :this.ids
          }
        }).then((data)=> {
          if(data.data.data.petVaccineLastTime=='null'||data.data.data.petVaccineLastTime==''||data.data.data.petVaccineLastTime==null){
            this.time = "最后一次注射时间：无"
          }else{
            this.time = "选择最后一次注射时间："+data.data.data.petVaccineLastTime;
          }
          if(data.data.data.flightDate=='null'||data.data.data.flightDate==''||data.data.data.flightDate==null){
            this.time2 = "预计航班日期：无";
          }else{
            this.time2 = "预计航班日期："+data.data.data.flightDate;
          }


          this.imageUrl2 = data.data.data.petVaccinePics;
          this.myz1 = data.data.data.petVaccinePics;
          this.imageUrl = data.data.data.petPicture;
          this.area = data.data.data.endCity;
          this.riqi = data.data.data.flightDate;
          this.dz = data.data.data.homeAddress;
          this.jpxx = data.data.data.picketInfo;
          this.sizes1 = data.data.data.boxSize;
          if (data.data.data.homeDelivery == 0) {
            this.smfw = false
            this.dz = ''
          } else{
            this.smfw = true
          }
          this.sfzh = data.data.data.ownerIdNo;
          this.zrxm = data.data.data.ownerName;
          this.hzxx = data.data.data.ownerPassport;
          this.lxfs = data.data.data.ownerTelNo;
          this.cwnl = data.data.data.petAge;
          this.cwpz = data.data.data.petBreed;
          this.sfblgz = data.data.data.petCertificate;
          if (data.data.data.petChip == 0) {
            this.chip = '否'
          } else{
            this.chip = '是'
          }
          this.cwmz = data.data.data.petName;
          this.sizes = data.data.data.petSize;
          this.varietys = data.data.data.petType;
          this.myz = data.data.data.petVaccineLastTime;
          this.cwzl = data.data.data.petWeight;
          this.fhd = data.data.data.startCity;
          this.lod2 = false;
          this.lod1 = true;
          if(data.data.data.homeDelivery=="1"){
            this.addr = true;
          }
        })
      }
    },
		mounted() {

		},
		created: function() {
        var that = this;
		    Bus.$on('area', (e) => {
		    	that.area = e;
		    })
		    Bus.$on('myz', (e,el) => {
          that.myz = e;
          that.myz1 = el;
		    })
		    Bus.$on('varietys', (e) => {
				  that.varietys = e;
		    })
		    Bus.$on('sizes1', (e) => {
				  that.sizes1 = e;
		    })
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
        this.time = "";
        this.time2 = "";
        this.home = true;
      } else {
        this.home = false;
      }
      next();
    },
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
    line-height:36px;
    padding: 21px 36px;
    font-size:26px;
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
    line-height: 45px;
    background-color: #eee;
    font-size:28px;
    font-family:PingFangSC-Regular;
    color:rgba(170,170,170,1);
  }
  .ele{
    display: flex;
    align-items:center;
    justify-content: space-between;
    margin: 0px 20px;
    border-bottom: 1px solid #efefef;
    min-height: 120px;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .ele1{
    display: flex;
    align-items:center;
    justify-content: space-between;
    margin: 0 20px;
    border-bottom: 1px solid #efefef;
    height: 160px;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  /*添加右箭头*/
  .eleright{
    background: #fff url("./../../../static/img/shape2.png") no-repeat right;
    background-size: 16px;
  }
  .tit{
    color: #333;
    max-width: 35%;
    overflow: hidden;
  }
  .elecontent{
    width: 60%;
    margin-right: 30px;
  }
  /*无角标*/
  .elecontent2{
    width: 60%;
  }
  /*左加长 右短效果*/
  .tit2{
    color: #333;
    max-width: 70%;
    overflow: hidden;
  }
  .elecontent3{
    width: 20%;
    margin-right: 30px;
  }
  .tit p{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:45px;
  }
  .cntit{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .entit{
    font-size:28px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .inps{
    width: 100%;
    height: 45px;
    border: 0;
    outline: none;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:#333;
    text-align: right;
  }
  .inps3{
    width: 100%;
    height: 45px;
    border: 0;
    outline: none;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:#333;
    text-align: right;
    background: #fff;
  }
  /*英文注释*/
  .enph{
    font-size:28px;
    font-family:PingFangSC-Regular;
    color:rgba(204,204,204,1);
    line-height:40px;
    text-align: right;
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
  .ele-s{
    padding: 25px 19px;
    background: #f0f0f0;
  }
  .shenbao{
    border: 0;
    background: #285fb1;
    width: 100%;
    height: 102px;
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
    width: 128px;
    height: 128px;
    display: inline-block;
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
