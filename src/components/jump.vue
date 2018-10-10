<template>
  <div>
    <div @click="jump()">11111111111111111</div>
    <div @click="jump2()">222222222222222</div>
    <div @click="jump3()">333333333333333333</div>
  </div>
</template>

<script>
    export default {
        name: "jump",
      methods:{
        jump(){
          window.location = 'znmh://module/jn_bm_jnzyy'
        },
        jump2(){
          window.location = 'znmh://module/jn_cs_jtys'
        },
        jump3(){
          window.location = 'znmh://module/jn_yyghnew'
        }
      }
    }
</script>

<style scoped>

</style>
