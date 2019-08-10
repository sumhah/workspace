import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import store from './store';
import components from './components';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(components);

Vue.config.productionTip = false;

/* eslint-disable no-new */
// const data = this.data;
// data.splice(data.indexOf(item), 1);

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
});
