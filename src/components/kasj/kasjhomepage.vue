<template>
  <div id="chart" class="hairsplines">
    <div class="addContainCss">
        <!-- 统计图1 -->
        <div @click="godetails('tab1')">
          <div class="quantum"><span>进出口货物量（万吨）-{{fmonth}}月</span><span class="numbers">总量{{freightTotalNum}}</span></div>
          <div class="topway">
              <div class="way">
                  <div class="way_ele0"><img class="chuan" src="../../../static/img/kasj/chuan.png" alt=""></div>
                  <div class="way_ele">{{waterFreight}}</div>
                  <div class="way_ele2">水运</div>
              </div>
              <div class="way">
                  <div class="way_ele0"><img class="feiji" src="../../../static/img/kasj/feiji.png" alt=""></div>
                  <div class="way_ele">{{airFreight}}</div>
                  <div class="way_ele2">空运</div>
              </div>
              <div class="way">
                  <div class="way_ele0"><img class="tielu" src="../../../static/img/kasj/tielu.png" alt=""></div>
                  <div class="way_ele">{{transFreight}}</div>
                  <div class="way_ele2">铁路</div>
              </div>
              <div class="way">
                  <div class="way_ele0"><img class="qiche" src="../../../static/img/kasj/qiche.png" alt=""></div>
                  <div class="way_ele">{{roadFreight}}</div>
                  <div class="way_ele2">公路</div>
              </div>
          </div>
        </div>
        
        <div :id="id" :option="option"></div>
        <!-- 统计图2 -->
        <div @click="godetails('tab2')">
          <div class="quantum"><span>出入境人员总数（万人次）-{{pmonth}}月</span><span class="numbers">总量{{personTotalNum}}</span></div>
          <div class="topway">
              <div style="width:49%" class="way">
                  <div class="way_ele0"><img class="chuan" src="../../../static/img/kasj/chuan.png" alt=""></div>
                  <div class="way_ele">{{personWaterCount}}</div>
                  <div class="way_ele2">水运</div>
              </div>
              <div style="width:49%" class="way">
                  <div class="way_ele0"><img class="feiji" src="../../../static/img/kasj/feiji.png" alt=""></div>
                  <div class="way_ele">{{personAirCount}}</div>
                  <div class="way_ele2">空运</div>
              </div>
          </div>
        </div>
        <div :id="id1" :option="option1"></div>
        <!-- 统计图3 -->
        <div @click="godetails('tab3')">
          <div class="quantum"><span>进出境运输工具（辆艘）-{{tmonth}}月</span><span class="numbers">总量{{transTotalNum}}</span></div>
          <div class="topway">
              <div style="width:49%" class="way">
                  <div class="way_ele0"><img class="chuan" src="../../../static/img/kasj/chuan.png" alt=""></div>
                  <div class="way_ele">{{transShipCount}}</div>
                  <div class="way_ele2">水运</div>
              </div>
              <div style="width:49%" class="way">
                  <div class="way_ele0"><img class="feiji" src="../../../static/img/kasj/feiji.png" alt=""></div>
                  <div class="way_ele">{{transAirCount}}</div>
                  <div class="way_ele2">空运</div>
              </div>
          </div>
        </div>
        <div :id="id2" :option="option2"></div>
    </div>
  </div>
</template>
<script>
  // highcharts
	import axios from "axios";
    import { Toast } from 'mint-ui'
  import HighCharts from 'highcharts'
  export default {
    name: 'chart',
    data() {
      return {
        id: '',
        option: {},
        id1: '',
        option1: {},
        id2: '',
        option2: {},
        id3: '',
        option3: {},
        arr: [200, 500, 400],
        horizontalOrdinate: ['1号', '2号', '3号'],
        newtimes:'',
        //货物
        freightTotalNum:'',
        airFreight:'',
        waterFreight:'',
        transFreight:'',
        roadFreight:'',
        fdataarr:[],
        fcountarr:[],
        fmonth:'',
        //人员
        personTotalNum:'',
        personWaterCount:'',
        personAirCount:'',
        pdataarr:[],
        pcountarr:[],
        pmonth:'',
        //运输工具
        transTotalNum:'',
        transShipCount:'',
        transAirCount:'',
        tdataarr:[],
        tcountarr:[],
        tmonth:'',
      }
    },
    mounted() {
    },
	 watch:{

	 },
    created() {
      this.getmessage();
      this.showData();
      this.showData1();
      this.showData2();
    },
    methods: {
       godetails(n){
            this.$router.push({name: 'kaxjcontentpage',
              params:{ 
                res:n
              }
            })
       },
       getmessage(res){
            var that = this;
            axios.post('/eport-server/data/getIndexDataInfo.do',{
                
            })
            .then(function(res){
                that.freightTotalNum = res.data.data.freightTotalNum;
                that.airFreight = res.data.data.airFreight;
                that.waterFreight = res.data.data.waterFreight;
                that.transFreight = res.data.data.transFreight;
                that.roadFreight = res.data.data.roadFreight;
                that.personTotalNum = res.data.data.personTotalNum;
                that.personWaterCount = res.data.data.personWaterCount;
                that.personAirCount = res.data.data.personAirCount;
                that.transTotalNum = res.data.data.transTotalNum;
                that.transShipCount = res.data.data.transShipCount;
                that.transAirCount = res.data.data.transAirCount;
                that.fdataarr = [];
                that.fcountarr = [];
                for (let i = 0; i < res.data.data.freightData.length; i++) {
                  that.fdataarr.push(res.data.data.freightData[i].dateTime);
                  that.fcountarr.push(parseFloat(res.data.data.freightData[i].monthNum));
                  that.fmonth = res.data.data.freightData[i].dateTime.substring(res.data.data.freightData[i].dateTime.length-2,res.data.data.freightData[i].dateTime.length);
                }
                that.pdataarr = [];
                that.pcountarr = [];
                for (let i = 0; i < res.data.data.personData.length; i++) {
                  that.pdataarr.push(res.data.data.personData[i].dateTime);
                  that.pcountarr.push(parseFloat(res.data.data.personData[i].monthNum));
                  that.pmonth = res.data.data.personData[i].dateTime.substring(res.data.data.personData[i].dateTime.length-2,res.data.data.personData[i].dateTime.length);
                }
                that.tdataarr = [];
                that.tcountarr = [];
                for (let i = 0; i < res.data.data.transData.length; i++) {
                  that.tdataarr.push(res.data.data.transData[i].dateTime);
                  that.tcountarr.push(parseFloat(res.data.data.transData[i].monthNum));
                  that.tmonth = res.data.data.transData[i].dateTime.substring(res.data.data.transData[i].dateTime.length-2,res.data.data.transData[i].dateTime.length);
                }
                that.showData();
                that.showData1();
                that.showData2();
                HighCharts.chart(that.id,that.option)
                HighCharts.chart(that.id1,that.option1)
                HighCharts.chart(that.id2,that.option2)
            })
            .catch(function(err){
                console.log(err);
            });
       },
      showData: function() {
        this.id = "test";
        this.option = {
          chart: {
            type: 'spline' //指定图表的类型，默认是折线图（spline）column
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false //去掉地址
          },
          title:{
                style: {
                    color: '#666',
                    fontSize: '15px'
                },
                text: '最近三月总量统计',
                align: 'left'
          },
          colors: ['#2696E1'],
          xAxis: {
            categories: this.fdataarr, //指定x轴分组
            tickWidth: 0
          },
          yAxis: {
            title: {
              text: '', //指定y轴的标题
            },
            labels: {
                enabled: false//隐藏Y轴坐标
            },
            gridLineWidth: 0
          },
          plotOptions: {
            spline: {
                dataLabels: {
                    style: {
                        color: '#2696E1',
                        fontSize: '13px',
                        fontWeight: 400
                    },
                    enabled: true
                },
            },
            column: {
              colorByPoint: true//length>1样式
            },
          },
          series: [{
            name: ' ',
            data: this.fcountarr
          }],
        };
      },
      showData1: function() {
        this.id1 = "test1";
        this.option1 = {
          chart: {
            type: 'spline' //指定图表的类型，默认是折线图（spline）column
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false //去掉地址
          },
          title:{
                style: {
                    color: '#666',
                    fontSize: '15px'
                },
                text: '最近三月总量统计',
                align: 'left'
          },
          colors: ['#FF6E42'],
          xAxis: {
            categories: this.pdataarr, //指定x轴分组
            tickWidth: 0,
          },
          yAxis: {
            title: {
              text: '', //指定y轴的标题
            },
            labels: {
                enabled: false//隐藏Y轴坐标
            },
            gridLineWidth: 0
          },
          plotOptions: {
            spline: {
                dataLabels: {
                    style: {
                        color: '#FF6E42',
                        fontSize: '13px',
                        fontWeight: 400
                    },
                    enabled: true
                },
            },
            column: {
              colorByPoint: true//length>1样式
            },
          },
          series: [{
            name: ' ',
            data: this.pcountarr
          }],
        };
      },
      showData2: function() {
        this.id2 = "test2";
        this.option2 = {
          chart: {
            type: 'spline' //指定图表的类型，默认是折线图（spline）column
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false //去掉地址
          },
          title:{
                style: {
                    color: '#666',
                    fontSize: '15px'
                },
                text: '最近三月总量统计',
                align: 'left'
          },
          colors: ['#BF9FF5'],
          xAxis: {
            categories: this.tdataarr, //指定x轴分组
            tickWidth: 0
          },
          yAxis: {
            title: {
              text: '', //指定y轴的标题
            },
            labels: {
                enabled: false//隐藏Y轴坐标
            },
            gridLineWidth: 0
          },
          plotOptions: {
            spline: {
                dataLabels: {
                    style: {
                        color: '#666',
                        fontSize: '13px',
                        fontWeight: 400
                    },
                    enabled: true
                },
            },
            column: {
              colorByPoint: true//length>1样式
            },
          },
          series: [{
            name: ' ',
            data: this.tcountarr
          }],
        };
      },
    }
  }
</script>
<style>
*{
    font-family: PingFangSC !important;
}
#chart{
    background: #f5f5f5;
}
  #test {
    width: 100%;
    height: 45.667vw;
    margin: 0px auto;
    position: relative;
    margin-bottom: 18px;
  }
  #test1 {
    width: 100%;
    height: 45.667vw;
    margin: 0 auto;
    position: relative;
    margin-bottom: 18px;
  }
  #test2 {
    width: 100%;
    height:45.667vw;
    margin: 0 auto;
    position: relative;
    margin-bottom: 18px;
  }
  .topway{
    padding: 1.867vw 0;
    height: 25.333vw;
    color: #333;
    font-weight: 600;
    background: #fff;
    border-bottom: 8px solid #f5f5f5;
  }
  .way{
    float: left;
    width: 24%;
    padding-left: 7%;
    text-align: left;
  }
  .way_ele0{
      height: 45px;
  }
  .way_ele{
      padding:2px 0;
  }
  .way_ele2{
      color: #999;
      font-weight: 500;
  }
  .qiche {
        border: 0;
        width: 32px;
        height: 24px;
    }
  .chuan {
        border: 0;
        width: 32px;
        height: 28px;
    }
  .feiji {
        border: 0;
        width: 44px;
        height: 44px;
    }
  .tielu {
        border: 0;
        width: 26px;
        height: 32px;
    }
    .quantum{
        padding: 1.867vw 4.533vw;
        color: #333;
        font-size: 12pt;
        background: #fff;
    }
    .numbers{
        float: right;
    }
</style>