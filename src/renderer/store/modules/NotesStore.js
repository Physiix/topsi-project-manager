import {
	dbUtils
} from '../../../core/database'

class Note {
	constructor(project_id, title, description, category, color) {
		this.id = -1;
		this.project_id = project_id;
		this.title = title;
		this.description = description;
		this.category = category;
		this.color = color;
	}
}

const state = {
	// Contains all the notes.
	notes: dbUtils.GetAll('notes', 'id'),

	// Flag to show or hide a menu for items
	menu: {
		show: false,
		x: 0,
		y: 0,
		note: null
	}
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
		let note = new Note(data.project_id, data.title, data.description, data.category, data.color)
		note.id = dbUtils.GetId('notes_id');

		// Store the note in the database.
		dbUtils.Write('notes', note);

		// Update the state
		state.notes = dbUtils.GetAll('notes', 'id');
	},

	SetShowMenu(state, value) {
		state.menu.show = value;
	},

	SetMenuX(state, value) {
		state.menu.x = value;
	},

	SetMenuY(state, value) {
		state.menu.y = value;
	},

	SetMenuData(state, data) {
		state.menu.show = data.show;
		state.menu.x = data.x;
		state.menu.y = data.y;
		state.menu.note = data.note;
	}
}

export default {
	state,
	getters,
	mutations
}