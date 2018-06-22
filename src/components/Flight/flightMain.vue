<template>
  <div>
    <div class="header_page">
      <ul class="header_line_a">
        <li :class="{ active: countryType=='I' }" @click="SearchIoD('I')">国际</li>
        <li :class="{ active: countryType=='D' }" @click="SearchIoD('D')">国内</li>
        <li :class="{ active: serviceType=='C' }" @click="SearchC()">货机</li>
        <li @click="toDestination">查询</li>
      </ul>
      <ul class="header_line_b">
        <li :class="{ active: direction=='D' }" @click="SearchAod('D')">出港</li>
        <li :class="{ active: direction=='A' }" @click="SearchAod('A')">进港</li>
      </ul>
    </div>
    <div class="flight_th">
      <span>航班号</span>
      <span>{{direction=="D"?'目的地':'出发地'}}</span>
      <span>预计{{direction=="D"?'起飞':'降落'}}</span>
      <span>实际{{direction=="D"?'起飞':'降落'}}</span>
      <span>状态</span>
      <span class="star"></span>
    </div>
    <div id="soll">
      <mt-loadmore infinite-scroll-distance="1" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore">
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
              <span  @click="toplaneDetail(item)">
              {{item.FlightStatus}}
            </span>
              <span class="star" @click="changefocus(item.FlightIdentity)">
                <img src="./../../../static/img/unfocus.png" alt="" v-if="!item.isFollow">
                <img  src="./../../../static/img/focus.png" alt="" v-if="item.isFollow">
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
              <span  @click="toplaneDetail(item)">
              {{item.FlightStatus}}
            </span>
              <span class="star" @click="changefocus(slave.SlaveFlightIdentity)">
                <img src="./../../../static/img/unfocus.png" alt="" v-if="!item.isFollow">
                <img src="./../../../static/img/focus.png" alt="" v-if="item.isFollow">
              </span>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import { Loadmore,Toast } from 'mint-ui';
  import axios from "axios"
  export default {
    name: "flightMain",
    data() {
      return {
        list:[],
        prePage:0,
        rightPage:"",
        nextPage:0,
        totalSize:"",
        last_page:"",
        direction:"D",//A进港、D出港
        countryType:"I",//I国际、D国内
        serviceType:"P",//P客机、C货机

        allLoaded:false,
      }
    },
    component:{
      'v-loadmore':Loadmore
    },
    methods: {
      toDestination(){
        this.$router.push({name:'Destination'});
      },
      loadTop() {
        this.prePage--;
        if(this.prePage == 0){
          this.prePage = 1;
          Toast('没有更多数据了');
          this.$refs.loadmore.onTopLoaded();
          return;
        }
        axios.post('/eport-server/airFlight/getAirFlight.do',{
          "isFirst":"0",
          "countryType":this.countryType,
          "serviceType":this.serviceType,
          "direction":this.direction,
          "airportCode":"",
          "flightIdentity":"",
          "airlineCode":"",
          "pageSize":"20",
          "pageNumber":this.prePage
        }).then((response)=> {
          this.list = response.data.data.list.concat(this.list);
          setTimeout(() => {
            this.$refs.loadmore.onTopLoaded();
          }, 500);
        }).catch((error)=> {
          setTimeout(() => {
            this.$refs.loadmore.onTopLoaded();
          }, 500);
        });
      },
      loadBottom() {
        this.nextPage++;
        axios.post('/eport-server/airFlight/getAirFlight.do',{
          "isFirst":"0",
          "countryType":this.countryType,
          "serviceType":this.serviceType,
          "direction":this.direction,
          "airportCode":"",
          "flightIdentity":"",
          "airlineCode":"",
          "pageSize":"20",
          "pageNumber":this.nextPage
        }).then((response)=> {
          this.list = this.list.concat(response.data.data.list);
          if(response.data.data.list.length == 0){
            this.allLoaded = true;
          }
          setTimeout(() => {
            this.$refs.loadmore.onBottomLoaded();
          }, 500)
        }).catch((error)=> {
          setTimeout(() => {
            this.$refs.loadmore.onBottomLoaded();
          }, 500)
          console.log(error)
        });
      },
      toplaneDetail(res){
        this.$router.push({name:'PlaneDetail',params:{detail:res}});
      },
      SearchIoD(status){
        this.serviceType = "P";
        this.direction = "D";
        this.countryType = status;
        this.getAirFlight("1",this.countryType,this.serviceType,this.direction,"1","20");
      },
      SearchAod(status){
        this.direction = status;
        this.getAirFlight("1",this.countryType,this.serviceType,this.direction,"1","20");
      },
      SearchC(){
        this.serviceType = "C";
        this.direction = "D";
        this.countryType = "";
        this.getAirFlight("1",this.countryType,this.serviceType,this.direction,"1","20");
      },
      getAirFlight(isFirst,countryType,serviceType,direction,pageNumber,pageSize){
        this.list = [];
        this.allLoaded = false;
        axios.post('/eport-server/airFlight/getAirFlight.do',{
          "isFirst":isFirst,
          "countryType":countryType,
          "serviceType":serviceType,
          "direction":direction,
          "airportCode":"",
          "flightIdentity":"",
          "airlineCode":"",
          "pageSize":pageSize,
          "pageNumber":pageNumber
        }).then((response)=> {
          this.list = response.data.data.list;
          this.last_page = response.data.data.last_page;
          this.rightPage = this.prePage = this.nextPage = response.data.data.right_page;
          if(response.data.data.last_page == response.data.data.current_page){
            this.allLoaded = true;
          }
        }).catch((error)=> {
          console.log(error)
        });
      },
      changefocus(num){
        console.log(num);
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
    },
    mounted(){
      axios.post('/eport-server/airFlight/getAirFlight.do',{
        "isFirst":"1",
        "countryType":"I",
        "serviceType":"P",
        "direction":"D",
        "airportCode":"",
        "flightIdentity":"",
        "airlineCode":"",
        "pageSize":"20",
        "pageNumber":"1",
        userId:JSON.parse(sessionStorage.getItem('userifo')).idNumber,
      }).then((response)=> {
        this.list = response.data.data.list;
        this.last_page = response.data.data.last_page;
        this.rightPage = this.prePage = this.nextPage = response.data.data.right_page;
        if(response.data.data.last_page == response.data.data.current_page){
          this.allLoaded = true;
        }
      }).catch((error)=> {
        console.log(error)
      });
    }
  }
</script>

<style scoped>

  #soll{
    height: 1000px;
    overflow: scroll;
  }
  .header_page{
    border-bottom: 20px solid #f5f5f5;
  }
  .header_line_a{
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size:28px;
    border-bottom: 1px solid #eee;
    font-family:PingFangSC-Regular;
  }
  .header_line_a .active{
    color: #285FB1;
  }
  .header_line_b{
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .header_line_b li{
    width:238px;
    height:58px;
    background:rgba(245,245,245,1);
    border-radius:4px;
    text-align: center;
    line-height: 58px;
    border-bottom: 1px solid rgba(245,245,245,1);
    color: #999;
    font-size: 24px;
  }
  .header_line_b .active{
    color: #285FB1;
    background:rgba(40,95,177,0.1);
    border: 1px solid #285FB1;
  }

  .flight_th{
    height:88px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
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
  .search_list li span img{
    width: 34px;
  }
  .slave_plane{
    background:rgba(245,245,245,1);
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
</style>
