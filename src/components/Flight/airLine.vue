<template>
  <div>
    <div class="wall">
      <div id="container">
      </div>
      <div class="info">
        <p v-if="info.name">南京 —— {{info.name}}</p>
        <p v-for="item in info.title">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "airLine",
        data(){
            return{
              info:{}
            }
        },
        mounted(){
          var map = new AMap.Map('container', {
            zoom: 1,
            center:[118.871355,31.731225]
          });

          var that = this;
          AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {

            if (!PathSimplifier.supportCanvas) {
              alert('当前环境不支持 Canvas！');
              return;
            }

            var pathSimplifierIns = new PathSimplifier({
              zIndex: 100,
              //autoSetFitView:false,
              map: map, //所属的地图实例

              getPath: function(pathData, pathIndex) {

                return pathData.path;
              },
              getHoverTitle: function(pathData, pathIndex, pointIndex) {

                if (pointIndex >= 0) {
                  //point
                  return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                }

                return pathData.name + '，点数量' + pathData.path.length;
              },
              renderOptions: {

                renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
              }
            });
            var pathSimplifierIns2 = new PathSimplifier({
              zIndex: 100,
              //autoSetFitView:false,
              map: map, //所属的地图实例

              getPath: function(pathData, pathIndex) {

                return pathData.path;
              },
              getHoverTitle: function(pathData, pathIndex, pointIndex) {

                if (pointIndex >= 0) {
                  //point
                  return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                }

                return pathData.name + '，点数量' + pathData.path.length;
              },
              renderOptions: {

                renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
              }
            });

            window.pathSimplifierIns = pathSimplifierIns;

            //设置数据
            pathSimplifierIns.setData([]);

            pathSimplifierIns2.setData([{
              name: '香港',
              title:['国际（地区）航线-客运定期航线'],
              path: [
                [118.871355,31.731225],
                [114.171202,22.277469]
              ]
            },{
              name: '澳门',
              title:['国际（地区）航线-客运定期航线'],
              path: [
                [118.871355,31.731225],
                [113.543117,22.186883]
              ]
            },{
              name: '台北',
              title:['国际（地区）航线-客运定期航线','国际（地区）航线-货运航线'],
              path: [
                [118.871355,31.731225],
                [121.511621,25.059203]
              ]
            },{
              name: '东京',
              title:['国际（地区）航线-客运定期航线','国际（地区）航线-货运航线','集装箱班轮航线-近洋航线'],
              path: [
                [118.871355,31.731225],
                [139.665652,35.802961]
              ]
            },{
              name: '大阪',
              title:['国际（地区）航线-货运航线','集装箱班轮航线-近洋航线'],
              path: [
                [118.871355,31.731225],
                [135.487518,34.671739]
              ]
            },{
              name: '襄阳',
              title:['国际（地区）航线-客运包机航线'],
              path: [
                [118.871355,31.731225],
                [112.128227,32.015524]
              ]
            },{
              name: '青州',
              title:['国际（地区）航线-客运包机航线'],
              path: [
                [118.871355,31.731225],
                [118.486482,36.691076]
              ]
            },{
              name: '河内',
              title:['国际（地区）航线-客运包机航线'],
              path: [
                [118.871355,31.731225],
                [105.838457,21.023369]
              ]
            },{
              name: '上海',
              title:['集装箱班轮航线-外贸内支线'],
              path: [
                [118.871355,31.731225],
                [121.478512,31.236305]
              ]
            },{
              name: '宁波',
              title:['集装箱班轮航线-外贸内支线'],
              path: [
                [118.871355,31.731225],
                [121.62855,29.866397]
              ]
            },{
              name: '哈萨克斯坦',
              title:['中欧班列运行线路-西线'],
              path: [
                [118.871355,31.731225],
                [45.352783,41.097977]
              ]
            },{
              name: '俄罗斯（莫斯科）',
              title:['中欧班列运行线路-中线','中欧班列运行线路-东线'],
              path: [
                [118.871355,31.731225],
                [37.615575,55.760365]
              ]
            },{
              name: '白俄罗斯（明斯克）',
              title:['中欧班列运行线路-中线'],
              path: [
                [118.871355,31.731225],
                [27.582849,53.943276]
              ]
            }]);

            //对第一条线路（即索引 0）创建一个巡航器
            var navg0 = pathSimplifierIns2.createPathNavigator(0, {
              loop: true, //循环播放
              speed: 300000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon001.png', onload, onerror),
              }
            });
            var navg1 = pathSimplifierIns2.createPathNavigator(1, {
              loop: true, //循环播放
              speed: 300000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon001.png', onload, onerror),
              }
            });
            var navg2 = pathSimplifierIns2.createPathNavigator(2, {
              loop: true, //循环播放
              speed: 300000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon001.png', onload, onerror),
              }
            });
            //对第一条线路（即索引 1）创建一个巡航器
            var navg3 = pathSimplifierIns2.createPathNavigator(3, {
              loop: true, //循环播放
              speed: 300000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon001.png', onload, onerror),
              }
            });
            var navg4 = pathSimplifierIns2.createPathNavigator(4, {
              loop: true, //循环播放
              speed: 300000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon001.png', onload, onerror),
              }
            });
            var navg5 = pathSimplifierIns2.createPathNavigator(5, {
              loop: true, //循环播放
              speed: 300000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon001.png', onload, onerror),
              }
            });
            var navg6 = pathSimplifierIns2.createPathNavigator(6, {
              loop: true, //循环播放
              speed: 300000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon001.png', onload, onerror),
              }
            });
            var navg7 = pathSimplifierIns2.createPathNavigator(7, {
              loop: true, //循环播放
              speed: 300000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon001.png', onload, onerror),
              }
            });
            var navg8 = pathSimplifierIns2.createPathNavigator(8, {
              loop: true, //循环播放
              speed: 100000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                autoRotate: false,
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon002.png', onload, onerror),
              }
            });
            var navg9 = pathSimplifierIns2.createPathNavigator(9, {
              loop: true, //循环播放
              speed: 100000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                autoRotate: false,
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon002.png', onload, onerror),
              }
            });
            var navg10 = pathSimplifierIns2.createPathNavigator(10, {
              loop: true, //循环播放
              speed: 100000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                autoRotate: false,
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon003.png', onload, onerror),
              }
            });
            var navg11 = pathSimplifierIns2.createPathNavigator(11, {
              loop: true, //循环播放
              speed: 100000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                autoRotate: false,
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon003.png', onload, onerror),
              }
            });
            var navg12 = pathSimplifierIns2.createPathNavigator(12, {
              loop: true, //循环播放
              speed: 100000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                autoRotate: false,
                width: 16,
                height: 16,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/icon003.png', onload, onerror),
              }
            });


            navg0.start();
            navg1.start();
            navg2.start();
            navg3.start();
            navg4.start();
            navg5.start();
            navg6.start();
            navg7.start();
            navg8.start();
            navg9.start();
            navg10.start();
            navg11.start();
            navg12.start();

            pathSimplifierIns2.on('pathClick ', (e,info)=> {
              that.info = info.pathData;
            })
          });
        }
    }
</script>

<style scoped>
  .wall{
    height: 1334px;
    position: relative;
  }
  #container {
    width: 100%;
    height: 100%;
    margin: 0px;
  }
  .info{
    position: absolute;
    width: 100%;
    background: #fff;
    z-index: 200;
    bottom: 0;
  }
</style>
