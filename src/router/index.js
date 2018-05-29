import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/home'
/*口岸新闻*/
import kaxw_list from "@/components/kaxw/kaxw_list.vue"
import kaxw_details from "@/components/kaxw/kaxw_details.vue"
import search from "@/components/kaxw/search.vue"


import Destination from "@/components/Flight/destination"
import MyList from "@/components/Flight/myList"
import SelectPalne from "@/components/Flight/selectPlane"
import Changeplane from "@/components/Flight/changeList"
import PlaneDetail from "@/components/Flight/planeDetail"

/*货物查询*/
import hwcx from "@/components/hwcx/hwcx"

/*宠物托运*/

import cwty_list from "@/components/cwty/cwty_list.vue"
import IndexList from "@/components/cwty/IndexList.vue"
import cwty_inp from "@/components/cwty/cwty_inp.vue"
import cwty_upd from "@/components/cwty/cwty_upd.vue"
import chiose_rad from "@/components/chiose_rad/chiose_rad.vue"
import calendar from "@/components/chiose_rad/calendar.vue"
import myzh from "@/components/chiose_rad/myzh.vue"
import cwzp from "@/components/chiose_rad/cwzp.vue"
import servers from "@/components/cwty/servers.vue"
import serversDetails from "@/components/cwty/serversDetails.vue"
import checked from "@/components/cwty/checked.vue"
import rate from "@/components/cwty/rate.vue"
import petDetails from "@/components/cwty/petDetails.vue"
/*私人物品*/

import srwp_list from "@/components/srwp/srwp_list.vue"
import srwp_inp from "@/components/srwp/srwp_inp.vue"
import srwp_upd from "@/components/srwp/srwp_upd.vue"
import srwpDetails from "@/components/srwp/srwpDetails.vue"
import wplist from "@/components/srwp/wplist.vue"
import disWplist from "@/components/srwp/disWplist.vue"
import srwpIndexList from "@/components/srwp/IndexList.vue"
import srwpservers from "@/components/srwp/servers.vue"
import srwpserversDetails from "@/components/srwp/serversDetails.vue"
import srwpchecked from "@/components/srwp/srwpchecked.vue"
import srwprate from "@/components/srwp/srwprate.vue"

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
    //口岸新闻列表
    {
      path: '/kaxw/kaxw_list/:con/:flag',
      name: 'kaxw_list',
      component: kaxw_list
    },
    //口岸新闻详情
    {
      path: '/kaxw/kaxw_details/:sourceId/:cons',
      name: 'kaxw_details',
      component: kaxw_details
    },
    //查询
    {
      path: '/kaxw/search',
      name: 'search',
      component: search
    },
    //货物查询
    {
      path: '/hwcx/hwcx',
      name: 'hwcx',
      component: hwcx
    },
    //航班动态
    {
      path: '/flight/destination',
      name: 'Destination',
      component: Destination,
    },
    {
      path: '/flight/myList',
      name: 'MyList',
      component: MyList
    },
    {
      path: '/flight/selectpalne',
      name: 'SelectPalne',
      component: SelectPalne,
    },
    {
      path: '/flight/changeplane',
      name: 'Changeplane',
      component: Changeplane,
    },
    {
      path: '/flight/planeDetail',
      name: 'PlaneDetail',
      component: PlaneDetail,
    }
    /*宠物托运*/
   ,
		{
			path: '/cwty/cwty_list/:con',
			name: 'cwty_list',
			component: cwty_list,
		},
		{
			path: '/cwty/servers',
			name: 'servers',
			component: servers,
		},
		{
			path: '/cwty/petDetails',
			name: 'petDetails',
			component: petDetails,
		},
		{
			path: '/cwty/rate',
			name: 'rate',
			component: rate,
		},
		{
			path: '/cwty/serversDetails',
			name: 'serversDetails',
			component: serversDetails,
		},
		{
			path: '/cwty/checked',
			name: 'checked',
			component: checked,
		},
		{
			path: '/cwty/cwty_inp',
			name: 'cwty_inp',
			component: cwty_inp,
			meta: {
		        keepAlive: true
		  }
		},
		{
			path: '/cwty/cwty_upd',
			name: 'cwty_upd',
			component: cwty_upd,
			meta: {
		        keepAlive: true
		    }
		},
		{
			path: '/cwty/IndexList',
			name: 'IndexList',
			component: IndexList,
		},
		{
			path: '/chiose_rad/chiose_rad',
			name: 'chiose_rad',
			component: chiose_rad,
		},
		{
			path: '/calendar/calendar',
			name: 'calendar',
			component: calendar,
		},
		{
			path: '/chiose_rad/myzh',
			name: 'myzh',
			component: myzh,
			meta: {
		        keepAlive: true
		  }
		},
		{
			path: '/chiose_rad/cwzp',
			name: 'cwzp',
			component: cwzp,
		},
		/*私人物品*/
		{
			path: '/srwp/srwp_list',
			name: 'srwp_list',
			component: srwp_list
		},
		{
			path: '/srwp/srwp_inp',
			name: 'srwp_inp',
			component: srwp_inp,
		},
		{
			path: '/srwp/srwp_upd',
			name: 'srwp_upd',
			component: srwp_upd,
			meta: {
		        keepAlive: true
		  }
		},
		{
			path: '/srwp/srwpDetails',
			name: 'srwpDetails',
			component: srwpDetails
		},
		{
			path: '/srwp/wplist',
			name: 'wplist',
			component: wplist,
		},
		{
			path: '/srwp/disWplist',
			name: 'disWplist',
			component: disWplist,
		},
		{
			path: '/srwp/IndexList',
			name: 'srwpIndexList',
			component: srwpIndexList,
		},
		{
			path: '/srwp/servers',
			name: 'srwpservers',
			component: srwpservers,
		},
		{
			path: '/srwp/serversDetails',
			name: 'srwpserversDetails',
			component: srwpserversDetails,
		},
		{
			path: '/srwp/srwpchecked',
			name: 'srwpchecked',
			component: srwpchecked,
		},
		{
			path: '/srwp/srwprate',
			name: 'srwprate',
			component: srwprate,
		}
  ]
})
