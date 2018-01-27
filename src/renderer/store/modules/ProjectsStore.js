import {
	dbUtils
} from '../../../core/database'

class Project {
	constructor(title, description) {
		this.id = -1;
		this.title = title;
		this.description = description;
		this.opened_timeline_id = 0;
	}
}

const state = {
	projects: dbUtils.GetAll('projects', 'id')
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
		// Make sure the project's data is valid.
		if (data.title == null || data.description == null)
			throw new Error("Cannot create a project with invalid data ", data);

		// Create the new project to store.
		let project = new Project(data.title, data.description)
		project.id = dbUtils.GetId('projects_id');
		project.opened_timeline_id = dbUtils.GetId('timelines_id');

		// Store the project in the database.
		dbUtils.Write('projects', project);

		// Create first timeline.
		dbUtils.Write('timelines', {
			id: project.opened_timeline_id,
			project_id: project.id,
			title: 'Default'
		});

		// Update the state
		state.projects = dbUtils.GetAll('projects', 'id');
	},

	SetProjectTimelineId(state, data) {
		// Check if the data is valid.
		if (data.project_id == null || data.project_id < 0 || data.timeline_id == null || data.timeline_id < 0)
			throw new Error("Cannot set invalid timeline data to project.");

		// Update the project.
		dbUtils.Update('projects', {
			id: data.project_id
		}, {
			opened_timeline_id: data.timeline_id
		});

		// Update the projects.
		state.projects = dbUtils.GetAll('projects', 'id');
	}
}

export default {
	state,
	getters,
	mutations
}