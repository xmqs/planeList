<template>
	<!--选择要看的新闻类型-->
	<div id="srwp_input">
		<!--头部临时用-->
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
			物品申报
			<img @click="goback()" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
		</header> -->
		<div style="position: fixed;text-align: center;width: 100%;height: 100%;z-index: 999999;padding-top: 40px;background-color: #fff;" v-show="lod">
			正在加载,请稍后...
		</div>
		<!--内容-->
		<div id="soll" class="page-tab-container">
      <div class="points">
        <span class="">物品信息</span>
        <div class="">Item information</div>
      </div>

			<!--<div class="ele">
				<label class="tit">物品清单</label>
				<div style="line-height: 33px;" @click="disWplist(packages)" class="inps">
					<span v-for="(ele,index) in packages">
						<span v-if="index == 0">
							{{ele.name}}
						</span>
						<span v-else>
							,{{ele.name}}
						</span>
					</span>
				</div>
				<img class="po_right" src="../../../static/img/Shape.png"/>
			</div>-->

      <div class="ele">
        <div class="tit2">
          <div class="cntit">总重量(千克)</div>
          <div class="entit">The total weight(KG)</div>
        </div>
        <div class="elecontent">
          {{weight}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">外包装尺寸(米)</div>
          <div class="entit">Outer packing dimension(M)</div>
        </div>
        <div class="elecontent">
          {{size}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">发货地</div>
          <div class="entit">Place of dispatch</div>
        </div>
        <div class="elecontent">
          {{startCity}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">目的城市</div>
          <div class="entit">Destination airport</div>
        </div>
        <div class="elecontent">
          {{endCity}}
        </div>
      </div>

			<div class="points">
				<span class="">主人信息</span>
				<div class="">The master of information</div>
			</div>

      <div class="ele">
        <div class="tit2">
          <div class="cntit">姓名</div>
          <div class="entit">Name</div>
        </div>
        <div class="elecontent">
          {{ownerName}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">联系方式</div>
          <div class="entit">The contact</div>
        </div>
        <div class="elecontent">
          {{ownerTelNo}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">护照信息</div>
          <div class="entit">Passport information</div>
        </div>
        <div class="elecontent">
          {{ownerPassport}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">是否需要上门服务</div>
          <div class="entit">Need door-to-door service or not</div>
        </div>
        <div class="elecontent">
          {{sfxy}}
        </div>
      </div>
      <div v-if="sfxy == '是'" class="ele">
        <div class="tit2">
          <div class="cntit">地址</div>
          <div class="entit">Address</div>
        </div>
        <div class="elecontent">
          {{homeAddress}}
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
		name: "srwp_input",
		data() {
			return {
				/*属性*/
				packages:[],
				weight:'',
				size:'',
				startCity:'',
				endCity:'',
				ownerName:'',
				ownerIdNo:'',
				ownerPassport:'',
				homeAddress:'',
				ownerTelNo:'',
		        bigPackageList:[],
		        travelList1:'',
		        travelList2:'',
		        travelList:[],
		        ids:'',
		        sfxy:'',
				/*属性结束*/
				value:"",
				homeDelivery:false,
		        packagesName:'',
				lod:true
			}
		},
	    activated() {

		},
		methods: {
			goback(){
				this.$router.push({name: 'srwp_list',
					params:{
						res:'tab-container1'
					}
				})
			},
			//图片上传
			handleAvatarSuccess(res, file) {
		        this.bigPackageList.push(res.data);
		    },
		    handbefore(){

		    },
			handleAvatarSuccess1(res, file) {
		        this.travelList1 = res.data;
		    },
		    handbefore1(){

		    },
			handleAvatarSuccess2(res, file) {
		        this.travelList2 = res.data;
		    },
		    handbefore2(){

		    },
			disWplist(res){
				setTimeout(() => {
			        Bus.$emit('disWplist', res,this.ids)
			    }, 30)
				this.$router.push({path: '/srwp/disWplist'})
			},
			getDetails(){
				var that = this;
				axios.get('/eport-server/delivery/luggage/queryOrderById.do', {
					params: {
						orderNo :that.ids
					}
				}).then(function(data) {
					that.packages = data.data.data.packages;
					that.weight = data.data.data.weight;
					that.size = data.data.data.size;
					that.startCity = data.data.data.startCity;
					that.endCity = data.data.data.endCity;
					that.ownerName = data.data.data.ownerName;
					that.ownerIdNo = data.data.data.ownerIdNo;
					that.ownerPassport = data.data.data.ownerPassport;
					that.homeAddress = data.data.data.homeAddress;
					that.switch1 = data.data.data.homeDelivery;
					if (data.data.data.homeDelivery == 1) {
						that.sfxy = '是'
					} else{
						that.sfxy = '否'
					}
					that.ownerTelNo = data.data.data.ownerTelNo;
					that.bigPackageList = data.data.data.bigPackageList;
					that.travelList = data.data.data.travelList;
					setTimeout(()=>{
						that.lod = false;
					},100);
				})
			}
		},
		mounted() {
		},
		created: function() {
		    Bus.$on('area', (e) => {
		    	this.endCity = e;
		    })
		    Bus.$on('wplist1', (e) => {
		    	this.packages = e;
		    })
			this.ids = this.$route.params.id;
		    setTimeout(() => {
		        this.getDetails();
		    },100)
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
  p{
    background: #fff5e5;
    line-height: 40px;
    padding: 15px 12px;
    height: 150px;
    font-size:26px;
    font-family:PingFangSC-Regular;
    color:rgba(255,181,64,1);
  }
  #soll{
    position: fixed;
    width: 100%;
    overflow: auto;
    height: 100%;
  }
  .points{
    padding: 20px;
    line-height: 45px;
    background-color: #eee;
    font-size:28px;
    font-family:PingFangSC-Regular;
    color:rgba(170,170,170,1);
  }
  .ele1{
    display: flex;
    align-items:center;
    justify-content: space-between;
    margin: 0 20px;
    border-bottom: 1px solid #efefef;
    height: 160px;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .avatar{
    width: 128px;
    height: 128px;
    display: inline-block;
  }
  .ele2{
    display: flex;
    align-items:center;
    justify-content: space-between;
    margin: 0 20px;
    border-bottom: 1px solid #efefef;
    height: 160px;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .ele{
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
  .ele3{
    margin: 0px 20px;
    border-bottom: 1px solid #efefef;
    position: relative;
    min-height: 80px;
    font-size:32px;
    padding-top: 10px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .tit{
    color: #333;
  }
  .inps{
    width: 55%;
    position: absolute;
    right: 7px;
    top: 10px;
    height: 45px;
    border: 0;
    outline: none;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:#939393;
  }
  .inps1{
    width: 60%;
    position: absolute;
    right: 7px;
    top: 10px;
    height: 45px;
    border: 0;
    outline: none;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:#939393;
  }
  .po_right{
    position: absolute;
    top: 0px;
    z-index: 999;
    right: -6px;
    padding: 20px 8px 19px 34px;
  }
  .my-switch{
    position: absolute;
    top: 23px;
    right: 12px;
  }
  .ele-s{
    padding: 25px 19px;
    background: #f0f0f0;
  }
  .shenbao{
    border: 0;
    background: #285fb1;
    width: 100%;
    height: 92px;
    font-size:34px;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
  }
  .pet_pz{
    word-wrap: break-word;
  }
  .pet-inf{
    display: flex;
    align-items: center;
  }
  .pet-inf1{
    display: flex;
    margin-left: 20px;
    height: 128px;
    align-items: center;
  }
  .pet_name{
    font-size: 36px;
  }
  .en_pet_name{
    font-size: 28px;
  }
  .pname{
    font-size: 40px;
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
</style>
