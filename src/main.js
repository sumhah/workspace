// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router'
import Status from './pages/status'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: {App},
    router: new Router({
        routes: [
            {
                path: '/',
                name: 'status',
                component: Status
            },
            {
                path: '/status',
                name: 'status',
                component: Status
            },
        ]
    })
});
