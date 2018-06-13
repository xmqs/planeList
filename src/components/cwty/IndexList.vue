<template>
	<div id="IndexList">
		<div class="inp">
			<span @click="goback" style="position: absolute;top: 6px;left: 0px;padding: 8px;">
				<img src="../../../static/img/back1.png"/>
			</span>
			<input class="inp_s" type="text" v-model="area" @keyup="selectArea"/>
		</div>
		<div v-show="thicity" class="mycity">{{active}}<span @click="acCity" style="float: right;padding-right: 4vw;">✖</span></div> 
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
						<mt-cell :class="{'class-a':active == element.name}" class="sp" :title="element.name"></mt-cell>
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

<style>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	.inp{
	    width: 100%;
    	padding: 17px 14px 17px 67px;
	}
	.mycity{
		    height: 11.5vw;
    line-height: 11.5vw;
    font-size: 4.4vw;
    padding-left: 1.5vw;
	border-bottom: 1px solid #f5f5f5;
	}
	.inp_s{
	    width: 100%;
	    height: 65px;
	    border: 1px solid #e9e9e9;
	    border-radius: 4px;
	    background: #e8e8e8;
		-webkit-appearance: none;
	    padding: 10 13px;
		font-size: 32px;
		-khtml-user-select: auto!important;
		-moz-user-select: auto!important;
		-ms-user-select: auto!important;
		-o-user-select: auto!important;
		user-select: auto!important;
	}
	.mint-cell-text{
		color: #333;
	    font-size: 32px;
	}
	.mint-indexsection-index {
	    margin: 0;
	    padding: 20px 24px !important;
	    background-color: #f5f5f5;
	}
	.mint-indexlist-nav{
		background-color: #474747 !important;
	    height: 95%;
	    line-height: 32px;
	    border-radius: 8px;
	    color: #fff;
	    position: absolute;
	    top: 1px !important;
	}
	.class-a{
		background: #ccc;
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
</style>
<style>
.mint-indexlist-navitem {
    padding: .267vw 1.7vw !important;
    font-size: 4.2vw !important;
}
.sp {
    height:12vw !important;
	display: inline-block !important;
	line-height:12vw !important;
}
.mint-cell-wrapper {
    line-height: 12vw !important;
}
</style>
