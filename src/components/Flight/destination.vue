<template>
  <div>
    <ul>
      <li>
        <p class="li_p_title">航班号</p>
        <input class="li_udp_input" type="text" placeholder="请输入航班号，如MU4527">
      </li>
      <li class="chage_destination" v-bind:class="{'change':changing}">
        <div class="destination left_destination">
          <p>出发地</p>
          <div class="dest dest_f">南京</div>
        </div>
        <div class="icon_destination" @click="changeFT">

        </div>
        <div class="destination right_destination">
          <p>目的地</p>
          <div class="dest dest_t">昆明</div>
        </div>
      </li>
      <li>
        <router-link :to="{path:'selectpalne'}">
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
        if (sessionStorage.getItem("Destination")){
          this.planeCom = sessionStorage.getItem("Destination");
        }else if (this.$route.params.PlaneName) {
            this.planeCom = this.$route.params.PlaneName;
          }
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
        }
      }
    }
</script>

<style scoped>
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
    display: inline-block;
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
    color:rgba(204,204,204,1);
    border: 0;
    outline: 0;
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
    width:100%;
    height:4rem;
    background:rgba(40,95,177,1);
    border-radius: 0.33rem ;
    border: 0;
    margin-top: 2rem;
    color: #fff;
    font-size: 1.6rem;
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
    background: url("./../../../static/img/palne_a.png") center no-repeat;
    background-size: 3rem;
  }
  .content li.change{
    background: url("./../../../static/img/plane_c.gif") center no-repeat;
    background-size: 3rem;
  }
  .dest_f{
    position: absolute;
  }
  .dest_t{
    position: absolute;
  }
</style>
