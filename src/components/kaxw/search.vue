<template>
  <div id="search_home">
    <!--模拟的标题-->
    <div class="header">
      <div id="" class="flex-box">
        <div class="flex-item item-input-wrapper">
          <img @click="searchs" class="search-icon" src="../../../static/img/Fill1.png"/>
          <form @submit.prevent="formSubmit" action="javascript:return true">
            <input type="search" placeholder="请输入搜索关键词" @keyup.13="searchs()" v-on:blur="changeCount(cons)" v-model="cons">
          </form>
        </div>
      </div>
    </div>
    <!--滑动区域-->
    <div v-show="others" id="mescroll" class="mescroll">
      <div class="bgWhite" style="margin-bottom:10px;padding-top: 2vw !important;">
        <p class="search-title">
          <img style="height: 14px;" src="../../../static/img/Group.png"/>
          历史记录
          <span class="edit_over" id="edit_over">完成</span>
          <span @click="isDel = !isDel" id="delects_box" class="delect_history"></span>
        </p>

        <ul class="search-words clearfix" id="search-words">
          <li style="height: 20px;line-height: 20px;" v-for="(item,index) in page_local" class="ui-col ui-col-50 delect-item">
            <div style="width: 80%;white-space: nowrap;text-overflow:ellipsis;overflow:hidden;" @click="search_cons(item)">{{item}}</div><i v-if="isDel" @click="deletejilu(index)" class="delect-icon" style="display: inline;"></i>
          </li>
        </ul>
      </div>
      <!--描述：热门新闻-->
      <div style="border-top: 7px solid #f5f5f5;" v-show="others" class="bgWhite">
        <p class="hot-title"><img style="height: 14px;" src="../../../static/img/Fill11.png"/>&nbsp;热门新闻 </p>
        <ul class="hot-words clearfix">
          <li v-for="item in remen" @click="search_cons(item.sourceLabel)" class="ui-col ui-col-50">{{item.sourceLabel}}</li>
        </ul>
      </div>
    </div>

    <div v-show="others1" id="sertch-con" class="sertch-con">
      <ul id="dataList" class="data-list">
        <li v-for="item in pageList" class="infors">
          <router-link :to="{path: '/kaxw/kaxw_details/'+item.sourceId +'/'+ 'news_tuijian'}">
            <p class="pd-name">{{item.sourceLabel}}</p>
            <!--<img class="pd-img" src=""/>-->
            <p class="pd-time">{{item.createTime | formatDate}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { Toast } from 'mint-ui'
  import { formatDate } from '../../assets/js/date.js';
  export default {
    name: "search",
    data() {
      return {
        searchCondition:{  //分页属性
          keyword:"",
          pageNo:"",
          pageSize:""
        },
        remenCondition:{  //热门属性
          channelAlias:"news_tuijian",
          pageNo:'',
          pageSize:12
        },
        localStorages:"",
        page_local:[],
        cons:"",
        pageList:[],
        others : true,
        others1 : false,
        remen:[],
        isDel:false,
        searcharr:0,
      }
    },
    methods: {
      backlist(){
        this.$router.push({path:'kaxw_list/'+'news_tuijian/0'})
      },
      forSubmit () {
        return false;
      },
      deletejilu: function(res) {
        this.page_local.splice(res,1);
        this.searcharr = 0;
        localStorage.removeItem("search");
        localStorage.setItem("search",this.page_local);
      },
      search_cons: function(con) {
        var _that = this;
        if (con != "") {
          _that.searchCondition.keyword = con;
          axios.get('/web-editor-web/webpage/search.do?', {
            params: _that.searchCondition
          }).then(function(res) {
            _that.pageList = [];
            _that.others = false;
            _that.others1 = true;
            if(res.data.data != undefined){
              for(var j = 0; j < res.data.data.length; j++) {
                _that.pageList.push(res.data.data[j])
              }
            }else{
              Toast('暂无内容...')
            }
            _that.page_local.push(_that.cons);
            localStorage.removeItem("search");
            localStorage.setItem("search",_that.page_local);
          })
          .catch(function(err){
            Toast('网络出错')
          });
        }
      },
      //获取搜索列表信息
      searchs: function() {
        var _that = this;
        if (_that.cons != "") {
          _that.searchCondition.keyword = _that.cons;
          axios.get('/web-editor-web/webpage/search.do?', {
            params: _that.searchCondition
          }).then(function(res) {
            _that.pageList = [];
            _that.others = false;
            _that.others1 = true;
            if(res.data.data != undefined){
              for(var j = 0; j < res.data.data.length; j++) {
                _that.pageList.push(res.data.data[j])
              }
            }else{
              Toast('暂无内容...')
            }
            _that.page_local.push(_that.cons);
            localStorage.removeItem("search");
            localStorage.setItem("search",_that.page_local);
            console.log(localStorage.getItem("search"))
          })
          .catch(function(err){
            Toast('网络出错')
          });
        }
      },
      changeCount: function(value) {
        if(value != ""){
          this.others = false;
          this.others1 = true;
        }else{
          this.others = true;
          this.others1 = false;
        }
      },
      getlist:function(){
        // 查询数据
        var _that = this;
        axios.get('/web-editor-web/channel/list.do?', {
          params: _that.remenCondition
        }).then(function(res) {
          for(var j = 0; j < res.data.data.length; j++) {
            _that.remen.push(res.data.data[j])
          }
        })
        .catch(function(err){
          Toast('网络出错')
        });
      }
    },
    mounted() {
    },
    created: function() {
      var cons = localStorage.getItem("search");
      if (cons != null) {
        this.page_local = cons.split(',');
        var arr1 = this.page_local;
        var result = [];
        for(var i = 0; i < arr1.length; i++){
          for(var j = i + 1; j < arr1.length; j++){
            if(arr1[i] == arr1[j]){
              j = ++i;
            }
          }
          result.push(arr1[i]);
        }
        this.page_local = result;
        if(this.page_local[0].length == 0){
          this.page_local.splice(0,1);
        }
      }

      this.getlist();
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    }
  }
</script>

<style scoped>

  *{
    -webkit-overflow-scrolling: touch;
  }
  /*模拟的标题*/
  body{
    background-color: #F0F0F0;
  }
  [contenteditable = "true"], input, textarea {
    -webkit-user- select: auto!important;
    -khtml-user-select: auto!important;
    -moz-user-select: auto!important;
    -ms-user-select: auto!important;
    -o-user-select: auto!important;
    user-select: auto!important;
    -webkit-appearance: none;
  }
  .header {
    z-index: 9990;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    line-height: 85px;
    text-align: center;
    background-color: #f5f5f5;
  }
  .header .flex-box{
    display: flex;
  }

  .item-input-wrapper{
    flex: 1;
    position: relative;
    top: 2px;
  }
  .search-icon{
    display: inline-block;
    position: absolute;
    width: 28px;
    height: 28px;
    top:50%;
    margin-top: -1.2vw;
    left: 5vw;
  }
  .item-nosearch{
    flex:0 0 32px;
  }
  .header input {
    padding-left: 8.2vw;
    width:calc( 100% - 34px );
    font-size: 3.733vw;
    color: #999999;
    height:60px;
    line-height:60px;
    border: 1px solid #fff;
    border-radius:30px;
    outline: none;
    vertical-align: middle;
    margin-top: 5px;
  }

  .header .btn-right {
    margin: 0 2.133vw 0 0;
    color: #285fb1;
    font-size: 3.413vw;
    font-size: 1.1rem;
    margin-top: 3.4vw;
    white-space: nowrap;
  }


  /*历史搜索*/

  .search-title{
    padding: 1.333vw 2.667vw 4vw 3.067vw !important;
    position: relative;
    font-size:30px;
    font-family:PingFangSC-Medium;
    color:rgba(51,51,51,1);
  }
  .hot-title{
    padding: 4.333vw 2.667vw 4vw 3.067vw !important;
    position: relative;
    font-size:30px;
    font-family:PingFangSC-Medium;
    color:rgba(51,51,51,1);
  }
  .search-title:before,.hot-title:before{
    display: inline-block;
    content: "";
    height: 15px;
    margin-right:12px;
    vertical-align: middle;
    margin-top:-2px;

  }

  /*删除按钮*/
  .delect_history{
    position: absolute;
    width: 32px;
    height: 34px;
    background: url(../../../static/img/Group2.png) no-repeat;
    right:15px;
    top: 50%;
    margin-top: -7px;
  }
  .edit_over{/*编辑完成*/
    display: none;
    position: absolute;
    right: 15px;
    color: #999999;
    font-size: 1.2rem;
    top: 50%;
    margin-top: -8px;
  }

  .hot-title:before{
  }
  .search-title:before{
  }



  .delect-item{
    position: relative;
  }



  .delect-icon{
    position: absolute;
    width:19px;
    height:19px;
    right: 18px;
    top: 50%;
    margin-top: -8.5px;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
    background: url(../../../static/img/delect-item.png) no-repeat;

  }
  .ui-col {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ui-col-50 {
    width:50%
  }
  .search-words,.hot-words{
    width: 100%;
  }
  .search-words{
    max-height: 140px;
    min-height: 35px;
  }
  .search-words li,.hot-words li{
    padding-left:36px;
    padding-right:20px;
    margin-bottom:25px;
    line-height: 30px;
    height:50px;
    font-size:30px;
    font-family:PingFangSC;
    color:#333;
    line-height:50px;
  }
  .search-words li:nth-of-type(odd){
    border-right: 1px solid #dddddd;
  }
  .hot-words li:nth-of-type(odd){
    border-right: 1px solid #dddddd;
  }

  /*mescroll 滚动区域*/

  .mescroll {
    position: fixed;
    top: 104px;
    bottom: 0;
    height: auto;
  }


  /*搜索结果*/

  .data-list li {
    position: relative;
    padding: 20px 26px 20px 28px;
    border-bottom: 1px solid #eee;
    font-size:30px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .data-list{
    margin-top: 90px;
  }
  .data-list .pd-img {
    position: absolute;
    left: 18px;
    top: 4px;
    width: 80px;
    height: 80px;
  }
  .pd-time{
    font-size:25px;
    margin-top: 10px;
    color: #929292;
  }
  .data-list .pd-name {
    line-height: 40px;
    height: 40px;
    margin-top: 10px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .data-list .pd-price {
    margin-top: 8px;
    color: red;
  }

  .data-list .pd-sold {
    font-size: 12px;
    margin-top: 8px;
    color: gray;
  }
  /*回到顶部按钮*/
  .mescroll-totop {
    font-size: 12px;
    line-height: 10px;
    background-color: white;
    border: 1px solid gray;
    text-align: center;
  }

  .mescroll-totop p {
    padding-top: 6px;
    color: #666;
  }
  .mescroll {
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
    overflow-y: auto;
  }

</style>
