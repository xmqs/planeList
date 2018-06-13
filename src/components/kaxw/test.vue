<template>
	<div id="search_home">
		<ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li v-for="item in list">{{ item }}</li>
        </ul>
	</div>
</template>

<script>
	import axios from "axios";
	import { formatDate } from '../../assets/js/date.js';
	export default {
		name: "search",
		data() {
			return {

			}
		},
		methods: {
            loadMore() {
            this.loading = true;
            setTimeout(() => {
                let last = this.list[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
                }
                this.loading = false;
            }, 500);
            }
		},
		mounted() {
		},
		created: function() {

		},
		filters: {

		}
	}
</script>

<style scoped>

</style>
