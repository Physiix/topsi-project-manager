import {
	App
} from "../../../core/Application";

class Timeline {
	constructor(title, project_id) {
		this.id = -1;
		this.title = title;
		this.project_id = project_id;
	}
}

const state = {
	// Retrieve all the timelines by their ID.
	timelines: null,
};

const getters = {
	/**
	 * Get all the timelines associated with a project.
	 * @param id ID of the project to retrieve the timelines for.
	 */
	GetTimelines(state) {
		return state.timelines;
	}
}

const mutations = {
	/**
	 * Create a new timeline and store it in the database.
	 * The data to create the timeline with is checked.
	 * @param {*State} state State of TimelineStore
	 * @param {*Timeline} data Contains the data about the timeline to create.
	 */
	CreateTimeline(state, data) {
		// Check if the data is valid.
		if (data.title == null || data.title == '' || data.project_id == null)
			return;

		// Create the new timeline object
		const timeline = new Timeline(data.title, data.project_id);
		const projectDB = App.GetDB(data.project_id);
		timeline.id = projectDB.GetId('timelines_id');

		// Store the new timeline object in the database.
		projectDB.Write('timelines', timeline);

		// Update the timelines
		mutations.UpdateTimelines(state, data);
	},

	/**
	 * Get all the timelines from the current project's database.
	 */
	UpdateTimelines(state, data) {
		if (data.project_id == null) throw new Error('UpdateTimelines: Project id required.');
		state.timelines = App.GetDB(data.project_id).GetAll('timelines', 'id');
	}
}

export default {
	state,
	getters,
	mutations
}