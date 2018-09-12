import DBManager from "../../../core/DBManager";

import Notifications from '../../../core/Notifications'

class Milestone {
	constructor(id, title) {
		this.id = id;
		this.title = title;
	}
}

const state = {
	// Retrieve all the milestones by their ID.
	milestones: null,
};

const getters = {
	/**
	 * Get all the milestones associated with a project.
	 * @param id ID of the project to retrieve the milestones for.
	 */
	milestones(state) {
		return state.milestones;
	}
}

const mutations = {
	/**
	 * Create a new milestone and store it in the database.
	 * The data to create the milestone with is checked.
	 * @param {*State} state State of MilestoneStore
	 * @param {*Milestone} data Contains the data about the milestone to create.
	 */
	CreateMilestone(state, data) {
		// Check if the data is valid.
		if (data.projectId == null || data.name == null) Notifications.Error('CreateMilestone', 'A valid data attribute is required');

		const projectDB = DBManager.GetDB(data.projectId);
		// Create the new milestone object
		const milestone = new Milestone(projectDB.GetId('milestones_id'), data.name);

		// Store the new milestone object in the database.
		projectDB.Write('milestones', milestone);

		// Update the milestones
		mutations.UpdateMilestones(state, data);
	},

	UpdateProjectMilestoneId(state, data) {
		// Check if the data is valid.
		if (data.projectId == null || data.milestoneId == null) Notifications.Error('UpdateProjectMilestoneId', 'Cannot set invalid milestone data to project.');

		const projectDB = DBManager.GetDB(data.projectId);
		const projectInfo = projectDB.GetValue('info');

		projectInfo.opened_milestone_id = data.milestoneId;

		projectDB.SetValue('info', projectInfo);
		DBManager.GetAppDB().Update('projects', {
			id: projectInfo.id
		}, projectInfo);
	},

	/**
	 * Get all the milestones from the current project's database.
	 */
	UpdateMilestones(state, data) {
		if (data.projectId == null) throw new Error('UpdateMilestones: Project id required.');
		state.milestones = DBManager.GetDB(data.projectId).GetAll('milestones', 'id');
	}
}

export default {
	state,
	getters,
	mutations
}