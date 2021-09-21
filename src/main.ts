import Vue from 'vue';
import App from './App.vue';

import 'share-api-polyfill';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');