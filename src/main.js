// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRsource from 'vue-resource'
import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
import 'common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueRsource)
const routes = [{
	path: '/',
	component: goods
}, {
	path: '/goods',
	component: goods
}, {
	path: '/ratings',
	component: ratings
}, {
	path: '/seller',
	component: seller
}]
const router = new VueRouter({
	linkActiveClass: 'active', // 改变vue-router的默认样式名
	routes // （缩写）相当于 routes: routes
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	// render: h => h(App) 是以下两种的缩写
	// render: h => {
	// 	return h(App)
	// }
	// 或者
	// render: function (h) {
	// 	return h(App)
	// }
	render: h => h(App)
})
