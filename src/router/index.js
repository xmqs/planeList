import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/home'
/*口岸新闻*/
import kaxw_list from "@/components/kaxw/kaxw_list.vue"
import kaxw_details from "@/components/kaxw/kaxw_details.vue"
import search from "@/components/kaxw/search.vue"

/*航班动态*/
import Destination from "@/components/Flight/destination"
import MyList from "@/components/Flight/myList"
import SelectPalne from "@/components/Flight/selectPlane"
import Changeplane from "@/components/Flight/changeList"
import PlaneDetail from "@/components/Flight/planeDetail"
import cityList from "@/components/Flight/cityList"
import searchList from "@/components/Flight/searchList"
import testScrollA from "@/components/Flight/testScrollA"
import testScrollB from "@/components/Flight/testScrollB"
import testScrollC from "@/components/Flight/testScrollC"
import testScrollD from "@/components/Flight/testScrollD"
import busLine from "@/components/Flight/busLine"
import busLineA from "@/components/Flight/busLineA"
import busLineD from "@/components/Flight/busLineD"
import flightMain from "@/components/Flight/flightMain"
import stopDetail from "@/components/Flight/stopDetail"

/*酒店*/
import hotel from "@/components/hotel/hotel"
/*货物查询*/
import hwcx from "@/components/hwcx/hwcx"
/*口岸数据*/
import kasjhomepage from "@/components/kasj/kasjhomepage"
import kaxjcontentpage from "@/components/kasj/kaxjcontentpage"

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

/*手机值机*/
import phoneflight from "@/components/phoneflight/phoneflight.vue"

// 日期范围
import MonthSelect from "@/components/base/date/MonthSelect.vue"

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
            component: kaxw_list,
            meta: {
                keepAlive: true
            }
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
        //口岸数据
        {
            path: '/kasj/kasjhomepage',
            name: 'kasjhomepage',
            component: kasjhomepage
        },
        {
            path: '/kasj/kaxjcontentpage',
            name: 'kaxjcontentpage',
            component: kaxjcontentpage
        },
        //航班动态
        {
            path: '/flight/destination',
            name: 'Destination',
            component: Destination,
            meta: {
                keepAlive: true
            }
        },
        //航班主页
        {
            path: '/flight/flightMain',
            name: 'flightMain',
            component: flightMain,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/flight/myList',
            name: 'MyList',
            component: MyList
        },
        {
            path: '/flight/cityList',
            name: 'cityList',
            component: cityList,
            meta: {
                keepAlive: true
            }
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
            path: '/flight/planeDetail/:flightIdentity/:direction/:countryType',
            name: 'PlaneDetail',
            component: PlaneDetail,
        },
        {
            path: '/flight/testScrollA',
            name: 'testScrollA',
            component: testScrollA,
        },
        {
            path: '/flight/testScrollB',
            name: 'testScrollB',
            component: testScrollB,
        },
        {
            path: '/flight/testScrollC',
            name: 'testScrollC',
            component: testScrollC,
        },
        {
            path: '/flight/testScrollD',
            name: 'testScrolDl',
            component: testScrollD,
        },
        {
            path: '/flight/busLine/:flight/:direction',
            name: 'busLine',
            component: busLine,
        },
        {
            path: '/flight/busLineA/:flight/:direction',
            name: 'busLineA',
            component: busLineA,
        },
        {
            path: '/flight/busLineD/:flight/:direction',
            name: 'busLineD',
            component: busLineD,
        },
        {
            path: '/flight/stopDetail',
            name: 'stopDetail',
            component: stopDetail,
        },
        {
            path: '/flight/searchList',
            name: 'searchList',
            component: searchList,
            meta: {
                keepAlive: true
            }
        },
        /*宠物托运*/
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
            meta: {
                keepAlive: true
            }
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
            component: myzh
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
            path: '/srwp/srwpDetails/:id',
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
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/srwp/servers/:id',
            name: 'srwpservers',
            component: srwpservers,
        },
        {
            path: '/srwp/serversDetails/:id',
            name: 'srwpserversDetails',
            component: srwpserversDetails,
        },
        {
            path: '/srwp/srwpchecked/:id',
            name: 'srwpchecked',
            component: srwpchecked,
        },
        {
            path: '/srwp/srwprate/:id',
            name: 'srwprate',
            component: srwprate,
        },
        {
            path: '/hotel/hotel',
            name: 'hotel',
            component: hotel,
        },
        {
            path: '/phoneflight/phoneflight',
            name: 'phoneflight',
            component: phoneflight,
        },
        {
            path: '/base/date/MonthSelect',
            name: 'MonthSelect',
            component: MonthSelect,
        },
    ]
})
