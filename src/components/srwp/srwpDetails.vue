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

      <div class="ele" @click="disWplist(packages)">
        <div class="tit2">
          <div class="cntit">物品清单</div>
          <div class="entit">Item listing</div>
        </div>
        <div class="elecontent itemsDetail">
          {{packagesDetail}}
        </div>
      </div>

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
          <div class="entit">Photos of large items</div>
        </div>
        <div class="elecontent">
          {{endCity}}
        </div>
      </div>

      <div class="ele4" v-if="bigPackageList.length!==0">
        <div>
          <span data-v-0797969a="" class="cntit">大件物品照片 E-ticket itinerary</span>
        </div>
        <div v-for="(ele,index) in bigPackageList" v-if="bigPackageList" class="item">
          <img :src=ele class="avatar2">
        </div>
      </div>

      <div class="ele5">
        <span class="tit">电子机票行程单 E-ticket itinerary</span>
        <div>
          <div class="img_list">
            <img class="item el-icon-plus" :src=travelList[0] />
            <p>正面</p>
            <p>Positive</p>
          </div>
          <div class="img_list">
            <img class="item el-icon-plus" :src=travelList[1] />
            <p>反面</p>
            <p>Reverse</p>
          </div>
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
          <div class="cntit">护照信息</div>
          <div class="entit">Passport information</div>
        </div>
        <div class="elecontent">
          {{ownerPassport}}
        </div>
      </div>
      <div class="ele">
        <div class="tit2">
          <div class="cntit">机票信息</div>
          <div class="entit">Ticket information</div>
        </div>
        <div class="elecontent">
          {{picketInfo}}
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
          <div class="cntit">是否需要上门服务</div>
          <div class="entit">Need door-to-door service or not</div>
        </div>
        <div class="elecontent">
          {{sfxy}}
        </div>
      </div>
      <div v-if="sfxy == '是(Yes)'" class="ele">
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
        picketInfo:"",
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
    computed: {
      packagesDetail() {
        let list = ""
        for (let i = 0; i < this.packages.length; i++) {
          list += this.packages[i].name + ' ';
        }
        return list
      }
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
				this.$router.push({name: 'disWplist',params:{list:res}})
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
					that.picketInfo = data.data.data.picketInfo;
					that.homeAddress = data.data.data.homeAddress;
					that.switch1 = data.data.data.homeDelivery;
					if (data.data.data.homeDelivery == 1) {
						that.sfxy = '是(Yes)'
					} else{
						that.sfxy = '否(No)'
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
  .ele4 {
    margin: 0 20px;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
  }
  .ele5{
    margin: 0 20px;
    border-bottom: 1px solid #efefef;
    position: relative;
    min-height: 326px;
    line-height: 85px;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }
  .item {
    width: 170px;
    height: 170px;
    text-align: center;
    position: relative;
    display: inline-block;
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
  .avatar {
    width: 128px;
    height: 128px;
    display: inline-block;
  }

  .avatar2 {
    width: 160px;
    height: 160px;
  }
  .img_list {
    display: inline-block;
  }

  .img_list p {
    text-align: center;
    height: 28px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
  }
</style>
<style type="text/css">
  .mint-actionsheet-button, .mint-actionsheet-listitem {
    height: 80px !important;
    line-height: 80px !important;
    font-size: 30px !important;
  }

  .mint-toast-text {
    font-size: 3.8vw !important;
  }

  .mint-switch-core:before {
    width: 6.667vw;
    height: 6vw;
    background-color: #fdfdfd;
  }

  .mint-switch-core:after, .mint-switch-core:before {
    content: " ";
    top: -1px;
    left: 0px;
    position: absolute;
    transition: transform .3s;
    border-radius: 3vw;
  }

  .mint-switch-core:after {
    width: 7vw;
    height: 6.2vw;
    background-color: #fff;
    box-shadow: 0 1px 0.4vw rgba(0, 0, 0, .4);
  }

  .mint-switch-core {
    display: inline-block;
    position: relative;
    top: -6px;
    width: 9.933vw;
    height: 6.4vw;
    border: 1px solid #d9d9d9;
    border-radius: 3.133vw;
    box-sizing: border-box;
    background: #d9d9d9;
  }
  .itemsDetail{
    max-width: 460px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
