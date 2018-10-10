import Vue from 'vue'
import Router from 'vue-router'
import Status from './pages/status'
import Notepad from './pages/notepad'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Status
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
    ]
})
