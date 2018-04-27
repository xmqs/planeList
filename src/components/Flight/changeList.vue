<template>
  <div>
  <nav-header>航班动态</nav-header>
  <ul class="change_list">
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
  </div>
</template>

<script>
  import NavHeader from "@/components/header/header"
    export default {
        name: "changeList",
      components:{
        NavHeader
      }
    }
</script>

<style scoped>

</style>
