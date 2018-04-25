import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/home'
import Main from './../components/main/main'

import kaxw_list from "@/components/kaxw/kaxw_list.vue"
import kaxw_details from "@/components/kaxw/kaxw_details.vue"
import search from "@/components/kaxw/search.vue"

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/main',
			name: 'main',
			component: Main
		},
		//口岸新闻列表
		{
			path: '/kaxw/kaxw_list',
			name: 'kaxw_list',
			component: kaxw_list
		},
		//口岸新闻详情
		{
			path: '/kaxw/kaxw_details/:sourceId',
			name: 'kaxw_details',
			component: kaxw_details
		},
		//查询
		{
			path: '/kaxw/search',
			name: 'search',
			component: search
		}
	]
})