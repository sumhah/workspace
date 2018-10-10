import Vue from 'vue';
import App from './App';
import router from './router'
import store from './store'

Vue.config.productionTip = false;

/* eslint-disable no-new */
// const data = this.data;
// data.splice(data.indexOf(item), 1);
console.log(Vue.prototype);

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App},
    router,
    store,
})
