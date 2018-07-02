<template>
  <span :class="pStatic" @click="todetail">{{status}}</span>
</template>

<script>
    export default {
      name: "flightStatus",
      data(){
          return{
            pStatic:''
          }
      },
      props: {
        status: String
      },
      methods:{
        todetail(){
          this.$emit('todetail');
        }
      },
      mounted(){
        switch (this.status){
          case "起飞": this.pStatic = "pStatic";  break;
          case "计划航班" :this.pStatic = "pStatic";  break;
          case "前站起飞" :this.pStatic = "pStatic";  break;
          case "降落" :this.pStatic = "pStatic2";  break;
          case "延误" :this.pStatic = "pStatic2";  break;
          case "航班结束" :this.pStatic = "pStatic2";  break;
          case "航班取消" :this.pStatic = "pStatic3";  break;
          case "" :this.pStatic = "pStatic3";this.status = "暂无";  break;
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
