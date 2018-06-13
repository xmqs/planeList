<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="./../../../static/img/Rectangle 18@2x.png" alt="">
          <div class="page_info">
            <p>进入四号口</p>
            <p>Enter the No. 4 mouth</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="./../../../static/img/Rectangle 18@2x.png" alt="">
          <div class="page_info">
            <p>查询值机柜台 领取登机牌托运行李</p>
            <p>Locating Your Check-in Counter</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="./../../../static/img/Rectangle 18@2x.png" alt="">
          <div class="page_info">
            <p>安全检查</p>
            <p>Safety Check</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="./../../../static/img/Rectangle 18@2x.png" alt="">
          <div class="page_info">
            <p>候机及登机</p>
            <p>Waiting for Boarding</p>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div id="wrapper" style="touch-action: none;">
      <div id="scroller" class="ignore">
        <div class="point pt1" :class="{'pta1':active==0}" @click="changePage(0)">
          <img src="./../../../static/img/point/point@1.png" alt="" width="50%" v-if="active!==0">
          <img src="./../../../static/img/point/pointActive@1.png" alt="" width="50%" v-if="active==0">
        </div>
        <div class="point pt2" :class="{'pta2':active==1}" @click="changePage(1)">
          <img src="./../../../static/img/point/point@2.png" alt="" width="50%" v-if="active!==1">
          <img src="./../../../static/img/point/pointActive@2.png" alt="" width="50%" v-if="active==1">
        </div>
        <div class="point pt3" :class="{'pta3':active==2}" @click="changePage(2)">
          <img src="./../../../static/img/point/point@3.png" alt="" width="50%" v-if="active!==2">
          <img src="./../../../static/img/point/pointActive@3.png" alt="" width="50%" v-if="active==2">
        </div>
        <div class="point pt4" :class="{'pta4':active==3}" @click="changePage(3)">
          <img src="./../../../static/img/point/point@4.png" alt="" width="50%" v-if="active!==3">
          <img src="./../../../static/img/point/pointActive@4.png" alt="" width="50%" v-if="active==3">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper"
  import "./../../../node_modules/swiper/dist/css/swiper.css"
  import zoom  from "./../../../node_modules/iscroll/build/iscroll-zoom"
    export default {
        name: "testScroll",
      data(){
          return{
            iScroll:{},
            swiper:{},
            active:0,
          }
      },
      mounted(){
        this.iScroll = new zoom('#wrapper',{
          zoom:true,
          scrollY: true,
          scrollX: true,
          mouseWheel: true,
          wheelAction: 'zoom'
        });

        this.swiper = new Swiper('.swiper-container', {
          autoplay: false,
          loop:false,
          pagination: {
            el: '.swiper-pagination',
          },
          on: {
            slideChangeTransitionEnd: ()=>{
              this.mapScroll(this.swiper.activeIndex);
            },
          },
        })
      },
      methods:{
        isPassive() {
          var supportsPassiveOption = false;
          try {
            addEventListener("test", null, Object.defineProperty({}, 'passive', {
              get: function () {
                supportsPassiveOption = true;
              }
            }));
          } catch(e) {}
          return supportsPassiveOption;
        },
        changePage(num){
          this.swiper.slideTo(num, 1000);
          this.active = num;
        },
        mapScroll(num){
          this.active = num;
          if (num == 0){
            this.iScroll.zoom(1.5);
            this.iScroll.scrollTo(-1350, 0, 400);
          }else if(num == 1){
            this.iScroll.zoom(1.5);
            this.iScroll.scrollTo(-1350, -30, 400);
          }else if(num == 2){
            this.iScroll.zoom(1.5);
            this.iScroll.scrollTo(-1340, -100, 400);
          }else if(num == 3){
            this.iScroll.zoom(1.5);
            this.iScroll.scrollTo(-1190, -207, 400);
          }
        }
      }
    }
</script>

<style scoped>


  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  html {
    -ms-touch-action: none;
  }

  body {
    font-size: 12px;
    font-family: ubuntu, helvetica, arial;
    overflow: hidden; /* this is important to prevent the whole page to bounce */
  }

  #wrapper {
    position: absolute;
    z-index: 1;
    top: 228px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    overflow: hidden;
  }

  #scroller {
    position: absolute;
    z-index: 1;
    width: 3766px;
    height: 1327px;
    background: url("./../../../static/img/planeMap.png") no-repeat;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
    text-size-adjust: none;
  }
  .swiper-slide{
    height: 228px;
    width: 100%;
    background: #FFF7EA;
  }
  .swiper-slide img{
    width: 260px;
    height: 178px;
    border: 10px solid #ffff;
    margin-top: 14px;
    margin-left: 34px;
  }
  .page_info{
    display: inline-block;
  }
  .point{
    position: absolute;
  }
  .pt1{
    left: 2032px;
    top: 320px;
  }
  .pt2{
    left: 2050px;
    top: 405px;
  }
  .pt3{
    left: 1996px;
    top: 500px;
  }
  .pt4{
    left: 1800px;
    top:620px;
  }

  .pta1{
    left: 2000px!important;
    top: 280px!important;
  }
  .pta2{
    left: 2020px!important;
    top: 360px!important;
  }
  .pta3{
    left: 1980px!important;
    top: 440px!important;
  }
  .pta4{
    left: 1780px!important;
    top: 580px!important;
  }
</style>
