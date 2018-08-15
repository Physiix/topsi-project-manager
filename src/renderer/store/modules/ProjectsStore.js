import {
	App
} from "../../../core/Application";

class Project {
	constructor(title, description) {
		this.id = -1;
		this.title = title;
		this.description = description;
		this.opened_timeline_id = 0;
	}
}

const state = {
	// Contains all the projects created in the application.
	projects: null,
}

const getters = {
	GetProjectById(state) {
		return (id) => state.projects.filter(project => project.id == id)[0];
	}
}

const mutations = {
	/**
	 * This function checks if the project's data in param is valid
	 * and add store it in the database. 
	 * @param {*State} state ProjectStore state.
	 * @param {*Project} data Contains the project's title and description.
	 */
	CreateProject(state, data) {
		console.log('here')
		// Make sure the project's data is valid.
		if (data.title == null || data.description == null)
			throw new Error("Cannot create a project with invalid data ", data);

		// Create the new project to store.
		let project = new Project(data.title, data.description);

		// Create the database for the project.
		project.id = App.CreateDB();

		const appDB = App.GetAppDB();
		// Store the project in the database.
		appDB.Write('projects', project);

		console.log(appDB)
		const projectDB = App.GetDB(project.id);
		// Store the project info in its own database
		projectDB.Write('info', {
			id: project.id
		});

		// Create first timeline.
		projectDB.Write('timelines', {
			id: 0,
			title: 'Default'
		});

		// Create empty notes array
		projectDB.SetValue('notes', [])

		// Update the state
		state.projects = appDB.GetAll('projects', 'id');
	},

	SetProjectTimelineId(state, data) {
		// Check if the data is valid.
		if (data.project_id == null || data.project_id < 0 || data.timeline_id == null || data.timeline_id < 0)
			throw new Error("Cannot set invalid timeline data to project.");

		// Update the project.
		App.GetDB(data.project_id).Update('info', null, {
			opened_timeline_id: data.timeline_id
		});

		// Update the projects.
		// state.projects = dbUtils.GetAll('projects', 'id');
	},

	/**
	 * Update the content of the projets.
	 */
	UpdateProjects(state) {
		state.projects = App.GetAppDB().GetAll('projects', 'id');
		console.log(state.projects)
	}
}

export default {
	state,
	getters,
	mutations
}