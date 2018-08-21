<template>
  <div>
    <div class="wall">
      <div id="container">

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "airLine",
        mounted(){
          var map = new AMap.Map('container', {
            zoom: 1
          });

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
            pathSimplifierIns.setData([{
              name: '路线0',
              path: [
                [118.871355,31.731225],
                [126.978355,37.568382]
              ]
            }]);

            pathSimplifierIns2.setData([{
              name: '路线1',
              path: [
                [118.871355,31.731225],
                [100.544068,13.746084]
              ]
            }]);

            //对第一条线路（即索引 0）创建一个巡航器
            var navg1 = pathSimplifierIns.createPathNavigator(0, {
              loop: true, //循环播放
              speed: 1000000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 16,
                height: 32,
                content: PathSimplifier.Render.Canvas.getImageContent('../../../static/img/Fill.png', onload, onerror),
              }
            });
            //对第一条线路（即索引 1）创建一个巡航器
            var navg2 = pathSimplifierIns2.createPathNavigator(0, {
              loop: true, //循环播放
              speed: 1000000 //巡航速度，单位千米/小时
            });

            navg1.start();

            navg2.start();
          });
        }
    }
</script>

<style scoped>
  .wall{
    height: 1334px;
  }
  #container {
    width: 100%;
    height: 100%;
    margin: 0px;
  }
</style>
