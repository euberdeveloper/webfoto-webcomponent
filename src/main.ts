import Vue from 'vue';
import WebFoto from './WebFoto.vue';

Vue.config.productionTip = false;


new Vue({
    render: h => h(WebFoto)
}).$mount('#app');