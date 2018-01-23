import {
	dbUtils
} from '../../../core/database'
import {
	git
} from '../../../core/git';

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

	// Information about the github profile
	gitUserInfo: dbUtils.GetValue('git_user_info', {})
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

const actions = {
	/**
	 * Sync the content of the database with the upstream gist file.
	 * @param {*Context} context Store context.
	 */
	SyncGist(context) {
		return new Promise((resolve, reject) => {
			// Check if the user data are valid
			if (context.state.gitUserInfo.username == '' || context.state.gitUserInfo.repository_token == '')
				return reject('Invalid git user data.');

			// Authenticate the user to github.
			git.Authenticate({
				username: context.state.gitUserInfo.username,
				repository_token: context.state.gitUserInfo.repository_token,
				gist_id: dbUtils.GetValue('gist_id', '')
			});

			// Save the database data in the repository.
			git.SaveGist('database.json', 'test Updated').then(result => {
				dbUtils.SetValue('gist_id', result.data.id);
			})
		});
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}