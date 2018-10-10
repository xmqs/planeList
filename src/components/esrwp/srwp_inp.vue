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
        <p class="pcon">本平台只提供申办渠道，由用户与托运公司双向自由交易， 平台不承担任何纠纷和法律责任，最终解释权归南京市电子 口岸公司所有。建议与投诉电话：025-521637463
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This platform only provides the bidding channel, which is two-way free
          transaction between the user and the consignment company. The platform does not bear any disputes and legal
          liabilities, and the final interpretation power is Nanjing electronics.All port compa nies. Advice and
          complaint phone: 025-521637463
        </p>
      </div>
      <div class="points">
        <span class="">物品信息</span>
        <p>Item information</p>
      </div>
      <div @click="wplist(packages)" class="ele eleright">
        <div class="tit">
          <div class="cntit">物品清单</div>
          <div class="entit">Item listing</div>
        </div>
        <div class="elecontent">
          <input v-show="packages.length!==0" readonly="readonly" class="inps" type="text" placeholder=""
                 v-model="packagesDetail" unselectable="on" onfocus="this.blur()"/>
          <p v-show="packages==''" class="enph">请填写物品清单</p>
          <p v-show="packages==''" class="enph">Please fill out the list</p>
        </div>
      </div>

      <div class="ele newsele">
        <div class="tit">
          <div class="cntit">总重量(千克)</div>
          <div class="entit">The total weight(KG)</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="text" placeholder="请输入物品总重量" v-model="weight"/>
          <p class="enph">Please enter the total weight of the item</p>
        </div>
      </div>

      <div @click="cage(size)" class="ele newsele eleright">
        <div class="tit">
          <div class="cntit">外包装尺寸(米)</div>
          <div class="entit">Outer packing dimension(M)</div>
        </div>
        <div class="elecontent">
          <input v-show="size!==''" readonly="readonly" class="inps" type="text" placeholder="" v-model="size"
                 unselectable="on" onfocus="this.blur()"/>
          <p v-show="size==''" class="enph">请输入外包装尺寸</p>
          <p v-show="size==''" class="enph">Please enter the outer packing size</p>
        </div>
      </div>

      <div @click="sheet1(0)" class="ele eleright">
        <div class="tit">
          <div class="cntit">发货地</div>
          <div class="entit">Place of dispatch</div>
        </div>
        <div class="elecontent">
          <input readonly="readonly" class="inps" type="text" v-model="startCity" unselectable="on"
                 onfocus="this.blur()"/>
        </div>
      </div>
      <div class="ele eleright">
        <div class="tit">
          <div class="cntit">选择目的城市</div>
          <div class="entit">Select the destination city</div>
        </div>
        <div class="elecontent" @click="toEnIndexList">
            <input readonly="readonly" class="inps" type="text" placeholder="" v-model="endCity" unselectable="on" onfocus="this.blur()"/>
        </div>
      </div>
      <div class="ele1">
        <div class="tit2">
          <div class="cntit">大件物品照片上传</div>
          <div class="entit">Upload photos of large items</div>
        </div>
        <img @click="myimg(1)" src="../../../static/img/Group 3.png" class="avatar">
      </div>

      <div class="ele4" v-if="bigPackageList.length!==0">
        <div v-for="(ele,index) in bigPackageList" v-if="bigPackageList" class="item">
          <img :src=ele class="avatar2">
          <img @click.stop="deleteImg(index)" src="../../../static/img/shanchu.png" class="delect-i">
        </div>
      </div>
      <div class="ele2">
        <span class="tit">电子机票行程单 E-ticket itinerary</span>
        <div>
          <div class="img_list">
            <img @click="myimg(2)" v-if="travelList1" :src="travelList1" class="item el-icon-plus">
            <img @click="myimg(2)" v-else class="item el-icon-plus" src="../../../static/img/Group 3.png"/>
            <p>正面</p>
            <p>Positive</p>
          </div>
          <div class="img_list">
            <img @click="myimg(3)" v-if="travelList2" :src="travelList2" class="item el-icon-plus">
            <img @click="myimg(3)" v-else class="item el-icon-plus" src="../../../static/img/Group 3.png"/>
            <p>反面</p>
            <p>Reverse</p>
          </div>
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
          <input class="inps" type="text" placeholder="请输入姓名" v-model="ownerName"/>
          <p class="enph">Please enter The name</p>
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">护照信息</div>
          <div class="entit">Passport information</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="text" placeholder="请输入护照信息" v-model="ownerPassport"/>
          <p class="enph">Please enter Passport information</p>
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">机票信息</div>
          <div class="entit">Ticket information</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="text" placeholder="请输入机票信息" v-model="picketInfo"/>
          <p class="enph">Please enter Ticket information</p>
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">联系方式</div>
          <div class="entit">Contact information</div>
        </div>
        <div class="elecontent2">
          <input class="inps" type="number" placeholder="请输入联系方式" v-model="ownerTelNo"/>
          <p class="enph">Please enter Contact information</p>
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">是否需要上门服务</div>
          <div class="entit">If you need Door-to-door service</div>
        </div>
        <mt-switch @change="serve_switch" class="my-switch hairlines" v-model="homeDelivery"></mt-switch>
      </div>
      <div v-show="addr" class="ele">
        <div class="tit2">
          <div class="cntit">地址</div>
          <div class="entit">Address</div>
        </div>
        <div class="elecontent">
          <input class="inps" type="text" placeholder="请输入地址" v-model="homeAddress"/>
          <p class="enph">Please enter Address</p>
        </div>
      </div>
      <div class="ele-s">
        <button @click="unbind && shenbao()" class="shenbao">申报 <br>Declare</button>
      </div>
    </div>
    <mt-actionsheet :actions="actions" closeOnClickModal="sheetVisible1" v-model="sheetVisible2"
                    cancel-text="取消"></mt-actionsheet>
  </div>
</template>
<script>
  import axios from "axios";
  import {Toast} from 'mint-ui';
  import {formatDate} from '../../assets/js/date.js';
  import Bus from './bus.js'

  export default {
    name: "srwp_input",
    data() {
      return {
        /*属性*/
        packages: [],
        weight: '',
        size: '',
        startCity: '',
        endCity: '',
        ownerName: '',
        ownerIdNo: '',
        ownerPassport: '',
        homeAddress: '',
        ownerTelNo: '',
        bigPackageList: [],
        travelList1: '',
        travelList2: '',
        homeDelivery: false,
        addr: false,
        travelList: [],
        packagesName: '',
        picketInfo: '',
        /*属性结束*/
        value: "",
        unbind: true,
        switch1: false,
        actions: [],
        actions0: [{
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
        sheetVisible1: false
      }
    },
    computed: {
      packagesDetail() {
        let list = ""
        for (let i = 0; i < this.packages.length; i++) {
          list += this.packages[i].name + ' ';
        }
        return list
      }
    },
    methods: {
      toEnIndexList(){
        this.$router.push({path:'/esrwp/IndexList'});
      },
      //图片上传
      myimg(res) {
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

        //e.preventdefault();
        //this.$router.push({oldUrl})
        var that = this;
        window.uploadImgOver = function (str) {
          //that.imageUrl = JSON.parse(str).data;
          if (res == 1) {
            that.bigPackageList.push(JSON.parse(str).data);
          } else if (res == 2) {
            that.travelList1 = JSON.parse(str).data;
          } else if (res == 3) {
            that.travelList2 = JSON.parse(str).data;
          }
        }
        if (isAndroid) {
          this.$router.go(-1);
        }
      },
      cage(res) {
        this.$router.push({
          name: 'eboxsize',
          params: {
            sizes: res
          }
        })
      },
      deleteImg(res) {
        this.bigPackageList.splice(res, 1)
      },
      handleAvatarSuccess(res, file) {
        this.bigPackageList.push(res.data);
      },
      handbefore() {

      },
      handleAvatarSuccess1(res, file) {
        this.travelList1 = res.data;
      },
      handleAvatarError(err, file, fileList) {
        Toast("上传失败");
      },
      handbefore1() {

      },
      handleAvatarSuccess2(res, file) {
        this.travelList2 = res.data;
      },
      handbefore2() {

      },
      fhd1() {
        this.startCity = '北京(BeiJing)'
      },
      fhd2() {
        this.startCity = '上海(ShangHai)'
      },
      fhd3() {
        this.startCity = '南京(NanJing)'
      },
      sheet1(n) {
        if (n == 0) {
          this.actions = this.actions0;
        }
        this.sheetVisible2 = !this.sheetVisible2;
      },
      wplist(res) {
        this.$router.push({name: 'ewplist', params: res});
      },
      serve_switch() {
        this.switch1 = !this.switch1;
        if (this.switch1 == true) {
          this.addr = true;
        } else {
          this.addr = false;
        }
      },
      shenbao() {
        this.unbind = false;
        setTimeout(() => {
          this.unbind = true;
        }, 3000);

        let check = true;
        if (this.packages.length == 0) {
          Toast('请填写物品清单 Please fill out the list')
          check = false;
          return;
        }

        if(this.weight == ""){
          Toast('请填写物品总重量 Please fill in the total weight')
          check = false;
          return;
        }

        if(this.size == ""){
          Toast('请填写外包装尺寸 Please fill in the dimensions of the outer packing')
          check = false;
          return;
        }
        if(this.startCity == ""){
          Toast('请选择发货地 Please choose the place of shipment')
          check = false;
          return;
        }
        if(this.endCity == ""){
          Toast('请选择目的地城市 Please select the destination city')
          check = false;
          return;
        }

        if (this.bigPackageList.length == 0) {
          Toast('请上传大件物品照片 Please upload photos of large items')
          check = false;
          return;
        }
        if (this.travelList2 == "" || this.travelList1 == "") {
          Toast('请上传电子机票行程单 Please upload the e-ticket itinerary')
          check = false;
          return;
        }
        if (this.ownerName == "") {
          Toast('请填写姓名 Please fill in your name')
          return;
        }
        if (this.ownerPassport == "") {
          Toast('请填写护照信息 Please fill in the passport information')
          return;
        }
        if (this.picketInfo == "") {
          Toast('请填写机票信息 Please fill in the ticket information')
          return;
        }
        if (this.ownerTelNo == "") {
          Toast('请填写联系方式 Please fill in the contact information')
          return;
        }


        var homeDelivery;
        if (this.homeDelivery == false) {
          homeDelivery = 0;
        } else {
          homeDelivery = 1;
          if (this.homeAddress == "") {
            Toast('请填写地址 Please fill in the address')
            return;
          }
        }

        this.travelList = [];
        this.travelList.push(this.travelList1);
        this.travelList.push(this.travelList2);

        if (check) {
          axios.post("/eport-server/delivery/luggage/saveOrder.do", {
            packages: this.packages,
            weight: this.weight,
            size: this.size,
            startCity: this.startCity,
            endCity: this.endCity,
            ownerName: this.ownerName,
            ownerIdNo: this.ownerIdNo,
            ownerPassport: this.ownerPassport,
            homeAddress: this.homeAddress,
            homeDelivery: homeDelivery,
            ownerTelNo: this.ownerTelNo,
            bigPackageList: this.bigPackageList,
            travelList: this.travelList,
            picketInfo:this.picketInfo
          }).then((res) => {
            console.log(res)
            if (res.status == 200) {
              Toast("申报成功 Declare success");
              setTimeout(() => {

                /*this.$router.replace({path: '/esrwp/srwp_list'})
                this.unbind = true;

                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if (isAndroid) {
                  window.close();
                } else {*/
                  this.$router.back(-1);
               /* }*/
              }, 1000);
            } else {
              Toast("申报失败 Declare false");
            }
          }, (res) => {
          });
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == "srwp_list") {
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
      } else {
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
      } else {

        var userinfo = sessionStorage.getItem('userifo');
        if (userinfo != null) {
          userinfo = JSON.parse(userinfo);
          this.ownerIdNo = userinfo.idNumber;
          this.ownerTelNo = userinfo.phone;
          this.ownerName = userinfo.userName;
        }
      }
    },
    created: function () {
    },
    filters: {}
  }
</script>

<style scoped>
  * {
    -webkit-overflow-scrolling: touch;
  }

  * {
    font-family: PingFangSC;
  }

  input, textarea {
    -khtml-user-select: auto !important;
    -moz-user-select: auto !important;
    -ms-user-select: auto !important;
    -o-user-select: auto !important;
    user-select: auto !important;
    -webkit-appearance: none;
  }

  @component-namespace page {
    @component actionsheet {
      @descendent wrapper {
        padding:

      0 20px

      ;
        position: absolute

      50% * * *

      ;
        width:

      100%;
        transform:

      translateY(-50%);
        button:first-child {
          margin-bottom: 20px;
        }
      }
    }
  }
  .pcon {
    background: #fff5e5;
    line-height: 36px;
    padding: 21px 36px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    color: #ffb540;
  }

  #soll {
    position: fixed;
    width: 100%;
    overflow: auto;
    height: 100%;
  }

  .points {
    padding: 20px;
    line-height: 45px;
    background-color: #eee;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    color: rgba(170, 170, 170, 1);
  }

  .ele1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px;
    border-bottom: 1px solid #efefef;
    height: 160px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .ele2 {
    margin: 0 20px;
    border-bottom: 1px solid #efefef;
    position: relative;
    min-height: 326px;
    line-height: 85px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .ele {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px 20px;
    border-bottom: 1px solid #efefef;
    min-height: 120px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .ele4 {
    margin: 0 20px;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
  }

  .eleright {
    background: #fff url("./../../../static/img/shape2.png") no-repeat right;
    background-size: 16px;
  }

  .tit {
    color: #333;
    max-width: 35%;
    overflow: hidden;
  }

  .elecontent {
    width: 60%;
    margin-right: 30px;
  }

  /*无角标*/
  .elecontent2 {
    width: 60%;
  }

  /*左加长 右短效果*/
  .tit2 {
    color: #333;
    max-width: 70%;
    overflow: hidden;
  }

  .elecontent3 {
    width: 20%;
    margin-right: 30px;
  }

  .tit p {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    line-height: 45px;
  }

  .cntit {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .entit {
    font-size: 28px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .inps {
    width: 100%;
    height: 45px;
    border: 0;
    outline: none;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: #333;
    text-align: right;
  }

  .inps1 {
    width: 60%;
    position: absolute;
    right: 7px;
    top: 3vw;
    height: 45px;
    border: 0;
    outline: none;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: #939393;
  }

  /*英文注释*/
  .enph {
    font-size: 28px;
    color: rgba(204, 204, 204, 1);
    line-height: 40px;
    text-align: right;
  }

  .pet-img {
    position: absolute;
    top: 7px;
    right: 40px;
    width: 64pt;
    height: 60pt;
  }

  .po_right {
    position: absolute;
    top: 7px;
    z-index: 999;
    right: -6px;
    padding: 20px 8px 19px 34px;
  }

  .ele-s {
    padding: 25px 19px;
    background: #f0f0f0;
  }

  .shenbao {
    border: 0;
    background: #285fb1;
    width: 100%;
    height: 92px;
    font-size: 34px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
  }

  .avatar-uploader {
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

  .avatar {
    width: 128px;
    height: 128px;
    display: inline-block;
  }

  .avatar2 {
    width: 160px;
    height: 160px;
  }

  .downwarp {
    position: absolute;
    right: 45px;
    top: 30px;
  }

  .downwarp-progress-s {
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 64pt;
    text-align: center;
    border: 1px solid #ccc;
  }


  .downwarp {
    margin-top: 45%;
  }

  .delect-i {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 40px;
  }

  .item {
    width: 170px;
    height: 170px;
    text-align: center;
    position: relative;
    display: inline-block;
  }

  .img_list {
    display: inline-block;
  }

  .img_list p {
    text-align: center;
    height: 28px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
  }

  .newsele {
    height: 160px;
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
    box-shadow: 0 1px 0.4vw rgba(0, 0, 0, .4);
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
