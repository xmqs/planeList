<template>
  <div id="pet_details">
    <!--头部临时用-->
    <!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 99;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
            物品清单
            <img @click="bad(packages)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
        </header> -->
    <!--内容-->
    <div id="soll" class="page-tab-container">
      <div v-show="add1" class="soll1">
        <div v-for="ele in packages" class="ele">
          <div class="ele1 name">{{ele.name}}</div>
          <div class="ele1 intp">数量：{{ele.count}}&nbsp;&nbsp;&nbsp;&nbsp;形式价格：{{ele.price}}&nbsp;&nbsp;&nbsp;&nbsp;箱号：{{ele.boxNo}}</div>
          <div class="ele1 intp">Number of items：{{ele.count}}，Formal price（¥）：{{ele.price}}，Carton no.{{ele.boxNo}}</div>
        </div>
      </div>
      <p v-show="add1" class="tips">友情提示：可以发送excel表格版本的物品清单至邮箱 27362829@163.com</p>
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
        add1: true,
        add2: false,
        name: '',
        count: '',
        price: '',
        boxNo: '',
        packages: [],
        ids: ''
      }
    },
    mounted() {
      this.packages = this.$route.params.list;
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
  #soll {
    position: fixed;
    width: 100%;
    overflow: auto;
    height: 100%;
    background: #F5F5F5;
  }

  .soll1, .add2 {
    background: #fff;
  }

  .ele:first-child {
    margin-top: 0;
  }

  .ele {
    margin: 7px 10px 0px 17px;
    border-bottom: 1px solid #efefef;
    position: relative;
    line-height: 53px;
    font-size: 30px;
    padding: 12px 0;
  }

  .tanhao {
    width: 28px;
    position: absolute;
    top: 17px;
    right: 3px;
  }

  .name {
    font-size: 32px;
    color: #333;
  }

  .intp {
    color: #9b9b9b;
    font-size: 28px;
  }

  .yuanjia {
    width: 20px;
  }

  .ele_1 {
    padding: 10px;
    font-size: 30px;
    color: #333;
  }

  .po_right {
    float: right;
    margin-top: 3px;
  }

  .tit {
    position: relative;
    top: -3px;
    left: 10px;
  }

  .tips {
    width: 90%;
    text-align: left;
    margin: 15px auto;
    color: #999;
    line-height: 45px;
    font-size: 27px;
  }

  /*新增*/
  .add2_ele {
    margin: 0px 10px;
    border-bottom: 1px solid #efefef;
    position: relative;
    height: 46px;
    line-height: 45px;
    font-size: 16px;
  }

  .add2_tit {
    color: #333;
  }

  .add2_inps {
    width: 60%;
    position: absolute;
    right: 7px;
    top: 8px;
    height: 30px;
    border: 0;
    outline: none;
    font-size: 16px;
    color: #777;
  }
</style>
