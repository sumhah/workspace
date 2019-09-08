import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import store from './store';
import components from './components';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-highlight.js/lib/allLanguages'
import axios from 'axios';
import VueAxios from 'vue-axios';
import {get, post, deleteApi, put} from './libs/request'
import 'highlight.js/styles/monokai-sublime.css';
import VueCodemirror from 'vue-codemirror';

import 'codemirror/mode/vue/vue.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/php/php.js';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/nginx/nginx.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/sass/sass.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlembedded/htmlembedded.js';

import './scss/reset.scss';
import "./scss/transition.scss";
import "./scss/animate.scss";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

Vue.use(VueAxios, axios);

Vue.prototype.get = get
Vue.prototype.post = post
Vue.prototype.deleteApi = deleteApi
Vue.prototype.put = put

Vue.use(ElementUI);
Vue.use(components);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
});
