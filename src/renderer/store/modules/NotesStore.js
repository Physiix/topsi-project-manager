import {
	dbUtils
} from '../../../core/database'

class Note {
	constructor(project_id, title, description, category, color, timeline_id) {
		this.id = -1;
		this.project_id = project_id;
		this.title = title;
		this.description = description;
		this.category = category;
		this.color = color;
		this.timeline_id = timeline_id;
	}
}

const state = {
	// Contains all the notes.
	notes: dbUtils.GetAll('notes', 'timestamp'),

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
	 * and store it in the database. 
	 * @param {*State} state NotesStore state.
	 * @param {*Note} data Contains the note's project id, title, description and category.
	 */
	CreateNote(state, data) {
		// Make sure the note's data is valid.
		if (data.project_id == null || data.title == null || data.description == null || data.category == null)
			throw new Error("Cannot create a note with invalid data ", data);

		// Create the new note to store.
		let note = new Note(data.project_id, data.title, data.description, data.category, data.color, data.timeline_id)
		note.id = dbUtils.GetId('notes_id');

		// Store the note in the database.
		dbUtils.Write('notes', note);

		// Update the state
		state.notes = dbUtils.GetAll('notes', 'id');
	},

	/**
	 * This function checks if the note's data in param is valid
	 * and update it in the database. 
	 * @param {*State} state NotesStore state.
	 * @param {*Note} data Contains the note's project id, title, description and category.
	 */
	UpdateNote(state, data) {
		// Make sure the note's data is valid.
		if (data.id == null || data.project_id == null || data.title == null || data.description == null || data.category == null)
			throw new Error("Cannot update a note with invalid data ", data);

		// Create the new note to store.
		dbUtils.Update('notes', data.id, data);

		// Update the state
		state.notes = dbUtils.GetAll('notes', 'timestamp');
	},

	/**
	 * This function simply remove the note from the database.
	 * @param {*State} state NotesStore state.
	 * @param {*number} id Id of the note to remove.
	 */
	RemoveNote(state, id) {
		// Check if the id is valid.
		if (state.menu.note == null || state.menu.note.id == null)
			return;

		// Remove the note from the database.
		dbUtils.Remove('notes', {
			id: state.menu.note.id
		});

		// Update the notes
		state.notes = dbUtils.GetAll('notes', 'timestamp');
	},

	/**
	 * Move the note to the right.
	 * @param {*State} state NotesStore state object.
	 * @param {*} note Note to update.
	 */
	MoveNoteRight(state, note) {
		// Check if the note is valid.
		if (note == null || note.category == '' || note.category == 'done')
			return;

		// Updating the notes
		note.category = (note.category == 'todo') ? 'in_progress' : 'done';
		dbUtils.Update('notes', {
			id: note.id
		}, {
			category: note.category
		});

		// Update the notes.
		state.notes = dbUtils.GetAll('notes', 'timestamp');
	},

	/**
	 * Move the note to the right.
	 * @param {*State} state NotesStore state object.
	 * @param {*} note Note to update.
	 */
	MoveNoteLeft(state, note) {
		// Check if the note is valid.
		if (note == null || note.category == '' || note.category == 'todo')
			return;

		// Updating the notes
		note.category = (note.category == 'done') ? 'in_progress' : 'todo';
		dbUtils.Update('notes', {
			id: note.id
		}, {
			category: note.category
		});

		// Update the notes.
		state.notes = dbUtils.GetAll('notes', 'timestamp');
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
	},

	UpdateNotes() {
		state.notes = dbUtils.GetAll('notes', 'timestamp');
	}
}

export default {
	state,
	getters,
	mutations
}