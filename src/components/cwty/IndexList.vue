<template>
	<div id="IndexList">
		<div class="inp">
			<!-- <span @click="goback" style="position: absolute;top: 6px;left: 0px;padding: 8px;">
				<img src="../../../static/img/back1.png"/>
			</span> -->
			<img style="width: 15px;position: absolute; top: 4.5vw;left: 8vw;" src="../../../static/img/Fill1.png"/><input class="inp_s searchdetails" placeholder="请输入搜索关键字" type="text" v-model="area" @keyup="selectArea"/>
		</div>
		<div v-show="thicity" class="mycity">{{active}}<span @click="acCity" style="float: right;padding: 0vw 2vw 0 5vw;">✖</span></div> 
		<div v-if="result" class="inp1">
			<div v-for="(ele,index) in resultCitys" class="citys" :key="index">
				<div @click="bus(ele)" class="routes routes1">
					{{ele}}
				</div>
			</div>
		</div>
		<mt-index-list v-if="lists"  :show-indicator="true">
				<mt-index-section v-for="(ele,index) in arealist" :index="ele.firstKey" :key="index">
					<span @click="bus(element.name)" v-for="(element,index) in ele.cities" :key="index">
						<mt-cell :class="{'class-city':active == element.name}" class="sp" :title="element.name"></mt-cell>
					</span>
				</mt-index-section>
		</mt-index-list>
	</div>
</template>

<script>
	import axios from "axios";
	import { formatDate } from '../../assets/js/date.js';
	import Bus from './bus.js'
	export default {
		name: "IndexList",
		data() {
			return {
				area:"",
				lists:true,
				result:false,
				resultCitys:[],
				arealist:[],
				active:'',
				thicity:false
			}
		},
		methods: {
			acCity(){
				this.active = '';
				this.thicity = false;
				setTimeout(() => {
					Bus.$emit('area', this.active)
				}, 200)
			},
			goback(){
				this.$router.back(-1)
			},
			bus (res) {
				this.active = res;
				this.thicity = true;
				setTimeout(() => {
					Bus.$emit('area', this.active)
				}, 200)
		        this.$router.back(-1)
		    },
			selectArea(){
				var searchcity = [];
				for(var i=0;i<this.arealist.length;i++){
					for(var j =0;j<this.arealist[i].cities.length;j++){
						var city = {};
						city.ping = this.arealist[i].cities[j].pinyin.toUpperCase();
						city.name = this.arealist[i].cities[j].name;
						searchcity.push(city);
					}
				}
				if (this.area != "") {
					this.result = true;
					this.lists = false;
					this.resultCitys = [];
					for(var i= 0;i<searchcity.length;i++){
						if (searchcity[i].name.indexOf(this.area) != -1 || searchcity[i].ping.indexOf(this.area.toUpperCase()) != -1) {
							this.resultCitys.push(searchcity[i].name)
						}
					}
				}else{
					this.result = false;
					this.lists = true;
				}
			},
			getList(){
				var that = this;
				axios.get('/eport-server/delivery/flight/queryCities.do').then(function(data) {
					that.arealist = data.data.data;
				})
			}
			
		},
		mounted() {

		},
		created: function() {
			this.getList()
		},
		filters: {

		}
	}
</script>

<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	.inp{
	    width: 100%;
		height: 13.867vw;
		background: rgb(239, 239, 244);
	}
	.mycity{
		    height: 11.5vw;
    line-height: 11.5vw;
    font-size: 4.4vw;
    padding-left: 1.5vw;
	border-bottom: 1px solid #f5f5f5;
	}
	.mint-cell-text{
		color: #333;
	    font-size: 32px;
	}
	.mint-indexsection-index {
	    margin: 0;
	    padding: 20px 24px !important;
	    background-color: #efeff4;
	}
	.mint-indexlist-nav{
    height: 100%;
    line-height: 4.5vw;
    /* border-radius: 1.067vw; */
    color: #333;
    position: absolute;
    top: 0!important;
    border-left: 0 solid #ddd;
    background: #efeff4 !important;
	}
	.class-city{
		background: #efeff4 !important;
	}
	.citys{
        color: #333;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    /* -webkit-box-align: center; */
	    -ms-flex-align: center;
	    align-items: center;
	    float: left;
	    width: 100%;
	    height: 80px;
	    background: #fff;
	    font-size: 32px;
	    padding-left:30px;
	}
	p{
		padding: 0px 12px 0px 12px !important;
    	line-height: 43px;
	}
	.routes{
		height: 80px;
	    width: 100%;
        color: #333;
	    line-height: 80px;
	}
	.routes1{
		border-bottom: 1px solid #f1f1f1;
	    padding: 0;
	    margin: 0;
	    width: 98%;
	}
	a {
	    width: 100%;
	}
	.sp{
	    height: 60px;
	    display: inline-block;
	}
	.searchdetails{
    background: #fff;
    outline: none;
    width: 90%;
    height: 8vw;
    border-radius: 1.867vw;
    text-align: left;
    padding-left: 10vw;
    margin-left: 5%;
    margin-top: 2.5vw;
    font-size: 3.733vw;
    color: #999;
    font-family: PingFangSC;
    -webkit-appearance: none;
    -moz-user-select: auto!important;
    -ms-user-select: auto!important;
    -o-user-select: auto!important;
    -webkit-user-select: auto!important;
    user-select: auto!important;
    border: 0px solid #f5f5f5;
}
</style>
<style>
.mint-indexlist-navitem {
    padding: .267vw 1.3vw !important;
    font-size: 3.5vw !important;
}
.sp {
    height:12vw !important;
	display: inline-block !important;
	line-height:12vw !important;
}
.mint-cell-wrapper {
    line-height: 12vw !important;
}
.mint-indexlist-content {
    margin-right: 0 !important;
}
.mint-toast-text {
	font-size: 3.8vw !important;
}
.mint-indexlist-nav {
    background-color: #efeff4;
}
</style>
