import Vue from 'vue';
import Router from 'vue-router';
import Status from './pages/status';
import Notepad from './pages/notepad';
import AST from './pages/ast';
import Knowledge from './pages/knowledge';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Knowledge
        },
        {
            path: '/status',
            name: 'status',
            component: Status
        },
        {
            path: '/notepad',
            name: 'notepad',
            component: Notepad
        },
        {
            path: '/ast',
            name: 'ast',
            component: AST
        },
        {
            path: '/knowledge',
            name: 'knowledge',
            component: Knowledge
        },
    ]
});
