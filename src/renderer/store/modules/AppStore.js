import {
	dbUtils
} from '../../../core/database'
import {
	git,
	GitUserInfo
} from '../../../core/git';

const state = {
	// Contains all the flags about dialogs.
	dialogs: {
		createProject: false,
		createNote: false,
		createTimeline: false,
		showSettings: false,
		updateNote: false
	},

	// ID of the currently opened project.
	openedProjectId: -1,

	// ID of the currently opened timeline.
	currentTimelineId: 0,

	// Width of the main drawer
	drawerWidth: 245,

	// Whether dark mode is enabled or not.
	darkMode: dbUtils.GetValue('dark_mode', true),

	// Base color of the application.
	baseColor: 'orange',

	// Information about the github profile
	gitUserInfo: dbUtils.GetValue('git_user_info', new GitUserInfo()),
}

const mutations = {
	CreateProjDialog(state) {
		state.dialogs.createProject = !state.dialogs.createProject;
	},

	CreateNoteDialog(state) {
		state.dialogs.createNote = !state.dialogs.createNote;
	},

	CreateTimelineDialog(state) {
		state.dialogs.createTimeline = !state.dialogs.createTimeline;
	},

	UpdateNoteDialog(state) {
		state.dialogs.updateNote = !state.dialogs.updateNote;
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
	},

	SetUsername(state, username) {
		state.gitUserInfo.username = username;
		dbUtils.SetValue('git_user_info', state.gitUserInfo);
	},

	SetToken(state, token) {
		state.gitUserInfo.repository_token = token;
		dbUtils.SetValue('git_user_info', state.gitUserInfo);
	},

	SetGistId(state, gistId) {
		console.log('setting gist', gistId);
		state.gitUserInfo.gist_id = gistId;
		dbUtils.SetValue('git_user_info', state.gitUserInfo);
	},

	SetCurrentTimelineId(state, id) {
		state.currentTimelineId = id;
	}
}

const getters = {
	IsProjectOpened(state) {
		return state.openedProjectId != -1;
	},

	appColor(state) {
		return state.baseColor;
	},

	IsDarkMode(state) {
		return state.darkMode;
	}
}

const actions = {
	/**
	 * Upload the content of the database with the upstream gist file.
	 * @param {*Context} context Store context.
	 */
	UploadGist(context) {
		return new Promise((resolve, reject) => {
			// Check if the user data are valid
			if (context.state.gitUserInfo.username == '' || context.state.gitUserInfo.repository_token == '')
				return reject('Invalid git user data.');

			// Authenticate the user to github.
			git.Authenticate({
				username: context.state.gitUserInfo.username,
				repository_token: context.state.gitUserInfo.repository_token,
				gist_id: context.state.gitUserInfo.gist_id
			});

			// Retrieve data from the database.
			const data = JSON.stringify(dbUtils.context);

			// Save the database data in the repository.
			git.SaveGist('database.json', data).then(result => {
				context.commit('SetGistId', result.data.id);
			}).catch(error => {
				throw error;
			});
		});
	},

	DownloadGist(context) {
		return new Promise((resolve, reject) => {
			// Check if the user data are valid
			if (context.state.gitUserInfo.username == '' || context.state.gitUserInfo.repository_token == '')
				return reject('Invalid git user data.');

			// Authenticate the user to github.
			git.Authenticate({
				username: context.state.gitUserInfo.username,
				repository_token: context.state.gitUserInfo.repository_token,
				gist_id: context.state.gitUserInfo.gist_id
			});

			// Load the settings from the remote gist.
			git.LoadGist().then(gist => {
				require('fs').writeFile(dbUtils.GetPath(), gist.data.files['database.json'].content, (error) => {
					if (error) reject(error);
					else {
						require('electron').remote.getCurrentWindow().webContents.reloadIgnoringCache();
						resolve(gist.data);
					}
				})
			}).catch(error => {
				reject(error);
			})
		})
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}