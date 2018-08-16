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
					<div class="ele1 intp">数量：{{ele.count}}，形式价格：{{ele.price}}，箱号：{{ele.boxNo}}</div>
					<div class="ele1 intp">Number of items：{{ele.count}}，Formal price（¥）：{{ele.price}}，Carton no.{{ele.boxNo}}</div>
					<img @click="update(index)" class="tanhao" src="../../../static/img/tanhao.png"/>
				</div>
				<div @click="add" class="ele_1">
					<img class="yuanjia" src="../../../static/img/ajia.png"/>
					<label class="tit1">新增物品(The new items)</label>
				</div>
			</div>
			<p v-show="add1" class="tips">友情提示：可以发送excel表格版本的物品清单至邮箱 27362829@163.com</p>
			<p v-show="add1" class="tips">Note: you can send the list of items in excel form to email 27362829@163.com</p>
			<div v-show="add2" class="add2">

				<div class="add2_ele">
          <div class="tit">
            <div class="cntit">物品名称</div>
            <div class="entit">Name of the item</div>
          </div>
          <div class="elecontent2">
            <input class="inps" type="text" placeholder="请输入物品名称" v-model="name" />
            <p class="enph">Please enter item name</p>
          </div>
				</div>

				<div class="add2_ele">
          <div class="tit">
            <div class="cntit">数量</div>
            <div class="entit">Number of items</div>
          </div>
          <div class="elecontent2">
            <input class="inps" type="number" placeholder="请输入数量" v-model="count" />
            <p class="enph">Please enter quantity</p>
          </div>
				</div>
				<div class="add2_ele">
          <div class="tit">
            <div class="cntit">形式价格(元)</div>
            <div class="entit">Formal price(¥)</div>
          </div>
          <div class="elecontent2">
            <input class="inps" type="number" placeholder="请输入形式价格" v-model="price" />
            <p class="enph">Please enter form price</p>
          </div>
				</div>
				<div class="add2_ele">
          <div class="tit">
            <div class="cntit">箱号</div>
            <div class="entit">Carton no.</div>
          </div>
          <div class="elecontent2">
            <input class="inps" type="number" placeholder="请输入箱号" v-model="boxNo" />
            <p class="enph">Please enter box number</p>
          </div>
				</div>

				<div class="serversOK">
					<button @click="submit()" class="shenbao">保存(Save)</button>
					<button @click="removelist()" class="shenbao" style="background: #e4393c" v-if="isdelete">删除(Delete)</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	let arr = [];
	import axios from "axios";
	import { Toast } from 'mint-ui';
	import { formatDate } from '../../assets/js/date.js';
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
				deleteid:'',
        isdelete:false,
        premove:"",
			}
		},
		methods: {
			update(res){
			  this.isdelete = true;
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
				this.deleteid = '';
				this.name = '';
				this.count = '';
				this.price = '';
				this.boxNo = '';
				this.add1 = !this.add1;
				this.add2 = !this.add2;
			},
      removelist(){
        this.packages.splice(this.deleteid, 1);
        this.add1 = !this.add1;
        this.add2 = !this.add2;
        this.isdelete = false;
      },
			submit(){
        this.isdelete = false;
				var input = document.querySelectorAll('.add2_inps');
				var label = document.querySelectorAll('.add2_tit');
				for(var i =0;i < input.length;i++){
				    if (input[i].value == "") {
				    	Toast('请填写'+label[i].innerHTML)
				    	check = false;
				    	return;
				    }
				}
				var num =/^[0-9]*$/;
				if(this.name == ''){
					Toast('请输如物品名称 Please enter the name of the item')
					return;
				}
				if(!this.count.match(num)){
					Toast('数量输入有误 Quantity input error')
					return;
				}
				if(!this.price.match(num)){
					Toast('形式价格输入有误 The formal price input is wrong')
					return;
				}
				if(!this.boxNo.match(num)){
					Toast('箱号输入有误 The box number is not correct')
					return;
				}

        if(this.count==''){
          Toast('数量输入有误 Quantity input error')
          return;
        }
        if(this.price==''){
          Toast('形式价格输入有误 The formal price input is wrong')
          return;
        }
        if(this.boxNo==''){
          Toast('箱号输入有误 The box number is not correct')
          return;
        }

				var pack = {};
				pack.name = this.name;
				pack.count = this.count;
				pack.price = this.price;
				pack.boxNo = this.boxNo;

        this.packages.push(pack);

				if(this.deleteid !== ''){
					this.packages.splice(this.deleteid, 1);
				}
				this.add1 = !this.add1;
				this.add2 = !this.add2;
				/*setTimeout(() => {
					sessionStorage.setItem('wplist1',JSON.stringify(this.packages))
				}, 30)*/
			},
			/*getdetails(){
				var that = this;
				axios.get('/eport-server/delivery/pet/queryOrderById.do', {
					params: {
						orderNo :this.ids
					}
				}).then(function(data) {

				})
			}*/
		},
		mounted() {
		  this.packages = this.$route.params;
		},
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
	    min-height: 120px;
	    line-height: 53px;
	    font-size: 30px;
	}
	.tanhao{
	    width: 43px;
	    position: absolute;
	    top: 50%;
      margin-top: -20px;
	    right: 13px;
	}
	.name{
	    font-size: 32px;
    	color: #333;
      max-width: 630px;
	}
	.intp{
	    color: #9b9b9b;
    	font-size: 28px;
      max-width: 650px;
	}
	.yuanjia{
	    width: 37px;
	}
	.ele_1{
		padding: 25px;
    font-size: 32px;
    color: #333;
    display: flex;
    align-items: center;
    background: #fff url("./../../../static/img/shape2.png") no-repeat  98% center;
    background-size: 16px;
	}
	.po_right{
	    float: right;
    	margin-top: 3px;
	}
  .tit{
    color: #333;
    max-width: 35%;
    overflow: hidden;
  }
  .tit1{
    margin-left: 10px;
    color: #333;
  }
	.tips{
		    width: 90%;
    text-align: left;
    margin: 15px auto;
    color: #999;
        line-height: 45px;
        font-size: 27px;
	}
  .cntit{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .entit{
    font-size:28px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
	/*新增*/
	.add2_ele{
    display: flex;
    align-items:center;
    justify-content: space-between;
    margin: 0 20px;
    border-bottom: 1px solid #efefef;
    height: 120px;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
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

  .elecontent2{
    width: 60%;
  }
  .inps{
    width: 100%;
    height: 45px;
    border: 0;
    outline: none;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:#333;
    text-align: right;
  }
  .enph{
    font-size:28px;
    color:rgba(204,204,204,1);
    line-height:40px;
    text-align: right;
  }
</style>
<style>
	.mint-toast-text {
		font-size: 3.8vw !important;
	}
</style>
