<template>
  <div id="rate">
    <div id="ele">
      <div class="ele ele_1">
        <div class="ele1">
          <img style="width: 35px;height: 33px;margin: 12px 8px 4px 6px;" :src='cwzp'/>
        </div>
        <div style="margin-left:-7px;" class="ele1 ele1_1">
          综合评价
        </div>
        <div class="ele1 ele1_1">
          <el-rate
            :texts='arr'
            v-model="value3"
            change="score"
            show-text>
          </el-rate>
        </div>
      </div>
      <div class="ele rate">
        {{texts}}
      </div>
    </div>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css';
  import axios from "axios";
  export default {
    name: 'srwpallRate',
    data() {
      return {
        value3: null,
        arr:['非常差 Very poor', '差 Poor', '一般 General', '好 Good', '非常好 Very good'],
        texts:"",
        ids:"",
        cwzp:''
      }
    },
    methods: {
      getpetdetails(){
        var that = this;
        axios.get('/eport-server/delivery/luggage/queryOrderById.do', {
          params: {
            orderNo :this.ids
          }
        }).then(function(data) {
          that.cwzp = data.data.data.bigPackageList[0];
          that.texts = data.data.data.evaluation.detail;
          that.value3 = data.data.data.evaluation.score;
        })
      }
    },
    created: function() {
      this.ids = this.$route.params.id;
      this.getpetdetails();
    }
  }
</script>
<style scoped>
  *{
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
  #rate{

  }
  #ele{
    width: 100%;
    position: fixed;
    height: 100%;
    background: #F5F5F5;
  }
  .ele1{
    float: left;
  }
  .ele_1{
    height: 15.8vw;
    padding: 7px;
    background: #fff;
    padding-left: 3vw;
  }
  .ele1_1{
    font-size: 4.2vw;
    padding: 9px;
    margin-top: 3vw;
  }
  textarea{
    width: 100%;
    height: 48vw;
    resize: none;
    border: 0;
    border-top: 1px solid #ccc;
    padding: 1.933vw;
    font-size: 3.77vw;
  }
  .shenbao{
    border: 0;
    background: #285fb1;
    color: #fff;
    width: 90%;
    height: 11vw;
    font-size: 4.133vw;
    margin-left: 5%;
    margin-top: 14px;
  }
  .rate{
    background: #fff;
    padding: 16px 36px;
    border-top: 1px solid #f1f1f1;
  }
</style>
<style>
  .el-rate__icon {
    font-size: 5.7vw;
    margin-right: .8vw;
    color: #c0c4cc;
    transition: .3s;
  }
  .el-rate__text {
    font-size: 3.867vw;
    vertical-align: middle;
  }
  .mint-toast-text {
    font-size: 3.8vw !important;
  }
</style>

