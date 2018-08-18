import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Components from '../plugins/Components';

Vue.use(Router)
Vue.use(Vuetify)
Vue.use(Components)

export default new Router({
	routes: [{
			path: '/',
			name: 'landing-page',
			component: require('@/components/LandingPage').default
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})