import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from'mint-ui'
import'mint-ui/lib/style.css'
import VueDND from 'awe-dnd'

import draggable from 'vuedraggable'
import require from '../static/js/require.js'
import Sortable from '../static/js/Sortable.js'

Vue.use(VueDND)
Vue.use(Mint);
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('draggable', draggable);
	new Vue({
	  el: '#app',
	  router,
	  render: h => h(App)
	})

