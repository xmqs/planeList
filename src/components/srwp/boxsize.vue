<template>
	<div id="chiose_rad">
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
            宠物种类
            <img @click="bus(varietys)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
        </header> -->
        <div id="soll" class="page-tab-container">
			<ul>
				<li>
					<span>外包装长度(米)</span>
					<input class="inps" type="number" placeholder="请输入外包装长度" v-model="long" />
				</li>
				<li>
					<span>外包装宽度(米)</span>
					<input class="inps" type="number" placeholder="请输入外包装宽度" v-model="width" />
				</li>
				<li>
					<span>外包装高度(米)</span>
					<input class="inps" type="number" placeholder="请输入外包装高度" v-model="height" />
				</li>
			</ul>
            <div @click="savemsg" class="save">保存</div>
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
                Toast('请输入外包装长度')
            }else if(this.width == ''){
                Toast('请输入外包装宽度')
            }else if(this.height == ''){
                Toast('请输入外包装高度')
            }else{
                var res = this.long+'x'+this.width+'x'+this.height
                setTimeout(() => {
                    Bus.$emit('boxsizes', res)
                }, 100)
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
        outline: none;
    width: 40%;
    height: 90px;
    margin-left: 27%;
    font-size:32px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    border: 0;
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
</style>