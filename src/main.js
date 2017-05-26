import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRedource from 'vue-resource'
import App from './App'
import seller from 'components/seller/seller'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import 'common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueRedource)

/* eslint-disable no-new */
const routes = [
    {
        path: '/',
        component: goods
    },
    {
        path: '/seller',
        component: seller
    },
    {
        path: '/goods',
        component: goods
    },
    {
        path: '/ratings',
        component: ratings
    }
]

const router = new VueRouter({
    'linkActiveClass': 'active',
    mode: 'history',
    routes
})

new Vue({
    el: '#app',
    router,
    render: function (h) {
        return h(App)
    } //简写成： render: h => h(App)
})
