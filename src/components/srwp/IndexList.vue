<template>
	<div id="IndexList">
		<div class="inp">
			<span @click="goback" style="position: absolute;top: 6px;left: 0px;padding: 8px;">
				<img src="../../../static/img/back1.png"/>
			</span>
			<input class="inp_s" type="text" v-model="area" @keyup="selectArea"/>
		</div>
		<div v-if="result" class="inp1">
			<div v-for="(ele,index) in resultCitys" class="citys">
				<router-link :to="{path: '/cwty/cwty_inp'}">
			    	<div @click="bus(ele)" class="routes routes1">
			    		{{ele}}
			    	</div>
		    	</router-link>
			</div>
		</div>
		<mt-index-list v-if="lists"  :show-indicator="true">
			<mt-index-section v-for="(ele,index) in arealist" :index="ele.firstKey" :key="index">
				<span @click="bus(element.name)" v-for="(element,index) in ele.cities">
					<mt-cell class="sp" :title="element.name"></mt-cell>
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
				arealist:[]
			}
		},
		methods: {
			goback(){
				this.$router.back(-1)
			},
			bus (res) {
			    setTimeout(() => {
			        Bus.$emit('area', res)
			    }, 30)
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
	.inp{
	    width: 100%;
    	padding: 17px 32px 17px 67px;
	}
	.inp_s{
	    width: 100%;
	    height: 65px;
	    border: 1px solid #e9e9e9;
	    border-radius: 4px;
	    background: #e8e8e8;
	    padding: 10 13px;
	    font-size: 32px;
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
	    height: 80%;
	    line-height: 32px;
	    border-radius: 8px;
	    color: #fff;
	    position: absolute;
	    top: 10% !important;
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
