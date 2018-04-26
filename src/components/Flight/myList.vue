<template>
  <ul class="Flight_list">
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
</template>

<script>
    export default {
        name: "myList"
    }
</script>

<style scoped>
  .Flight_list li{
    border-bottom: 1px solid #EEEEEE;
    padding-bottom: .4rem;
  }
  /**列表头部*/
  .list_header{
    display:flex;
    display: -webkit-flex;
    align-items:center;
    height: 3rem;
  }
  .list_header img{
    height:1.2rem;
    display: inline-block;
    margin-right: .4rem;
  }
  .company{
    font-size:1.4rem;
    color:rgba(153,153,153,1);
    line-height: 1.6rem;
    margin-right: .6rem;
  }
  .planeNum{
    font-size:1.4rem;
    color:rgba(51,51,51,1);
    line-height: 1.6rem;
  }
  /*列表主体*/
  .list_body{
    display: flex;
    display: -webkit-flex;
    align-items:center;
    justify-content:space-between;
    padding: .4rem 0;
  }
  .plane_up{
    width: 1.4rem;
    margin-right: 1rem;
  }
  .plane_down{
    width: 1.4rem;
    margin-left: 1rem;
  }
  .planeFrom{
    font-size:1.47rem;
    color:rgba(51,51,51,1);
    line-height:2.4rem;
  }
  .planeTo{
    font-size:1.47rem;
    color:rgba(51,51,51,1);
    line-height:2.4rem;
  }
  .list_page{
    display: flex;
    display: -webkit-flex;
    align-items:center;
  }
  .planeTime{
    font-size:1.2rem;
    color:rgba(51,51,51,1);
    padding-bottom: .6rem;
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
