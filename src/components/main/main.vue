<template>
  <div class="header">
    <!--菜单 需加上mescroll-touch-x,原因: http://www.mescroll.com/qa.html#q10 -->
    <div class="scrollx mescroll-touch-x">
      <div id="scrollxContent" class="scrollx-content" v-for="">
        <ul id="nav" class="nav">
        <li class="active" i="0">推荐</li>
        <li i="1">热门</li>
        <li i="2">海关</li>
        <li i="3">国检</li>
        <li i="4">边检</li>
        <li i="5">国税</li>
      </ul>
      </div>
    </div>
    <div class="model_logo" id="model_logo">
      <div class="cover"></div>
      <span></span>
    </div>
  </div>
</template>

<script>
    export default {
      created: function() {
        this.getRoleInfo();
      },
      methods:{
        getRoleInfo:function(){
          let _that = this
          this.$http.get('/static/1.txt', {
            "id": _that.id,
          }).then((res) => {
              _that.sourceList = eval(res.data.data);
              _that.name=_that.sourceList.name;
            },
            function(err) {
              alert(err);
            });
        }

      }
    }



</script>

<style scoped>

</style>
