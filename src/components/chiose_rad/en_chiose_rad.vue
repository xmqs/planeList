<template>
	<div id="chiose_rad">
		<!-- <header style="height: 45px;background:#285FB1;position: fixed;top: 0;left: 0;z-index: 999999;width: 100%;text-align: center;color: #fff;font-size: 20px;line-height: 45px;">
            宠物种类
            <img @click="bus(varietys)" style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
        </header> -->
        <div id="soll" class="page-tab-container">
			<ul>
				<li @click="variety('狗')">
					<span>狗(Dog)</span>
					<img v-show="gou1" src="../../../static/img/dui.png"/>
				</li>
				<li @click="variety('猫')">
					<span>猫(Cat)</span>
					<img v-show="gou2" src="../../../static/img/dui.png"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Bus from '../ecwty/bus.js'
export default {
    name: "en_chiose_rad",
    data(){
	    return{
	        varietys:"",
	        gou1:false,
	        gou2:false
	    }
    },
	methods:{
		bus (res) {
            Bus.$emit('varietys', res)
            this.$router.back(-1)
        },
        variety(res){
        	this.varietys = res;
        	if (res == "狗") {
        	  res = "狗(Dog)";
        		this.gou1 = true;
        		this.gou2 = false;
        	} else if (res == "猫"){
            res = "猫(Cat)";
        		this.gou1 = false;
        		this.gou2 = true;
        	}
            Bus.$emit('varietys', res)
            this.$router.back(-1)
        }
	},
    created: function() {
	    Bus.$on('varietys', (e) => {
	    	this.varietys = e;
			if(this.varietys != ""){
		    	if (this.varietys == "狗") {
		    		this.gou1 = true;
		    		this.gou2 = false;
					this.varietys = "狗"
		    	} else if (this.varietys == "猫"){
		    		this.gou1 = false;
		    		this.gou2 = true;
					this.varietys = "猫"
		    	}
			}
	    })
	},
}
</script>
<style scoped>
	*{
	  -webkit-overflow-scrolling: touch;
	}
	#soll{
		background-color: #F5F5F5;
	}
	li{
    	height: 90px;
	    line-height: 90px;
	    margin: 0px 12px 0px 12px;
	    font-size: 32px;
	    border-bottom: 1px solid #e7e7e7;
	    padding-left: 4PX;
	}
	li:last-child{
    	border-bottom: 0px solid #e7e7e7;
	}
	img{
	    float: right;
	}
</style>
