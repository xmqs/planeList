<template>
<div>
  <p v-for="item in list">
    Line:
    <span v-text="item"></span>
  </p>
  <infinite-loading @infinite="infiniteHandler"></infinite-loading>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    infiniteHandler($state) {
        const temp = [];
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
        $state.loaded();
    },
  },
  components: {
    InfiniteLoading,
  },
};
</script>

<style scoped>
       #content{
            overflow: scroll;
        }
        .item{

        }
        .item .name{
            height: 10px;
            background-color: #ccc;
            margin-bottom: 10px;
        }
</style>
