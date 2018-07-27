<template>
<div id="app">
<template>
  <div class="block">
	  <ul>
					<li class="tab">进出口货物</li>
					<li class="tab">出入境人员</li>
					<li class="tab">运输工具</li>
				</ul>
     <el-carousel :autoplay="true" :interval="5000" arrow="never">
    <el-carousel-item v-for="item in 3" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>
</div>
</template>

<script>
 export default {
  data () {

 }
}
</script>
<style>
.el-carousel__item h3 {
    color: #333;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
	.tab{
		float: left;
		width: 23%;
		text-align: center;
		height: 92px;
		line-break: 51px;
		margin: 0 5%;
		color: #666666;
		font-size:32px;
font-family:PingFangSC-Regular;
	}
	.el-carousel {
    overflow-x: hidden;
    position: relative;
    top: -100px;
    width: 100%;
    padding-top: 100px;
}
.el-carousel__indicators {
    position: absolute;
    list-style: none;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    z-index: 2;
    top: 0;
	width: 100%;
}
.el-carousel__indicator {
    display: inline-block;
    background-color: transparent;
    padding: 1.6vw 6.533vw;
    cursor: pointer;
    /* width: 33%; */
    margin: 0 7%;
	height: 80px;
}
</style>
