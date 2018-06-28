<template>
    <div>
      <div class="flight_th">
        <span>航班号</span>
        <span>{{direction=="D"?'目的地':'出发地'}}</span>
        <span>预计{{direction=="D"?'起飞':'降落'}}</span>
        <span>实际{{direction=="D"?'起飞':'降落'}}</span>
        <span>状态</span>
        <span class="star"></span>
      </div>
      <!--<ul class="search_list">
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
              {{item.ActualLandingTakeoffDateTime?item.ActualLandingTakeoffDateTime.slice(11,16):"&#45;&#45;"}}
            </span>
            <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='起飞'">起飞</span>
            <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='计划航班'">计划航班</span>
            <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='前站起飞'">前站起飞</span>
            <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='降落'">降落</span>
            <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='延误'">延误</span>
            <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='航班结束'">航班结束</span>
            <span @click="toplaneDetail(item)" class="pStatic3" v-if="item.FlightStatus=='航班取消'">航班取消</span>
            <span class="star">
                <img src="./../../../static/img/unfocus.png" alt="" v-if=!item.isFollow  @click="changefocus(item.FlightIdentity)">
                <img  src="./../../../static/img/focus.png" alt="" v-if=item.isFollow  @click="changeunfocus(item.FlightIdentity)">
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
              {{item.ActualLandingTakeoffDateTime?item.ActualLandingTakeoffDateTime.slice(11,16):"&#45;&#45;"}}
            </span>
            <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='起飞'">起飞</span>
            <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='计划航班'">计划航班</span>
            <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='前站起飞'">前站起飞</span>
            <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='降落'">降落</span>
            <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='延误'">延误</span>
            <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='航班结束'">航班结束</span>
            <span @click="toplaneDetail(item)" class="pStatic3" v-if="item.FlightStatus=='航班取消'">航班取消</span>
            <span class="share">
              共享
            </span>
          </div>
        </li>
        <infinite-loading @infinite="infiniteHandler">
          <span slot="no-more">
            没有航班了
          </span>
          <span slot="no-results">
            没有查询到对应航班
          </span>
        </infinite-loading>
      </ul>-->
      <div id="wall">
        <div id="scoll">
          <mt-loadmore infinite-scroll-distance="1" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
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
                  <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='起飞'">起飞</span>
                  <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='计划航班'">计划航班</span>
                  <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='前站起飞'">前站起飞</span>
                  <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='降落'">降落</span>
                  <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='延误'">延误</span>
                  <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='航班结束'">航班结束</span>
                  <span @click="toplaneDetail(item)" class="pStatic3" v-if="item.FlightStatus=='航班取消'">航班取消</span>
                  <span class="star">
                <img src="./../../../static/img/unfocus.png" alt="" v-if=!item.isFollow  @click="changefocus(item.FlightIdentity)">
                <img  src="./../../../static/img/focus.png" alt="" v-if=item.isFollow  @click="changeunfocus(item.FlightIdentity)">
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
                  <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='起飞'">起飞</span>
                  <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='计划航班'">计划航班</span>
                  <span @click="toplaneDetail(item)" class="pStatic" v-if="item.FlightStatus=='前站起飞'">前站起飞</span>
                  <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='降落'">降落</span>
                  <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='延误'">延误</span>
                  <span @click="toplaneDetail(item)" class="pStatic2" v-if="item.FlightStatus=='航班结束'">航班结束</span>
                  <span @click="toplaneDetail(item)" class="pStatic3" v-if="item.FlightStatus=='航班取消'">航班取消</span>
                  <span class="share">
                共享
              </span>
                </div>
              </li>
            </ul>
          </mt-loadmore>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from "axios"
  /*import InfiniteLoading from 'vue-infinite-loading';*/
  import Bus from './bus.js'
  import { Loadmore,Toast } from 'mint-ui';
    export default {
      name: "searchList",
      data(){
          return{
            list:[],
            pageNumber:1,
            direction:"",
            planeCom:"",
            planeFrom:"",
            planeTo:"",
            planeNumber:"",
            Url:"",
            isFirst:true,
            allLoaded:false,
          }
      },
      component:{
        'v-loadmore':Loadmore
      },
      mounted(){
        Bus.$on('focus', (e) => {
          for(let i = 0;i<this.list.length;i++){
            if(this.list[i].FlightIdentity == e){
              this.list[i].isFollow = true;
            }
          }
        })
        Bus.$on('unfocus', (e) => {
          for(let i = 0;i<this.list.length;i++){
            if(this.list[i].FlightIdentity == e){
              this.list[i].isFollow = false;
            }
          }
        })
      },
      activated(){
          if(this.$route.params.planeCom||this.$route.params.planeFrom||this.$route.params.planeTo||this.$route.params.planeNumber){
            this.list=[];
            this.pageNumber = 1;
            if(this.$route.params.planeFrom.name == "南京"){
              this.direction = "D";
            }else{
              this.direction = "A";
            }

            if(this.$route.params.Int){
              this.Url = '/eport-server/airFlight/getAirInternatFlight.do'
            }else{
              this.Url = '/eport-server/airFlight/getAirFlight.do'
            }

            this.planeCom = this.$route.params.planeCom.code;
            this.planeFrom = this.$route.params.planeFrom.code;
            this.planeTo = this.$route.params.planeTo.code;
            this.planeNumber = this.$route.params.planeNumber;

            this.infiniteHandler();
          }
      },
      methods:{
        loadTop() {
          this.prePage--;
          if(this.prePage < 1){
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
            "pageNumber":this.prePage,
            "userId":JSON.parse(sessionStorage.getItem('userifo')).idNumber,
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
            "isFirst":this.isfirst?"1":"0",
            "countryType":this.countryType,
            "serviceType":this.serviceType,
            "direction":this.direction,
            "airportCode":"",
            "flightIdentity":"",
            "airlineCode":"",
            "pageSize":"20",
            "pageNumber":this.nextPage,
            "userId":JSON.parse(sessionStorage.getItem('userifo')).idNumber
          }).then((response)=> {
            if(this.isfirst){
              this.list = response.data.data.list;
            }else{
              this.list = this.list.concat(response.data.data.list);
              if(response.data.data.list.length == 0){
                this.allLoaded = true;
              }
            }
            this.isfirst = false;
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
        infiniteHandler($state) {
          this.isFirst = false;
          axios.post(this.Url,{
            airlineCode:this.planeCom,
            airportCode:this.direction=="D"?this.planeTo:this.planeFrom,
            direction:this.direction,
            flightIdentity:this.planeNumber,
            pageNumber:this.pageNumber,
            pageSize:20,
            isFirst:"1",
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
        },
        toplaneDetail(res){
          this.$router.push({path:'/flight/planeDetail/'+res.FlightIdentity+'/'+res.FlightDirection+'/'+res.ServiceType});
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

  #wall{
    width: 100%;
    padding-top: 89px;
  }
  #scoll{
    position: fixed;
    width: 100%;
    height: 100%;
    padding-bottom: 89px;
    overflow: scroll;
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
    height: 88px;
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
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
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
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .planeTo{
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
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
