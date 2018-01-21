import {
	dbUtils
} from '../../../core/database'

class Note {
	constructor(project_id, title, description, category) {
		this.id = -1;
		this.project_id = project_id;
		this.title = title;
		this.description = description;
		this.category = category;
	}
}

const state = {
	notes: dbUtils.GetAll('notes', 'id')
}

const getters = {
	GetNotesById(state) {
		return (id) => state.notes.filter(note => note.project_id == id);
	}
}

const mutations = {
	/**
	 * This function checks if the note's data in param is valid
	 * and add store it in the database. 
	 * @param {*State} state NotesStore state.
	 * @param {*Note} data Contains the note's project id, title, description and category.
	 */
	CreateNote(state, data) {
		// Make sure the note's data is valid.
		if (data.project_id == null || data.title == null || data.description == null || data.category == null)
			throw new Error("Cannot create a note with invalid data ", data);

		// Create the new note to store.
		let note = new Note(data.project_id, data.title, data.description, data.category)
		note.id = dbUtils.GetId('notes_id');

		// Store the note in the database.
		dbUtils.Write('notes', note);

		// Update the state
		state.notes = dbUtils.GetAll('notes', 'id');
	}
}

export default {
	state,
	getters,
	mutations
}