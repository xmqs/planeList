import Vue from 'vue'
//import vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from'mint-ui'
import'mint-ui/lib/style.css'

import draggable from 'vuedraggable'
/*import ElementUI from 'element-ui'*/
import { Rate, DatePicker,Carousel,CarouselItem } from 'element-ui';
Vue.prototype.$ELEMENT = { size: 'small' }
//Vue.use(ElementUI)
Vue.use(Rate);
Vue.use(DatePicker);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.use(Mint);
Vue.config.productionTip = false

/*var store = new vuex.Store({
  state:{
    userId:"wyxTest"
  },
  getters:{
    getInfo(){
      return `My userId is ${state.userId}`
    }
  },
  mutations:{
    setUserId(state,age){
      state.userId = age;
    }
  }
})*/

///Vue.use(vuex);
/* eslint-disable no-new */
Vue.component('draggable', draggable);
	new Vue({
	  el: '#app',
	  router,
	  render: h => h(App)
	})


