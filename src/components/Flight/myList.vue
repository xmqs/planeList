<template>
  <div>
    <div class="changePage">
      <div  @click="changePage()">航班查询</div>
      <div class="page_active">我的关注</div>
    </div>

    <ul class="search_list">
      <li v-for="item in list">
        <div v-if='item.SLAVE_FLIGHT!==""'>
            <span  @click="toplaneDetail(item)">
              {{item.FlightIdentity}}
            </span>
          <span  @click="toplaneDetail(item)">
              {{direction=="D"?item.IATADestAirport:item.IATAOriginAirport}}
            </span>
          <span  @click="toplaneDetail(item)">
              {{item.EstimatedLandingTakeoffDateTime?item.EstimatedLandingTakeoffDateTime.slice(11,16):item.ScheduledLandingTakeoffDateTime.slice(11,16)}}
              <span v-if=!item.EstimatedLandingTakeoffDateTime  class="jicon">计</span>
            </span>
          <span  @click="toplaneDetail(item)">
              {{item.ActualLandingTakeoffDateTime?item.ActualLandingTakeoffDateTime.slice(11,16):"--"}}
            </span>
          <status @todetail="toplaneDetail(item)" :status="item.FlightStatus"></status>
          <span class="star">
                <img src="./../../../static/img/unfocus.png" alt="" v-if="!item.isFollow"  @click="changefocus(item.FlightIdentity)">
                <img  src="./../../../static/img/focus.png" alt="" v-if="item.isFollow"  @click="changeunfocus(item.FlightIdentity)">
              </span>
        </div>
        <div v-for="slave in item.SLAVE_FLIGHT" v-if=item.SLAVE_FLIGHT class="slave_plane">
            <span  @click="toplaneDetail(item)">
              {{slave.SlaveFlightIdentity}}
            </span>
          <span  @click="toplaneDetail(item)">
              {{direction=="D"?item.IATADestAirport:item.IATAOriginAirport}}
            </span>
          <span  @click="toplaneDetail(item)">
              {{item.EstimatedLandingTakeoffDateTime?item.EstimatedLandingTakeoffDateTime.slice(11,16):item.ScheduledLandingTakeoffDateTime.slice(11,16)}}
              <span v-if=!item.EstimatedLandingTakeoffDateTime class="jicon">计</span>
            </span>
          <span  @click="toplaneDetail(item)">
              {{item.ActualLandingTakeoffDateTime?item.ActualLandingTakeoffDateTime.slice(11,16):"--"}}
            </span>
          <status @todetail="toplaneDetail(item)" :status="item.FlightStatus"></status>
          <span class="share">
            共享
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from "axios";
  import flightStatus from './flightStatus'
  export default {
    name: "myList",
    data(){
      return{
        list:[],
      }
    },
    components:{
      'status':flightStatus
    },
    mounted(){
      axios.post('/eport-server/airFlight/getFollowFlightList.do',{
        userId:JSON.parse(sessionStorage.getItem('userifo')).idNumber
      }).then((response)=> {
        this.list = response.data.data.list;
      }).catch((error)=> {
        console.log(error)
      });
    },
    methods:{
      planeDetail(Plane){
        this.$router.push({name:'PlaneDetail', params: { Plane: Plane} })
      },
      toplaneDetail(res){
        this.$router.push({path:'/flight/planeDetail/'+res.FlightIdentity+'/'+res.FlightDirection+'/'+res.ServiceType});
      },
      changePage(){
        this.$router.replace({path:'/flight/destination'});
      },
      changefocus(num){
        axios.post('/eport-server/airFlight/followAirFlight.do',{
          flightIdentity:num,
          userId:JSON.parse(sessionStorage.getItem('userifo')).idNumber
        }).then((response)=> {
          for (let i = 0;i<this.list.length;i++){
            if(this.list[i].FlightIdentity == num){
              this.list[i].isFollow = true;
            }
          }
          console.log(response);
        }).catch((error)=> {
          console.log(error)
        });
      },
      changeunfocus(num){
        axios.post('/eport-server/airFlight/cancelFollowAirFlight.do',{
          flightIdentity:num,
          userId:JSON.parse(sessionStorage.getItem('userifo')).idNumber
        }).then((response)=> {
          for (let i = 0;i<this.list.length;i++){
            if(this.list[i].FlightIdentity == num){
              this.list[i].isFollow = false;
            }
          }
          console.log(response);
        }).catch((error)=> {
          console.log(error)
        });
      }
    },
  }
</script>

<style scoped>

  .changePage{
    position: fixed;
    z-index: 2000;
    top: 0;
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

  .Time{
    font-size:44px;
    font-family:PingFangSC-Light;
    color:rgba(51,51,51,1);
    line-height:44px;
  }
  changePage{
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
  .isServiceType{
    font-size:20px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    background: #285FB1;
    padding: 0 10px;
    border-radius: 4px;
    color: #fff;
    margin-left: 10px;
  }
  .focus img{
    width: 33px;
  }
  .focustatic{
    font-size:22px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    line-height:30px;
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
    height: 200px;
    padding-top: 21px;
    background: url("./../../../static/img/line.png") no-repeat;
    background-position: 516px center;
    background-size: 1px 120px;
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
    margin-top: 20px;
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
    font-size:44px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:44px;
    white-space: nowrap;
    max-width: 180px;
    overflow-x:scroll;
    overflow-y: hidden;
  }
  .planeTo{
    font-size:44px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:44px;
    white-space: nowrap;
    max-width: 180px;
    overflow-x:scroll;
    overflow-y: hidden;
  }
  .list_page{
    text-align: center;
  }
  .planeTS{
    text-align: center;
  }
  .planeTime{
    height:22px;
    font-size:22px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    line-height:22px;
    margin-bottom: 10px;
  }
  .planeStatic{
    width: 205px;
    height:52px;
    font-size:30px;
    font-family:PingFangSC-Regular;
    color:rgba(38,205,121,1);
    line-height:52px;
    background: url("./../../../static/img/plbg.png") center no-repeat;
    background-size: 205px;
  }
  .planeStatic2{
    width: 205px;
    height:52px;
    font-size:30px;
    font-family:PingFangSC-Regular;
    color:#FF8800;
    line-height:52px;
    background: url("./../../../static/img/ywbg.png") center no-repeat;
    background-size: 205px;
  }
  .planeStatic3{
    width: 205px;
    height:52px;
    font-size:30px;
    font-family:PingFangSC-Regular;
    color:#ccc;
    line-height:52px;
    background: url("./../../../static/img/nonePlane.png") center no-repeat;
    background-size: 205px;
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
  .focus{
    width: 168px;
    text-align: center;
  }

  .search_list{
    padding-top: 104px;
  }
  .search_list li div{
    height: 88px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
  }
  .search_list li span{
    display: inline-block;
    width: 120px;
    text-align: center;
    font-size:24px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .search_list li span.star{
    padding-top: 10px;
    width: 80px;
  }
  .search_list li span.share{
    width: 80px;
  }
  .search_list li span img{
    width: 34px;
  }
  .slave_plane{

  }
  .search_list li span{
    position: relative;
  }
  .search_list li span.jicon{
    width: 20px;
    height: 20px;
    display: inline-block;
    font-size: 10px;
    top: -12px;
    position: absolute;
  }

  .flight_th{
    height:88px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
    position: fixed;
    background: #fff;
    width: 100%;
    z-index: 2000;
  }
  .flight_th span{
    font-size:22px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    display: inline-block;
    width: 120px;
    text-align: center;
  }
  .flight_th span.star{
    width: 80px;
  }
</style>
