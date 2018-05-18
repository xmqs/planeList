<template>
  <header>
    <slot>
    </slot>
    <span id="h_back" @click="headerBack"></span>
  </header>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    name: "header",
    methods:{
      headerBack(){
        this.$router.back(-1);
      }
    }
  }
</script>
<style>
  header{
    height: 45px;
    background:#285FB1;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 1.8rem;
    line-height: 45px;
  }
</style>
