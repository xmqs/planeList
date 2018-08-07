import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/home'
/*口岸新闻*/
/*import kaxw_list from "@/components/kaxw/kaxw_list.vue"
import kaxw_details from "@/components/kaxw/kaxw_details.vue"
import search from "@/components/kaxw/search.vue"
import test from "@/components/kaxw/test.vue"*/

const kaxw_list = () => import('../components/kaxw/kaxw_list.vue')
const kaxw_details = () => import('../components/kaxw/kaxw_details.vue')
const search = () => import('../components/kaxw/search.vue')
const test = () => import('../components/kaxw/test.vue')
/*航班动态*/
/*import Destination from "@/components/Flight/destination"
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
import stopDetail from "@/components/Flight/stopDetail"*/

const Destination = () => import('../components/Flight/destination')
const MyList = () => import('../components/Flight/MyList')
const SelectPalne = () => import('../components/Flight/selectPlane')
const Changeplane = () => import('../components/Flight/changeList')
const PlaneDetail = () => import('../components/Flight/PlaneDetail')
const cityList = () => import('../components/Flight/cityList')
const searchList = () => import('../components/Flight/searchList')
const testScrollA = () => import('../components/Flight/testScrollA')
const testScrollB = () => import('../components/Flight/testScrollB')
const testScrollC = () => import('../components/Flight/testScrollC')
const testScrollD = () => import('../components/Flight/testScrollD')
const busLine = () => import('../components/Flight/busLine')
const busLineA = () => import('../components/Flight/busLineA')
const busLineD = () => import('../components/Flight/busLineD')
const flightMain = () => import('../components/Flight/flightMain')
const stopDetail = () => import('../components/Flight/stopDetail')

/*酒店*/
/*import hotel from "@/components/hotel/hotel"
/!*货物查询*!/
import hwcx from "@/components/hwcx/hwcx"
/!*口岸数据*!/
import kasjhomepage from "@/components/kasj/kasjhomepage"
import kaxjcontentpage from "@/components/kasj/kaxjcontentpage"*/


const hotel = () => import('../components/hotel/hotel')
const hwcx = () => import('../components/hwcx/hwcx')
const kasjhomepage = () => import('../components/kasj/kasjhomepage')
const kaxjcontentpage = () => import('../components/kasj/kaxjcontentpage')
/*宠物托运*/

/*import cwty_list from "@/components/cwty/cwty_list.vue"
import IndexList from "@/components/cwty/IndexList.vue"
import cwty_inp from "@/components/cwty/cwty_inp.vue"
import cwty_upd from "@/components/cwty/cwty_upd.vue"
import chiose_rad from "@/components/chiose_rad/chiose_rad.vue"
import calendar from "@/components/chiose_rad/calendar.vue"
import myzh from "@/components/chiose_rad/myzh.vue"
import sizes from "@/components/chiose_rad/sizes.vue"
import cwzp from "@/components/chiose_rad/cwzp.vue"
import servers from "@/components/cwty/servers.vue"
import serversDetails from "@/components/cwty/serversDetails.vue"
import checked from "@/components/cwty/checked.vue"
import rate from "@/components/cwty/rate.vue"
import petDetails from "@/components/cwty/petDetails.vue"*/

const cwty_list = () => import('../components/cwty/cwty_list.vue')
const IndexList = () => import('../components/cwty/IndexList.vue')
const cwty_inp = () => import('../components/cwty/cwty_inp.vue')
const cwty_upd = () => import('../components/cwty/cwty_upd.vue')
const chiose_rad = () => import('../components/chiose_rad/chiose_rad.vue')
const calendar = () => import('../components/chiose_rad/calendar.vue')
const myzh = () => import('../components/chiose_rad/myzh.vue')
const sizes = () => import('../components/chiose_rad/sizes.vue')
const cwzp = () => import('../components/chiose_rad/cwzp.vue')
const servers = () => import('../components/cwty/servers.vue')
const serversDetails = () => import('../components/cwty/serversDetails.vue')
const checked = () => import('../components/cwty/checked.vue')
const rate = () => import('../components/cwty/rate.vue')
const petDetails = () => import('../components/cwty/petDetails.vue')


const ecwty_list = () => import('../components/ecwty/cwty_list.vue')
const enIndexList = () => import('../components/ecwty/IndexList.vue')
const enchiose_rad = () => import('../components/chiose_rad/en_chiose_rad.vue')
const ensizes = () => import('../components/chiose_rad/en_sizes.vue')
const eIndexList = () => import('../components/ecwty/IndexList.vue')
const ecwty_inp = () => import('../components/ecwty/cwty_inp.vue')
const ecwty_upd = () => import('../components/ecwty/cwty_upd.vue')
const eservers = () => import('../components/ecwty/servers.vue')
const eserversDetails = () => import('../components/ecwty/serversDetails.vue')
const echecked = () => import('../components/ecwty/checked.vue')
const erate = () => import('../components/ecwty/rate.vue')
const epetDetails = () => import('../components/ecwty/petDetails.vue')
/*私人物品*/

/*import boxsize from "@/components/srwp/boxsize.vue"
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
import srwprate from "@/components/srwp/srwprate.vue"*/


const boxsize = () => import('../components/srwp/boxsize.vue')
const srwp_list = () => import('../components/srwp/srwp_list.vue')
const srwp_inp = () => import('../components/srwp/srwp_inp.vue')
const srwp_upd = () => import('../components/srwp/srwp_upd.vue')
const srwpDetails = () => import('../components/srwp/srwpDetails.vue')
const wplist = () => import('../components/srwp/wplist.vue')
const disWplist = () => import('../components/srwp/disWplist.vue')
const srwpIndexList = () => import('../components/srwp/IndexList.vue')
const srwpservers = () => import('../components/srwp/servers.vue')
const srwpserversDetails = () => import('../components/srwp/serversDetails.vue')
const srwpchecked = () => import('../components/srwp/srwpchecked.vue')
const srwprate = () => import('../components/srwp/srwprate.vue')


const esrwp_inp = () => import('../components/esrwp/srwp_inp.vue')
const esrwp_upd = () => import('../components/esrwp/srwp_upd.vue')
const ewplist = () => import('../components/esrwp/wplist.vue')
const eboxsize = () => import('../components/esrwp/boxsize.vue')
const esrwpIndexList = () => import('../components/esrwp/IndexList.vue')
/*手机值机*/
/*import phoneflight from "@/components/phoneflight/phoneflight.vue"*/

const phoneflight = () => import('../components/phoneflight/phoneflight.vue')

// 日期范围
/*import MonthSelect from "@/components/base/date/MonthSelect.vue"*/

const MonthSelect = () => import('../components/base/date/MonthSelect.vue')
//空白页，刷新页面用
/*import GoBack from "@/components/chiose_rad/GoBack.vue"*/

const GoBack = () => import('../components/chiose_rad/GoBack.vue')

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
            path: '/kaxw/test',
            name: 'test',
            component: test
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
          path: '/ecwty/cwty_list/:con',
          name: 'ecwty_list',
          component: ecwty_list,
        },
        {
            path: '/cwty/servers/:id',
            name: 'servers',
            component: servers,
        },
        {
            path: '/cwty/petDetails/:id',
            name: 'petDetails',
            component: petDetails,
        },
        {
            path: '/ecwty/petDetails/:id',
            name: 'epetDetails',
            component: epetDetails,
        },
        {
            path: '/cwty/rate/:id/:img',
            name: 'rate',
            component: rate,
        },
        {
            path: '/cwty/serversDetails/:id',
            name: 'serversDetails',
            component: serversDetails,
        },
        {
            path: '/cwty/checked/:id',
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
      /*en版*/
        {
            path: '/ecwty/cwty_inp',
            name: 'ecwty_inp',
            component: ecwty_inp,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/cwty/cwty_upd/:id',
            name: 'cwty_upd',
            component: cwty_upd,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/ecwty/cwty_upd/:id',
            name: 'ecwty_upd',
            component: ecwty_upd,
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
            path: '/ecwty/IndexList',
            name: 'enIndexList',
            component: enIndexList,
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
            path: '/chiose_rad/en_chiose_rad',
            name: 'enchiose_rad',
            component: enchiose_rad,
        },
        {
            path: '/calendar/calendar',
            name: 'calendar',
            component: calendar,
        },
        {
            path: '/chiose_rad/GoBack',
            name: 'GoBack',
            component: GoBack,
        },
        {
            path: '/chiose_rad/myzh',
            name: 'myzh',
            component: myzh
        },
        {
            path: '/chiose_rad/sizes',
            name: 'sizes',
            component: sizes
        },
        {
            path: '/chiose_rad/en_sizes',
            name: 'ensizes',
            component: ensizes
        },
        {
            path: '/chiose_rad/cwzp',
            name: 'cwzp',
            component: cwzp,
        },
        /*私人物品*/
        {
            path: '/srwp/boxsize',
            name: 'boxsize',
            component: boxsize
        },
        {
            path: '/esrwp/boxsize',
            name: 'eboxsize',
            component: eboxsize
        },
        {
            path: '/srwp/srwp_list',
            name: 'srwp_list',
            component: srwp_list
        },
        {
            path: '/srwp/srwp_inp',
            name: 'srwp_inp',
            component: srwp_inp,
            meta:{
                keepAlive:true
            }
        },
        {
            path: '/esrwp/srwp_inp',
            name: 'esrwp_inp',
            component: esrwp_inp,
            meta:{
                keepAlive:true
            }
        },
        {
            path: '/srwp/srwp_upd/:id',
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
            path: '/esrwp/wplist',
            name: 'ewplist',
            component: ewplist,
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
            path: '/esrwp/IndexList',
            name: 'esrwpIndexList',
            component: esrwpIndexList,
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
        {
            path: '/uploadImgByClient',
            name: 'uploadImgByClient'
        }
    ]
})
