const state = {
	// Contains all the flags about dialogs.
	dialogs: {
		createProject: false,
	},

	// ID of the currently opened project.
	openedProjectId: -1,

	// Width of the main drawer
	drawerWidth: 200
}

const mutations = {
	CreateProjDialog(state) {
		state.dialogs.createProject = !state.dialogs.createProject;
	},

	OpenProject(state, id) {
		state.openedProjectId = id;
	}
}

const getters = {
	IsProjectOpened(state) {
		return state.openedProjectId != -1;
	}
}

export default {
	state,
	getters,
	mutations
}