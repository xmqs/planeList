<template>
  <div id="servers">
    <div id="soll" class="page-tab-container">
      <ul>
        <li class="server_list" v-for="(element,index) in lists" :key="index">
          <div class="margin" v-if="element.needed == 'true'">
            <div class="tishi">
              <p>
                {{element.title}}
              </p>
              <p class="enname">
                {{element.enname}}
              </p>
            </div>
            <div class="allradio">
              ￥{{element.price}}元
            </div>
          </div>

          <div class="margin" v-else>
            <label v-if="element.isSelect == 'true'">
              <input  checked @click="checked($event)" class="cwtyCost" v=1 :id='element.id' :value='element.price'
                      type="radio" :name='index'><i><img style="position: relative;top: 2px;left:2px;width: 16px;"
                                                         src="./../../../static/img/serg.png" alt=""></i>
            </label>

            <label  v-else>
              <input @click="checked($event)" class="cwtyCost" v=0 :id='element.id' :value='element.price'
                     type="radio" :name='index'><i><img style="position: relative;top: 2px;left:2px;width: 16px;"
                                                        src="./../../../static/img/serg.png" alt=""></i>
            </label>

            <div v-if="element.isSelect == 'true'" class="tishi">
              <div>
                <p>
                  {{element.title}}
                </p>
                <p class="enname">
                  {{element.enname}}
                </p>
              </div>
            </div>
            <div v-else class="tishi">
              <div>
                <p>
                  {{element.title}}
                </p>
                <p class="enname">
                  {{element.enname}}
                </p>
              </div>
            </div>
            <div class="allradio">
              ￥{{element.price}}元
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="serversOK">
      <span class="allprice">
        合计金额：<span style="color:#285FB1">¥{{allCost}}</span>
        <p>Total amount</p>
      </span>
      <button @click="submit()" class="shenbao">
        <p>提交报价</p>
        <p>Submit quotation</p>
      </button>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import {Toast} from 'mint-ui';
  import {formatDate} from '../../assets/js/date.js';
  import Bus from './bus.js'

  export default {
    name: "servers",
    data() {
      return {
        varietys: "1",
        value: "1",
        lists: [],
        orderNo: "",
        servers: [],
        cost: '',
        allCost: 0
      }
    },
    methods: {
      checked(obj) {
        var myv = obj.target.attributes["v"].nodeValue;
        if (myv == 0) {
          obj.target.setAttribute("v", 1);
          obj.target.checked = true;
        } else {
          obj.target.setAttribute("v", 0);
          obj.target.checked = false;
        }
        if (obj.target.checked == true) {
          this.allCost += parseInt(obj.target.value)
        } else {
          this.allCost -= parseInt(obj.target.value)
        }
      },
      submit() {
        this.cost = 0;
        var sers = [];
        var boxes = document.getElementsByTagName("input");
        for (var i = 0; i < boxes.length; i++) {
          var ser = {};
          if (boxes[i].checked == true) {
            ser.isSelect = true;
          } else {
            ser.isSelect = false;
          }
          ser.serviceId = boxes[i].id;
          sers.push(ser)
        }
        for (var i = 0; i < this.lists.length; i++) {
          if (this.lists[i].needed == 'true') {
            var ser = {};
            ser.isSelect = true;
            ser.serviceId = this.lists[i].id;
            sers.push(ser)
          }
        }
        var that = this;
        axios.post("/eport-server/delivery/saveServices.do", {
          orderNo: that.orderNo,
          services: sers,
          type: '2'
        }).then((res) => {
          if (res.status == 200) {
            Toast("提交成功");
            setTimeout(() => {
              this.$router.back(-1)
            }, 1500)
          } else {
            Toast("提交失败");
          }
        }, (res) => {
        });
      },
      check: function () {
        console.log(this.value)
      },
      getList() {//获取服务列表
        var that = this;
        axios.get('/eport-server/delivery/queryServices.do', {
          params: {
            id: this.orderNo,
            type: '2'
          }
        }).then(function (data) {
          that.lists = data.data.data;
          for (var i = 0; i < that.lists.length; i++) {
            if (that.lists[i].isSelect == 'true' || that.lists[i].needed == 'true') {
              that.allCost += parseInt(that.lists[i].price);
            }
          }
        })
      },
    },
    created: function () {
      this.orderNo = this.$route.params.id;
      this.getList();
    },
    mounted() {
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

  #servers {
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
  }

  ul {
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    height: 100%;
    position: fixed;
    padding-bottom: 16.5vw;
    width: 100%;
  }

  li {
    list-style: none;
    background: #fff;
  }

  .margin {
    display: flex;
    margin-left: 30px;
    flex-grow:1;
    align-items: center;
  }

  .where {
    float: left;
  }

  .shenbao {
    border: 0;
    background: #285fb1;
    height: 100px;
    padding: 0 30px;
    font-size: 34px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .yaoqiu {
    width: 364px;
    height: 40px;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
    line-height: 40px;
    padding-left: 3vw;
    padding-top: 4.5vw;
  }

  .tishi {
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:45px;
    flex-grow: 1;
  }

  .allradio {
    font-size: 30px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 0, 0, 1);
    margin-right: 30px;
    white-space: nowrap;
  }

  label {
    font-size: 4vw;
    color: #333;
    overflow: hidden;
    margin-right: 14px;
  }

  label i {
    font-size: 4vw;
    display: inline-block;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    vertical-align: middle;
    margin: -2px 2px 1px 0px;
    border: #285FB1 1px solid;
  }

  input[type="radio"] {
    display: none;
  }

  input[type="radio"] + i {
    width: 16pt;
    height: 16pt;
    border-radius: 50%;
    font-size: 6.2vw;
  }

  input[type="radio"]:checked + i {
    border-radius: 50%;
    font-size: 6.2vw;
    text-align: left;
    color: #fff;
    background: #285fb1;
  }

  input[type="radio"]:disabled + i {
    border-color: #ccc;
  }

  input[type="radio"]:checked:disabled + i {
    background: #ccc;
  }

  .serversOK {
    background: #fff;
    position: fixed;
    width: 100%;
    bottom: 0vw;
    height: 100px;
  }

  .submit {
    width: 120px;
    text-align: center;
    line-height: 50px;
    float: right;
    background: #285fb1;
    height: 50px;
    padding: 0;
    color: #fff;
  }

  .allcost {
    padding: 0;
    float: left;
    padding: 10px 0 8px 15px;
  }

  .allprice {
    float: left;
    margin-left: 7vw;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .dot {
    width: 1.6vw;
    height: 1.6vw;
    background: red;
    position: absolute;
    top: 5.7vw;
    border-radius: 50%;
    left: 6px;
  }

  .server_list {
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid #f1f1f1;
    justify-content: space-between;
    align-items: center;
  }
  .enname{
    font-size: 28px;
    color: #333;
  }
</style>
<style>
  .mint-toast-text {
    font-size: 3.8vw !important;
  }
</style>
