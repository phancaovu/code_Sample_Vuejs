import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'

import '@/themes/index'
import '@/utils/vue-filter'
import '@/mixins/notify'
import '@/utils/web_api'
import 'toastr/toastr.scss'
import ScrollLoader from 'vue-scroll-loader'

Vue.config.productionTip = false
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true,
})
Vue.use(ScrollLoader);
Vue.prototype._ = require('lodash');

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
