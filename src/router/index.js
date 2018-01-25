import VueRouter from 'vue-router'

// Views //
import About from '../components/Views/About.vue'
import Home from '../components/Home.vue'

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/about',
			name: 'About',
			component: About
		}
	],
})

// router.afterEach(() => {
// 	store.dispatch('layout/setSideNavOpen', false)
// })

export default router