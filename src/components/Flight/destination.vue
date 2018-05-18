<template>
  <div>
    <div class="changePage">
      <div class="page_active">按起落地</div>
      <div @click="changePage()">我的关注</div>
    </div>
    <ul class="content">
      <li>
        <p class="li_p_title">航班号</p>
        <input class="li_udp_input" type="text" placeholder="请输入航班号，如MU4527" >
      </li>
      <li class="chage_destination">
        <div class="destination left_destination">
          <p>出发地</p>
          <div class="dest dest_f">南京</div>
        </div>
        <div class="icon_destination" @click="changeFT">
          <img src="./../../../static/img/rollcoin.png" alt=""  v-bind:class="{'change':changing}">
        </div>
        <div class="destination right_destination">
          <p>目的地</p>
          <div class="dest dest_t">昆明</div>
        </div>
      </li>
      <li>
        <router-link :to="{name:'SelectPalne'}">
          <p class="li_p_title">航空公司</p>
          <div class="li_udp_div">
            {{planeCom}}
          </div>
        </router-link>
      </li>
      <li>
        <p class="li_p_title">航空日期</p>
        <div class="li_udp_div">
          04月02日
          <span class="isToday">今天</span>
        </div>
      </li>
    </ul>
    <button class="c_button">
      确定
    </button>
  </div>
</template>

<script>
  import Bus from './bus.js'

    export default {
      name: "destination",
      data(){
        return{
          planeCom:'请选择',
          plane_back:false,
          changing:false
        }
      },
      mounted(){
        /*if (sessionStorage.getItem("Destination")){
          this.planeCom = sessionStorage.getItem("Destination");
        }else if (this.$route.params.PlaneName) {
            this.planeCom = this.$route.params.PlaneName;
          }*/
        Bus.$on('msg', (e) => {
          this.$set(this.$data, 'planeCom', e);
        })
      },
      methods:{
        changeBack(){
          this.plane_back = !this.plane_back;
        },
        changeFT(){
          this.changing = true;
          setTimeout(()=>{
            this.changing = false;
          },1000)
        },
        changePage(){
          console.log(1);
          this.$router.replace({path:'/flight/myList'});
        }
      },
      beforeRouteLeave(to,from,next){
        if (to.name == "home"){
          from.meta.keepAlive = false;
        }else{
          from.meta.keepAlive = true;
        }
        next();
      }
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
    border-bottom: 2px solid #fff;
    line-height: 4rem;
    font-size: 1.6rem;
    color: #333;
  }
  .changePage div.page_active{
    color: #285FB1;
    border-bottom: 2px solid #285FB1;
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
    width: 20%;
  }
  .destination .dest{
    font-size:2rem;
    color:rgba(51,51,51,1);
    font-weight: normal;
  }
  .destination p{
    font-size: 1.4rem;
    height:2.4rem;
    color:rgba(153,153,153,1);
    line-height:2.4rem;
  }
  /*.left_destination{
    height: 4rem;
  }
  .right_destination{
    height: 4rem;
  }*/
  .icon_destination{
    height: 5rem;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items:center;
  }
  .icon_destination img{
    width: 3rem;
    height: 3rem;
  }
  .li_p_title{
    font-size: 1.4rem;
    width:6rem;
    height:2.4rem;
    color:rgba(153,153,153,1);
    line-height:2.4rem;
  }
  .li_udp_input{
    width:100%;
    font-size:2rem;
    color:#333;
    border: 0;
    outline: 0;
    -webkit-user-select:auto;
  }

  .li_udp_div{
    width:100%;
    font-size:2rem;
    color:#333333;
    border: 0;
  }
  .isToday{
    font-size:1rem;
    color:rgba(255,144,18,1);
    line-height:2.75rem;
  }
  .c_button{
    width:96%;
    margin-left: 2%;
    height:4rem;
    background:rgba(40,95,177,1);
    border-radius: 0.33rem ;
    border: 0;
    margin-top: 2rem;
    color: #fff;
    font-size: 1.6rem;
  }
  .content{
    padding: 0 1rem;
  }
  .content li{
    padding: .4rem 0;
    border-bottom: 1px solid #EEEEEE;
  }
  .content li.chage_destination{
    display:flex;
    display: -webkit-flex;
    justify-content:space-between;
    padding-bottom: .6rem;
    position: relative;
    height: 6rem;
    background: url("./../../../static/img/rollPlane.png") center no-repeat;
    background-size: 3rem;
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
  .dest_f{
    position: absolute;
  }
  .dest_t{
    position: absolute;
  }
</style>
