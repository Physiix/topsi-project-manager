import {
	GitUserInfo
} from '../../../core/git';
import {
	App
} from '../../../core/Application';

import {
	Notifications
} from '../../../core/Notification'
import {
	EventsManager
} from '../../../core/EventManager.js'

const state = {
	// Contains all the flags about dialogs.
	dialogs: {
		createProject: false,
		createNote: false,
		showSettings: false,
		updateNote: false,
		visualizeDialog: false,
		exportProject: false,
		updateProject: false,
		milestonesList: false,
	},

	// ID of the currently opened project.
	openedProjectId: -1,

	// ID of the currently opened milestone.
	currentMilestoneId: 0,

	// Width of the main drawer
	drawerWidth: 200,

	// Whether dark mode is enabled or not.
	darkMode: App.GetAppDB().GetValue('dark_mode', false),

	// Base color of the application.
	baseColor: App.GetAppDB().GetValue('application_color', 'indigo'),

	// Information about the github profile
	gitUserInfo: App.GetAppDB().GetValue('git_user_info', new GitUserInfo()),

	// Whether the application is opened for the first time.
	firstTimeUse: App.GetAppDB().GetValue('first_time_use', true),

	// Flag set to true to enable to search toolbar
	showSearch: false,

	// Search content
	searchContent: '',

	// Flag set to true to show the helper page.
	showHelper: false,
}

const mutations = {
	CreateProjDialog(state) {
		state.dialogs.createProject = !state.dialogs.createProject;
	},

	CreateNoteDialog(state) {
		state.dialogs.createNote = !state.dialogs.createNote;
	},

	UpdateNoteDialog(state) {
		state.dialogs.updateNote = !state.dialogs.updateNote;
	},

	OpenNoteDialog(state) {
		state.dialogs.visualizeDialog = !state.dialogs.visualizeDialog;
	},

	OpenProject(state, id) {
		state.openedProjectId = id;
		// Set the default milestone when opening a project.
		if (id >= 0) state.currentMilestoneId = App.GetDB(id).GetValue('info').opened_milestone_id;
		state.searchContent = ''; // Clear the search content, searches are different from project to notes.
	},

	SetDarkMode(state, value) {
		state.darkMode = value;
		App.GetAppDB().SetValue('dark_mode', value);
	},

	ShowSettings(state, value) {
		state.dialogs.showSettings = !state.dialogs.showSettings;
	},

	SetUsername(state, username) {
		state.gitUserInfo.username = username;
		App.GetDB().SetValue('git_user_info', state.gitUserInfo);
	},

	SetToken(state, token) {
		state.gitUserInfo.repository_token = token;
		App.GetDB().SetValue('git_user_info', state.gitUserInfo);
	},

	SetGistId(state, gistId) {
		state.gitUserInfo.gist_id = gistId;
		App.GetDB().SetValue('git_user_info', state.gitUserInfo);
	},

	SetCurrentMilestoneId(state, id) {
		state.currentMilestoneId = id;
	},

	SetAppColor(state, color) {
		state.baseColor = color;
		App.GetAppDB().SetValue('application_color', color);
	},

	ExportProjDialog(state) {
		state.dialogs.exportProject = !state.dialogs.exportProject;
	},

	DisableFirstTimeUse(state) {
		App.GetAppDB().SetValue('first_time_use', false);
		state.firstTimeUse = false;
	},

	SetupApplication(state, data) {
		if (data.defaultFolder == null) Notifications.Error('SetupApplication', 'A valid data parameter required :' + data);
		App.GetAppDB().SetValue('default_databases_folder', data.defaultFolder);
		mutations.DisableFirstTimeUse(state);
	},

	AddTag(state, tag) {
		if (tag == null || tag.tag.length <= 0) Notifications.Error('AddTag', `tag "${tag}" is invalid`);
		if (state.openedProjectId < 0) Notifications.Error('AddTag', 'A project must be opened to add a tag');
		const db = App.GetDB(state.openedProjectId);
		const tags = db.GetValue('tags', []);
		tags.push(tag);
		db.SetValue('tags', tags);
	},

	RemoveTag(state, tag) {
		if (tag == null || tag.tag.length <= 0) Notifications.Error('RemoveTag', `tag "${tag}" is invalid`);
		if (state.openedProjectId < 0) Notifications.Error('RemoveTag', 'A project must be opened to add a tag');
		const db = App.GetDB(state.openedProjectId);
		let tags = db.GetValue('tags', []);
		let index = -1;
		for (let i = 0; i < tags.length; i++)
			if (tags[i].tag == tag.tag) {
				index = i;
				break;
			}
		if (index == -1) Notifications.Error('RemoveTag', 'Could not find tag ' + tag);
		tags.splice(index, 1);
		db.SetValue('tags', tags);
	},

	ToggleSearch(state) {
		state.showSearch = !state.showSearch;
	},

	ToggleUpdateProject(state) {
		state.dialogs.updateProject = !state.dialogs.updateProject;
	},

	SetSearchContent(state, value) {
		state.searchContent = value;
	},

	ToggleMilestonesList(state, value) {
		state.dialogs.milestonesList = value || !state.dialogs.milestonesList;
	},

	ToggleShowHelper(state, value) {
		if (value != null) state.showHelper = value;
		else state.showHelper = !state.showHelper;
	}
}

const getters = {
	isMac() {
		return App.GetAppDB().GetValue('isMac', false);
	},

	IsProjectOpened(state) {
		return state.openedProjectId != -1;
	},

	appColor(state) {
		return state.baseColor;
	},

	IsDarkMode(state) {
		return state.darkMode;
	},

	drawerWidth(state) {
		return state.drawerWidth;
	},

	firstTimeUse(state) {
		return state.firstTimeUse;
	},

	getProjectTags(state) {
		if (state.openedProjectId < 0) Notifications.Error('getProjecTags', 'A project must be opened to get its tags');
		return App.GetDB(state.openedProjectId).GetValue('tags', []);
	},

	isShowSearch(state) {
		return state.showSearch;
	},

	isUpdateProject(state) {
		return state.dialogs.updateProject;
	},

	getCurrentProject(state) {
		return (context) => context.$store.getters.GetProjectById(state.openedProjectId);
	},

	getSearchContent(state) {
		return state.searchContent;
	},

	getOpenedProjectId(state) {
		return state.openedProjectId;
	},

	getDefaultPath(state) {
		return App.GetAppDB().GetValue('default_databases_folder', '');
	},

	isMilestonesList(state) {
		return state.dialogs.milestonesList;
	},

	getCurrentProjectMilestones(state) {
		return () => App.GetDB(state.openedProjectId).GetAll('milestones', 'id');
	},

	getCurrentMilestoneId(state) {
		return state.currentMilestoneId;
	},

	isShowHelper(state) {
		return state.showHelper;
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
			// if (context.state.gitUserInfo.username == '' || context.state.gitUserInfo.repository_token == '')
			// 	return reject('Invalid git user data.');

			// // Authenticate the user to github.
			// git.Authenticate({
			// 	username: context.state.gitUserInfo.username,
			// 	repository_token: context.state.gitUserInfo.repository_token,
			// 	gist_id: context.state.gitUserInfo.gist_id
			// });

			// // Retrieve data from the database.
			// const data = JSON.stringify(dbUtils.context);

			// // Save the database data in the repository.
			// git.SaveGist('database.json', data).then(result => {
			// 	context.commit('SetGistId', result.data.id);
			// }).catch(error => {
			// 	throw error;
			// });
		});
	},

	DownloadGist(context) {
		// return new Promise((resolve, reject) => {
		// 	// Check if the user data are valid
		// 	if (context.state.gitUserInfo.username == '' || context.state.gitUserInfo.repository_token == '')
		// 		return reject('Invalid git user data.');

		// 	// Authenticate the user to github.
		// 	git.Authenticate({
		// 		username: context.state.gitUserInfo.username,
		// 		repository_token: context.state.gitUserInfo.repository_token,
		// 		gist_id: context.state.gitUserInfo.gist_id
		// 	});

		// 	// Load the settings from the remote gist.
		// 	git.LoadGist().then(gist => {
		// 		require('fs').writeFile(dbUtils.GetPath(), gist.data.files['database.json'].content, (error) => {
		// 			if (error) reject(error);
		// 			else {
		// 				require('electron').remote.getCurrentWindow().webContents.reloadIgnoringCache();
		// 				resolve(gist.data);
		// 			}
		// 		})
		// 	}).catch(error => {
		// 		reject(error);
		// 	})
		// })
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}