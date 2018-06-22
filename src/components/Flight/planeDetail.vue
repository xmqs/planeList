<template>
  <div class="planeDetail">
    <div class="planetitle">
      <slot>
        {{this.$route.params.detail.FlightIdentity}}
      </slot>
      <span style="display: inline-block;width:10px;height: 16px;background: url('/static/img/Back.png') no-repeat;background-size:10px;position: absolute;left:15px;top: 50%;margin-top:-8px;" @click="headerBack"></span>
    </div>
    <div class="plane_main">
      <div class="ticket">
        <div class="ticket_header">
          <img :src='this.$route.params.detail.AirLineImg+"@3x.png"'>
          <span class="ticket_plane_name">{{this.$route.params.detail.AirlineIATACode}}</span>
          <div class="radius_in_lb"></div>
          <div class="radius_in_rb"></div>
        </div>

        <div class="ticket_body">
          <div class="ticket_body_page1">
            <div class="page_from">
              <p>出发地</p>
              <p>{{this.$route.params.detail.IATAOriginAirport}}</p>
            </div>
            <div class="page_bt">
              <img src="./../../../static/img/Fill.png" alt="">
              <p v-if="this.$route.params.detail.IATAViaAirport">经停站：{{this.$route.params.detail.IATAViaAirport}}</p>
            </div>
            <div class="page_from">
              <p>目的地</p>
              <p>{{this.$route.params.detail.IATADestAirport}}</p>
            </div>
          </div>
          <div class="ticket_body_page2">
            <div class="time1">
              航班日期：{{this.$route.params.detail.EstimatedLandingTakeoffDateTime?this.$route.params.detail.EstimatedLandingTakeoffDateTime.slice(0,11):'暂无'}}
            </div>
            <div class="time_list">
              <div>
                <p>实际起飞</p>
                <p v-if='this.$route.params.detail.ActualLandingTakeoffDateTime'>{{this.$route.params.detail.ActualLandingTakeoffDateTime.slice(11,16)}}</p>
                <p v-if='!this.$route.params.detail.ActualLandingTakeoffDateTime'>---</p>
              </div>
              <div>
                <p>预计起飞</p>
                <p v-if='this.$route.params.detail.EstimatedLandingTakeoffDateTime'>{{this.$route.params.detail.EstimatedLandingTakeoffDateTime.slice(11,16)}}</p>
                <p v-if='!this.$route.params.detail.EstimatedLandingTakeoffDateTime'>---</p>
              </div>
              <div>
                <p>计划起飞</p>
                <p v-if='this.$route.params.detail.ScheduledLandingTakeoffDateTime'>{{this.$route.params.detail.ScheduledLandingTakeoffDateTime.slice(11,16)}}</p>
                <p v-if='!this.$route.params.detail.ScheduledLandingTakeoffDateTime'>---</p>
              </div>
            </div>
            <div class="time_list">
              <div>
                <p>航站楼</p>
                <p>{{this.$route.params.detail.FlightTerminalID}}</p>
              </div>
              <div>
                <p>登机口</p>
                <p>{{this.$route.params.detail.GateID}}</p>
              </div>
              <div>
              </div>
            </div>
          </div>

          <div class="ticket_footer">
            <span>航班号{{this.$route.params.detail.FlightIdentity}}</span>

            <span class="pStatic" v-if="this.$route.params.detail.FlightStatus=='起飞'">起飞</span>
            <span class="pStatic" v-if="this.$route.params.detail.FlightStatus=='计划航班'">计划航班</span>
            <span class="pStatic2" v-if="this.$route.params.detail.FlightStatus=='降落'">降落</span>
            <span class="pStatic2" v-if="this.$route.params.detail.FlightStatus=='延误/计划航班'">延误/计划航班</span>
            <span class="pStatic2" v-if="this.$route.params.detail.FlightStatus=='航班结束'">航班结束</span>
            <span class="pStatic3" v-if="this.$route.params.detail.FlightStatus=='航班取消'">航班取消</span>

          </div>
        </div>

        <div class="overInfo">
          <div class="T1">
            <p class="p1">起飞机场</p>
            <p class="p2">南京禄口</p>
          </div>
          <div class="TS">
            <div>
              <img src="./../../../static/img/PageTP1.png" alt="">
              <p>机场交通</p>
            </div>
            <div @click="toplane">
              <img src="./../../../static/img/PageTP2.png" alt="">
              <p>登记路线</p>
            </div>
            <div @click="tohotel">
              <img src="./../../../static/img/PageTP3.png" alt="">
              <p>机场酒店</p>
            </div>
          </div>
        </div>
        <div class="ticket_btn" @click="switchFocus">{{this.$route.params.detail.isFollow?'取消关注':'关注航班'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import { Toast } from 'mint-ui';
    export default {
      name: "planeDetail",
      methods:{
        tohotel(){
          this.$router.push({name:'hotel'});
        },
        toplane(){
          let plane = "A";
          if(this.$route.params.detail.AirlineIsland){
            plane = this.$route.params.detail.AirlineIsland.slice(0,1);
          }
          this.$router.push({path:'/flight/testScroll'+plane});
        },
        headerBack(){
          this.$router.back(-1);
        },
        switchFocus(){
          this.$route.params.detail.isFollow =!this.$route.params.detail.isFollow;
          if(this.$route.params.detail.isFollow){
            this.changefocus(this.$route.params.detail.FlightIdentity);
          }else{
            this.changeunfocus(this.$route.params.detail.FlightIdentity);
          }
        },
        changefocus(num){
          axios.post('/eport-server/airFlight/followAirFlight.do',{
            flightIdentity:num,
            userId:JSON.parse(sessionStorage.getItem('userifo')).idNumber
          }).then((response)=> {
            Toast('关注成功');
          }).catch((error)=> {
            Toast('网络出错');
          });
        },
        changeunfocus(num){
          axios.post('/eport-server/airFlight/cancelFollowAirFlight.do',{
            flightIdentity:num,
            userId:JSON.parse(sessionStorage.getItem('userifo')).idNumber
          }).then((response)=> {
            Toast('已取消关注');
          }).catch((error)=> {
            Toast('网络出错');
          });
        }
      },
      mounted(){
        window.scrollTo(0,0);
      },
    }
</script>

<style scoped>
  .planetitle{
    height: 96px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 36px;
    line-height: 100px;
    z-index: 99;
    background: #1F3660;
  }
  .plane_main{
    background: linear-gradient(to bottom, #1F3661 0%,#233760 100%);
    padding-top: 100px;
    display: flex;
    display: -webkit-flex;
    justify-content:center;
    padding-bottom: 66px;
  }
  .ticket{
    width: 730px;
    overflow: hidden;
  }
  .ticket_header{
    background: #fff;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    align-items:center;
    height: 158px;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    position: relative;
    border-bottom: 1px dashed #ddd;
  }
  .radius_in_lb{
    display: block;
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background:#1F3661;
    left: -30px;
    bottom: -30px;
  }
  .radius_in_rb{
    display: block;
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background:#1F3661;
    right: -30px;
    bottom: -30px;
  }
  .ticket_header img{
    width: 1.4rem;
    margin-left: 50px;
    margin-right: 16px;
  }
  .ticket_plane_name{
    font-size:40px;
    font-family:PingFangSC-Medium;
    color:rgba(51,51,51,1);
    line-height:56px;
    font-weight: bold;
  }
  .ticket_body{
    background: #fff;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
  }

  .ticket_body_page1>div{
    display: inline-block;
  }

  .ticket_body_page1{
    display: flex;
    display: -webkit-flex;
    align-items:center;
    height: 10rem;
    justify-content: space-between;
  }
  .page_from{
    color: #333333;
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .page_from:first-child{
    margin-left: 80px;
    color: #333333;
  }
  .page_from:last-child{
    text-align: right;
    margin-right: 80px;
    color: #333333;
  }
  .page_from p:first-child{
    font-size:24px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:24px;
  }
  .page_from p:last-child{
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    font-size:52px;
    font-family:PingFangSC-Medium;
    color:rgba(51,51,51,1);
    line-height:54px;
    margin-top: 20px;
  }
  .page_bt{
    color: #333333;
    padding-top: 54px;
    text-align: center;
    width: 40%;
    display: flex;
    display: -webkit-flex;
    align-items:center;
    flex-direction:column;
  }
  .page_bt img{
    height: 88px;
    margin-bottom: 21px;
  }
  .page_bt p{
    white-space: nowrap;
    text-overflow:ellipsis;
    text-align: center;
  }

  /*page2*/
  .ticket_body_page2{
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
  }
  .time1{
    font-size:24px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    line-height:33px;
    margin-top: 60px;
    margin-left: 80px;
  }

  /*time_list**/
  .time_list{
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    margin-bottom: 60px;
    padding: 0 80px;
  }
  .time_list div{
    display: inline-block;
    width: 190px;
  }
  .time_list div:nth-child(2){
    text-align: center;
  }
  .time_list div:nth-child(3){
    text-align: right;
  }
  .time_list div p:first-child{
    font-size:22px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    line-height:22px;
  }
  .time_list div p:last-child{
    font-size:35px;
    font-family:DINAlternate-Bold;
    color:rgba(51,51,51,1);
    line-height:36px;
    margin-top: 20px;
  }
  .ticket_footer{
    padding: 60px 80px;
  }
  .ticket_footer span:first-child{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:32px;
  }
  .ticket_footer span:last-child{
    font-size:32px;
    font-family:PingFangSC-Medium;
    line-height:32px;
    float: right;
  }
  .pStatic{
    color: #26CD79;
  }
  .pStatic2{
    color: #FF8800;
  }
  .pStatic3{
    color: #ccc;
  }
  .ticket_btn{
    height:92px;
    background:rgba(40,95,177,1);
    border-radius:4px;
    color: #fff;
    text-align: center;
    line-height: 92px;
    margin-top: 40px;
    font-size:32px;
  }

  /*周边信息*/
  .overInfo{
    background: #fff;
    border-radius: .5rem;
    height: 380px;
    margin-top: 20px;
    padding:0 32px;
  }

  .T1{
    padding-top: 55px;
    border-bottom: 1px solid #EEEEEE;
    padding-bottom: 20px;
  }
  .T1 .p1{
    font-size:22px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .T1 .p2{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:32px;
    margin-top: 10px;
  }

  .TS{
    padding: 50px 40px;
    display:flex;
    justify-content: space-between;
  }
  .TS{
    text-align: center;
  }
  .TS img{
    width: 64px;
  }
  .TS p{
    font-size:22px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:22px;
    margin-top: 10px;
  }
</style>
