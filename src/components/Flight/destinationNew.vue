<template>
  <div>
    <div class="changePage">
      <div class="page_active">航班查询</div>
      <div @click="changePage()">我的关注</div>
    </div>
    <ul class="content">
      <li>
        <p class="li_p_title">航班号</p>
        <input class="li_udp_input" type="text" placeholder="请输入航班号，如MU4527" v-model="planeNumber">
      </li>
      <li class="chage_destination">
        <div class="destination left_destination" @click="choseCity(planeFrom.name)">
          <p>出发地</p>
          <div class="dest dest_f">{{planeFrom.name}}</div>
          <div class="scroll_mask"></div>
        </div>
        <div class="icon_destination" @click="changeFT">
          <img src="./../../../static/img/rollcoin.png" alt=""  v-bind:class="{'change':changing}">
        </div>
        <div class="destination right_destination" @click="choseCity(planeTo.name)">
          <p>目的地</p>
          <div class="dest dest_t">{{planeTo.name}}</div>
          <div class="scroll_mask"></div>
        </div>
      </li>
      <li>
        <router-link :to="{name:'SelectPalne',query:{pname:planeCom}}">
          <p class="li_p_title">航空公司</p>
          <div class="li_udp_div">
            {{planeCom.namecn}}
          </div>
        </router-link>
      </li>
      <!--<li>
        <p class="li_p_title">航空日期</p>
        <div class="li_udp_div">
          {{this.time[1]}}月{{this.time[2]}}日
          <span class="isToday">今天</span>
        </div>
      </li>-->
    </ul>
    <button class="c_button" @click="getAirFlight">
      查询
    </button>
  </div>
</template>

<script>
  import Bus from './bus.js'

    export default {
      name: "destination",
      data(){
        return{
          planeCom:{
            namecn:"请选择",
            code:""
          },
          plane_back:false,
          changing:false,
          planeNumber:'',
          planeFrom:{
            name:"南京",
            code:"",
          },
          planeTo:{
            name:"请选择",
            code:"",
          },
          time:[],
          changging:false,
        }
      },
      mounted(){
        let date =new Date();
        this.time = [date.getFullYear(),date.getMonth()+1,date.getDate()];
        Bus.$on('msg', (e) => {
          this.$set(this.$data, 'planeCom', e);
          this.planeCom = e;
        })
        Bus.$on('choseCity', (e) => {
          if(e.name!=="南京"){
            if(this.planeTo.name !== "南京"){
              this.$set(this.$data, 'planeTo', e);
              this.planeTo = e;
            }else{
              this.$set(this.$data, 'planeFrom', e);
              this.planeFrom = e;
            }
          }
        })
        Bus.$on('changefocus', (e) => {
          console.log(e);
        })

		    Bus.$on('area', (e) => {
		    	this.endCity = e;
		    })
      },
      methods:{
        changeBack(){
          this.plane_back = !this.plane_back;
        },
        changeFT(){
          if(this.changging){
            return;
          }
          let f = this.planeFrom;
          let t = this.planeTo;
          this.planeFrom = t;
          this.planeTo = f;
          this.changging = true;
          this.changing = true;
          setTimeout(()=>{
            this.changing = false;
            this.changging = false;
          },1000)
        },
        changePage(){
          this.$router.replace({path:'/flight/myListNew'});
        },
        getAirFlight(){
          this.$router.push({name:'searchListNew',params:{planeNumber:this.planeNumber,planeFrom:this.planeFrom,planeTo:this.planeTo,planeCom:this.planeCom,Int:false}});
        },
        getAirFlightInt(){
          this.$router.push({name:'searchList',params:{planeNumber:this.planeNumber,planeFrom:this.planeFrom,planeTo:this.planeTo,planeCom:this.planeCom,Int:true}});
        },
        //选择城市
        choseCity(city){
          if(city == "南京"){
            return
          }
          this.$router.push({path:'/flight/cityList'});
        }
      },
      beforeRouteLeave(to,from,next){
        if (to.name == "home"){
          this.planeCom = {
            namecn:"请选择",
            code:""
          };
          this.planeNumber = "";
          this.planeTo = {
            name:"请选择",
            code:""
          };
          this.planeFrom = {
            name:"南京",
            code:""
          };
        }else{
          from.meta.keepAlive = true;
        }
        next();
      },
    }
</script>

<style scoped>

  .changePage{
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

  input::-webkit-input-placeholder{
    color:#ccc;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#ccc;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#ccc;
  }
  /**出发地 目的地**/
  .destination{
    text-align: left;
    width: 36%;
    position: relative;
  }
  .destination .dest{
    height:76px;
    font-size:40px;
    font-family:PingFangSC-Regular;
    -webkit-overflow-scrolling: touch;
    color:rgba(51,51,51,1);
    line-height:56px;
    margin-top: 10px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding-bottom: 20px;
  }
  .scroll_mask{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 18px;
    background: #fff;
  }
  .destination p{
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    line-height:33px;
  }
  /*.left_destination{
    height: 4rem;
  }*/


  .right_destination{
    text-align: right;
  }
  .icon_destination{
    height: 64px;
    width: 66px;
    padding-top: 18px;
  }
  .icon_destination img{
    width: 66px;
    height: 64px;
  }
  .li_p_title{
    font-size:24px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
    line-height:33px;
  }
  .li_udp_input{
    width:100%;
    font-size:40px;
    color:#333;
    border: 0;
    outline: 0;
    margin-top: 10px;
    height:56px;
    -webkit-user-select:auto;
  }

  .li_udp_div{
    height:56px;
    font-size:40px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:56px;
    margin-top: 10px;
  }
  .isToday{
    font-size:24px;
    color:rgba(255,144,18,1);
    line-height:33px;
  }
  .c_button{
    border: 0;
    margin-top: 60px;
    color: #fff;
    font-size:34px;
    margin-left: 40px;
    width:670px;
    height:92px;
    background:rgba(40,95,177,1);
    border-radius: 4px ;
  }
  .d_button{
    border: 1px solid #285FB1;
    margin-top: 40px;
    color: #285FB1;
    font-size:34px;
    margin-left: 40px;
    width:670px;
    height:92px;
    background:#fff;
    border-radius: 4px ;
  }
  .content{
    padding: 0 32px;
  }
  .content li{
    border-bottom: 1px solid #EEEEEE;
    height: 132px;
    padding-top: 17px;
  }
  .content li.chage_destination{
    display:flex;
    display: -webkit-flex;
    justify-content:space-between;
    position: relative;
    height: 132px;
    background: url("./../../../static/img/rollPlane.png") center no-repeat;
    background-size: 64px;
  }
  .change{
    transition: all 1s;
    -moz-transition: all 1s; /* Firefox 4 */
    -webkit-transition: all 1s; /* Safari 和 Chrome */
    -o-transition: all 1s;
    transform:rotate(360deg);
    -ms-transform:rotate(360deg);
    -moz-transform:rotate(360deg);
    -webkit-transform:rotate(360deg);
    -o-transform:rotate(360deg);
  }
</style>
