<template>
  <div class="planeDetail">
    <div style="height: 45px;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 1.8rem;line-height: 45px;">
      <slot>
        {{this.$route.params.detail.FlightIdentity}}
      </slot>
      <span style="display: inline-block;width:10px;height: 16px;background: url('/static/img/Back.png') no-repeat;background-size:10px;position: absolute;left:15px;top: 50%;margin-top:-8px;" @click="headerBack"></span>
    </div>
    <div class="plane_main">
      <div class="ticket">
        <div class="ticket_header">
          <img src="./../../../static/img/com_icon.png" alt="">
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
              <p>经停站：{{this.$route.params.detail.IATAViaAirport}}</p>
            </div>
            <div class="page_from">
              <p>目的地</p>
              <p>{{this.$route.params.detail.IATADestAirport}}</p>
            </div>
          </div>
          <div class="ticket_body_page2">
            <div class="time1">
              航班日期：{{this.$route.params.detail.EstimatedLandingTakeoffDateTime.slice(0,11)}}
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
                <p>航站楼&nbsp;&nbsp;&nbsp;</p>
                <p>{{this.$route.params.detail.FlightTerminalID}}</p>
              </div>
              <div>
                <p>登机口&nbsp;&nbsp;&nbsp;</p>
                <p>{{this.$route.params.detail.GateID}}</p>
              </div>
              <div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p></p>
              </div>
            </div>
          </div>

          <div class="ticket_footer">
            <span>航班号{{this.$route.params.detail.FlightIdentity}}</span>
            <span>{{this.$route.params.detail.FlightStatus}}</span>
          </div>
        </div>
        <div class="ticket_btn">
          关注航班
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "planeDetail",
      methods:{
        headerBack(){
          this.$router.back(-1);
        }
      },
      mounted(){
        window.scrollTo(0,0);
      }
    }
</script>

<style scoped>
  .plane_main{
    background: linear-gradient(to bottom, #1F3661 0%,#233760 100%);
    padding-top: 90px;
    display: flex;
    display: -webkit-flex;
    justify-content:center;
  }
  .ticket{
    width: 98%;
    overflow: hidden;
  }
  .ticket_header{
    background: #fff;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    align-items:center;
    height: 8rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    position: relative;
    border-bottom: 1px dashed #ddd;
  }
  .radius_in_lb{
    display: block;
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    background:#1F3661;
    left: -1.5rem;
    bottom: -1.5rem;
  }
  .radius_in_rb{
    display: block;
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    background:#1F3661;
    right: -1.5rem;
    bottom: -1.5rem;
  }
  .ticket_header img{
    width: 1.4rem;
    margin-left: 6%;
    margin-right: 2%;
    line-height: 2rem;
  }
  .ticket_plane_name{
    font-size:1.8rem;
    color:rgba(51,51,51,1);
    line-height:4.67rem;
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
    margin-left: 10%;
    color: #333333;
  }
  .page_from:last-child{
    text-align: right;
    margin-right: 10%;
    color: #333333;
  }
  .page_from p:first-child{
    font-size:1.4rem;
  }
  .page_from p:last-child{
    font-size:3rem;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .page_bt{
    color: #333333;
    padding-top: 1.8rem;
    text-align: center;
    width: 40%;
    display: flex;
    display: -webkit-flex;
    align-items:center;
    flex-direction:column;
  }
  .page_bt img{
    height: 3.2rem;
    margin-bottom: 1rem;
  }
  .page_bt p{
    white-space: nowrap;
    text-overflow:ellipsis;
    text-align: center;
  }

  /*page2*/
  .ticket_body_page2{
    width: 94%;
    margin-left: 3%;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
  }
  .time1{
    color:#999999;
    line-height: 10rem;
    padding: 0 8%;
    font-size: 1.4rem;
  }

  /*time_list**/
  .time_list{
    padding: 0 8%;
    display: flex;
    display: -webkit-flex;
    height: 8rem;
    justify-content: space-between;
  }
  .time_list div{
    display: inline-block;
  }
  .time_list div p:first-child{
    font-size: 1.4rem;
    color: #999999;
  }
  .time_list div p:last-child{
    font-size:2rem;
    font-family:DINAlternate-Bold;
    color:rgba(51,51,51,1);
    line-height:2.67rem;
  }
  .ticket_footer{
    line-height: 6rem;
    padding:0 10%;
    font-size: 1.4rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
  .ticket_footer span:first-child{
    color: #333333;
  }
  .ticket_footer span:last-child{
    color: #26CD79;
  }
  .ticket_btn{
    width: 96%;
    line-height:4.67rem;
    background:rgba(40,95,177,1);
    border-radius: 0.33rem ;
    color: #fff;
    font-size: 1.4rem;
    margin-top: 1rem;
    text-align: center;
    margin-left: 2%;
    margin-bottom: 1rem;
  }
</style>
