import {
	dbUtils
} from '../../../core/database'

class Project {
	constructor(title, description) {
		this.id = -1;
		this.title = title;
		this.description = description;
	}
}

const state = {
	projects: dbUtils.GetAll('projects', 'id')
}

const getters = {

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

		// Store the project in the database.
		dbUtils.Write('projects', project);

		// Update the state
		state.projects = dbUtils.GetAll('projects', 'id');
	}
}

export default {
	state,
	getters,
	mutations
}