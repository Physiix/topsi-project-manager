import DBManager from '../../../core/DBManager';

import Notifications from '../../../core/Notifications'

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
	darkMode: DBManager.GetAppDB().GetValue('dark_mode', false),

	// Base color of the application.
	baseColor: DBManager.GetAppDB().GetValue('application_color', 'indigo'),

	// Information about the github profile
	gitUserInfo: DBManager.GetAppDB().GetValue('git_user_info', {}),

	// Whether the application is opened for the first time.
	firstTimeUse: DBManager.GetAppDB().GetValue('first_time_use', true),

	// Flag set to true to enable to search toolbar
	showSearch: false,

	// Search content
	searchContent: '',

	// Flag set to true to show the helper page.
	showHelper: false,

	// Name of the currently opened project.
	projectName: '',
}

const mutations = {
	CreateProjDialog(state) {
		mutations.OpenDialog(state, 'createProject');
	},

	CreateNoteDialog(state) {
		mutations.OpenDialog(state, 'createNote');
	},

	UpdateNoteDialog(state) {
		mutations.OpenDialog(state, 'updateNote');
	},

	OpenNoteDialog(state) {
		mutations.OpenDialog(state, 'visualizeDialog');
	},

	OpenProject(state, id) {
		state.openedProjectId = id;
		// Set the default milestone when opening a project.
		if (id >= 0) {
			const info = DBManager.GetDB(id).GetValue('info')
			state.projectName = info.title;

			state.currentMilestoneId = info.opened_milestone_id;
		} else
			state.projectName = '';
		state.searchContent = ''; // Clear the search content, searches are different from project to notes.	
	},

	SetDarkMode(state, value) {
		state.darkMode = value;
		DBManager.GetAppDB().SetValue('dark_mode', value);
	},

	ShowSettings(state, value) {
		mutations.OpenDialog(state, 'showSettings');
	},

	SetUsername(state, username) {
		state.gitUserInfo.username = username;
		DBManager.GetDB().SetValue('git_user_info', state.gitUserInfo);
	},

	SetToken(state, token) {
		state.gitUserInfo.repository_token = token;
		DBManager.GetDB().SetValue('git_user_info', state.gitUserInfo);
	},

	SetGistId(state, gistId) {
		state.gitUserInfo.gist_id = gistId;
		DBManager.GetDB().SetValue('git_user_info', state.gitUserInfo);
	},

	SetCurrentMilestoneId(state, id) {
		state.currentMilestoneId = id;
	},

	SetAppColor(state, color) {
		state.baseColor = color;
		DBManager.GetAppDB().SetValue('application_color', color);
	},

	ExportProjDialog(state) {
		mutations.OpenDialog(state, 'exportProject');
	},

	DisableFirstTimeUse(state) {
		DBManager.GetAppDB().SetValue('first_time_use', false);
		state.firstTimeUse = false;
	},

	SetupApplication(state, data) {
		if (data.defaultFolder == null) Notifications.Error('SetupApplication', 'A valid data parameter required :' + data);
		DBManager.GetAppDB().SetValue('default_databases_folder', data.defaultFolder);
		mutations.DisableFirstTimeUse(state);
	},

	AddTag(state, tag) {
		if (tag == null || tag.tag.length <= 0) Notifications.Error('AddTag', `tag "${tag}" is invalid`);
		if (state.openedProjectId < 0) Notifications.Error('AddTag', 'A project must be opened to add a tag');
		const db = DBManager.GetDB(state.openedProjectId);
		const tags = db.GetValue('tags', []);
		tags.push(tag);
		db.SetValue('tags', tags);
	},

	RemoveTag(state, tag) {
		if (tag == null || tag.tag.length <= 0) Notifications.Error('RemoveTag', `tag "${tag}" is invalid`);
		if (state.openedProjectId < 0) Notifications.Error('RemoveTag', 'A project must be opened to add a tag');
		const db = DBManager.GetDB(state.openedProjectId);
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
		mutations.OpenDialog(state, 'updateProject');
	},

	SetSearchContent(state, value) {
		state.searchContent = value;
	},

	ToggleMilestonesList(state, value) {
		mutations.OpenDialog(state, 'milestonesList', value);
	},

	ToggleShowHelper(state, value) {
		if (value != null) state.showHelper = value;
		else state.showHelper = !state.showHelper;
		mutations.OpenDialog(state, 'test');
	},

	OpenDialog(state, dialog, value) {
		for (let property in state.dialogs)
			(property == dialog) ? state.dialogs[property] = value || !state.dialogs[property] : state.dialogs[property] = false;
	}
}

const getters = {
	isMac() {
		return DBManager.GetAppDB().GetValue('isMac', false);
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
		return DBManager.GetDB(state.openedProjectId).GetValue('tags', []);
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
		return DBManager.GetAppDB().GetValue('default_databases_folder', '');
	},

	isMilestonesList(state) {
		return state.dialogs.milestonesList;
	},

	getCurrentProjectMilestones(state) {
		return () => DBManager.GetDB(state.openedProjectId).GetAll('milestones', 'id');
	},

	getCurrentMilestoneId(state) {
		return state.currentMilestoneId;
	},

	isShowHelper(state) {
		return state.showHelper;
	},

	getProjectName(state) {
		return state.projectName;
	}
}

export default {
	state,
	getters,
	mutations
}