import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/home'
import Main from './../components/main/main'

import kaxw_list from "@/components/kaxw/kaxw_list.vue"
import kaxw_details from "@/components/kaxw/kaxw_details.vue"
import search from "@/components/kaxw/search.vue"
import Flight from "@/components/Flight/flightMain"
import Destination from "@/components/Flight/destination"
import MyList from "@/components/Flight/myList"
import SelectPalne from "@/components/Flight/selectPlane"


Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'home',
			component: Home
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
		},
    //航班动态
    {
      path:'/flight',
      name:'Flight',
      component:Flight,
      redirect: '/flight/destination',
      children:[{
        path: '/flight/destination',
        name: 'Destination',
        component: Destination,
      },{
        path: '/flight/myList',
        name: 'MyList',
        component: MyList
      }
      ]
    },
    {
      path: '/flight/selectpalne',
      name: 'SelectPalne',
      component: SelectPalne,
    }
	]
})
