import {
	dbUtils
} from '../../../core/database'

const states = {
	projects: dbUtils.GetAll('projects', 'id')
}

const getters = {

}

const mutations = {

}

export default {
	states,
	getters,
	mutations
}