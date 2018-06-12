<template>
  <div>
    <ul class="change_plane">
      <li @click="changenone()">所有</li>
      <li v-for="item in splist" @click="changePlane(item)" v-bind:class="{'onclick':inipname.namecn == item.namecn}">{{item.namecn}}</li>
    </ul>
  </div>
</template>

<script>
  import Bus from './bus.js'
  import NavHeader from "@/components/header/header"
  import axios from "axios"
    export default {
      name: "selectPlane",
      data(){
        return{
          splist:[],
          inipname:{},
        }
      },
      components:{
          NavHeader
      },
      mounted(){
        axios.post('/eport-server/airFlight/getAirlineList.do').then((response)=> {
          this.splist = response.data.data;
        }).catch((error)=> {
          console.log(error)
        });
        if(this.$route.query.pname != "请选择"){
            this.inipname = this.$route.query.pname;
            console.log(this.inipname);
        }
      },
      methods:{
        changePlane(PlaneName){
          console.log(PlaneName);
          //sessionStorage.setItem("Destination", PlaneName);
          Bus.$emit('msg', PlaneName);
          this.$router.back(-1);
        },
        changenone(){
          //sessionStorage.setItem("Destination", PlaneName);
          Bus.$emit('msg', {
            namecn:"请选择",
            code:"",
          });
          this.$router.back(-1);
        }
      },
    }
</script>

<style scoped>
  .change_plane li{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:45px;
    border-bottom: 1px solid #eee;
    padding: 22px 32px;
  }
  .change_plane li.onclick{
    color:rgba(40,95,177,1);
    background: url("./../../../static/img/plane_click.png") 96% no-repeat;
    background-size: 32px;
  }
</style>
