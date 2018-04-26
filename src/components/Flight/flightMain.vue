<template>
  <div id="flight">
    <nav-header>
      航班动态
    </nav-header>
    <div class="changePage">
      <router-link to="destination" v-bind:class="{'page_active':pageNum==0}" @click.native="changePage(0)">按起落地</router-link>
      <router-link to="myList" v-bind:class="{'page_active':pageNum==1}" @click.native="changePage(1)">我的关注</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import NavHeader from "@/components/header/header"

    export default {
      data(){
        return{
          pageNum:0
        }
      },
      name: "flight",
      components:{
        NavHeader
      },
      methods:{
        changePage(index){
          this.pageNum = index;
        }
      }
    }
</script>

<style>
  /*头部*/
  .changePage{
    margin-top: 45px;
    text-align: center;
    width: 100%;
    border-bottom:1px solid #EEEEEE ;
    background: #fff;
  }
  .changePage a{
    float: left;
    text-align: center;
    width: 50%;
    border-bottom: 2px solid #fff;
    line-height: 4rem;
    font-size: 1.6rem;
    color: #333;
  }
  .changePage a.page_active{
    color: #285FB1;
    border-bottom: 2px solid #285FB1;
  }
  .changePage::after{
    content: "";
    clear: both;
    display: table;
  }
  /*主题*/
  .content{
    padding: 0 1rem;
  }
</style>
