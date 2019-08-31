import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import store from './store';
import components from './components';
import 'element-ui/lib/theme-chalk/index.css';
import VueHighlightJS from 'vue-highlight.js';
import 'vue-highlight.js/lib/allLanguages'

/*
* Import Highlight.js theme
* Find more: https://highlightjs.org/static/demo/
*/
import 'highlight.js/styles/monokai-sublime.css';
// import 'highlight.js/styles/an-old-hope.css';
// import 'highlight.js/styles/atom-one-dark-reasonable.css';

Vue.use(ElementUI);
Vue.use(components);
Vue.use(VueHighlightJS);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
});
