<template>
    <div>
      {{userInfo}}
    </div>
</template>

<script>
    export default {
        name: "testUserInfo",
      data(){
          return{
            userInfo:'',
          }
      },
      mounted(){
          this.userInfo = sessionStorage.getItem('userifo');

          alert(sessionStorage.getItem('userifo'));
      }
    }
</script>

<style scoped>

</style>
