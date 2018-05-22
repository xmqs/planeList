<template>
	<div class="content-page uk-body">
		<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			预计航班日期
			<img @click="bus(varietys)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			<div style="height: 40px;background-color: #285fb1;">
				<div class="xingqi">日</div>
				<div class="xingqi">一</div>
				<div class="xingqi">二</div>
				<div class="xingqi">三</div>
				<div class="xingqi">四</div>
				<div class="xingqi">五</div>
				<div class="xingqi">六</div>
			</div>
		</header>
		<div class="calendar">
			<table class="sign_tab" border="0px" cellpadding="0px" cellspacing="0px">
				<tbody>
					<tr>
						<td colspan="7">
							<span>{{year}}年{{month}}月</span>
						</td>
					</tr>
					<tr v-for="item in dateArr">
						<td v-for="data in item" v-if="isCheck(data)">
							
						</td>
						<td v-else-if="data ==''" :class="{ 'over':data == data}">
							
						</td>
						<td v-else-if="data  < nowday " :class="{ 'over':data == clickData, 'passBy': data < nowday}">
							{{data}}
						</td>
						<td @click="selectDay(data)" v-else-if="data == nowday " :class="{ 'over':data == clickData, 'cur_day': data == clickData}">
							今天
						</td>
						<td @click="selectDay(data)" v-else :class="{ 'over':data == clickData, 'cur_day': data == clickData}">
							{{data}}
						</td>
					</tr>
					<tr>
						<td style="height: 30px;" colspan="7">
							<span>{{year1}}年{{month1}}月</span>
						</td>
					</tr>
					<tr v-for="item in dateArr1">
						<td v-for="data in item" v-if="isCheck(data)">
							
						</td>
						<td v-else-if="data ==''" :class="{ 'over':data == data}">
							
						</td>
						<td @click="selectDay1(data)" v-else :class="{ 'over':data == clickData1, 'cur_day': data == clickData1}">
							{{data}}
						</td>
					</tr>
					<tr>
						<td style="height: 30px;" colspan="7">
							<span>{{year2}}年{{month2}}月</span>
						</td>
					</tr>
					<tr v-for="item in dateArr2">
						<td v-for="data in item" v-if="isCheck(data)">
							
						</td>
						<td v-else-if="data ==''" :class="{ 'over':data == data}">
							
						</td>
						<td @click="selectDay2(data)" v-else :class="{ 'over':data == clickData2, 'cur_day': data == clickData2}">
							{{data}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	import Bus from '../cwty/bus.js'
	export default {
		data() {
			return {
				varietys:"",
				today : new Date(),
				year : '',
				month : '',
				year1 : '',
				month1 : '',
				year2 : '',
				month2 : '',
				dateArr: [],
				dateArr1: [],
				dateArr2: [],
				checkin: [],
				clickData:"",
				clickData1:"",
				clickData2:"",
				nowday:"",
			};
		},
		created() {
			this.year = this.today.getFullYear();
			this.month = this.today.getMonth() + 1;
			this.year1 = this.today.getFullYear();
			this.month1 = this.today.getMonth() + 1;
			this.year2 = this.today.getFullYear();
			this.month2 = this.today.getMonth() + 1;
			this.clickData = this.today.getDate();
			this.nowday = this.today.getDate();
			this.varietys = this.year+"年"+this.month+"月"+this.today.getDate()+"日";
			
			this.getCalendar();
			this.getCalendar1();
			this.getCalendar2();
		},
		methods: {
			bus (res) {
			    setTimeout(() => {
			        Bus.$emit('riqi', res)
			    }, 30)
		        this.$router.back(-1)
		    },
			selectDay(data){
				this.clickData = data;
				this.clickData1 = "";
				this.clickData2 = "";
				this.varietys = this.year+"年"+this.month+"月"+data+"日";
				console.log(this.year+"年"+this.month+"月"+data+"日")
			},
			selectDay1(data){
				this.clickData1 = data;
				this.clickData = "";
				this.clickData2 = "";
				this.varietys = this.year1+"年"+this.month1+"月"+data+"日";
				console.log(this.year1+"年"+this.month1+"月"+data+"日")
			},
			selectDay2(data){
				this.clickData2 = data;
				this.clickData1 = "";
				this.clickData = "";
				this.varietys = this.year2+"年"+this.month2+"月"+data+"日";
				console.log(this.year2+"年"+this.month2+"月"+data+"日")
			},
			/*计算平年 闰年*/
			isLeap() {
				const year = this.year;
				if(year % 4 == 0 && year % 100 > 0) {
					return true;
				}else if(year % 400 == 0 && year % 3200 > 0) {
					return true;
				}else {
					return false;
				}
			},
			/*判断一个月的天数*/
			getLen() {
				const month = this.month;
				if(month == 2) {
					if(this.isLeap) {
						return 29;
					}else {
						return 28;
					}
				}else {
					if(month < 8) {
						if(month % 2 > 0) {
							return 31;
						}else {
							return 30;
						}
					}else {
						if(month % 2 > 0) {
							return 30;
						}else {
							return 31;
						}
					}
				}
			},
			/*存入数组*/
			getCalendar() {
				var len = this.getLen();
				var d = new Date(this.year, this.month - 1, 1);
				var dfw = d.getDay();
				var arr = new Array();
				var tem = 0;
				for (var i = 0; i < 6; i++) {
					arr[i] = new Array();
					for (var j = 0; j < 7; j++) {
						tem++;
						if (tem - dfw > 0 && tem - dfw <= len) {
							arr[i][j] = tem - dfw;
						} else {
							arr[i][j] = "";
						}
					}
				}
				this.dateArr = arr;
			},
			/*计算平年 闰年*/
			isLeap1() {
				const year = this.year1;
				if(year % 4 == 0 && year % 100 > 0) {
					return true;
				}else if(year % 400 == 0 && year % 3200 > 0) {
					return true;
				}else {
					return false;
				}
			},
			/*判断一个月的天数*/
			getLen1() {
				const month = this.month1;
				if(month == 2) {
					if(this.isLeap1) {
						return 29;
					}else {
						return 28;
					}
				}else {
					if(month < 8) {
						if(month % 2 > 0) {
							return 31;
						}else {
							return 30;
						}
					}else {
						if(month % 2 > 0) {
							return 30;
						}else {
							return 31;
						}
					}
				}
			},
			getCalendar1() {
				if(this.month1 == 12) {
					this.year1 ++;
					this.month1 = 1;
				}else {
					this.month1 ++;
				};
				var len = this.getLen1();
				var d = new Date(this.year, this.month1 - 1, 1);
				var dfw = d.getDay();
				var arr = new Array();
				var tem = 0;
				for (var i = 0; i < 6; i++) {
					arr[i] = new Array();
					for (var j = 0; j < 7; j++) {
						tem++;
						if (tem - dfw > 0 && tem - dfw <= len) {
							arr[i][j] = tem - dfw;
						} else {
							arr[i][j] = "";
						}
					}
				}
				this.dateArr1 = arr;
			},
			/*判断一个月的天数*/
			getLen2() {
				const month = this.month2;
				if(month == 2) {
					if(this.isLeap1) {
						return 29;
					}else {
						return 28;
					}
				}else {
					if(month < 8) {
						if(month % 2 > 0) {
							return 31;
						}else {
							return 30;
						}
					}else {
						if(month % 2 > 0) {
							return 30;
						}else {
							return 31;
						}
					}
				}
			},
			getCalendar2() {
				if(this.month2 == 11) {
					this.year2 ++;
					this.month2 = 1;
				}else if(this.month2 == 12){
					this.year2 ++;
					this.month2 = 2;
				}else{
					this.month2 = this.month2 + 2;
				};
				var len = this.getLen2();
				var d = new Date(this.year, this.month2 - 1, 1);
				var dfw = d.getDay();
				var arr = new Array();
				var tem = 0;
				for (var i = 0; i < 6; i++) {
					arr[i] = new Array();
					for (var j = 0; j < 7; j++) {
						tem++;
						if (tem - dfw > 0 && tem - dfw <= len) {
							arr[i][j] = tem - dfw;
						} else {
							arr[i][j] = "";
						}
					}
				}
				this.dateArr2 = arr;
			},
			isCheck(index) {
				for(let i in this.dateArr) {
					if(index == this.dateArr[i]) {
						return true;
					}
				}
				return false;
			}
		}
	};
</script>

<style type="text/css">
	*{font-family: PingFangSC;}
	.xingqi{float: left;width: 14%;margin-left: 1px;font-size: 14px;}
	.calendar{width:100%;margin:100px 0px 20px 0px;color:#555;position: relative;}
	.calendar {text-align: center;font-size: 22px;font-weight: 700;margin-bottom:0px;}
	.calendar button {position: absolute;width: 24px;height: 24px;top: 15px;border: none;}
	.calendar button:focus { border: none;outline: none; }
	.calendar .sign_tab{width: 100%;border-collapse: collapse;border-top: 0;table-layout: fixed;}
	th{background: #285fb1;color: #fff;}
	.calendar .sign_tab th{text-align: center;font-size: 14px;font-weight: 700;padding: 7px 0;}
	.calendar .sign_tab td{line-height: 34px;height: 30px;text-align: center;font-size:14px;font-family: arial;}
	.calendar .sign_tab td.over{background-color: #fff;border-left: 0;border-right: 0;}
	.calendar .sign_tab td.cur_day{background-color: #285FB1 !important;color: #FFF;}
	.passBy{background: #f3f3f3;color: #ccc;}
</style>