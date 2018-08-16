<template>
  <div id="pet_details">
    <div
      style="position: fixed;top: 80px;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;"
      v-show="lod">
      正在加载,请稍后...
    </div>
    <!--内容-->
    <div id="soll" class="page-tab-container">
      <div class="ele2">
        <div class="pet-inf">
          <img class="avatar" :src="cwzp"/>
          <div class="pet-inf1">
            <div class="pet_name">
              宠物名称
              <div class="en_pet_name">Pet Name</div>
            </div>
          </div>
        </div>
        <div class="pname">
          {{cwmz}}
        </div>
      </div>

      <div class="ele">
        <div class="tit">
          <div class="cntit">宠物种类</div>
          <div class="entit">Pet type</div>
        </div>
        <div class="elecontent">
          {{varietys}}
        </div>
      </div>

      <div class="ele">
        <div class="tit">
          <div class="cntit">宠物品种</div>
          <div class="entit">Pet varietys</div>
        </div>
        <div class="elecontent">
          {{cwpz}}
        </div>
      </div>

      <div class="ele">
        <div class="tit">
          <div class="cntit">宠物年龄</div>
          <div class="entit">Pet age</div>
        </div>
        <div class="elecontent">
          {{cwnl}}
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">宠物重量(公斤)</div>
          <div class="entit">Pet weight(KG)</div>
        </div>
        <div class="elecontent">
          {{cwzl}}
        </div>
      </div>
      <div class="ele" v-if="info.petSize!==null">
        <div class="tit">
          <div class="cntit">体型尺寸</div>
          <div class="entit">Pet size</div>
        </div>
        <div class="elecontent">
          {{sizes}}
        </div>
      </div>

      <div class="ele" v-if="info.boxSize!==null||info.boxSize!==''">
        <div class="tit">
          <div class="cntit">笼子尺寸(米)</div>
          <div class="entit">Pet cage size(M)</div>
        </div>
        <div class="elecontent">
          {{info.boxSize}}
        </div>
      </div>

      <div class="ele">
        <div class="tit">
          <div class="cntit">是否已办理卫生证书</div>
          <div class="entit">Have The health certificate or no</div>
        </div>
        <div class="elecontent">
          {{sfblgz}}
        </div>
      </div>
      <div class="ele">
        <div class="tit">
          <div class="cntit">是否已植入芯片</div>
          <div class="entit">Implanted chip or no</div>
        </div>
        <div class="elecontent">
          {{chip}}
        </div>
      </div>

      <div class="ele1">
        <div class="tit2">
          <div class="cntit">免疫证照片</div>
          <div class="entit">Pet immunization certificate</div>
        </div>
        <img :src="myzzp" class="avatar">
      </div>

      <div class="ele" v-if="myz!==null">
        <div class="tit2">
          <div class="cntit">最后一次注射时间</div>
          <div class="entit">Last injection time</div>
        </div>
        <div class="elecontent">
          {{myz}}
        </div>
      </div>

      <div class="ele">
        <div class="tit2">
          <div class="cntit">发货地</div>
          <div class="entit">Place of dispatch</div>
        </div>
        <div class="elecontent">
          {{fhd}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">目的城市</div>
          <div class="entit">The destination city</div>
        </div>
        <div class="elecontent">
          {{area}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">预计航班日期</div>
          <div class="entit">Estimated flight date</div>
        </div>
        <div class="elecontent">
          {{riqi}}
        </div>
      </div>

      <div class="points">
        <span class="">主人信息</span>
        <div class="">The name</div>
      </div>

      <div class="ele">
        <div class="tit2">
          <div class="cntit">姓名</div>
          <div class="entit">The name</div>
        </div>
        <div class="elecontent">
          {{zrxm}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">联系方式</div>
          <div class="entit">Contact information</div>
        </div>
        <div class="elecontent">
          {{lxfs}}
        </div>
      </div>

      <div class="ele">
        <div class="tit2">
          <div class="cntit">机票信息</div>
          <div class="entit">Ticket information</div>
        </div>
        <div class="elecontent">
          {{jpxx}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">护照信息</div>
          <div class="entit">Passport information</div>
        </div>
        <div class="elecontent">
          {{hzxx}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">是否需要上门服务</div>
          <div class="entit">If you need Door-to-door service</div>
        </div>
        <div class="elecontent">
          {{sfxy}}
        </div>
      </div>

      <div v-if="sfxy == '是(Yes)'" class="ele">
        <div class="tit2">
          <div class="cntit">地址</div>
          <div class="entit">Address</div>
        </div>
        <div class="elecontent">
          {{dz}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {formatDate} from '../../assets/js/date.js';
  import Bus from './bus.js'

  export default {
    name: "pet_details",
    data() {
      return {
        /*属性*/
        dz: "",
        cwzp: '',
        smfw: false,
        hzxx: "",
        varietys: "",
        lxfs: "",
        sfzh: "",
        zrxm: "",
        sfblgz: "",
        riqi: "",
        area: "",
        fhd: "",
        myz: "",
        myzzp: "",
        chip: "",
        sizes: "",
        cwzl: "",
        cwnl: "",
        cwmz: "",
        cwpz: "",
        sfxy: "",
        jpxx: '',
        imgUrl: "",
        list: [],
        ids: "",
        lod: true,
        info: {},
      }
    },
    activated() {

    },
    methods: {
      goback() {
        this.$router.back(-1)
      },
      getdetails() {
        var that = this;
        axios.get('/eport-server/delivery/pet/queryOrderById.do', {
          params: {
            orderNo: this.ids
          }
        }).then(function (data) {
          that.info = data.data.data;
          that.cwzp = data.data.data.petPicture;
          that.area = data.data.data.endCity;
          that.riqi = data.data.data.flightDate;
          if (data.data.data.homeDelivery == 1) {
            that.sfxy = '是(Yes)'
          } else {
            that.sfxy = '否(No)'
          }
          that.jpxx = data.data.data.picketInfo;
          that.sfzh = data.data.data.ownerIdNo;
          that.zrxm = data.data.data.ownerName;
          that.hzxx = data.data.data.ownerPassport;
          that.lxfs = data.data.data.ownerTelNo;
          that.cwnl = data.data.data.petAge;
          that.cwpz = data.data.data.petBreed;
          that.sfblgz = data.data.data.petCertificate;
          if (data.data.data.petChip == 0) {
            that.chip = '否(No)'
          } else {
            that.chip = '是(Yes)'
          }
          that.cwmz = data.data.data.petName;
          that.sizes = data.data.data.petSize;
          that.varietys = data.data.data.petType;
          that.myz = data.data.data.petVaccineLastTime;
          that.myzzp = data.data.data.petVaccinePics;
          that.cwzl = data.data.data.petWeight;
          that.fhd = data.data.data.startCity;
          that.dz = data.data.data.homeAddress;
          setTimeout(() => {
            that.lod = false;
          }, 100);
        })
      }
    },
    mounted() {
      this.ids = this.$route.params.id;
      this.getdetails();

      console.log(this.myzzp + "1");
    },
  }
</script>

<style scoped>
  * {
    -webkit-overflow-scrolling: touch;
  }

  * {
    font-family: PingFangSC;
  }

  p {
    background: #fff5e5;
    line-height: 40px;
    padding: 15px 12px;
    height: 150px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 181, 64, 1);
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

  .avatar {
    width: 128px;
    height: 128px;
    display: inline-block;
  }

  .ele2 {
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

  .ele {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px;
    border-bottom: 1px solid #efefef;
    height: 120px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .ele3 {
    margin: 0px 20px;
    border-bottom: 1px solid #efefef;
    position: relative;
    min-height: 80px;
    font-size: 32px;
    padding-top: 10px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .tit {
    color: #333;
  }

  .inps {
    width: 55%;
    position: absolute;
    right: 7px;
    top: 10px;
    height: 45px;
    border: 0;
    outline: none;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: #939393;
  }

  .inps1 {
    width: 60%;
    position: absolute;
    right: 7px;
    top: 10px;
    height: 45px;
    border: 0;
    outline: none;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: #939393;
  }

  .po_right {
    position: absolute;
    top: 0px;
    z-index: 999;
    right: -6px;
    padding: 20px 8px 19px 34px;
  }

  .my-switch {
    position: absolute;
    top: 23px;
    right: 12px;
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

  .pet_pz {
    word-wrap: break-word;
  }

  .pet-inf {
    display: flex;
    align-items: center;
  }

  .pet-inf1 {
    display: flex;
    margin-left: 20px;
    height: 128px;
    align-items: center;
  }

  .pet_name {
    font-size: 36px;
  }

  .en_pet_name {
    font-size: 28px;
  }

  .pname {
    font-size: 40px;
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
</style>
