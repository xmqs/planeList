<template>
  <div class="stopMain">
    <div class="s1">
      南京禄口国际机场停车场总面积18万平方米,停车位4200 个，为各类车辆提供24小时昼夜停车服务。1号停车场（ P1）：位于T1候机楼正前方，停放普通旅客车辆；2号停 车楼（P2）：位于T2候机楼正前方，停放普通旅客车辆；
    </div>
    <table>
      <tr>
        <td>停车场</td>
        <td>车型</td>
        <td>免费时段</td>
        <td>起价(1小时以内)</td>
        <td>续假(元/半小时)</td>
        <td>元(元/24小时)</td>
      </tr>
      <tr>
        <td rowspan="2">1号停车场(P1)</td>
        <td>大型车</td>
        <td rowspan="2">15分钟</td>
        <td>6</td>
        <td>3</td>
        <td>60</td>
      </tr>
      <tr>
        <td>小型车</td>
        <td>12</td>
        <td>6</td>
        <td>70</td>
      </tr>
      <tr>
        <td rowspan="2">1号停车场(P2)</td>
        <td>大型车</td>
        <td rowspan="2">15分钟</td>
        <td>8</td>
        <td>4</td>
        <td>80</td>
      </tr>
      <tr>
        <td>小型车</td>
        <td>12</td>
        <td>6</td>
        <td>90</td>
      </tr>
      <tr>
        <td colspan="6">备注：所有停车场停车15分钟以内免费。</td>
      </tr>
    </table>
    <div class="s2">
      <p>注意事项：</p>
      <p>1、T1航站楼已关闭，接机旅客请至P2停车楼。</p>
      <p>2、车辆在入口处自助领取停车券入场，按指定区域停放，在出口处计时付费后离场。</p>
      <p>3、小型车为19座以下，含19座。</p>
      <p>4、严禁不按指示方向行驶，严禁在行车道、斑马线、黄线等非指定停车位上停车。</p>
      <p>5、请检查门窗、发动机、车灯是否关闭。请勿在车内放置贵重物品及易燃易爆物品。</p>
      <p>6、在P2停车楼停车的旅客请从电（扶）梯上2层，通过步行连廊到达T2航站楼。</p>
      <p>7、P2停车楼B2层车位较空，建议过夜停车旅客优先选择。</p>
      <p>8、黄金周期间P2停车场车位紧张，建议过夜车辆优先选择P1停车场。P1停车场至T2航站楼步行距离5-8分钟。</p>
      <p>9、P2停车楼室内3层，建议旅客停车后用手机拍照，记录下车位编号与停车区域，以便回程找车。</p>
      <p>10、24小时服务电话：025-69820167。</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "shopDetail"
    }
</script>

<style scoped>
  .stopMain{
    padding: 32px;
  }
  .s1{
    font-size:28px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:46px;
  }
  .s2 p{
    font-size:22px;
    font-family:PingFangSC;
    color:rgba(51,51,51,1);
    line-height:42px;
  }
  table{
    font-size:20px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:28px;
    text-align: center;
    margin: 30px 0;
  }

  table,table tr th, table tr td { border:1px solid #666; }
  table { text-align: center; border-collapse: collapse;}
  td{
    padding: 20px;
  }
</style>
