<template>
  <div>
    <div class="title_header">
      <div class="change_page" :class='{homeIn:$route.params.flight==0}'>
        <div :class='{active:pageShow==1}' @click="changepage(1)">
          <img v-if='pageShow==1' src="./../../../static/img/kazn/icon1_2.png" alt="">
          <img v-if='pageShow!==1' src="./../../../static/img/kazn/icon1.png" alt="">
          口岸单位
        </div>
        <div :class='{active:pageShow==3}' @click="changepage(3)">
          <img v-if='pageShow==3' src="./../../../static/img/kazn/icon3_2.png" alt="">
          <img v-if='pageShow!==3' src="./../../../static/img/kazn/icon3.png" alt="">
          港口码头
        </div>
        <div :class='{active:pageShow==2}' @click="changepage(2)">
          <img v-if='pageShow==2' src="./../../../static/img/kazn/icon2_2.png" alt="">
          <img v-if='pageShow!==2' src="./../../../static/img/kazn/icon2.png" alt="">
          特殊区域
        </div>
      </div>
    </div>
    <div id="wall">
      <div id="container">
      </div>
      <div class="detail">
        <div class="getUserLoc" @click="getUserLoc">
          <img src="./../../../static/img/position.png" alt="">
        </div>
        <div class="de_name" v-if="detail.unitName">{{detail.unitName}}<div @click="test()" class="tomove">导航</div></div>
        <div class="de_phone" v-if="detail.introduction">{{detail.introduction}}</div>
        <div class="de_detail" v-if="detail.phone">电话：{{detail.phone}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    name: "eportMap",
    data(){
      return{
        hasPosition:false,
        pageShow:1,
        map:{},
        PortUnit:[],
        SpecialArea:[],
        PortAirport:[],
        detail:{},
        lat:'',
        lon:'',
        userPosition:[],
        page:1,
      }
    },
    mounted() {

      //this.userPosition = sessionStorage.getItem("userPosition").split(",");


      this.map = new AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom:14, //初始化地图层级
        center:[118.802393,32.026761],
      });

      if(sessionStorage.getItem("userPosition")){
        this.userPosition = sessionStorage.getItem("userPosition").split(",");

        let userMark = new AMap.Marker({
          map: this.map,
          position: this.userPosition,
        });
        userMark.setAnimation('AMAP_ANIMATION_BOUNCE');
      }

      let that = this;
      this.map.on('zoomchange',function(e){
        that.map.clearMap();

        let userMark = new AMap.Marker({
          map: that.map,
          position: that.userPosition,
        });

        userMark.setAnimation('AMAP_ANIMATION_BOUNCE');
        if(parseInt(this.map.St.W.zoom)>10){
          if(that.page == 1){

            for(let i = 0;i<that.PortUnit.length;i++){
              let mark = new AMap.Marker({
                map: that.map,
                position: [parseFloat(that.PortUnit[i].longitude),parseFloat(that.PortUnit[i].latitude)],
                icon: new AMap.Icon({
                  size: new AMap.Size(23, 23),  //图标大小
                  image: "./../../../static/img/kazn/icon1_3.png",
                  imageOffset: new AMap.Pixel(0, 0),
                  imageSize:new AMap.Size(23, 23),
                }),
              });

              let content = that.PortUnit[i].description.unitName;

              mark.setLabel({
                offset: new AMap.Pixel(-content.length*5.5, -18),
                content: content
              });

              mark.on('click',(ev)=>{
                that.detail = that.PortUnit[i].description
                that.lat = that.PortUnit[i].latitude;
                that.lon = that.PortUnit[i].longitude;
              })
            }
          }
          if(that.page == 2){
            for(let i = 0;i<that.SpecialArea.length;i++){
              let mark = new AMap.Marker({
                map: that.map,
                position: [parseFloat(that.SpecialArea[i].longitude),parseFloat(that.SpecialArea[i].latitude)],
                icon: new AMap.Icon({
                  size: new AMap.Size(23, 23),  //图标大小
                  image: "./../../../static/img/kazn/icon2_3.png",
                  imageOffset: new AMap.Pixel(0, 0),
                  imageSize:new AMap.Size(23, 23),
                }),
              });

              let content = that.SpecialArea[i].description.unitName;

              mark.setLabel({
                offset: new AMap.Pixel(-content.length*5.5, -18),
                content: content
              });

              mark.on('click',(ev)=>{
                that.detail = that.SpecialArea[i].description;
                that.lat = that.PortUnit[i].latitude;
                that.lon = that.PortUnit[i].longitude;
              })
            }
          }
          if(that.page == 3){
            for(let i = 0;i<that.PortAirport.length;i++){

              let icon = '';
              if(that.PortAirport[i].mapFlag == "F1"){
                icon = "./../../../static/img/kazn/icon5_3.png";
              }
              if(that.PortAirport[i].mapFlag == "F2"){
                icon = "./../../../static/img/kazn/icon4_3.png";
              }
              if(that.PortAirport[i].mapFlag == "F3"){
                icon = "./../../../static/img/kazn/icon3_3.png";
              }

              let mark = new AMap.Marker({
                map: that.map,
                position: [parseFloat(that.PortAirport[i].longitude),parseFloat(that.PortAirport[i].latitude)],
                icon: new AMap.Icon({
                  size: new AMap.Size(23, 23),  //图标大小
                  image: icon,
                  imageOffset: new AMap.Pixel(0, 0),
                  imageSize:new AMap.Size(23, 23),
                }),
              });


              let content = that.PortAirport[i].description.unitName;

              mark.setLabel({
                offset: new AMap.Pixel(-content.length*5.5, -18),
                content: content
              });

              mark.on('click',(ev)=>{
                that.detail = that.PortAirport[i].description;
                that.lat = that.PortUnit[i].latitude;
                that.lon = that.PortUnit[i].longitude;
              })
            }
          }
        }else{
          if(that.page == 1){
            for(let i = 0;i<that.PortUnit.length;i++){
              let mark = new AMap.Marker({
                map: that.map,
                position: [parseFloat(that.PortUnit[i].longitude),parseFloat(that.PortUnit[i].latitude)],
                icon: new AMap.Icon({
                  size: new AMap.Size(23, 23),  //图标大小
                  image: "./../../../static/img/kazn/icon1_3.png",
                  imageOffset: new AMap.Pixel(0, 0),
                  imageSize:new AMap.Size(23, 23),
                }),
              });

              mark.on('click',(ev)=>{
                that.detail = that.PortUnit[i].description
                that.lat = that.PortUnit[i].latitude;
                that.lon = that.PortUnit[i].longitude;
              })
            }
          }
          if(that.page == 2){
            for(let i = 0;i<that.SpecialArea.length;i++){
              let mark = new AMap.Marker({
                map: that.map,
                position: [parseFloat(that.SpecialArea[i].longitude),parseFloat(that.SpecialArea[i].latitude)],
                icon: new AMap.Icon({
                  size: new AMap.Size(23, 23),  //图标大小
                  image: "./../../../static/img/kazn/icon2_3.png",
                  imageOffset: new AMap.Pixel(0, 0),
                  imageSize:new AMap.Size(23, 23),
                }),
              });

              mark.on('click',(ev)=>{
                that.detail = that.SpecialArea[i].description;
                that.lat = that.PortUnit[i].latitude;
                that.lon = that.PortUnit[i].longitude;
              })
            }
          }
          if(that.page == 3){
            for(let i = 0;i<that.PortAirport.length;i++){

              let icon = '';
              if(that.PortAirport[i].mapFlag == "F1"){
                icon = "./../../../static/img/kazn/icon5_3.png";
              }
              if(that.PortAirport[i].mapFlag == "F2"){
                icon = "./../../../static/img/kazn/icon4_3.png";
              }
              if(that.PortAirport[i].mapFlag == "F3"){
                icon = "./../../../static/img/kazn/icon3_3.png";
              }

              let mark = new AMap.Marker({
                map: that.map,
                position: [parseFloat(that.PortAirport[i].longitude),parseFloat(that.PortAirport[i].latitude)],
                icon: new AMap.Icon({
                  size: new AMap.Size(23, 23),  //图标大小
                  image: icon,
                  imageOffset: new AMap.Pixel(0, 0),
                  imageSize:new AMap.Size(23, 23),
                }),
              });

              mark.on('click',(ev)=>{
                that.detail = that.PortAirport[i].description;
                that.lat = that.PortUnit[i].latitude;
                that.lon = that.PortUnit[i].longitude;
              })
            }
          }
        }
      })



      axios.post('/eport-server/eportMap/getMaps.do').then((res)=>{
        this.PortUnit = res.data.data[0].PortUnit;
        this.SpecialArea = res.data.data[1].SpecialArea;
        this.PortAirport = res.data.data[2].PortAirport;



        for(let i = 0;i<this.PortUnit.length;i++){

          let mark = new AMap.Marker({
            map: this.map,
            position: [parseFloat(this.PortUnit[i].longitude),parseFloat(this.PortUnit[i].latitude)],
            icon: new AMap.Icon({
              size: new AMap.Size(23, 23),  //图标大小
              image: "./../../../static/img/kazn/icon1_3.png",
              imageOffset: new AMap.Pixel(0, 0),
              imageSize:new AMap.Size(23, 23),
            }),
          });

          let content = this.PortUnit[i].description.unitName;


          mark.setLabel({
            offset: new AMap.Pixel(-content.length*5.5, -18),
            content: content
          });

          mark.on('click',(ev)=>{
            this.detail = this.PortUnit[i].description;
            this.lat = this.PortUnit[i].latitude;
            this.lon = this.PortUnit[i].longitude;
          })
        }
      })
    },
    methods: {
      getUserLoc(){
        this.map.panTo(this.userPosition);
      },
      test(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if (isAndroid) {
          if(sessionStorage.getItem("haveAmap") == "false"){
            window.location.href = 'http://daohang.amap.com/index.php';
          }else{
            window.location.href = 'androidamap://navi?sourceApplication=amap&poiname='+this.detail.unitName+'&lat='+this.lat+'&lon='+this.lon+'&dev=1&style=2';
          }
        }
        if (isiOS) {
          window.location.href = 'iosamap://navi?sourceApplication=amap&poiname='+this.detail.unitName+'&lat='+this.lat+'&lon='+this.lon+'&dev=1&style=2';
        }

      },
      //选择模式
      changepage(id){
        this.showStation = false;
        this.pageShow = id;
        this.map.clearMap();
        this.detail = {};

        if(sessionStorage.getItem("userPosition")){

          let userMark = new AMap.Marker({
            map: this.map,
            position: this.userPosition,
          });

          userMark.setAnimation('AMAP_ANIMATION_BOUNCE');

        }

        this.page = id;
        if(id == 1){
          this.map.panTo([118.802393,32.026761]);
          for(let i = 0;i<this.PortUnit.length;i++){
            let mark = new AMap.Marker({
              map: this.map,
              position: [parseFloat(this.PortUnit[i].longitude),parseFloat(this.PortUnit[i].latitude)],
              icon: new AMap.Icon({
                size: new AMap.Size(23, 23),  //图标大小
                image: "./../../../static/img/kazn/icon1_3.png",
                imageOffset: new AMap.Pixel(0, 0),
                imageSize:new AMap.Size(23, 23),
              }),
            });

            let content = this.PortUnit[i].description.unitName;

            mark.setLabel({
              offset: new AMap.Pixel(-content.length*5.5, -18),
              content: content
            });

            mark.on('click',(ev)=>{
              this.detail = this.PortUnit[i].description
              this.lat = this.PortUnit[i].latitude;
              this.lon = this.PortUnit[i].longitude;
            })
          }
        }
        if(id == 2){
          this.map.panTo([119.068955,32.191783]);
          for(let i = 0;i<this.SpecialArea.length;i++){
            let mark = new AMap.Marker({
              map: this.map,
              position: [parseFloat(this.SpecialArea[i].longitude),parseFloat(this.SpecialArea[i].latitude)],
              icon: new AMap.Icon({
                size: new AMap.Size(23, 23),  //图标大小
                image: "./../../../static/img/kazn/icon2_3.png",
                imageOffset: new AMap.Pixel(0, 0),
                imageSize:new AMap.Size(23, 23),
              }),
            });

            let content = this.SpecialArea[i].description.unitName;

            mark.setLabel({
              offset: new AMap.Pixel(-content.length*5.5, -18),
              content: content
            });

            mark.on('click',(ev)=>{
              this.detail = this.SpecialArea[i].description;
              this.lat = this.PortUnit[i].latitude;
              this.lon = this.PortUnit[i].longitude;
            })
          }
        }
        if(id == 3){
          this.map.panTo([119.072946,32.200572]);
          for(let i = 0;i<this.PortAirport.length;i++){

            let icon = '';
            if(this.PortAirport[i].mapFlag == "F1"){
              icon = "./../../../static/img/kazn/icon5_3.png";
            }
            if(this.PortAirport[i].mapFlag == "F2"){
              icon = "./../../../static/img/kazn/icon4_3.png";
            }
            if(this.PortAirport[i].mapFlag == "F3"){
              icon = "./../../../static/img/kazn/icon3_3.png";
            }

            let mark = new AMap.Marker({
              map: this.map,
              position: [parseFloat(this.PortAirport[i].longitude),parseFloat(this.PortAirport[i].latitude)],
              icon: new AMap.Icon({
                size: new AMap.Size(23, 23),  //图标大小
                image: icon,
                imageOffset: new AMap.Pixel(0, 0),
                imageSize:new AMap.Size(23, 23),
              }),
            });

            let content = this.PortAirport[i].description.unitName;

            mark.setLabel({
              offset: new AMap.Pixel(-content.length*5.5, -18),
              content: content
            });

            mark.on('click',(ev)=>{
              this.detail = this.PortAirport[i].description;
              this.lat = this.PortUnit[i].latitude;
              this.lon = this.PortUnit[i].longitude;
            })
          }
        }
      },
    }
  }
</script>

<style scoped>
  #wall{
    width: 100%;
  }
  .detail{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    box-shadow: #ccc 0 0 10px;
    box-sizing: border-box;
    padding: 0 32px;
  }
  .getUserLoc{
    position: absolute;
    width: 100px;
    height: 100px;
    top: -130px;
    right: 4%;
    z-index: 200;
  }
  .getUserLoc img{
    width:100px;
    height: 100px;
  }
  .de_name{
    font-size:34px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:34px;
    display: flex;
    justify-content: space-between;
    padding: 20px 0 30px 0;
  }
  .tomove{
    white-space: nowrap;
    color: #18B4FE;
    margin-left: 16px;
  }
  .de_phone{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:33px;
    padding-bottom: 12px;
  }
  .de_detail{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:36px;
    margin-top: 14px;
    margin-bottom: 14px;
  }
  #panel2{
    width: 100%;
    display: block;
    background: #fff;
    padding-bottom: 88px;
  }
  #panel3{
    bottom: 0;
  }
  #panel{
    padding-top: 180px;
    width: 100%;
    height: 100%;
    position: fixed;
    background: #fff;
    overflow: scroll;
  }
  #driver{
    padding-top: 180px;
    width: 100%;
    height: 100%;
    position: fixed;
    background: #fff;
    overflow: scroll;
  }
  .station_show{
    padding-top: 180px;
    width: 100%;
    height: 100%;
    position: fixed;
    background: #fff;
    overflow: scroll;
    z-index:5000;
  }

  #container{
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .title_header{
    width: 750px;
    background: #285FB1;
    top: 0;
    z-index: 9999;
    position: fixed;
  }
  /*顶部切换分页样式*/
  .change_page{
    display: flex;
    height: 90px;
    justify-content: center;
    align-items: center;
  }
  .homeIn{
    padding-right: 100px;
  }
  .change_page img{
    display: inline;
    width: 28px;
    margin-right: 10px;
  }
  .change_page div{
    margin:0 20px ;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 190px;
    height: 52px;
    border-radius: 26px;
    text-align: center;
    line-height: 52px;
    font-size: 28px;
    font-family:PingFangSC-Regular;
    color:rgba(40,95,177,1);
    color: #fff;
  }

  .change_page div.active{
    width: 190px;
    height: 52px;
    background: #fff;
    border-radius: 26px;
    text-align: center;
    line-height: 52px;
    font-size: 28px;
    font-family:PingFangSC-Regular;
    color:rgba(40,95,177,1);
  }

  .homeIn div{
    margin:0 10px;
    width: 170px;
  }
  .homeIn div.active{
    width: 170px;
  }
  /*搜索框样式*/
  .search_page{
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search_page input{
    width:686px;
    height:60px;
    background:rgba(255,255,255,0.12) url("./../../../static/img/searchicon.png") no-repeat;
    background-size: 24px;
    background-position: 20px center;
    border-radius:10px;
    outline: 0;
    border:0;
    padding-left: 56px;
    font-size:28px;
    color: #fff;
    -webkit-user-select:auto!important;
  }
  input::-webkit-input-placeholder{
    color:#fff;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#fff;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#fff;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#fff;
  }
  .info{
    position: fixed;
    display: flex;
    width: 750px;
    background: #fff;
    overflow-y: scroll;
  }
  .plh{
    padding: 20px;
    text-align: center;
    width: 100%;
  }
  .line_page{
    width: 750px;
  }
  .line_title img{
    width: 27px;
    margin-left: 32px;
    margin-right: 20px;
  }
  .line_title{
    height: 88px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 32px;
  }
  .line_title img{
    position: relative;
    top: 4px;
  }
  .line_body{
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #eee;
    padding: 16px 0;
  }

  .lb1{
    width: 100px;
    display: inline-block;
    font-size:28px;
    text-align: center;
    margin-right: 60px;
  }
  .vline{
    width: 20px;
    display: inline-block;
    height: 100px;
    border-left:1px solid #D8D8D8 ;
  }
  .lb2{
    width: 460px;
    display: inline-block;
    margin-left: 20px;
  }
  .pointName{
    font-size:32px;
    font-family:PingFangSC-Medium;
    color:rgba(51,51,51,1);
    line-height:32px;
    margin-bottom: 20px;
  }
  .pointDetail{
    font-size:28px;
    font-family:PingFangSC-Medium;
    color:rgba(51,51,51,1);
    line-height:36px;
  }
  .checkAll{
    font-size:24px;
    font-family:PingFangSC-Regular;
    color:rgba(40,95,177,1);
    line-height:72px;
    text-align: center;
  }

  .stopPage{
    text-align: center;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
    z-index: 9999;
  }
  .stopPage ul{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px 0;
  }
  .stopPage ul li{
    width: 343px;
    border: 1px solid #285FB1;
    height: 58px;
    text-align: center;
    line-height: 58px;
  }
  .stopPage ul li:first-child{
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
  .stopPage ul li:last-child{
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
  .stopPage ul li.stopA{
    color: #fff;
    background: #285FB1;
  }


  #cjbc{
    color: #333!important;
    width: 100%;
    height: 100%;
    position: fixed;
    padding-top: 90px;
    background: #fff;
    overflow: scroll;
  }
  #cjbc ul li{
    border-bottom: 16px solid #eee;
    padding: 24px 32px;
    font-size: 22px;
  }
  #cjbc ul li div{
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .cjbc_title{
    font-size:32px;
    font-family:PingFangSC-Medium;
    color:rgba(51,51,51,1);
    line-height:32px;
    margin-right: 14px;
  }
  .cjbc_price{
    font-size:32px;
    font-family:PingFangSC-Medium;
    color:rgba(51,51,51,1);
    line-height:32px;
    float: right;
  }
  .cjbc_info{
    color: #999!important;
  }
  .showmap{
    position: fixed;
    bottom: 0;
    height:72px;
    background:rgba(255,255,255,1);
    font-size:24px;
    font-family:PingFangSC-Regular;
    color:rgba(40,95,177,1);
    line-height: 72px;
    border-top: 1px solid #eee;
    text-align: center;
    width: 100%;
  }
  .station_list{
    padding-bottom: 73px;
  }

  /*站点列表*/
  .station_list ul li{
    padding: 30px 30px 30px 80px;
    background: url("./../../../static/img/location_point.png") no-repeat;
    background-size: 24px;
    background-position: 32px center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  .station_list ul li span{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:48px;
    display: inline-block;
    max-width: 512px;
  }

  #stopDetail{
    position: fixed;
    bottom: 0;
    height: 88px;
    line-height: 88px;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    padding:0 32px;
    width: 100%;
    border-top: 6px solid #eee;
    background: #fff url("./../../../static/img/Shape.png") no-repeat 98%;
    z-index: 9998;
  }
  #switch_way{
    position: fixed;
    right: 0;
    margin: 0;
    width: 140px;
    border: 1px solid #fff;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-left: 12px;
    border-right: 0;
  }

</style>
<style>
  .amap-call{
    display: none;
  }
  .amap-lib-transfer{
    width: 750px;
  }
  .amap-lib-transfer .planTitle {
    border-top: 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 0px;
    padding: 20px;
  }
  .amap-lib-transfer{
    border: 0;
  }
  .amap-logo{
    z-index: -99;
  }
  .amap-copyright{
    z-index: -99;
  }
  .amap-sug-result{
    z-index: 11010;
  }
  .amap-lib-transfer .planTitle{
    background: #fff;
  }
  .amap-lib-transfer .planTitle ul{
    display: none!important;
  }
  .amap-lib-transfer .plan{
    margin: 0;
  }

  .amap-lib-transfer .plan dt:first-child{
    border-top: 0;
  }
  .amap-lib-driving{
    border: 0;
  }

  .amap-marker-label{
    border: 0;
    background: transparent;
    font-size:30px;
    font-weight: 500;
    color: #333;
    z-index: 50;
    text-shadow: 0 0 2px #4381D7;
  }
</style>
