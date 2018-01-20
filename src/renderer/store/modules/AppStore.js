const state = {
	// Contains all the flags about dialogs.
	dialogs: {
		createProject: false,
	}
}

const mutations = {
	CreateProjDialog(state) {
		state.dialogs.createProject = !state.dialogs.createProject;
	}
}

const getters = {

}

export default {
	state,
	getters,
	mutations
}