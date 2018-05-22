<template>
  <div>
    <div class="changePage">
      <div  @click="changePage()">按起落地</div>
      <div class="page_active">我的关注</div>
    </div>

  <ul class="Flight_list">
    <li @click="planeDetail('AQ1039')">
      <div class="list_header">
        <img src="./../../../static/img/com_icon.png">
        <span class="company">中国国际航空</span>
        <span class="planeNum">AQ1039</span>
      </div>
      <div class="list_body">
        <div class="list_page">
          <img src="./../../../static/img/up.png" alt="" class="plane_up">
          <div class="planeFrom">南京</div>
        </div>
        <div class="planeTime">预计07:55起飞</div>
        <div class="list_page">
          <div class="planeTo">深圳</div>
          <img src="./../../../static/img/down.png" alt="" class="plane_down">
        </div>
        <div class="planeStatus yw">延误</div>
      </div>
    </li>
    <li>
      <div class="list_header">
        <img src="./../../../static/img/com_icon.png">
        <span class="company">中国国际航空</span><span class="planeNum">AQ1039</span>
      </div>
      <div class="list_body">
        <div class="list_page">
          <img src="./../../../static/img/up.png" alt="" class="plane_up">
          <div class="planeFrom">南京</div>
        </div>
        <div class="planeTime">预计07:55起飞</div>
        <div class="list_page">
          <div class="planeTo">深圳</div>
          <img src="./../../../static/img/down.png" alt="" class="plane_down">
        </div>
        <div class="planeStatus zc">起飞</div>
      </div>
    </li>
    <li>
      <div class="list_header">
        <img src="./../../../static/img/com_icon.png">
        <span class="company">中国国际航空</span>
        <span class="planeNum">AQ1039</span>
      </div>
      <div class="list_body">
        <div class="list_page">
          <img src="./../../../static/img/up.png" alt="" class="plane_up">
          <div class="planeFrom">南京</div>
        </div>
        <div class="planeTime">预计07:55起飞</div>
        <div class="list_page">
          <div class="planeTo">深圳</div>
          <img src="./../../../static/img/down.png" alt="" class="plane_down">
        </div>
        <div class="planeStatus zc">起飞</div>
      </div>
    </li>
    <li>
      <div class="list_header">
        <img src="./../../../static/img/com_icon.png">
        <span class="company">中国国际航空</span><span class="planeNum">AQ1039</span>
      </div>
      <div class="list_body">
        <div class="list_page">
          <img src="./../../../static/img/up.png" alt="" class="plane_up">
          <div class="planeFrom">南京</div>
        </div>
        <div class="planeTime">预计07:55起飞</div>
        <div class="list_page">
          <div class="planeTo">深圳</div>
          <img src="./../../../static/img/down.png" alt="" class="plane_down">
        </div>
        <div class="planeStatus zc">起飞</div>
      </div>
    </li>
  </ul>
  </div>
</template>

<script>
    export default {
        name: "myList",
      methods:{
        planeDetail(Plane){
          this.$router.push({name:'PlaneDetail', params: { Plane: Plane} })
        },
        changePage(){
          this.$router.replace({path:'/flight/destination'});
        }
      }
    }
</script>

<style scoped>

  .changePage{
    text-align: center;
    width: 100%;
    border-bottom:1px solid #EEEEEE ;
    background: #fff;
  }
  .changePage div{
    float: left;
    text-align: center;
    width: 50%;
    font-size:32px;
    border-bottom: 5px solid #fff;
    line-height: 100px;
    color: #333;
  }
  .changePage div.page_active{
    color: #285FB1;
    border-bottom: 5px solid #285FB1;
  }
  .changePage::after{
    content: "";
    clear: both;
    display: table;
  }
  .Flight_list{
    padding: 0 32px;
  }
  .Flight_list li{
    border-bottom: 1px solid #f6f6f6;
    height: 160px;
    padding-top: 15px;
  }
  /**列表头部*/
  .list_header{
    display:flex;
    display: -webkit-flex;
    align-items:center;
  }
  .list_header img{
    height:24px;
    display: inline-block;
    margin-right: 10px;
  }
  .company{
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    line-height:33px;
  }
  .planeNum{
    font-size:24px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:33px;
    margin-left: 10px;
  }
  /*列表主体*/
  .list_body{
    display: flex;
    display: -webkit-flex;
    align-items:center;
    justify-content:space-between;
    margin-top: 30px;
  }
  .plane_up{
    width: 28px;
    margin-right:21px;
  }
  .plane_down{
    width: 26px;
    margin-left: 20px;
  }
  .planeFrom{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:45px;
  }
  .planeTo{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:45px;
  }
  .list_page{
    display: flex;
    display: -webkit-flex;
    align-items:center;
  }
  .planeTime{
    font-size:22px;
    color:rgba(51,51,51,1);
    padding:0 20px 8px 20px;
    background: url("./../../../static/img/line_to.png") bottom no-repeat;
    background-size: 100%;
  }
  .planeStatus{
    font-size:1.47rem;
    line-height:2.4rem;
  }
  .yw{
    color:rgba(255,136,0,1);
  }
  .zc{
    color:rgba(38,205,121,1);
  }
</style>
