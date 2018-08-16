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
      check: function () {
        console.log(this.value)
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
          type: '1'
        }).then((res) => {
          if (res.status == 200) {
            Toast("提交成功 Submission successfully");
            setTimeout(() => {
              this.$router.back(-1)
            }, 1500)
          } else {
            Toast("提交失败 Submission failed");
          }
        }, (res) => {
        });
      },
      getList() {//获取服务列表



        var that = this;
        axios.get('/eport-server/delivery/queryServices.do', {
          params: {
            id: that.orderNo,
            type: '1'
          }
        }).then(function (data) {
          //that.lists = data.data.data;
          that.lists = [{"id":"F2EA694847AE4C37BA9B6B36E520651D","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":1,"title":"出口报关费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Export clearance:CNY/shipment","options":null},{"id":"C4D8191788D6402F86AF0A97BCBEEA0F","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":1,"title":"出口报关费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Export clearance:CNY/shipment","options":null},{"id":"1E726A97D32D455FB4AC040E7EC9EE58","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":2,"title":"海关查验费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Exam charge:CNY/shipment","options":null},{"id":"F82C0F51541E48F79464D95D310A14E4","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":2,"title":"海关查验费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Exam charge:CNY/shipment","options":null},{"id":"3A55544DDA38416E8C8E963B0E56A0E2","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":3,"title":"商检检查费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Inspect charge:CNY/shipment","options":null},{"id":"43A4FC4A61BD4EA49911DD96C67AC1ED","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":3,"title":"商检检查费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Inspect charge:CNY/shipment","options":null},{"id":"99FEFE419D6443FFA970168F75188567","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":4,"title":"航空文件费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"400","isSelect":null,"enname":"Airline docs:CNY/shipment","options":null},{"id":"1DF2635E93B6412B8AF121F2F1A7E2E8","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":4,"title":"航空文件费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"400","isSelect":null,"enname":"Airline docs:CNY/shipment","options":null},{"id":"E89C7BF7DA14446687B30A1D1731D445","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":5,"title":"经香港中转申报费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Transfer in HK:CNY/shpt","options":null},{"id":"BCE82CA56A674574B090DCFB4E2A9B02","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":5,"title":"经香港中转申报费","description":"CNY/票","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Transfer in HK:CNY/shpt","options":null},{"id":"F433A5BA9D0641F8ABF15B8E460898C0","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":7,"title":"燃油附加费","description":"CNY/公斤","createTime":null,"updateTime":null,"content":null,"key":null,"price":"100","isSelect":null,"enname":"Fuel charge:CNY/KG MIN:CNY/shpt","options":null},{"id":"D4DCDC136E39493896FF64B1C16F76C9","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":7,"title":"燃油附加费","description":"CNY/公斤","createTime":null,"updateTime":null,"content":null,"key":null,"price":"100","isSelect":null,"enname":"Fuel charge:CNY/KG MIN:CNY/shpt","options":null},{"id":"274E3C7B0A824E48BC33375C54196C13","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":null,"title":"安全附加费","description":"CNY/KG","createTime":null,"updateTime":null,"content":null,"key":null,"price":"100","isSelect":null,"enname":"Security charge:CNY/KG MIN:CNY/shpt","options":null},{"id":"3D155D26FBC44EA78DC6E83649B972D8","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":null,"title":"仓库费","description":"CNY/票/天","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Terminal Charge:CNY/shipment/day","options":null},{"id":"1BDDC38E2C114124B6BA1584B497CF89","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":null,"title":"安全附加费","description":"CNY/KG","createTime":null,"updateTime":null,"content":null,"key":null,"price":"100","isSelect":null,"enname":"Security charge:CNY/KG MIN:CNY/shpt","options":null},{"id":"0800D448E81543849E2B3157979AF9AD","type":null,"needed":"true","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":null,"title":"仓库费","description":"CNY/票/天","createTime":null,"updateTime":null,"content":null,"key":null,"price":"200","isSelect":null,"enname":"Terminal Charge:CNY/shipment/day","options":null},{"id":"1B3CB21F78914E469EEB07CCED05562D","type":null,"needed":"false","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":0,"title":"购买笼子","description":"购买笼子服务","createTime":null,"updateTime":null,"content":null,"key":null,"price":"0","isSelect":null,"enname":null,"options":null},{"id":"C61A577DB5E8481599ADE32AF1E758E9","type":null,"needed":"false","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":0,"title":"办理卫生证书","description":"办理卫生证书","createTime":null,"updateTime":null,"content":null,"key":null,"price":"0","isSelect":null,"enname":null,"options":null},{"id":"19769760A7974D759C4FCC1C25A28216","type":null,"needed":"false","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":0,"title":"购买笼子","description":"购买笼子服务","createTime":null,"updateTime":null,"content":null,"key":null,"price":"0","isSelect":null,"enname":null,"options":null},{"id":"C39C2D417A214B478AE887E26842AE94","type":null,"needed":"false","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":0,"title":"办理卫生证书","description":"办理卫生证书","createTime":null,"updateTime":null,"content":null,"key":null,"price":"0","isSelect":null,"enname":null,"options":null},{"id":"D10A7AB87A8B4A07B808D9F60DDA49EE","type":null,"needed":"false","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":0,"title":"办理卫生证书","description":"办理卫生证书","createTime":null,"updateTime":null,"content":null,"key":null,"price":"0","isSelect":null,"enname":"Certificate of hygiene","options":null},{"id":"19CFA4625EA945B29A3D943EE5194C5F","type":null,"needed":"false","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":0,"title":"购买笼子","description":"购买笼子服务","createTime":null,"updateTime":null,"content":null,"key":null,"price":"0","isSelect":null,"enname":"Buy the cage","options":null},{"id":"901793EAA0FE4E1280DF71F6CBBD1F24","type":null,"needed":"false","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":11,"title":"新增英文服务","description":"英文服务","createTime":null,"updateTime":null,"content":null,"key":null,"price":"123","isSelect":null,"enname":"yingwenfuwu","options":null},{"id":"2FEFE070616040AE9143861E9B569BBA","type":null,"needed":"false","orderNo":"89316916A9044816BF1CB7DD616A0610","rank":11,"title":"新增英文服务","description":"英文服务","createTime":null,"updateTime":null,"content":null,"key":null,"price":"123","isSelect":null,"enname":"yingwenfuwu","options":null}];

          for (var i = 0; i < that.lists.length; i++) {
            if (that.lists[i].isSelect == 'true' || that.lists[i].needed == 'true') {
              that.allCost += parseInt(that.lists[i].price);
            }
          }
        })
      },
      goback() {
        this.$router.push({path: '/cwty/cwty_list/' + 'tab-container2'})
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
