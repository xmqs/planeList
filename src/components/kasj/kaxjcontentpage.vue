<template>
	<div id="kaxjcontentpage" class="hairsplines">
		<child ref="whateverName"></child>
		<div class="allkasjele">
			<div @click="checkkasj('tab1')" :class="{'kasjstyle':active == 'tab1'}" class="kasjele">货物</div>
			<div @click="checkkasj('tab2')" :class="{'kasjstyle':active == 'tab2'}" class="kasjele">人员</div>
			<div @click="checkkasj('tab3')" :class="{'kasjstyle':active == 'tab3'}" class="kasjele">运输工具</div>
		</div>
		<div class="page-tab-container">  
			<mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>  
				<mt-tab-container-item id="tab1">
					<div class="selectSearch">
						<el-select @change="selectitem" v-model="selected1" placeholder="请选择">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="bb" v-show="element == 1">
						<div class="message">
							<div class="messcol">
								<div class="messline">指标</div>
								<div class="messline">货运量（万吨）</div>
								<div class="messline">同比（%）</div>
							</div>
							<div class="messcol">
								<div class="messline">水运</div>
								<div class="messline">{{waterFreight}}</div>
								<div v-if="waterPercent < 0" class="messline" style="color:#72B478">{{waterPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{waterPercent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">空运</div>
								<div class="messline">{{airFreight}}</div>
								<div v-if="airPercent < 0" class="messline" style="color:#72B478">{{airPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{airPercent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">铁路</div>
								<div class="messline">{{transFreight}}</div>
								<div v-if="transPercent < 0" class="messline" style="color:#72B478">{{transPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{transPercent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">公路</div>
								<div class="messline">{{roadFreight}}</div>
								<div v-if="roadPercent < 0" class="messline" style="color:#72B478">{{roadPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{roadPercent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">合计</div>
								<div class="messline">{{totalNum}}</div>
								<div v-if="totalPercent < 0" class="messline" style="color:#72B478">{{totalPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{totalPercent}}</div>
							</div>
						</div>
						<div :id="id" :option="option">
						</div>
							<div class="allcost" style="height: 17%;width: 29%;bottom: 33.8vw;"><p style="width:95%;font-size: 11px;text-align: center;margin-top: 30%;margin-left: 3px;color: #f9e1e1;">进出口货物总量{{totalNum}}万吨</p></div>
						
					</div>
					<div class="aa" v-show="element != 1">
						<div class="message">
							<div class="messcol">
								<div class="messline">月份</div>
								<div class="messline">货运量（万吨）</div>
								<div class="messline">同比（%）</div>
							</div>
							<div v-for="(ele,index) in lists" class="messcol" :key="index">
								<div class="messline">{{ele.dateTime}}</div>
								<div class="messline">{{ele.monthNum}}</div>
								<div v-if="ele.percent < 0" class="messline" style="color:#72B478">{{ele.percent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{ele.percent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">总计</div>
								<div class="messline">{{allnum}}</div>
								<div v-if="allPercent < 0" class="messline" style="color:#72B478">{{allPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{allPercent}}</div>
							</div>
						</div>
						<div :id="id1" :option="option2"></div>
					</div>
				</mt-tab-container-item>  

				<mt-tab-container-item id="tab2">
					<div class="selectSearch">
						<el-select @change="selectitem" v-model="selected2" placeholder="请选择">
							<el-option
							v-for="item in options1"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="bb" v-show="element == 1">
						<div class="message">
							<div class="messcol">
								<div class="messline">指标</div>
								<div class="messline">总数（万人次）</div>
								<div class="messline">同比（%）</div>
							</div>
							<div class="messcol">
								<div class="messline">空运</div>
								<div class="messline">{{airCount}}</div>
								<div v-if="airPercent < 0" class="messline" style="color:#72B478">{{airPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{airPercent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">水运</div>
								<div class="messline">{{waterCount}}</div>
								<div v-if="waterPercent < 0" class="messline" style="color:#72B478">{{waterPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{waterPercent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">合计</div>
								<div class="messline">{{totalNum}}</div>
								<div v-if="totalPercent < 0" class="messline" style="color:#72B478">{{totalPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{totalPercent}}</div>
							</div>
						</div>
						<div :id="rid" :option="roption">
						</div>
							<div class="allcost" style="bottom: 23.5vw;height: 21%;"><p style="width:96%;font-size: 12px;text-align: center;margin-top: 29%;margin-left: 3px;color: #f9e1e1;">出入境人员总数{{totalNum}}万人次</p></div>
					</div>
					<div class="aa" v-show="element != 1">
						<div class="message">
							<div class="messcol">
								<div class="messline">月份</div>
								<div class="messline">总数（万人次）</div>
								<div class="messline">同比（%）</div>
							</div>
							<div v-for="(ele,index) in lists" class="messcol" :key="index">
								<div class="messline">{{ele.dateTime}}</div>
								<div class="messline">{{ele.monthNum}}</div>
								<div v-if="ele.percent < 0" class="messline" style="color:#72B478">{{ele.percent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{ele.percent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">总计</div>
								<div class="messline">{{allnum}}</div>
								<div v-if="allPercent < 0" class="messline" style="color:#72B478">{{allPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{allPercent}}</div>
							</div>
						</div>
						<div :id="rid1" :option="roption2"></div>
					</div>
				</mt-tab-container-item>  

				<mt-tab-container-item id="tab3">
					<div class="selectSearch">
						<el-select @change="selectitem" v-model="selected3" placeholder="请选择">
							<el-option
							v-for="item in options2"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="bb" v-show="element == 1">
						<div class="message">
							<div class="messcol">
								<div class="messline">指标</div>
								<div class="messline">架次</div>
								<div class="messline">同比（%）</div>
							</div>
							<div class="messcol">
								<div class="messline">飞机</div>
								<div class="messline">{{airCount}}</div>
								<div v-if="airPercent < 0" class="messline" style="color:#72B478">{{airPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{airPercent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">船舶</div>
								<div class="messline">{{shipCount}}</div>
								<div v-if="shipPercent < 0" class="messline" style="color:#72B478">{{shipPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{shipPercent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">合计</div>
								<div class="messline">{{totalNum}}</div>
								<div v-if="totalPercent < 0" class="messline" style="color:#72B478">{{totalPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{totalPercent}}</div>
							</div>
						</div>
						<div :id="yid" :option="yoption">
						</div>
							<div class="allcost" style="bottom: 23.5vw;height: 21%;"><p style="width:96%;font-size: 12px;text-align: center;margin-top: 29%;margin-left: 3px;color: #f9e1e1;">进出境运输工具{{totalNum}}辆艘</p></div>
					</div>
					<div class="aa" v-show="element != 1">
						<div class="message">
							<div class="messcol">
								<div class="messline">月份</div>
								<div class="messline">架次</div>
								<div class="messline">同比（%）</div>
							</div>
							<div v-for="(ele,index) in lists" class="messcol" :key="index">
								<div class="messline">{{ele.dateTime}}</div>
								<div class="messline">{{ele.monthNum}}</div>
								<div v-if="ele.percent < 0" class="messline" style="color:#72B478">{{ele.percent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{ele.percent}}</div>
							</div>
							<div class="messcol">
								<div class="messline">总计</div>
								<div class="messline">{{allnum}}</div>
								<div v-if="allPercent < 0" class="messline" style="color:#72B478">{{allPercent}}</div>
								<div v-else class="messline" style="color:#FF801A">{{allPercent}}</div>
							</div>
						</div>
						<div :id="yid1" :option="yoption2"></div>
					</div>
				</mt-tab-container-item>  
			</mt-tab-container>
			<!-- 日期选择 -->
			<div v-show="myrili">
				<div style="height: 45px;background: #fff;line-height: 45px;text-align: center;position: fixed; width: 100%;bottom: 250px;z-index:999999;">
					<span style="padding-left: 14px;float: left;color:#285FB1;font-size: 15px;" @click="quxiao">取消</span>
					<span style="font-size: 16px;">选择日期</span><span @click="queding" style="font-size: 15px;color:#285FB1;padding-right: 14px;float: right;">确定</span>
				</div>
				<div class="controldata" id="soll">
					<div  v-for="(year,yearIndex) in years" :key="yearIndex">
						<div class="MyYear month">{{year.year}}</div>
						<p v-for="(mon,monthIndex) in year.months" @click="select(year.year,mon.month,yearIndex,monthIndex)" 
							class="month" :class="mon.slected ? 'selected' : ''" :key="monthIndex">
							{{mon.month}}月<span class="begin_end" v-show="mon.start"><br /></span><span class="begin_end" v-show="mon.end"><br /></span>
						</p>
					</div>
				</div>
			</div>
			<div v-show="myrili" style="position: fixed;width: 100%;height: 100%;top: 0;z-index: 9;background-color: #3333337a;"></div>
			<div class="isrili" @click="isrili">
				{{myselsetdata}}<span style="color: #fff;font-size: 3vw;position: relative;top: -1px;right: -4px;">▲</span>
			</div>
			</div> 
	</div>
</template>

<script>
	import axios from "axios";
    import { Toast } from 'mint-ui'
	import HighCharts from 'highcharts'
	//import MonthSelect from '@/components/base/date/MonthSelect'
	export default {
		name: "kaxjcontentpage",
		data() {
			return {
				scrollTop:0,
				getstarttime:'',
				getendtime:'',
				getstarttimeM:'',
				getendtimeM:'',
				myrili:false,
				myselsetdata:'选择日期',
				start:"201607",
				end:"201807",
				years:[],
				selectedMonths:[],//{month:'02',slected:false}
				// 点击的月份数组， 最多有两个数据
				clickedBtn:[],
				isfirst:true,
				interval:'',
				startDate:'',
				endtDate:'',
				selsetyear:[],
				selsetmonth:[],
				dataarr:[],
				nums:0,
				element:1,
				options: [{
				value: '1',
				label: '货物总指标'
				}, {
				value: '2',
				label: '进出口货运总量'
				}, {
				value: '3',
				label: '水运'
				}, {
				value: '4',
				label: '空运'
				},{
				value: '5',
				label: '铁路'
				}, {
				value: '6',
				label: '公路'
				}, {
				value: '7',
				label: '集装箱吞吐量'
				}, {
				value: '8',
				label: '国际邮快递总数'
				}],
				selected1:'货物总指标',
				options1: [{
				value: '1',
				label: '人员总指标'
				}, {
				value: '2',
				label: '人员总量'
				}, {
				value: '3',
				label: '空运'
				}, {
				value: '4',
				label: '水运'
				}],
				selected2:'人员总指标',
				options2: [{
				value: '1',
				label: '运输工具总指标'
				}, {
				value: '2',
				label: '运输工具总量'
				}, {
				value: '3',
				label: '飞机'
				}, {
				value: '4',
				label: '船舶'
				}],
				selected3:'运输工具总指标',
				active:'tab1',
				sleecttime:'2017年1月-2017年12月',
				id: '',
				option: {},
				id1: '',
				option2: {},
				rid1: '',
				roption2: {},
				yid1: '',
				yoption2: {},
				rid: '',
				roption: {},
				yid: '',
				yoption: {},
				years:[],
				monthes:[],
				//货物
				airFreight:'',
				airPercent:'',
				roadFreight:'',
				roadPercent:'',
				transFreight:'',
				transPercent:'',
				waterFreight:'',
				waterPercent:'',
				//人员 //运输
				airCount:'',
				airPercent:'',
				waterCount:'',
				waterPercent:'',
				
				shipCount:'',
				shipPercent:'',
				//all
				totalNum:'',
				totalPercent:'',
				dataType:1,
				lists:[],
				allnum:'',
				allPercent:'',
				//混合图表
				mydate:[],
				mypercent:[],
				mycount:[],

			}
		},
		watch: {
			active: function(newValue) {
				this.checkkasj(newValue);
			}
		},
		methods: {
			isrili(){
				this.myrili = !this.myrili;
			},
			quxiao(){
				this.myrili = false;
			},
			queding(){
				sessionStorage.setItem('scroll',document.getElementById("soll").scrollTop)
				document.getElementById("soll").scrollTop = sessionStorage.getItem('scroll');
				sessionStorage.removeItem('scroll');
				console.log(this.selectedMonths)
				if (this.selectedMonths[0] == undefined) {
					this.myselsetdata = this.clickedBtn[0].year+'年'+this.clickedBtn[0].month+'月';
					this.startDate = this.clickedBtn[0].year+'-'+this.clickedBtn[0].month;
					this.endDate = this.clickedBtn[0].year+'-'+this.clickedBtn[0].month;
				} else {
					var n = this.selectedMonths.length;
					this.myselsetdata = this.selectedMonths[0].replace('-','年')+'月'+'-'+this.selectedMonths[n - 1].replace('-','年')+'月'
					this.startDate = this.selectedMonths[0];
					this.endDate = this.selectedMonths[this.selectedMonths.length - 1];
				}
				
				this.isfirst = false;
				if (this.active == 'tab1') {
					this.dataType = 1;
				} else if (this.active == 'tab2'){
					this.dataType = 2;
				} else if (this.active == 'tab3'){
					this.dataType = 3;
				}
				this.element = 1;
				this.gettimes();

				this.selectitem();
				this.myrili = false;
			},
			creatdate(n){
				var arr = [];
				var arr1 = [];
				var startyear = this.getstarttime;
				var endyear = this.getendtime;
				
				var startyearM = this.getstarttimeM;
				var endyearM = this.getendtimeM;
				var startmonth;
				var endmonth;
				//年份
				if(n == startyear){
						startmonth = parseInt(startyearM);
						//月份
						for(var j =startmonth;j<12 + 1;j++){
							var obj = {};
							obj.month = j;
							obj.slected = false;
							obj.start = false;
							obj.end = false;
							arr1.push(obj)
						}
						var obj1 = {};
						obj1.year = n;
						obj1.months = arr1;
						this.years.push(obj1)
				}else if(n == endyear){
						endmonth = parseInt(endyearM);
						//月份
						for(var j =1;j<endmonth + 1;j++){
							var obj = {};
							obj.month = j;
							obj.slected = false;
							obj.start = false;
							obj.end = false;
							arr1.push(obj)
						}
						var obj1 = {};
						obj1.year = n;
						obj1.months = arr1;
						this.years.push(obj1)
				}
			},
			select:function(year, month,yearIndex,monthIndex) {
				console.log(this.selectedMonths)
				if (this.selectedMonths.length < 3) {
					this.years[yearIndex].months[monthIndex].slected = true;
					if(month<10){
						month = 0+month.toString()
					}
					if (this.clickedBtn.length == 0) {
						this.years[yearIndex].months[monthIndex].start = true;
						this.clickedBtn.push({
							year:year,
							month: month
						});
					} else {
						if(this.clickedBtn[0].year+this.clickedBtn[0].month != year+month){
							this.years[yearIndex].months[monthIndex].end = true;
							//比较日期大小
							if (this.clickedBtn[0].year > year) {
								this.selectedMonths = this.getMonthAll(year+'-'+month,this.clickedBtn[0].year+'-'+this.clickedBtn[0].month);
								for(var i=0;i<this.years.length;i++){
									var yr = this.years[i].year;
									for(var j=0;j<this.years[i].months.length;j++){
										if(this.years[i].months[j].month < 10){
											if(this.selectedMonths.indexOf(yr+'-'+'0'+this.years[i].months[j].month) > -1){
												this.years[i].months[j].slected = true;
											}
										}else{
											if(this.selectedMonths.indexOf(yr+'-'+this.years[i].months[j].month) > -1){
												this.years[i].months[j].slected = true;
											}
										}
									}
								}
								if (this.selectedMonths.length > 12) {
									Toast('所选日期范围不能超过12个月');
									this.selectedMonths = [];
									for(var i=0;i<this.years.length;i++){
										for(var j=0;j<this.years[i].months.length;j++){
											this.years[i].months[j].slected = false;
											this.years[i].months[j].start = false;
											this.years[i].months[j].end = false;
										}
									}
								}
							}else if(this.clickedBtn[0].year < year){
								this.selectedMonths = this.getMonthAll(this.clickedBtn[0].year+'-'+this.clickedBtn[0].month,year+'-'+month);
								for(var i=0;i<this.years.length;i++){
									var yr = this.years[i].year;
									for(var j=0;j<this.years[i].months.length;j++){
										if(this.years[i].months[j].month < 10){
											if(this.selectedMonths.indexOf(yr+'-'+'0'+this.years[i].months[j].month) > -1){
												this.years[i].months[j].slected = true;
											}
										}else{
											if(this.selectedMonths.indexOf(yr+'-'+this.years[i].months[j].month) > -1){
												this.years[i].months[j].slected = true;
											}
										}
									}
								}
								if (this.selectedMonths.length > 12) {
									Toast('所选日期范围不能超过12个月');
									this.selectedMonths = [];
									for(var i=0;i<this.years.length;i++){
										for(var j=0;j<this.years[i].months.length;j++){
											this.years[i].months[j].slected = false;
											this.years[i].months[j].start = false;
											this.years[i].months[j].end = false;
										}
									}
								}
							}else if(this.clickedBtn[0].year == year){
								if (this.clickedBtn[0].month > month) {
									this.selectedMonths = this.getMonthAll(this.clickedBtn[0].year+'-'+month,year+'-'+this.clickedBtn[0].month);
								} else if(this.clickedBtn[0].month < month) {
									this.selectedMonths = this.getMonthAll(this.clickedBtn[0].year+'-'+this.clickedBtn[0].month,year+'-'+month);
								}else{
									this.selectedMonths = this.getMonthAll(this.clickedBtn[0].year+'-'+this.clickedBtn[0].month,year+'-'+month);
								}
								if (this.clickedBtn[0].month - month == 1 || this.clickedBtn[0].month - month == -1) {
									if(this.clickedBtn[0].month > month){
										this.selectedMonths.push(year+'-'+month)
										this.selectedMonths.push(year+'-'+this.clickedBtn[0].month)
									}else{
										this.selectedMonths.push(year+'-'+this.clickedBtn[0].month)
										this.selectedMonths.push(year+'-'+month)
									}
								}
								for(var i=0;i<this.years.length;i++){
									var yr = this.years[i].year;
									for(var j=0;j<this.years[i].months.length;j++){
										if(this.years[i].months[j].month < 10){
											if(this.selectedMonths.indexOf(yr+'-'+'0'+this.years[i].months[j].month) > -1){
												this.years[i].months[j].slected = true;
											}
										}else{
											if(this.selectedMonths.indexOf(yr+'-'+this.years[i].months[j].month) > -1){
												this.years[i].months[j].slected = true;
											}
										}
									}
								}
							}
							// 计算和上一个月份之间的所有月份
							this.clickedBtn = [];
						}
					}
				}else{
					this.selectedMonths = [];
					for(var i=0;i<this.years.length;i++){
						for(var j=0;j<this.years[i].months.length;j++){
							this.years[i].months[j].slected = false;
							this.years[i].months[j].start = false;
							this.years[i].months[j].end = false;
						}
					}
				}
			},
			getMonthAll(start,end) {
				var d1 = start;
				var d2 = end;
				var dateArry = new Array();
				var s1 = d1.split("-");
				var s2 = d2.split("-");
				var mCount = 0;
				if (parseInt(s1[0]) < parseInt(s2[0])) {
					mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) - parseInt(s1[1])+1;
				} else {
					mCount = parseInt(s2[1]) - parseInt(s1[1])+1;
				}
				if (mCount > 0) {
					var startM = parseInt(s1[1]);
					var startY = parseInt(s1[0]);
					for (var i = 0; i < mCount; i++) {
						if (startM < 12) {
							dateArry[i] = startY + "-" + (startM>9 ? startM : "0" + startM);
							startM += 1;
						} else {
							dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
							startM = 1;
							startY += 1;
						}
					}
				}
				return dateArry;
			},
			queding1(){
				// console.log(this.$refs.whateverName.dataList)
				// console.log(this.selsetyear[0],this.selsetmonth[1])
				// if(this.selsetyear[0] < this.selsetyear[1]){
				// 	if(this.selsetmonth[0] - this.selsetmonth[1] < 0){
				// 		this.myselsetdata = '选择日期';
				// 		Toast('所选日期范围不能超过12个月');
				// 		return;
				// 	}
				// }else if(this.selsetyear[0] > this.selsetyear[1]){
				// 	if(this.selsetmonth[0] - this.selsetmonth[1] > 0){
				// 		this.myselsetdata = '选择日期';
				// 		Toast('所选日期范围不能超过12个月');
				// 		return;
				// 	}
				// }
				// if (this.selsetyear[0] < this.selsetyear[1]) {
				// 	this.myselsetdata = this.selsetyear[0]+'年'+this.selsetmonth[0]+'月'+'-'+this.selsetyear[1]+'年'+this.selsetmonth[1]+'月'
				// 	this.startDate = this.selsetyear[0]+'-'+this.selsetmonth[0]
				// 	this.endDate = this.selsetyear[1]+'-'+this.selsetmonth[1]
				// }else if(this.selsetyear[0] == this.selsetyear[1]){
				// 	if (this.selsetmonth[0] > this.selsetmonth[1]) {
				// 		this.myselsetdata = this.selsetyear[0]+'年'+this.selsetmonth[1]+'月'+'-'+this.selsetyear[1]+'年'+this.selsetmonth[0]+'月'
				// 		this.startDate = this.selsetyear[0]+'-'+this.selsetmonth[1]
				// 		this.endDate = this.selsetyear[1]+'-'+this.selsetmonth[0]
				// 	} else {
						
				// 	}
				// } else {
				// 	this.myselsetdata = this.selsetyear[1]+'年'+this.selsetmonth[1]+'月'+'-'+this.selsetyear[0]+'年'+this.selsetmonth[0]+'月'
				// 	this.endDate = this.selsetyear[0]+'-'+this.selsetmonth[0]
				// 	this.startDate = this.selsetyear[1]+'-'+this.selsetmonth[1]
				// }
				// this.selsetmonth = [];
				// this.selsetyear = [];
				// this.isfirst = false;
				// if (this.active == 'tab1') {
				// 	this.dataType = 1;
				// 	this.settime('freightDate');
				// } else if (this.active == 'tab2'){
				// 	this.dataType = 2;
				// 	this.settime('personDate');
				// } else if (this.active == 'tab3'){
				// 	this.dataType = 3;
				// 	this.settime('transDate');
				// }
				// this.element = 1;
				// this.gettimes();

				// this.selectitem();
				// this.myrili = false;
			},
			checkkasj(res){
				var that = this;
				that.active = res;
				if (res == 'tab1') {
					that.dataType = 1;
				} else if (res == 'tab2'){
					that.dataType = 2;
				} else if (res == 'tab3'){
					that.dataType = 3;
				}
				that.myrili = false;
				that.element = 1;
				that.selected1 = '货物总指标';
				that.selected2 = '人员总指标';
				that.selected3 = '运输工具总指标';
				that.gettimes();
			},
			selectitem(){
				var that = this;
				that.gettimes();
				if(that.isfirst == true){
					var startstime = '';
					var endstime = '';
					if (that.active == 'tab1') {
						startstime = that.interval.freightDate.maxDate.substring(0,4);
						endstime = that.interval.freightDate.maxDate;
					} else if (that.active == 'tab2'){
						startstime = that.interval.personDate.maxDate.substring(0,4);
						endstime = that.interval.personDate.maxDate;
					} else if (that.active == 'tab3'){
						startstime = that.interval.transDate.maxDate.substring(0,4);
						endstime = that.interval.transDate.maxDate;
					}
					that.startDate = startstime+'-'+'01';
					that.endDate =  endstime;
					this.myselsetdata = that.startDate.replace('-','年')+'月'+'-'+that.endDate.replace('-','年')+'月';
				}
				if(that.selected1 != 1 && that.selected1 != 2 && that.selected2 != 1 && that.selected2 != 2 && that.selected3 != 1 && that.selected3 != 2){
					var typenum = 1;
					if (that.active == 'tab1') {
						that.element = that.selected1;
						typenum = parseInt(that.selected1) -2;
						if(that.selected1 == '货物总指标'){
							typenum = 1;
							that.element = 1;
						}
					} else if (that.active == 'tab2'){
						that.element = that.selected2;
						if (that.selected2 == 3){
							typenum = 8;
						} else if (that.selected2 == 4){
							typenum = 7;
						}
						if(that.element == '人员总指标'){
							that.element = 1;
						}
					} else if (that.active == 'tab3'){
						that.element = that.selected3;
						if (that.selected3 == 3){
							typenum = 9;
						} else if (that.selected3 == 4){
							typenum = 10;
						}
						if(that.element == '运输工具总指标'){
							that.element = 1;
						}
					}
					axios.post('/eport-server/data/getBaseDataInfo.do',{
						dataType:typenum,
						startDate:that.startDate,
						endDate:that.endDate,
					})
					.then(function(res){
						that.mydate = [];
						that.mycount = [];
						that.mypercent = [];
						if(res.data.data.monthData != undefined){
							that.lists = res.data.data.monthData;
							that.allnum = res.data.data.totalNum;
							that.allPercent = res.data.data.totalPercent;
							for(var i =0;i<that.lists.length;i++){
								that.mydate.push(that.lists[i].dateTime)
								that.mycount.push(parseFloat(that.lists[i].monthNum))
								that.mypercent.push(parseFloat(that.lists[i].percent))
							}
							that.showData1();
							HighCharts.chart(that.id1,that.option2)
							that.rshowData1();
							HighCharts.chart(that.rid1,that.roption2)
							that.yshowData1();
							HighCharts.chart(that.yid1,that.yoption2)
						}
					})
					.catch(function(err){
						console.log(err);
					});
				}else{
					var alltypenum = 0;
					if (that.active == 'tab1' && that.selected1 == 1) {
						that.element = that.selected1;
					} else if (that.active == 'tab2' && that.selected2 == 1){
						that.element = that.selected2;
					} else if (that.active == 'tab3' && that.selected3 == 1){
						that.element = that.selected3;
					}
					if (that.active == 'tab1' && that.selected1 == 2) {
						alltypenum = 1;
						that.element = that.selected1;
					} else if (that.active == 'tab2' && that.selected2 == 2){
						alltypenum = 2;
						that.element = that.selected2;
					} else if (that.active == 'tab3' && that.selected3 == 2){
						alltypenum = 3;
						that.element = that.selected3;
					}
					if (that.selected1 != 1 && that.selected2 != 1 && that.selected3 != 1) {
						axios.post('/eport-server/data/getMonthDataInfo.do',{
							dataType:alltypenum,
							startDate:that.startDate,
							endDate:that.endDate,
						})
						.then(function(res){
							that.mydate = [];
							that.mycount = [];
							that.mypercent = [];
							if(res.data.data.monthData != undefined){
								that.lists = res.data.data.monthData;
								that.allnum = res.data.data.totalNum;
								that.allPercent = res.data.data.totalPercent;
								for(var i =0;i<that.lists.length;i++){
									that.mydate.push(that.lists[i].dateTime)
									that.mycount.push(parseFloat(that.lists[i].monthNum))
									that.mypercent.push(parseFloat(that.lists[i].percent))
								}
								that.showData1();
								HighCharts.chart(that.id1,that.option2)
								that.rshowData1();
								HighCharts.chart(that.rid1,that.roption2)
								that.yshowData1();
								HighCharts.chart(that.yid1,that.yoption2)
							}
						})
						.catch(function(err){
							console.log(err);
						});
					}
				}
			},
			showData1(){
				var rightname;
				if (this.dataType == 1) {
					rightname = '货运量（万吨）'
				} else if (this.dataType == 2) {
					rightname = '总数（万人次）'
				} else if (this.dataType == 3) {
					rightname = '辆艘'
				}
				this.id1 = "test1";
				this.option2 = {
				title: {
					text:null,
				},
				legend: {
					enabled: false,
				},
				credits: {
					enabled: false //去掉地址
				},
				xAxis: [{
					categories: this.mydate,
					crosshair: true
				}],

				yAxis: [ { // Secondary yAxis
				title: {
					text: '同比（%）',
				},
				labels: {
					format: '{value}',
				},
				opposite: true
				},{ // Primary yAxis
					labels: {
							format: 
							'{value}',
					},
					title: {
							text: rightname,
					}
				}],
				tooltip: {
					shared: true
				},
				legend: {
					layout: 'vertical',
					align: 'left',
					x: 0,
					verticalAlign: 'top',
					y: -80,
					floating: true,
				},
				series: [{
					name: rightname,
					type: 'column',
					yAxis: 1,
					data: this.mycount,
					// tooltip: {
					// 		valueSuffix: ' mm'
					// }
				} ,{
					name: '同比（%）',
					type: 'spline',
					color:'#F7CAA6',
					data: this.mypercent,
					tooltip: {
							valueSuffix: '%'
					}
				}]
				};
			},
			rshowData1(){
				var rightname;
				if (this.dataType == 1) {
					rightname = '货运量（万吨）'
				} else if (this.dataType == 2) {
					rightname = '总数（万人次）'
				} else if (this.dataType == 3) {
					rightname = '辆艘'
				}
				this.rid1 = "rtest1";
				this.roption2 = {
				title: {
					text:null,
				},
				legend: {
					enabled: false,
				},
				credits: {
					enabled: false //去掉地址
				},
				xAxis: [{
					categories: this.mydate,
					crosshair: true
				}],
				yAxis: [ { // Secondary yAxis
				title: {
					text: '同比（%）',
				},
				labels: {
					format: '{value}',
				},
				opposite: true
				},{ // Primary yAxis
					labels: {
							format: '{value}',
					},
					title: {
							text: rightname,
					}
				}],
				tooltip: {
					shared: true
				},
				legend: {
					layout: 'vertical',
					align: 'left',
					x: 100,
					verticalAlign: 'top',
					y: -80,
					floating: true,
				},
				series: [{
					name: rightname,
					type: 'column',
					yAxis: 1,
					data: this.mycount,
					// tooltip: {
					// 		valueSuffix: ' mm'
					// }
				},{
					name: '同比（%）',
					type: 'spline',
					color:'#F7CAA6',
					data: this.mypercent,
					tooltip: {
							valueSuffix: '%'
					}
				}]
				};
			},
			yshowData1(){
				var rightname;
				if (this.dataType == 1) {
					rightname = '货运量（万吨）'
				} else if (this.dataType == 2) {
					rightname = '总数（万人次）'
				} else if (this.dataType == 3) {
					rightname = '辆艘'
				}
				this.yid1 = "ytest1";
				this.yoption2 = {
				title: {
					text:null,
				},
				legend: {
					enabled: false,
				},
				credits: {
					enabled: false //去掉地址
				},
				xAxis: [{
					categories: this.mydate,
					crosshair: true
				}],
				yAxis: [ { // Secondary yAxis
				title: {
					text: '同比（%）',
				},
				labels: {
					format: '{value}',
				},
				opposite: true
				},{ // Primary yAxis
					labels: {
							format: '{value}',
					},
					title: {
							text: rightname,
					}
				}],
				tooltip: {
					shared: true
				},
				legend: {
					layout: 'vertical',
					align: 'left',
					x: 100,
					verticalAlign: 'top',
					y: -80,
					floating: true,
				},
				series: [ {
					name: rightname,
					type: 'column',
					yAxis: 1,
					data: this.mycount,
					// tooltip: {
					// 		valueSuffix: ' mm'
					// }
				},{
					name: '同比（%）',
					type: 'spline',
					color:'#F7CAA6',
					data: this.mypercent,
					tooltip: {
							valueSuffix: '%'
					}
				}]
				};
			},
			gettimes(){//
				var that = this;
				var startstime = '';
				var endstime = '';
				if(that.isfirst == true){
					if (that.active == 'tab1') {
						endstime = that.interval.freightDate.maxDate;
					} else if (that.active == 'tab2'){
						endstime = that.interval.personDate.maxDate;
					} else if (that.active == 'tab3'){
						endstime = that.interval.transDate.maxDate;
					}
					that.startDate = endstime;
					that.endDate =  endstime;
					this.myselsetdata = endstime.replace('-','年')+'月';
				}

				axios.post('/eport-server/data/getTotalDataInfo.do',{
					dataType:that.dataType,
					startDate:that.startDate,
					endDate:that.endDate,
				})
				.then(function(res){
					if (that.dataType == 1) {
						that.totalNum = res.data.data.totalNum;
						that.airFreight = res.data.data.airFreight;
						that.roadFreight = res.data.data.roadFreight;
						that.transFreight = res.data.data.transFreight;
						that.waterFreight = res.data.data.waterFreight;
						that.totalPercent = res.data.data.totalPercent;
						that.airPercent = res.data.data.airPercent;
						that.roadPercent = res.data.data.roadPercent;
						that.transPercent = res.data.data.transPercent;
						that.waterPercent = res.data.data.waterPercent;
						that.showData();
						HighCharts.chart(that.id,that.option)
					} else if (that.dataType == 2){
						that.totalNum = res.data.data.totalNum;
						that.airCount = res.data.data.airCount;
						that.waterCount = res.data.data.waterCount;
						that.totalPercent = res.data.data.totalPercent;
						that.airPercent = res.data.data.airPercent;
						that.waterPercent = res.data.data.waterPercent;
						that.rshowData();
						HighCharts.chart(that.rid,that.roption)
					} else if (that.dataType == 3){
						that.totalNum = res.data.data.totalNum;
						that.totalPercent = res.data.data.totalPercent;
						that.airCount = res.data.data.airCount;
						that.airPercent = res.data.data.airPercent;
						that.shipCount = res.data.data.shipCount;
						that.shipPercent = res.data.data.shipPercent;
						that.yshowData();
						HighCharts.chart(that.yid,that.yoption)
					}
				})
				.catch(function(err){
					console.log(err);
				});
			},
			showData: function() {
				var arr = []
				if (this.dataType == 1) {
					arr = [['空运',parseFloat(this.airFreight)],['铁路',parseFloat(this.transFreight)],['公路',parseFloat(this.roadFreight)],['水运',parseFloat(this.waterFreight)]]
				} else if (this.dataType == 2){
					arr = [['空运',parseFloat(this.airCount)],['水运',parseFloat(this.waterCount)]]
				} else if (this.dataType == 3){
					arr = [['空运',parseFloat(this.airFreight)],['水运',parseFloat(this.shipCount)]]
				}
				this.id = "test";
				this.option = {
					title: {
						text:null,
					},
					legend: {
						enabled: false,
					},
					chart: {
						backgroundColor: 'transparent',
					},
					credits: {
						enabled: false //去掉地址
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								distance: 10,
								format: '<b>{point.name}</b>:<br /> {point.percentage:.2f} %',
								style: {
									fontSize:'12px',
								}
							}
						}
					},
					series: [{
						type: 'pie',
						size:'80%',  
                        innerSize: '70%',  
						name: '占比',
						data:arr
					}]
				};
			},
			rshowData: function() {
				var arr = []
				if (this.dataType == 1) {
					arr = [['空运',parseFloat(this.airFreight)],['铁路',parseFloat(this.transFreight)],['公路',parseFloat(this.roadFreight)],['水运',parseFloat(this.waterFreight)]]
				} else if (this.dataType == 2){
					arr = [['空运',parseFloat(this.airCount)],['水运',parseFloat(this.waterCount)]]
				} else if (this.dataType == 3){
					arr = [['空运',parseFloat(this.airFreight)],['水运',parseFloat(this.shipCount)]]
				}
				
				this.rid = "rtest";
				this.roption = {
					title: {
						text:null,
					},
					legend: {
						enabled: false,
					},
					chart: {
						backgroundColor: 'transparent',
					},
					credits: {
						enabled: false //去掉地址
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								distance: 10,
								format: '<b>{point.name}</b>:<br /> {point.percentage:.2f} %',
								style: {
									fontSize:'12px',
								}
							}
						}
					},
					series: [{
						type: 'pie',
						size:'80%',  
                        innerSize: '70%',  
						name: '占比',
						data:arr
					}]
				};
			},
			yshowData: function() {
				var arr = []
				if (this.dataType == 1) {
					arr = [['铁路',parseFloat(this.transFreight)],['水运',parseFloat(this.waterFreight)],['公路',parseFloat(this.roadFreight)],['空运',parseFloat(this.airFreight)]]
				} else if (this.dataType == 2){
					arr = [['空运',parseFloat(this.airCount)],['水运',parseFloat(this.waterCount)]]
				} else if (this.dataType == 3){
					arr = [['飞机',parseFloat(this.airCount)],['船舶',parseFloat(this.shipCount)]]
				}
				
				this.yid = "ytest";
				this.yoption = {
					title: {
						text:null,
					},
					legend: {
						enabled: false,
					},
					chart: {
						backgroundColor: 'transparent',
					},
					credits: {
						enabled: false //去掉地址
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								distance: 10,
								format: '<b>{point.name}</b>:<br /> {point.percentage:.2f} %',
								style: {
									fontSize:'12px',
								}
							}
						}
					},
					series: [{
						type: 'pie',
						size:'80%',  
                        innerSize: '70%',  
						name: '占比',
						data:arr
					}]
				};
			}
		},
		mounted() {

		},
		created: function() {
			var that = this;
			that.active = this.$route.params.res;
			axios.post('/eport-server/data/getDateList.do',{
			})
			.then(function(res){
				that.interval = res.data.data;
				if (that.active == 'tab1') {
					that.dataType = 1;
					that.getstarttime = that.interval.freightDate.minDate.substring(0,4);
					that.getendtime = that.interval.freightDate.maxDate.substring(0,4);
					if(that.interval.freightDate.maxDate.substring(that.interval.freightDate.minDate.length - 2,that.interval.freightDate.minDate.length-1) == 0){
						that.getstarttimeM = that.interval.freightDate.minDate.substring(that.interval.freightDate.minDate.length - 1,that.interval.freightDate.minDate.length);
					}else{
						that.getstarttimeM = that.interval.freightDate.minDate.substring(that.interval.freightDate.minDate.length - 2,that.interval.freightDate.minDate.length);
					}
					if(that.interval.freightDate.maxDate.substring(that.interval.freightDate.maxDate.length - 2,that.interval.freightDate.maxDate.length-1) == 0){
						that.getendtimeM = that.interval.freightDate.maxDate.substring(that.interval.freightDate.maxDate.length - 1,that.interval.freightDate.maxDate.length);
					}else{
						that.getendtimeM = that.interval.freightDate.maxDate.substring(that.interval.freightDate.maxDate.length - 2,that.interval.freightDate.maxDate.length);
					}
				} else if (that.active == 'tab2'){
					that.dataType = 2;
					that.getstarttime = that.interval.personDate.minDate.substring(0,4);
					that.getendtime = that.interval.personDate.maxDate.substring(0,4);

					if(that.interval.personDate.maxDate.substring(that.interval.personDate.minDate.length - 2,that.interval.personDate.minDate.length-1) == 0){
						that.getstarttimeM = that.interval.personDate.minDate.substring(that.interval.personDate.minDate.length - 1,that.interval.personDate.minDate.length);
					}else{
						that.getstarttimeM = that.interval.personDate.minDate.substring(that.interval.personDate.minDate.length - 2,that.interval.personDate.minDate.length);
					}
					if(that.interval.personDate.maxDate.substring(that.interval.personDate.maxDate.length - 2,that.interval.personDate.maxDate.length-1) == 0){
						that.getendtimeM = that.interval.personDate.maxDate.substring(that.interval.personDate.maxDate.length - 1,that.interval.personDate.maxDate.length);
					}else{
						that.getendtimeM = that.interval.personDate.maxDate.substring(that.interval.personDate.maxDate.length - 2,that.interval.personDate.maxDate.length);
					}
				} else if (that.active == 'tab3'){
					that.dataType = 3;
					that.getstarttime = that.interval.transDate.minDate.substring(0,4);
					that.getendtime = that.interval.transDate.maxDate.substring(0,4);

					if(that.interval.transDate.maxDate.substring(that.interval.transDate.minDate.length - 2,that.interval.transDate.minDate.length-1) == 0){
						that.getstarttimeM = that.interval.transDate.minDate.substring(that.interval.transDate.minDate.length - 1,that.interval.transDate.minDate.length);
					}else{
						that.getstarttimeM = that.interval.transDate.minDate.substring(that.interval.transDate.minDate.length - 2,that.interval.transDate.minDate.length);
					}
					if(that.interval.transDate.maxDate.substring(that.interval.transDate.maxDate.length - 2,that.interval.transDate.maxDate.length-1) == 0){
						that.getendtimeM = that.interval.transDate.maxDate.substring(that.interval.transDate.maxDate.length - 1,that.interval.transDate.maxDate.length);
					}else{
						that.getendtimeM = that.interval.transDate.maxDate.substring(that.interval.transDate.maxDate.length - 2,that.interval.transDate.maxDate.length);
					}

				}
				for(var j =that.getstarttime;j<that.getendtime + 1;j++){
					that.creatdate(j);
				}
				that.myrili = false;
				that.element = 1;
				that.selected1 = '货物总指标';
				that.selected2 = '人员总指标';
				that.selected3 = '运输工具总指标';
				that.gettimes();
				//that.settime('freightDate');
				that.showData();
				that.rshowData();
				that.yshowData();
				that.showData1();
				that.rshowData1();
				that.yshowData1();
			})
			.catch(function(err){
				console.log(err);
			});
		},
		filters: {

		}
	}
</script>

<style scoped>
	*{
		font-family: PingFangSC !important;
	    -webkit-overflow-scrolling: touch;
		color: #333;
	}
  #test {
    width: 100%;
    height: 70vw;
    margin: 0px auto;
    position: relative;
	margin-bottom: 12.5vw !important;
	margin-top: 3vw;
	z-index: 2
  }
  #test1 {
    width: 100%;
	height: 65vw;
    margin: 0px auto;
    position: relative;
	margin-bottom: 18px;
	margin-top: 3vw;
  }
  #rtest1 {
    width: 100%;
	height: 65vw;
    margin: 0px auto;
    position: relative;
	margin-bottom: 18px;
	margin-top: 3vw;
  }
  #ytest1 {
    width: 100%;
	height: 65vw;
    margin: 0px auto;
    position: relative;
	margin-bottom: 18px;
	margin-top: 3vw;
  }
  #rtest {
    width: 100%;
    height: 70vw;
    margin: 0px auto;
    position: relative;
	margin-bottom: 18px;
	margin-top: 3vw;
	z-index: 2
  }
  #ytest {
    width: 100%;
    height: 70vw;
    margin: 0px auto;
    position: relative;
	margin-bottom: 18px;
	margin-top: 3vw;
	z-index: 2
  }
	#kaxjcontentpage{
		position: absolute;
		height: 100%;
		width: 100%;
	}
	.kasjstyle{
		color: #285FB1 !important;
		border-bottom:6px solid #285FB1 !important;
	}
	.allkasjele{
    width: 100%;
    height: 11.333vw;
    line-height: 11.1vw;
    background: #fff;
    border-bottom: 1px solid #ccc;
	}
	.allcost{
    width: 29%;
    height: 15%;
    border-radius: 50%;
    background: #c23531;
    text-align: center;
    line-height: 1.5;
    position: absolute;
    bottom: 21.5vw;
    left: 35.5vw;
    z-index: 0;
	}
	.kasjele{
		color: #666;
	font-size: 4.3vw;
    float: left;
    width: 20%;
    text-align: center;
    margin: 0 6%;
	height: 11vw;
	border-bottom:6px solid #fff;
	}
	.mint-cell-value {
		color: #888;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		width: 100%;
	}
	.selectSearch select{    
		background-color: #ffffff;
		height: 22pt;
		border-radius: 4px;
		border: 1px solid #e3eaf0;
		padding: 1%;
		width: 160pt;
		text-align: center;
		line-height: 10pt;
		text-align: center;
	}
	.selectSearch{
		text-align: center;
		margin-top: 14px;
		padding-bottom:1vw;
		border-bottom: 2vw solid #f5f5f5;
	}
	.sanjiao{
	    display: inline-block;
	    width: 0;
	    height: 0;
	    line-height: 0;
	    border: 16px solid transparent;
	    border-top-color: #ccc;
		border-bottom-width: 0;
		position: absolute;
		margin-top: 20px;
    	margin-left: -52px;
	}
	.page-tab-container{
		padding: 0px;
		
	}
	.el-select-dropdown__item {
		font-size:4vw;
		padding: 0 0vw;
		position: relative;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #606266;
		height: 7.533vw;
		line-height: 7.533vw;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		cursor: pointer;
	}
	.el-select {
		height:10vw;
		width: 80%;
	}
	.message{
		width: 100%;
		text-align: center;
		background: #ffffff;
	    border-radius: 22px;
	}
	.messline{
		float: left;
		width: 32%;
		height: 88px;
		line-height: 88px;
	}
	.messcol{
		height:88px;
		border-bottom: 1px solid #f5f5f5;
	}
	.month{
    float: left;
    width: 11.667vw;
    margin: 2vw;
    background: #fff;
    color: #333;
    height: 100px;
    text-align: center;
    line-height: 100px;
	}
	.year{
    width: 100%;
    /* height: 46vw; */
    overflow: hidden;
	}
	.years{
    text-align: center;
    height: 80px;
    line-height: 80px;
    background: #F7F7F7;
	}
	.controldata{
		height: 590px;
		width: 100%;
		overflow-y: auto;
		position: fixed;
		z-index: 9;
		bottom: 0;
		background-color: #fff;
		padding-top: 90px;
	}
	.selectmonth{
		background: #285FB1;
		color: #fff;
	}
	.selectmonth1{
		background: #285FB1;
		color: #fff;
	}
	.isrili{
    height: 13.333vw;
    width: 100%;
    background: #3a4959;
    position: fixed;
    bottom: 0;
    z-index: 8;
    line-height: 13.333vw;
    text-align: center;
    color: #fff;
    font-size: 4.2vw;
	}
	.special{
		width: 100%;
		background-color: #f5f5f5;
		    margin: 0;
	}
	.aa{
		padding-bottom: 60px;
	}

	/* 日期选择 */
	
.MyYear{
    height: 90px !important;
    line-height: 90px !important;
	width: 100% !important;
    background: #f5f5f5 !important;
	padding: 0 !important;
	margin: 0 !important;
	text-align: center;
}
.controldata{
height: 77vw;
    position: fixed;
    width: 100%;
    bottom: 0;
    overflow: auto;
    background: #fff;
    z-index: 999;
}
.month{
    float: left;
    height: 14.333vw;
    width: 12.333vw;
    margin: 3vw 2vw;
    text-align: center;
    line-height: 14.333vw;
	border-radius: 8px;
}
.selected{
	background: #285FB1;
	color: #fff;
}
.begin_end{
	    text-align: center;
    position: relative;
    top: -9.7vw;
    font-size: 0.1vw;
	color: #fff;
}
.isrili{
	height: 13.333vw;
	width: 100%;
	background: #3a4959;
	position: fixed;
	bottom: 0;
	z-index: 8;
	line-height: 13.333vw;
	text-align: center;
	color: #fff;
	font-size: 4.2vw;
}
</style>
<style>

.el-input__inner {
	    border-radius: 1.5vw !important;
    height: 8.333vw !important;
	line-height: 5.333vw !important;
	    font-size: 30px;
}
.el-select-dropdown {
    background-color: #f5f5f5 !important;
}
.el-select .el-input__inner {
    background-color: #f5f5f5 !important;
}
.el-input__inner {
    background-color: #f5f5f5 !important;
	font-size:4.3vw !important;
}
.el-input__suffix {
    right: 2.5vw !important;
}
.el-select .el-input.is-focus .el-input__inner {
    border-color: #c0c4cc !important;
}
.el-select .el-input__inner:focus {
    border-color: #c0c4cc !important;
}
.el-select-dropdown__item span {
    line-height: 4.733vw!important;
}
.el-select-dropdown__wrap {
    max-height: 50.533vw;
}
.el-select-dropdown__list {
    list-style: none;
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>

