import {
	dbUtils
} from '../../../core/database'

const state = {
	// Contains all the flags about dialogs.
	dialogs: {
		createProject: false,
		createNote: false,
		showSettings: false
	},

	// ID of the currently opened project.
	openedProjectId: -1,

	// Width of the main drawer
	drawerWidth: 200,

	// Whether dark mode is enabled or not.
	darkMode: dbUtils.GetValue('dark_mode', true),
}

const mutations = {
	CreateProjDialog(state) {
		state.dialogs.createProject = !state.dialogs.createProject;
	},

	CreateNoteDialog(state) {
		state.dialogs.createNote = !state.dialogs.createNote;
	},

	OpenProject(state, id) {
		state.openedProjectId = id;
	},

	SetDarkMode(state, value) {
		state.darkMode = value;
		dbUtils.SetValue('dark_mode', value);
	},

	ShowSettings(state, value) {
		state.dialogs.showSettings = !state.dialogs.showSettings;
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