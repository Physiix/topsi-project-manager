import DBManager from "../../../core/DBManager";
import Notifications from "../../../core/Notifications";
import EventManager from '../../../core/EventManager.js';


class Project {
	constructor(title, description, categories) {
		this.id = -1;
		this.title = title;
		this.description = description;
		this.categories = categories;
		this.opened_milestone_id = 0;
		this.customPath = '';
	}
}

const state = {
	// Contains all the projects created in the application.
	projects: null,
}

const getters = {
	getProjectById(state) {
		return (id) => state.projects.filter(project => project.id == id)[0];
	},

	projects(state) {
		return state.projects;
	}
}

const mutations = {
	/**
	 * Retrieve all the projects from the database.
	 * @param {*State} state ProjectStore state.
	 */
	RetrieveProjects(state) {
		state.projects = DBManager.GetAppDB().GetAll('projects', 'id');
	},

	/**
	 * This function checks if the project's data in param is valid
	 * and add store it in the database. 
	 * @param {*State} state ProjectStore state.
	 * @param {*Project} data Contains the project's title and description.
	 */
	CreateProject(state, data) {
		// Make sure the project's data is valid.
		if (data.title == null || data.description == null || data.categories == null || data.categories.length <= 0)
			Notifications.Error('CreateProject', "Cannot create a project with invalid data " + data);

		// Create the new project to store.
		let project = new Project(data.title, data.description, data.categories);
		project.customPath = data.customPath || DBManager.GetAppDB().GetValue('default_databases_folder');

		// Create the database for the project.
		project.id = DBManager.CreateDB(data.customPath);

		const appDB = DBManager.GetAppDB();
		// Store the project in the database.
		appDB.Write('projects', project);

		const projectDB = DBManager.GetDB(project.id);
		// Store the project info in its own database
		projectDB.SetValue('info', project);

		// Create first milestone.
		projectDB.Write('milestones', {
			id: 0,
			title: 'Default'
		});

		// Count the default milestone
		projectDB.SetValue('milestones_id', 1);

		// Create empty notes array
		projectDB.SetValue('notes', []);
	},

	UpdateProject(state, data) {
		// Make sure the project's data is valid.
		if (data.id == null || data.title == null || data.description == null || data.categories == null || data.categories.length <= 0)
			Notifications.Error('UpdateProject', "Cannot update a project with invalid data " + Object.values(data));

		// Move to the new path.
		DBManager.Move(data.id, data.customPath);

		// Update the project
		DBManager.GetDB(data.id).SetValue('info', data)
		DBManager.GetAppDB().Update('projects', {
			id: data.id
		}, data);
	},

	/**
	 * Delete a project from the database. 
	 * Note, only the entry of the project is deleted, the project's file is NOT deleted.
	 * @param {*State} state ProjectStore state.
	 * @param {*Project} project Contains the data about the project to delete.
	 */

	DeleteProject(state, project) {
		if (project.id == null) Notifications.Error('DeleteProject', 'Project ID required to delete a project.');

		DBManager.GetAppDB().Remove('projects', {
			id: project.id
		});
	},

	ToggleFoldCategory(state, data) {
		if (data.projectId == null || data.category.tag == null || data.category.title == null) Notifications.Error('FoldCategory', `Cannot fold a category with invalid data ${data}`);

		const projectDB = DBManager.GetDB(data.projectId);
		const projectInfo = projectDB.GetValue('info');

		// Update the categories
		projectInfo.categories.forEach(category => {
			if (category.tag == data.category.tag && category.title == data.category.title) category.folded = !category.folded;
		})

		projectDB.SetValue('info', projectInfo);
		DBManager.GetAppDB().Update('projects', {
			id: projectInfo.id
		}, projectInfo);
	},

	UpdateCategory(state, data) {
		if (data.projectId == null || data.category == null || data.newTitle == null) Notifications.Error('FoldCategory', `Cannot fold a category with invalid data ${data}`);

		const projectDB = DBManager.GetDB(data.projectId);
		const projectInfo = projectDB.GetValue('info');

		// Update the categories
		projectInfo.categories.forEach(category => {
			if (category.tag == data.category.tag && category.title == data.category.title) {
				let categ = data.newTitle.replace(/ /g, '_')
				categ = categ.toLowerCase();
				category.tag = categ;
				category.title = data.newTitle;
			}
		})

		projectDB.SetValue('info', projectInfo);
		DBManager.GetAppDB().Update('projects', {
			id: projectInfo.id
		}, projectInfo);
	},

	/**
	 * Update the content of the projets.
	 */
	UpdateProjects(state) {
		state.projects = DBManager.GetAppDB().GetAll('projects', 'id');
	}
}

const actions = {
	CreateProject(context, data) {
		context.commit('CreateProject', data);

		// Send notification
		Notifications.Success('Project created', `Project ${data.title} has been updated !`);
	},

	DeleteProject(context, data) {
		context.commit('DeleteProject', data);

		// Close the dialog
		context.dispatch('ToggleDialog', 'UpdateProjectDialog');

		// When the project is deleted, the user is redirected to the projects page.
		context.commit('OpenProject', -1);
	},

	UpdateProject(context, data) {
		context.commit('UpdateProject', data);

		// Update the layout
		EventManager.Emit('update-notes-component');

		// Send notification
		Notifications.Success('Project updated', `Project ${data.title} has been updated !`);

		// Retrieve all the projects.
		context.commit('RetrieveProjects');
	},

	UpdateCategory(context, data) {
		// Update the notes with the category.
		context.commit('UpdateNotesCategory', data);

		// Update the cateogry.
		context.commit('UpdateCategory', data);

		// Retrieve all the projects.
		context.commit('RetrieveProjects');

		// Update the layout
		EventManager.Emit('update-notes-component');
	},

	ToggleFoldCategory(context, data) {
		context.commit('ToggleFoldCategory', data);

		// Retrieve all the projects.
		context.commit('RetrieveProjects');

		// Update the layout
		EventManager.Emit('update-notes-component');
	},

	OpenProject(context, project) {
		if (project == null) {
			context.commit('OpenProject', -1);
			return;
		}

		context.commit('OpenProject', project.id);
		context.commit('UpdateNotes', {
			projectId: project.id,
			milestoneId: project.opened_milestone_id
		});
		context.commit('UpdateMilestones', {
			projectId: project.id
		})
	},

	RetrieveProjects(context) {
		context.commit('UpdateProjects');
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}