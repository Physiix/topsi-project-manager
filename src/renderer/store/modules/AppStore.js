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
		searchDialog: false,
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

	// Search content
	searchContent: '',

	// Flag set to true to show the helper page.
	showHelper: false,

	// Name of the currently opened project.
	projectName: '',

	// The currently selected language.
	selectedLanguage: DBManager.GetAppDB().GetValue('lang', 'en'),
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
	},

	OpenDialog(state, dialog, value) {
		for (let property in state.dialogs)
			(property == dialog) ? state.dialogs[property] = value || !state.dialogs[property] : state.dialogs[property] = false;
	},

	SetCurrentLanguage(state, language) {
		if (language == null || language.length <= 0) Notifications.Error('Set Language', 'Cannot set language with invalid data');
		DBManager.GetAppDB().SetValue('lang', language);
		state.selectedLanguage = language;
	}
}

const getters = {
	isMac() {
		return DBManager.GetAppDB().GetValue('isMac', false);
	},

	isProjectOpened(state) {
		return state.openedProjectId != -1;
	},

	appColor(state) {
		return state.baseColor;
	},

	isDarkMode(state) {
		return state.darkMode;
	},

	drawerWidth(state) {
		return state.drawerWidth;
	},

	isFirstTimeUse(state) {
		return state.firstTimeUse;
	},

	projectTags(state) {
		if (state.openedProjectId < 0) Notifications.Error('projectTags', 'A project must be opened to get its tags');
		return DBManager.GetDB(state.openedProjectId).GetValue('tags', []);
	},

	isShowSearch(state) {
		return state.dialogs.searchDialog;
	},

	isUpdateProject(state) {
		return state.dialogs.updateProject;
	},

	currentProject(state) {
		return (context) => context.$store.getters.getProjectById(state.openedProjectId);
	},

	searchContent(state) {
		return state.searchContent;
	},

	openedProjectId(state) {
		return state.openedProjectId;
	},

	defaultPath(state) {
		return DBManager.GetAppDB().GetValue('default_databases_folder', '');
	},

	isMilestonesList(state) {
		return state.dialogs.milestonesList;
	},

	currentProjectMilestones(state) {
		return () => DBManager.GetDB(state.openedProjectId).GetAll('milestones', 'id');
	},

	currentMilestoneId(state) {
		return state.currentMilestoneId;
	},

	isShowHelper(state) {
		return state.showHelper;
	},

	projectName(state) {
		return state.projectName;
	},

	selectedLanguage(state) {
		return state.selectedLanguage;
	}
}

const actions = {
	ToggleDialog(context, dialogName) {
		context.commit('OpenDialog', dialogName);
	},

	RemoveTag(context, tag) {
		context.commit('RemoveTag', tag);
	},

	AddTag(context, tag) {
		context.commit('AddTag', tag);
	},

	SetProjectMilestone(context, data) {
		context.commit('UpdateProjectMilestoneId', data);
		context.commit('SetCurrentMilestoneId', data.milestoneId);
		context.commit('UpdateNotes', data)
	},

	CreateMilestone(context, data) {
		context.commit('CreateMilestone', data);
	},

	SetupApplication(context, data) {
		context.commit('SetupApplication', data)
		context.commit('DisableFirstTimeUse');
	},

	SetCurrentLanguage(context, language) {
		context.commit('SetCurrentLanguage', language);
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}