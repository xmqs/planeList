<template>
    <div id="home">
        <!--头部临时用-->
        <div class="page-tab-container">
            <div style="width: 100%;" class="">
                <div class="swipe-wrapper">
                    <mt-swipe :speed="1300" :auto="5000" ref="swipeWrapper">
                        <mt-swipe-item v-for="ele in imageMenuList" class="item">
                            <img class="swpUrl" @click="targetUrl(ele.targetUrl)" :src="ele.iconUrl"/>
                            <!-- <img class="swpUrl" @click="targetUrl(ele.targetUrl)" src="http://222.190.243.8:8080/s/img/20180628/3A2A2DD13C1E49B1B4B0B31A269FB7C3.jpg"/> -->
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div style="display: inline-block;width: 100%;background: #fff;">
                    <!--<router-link :to="{path: '/kaxw/kaxw_list/'+'news_tuijian'+'/'+0}">
                        <div class="tips" type="default">口岸新闻</div>
                    </router-link>
                    <div @click="token">
                        <div class="tips" type="default">手机值机</div>
                    </div>
                    <router-link :to="{path:'flight/Destination'}">
                        <div class="tips" type="default">航班动态</div>
                    </router-link>
                    <router-link :to="{path:'hwcx/hwcx'}">
                        <div class="tips" type="default">货物查询</div>
                    </router-link>
 
                    <div @click="goback()">
                        <div class="tips" type="default">私人物品</div>
                    </div>
                        <div class="tips" type="default">def</div>
                        <div class="tips" type="default">def</div>-->
                    <!--<div @click="goback()">
                        <div class="tips" type="default">私人物品</div>
                    </div>-->
                    <div v-for="ele1 in menuList" @click="goothers(ele1.targetUrl)" class="tips" type="default">
                        <img class="iconUrl" :src="ele1.iconUrl"/>
                        <!-- <img class="iconUrl" src="../../static/img/test/Group1.png" alt=""> -->
                        <div class="icontitle">
                            {{ele1.title}}
                        </div>
                    </div>
                </div>
                
                
                <div class="block">
                    <div style="height: 61px;font-size: 18px;color: #333;border-bottom: 1px solid #f5f5f5;border-top: 10px solid #f5f5f5;line-height: 50px;margin-top: -7px;">
                    <ul>
                        <li class="tab" :class="{'mybottom':active === 'tab-container1'}" @click="selectmenu('tab-container1')">货物</li>
                        <li class="tab" :class="{'mybottom':active === 'tab-container2'}" @click="selectmenu('tab-container2')">人员</li>
                        <li class="tab" :class="{'mybottom':active === 'tab-container3'}" @click="selectmenu('tab-container3')">运输工具</li>
                    </ul>
                    </div>
                    <el-carousel @change="handleChange" :autoplay="true" :interval="4500" arrow="never">
                    <el-carousel-item>
                        <!-- 统计图1 -->
                        <div @click="godetails('tab1')">
                            <div class="quantum"><span>进出口货物量（万吨）-{{fmonth}}月</span><span class="numbers">总量{{freightTotalNum}}</span></div>
                            <div class="topway">
                                    <div class="way">
                                            <div class="way_ele0"><img class="chuan" src="../../static/img/kasj/chuan.png" alt=""></div>
                                            <div style="color:#2FCAA0;" class="way_ele">{{waterFreight}}</div>
                                            <div style="color:#2FCAA0;" class="way_ele2">水运</div>
                                    </div>
                                    <div class="way">
                                            <div class="way_ele0"><img class="feiji" src="../../static/img/kasj/feiji.png" alt=""></div>
                                            <div style="color:#4F83F1;" class="way_ele">{{airFreight}}</div>
                                            <div style="color:#4F83F1;" class="way_ele2">空运</div>
                                    </div>
                                    <div class="way">
                                            <div class="way_ele0"><img class="tielu" src="../../static/img/kasj/tielu.png" alt=""></div>
                                            <div style="color:#8F8F8F;" class="way_ele">{{transFreight}}</div>
                                            <div style="color:#8F8F8F;" class="way_ele2">铁路</div>
                                    </div>
                                    <div class="way">
                                            <div class="way_ele0"><img class="qiche" src="../../static/img/kasj/qiche.png" alt=""></div>
                                            <div style="color:#EF9623;" class="way_ele">{{roadFreight}}</div>
                                            <div style="color:#EF9623;" class="way_ele2">公路</div>
                                    </div>
                            </div>
                        </div>
                        <div :id="id" :option="option"></div>
                    </el-carousel-item>
                    <el-carousel-item>
                        <!-- 统计图2 -->
                        <div @click="godetails('tab2')">
                            <div class="quantum"><span>出入境人员总数（万人次）-{{pmonth}}月</span><span class="numbers">总量{{personTotalNum}}</span></div>
                            <div class="topway">
                                    <div style="width:49%" class="way">
                                            <div class="way_ele0"><img class="chuan" src="../../static/img/kasj/chuan.png" alt=""></div>
                                            <div style="color:#2FCAA0;" class="way_ele">{{personWaterCount}}</div>
                                            <div style="color:#2FCAA0;" class="way_ele2">水运</div>
                                    </div>
                                    <div style="width:49%" class="way">
                                            <div class="way_ele0"><img class="feiji" src="../../static/img/kasj/feiji.png" alt=""></div>
                                            <div style="color:#4F83F1;" class="way_ele">{{personAirCount}}</div>
                                            <div style="color:#4F83F1;" class="way_ele2">空运</div>
                                    </div>
                            </div>
                        </div>
                        <div :id="id1" :option="option1"></div>
                    </el-carousel-item>
                    <el-carousel-item>
                        <!-- 统计图3 -->
                        <div @click="godetails('tab3')">
                            <div class="quantum"><span>进出境运输工具（辆艘）-{{tmonth}}月</span><span class="numbers">总量{{transTotalNum}}</span></div>
                            <div class="topway">
                                    <div style="width:49%" class="way">
                                            <div class="way_ele0"><img class="chuan" src="../../static/img/kasj/chuan.png" alt=""></div>
                                            <div style="color:#2FCAA0;" class="way_ele">{{transShipCount}}</div>
                                            <div style="color:#2FCAA0;" class="way_ele2">船舶</div>
                                    </div>
                                    <div style="width:49%" class="way">
                                            <div class="way_ele0"><img class="feiji" src="../../static/img/kasj/feiji.png" alt=""></div>
                                            <div style="color:#4F83F1;" class="way_ele">{{transAirCount}}</div>
                                            <div style="color:#4F83F1;" class="way_ele2">飞机</div>
                                    </div>
                            </div>
                        </div>
                        <div :id="id2" :option="option2"></div>
                    </el-carousel-item>
                </el-carousel>
                </div>
                
                <!-- <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
                        <mt-tab-container-item id="tab-container1">
                                统计图1
                                <div @click="godetails('tab1')">
                                    <div class="quantum"><span>进出口货物量（万吨）-{{fmonth}}月</span><span class="numbers">总量{{freightTotalNum}}</span></div>
                                    <div class="topway">
                                            <div class="way">
                                                    <div class="way_ele0"><img class="chuan" src="../../static/img/kasj/chuan.png" alt=""></div>
                                                    <div style="color:#2FCAA0;" class="way_ele">{{waterFreight}}</div>
                                                    <div style="color:#2FCAA0;" class="way_ele2">水运</div>
                                            </div>
                                            <div class="way">
                                                    <div class="way_ele0"><img class="feiji" src="../../static/img/kasj/feiji.png" alt=""></div>
                                                    <div style="color:#4F83F1;" class="way_ele">{{airFreight}}</div>
                                                    <div style="color:#4F83F1;" class="way_ele2">空运</div>
                                            </div>
                                            <div class="way">
                                                    <div class="way_ele0"><img class="tielu" src="../../static/img/kasj/tielu.png" alt=""></div>
                                                    <div class="way_ele">{{transFreight}}</div>
                                                    <div class="way_ele2">铁路</div>
                                            </div>
                                            <div class="way">
                                                    <div class="way_ele0"><img class="qiche" src="../../static/img/kasj/qiche.png" alt=""></div>
                                                    <div style="color:#EF9623;" class="way_ele">{{roadFreight}}</div>
                                                    <div style="color:#EF9623;" class="way_ele2">公路</div>
                                            </div>
                                    </div>
                                </div>
                                
                                <div :id="id" :option="option"></div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="tab-container2"> -->
                                <!-- 统计图2 -->
                                <!-- <div @click="godetails('tab2')">
                                    <div class="quantum"><span>出入境人员总数（万人次）-{{pmonth}}月</span><span class="numbers">总量{{personTotalNum}}</span></div>
                                    <div class="topway">
                                            <div style="width:49%" class="way">
                                                    <div class="way_ele0"><img class="chuan" src="../../static/img/kasj/chuan.png" alt=""></div>
                                                    <div style="color:#2FCAA0;" class="way_ele">{{personWaterCount}}</div>
                                                    <div style="color:#2FCAA0;" class="way_ele2">水运</div>
                                            </div>
                                            <div style="width:49%" class="way">
                                                    <div class="way_ele0"><img class="feiji" src="../../static/img/kasj/feiji.png" alt=""></div>
                                                    <div style="color:#4F83F1;" class="way_ele">{{personAirCount}}</div>
                                                    <div style="color:#4F83F1;" class="way_ele2">空运</div>
                                            </div>
                                    </div>
                                </div>
                                <div :id="id1" :option="option1"></div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="tab-container3"> -->
                                <!-- 统计图3 -->
                                <!-- <div @click="godetails('tab3')">
                                    <div class="quantum"><span>进出境运输工具（辆艘）-{{tmonth}}月</span><span class="numbers">总量{{transTotalNum}}</span></div>
                                    <div class="topway">
                                            <div style="width:49%" class="way">
                                                    <div class="way_ele0"><img class="chuan" src="../../static/img/kasj/chuan.png" alt=""></div>
                                                    <div style="color:#2FCAA0;" class="way_ele">{{transShipCount}}</div>
                                                    <div style="color:#2FCAA0;" class="way_ele2">船舶</div>
                                            </div>
                                            <div style="width:49%" class="way">
                                                    <div class="way_ele0"><img class="feiji" src="../../static/img/kasj/feiji.png" alt=""></div>
                                                    <div style="color:#4F83F1;" class="way_ele">{{transAirCount}}</div>
                                                    <div style="color:#4F83F1;" class="way_ele2">飞机</div>
                                            </div>
                                    </div>
                                </div>
                                <div :id="id2" :option="option2"></div>
                        </mt-tab-container-item>
                </mt-tab-container> -->
                <!-- <div class="mt-cell mt-cell-st" @click="gokaxwdetails(element.sourceId)" v-for="(element,index) in pageList" :key="index">
                    <div style="color: #666666">
                        <div v-if="element.cover">
                            <img class="pd-img"  :src="element.cover">
                            <p style="width: 58%;" class="label-name">{{element.sourceLabel}}</p>
                        </div>
                        <div v-else>
                            <p class="label-name">{{element.sourceLabel}}</p>
                        </div>
                        <p class="time-name">{{element.author}} {{element.createTime | formatDate}}</p>
                    </div>
                </div>
                <div style="width: 100%;background: rgb(255, 255, 255);height: 70px;line-height: 70px;margin-top: -16px;padding-top: 28px;line-height: 61px;">
                    <div @click="gokaxw" class="more">
                        查看更多
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script scoped>
    import axios from "axios";
    import { Toast } from 'mint-ui'
  import HighCharts from 'highcharts'
    import { formatDate } from '../assets/js/date.js';
    export default {
        name: "home",
    www:"",
        data() {
            return {
                searchCondition:{  //分页属性
                  channelAlias:"news_tuijian",
                  pageNo:"1",
                  pageSize:"3"
                },
                pageList:[],
                imageMenuList:[],
                        menuList:[],
                        active:'tab-container1',
                        //图表
                        id: '',
                        option: {},
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
        watch: {
 
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            }
        },
        mounted() {
            if (window.location.href.indexOf('isGuest=yes') != -1) {
                    sessionStorage.setItem('isGuest', 'yes')
                    console.log('yes')
            } else {
                    sessionStorage.setItem('isGuest', 'no')
                    console.log('no')
            }
            //auth.getAccessToken({appId:"elecPort"});
        },
        created() {
            var flag = true;
            if(sessionStorage.getItem('userifo') == null){
				setInterval(() => {
                    if(sessionStorage.getItem('userifo') != null){
                        if (flag == true) {
                            this.getall();
                        }
                        flag = false;
                    }else{
                        flag = true;
                    }
				}, 1000)
            }else{
                this.getlist();
                this.getmessage();
                this.showData();
                this.showData1();
                this.showData2();
            }
        },
        methods: {
            getall(){
                this.getlist();
                this.getmessage();
                this.showData();
                this.showData1();
                this.showData2();
            },
            handleChange(res){
                if (res == 0) {
                    this.active = 'tab-container1';
                } else if (res == 1){
                    this.active = 'tab-container2';
                } else if (res == 2){
                    this.active = 'tab-container3';
                }
            },
       godetails(n){
                 console.log(n)
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
          tooltip : {
            formatter : function (){ // 提示框格式化字符串
                 var s = this.x+ ':' + this.y;
                 return s;
             },
          },
          title:{
                style: {
                    color: '#333',
                                        fontSize: '13px',
                },
                                text: '  最近一年总量统计',
                                align: 'left',
                                x: 7
          },
          colors: ['#2696E1'],
          xAxis: {
            categories: this.fdataarr, //指定x轴分组
            tickWidth: 0,
            labels:{
              x:14,//调节x偏移
              //y:-35,//调节y偏移
              //rotation:25//调节倾斜角度偏移
            }
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
            name: '进出口货物量',
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
          tooltip : {
            formatter : function (){ // 提示框格式化字符串
                 var s = this.x+ ':' + this.y;
                 return s;
             },
          },
          title:{
                style: {
                    color: '#333',
                    fontSize: '13px'
                },
                text: '最近一年总量统计',
                                align: 'left',
                                x: 7
          },
          colors: ['#FF6E42'],
          xAxis: {
            categories: this.pdataarr, //指定x轴分组
            tickWidth: 0,
            labels:{
              x:14,//调节x偏移
              //y:-35,//调节y偏移
              //rotation:25//调节倾斜角度偏移
            }
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
          tooltip : {
            formatter : function (){ // 提示框格式化字符串
                 var s = this.x+ ':' + this.y;
                 return s;
             },
          },
          title:{
                style: {
                    color: '#333',
                    fontSize: '13px'
                },
                text: '最近一年总量统计',
                                align: 'left',
                                x: 7
          },
          colors: ['#BF9FF5'],
          xAxis: {
            categories: this.tdataarr, //指定x轴分组
            tickWidth: 0,
            labels:{
              x:14,//调节x偏移
              //y:-35,//调节y偏移
              //rotation:25//调节倾斜角度偏移
            }
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
            selectmenu(res){
                this.active = res;
            },
            /*testfly(){
                this.$router.push({name: 'flightMain'});
            },*/
      targetUrl(res){
        if (res != "" && res != null && res != undefined) {
          window.location = res;
        }
      },
            goback(){
                this.$router.push({name: 'srwp_list',
                    params:{
                        res:'tab-container1'
                    }
                })
            },
            goothers(res){
                console.log(res)
                window.location = res;
            },
            select_item(){
 
            },
            gokaxw(){
                //this.$router.push({path: '/hotel/hotel'})
                this.$router.push({path: '/kaxw/kaxw_list/'+'news_tuijian'+'/'+0})
            },
            gokaxwdetails(res){
                 this.$router.push({path: '/kaxw/kaxw_details/'+ res +'/'+ this.searchCondition.channelAlias})
            },
            getlist(){
                 var _that = this;
                // axios.get('/web-editor-web/channel/list.do?', {
                //     params: _that.searchCondition
                // }).then(function(res) {
                //     console.log(res.data)
                //     _that.pageList = [];
                //     for(var j = 0; j < res.data.data.length; j++) {
                //         _that.pageList.push(res.data.data[j])
                //     }
                // })
                // .catch(function(err){
                //     Toast('网络出错')
                // });
                    
                axios.get('/eport-server/index/menu/query.do?channel=MYNJ', {
                    // params:{
                    //     channel:'MYNJ',
                    //     userType:'游客',
                    //     menuType:'菜单',
                    // }
                }).then(function(res) {
                    _that.imageMenuList = [];
                    _that.imageMenuList = res.data.data.imageMenuList
                    _that.menuList = [];
                    _that.menuList = res.data.data.menuList
                })
                .catch(function(err){
                    Toast('网络出错')
                });
            },
            token(){
                var userinfo = sessionStorage.getItem('userifo');
                userinfo = JSON.parse(userinfo);
                axios.post('/eport-server/checkin/reminder.do', {
                    idNumber:userinfo.idNumber,
                    telephone:userinfo.phone
                })
                .then(function (response) {
                    window.location = response.data.data;
                })
                .catch(function(err){
                    Toast('网络出错')
                });
            }/*,
            zhiji:function(){
                var that = this;
                axios.post('/eport-server/checkin/reminder.do', {
                    idNumber:"320322199401121818",
                    telephone:"13880522168"
                })
                .then(function (response) {
                    //console.log(response.data.data);
                    window.location = response.data.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },*/,
      flightM:function () {
        window.location += "flight";
      }
 
        }
    }
</script>
<style scoped>
    *{
      -webkit-overflow-scrolling: touch;
    }
  html {
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
    /*解决chrome浏览器下字体不能小于12px*/ }
 
  body {
    overflow-x: auto;
    font-size: 14px;
    color: #333;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    background: #f5f5f5;
  }
    .tab{
        float: left;
        width: 23%;
        text-align: center;
        height: 92px;
        line-break: 51px;
        margin: 0 5%;
        color: #666666;
        font-size:32px;
font-family:PingFangSC-Regular;
    }
    .ele{
    width: 100%;
    }
    .mybottom{
    border-bottom: 0.7vw solid #285fb1;
        height: 13.567vw;
    color: #285fb1;
    }
  a {
    outline: none;
    text-decoration: none;
    color: inherit; }
 
  a:hover {
    text-decoration: none; }
 
  html {
    zoom: 1; }
 
  html * {
    outline: 0;
    zoom: 1; }
 
  html button::-moz-focus-inner {
    border-color: transparent !important; }
 
  /*设置margin和padding为0*/
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0; }
 
  table {
    border-collapse: collapse;
    border-spacing: 0; }
 
  fieldset, a img {
    border: 0; }
 
  address, caption, cite, code, dfn, em, th, var，i {
    font-style: normal;
    font-weight: normal; }
 
  li {
    list-style: none; }
 
  caption, th {
    text-align: left; }
 
  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal; }
 
  q:before, q:after {
    content: ''; }
 
  em, i {
    font-style: normal; }
 
  input[type="submit"], input[type="reset"], input[type="button"], input[type=date], button, select, input[type=text] {
    /*去掉苹果的默认UI来渲染按钮 、解决部分手机浏览器对border：none无效办法*/
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /*去掉微信端input-text在ios轻快下的点击出先黑色半透明背景*/
    tap-highlight-color: transparent !important; }
 
  a, input[type=text], select, input[type=password], textarea {
    /*去掉微信端input-text在ios轻快下的点击出先黑色半透明背景*/
    tap-highlight-color: transparent !important; }
 
  input::-webkit-input-placeholder {
    color: #aaa; }
 
    /*轮播组件*/
    .swipe-wrapper{
        width: 100%;
        height: 33vw;
        background: #fff;
    }
    .swipe-wrapper1{
        width: 100%;
        height: 85vw;
        background: #fff;
    }
    .item{
        text-align: center;
        font-size: 40px;
        color: white;
    }
 
    .button-wrapper{
        display: flex;
        height: 100px;
    }
    .flex-item{
        flex: 1;
        display: inline-block;
        text-align: center;
        height: 100%;
        line-height: 100%;
        font-size: 40px;
    }
   /* list样式*/
 
    .time-name {
        position: absolute;
        left: 40px;
        bottom: 25px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        color:rgba(153,153,153,1);
        line-height:24px;
    }
    .pd-img{
        margin-top: 13px;
        position: absolute;
        top: 10px;
        right: 33px;
        width: 224px;
        height: 146px;
    }
    .label-name {
        position: absolute;
        left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 29px 54px 29px 32px;
        font-size:32px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        line-height:47px;
        height: 94px;
 
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
        overflow: hidden;
    }
        .mt-cell-st {
        position: relative;
        width:750px;
        height:192px;
        background:rgba(255,255,255,1);
        border-bottom: 1px solid #F5F5F5;
    }
    .allitems{
        width: 100%;
        height: 90px;
        line-height: 90px;
        font-size: 32px;
        border-bottom: 1px solid #f5f5f5;
        background: #fff;
        margin-top:12px;
    }
    .items{
        float: left;
        width: 21%;
        border: 0;
        text-align: center;
        margin: 0 2%;
    }
    .class-a {
        border-bottom: 4px solid #3385e3 !important;
        color: #3385e3;
        height: 88px;
    }
    .more{
        width: 270px;
        height: 66px;
        text-align: center;
        line-height: 66px;
        border-radius: 100px;
        border: 1px solid #444;
        color: #444;
        margin: 0 auto;
        background: #fff;
        font-size: 28px;
    }
    .tips{
        width: 50%;
        float: left;
        height: 180px;
        line-height: 180px;
        text-align: center;
        font-size: 34px;
        border-bottom: 1px solid #f6f6f6;
        border-left: 1px solid #f6f6f6;
        position: relative;
            font-family:PingFangSC-Regular;
color:rgba(51,51,51,1);
    }
    .swpUrl{
        width: 100%;
    }
    .iconUrl{
        height: 94px;
        width: 94px;
        position: absolute;
        top: 6vw;
        left: 4.533vw;
    }
    .icontitle{
        margin-left: 20.5vw;
        text-align: left;
    }
    /* 图表 */
    
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
            font-size: 36px;
  }
  .way_ele2{
      color: #999;
      font-weight: 500;
            font-size: 24px;
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
        width: 33px;
        height: 33px;
    }
  .tielu {
        border: 0;
        width: 26px;
        height: 32px;
    }
    .quantum{
        padding: 1.867vw 4.533vw;
        color: #333;
        background: #fff;
                font-size:26px;
                    text-align: left;
    }
    .numbers{
        float: right;
    }
    .block{
        height: 98vw;
    }
</style>
<style>
    .mint-toast-text {
        font-size: 3.8vw !important;
    }
    .mint-tab-container {
            width: 100%;
    }
    .mint-swipe{
        width: 100%;
    }
    .el-carousel__container {
    position: relative;
    height: 82vw !important;
}
    .el-carousel {
    overflow-x: hidden;
    position: relative;
    top: -100px;
    width: 100%;
    padding-top: 100px !important;
        padding-bottom: 0 !important;
}
.el-carousel__indicators {
    position: absolute;
    list-style: none;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    z-index: 0;
    top: 0;
    width: 100%;
}
.el-carousel__indicator {
    display: inline-block;
    background-color: transparent;
    padding: 1.6vw 6.533vw !important;
    cursor: pointer;
    /* width: 33%; */
    margin: 0 7%;
    height: 80px;
}
</style>