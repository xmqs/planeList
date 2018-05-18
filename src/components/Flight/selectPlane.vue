<template>
  <div>
    <nav-header>
      航班动态
    </nav-header>
    <ul class="change_plane">

      <li>所有</li>
      <li>奥凯航空有限公司</li>
      <li>澳门航空公司</li>
      <li>成都航空有限公司</li>
      <li class="onclick" @click="changePlane('春秋航空公司')">春秋航空公司</li>
      <li>大韩航空公司</li>
      <li>德国汉莎航空公司</li>
      <li>东海航空</li>
      <li>多彩贵州航空有限公司</li>
      <li>菲律宾菲鹰航空有限公司</li>
      <li>韩国韩亚航空公司</li>
      <li>所有</li>
      <li>奥凯航空有限公司</li>
      <li>澳门航空公司</li>
      <li>成都航空有限公司</li>
      <li>春秋航空公司</li>
      <li>大韩航空公司</li>
      <li>德国汉莎航空公司</li>
      <li>东海航空</li>
      <li>多彩贵州航空有限公司</li>
      <li>菲律宾菲鹰航空有限公司</li>
      <li>韩国韩亚航空公司</li>
      <li>所有</li>
      <li>奥凯航空有限公司</li>
      <li>澳门航空公司</li>
      <li>成都航空有限公司</li>
      <li>春秋航空公司</li>
      <li>大韩航空公司</li>
      <li>德国汉莎航空公司</li>
      <li>东海航空</li>
      <li>多彩贵州航空有限公司</li>
      <li>菲律宾菲鹰航空有限公司</li>
      <li>韩国韩亚航空公司</li>
      <li>所有</li>
      <li>奥凯航空有限公司</li>
      <li>澳门航空公司</li>
      <li>成都航空有限公司</li>
      <li>春秋航空公司</li>
      <li>大韩航空公司</li>
      <li>德国汉莎航空公司</li>
      <li>东海航空</li>
      <li>多彩贵州航空有限公司</li>
      <li>菲律宾菲鹰航空有限公司</li>
      <li>韩国韩亚航空公司</li>
      <li>所有</li>
      <li>奥凯航空有限公司</li>
      <li>澳门航空公司</li>
      <li>成都航空有限公司</li>
      <li>春秋航空公司</li>
      <li>大韩航空公司</li>
      <li>德国汉莎航空公司</li>
      <li>东海航空</li>
      <li>多彩贵州航空有限公司</li>
      <li>菲律宾菲鹰航空有限公司</li>
      <li>韩国韩亚航空公司</li>
    </ul>
  </div>
</template>

<script>
  import Bus from './bus.js'
  import NavHeader from "@/components/header/header"
    export default {
        name: "selectPlane",
      components:{
          NavHeader
      },
      methods:{
        changePlane(PlaneName){
          //sessionStorage.setItem("Destination", PlaneName);
          Bus.$emit('msg', PlaneName);
          this.$router.back(-1);
        }
      },
    }
</script>

<style scoped>
  header{
    position: fixed;
    top: 0;
  }
  .change_plane{
    margin-top: 45px;
  }
  .change_plane li{
    background:rgba(255,255,255,1);
    font-size:1.6rem;
    color:rgba(51,51,51,1);
    line-height:2.75rem;
    padding: .6rem 1.4rem;
    border-bottom: 1px solid #eee;
  }
  .change_plane li.onclick{
    color:rgba(40,95,177,1);
    background: url("./../../../static/img/plane_click.png") 96% no-repeat;
    background-size: 1.6rem ;
  }
</style>
