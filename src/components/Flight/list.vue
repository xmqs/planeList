<template>
  <li>
    {{total}}
  </li>
</template>

<script>
    export default {
        name: "list",
      data(){
          return{
            a:1,
            b:2,
            total:123,
          }
      },
      computed:{
          total(){
            return 128
          }
      }
    }
</script>

<style scoped>

</style>
