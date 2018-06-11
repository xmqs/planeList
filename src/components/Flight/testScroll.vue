<template>
  <div>
    <div id="wrapper" style="touch-action: none;">
      <div id="scroller" class="ignore">
      </div>
    </div>
    <div>
      <button @click="test1">步骤一</button>
      <button @click="test2">步骤二</button>
      <button @click="test3">步骤三</button>
      <button @click="test4">步骤四</button>
    </div>
  </div>
</template>

<script>
  import IScroll from "iscroll"
  import zoom  from "./../../../node_modules/iscroll/build/iscroll-zoom"
    export default {
        name: "testScroll",
      data(){
          return{
            iScroll:{},
            zoom:2
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
        test1(){
          this.iScroll.zoom(1.5);
          this.iScroll.scrollTo(-1350, 0, 400);
        },
        test2(){
          this.iScroll.zoom(1.5);
          this.iScroll.scrollTo(-1350, -30, 400);
        },
        test3(){
          this.iScroll.zoom(1.5);
          this.iScroll.scrollTo(-1340, -100, 400);
        },
        test4(){
          this.iScroll.zoom(1.5);
          this.iScroll.scrollTo(-1190, -207, 400);
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
    top: 50px;
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
    background: url("./../../../static/img/GroupMap.png") no-repeat;
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
</style>
