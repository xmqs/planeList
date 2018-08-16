<template>
  <div>
    <div class="SearchAod">
      <div @click="rightIcon" v-if="!showAoD">
        <img src="./../../../static/img/in.png" alt="" v-if="direction=='A'">
        <img src="./../../../static/img/out.png" alt=""  v-if="direction=='D'">
      </div>
      <span v-if="showAoD" @click="SearchAod('D')">出港</span>
      <span v-if="showAoD" @click="SearchAod('A')">进港</span>
    </div>
    <div class="header_page">
      <ul class="header_line_b">
        <div class="search" @click="toDestination">
          <img src="../../../../static/img/Fill1.png" alt="">
          航班查询
        </div>
      </ul>
      <ul class="header_line_a">
        <li :class="{ active: countryType=='I' }" @click="SearchIoD('I')">国际</li>
        <li :class="{ active: countryType=='D' }" @click="SearchIoD('D')">国内</li>
        <li :class="{ active: serviceType=='C' }" @click="SearchC()">货机</li>
        <li @click="toDestination">查询</li>
      </ul>
    </div>
    <div id="wall">
      <div id="scoll">
        <mt-loadmore infinite-scroll-distance="1" :top-method="loadTop" :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <ul class="search_list">
            <li v-for="item in list">
              <div>
                <div class="itemHeader">
                  <img :src='item.AirLineImg+"@3x.png"'>
                  <span>{{item.AirlineIATACode}}</span>
                  <span class="FlightIdentity">{{item.FlightIdentity}}</span>
                </div>
                <div class="SLAVE_FLIGHT">
                  <span v-for="sf in item.SLAVE_FLIGHT">{{sf.SlaveFlightIdentity}}</span>
                </div>
                <div class="itemBody">
                  <div class="mask_wall">
                    <span class="Airport">{{item.IATAOriginAirport}}</span>
                    <div class="mask"></div>
                  </div>
                  <div class="timeList">
                    <span @todetail="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='起飞'">{{item.FlightStatus}}</span>
                    <span @todetail="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='计划航班'">{{item.FlightStatus}}</span>
                    <span @todetail="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='前站起飞'">{{item.FlightStatus}}</span>
                    <span @todetail="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='降落'">{{item.FlightStatus}}</span>
                    <span @todetail="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='延误'">{{item.FlightStatus}}</span>
                    <span @todetail="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='航班结束'">{{item.FlightStatus}}</span>
                    <span @todetail="toplaneDetail(item)" class="pStatic3" v-if="item.FlightStatus=='航班取消'">{{item.FlightStatus}}</span>
                    <span @todetail="toplaneDetail(item)" class="pStatic3" v-if="item.FlightStatus==''">{{item.FlightStatus}}</span>

                    <span class="time_line">{{item.ActualLandingTakeoffDateTime?item.ActualLandingTakeoffDateTime.slice(11,16):"--"}}{{direction=="D"?'降落':'起飞'}}</span>
                  </div>
                  <div class="mask_wall">
                    <span class="Airport">{{item.IATADestAirport}}</span>
                    <div class="mask"></div>
                  </div>
                  <div class="line"></div>
                  <div class="star">
                    <img src="./../../../static/img/unfocus.png" alt="" v-if=!item.isFollow
                         @click="changefocus(item.FlightIdentity)">
                    <img src="./../../../static/img/focus.png" alt="" v-if=item.isFollow
                         @click="changeunfocus(item.FlightIdentity)">
                    <div v-if=!item.isFollow>关注</div>
                    <div v-if=item.isFollow>已关注</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
  import {Loadmore, Toast} from 'mint-ui';
  import axios from "axios"
  import Bus from './bus.js'
  import flightStatus from './flightStatus'

  export default {
    name: "flightMainNew",
    data() {
      return {
        list: [],
        isfirst: true,
        prePage: 0,
        rightPage: "",
        nextPage: 0,
        totalSize: "",
        last_page: "",
        direction: "D",//A进港、D出港
        countryType: "I",//I国际、D国内
        serviceType: "P",//P客机、C货机
        allLoaded: false,
        showAoD:false,
      }
    },
    components: {
      'v-loadmore': Loadmore,
      'status': flightStatus
    },
    methods: {
      rightIcon(){
        this.showAoD = true;
      },
      toDestination() {
        this.$router.push({name: 'Destination'});
      },
      loadTop() {
        this.prePage--;
        if (this.prePage < 1) {
          Toast('没有更多数据了');
          this.$refs.loadmore.onTopLoaded();
          return;
        }
        axios.post('/eport-server/airFlight/getAirFlight.do', {
          "isFirst": "0",
          "countryType": this.countryType,
          "serviceType": this.serviceType,
          "direction": this.direction,
          "airportCode": "",
          "flightIdentity": "",
          "airlineCode": "",
          "pageSize": "10",
          "pageNumber": this.prePage,
          /*TODO 用户信息*/
          "userId":sessionStorage.getItem('isGuest')=='no'?JSON.parse(sessionStorage.getItem('userifo')).idNumber:'',
        }).then((response) => {
          this.list = response.data.data.list.concat(this.list);
          setTimeout(() => {
            this.$refs.loadmore.onTopLoaded();
          }, 500);
        }).catch((error) => {
          setTimeout(() => {
            this.$refs.loadmore.onTopLoaded();
          }, 500);
        });
      },
      loadBottom() {
        this.nextPage++;
        axios.post('/eport-server/airFlight/getAirFlight.do', {
          "isFirst": this.isfirst ? "1" : "0",
          "countryType": this.countryType,
          "serviceType": this.serviceType,
          "direction": this.direction,
          "airportCode": "",
          "flightIdentity": "",
          "airlineCode": "",
          "pageSize": "10",
          "pageNumber": this.nextPage,
          /*TODO 用户信息*/
          "userId":sessionStorage.getItem('isGuest')=='no'?JSON.parse(sessionStorage.getItem('userifo')).idNumber:'',
        }).then((response) => {
          if (this.isfirst) {
            this.list = response.data.data.list;
          } else {
            this.list = this.list.concat(response.data.data.list);
            if (response.data.data.list.length == 0) {
              this.allLoaded = true;
            }
          }
          this.isfirst = false;
          setTimeout(() => {
            this.$refs.loadmore.onBottomLoaded();
          }, 500)
        }).catch((error) => {
          setTimeout(() => {
            this.$refs.loadmore.onBottomLoaded();
          }, 500)
          console.log(error)
        });
      },
      toplaneDetail(res) {
        this.$router.push({path: '/flight/planeDetail/' + res.FlightIdentity + '/' + res.FlightDirection + '/' + res.ServiceType});
      },
      SearchIoD(status) {
        this.serviceType = "P";
        this.countryType = status;
        this.getAirFlight("1", this.countryType, this.serviceType, this.direction, "1", "10");
      },
      SearchAod(status) {
        this.showAoD = false;
        this.direction = status;
        this.getAirFlight("1", this.countryType, this.serviceType, this.direction, "1", "10");
      },
      SearchC() {
        this.serviceType = "C";
        this.countryType = "";
        this.getAirFlight("1", this.countryType, this.serviceType, this.direction, "1", "10");
      },
      getAirFlight(isFirst, countryType, serviceType, direction, pageNumber, pageSize) {
        this.list = [];
        this.allLoaded = false;
        axios.post('/eport-server/airFlight/getAirFlight.do', {
          "isFirst": isFirst,
          "countryType": countryType,
          "serviceType": serviceType,
          "direction": direction,
          "airportCode": "",
          "flightIdentity": "",
          "airlineCode": "",
          "pageSize": pageSize,
          "pageNumber": pageNumber,
          /*TODO 用户信息*/
          "userId":sessionStorage.getItem('isGuest')=='no'?JSON.parse(sessionStorage.getItem('userifo')).idNumber:'',
        }).then((response) => {
          this.list = response.data.data.list;
          this.last_page = response.data.data.last_page;
          this.rightPage = this.prePage = this.nextPage = response.data.data.right_page;
          if (response.data.data.last_page == response.data.data.current_page) {
            this.allLoaded = true;
          }
        }).catch((error) => {
          console.log(error)
        });
      },
      changefocus(num) {
        if (sessionStorage.getItem('isGuest') == 'yes') {
          Toast('请先登录');
          return;
        }
        axios.post('/eport-server/airFlight/followAirFlight.do', {
          flightIdentity: num,
          userId: JSON.parse(sessionStorage.getItem('userifo')).idNumber
        }).then((response) => {
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].FlightIdentity == num) {
              this.list[i].isFollow = true;
            }
          }
          console.log(response);
        }).catch((error) => {
          console.log(error)
        });
      },
      changeunfocus(num) {

        if (sessionStorage.getItem('isGuest') == 'yes') {
          Toast('请先登录');
          return;
        }
        axios.post('/eport-server/airFlight/cancelFollowAirFlight.do', {
          flightIdentity: num,
          userId: JSON.parse(sessionStorage.getItem('userifo')).idNumber
        }).then((response) => {
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].FlightIdentity == num) {
              this.list[i].isFollow = false;
            }
          }
          console.log(response);
        }).catch((error) => {
          console.log(error)
        });
      }
    },
    mounted() {
      Bus.$on('focus', (e) => {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].FlightIdentity == e) {
            this.list[i].isFollow = true;
          }
        }
      })
      Bus.$on('unfocus', (e) => {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].FlightIdentity == e) {
            this.list[i].isFollow = false;
          }
        }
      })

      axios.post('/eport-server/airFlight/getAirFlight.do', {
        "isFirst": "1",
        "countryType": "I",
        "serviceType": "P",
        "direction": "D",
        "airportCode": "",
        "flightIdentity": "",
        "airlineCode": "",
        "pageSize": "10",
        "pageNumber": "1",
        /*TODO 用户信息*/
        "userId":sessionStorage.getItem('isGuest')=='no'?JSON.parse(sessionStorage.getItem('userifo')).idNumber:'',
      }).then((response) => {
        this.list = response.data.data.list;
        this.last_page = response.data.data.last_page;
        this.rightPage = this.prePage = this.nextPage = response.data.data.right_page;
        if (response.data.data.last_page == response.data.data.current_page) {
          this.allLoaded = true;
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  }
</script>

<style scoped>
  #wall {
    width: 100%;
    padding-top: 181px;
  }

  #scoll {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-bottom: 181px;
    overflow: scroll;
  }

  .header_page {
    position: fixed;
    width: 100%;
    top: 0;
  }

  .header_line_a {
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 28px;
    border-bottom: 1px solid #eee;
    font-family: PingFangSC-Regular;
  }

  .header_line_a .active {
    color: #285FB1;
  }

  .header_line_b {
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #F0F0F0;
  }

  .header_line_b li {
    width: 238px;
    height: 58px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    text-align: center;
    line-height: 58px;
    color: #999;
    font-size: 24px;
  }

  .header_line_b .active {
    color: #285FB1;
    background: rgba(40, 95, 177, 0.1);
    border: 1px solid #285FB1;
  }

  .flight_th {
    height: 88px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
    position: fixed;
    top: 181px;
    width: 100%;
  }

  .flight_th span {
    font-size: 22px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
    display: inline-block;
    width: 120px;
    text-align: center;
  }


  .search_list li>div {
    min-height: 88px;
    border-bottom: 1px solid #eee;
    /*display: flex;
    justify-content: space-around;*/
    /*align-items: center;*/
    padding: 0 10px;
  }

  /*.search_list li span {
    display: inline-block;
    width: 120px;
    text-align: center;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }*/


  .search_list li span.share {
    width: 80px;
    color: #ccc;
  }

  .search_list li span img {
    width: 34px;
  }

  .search_list li span.pStatic {
    color: #26CD79;
  }

  .search_list li span.pStatic2 {
    color: #FF8800;
  }

  .search_list li span.pStatic3 {
    color: #ccc;
  }

  .search {
    width: 700px;
    height: 54px;
    background: #fff;
    border-radius: 8px;
    text-align: center;
    line-height: 54px;
    color: #999;
  }

  .search img{
    position: relative;
    top: 2px;
  }

  .itemHeader{
    padding-top: 20px;
    padding-left: 22px;
    display: flex;
    align-items:center;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    color: #999;
  }
  .itemHeader img{
    width: 24px;
  }
  .itemHeader span{
    margin-left: 10px;
  }
  .FlightIdentity{
    color: #333;
  }
  /*共享航班*/
  .SLAVE_FLIGHT{
    font-size: 20px;
    padding-left: 54px;
    padding-right: 48px;
    min-height: 30px;
    color: #999;
  }
  .SLAVE_FLIGHT span{
    margin-right: 6px;
  }
  .itemBody{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 20px 54px;
  }
  .Airport{
    font-size:40px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:48px;
    width: 160px;
    display: block;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 20px 0;
    position: relative;
  }
  .mask_wall{
    text-align: center;
    position: relative;
    height: 100%;
  }
  .mask{
    width: 100%;
    height: 16px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 200;
  }
  .timeList{
    width: 160px;
    text-align: center;
    background: url("./../../../static/img/line_to.png") center no-repeat;
    background-size: 160px;
    padding-top: 14px;
    margin: 0 10px;
  }
  .timeList span{
    display: block;
    min-height: 40px;
  }
  .line{
    height: 100px;
    border-left: 1px solid #ccc;
  }
  .star{
    text-align: center;
    font-size: 24px;
    padding: 6px 20px 0 16px;
  }
  .star img{
    width: 33px;
    height: 30px;
  }

  .SearchAod{
    position: fixed;
    right: 60px;
    bottom: 60px;
    z-index: 9999999;
    background: #000;
    font-size: 30px;
    padding: 30px;
    opacity: 0.6;
    border-radius: 60px;
    height: 100px;
    text-align: center;
    transition: width 1s;
    -moz-transition: width 1s; /* Firefox 4 */
    -webkit-transition: width 1s; /* Safari 和 Chrome */
    -o-transition: width 1s; /* Opera */
  }
  .SearchAod span{
    padding: 0 30px;
  }
  .SearchAod img{
    width: 40px;
    margin-top: -10px;
  }
  .AodSpan{
    font-size: 24px;
    font-weight: bold;
  }
</style>
<style>
  .search_list li span.pStatic {
    color: #26CD79;
  }
  .search_list li span.pStatic2 {
    color: #FF8800;
  }

  .search_list li span.pStatic3 {
    color: #ccc;
  }
</style>
