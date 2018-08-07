<template>
	<div id="chiose_rad">
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
            宠物种类
            <img @click="bus(varietys)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
        </header> -->
        <div id="soll" class="page-tab-container">
          <div class="ele">
            <div class="tit">
              <div class="cntit">外包装长度(米)</div>
              <div class="entit">Outer packing length(M)</div>
            </div>
            <div class="elecontent2">
              <input class="inps" stype="text" placeholder="请输入外包装长度" v-model="long" />
              <p class="enph">Please enter Outer packing length</p>
            </div>
          </div>
          <div class="ele">
            <div class="tit">
              <div class="cntit">外包装宽度(米)</div>
              <div class="entit">Outer packing width(M)</div>
            </div>
            <div class="elecontent2">
              <input class="inps" type="text" placeholder="请输入外包装宽度" v-model="width" />
              <p class="enph">Please enter Outer packing width</p>
            </div>
          </div>
          <div class="ele">
            <div class="tit">
              <div class="cntit">外包装高度(米)</div>
              <div class="entit">Outer packing height(M)</div>
            </div>
            <div class="elecontent2">
              <input class="inps" type="text" placeholder="请输入外包装高度" v-model="height" />
              <p class="enph">Please enter Outer packing height</p>
            </div>
          </div>
          <div @click="savemsg" class="save">保存(Save)</div>
		</div>
	</div>
</template>

<script>
import Bus from './bus.js'
import { Toast } from 'mint-ui';
export default {
    name: "chiose_rad",
    data(){
	    return{
            long:'',
            width:'',
            height:'',
	    }
    },
	methods:{
        savemsg(){
            if(this.long == ''){
                Toast('请输入外包装长度 Please enter the outer packing length')
            }else if(this.width == ''){
                Toast('请输入外包装宽度 Please enter the outer packing width')
            }else if(this.height == ''){
                Toast('请输入外包装高度 Please enter the outer packing height')
            }else{
                var res = this.long+'x'+this.width+'x'+this.height
                Bus.$emit('boxsizes', res)
                this.$router.back(-1)
            }
        }
	},
    created: function() {
        if(this.$route.params.sizes != undefined){
            var sizes = this.$route.params.sizes.split("x");
            this.long = sizes[0];
            this.width = sizes[1];
            this.height = sizes[2];
        }
	},
}
</script>
<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	input, textarea {
		-khtml-user-select: auto!important;
		-moz-user-select: auto!important;
		-ms-user-select: auto!important;
		-o-user-select: auto!important;
		user-select: auto!important;
		-webkit-appearance: none;
	}
	#soll{

    }
    li{
        padding: 0 5vw;
	    border-bottom: 1px solid #e7e7e7;
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
  span{
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .save{
    border: 0;
    background: #285fb1;
    color: #fff;
    width: 90%;
    height: 11vw;
    font-size: 4.133vw;
    margin-left: 5%;
    margin-top: 4.867vw;
    text-align: center;
    line-height: 11vw;
  }

  .ele{
    display: flex;
    align-items:center;
    justify-content: space-between;
    margin: 0px 20px;
    border-bottom: 1px solid #efefef;
    min-height: 160px;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }

  .elecontent2{
    width: 60%;
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
  .enph{
    font-size:28px;
    font-family:PingFangSC-Regular;
    color:rgba(204,204,204,1);
    line-height:40px;
    text-align: right;
  }
</style>
