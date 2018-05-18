import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from'mint-ui'
import'mint-ui/lib/style.css'

import draggable from 'vuedraggable'
import ElementUI from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.use(ElementUI)

Vue.use(Mint);
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('draggable', draggable);
	new Vue({
	  el: '#app',
	  router,
	  render: h => h(App)
	})
