<template>
    <div>
      <ul class="Flight_list">
        <li v-for="item in list" v-if="item.ServiceType!==''">
          <div class="list_header">
            <img :src='item.AirLineImg+"@3x.png"'>
            <span class="company">{{item.AirlineIATACode}}</span>
            <span class="planeNum">{{item.FlightIdentity}}</span>
            <span class="isServiceType" v-if="item.ServiceType==0">货机</span>
          </div>
          <div class="list_body">
            <div class="list_page"  @click="toplaneDetail(item)">
              <div class="planeFrom">{{item.IATAOriginAirport}}</div>
            </div>
            <div class="planeTS"  @click="toplaneDetail(item)"  >
              <div class="planeTime" v-if="item.EstimatedLandingTakeoffDateTime">预计 {{item.EstimatedLandingTakeoffDateTime.slice(11,16)}} 起飞</div>
              <div class="planeStatic" v-if="item.FlightStatus=='起飞'">起飞</div>
              <div class="planeStatic" v-if="item.FlightStatus=='计划航班'">计划航班</div>
              <div class="planeStatic2" v-if="item.FlightStatus=='降落'">降落</div>
              <div class="planeStatic2" v-if="item.FlightStatus=='延误/计划航班'">延误</div>
              <div class="planeStatic2" v-if="item.FlightStatus=='航班结束'">航班结束</div>
              <div class="planeStatic3" v-if="item.FlightStatus=='航班取消'">航班取消</div>
            </div>
            <div class="list_page"  @click="toplaneDetail(item)">
              <div class="planeTo">{{item.IATADestAirport}}</div>
            </div>
            <div class="line"></div>
            <div class="focus">
              <div v-if="!item.isFollow"  @click="changefocus(item.FlightIdentity)">
                <img src="./../../../static/img/unfocus.png" alt="">
                <p class="focustatic">未关注</p>
              </div>
              <div v-if="item.isFollow"  @click="changeunfocus(item.FlightIdentity)">
                <img src="./../../../static/img/focus.png" alt="">
                <p class="focustatic">已关注</p>
              </div>
            </div>
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
      </ul>
    </div>
</template>

<script>
  import axios from "axios"
  import InfiniteLoading from 'vue-infinite-loading';
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
            planeNumber:""
          }
      },
      mounted(){

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

            this.planeCom = this.$route.params.planeCom.code;
            this.planeFrom = this.$route.params.planeFrom.code;
            this.planeTo = this.$route.params.planeTo.code;
            this.planeNumber = this.$route.params.planeNumber;

            this.infiniteHandler();
          }
      },
      methods:{
        infiniteHandler($state) {
          axios.post('/eport-server/airFlight/getAirFlight.do',{
            airlineCode:this.planeCom,
            airportCode:this.direction=="D"?this.planeTo:this.planeFrom,
            direction:this.direction,
            flightIdentity:this.planeNumber,
            pageNumber:this.pageNumber,
            pageSize:20,
            userId:JSON.parse(sessionStorage.getItem('userifo')).idNumber
          }).then((response)=> {
            this.pageNumber++;
            for (let i = 0;i<response.data.data.list.length;i++){
              this.list.push(response.data.data.list[i]);
            }
            $state.loaded();
            if(response.data.data.list.length<20){
              $state.complete();
            }
          }).catch((error)=> {
            console.log(error)
          });
        },
        toplaneDetail(res){
          this.$router.push({name:'PlaneDetail',params:{detail:res}});
        },
        changefocus(num){
          axios.post('/eport-server/airFlight/followAirFlight.do',{
            flightIdentity:num,
            userId:JSON.parse(sessionStorage.getItem('userifo ')).idNumber
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
      components: {
        InfiniteLoading,
      },
    }
</script>

<style scoped>
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
</style>
