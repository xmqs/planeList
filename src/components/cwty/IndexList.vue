<template>
	<div id="IndexList">
		<div class="inp">
			<router-link :to="{path: '/cwty/cwty_inp/'+ 100 +'/'+ 1}">
				<span style="position: absolute;top: -1px;left: 2px;padding: 12px;">
					<img src="../../../static/img/back1.png"/>
				</span>
			</router-link>
			<input class="inp_s" type="text" v-model="area" @keyup="selectArea"/>
		</div>
		<div v-if="result" class="inp1">
			<div v-for="(ele,index) in resultCitys" class="citys">
				<router-link :to="{path: '/cwty/cwty_inp/'+ 1 + ele}">
			    	<div class="routes routes1">
			    		{{ele}}
			    	</div>
		    	</router-link>
			</div>
		</div>
		<mt-index-list v-if="lists"  :show-indicator="false">
			<mt-index-section v-for="(ele,index) in arealist" :index="ele.firstKey" :key="index">
			    <div class="citys" v-for="(element,index) in ele.cities" :title="element.name">
			    	<div @click="bus(element.name)" class="routes">
			    		{{element.name}}
			    	</div>
			    </div>
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
				arealist:[
					{
						firstKey: "A",
						cities:[
							{
								code:"安庆",
								pinyin:"anqing",
								name:"安庆"
							},
							{
								code:"安徽",
								pinyin:"anhui",
								name:"安徽"
							}
						]
					},
					{
						firstKey: "B",
						cities:[
							{
								code:"NKG",
								pinyin:"binzhou",
								name:"滨州"

							}
						]
					},
					{
						firstKey: "C",
						cities:[
							{
								code:"NKG",
								pinyin:"changsha",
								name:"长沙"

							}
						]
					},
					{
						firstKey: "F",
						cities:[
							{
								code:"NKG",
								pinyin:"foshan",
								name:"佛山"

							}
						]
					},
					{
						firstKey: "G",
						cities:[
							{
								code:"NKG",
								pinyin:"ganzhou",
								name:"赣州"

							}
						]
					},
					{
						firstKey: "H",
						cities:[
							{
								code:"NKG",
								pinyin:"hangzhou",
								name:"杭州"

							}
						]
					},
					{
						firstKey: "J",
						cities:[
							{
								code:"NKG",
								pinyin:"jiangsu",
								name:"江苏"

							}
						]
					},
					{
						firstKey: "L",
						cities:[
							{
								code:"NKG",
								pinyin:"loudi",
								name:"娄底"

							}
						]
					},
					{
						firstKey: "M",
						cities:[
							{
								code:"NKG",
								pinyin:"minjiang",
								name:"闽江"

							}
						]
					},
					{
						firstKey: "N",
						cities:[
							{
								code:"NKG",
								pinyin:"nanjing",
								name:"南京"

							}
						]
					},
					{
						firstKey: "R",
						cities:[
							{
								code:"NKG",
								pinyin:"rizhao",
								name:"日照"

							}
						]
					}
				]
			}
		},
		methods: {
			bus (res) {
		        Bus.$emit('area', res)
		        this.$router.back(-1)
		    },
			selectArea(){
				var searchcity = [];
				for(var i=0;i<this.arealist.length;i++){
					for(var j =0;j<this.arealist[i].cities.length;j++){
						var city = {};
						city.ping = this.arealist[i].cities[j].pinyin;
						city.name = this.arealist[i].cities[j].name;
						searchcity.push(city);
					}
				}
				if (this.area != "") {
					this.result = true;
					this.lists = false;
					this.resultCitys = [];
					for(var i= 0;i<searchcity.length;i++){
						if (searchcity[i].name.indexOf(this.area) != -1 || searchcity[i].ping.indexOf(this.area) != -1) {
							this.resultCitys.push(searchcity[i].name)
						}
					}
				}else{
					this.result = false;
					this.lists = true;
				}
			}
		},
		mounted() {

		},
		created: function() {

		},
		filters: {

		}
	}
</script>

<style>
	.inp{
	    width: 100%;
    	padding: 7px 22px 7px 47px;
	}
	.inp_s{
	    width: 100%;
	    height: 30px;
	    border: 1px solid #e9e9e9;
	    border-radius: 4px;
	    background: #e8e8e8;
	    padding: 0 3px;
	    font-size: 15px;
	}
	.mint-cell-text{
		color: #333;
	}
	.mint-indexsection-index {
	    margin: 0;
	    padding: 10px 14px;
	    background-color: #f5f5f5;
	}
	.mint-indexlist-nav{
		background-color: #474747;
	    height: 80%;
	    line-height: 15px;
	    border-radius: 8px;
	    color: #fff;
	    position: absolute;
	    top: 10%;
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
	    height: 40px;
	    background: #fff;
	    font-size: 16px;
	    padding-left: 7px;
	}
	p{
		padding: 0px 12px 0px 12px !important;
    	line-height: 43px;
	}
	.routes{
		height: 40px;
	    width: 100%;
        color: #333;
	    line-height: 40px;
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
</style>
