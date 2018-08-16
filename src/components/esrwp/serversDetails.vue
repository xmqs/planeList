<template>
  <div id="serversDetails">
    <!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
            服务详情
            <img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
        </header> -->
    <div id="soll" class="page-tab-container">
      <div id="overflow">
        <p class="points1">如需更改服务请拨打电话025-521637463</p>
        <div class="ele2">
          <div class="ele2-1 ele2-2">
            <p class="pet-name">{{petName}}</p>
            <p class="pet-where">{{startCity}}->{{endCity}}</p>
            <p class="pet-time">{{createTime}}</p>
          </div>
        </div>
        <div class="ele3">
          <div v-for="(element,index) in lists1" class="ele2-3">
            <div class="tishi">{{element.title}}</div>
            <div class="allprice">
              <div class="price">￥{{element.price}}元</div>
            </div>
          </div>
          <div class="ele2-3">
            <div class="tishi">qweqweqwe</div>
            <div class="allprice">
              <div class="price">￥132元</div>
            </div>
          </div>
          <div class="ele2-3">
            <div class="tishi">qrwerwqrt</div>
            <div class="allprice">
              <div class="price">￥22元</div>
            </div>
          </div>
        </div>
        <div class="ele4">
          其他收费服务
        </div>
        <div style="margin-top: 11px;" class="ele3">
          <div v-for="(element,index) in lists2" class="ele2-3">
            <div class="tishi">{{element.title}}</div>
            <div class="allprice">
              <div class="price">￥{{element.price}}元</div>
            </div>
          </div>
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
    name: "serversDetails",
    data() {
      return {
        varietys: "1",
        gou1: false,
        gou2: false,
        lists: [],
        lists1: [],
        lists2: [],
        endCity: '',
        petName: '',
        startCity: '',
        createTime: '',
        homeAddress: '',
      }
    },
    methods: {
      // goback(){
      // 	this.$router.push({name: 'srwp_list',
      // 		params:{
      // 			res:'tab-container3'
      // 		}
      // 	})
      // },
      getList() {//获取服务列表
        var that = this;
        axios.get('/eport-server/delivery/queryServices.do', {
          params: {
            id: that.orderNo,
            type: '2'
          }
        }).then(function (data) {
          that.lists = data.data.data;
          for (var i = 0; i < that.lists.length; i++) {
            if (that.lists[i].isSelect == 'true') {
              that.lists1.push(that.lists[i])
            } else {
              that.lists2.push(that.lists[i])
            }
          }
        })
      },
      getdetails() {
        var that = this;
        axios.get('/eport-server/delivery/luggage/queryOrderById.do', {
          params: {
            orderNo: that.orderNo
          }
        }).then(function (data) {
          that.endCity = data.data.data.endCity;
          that.petName = data.data.data.ownerName;
          that.startCity = data.data.data.startCity;
          that.createTime = data.data.data.createTime
          that.homeAddress = data.data.data.homeAddress
        });
      }
    },
    created: function () {
      this.orderNo = this.$route.params.id;
      setTimeout(() => {
        this.getList();
        this.getdetails();
      }, 100)
    }
  }
</script>
<style scoped>
  * {
    -webkit-overflow-scrolling: touch;
  }

  * {
    font-family: PingFangSC;
  }

  #serversDetails {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    padding: 0;
    margin: 0;
  }

  #soll {
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #overflow {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ele2 {
    padding: 28px 28px 20px 28px;
    background-color: #fff;
  }

  .ele3 {
    padding: 6px 27px 0px 27px;
    background-color: #fff;
  }

  .ele4 {
    width: 100%;
    margin: auto;
    height: 8.667vw;
    text-align: center;
    line-height: 11.667vw;
    font-size: 4vw;
    color: #333;
  }

  .points1 {
    background: #fff5e5;
    line-height: 80px;
    padding: 0px 22px;
    height: 80px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 181, 64, 1);
  }

  .pet-img {
    width: 150px;
    height: 142px;
  }

  .ele2-1 {
    float: left;
  }

  .ele2-3 {
    width: 100%;
    border-bottom: 1px solid #efefef;
    margin-bottom: 1.6vw;
    position: relative;
    height: 80px;
    background: #fff;
    line-height: 60px;
  }

  .ele2-4 {
    width: 100%;
    height: 8.2vw;
    line-height: 8.2vw;
    font-size: 4.133vw;
    color: #333;
  }

  .ele2-2 {
    padding: 7px 7px 7px 17px;
  }

  .pet-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 240px;
    font-size: 32px;
    font-family: PingFangSC-Medium;
    color: rgba(51, 51, 51, 1);
  }

  .pet-where {
    margin-top: 42px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
  }

  * {
    -webkit-overflow-scrolling: touch;
  }

  * {
    font-family: PingFangSC;
  }

  #serversDetails {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    padding: 0;
    margin: 0;
  }

  #soll {
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #overflow {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ele2 {
    position: relative;
    height: 200px;
    padding: 28px 28px 20px 28px;
    background-color: #fff;
  }

  .ele3 {
    padding: 6px 27px 0px 27px;
    background-color: #fff;
  }

  .ele4 {
    width: 100%;
    margin: auto;
    height: 8.667vw;
    text-align: center;
    line-height: 11.667vw;
    font-size: 4vw;
    color: #333;
  }

  .points1 {
    background: #fff5e5;
    line-height: 80px;
    padding: 0px 22px;
    height: 80px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 181, 64, 1);
  }

  .pet-img {
    width: 150px;
    height: 142px;
  }

  .ele2-1 {
    float: left;
  }

  .ele2-3 {
    width: 100%;
    border-bottom: 1px solid #efefef;
    margin-bottom: 1.6vw;
    position: relative;
    height: 80px;
    background: #fff;
    line-height: 60px;
  }

  .ele2-4 {
    width: 100%;
    height: 8.2vw;
    line-height: 8.2vw;
    font-size: 4.133vw;
    color: #333;
  }

  .ele2-2 {
    padding: 7px 7px 7px 17px;
  }

  .pet-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 240px;
    font-size: 32px;
    font-family: PingFangSC-Medium;
    color: rgba(51, 51, 51, 1);
  }

  .pet-where {
    margin-top: 42px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
  }

  .pet-time {
    position: absolute;
    top: 40px;
    right: 20px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
  }

  .tishi, .yaoqiu {
    height: 8vw;
    margin-top: 2vw;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .yaoqiu {
    padding-top: 7px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
    width: 70%;
  }

  .allprice {
    position: absolute;
    top: -4.333vw;
    right: -13.333vw;
    width: 30vw;
    height: 20vw;
    font-size: 28px;
    font-family: PingFangSC;
    color: rgba(51, 51, 51, 1);
  }

  .price {
    color: #FF0000;
    margin-top: 4.8vw;
  }

  .addr {
    float: left;
  }

  .addr1 {
    margin-left: 24px;
    color: #999;
    width: 85%;
    text-align: center;
  }
</style>
