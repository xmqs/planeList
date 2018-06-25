<template>
	<div id="MonthSelect">
		<div v-show="myrili">
			<div style="height: 45px;background: #fff;line-height: 45px;text-align: center;position: fixed; width: 100%;bottom: 250px;z-index:999999;">
				<span style="padding-left: 14px;float: left;color:#285FB1;font-size: 15px;" @click="quxiao">取消</span>
				<span style="font-size: 16px;">选择日期</span><span @click="queding" style="font-size: 15px;color:#285FB1;padding-right: 14px;float: right;">确定</span>
			</div>
			<div class="controldata">
				<div  v-for="(year,yearIndex) in years" :key="yearIndex">
					<div class="MyYear month">{{year.year}}</div>
					<p v-for="(mon,monthIndex) in year.months" @click="select(year.year,mon.month,yearIndex,monthIndex)" 
						class="month" :class="mon.slected ? 'selected' : ''" :key="monthIndex">
						{{mon.month}}月<span class="begin_end" v-show="mon.start"><br />开始</span><span class="begin_end" v-show="mon.end"><br />结束</span>
					</p>
				</div>
			</div>
		</div>
		<div class="isrili" @click="isrili">
			{{myselsetdata}}<span style="color: #fff;font-size: 3vw;position: relative;top: -1px;right: -4px;">▲</span>
		</div>
	</div>
</template>
<script>
    import { Toast } from 'mint-ui'
    export default {
		name:'MonthSelect',
         data() {
			return {
				myrili:false,
				myselsetdata:'选择日期',
				start:"201607",
				end:"201807",
				years:[],
				selectedMonths:[],//{month:'02',slected:false}
				// 点击的月份数组， 最多有两个数据
				clickedBtn:[]
			}
		},
        methods: {
			isrili(){
				this.myrili = !this.myrili;
			},
			quxiao(){
				this.myselsetdata = '选择日期';
				this.myrili = false;
			},
			queding(){
				if (this.selectedMonths[0] == undefined) {
					this.myselsetdata = this.clickedBtn[0].year+'年'+this.clickedBtn[0].month+'月';
				} else {
					var n = this.selectedMonths.length;
					this.myselsetdata = this.selectedMonths[0].replace('-','年')+'月'+'-'+this.selectedMonths[n - 1].replace('-','年')+'月'
				}
				this.myrili = false;
			},
			creatdate(n){
				var arr = [];
				var arr1 = [];
				var startyear = 2017;
				var endyear = 2018;
				var startmonth;
				var endmonth;
				//年份
				if(n == startyear){
						startmonth = 1;
						endmonth = 12;
						//月份
						for(var j =startmonth;j<endmonth + 1;j++){
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
						startmonth = 1;
						endmonth = 5;
						//月份
						for(var j =startmonth;j<endmonth + 1;j++){
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
				console.log(this.years)
			},
			select:function(year, month,yearIndex,monthIndex) {
				console.log(this.selectedMonths.length)
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
						this.years[yearIndex].months[monthIndex].end = true;
						//比较日期大小
						if (this.clickedBtn[0].year > year) {
							this.selectedMonths = this.getMonthAll(year+'-'+month,this.clickedBtn[0].year+'-'+this.clickedBtn[0].month);
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
							// for(var i=yearIndex;i<this.years.length;i++){
							// 	for(var j=0;j<monthIndex;j++){
							// 		this.years[i].months[j].slected = true;
							// 	}
							// }
							// for(var i=yearIndex-1;i<this.years.length;i++){
							// 	for(var j=0;j<12;j++){
							// 		this.years[i].months[j].slected = true;
							// 	}
							// }
							this.selectedMonths = this.getMonthAll(this.clickedBtn[0].year+'-'+this.clickedBtn[0].month,year+'-'+month);
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
							} else {
								this.selectedMonths = this.getMonthAll(this.clickedBtn[0].year+'-'+this.clickedBtn[0].month,year+'-'+month);
							}
						}
						// 计算和上一个月份之间的所有月份
						this.clickedBtn = [];
						console.log(this.selectedMonths)
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
			}
        },
        created:function() {
			for(var j =2017;j<2018 + 1;j++){
				this.creatdate(j);
			}
            Date.prototype.format=function (){
				var s='';
				s+=this.getFullYear()+'-';          // 获取年份。
				s+=(this.getMonth()+1)+"-";         // 获取月份。
				s+= this.getDate();                 // 获取日。
				return(s);                          // 返回日期。
			};
        }
    }

</script>
<style>
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
	height: 67vw;
    position: fixed;
    width: 100%;
    bottom: 0;
    overflow: auto;
	padding-bottom: 100px;
}
.month{
    float: left;
    height: 14.333vw;
    width: 12.333vw;
    margin: 3vw 2vw;
    text-align: center;
    line-height: 14.333vw;
}
.selected{
	background: #285FB1;
	color: #fff;
}
.begin_end{
	    text-align: center;
    position: relative;
    top: -9.867vw;
    font-size: 0.3vw;
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


