import {
	App
} from "../../../core/Application";

class Note {
	constructor(project_id, title, description, category, color, timeline_id) {
		this.id = -1;
		this.project_id = project_id;
		this.title = title;
		this.description = description;
		this.category = category;
		this.color = color;
		this.timeline_id = timeline_id;
		this.order = 0;
	}
}

const state = {
	// Flag to show or hide a menu for items
	menu: {
		show: false,
		x: 0,
		y: 0,
		note: null
	},

	// Contains all the notes for the currently opened project.
	notes: null,

	// Id of the currently opened project.
	projectId: -1
}

const getters = {
	GetNotes(state) {
		return state.notes;
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

		const database = App.GetDB(data.project_id);

		// Set the order for the note.
		note.order = state.notes.filter(note => note.category == data.category).length;

		// Getting the new ID for the note.
		note.id = database.GetId('notes_id');

		// Store the note in the database.
		database.Write('notes', note);

		// Update the state
		state.notes = database.GetAll('notes', 'id');
	},

	/**
	 * Update the order and category of a note.
	 * @param {*} data Contains the HTMLElement of the note in @param data.note, the receiving tag in @param data.tag and the old and new indices in @param data.newIndex and @param data.oldIndex respectively.
	 */
	UpdateNotesOrder(state, data) {
		if (data.note == null || data.tag == null || data.oldIndex == null || data.newIndex == null) throw new Error('UpdateNotesOrder: All or some data attributes missing.');

		// Function to sanitize the HTMLElement ID of a note. 
		const SanitizeNoteId = (id) => {
			return id.substr(id.indexOf('-') + 1, id.length - 1);
		}

		const db = App.GetDB(state.projectId);

		// Getting the note that has been moved.
		const note = state.notes.filter(n => n.id == SanitizeNoteId(data.note.id))[0];

		// Removing the note from the last category.
		state.notes.filter(n => n.category == note.category).splice(data.oldIndex, 1);

		// Adding the note to the new category/
		const categNotes = state.notes.filter(n => n.category == data.tag);

		// Insert the new note in the appropriate index.
		categNotes.splice(data.newIndex, 0, note);

		// This update the new note of the receiving category with the new order.
		for (let i = 0; i < categNotes.length; i++) categNotes[i].order = i;

		note.category = data.tag;

		// Save the new order in the database.
		db.SetValue('notes', state.notes);

		// Retrieve the new values as saved from the database. 
		state.notes = db.GetAll('notes', 'order');
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

		const database = App.GetDB(data.project_id);

		// Create the new note to store.
		database.Update('notes', data.id, data);

		// Update the state
		state.notes = database.GetAll('notes', 'timestamp');
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

	/**
	 * Update the notes array.
	 * @param {Object} state Current state of the Application.
	 * @param {Object} data Contains the data about the project to retrieve the notes for.
	 */
	UpdateNotes(state, data) {
		state.projectId = data.project_id;
		state.notes = App.GetDB(data.project_id).GetAll('notes', 'order');
	}
}

export default {
	state,
	getters,
	mutations
}