import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Components from '../plugins/Components';
import Language from '../plugins/Language'

Vue.use(Router)
Vue.use(Vuetify)
Vue.use(Language)
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