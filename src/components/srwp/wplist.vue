<template>
	<div id="pet_details">
		<!--头部临时用-->
		<!--<header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 99;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			物品清单
			<img @click="bad(packages)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
			<span v-show="add2" @click="complete" style="position: absolute;right: 13px;font-size: 16px;">完成</span>
		</header>-->
		<!--内容-->
		<div id="soll" class="page-tab-container">
			<div v-show="add1" class="soll1">
				<div v-for="(ele,index) in packages" class="ele">
					<div class="ele1 name">{{ele.name}}</div>
					<div class="ele1 intp">数量：{{ele.count}}&nbsp;&nbsp;&nbsp;&nbsp;形式价格：{{ele.price}}&nbsp;&nbsp;&nbsp;&nbsp;箱号：{{ele.boxNo}}</div>
					<img @click="update(index)" class="tanhao" src="../../../static/img/tanhao.png"/>
				</div>
				<div @click="add" class="ele_1">
					<img class="yuanjia" src="../../../static/img/ajia.png"/>
					<label class="tit">新增物品</label>
					<img class="po_right" src="../../../static/img/Shape.png"/>
				</div>
			</div>
			<p v-show="add1" class="tips">友情提示：可以发送excel表格版本的物品清单至邮箱 27362829@163.com</p>
			<div v-show="add2" class="add2">
				<div class="add2_ele">
					<label class="add2_tit">中文名</label>
					<input class="add2_inps" type="text" placeholder="请输入中文名" v-model="name" />
				</div>
				<div class="add2_ele">
					<label class="add2_tit">数量</label>
					<input class="add2_inps" type="number" placeholder="请输入数量" v-model="count" />
				</div>
				<div class="add2_ele">
					<label class="add2_tit">形式价格(元)</label>
					<input class="add2_inps" type="number" placeholder="请输入形式价格" v-model="price" />
				</div>
				<div class="add2_ele">
					<label class="add2_tit">箱号</label>
					<input class="add2_inps" type="number" placeholder="请输入箱号" v-model="boxNo" />
				</div>
				<div class="serversOK">
					<button @click="submit()" class="shenbao">保存</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { Toast } from 'mint-ui';
	import { formatDate } from '../../assets/js/date.js';
	import Bus from './bus.js'
	export default {
		name: "pet_details",
		data() {
			return {
				add1:true,
				add2:false,
				name:'',
				count:'',
				price:'',
				boxNo:'',
				packages:[],
				deleteid:9999,
			}
		},
	    activated() {
	    	
		},
		methods: {
			update(res){
				this.deleteid = res;
				var obj = this.packages[res]
				console.log(this.packages[res])
				this.name = obj.name;
				this.count = obj.count;
				this.price = obj.price;
				this.boxNo = obj.boxNo;
				this.add1 = !this.add1;
				this.add2 = !this.add2;
			},
			add(){
				this.name = '';
				this.count = '';
				this.price = '';
				this.boxNo = '';
				this.add1 = !this.add1;
				this.add2 = !this.add2;
			},
			submit(){
				var input = document.querySelectorAll('.add2_inps');
				var label = document.querySelectorAll('.add2_tit');
				for(var i =0;i < input.length;i++){
				    if (input[i].value == "") {
				    	Toast('请填写'+label[i].innerHTML)
				    	check = false;
				    	return;
				    }
				}
				var name =/^[\u4e00-\u9fa5]+$/; 
				var num =/^[0-9]*$/;
				if(!this.name.match(name)){
					Toast('中文名输入有误')
					return;
				}
				if(!this.count.match(num)){
					Toast('数量输入有误')
					return;
				}
				if(!this.price.match(num)){
					Toast('形式价格输入有误')
					return;
				}
				if(!this.boxNo.match(num)){
					Toast('箱号输入有误')
					return;
				}
				var pack = {};
				pack.name = this.name;
				pack.count = this.count;
				pack.price = this.price;
				pack.boxNo = this.boxNo;
				this.packages.splice(this.deleteid, 1);
				this.packages.push(pack)
				this.add1 = !this.add1;
				this.add2 = !this.add2;

				setTimeout(() => {
					Bus.$emit('wplist1', res)
				}, 30)
			},
			getdetails(){
				var that = this;
				axios.get('/eport-server/delivery/pet/queryOrderById.do', {
					params: {
						orderNo :this.ids
					}
				}).then(function(data) {
					
				})
			}
		},
		mounted() {
		    Bus.$on('wplist', (e) => {
		    	this.packages = e;
		    })
		    setTimeout(() => {
		        //this.getdetails();
		    },100)
		},
		created: function() {
		},
		filters: {
			
		}
	}
</script>

<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	*{
		font-family: PingFangSC;
	}
	input, textarea {
		-khtml-user-select: auto!important;
		-moz-user-select: auto!important;
		-ms-user-select: auto!important;
		-o-user-select: auto!important;
		user-select: auto!important;
		-webkit-appearance: none;
	}
	 @component-namespace page {
    @component actionsheet {
      @descendent wrapper {
        padding: 0 20px;
        position: absolute 50% * * *;
        width: 100%;
        transform: translateY(-50%);
        button:first-child {
          margin-bottom: 20px;
        }
      }
    }
  }
	#soll{
	    position: fixed;
	    width: 100%;
	    overflow: auto;
	    height: 100%;
	    background: #F5F5F5;
	}
	.soll1,.add2{
		background: #fff;
	}
	.ele:first-child{
		margin-top: 0;
	}
	.ele{
        margin: 7px 10px 0px 17px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    height: 120px;
	    line-height: 53px;
	    font-size: 30px;
	}
	.tanhao{
	    width: 43px;
	    position: absolute;
	    top: 27px;
	    right: 13px;
	}
	.name{
	    font-size: 32px;
    	color: #333;
	}
	.intp{
	    color: #9b9b9b;
    	font-size: 28px;
	}
	.yuanjia{
	    width: 37px;
	}
	.ele_1{
		padding: 25px;
    font-size: 32px;
    color: #333;
	}
	.po_right{
	    float: right;
    	margin-top: 3px;
	}
	.tit{
		    position: relative;
	    top: -3px;
	    left: 10px;
	}
	.tips{
		    width: 90%;
    text-align: left;
    margin: 15px auto;
    color: #999;
        line-height: 45px;
        font-size: 27px;
	}
	/*新增*/
	.add2_ele{
	    margin: 0px 10px;
	    border-bottom: 1px solid #efefef;
	    position: relative;
	    height: 90px;
	    line-height: 90px;
	    font-size: 32px;
	}
	.add2_tit{
		color: #333;
	}
	.add2_inps{
	    width: 60%;
	    position: absolute;
	    right: 7px;
	    top: 8px;
	    height: 80px;
	    border: 0;
	    outline: none;
	    font-size: 32px;
	    color: #777;
	}
	.shenbao{
		border: 0;
		background: #285fb1;
		width: 90%;
		height: 12.267vw;
		font-size: 4.533vw;
		font-family: PingFangSC-Regular;
		color: #fff;
		margin: 3% 0 3% 5%;
	}
</style>
<style>
	.mint-toast-text {
		font-size: 3.8vw !important;
	}
</style>
