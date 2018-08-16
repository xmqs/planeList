<template>
  <span :class="pStatics" @click="todetail">{{status}}</span>
</template>

<script>
    export default {
      name: "flightStatus",
      data(){
          return{
            pStatics:''
          }
      },
      props: {
        status: ""
      },
      methods:{
        todetail(){
          this.$emit('todetail');
        }
      },
      mounted(){
        switch (this.status){
          case "起飞": this.pStatics = "pStatic";  break;
          case "计划航班" :this.pStatics = "pStatic";  break;
          case "前站起飞" :this.pStatics = "pStatic";  break;
          case "降落" :this.pStatics = "pStatic2";  break;
          case "延误" :this.pStatics = "pStatic2";  break;
          case "航班结束" :this.pStatics = "pStatic2";  break;
          case "航班取消" :this.pStatics = "pStatic3";  break;
          case "" :this.pStatics = "pStatic3";this.status = "暂无";  break;
        }
      }
    }
</script>

<style scoped>
  .pStatic{
    color: #26CD79;
  }
  .pStatic2{
    color: #FF8800;
  }
  .pStatic3{
    color: #ccc;
  }
</style>
