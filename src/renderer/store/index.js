import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import {
	Memento
} from '../plugins/Memento';

Vue.use(Vuex)

export default new Vuex.Store({
	modules,
	strict: process.env.NODE_ENV !== 'production',
	plugins: [Memento]
})