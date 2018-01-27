import {
	dbUtils
} from '../../../core/database'

class Timeline {
	constructor(title, project_id) {
		this.id = -1;
		this.title = title;
		this.project_id = project_id;
	}
}

const state = {
	// Retrieve all the timelines by their ID.
	timelines: dbUtils.GetAll('timelines', 'id')
};

const getters = {
	/**
	 * Get all the timelines associated with a project.
	 * @param id ID of the project to retrieve the timelines for.
	 */
	GetTimelinesByProjectId(state) {
		return id => this.timelines.filter(timeline => timeline.project_id == id);
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
		if (data.title == null || data.title == '' || data.project_id == null || data.project_id == '')
			return;

		// Create the new timeline object
		const timeline = new Timeline(data.title, data.project_id);
		timeline.id = dbUtils.GetId('timelines_id');

		// Store the new timeline object in the database.
		dbUtils.Write('timelines', timeline);

		// Update the timelines
		state.timelines = dbUtils.GetAll('timelines', 'id');
	}
}

export default {
	state,
	getters,
	mutations
}