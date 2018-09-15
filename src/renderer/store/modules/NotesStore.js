import DBManager from "../../../core/DBManager";
import Notifications from '../../../core/Notifications'

class Note {
	constructor(project_id, title, description, category, color, milestone_id, tags) {
		this.id = -1;
		this.project_id = project_id;
		this.title = title;
		this.description = description;
		this.category = category;
		this.color = color;
		this.milestone_id = milestone_id;
		this.tags = tags || [];
		this.order = 0;
		this.tasks = [];
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

	// Note to Update.
	updatedNote: null,

	// Note to visualize
	openedNote: null,

	// Contains all the notes for the currently opened project.
	notes: null,

	// Id of the currently opened project.
	projectId: -1,

	milestoneId: 0,

	// Whether to display the tasks or not.
	displayTasks: DBManager.GetAppDB().GetValue('display_tasks', true),
}

const getters = {
	notes(state) {
		return state.notes;
	},

	isDisplayTasks(state) {
		return state.displayTasks;
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
		if (data.project_id == null || data.title == null || data.description == null || data.category == null || data.milestoneId == null)
			Notifications.Error('CreateNote', "Cannot create a note with invalid data " + data);

		// Create the new note to store.
		let note = new Note(data.project_id, data.title, data.description, data.category, data.color, data.milestoneId, data.tags)

		const database = DBManager.GetDB(data.project_id);

		// Set the order for the note.
		note.order = state.notes.filter(note => note.category == data.category).length;

		// Getting the new ID for the note.
		note.id = database.GetId('notes_id');

		// Store the note in the database.
		database.Write('notes', note);
	},

	/**
	 * Update the order and category of a note.
	 * @param {*} data Contains the HTMLElement of the note in @param data.note, the receiving tag in * @param data.tag and the old and new indices in @param data.newIndex and @param data.oldIndex
	 * respectively.
	 */
	UpdateNotesOrder(state, data) {
		if (data.note == null || data.tag == null || data.oldIndex == null || data.newIndex == null) throw new Error('UpdateNotesOrder: All or some data attributes missing.');

		// Function to sanitize the HTMLElement ID of a note. 
		const SanitizeNoteId = (id) => {
			return id.substr(id.indexOf('-') + 1, id.length - 1);
		}

		const db = DBManager.GetDB(state.projectId);

		// Setup the notes to work with.
		const projectNotes = db.GetAll('notes');
		const currentNotes = projectNotes.filter(note => note.milestone_id == state.milestoneId);

		// Getting the note that has been moved.
		const note = currentNotes.filter(n => n.id == SanitizeNoteId(data.note.id))[0];

		// Removing the note from the last category.
		const sourceNotes = currentNotes.filter(n => n.category == note.category)
		sourceNotes.splice(data.oldIndex, 1);

		// Adding the note to the new category/
		let destNotes = null


		// If the note stays in the same category, then the source and destinatimn array are the same.
		if (note.category == data.tag)
			destNotes = sourceNotes
		else
			destNotes = currentNotes.filter(n => n.category == data.tag);

		// Insert the new note in the appropriate index.
		destNotes.splice(data.newIndex, 0, note);

		// This update the new note of the receiving category with the new order.
		for (let i = 0; i < destNotes.length; i++) destNotes[i].order = i;

		note.category = data.tag;

		// Save the new order in the database.
		db.SetValue('notes', projectNotes);
	},

	/**
	 * Set the note to update.
	 * @param {*State} state NotesStore state.
	 * @param {*Note} data Contains the note to update.
	 */
	SetUpdatedNote(state, note) {
		if (note == null) throw new Error("SetUpdatedNote: note parameter required.")
		state.updatedNote = note;
	},

	/**
	 * This function checks if the note's data in param is valid
	 * and update it in the database. 
	 * @param {*State} state NotesStore state.
	 * @param {*Note} data Contains the note's project id, title, description and category.
	 */
	UpdateNote(state, data) {
		// Make sure the note's data is valid.
		if (data.id == null || data.project_id == null || data.title == null || data.description == null || data.category == null || data.milestone_id == null)
			throw new Error("Cannot update a note with invalid data ", data);

		// Update the timestamp
		data.updated_timestamp = Date.now();

		const database = DBManager.GetDB(data.project_id);

		// Create the new note to store.
		database.Update('notes', {
			id: data.id
		}, data);
	},


	/**
	 * Set the note to visualize.
	 * @param {*State} state NotesStore state.
	 * @param {*Note} data Contains the note to visualize.
	 */
	SetOpenedNote(state, note) {
		if (note == null) throw new Error("SetOpenedNote: note parameter required.")
		state.openedNote = note;
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
		state.projectId = data.projectId;
		state.milestoneId = data.milestoneId;
		state.notes = DBManager.GetDB(data.projectId).GetAll('notes', 'order', [{
			milestone_id: data.milestoneId
		}]);
	},

	/**
	 * Delete a note from a project permnanently.
	 * @param {Object} state Current state of the Application.
	 * @param {Object} note Note to delete.
	 */
	DeleteNote(state, note) {
		DBManager.GetDB(note.project_id).Remove('notes', {
			id: note.id
		});
	},

	/**
	 * Add a task to the currently opened note.
	 * @param {Object} state Current state of the Application.
	 * @param {String} task Content of the task to add.
	 */
	AddTask(state, data) {
		if (state.openedNote == null || data.task == null || data.task.length <= 0 || data.projectId < 0 || data.projectId == null)
			Notifications.Error('Add task', `Cannot add task ${data.task}`);

		const projectDB = DBManager.GetDB(data.projectId);
		state.openedNote.tasks = state.openedNote.tasks || [];
		state.openedNote.tasks.push({
			id: projectDB.GetId('tasks_id'),
			content: data.task,
			done: false
		});
		projectDB.Update('notes', {
			id: state.openedNote.id
		}, state.openedNote);
	},

	/**
	 * Add a task to the currently opened note.
	 * @param {Object} state Current state of the Application.
	 * @param {Object} task Task to update. 
	 */
	ToggleTask(state, data) {
		if (state.openedNote == null || data.task.id == null || data.projectId < 0 || data.projectId == null || state.openedNote.tasks == null)
			Notifications.Error('Add task', `Cannot add task ${data.task}`);

		const projectDB = DBManager.GetDB(data.projectId);
		const task = state.openedNote.tasks.filter(task => task.id == data.task.id)[0];
		task.done = !task.done;
		projectDB.Update('notes', {
			id: state.openedNote.id
		}, state.openedNote);
	},

	ToggleDisplayTasks(state) {
		state.displayTasks = !state.displayTasks;
		DBManager.GetAppDB().SetValue('display_tasks', state.displayTasks);
	},

	ReorderTasks(state, data) {
		if (state.openedNote == null || data.newIndex == null || data.oldIndex < 0)
			Notifications.Error('Redorder Task', `Cannot reorder task ${data.task}`);

		const newIndex = data.newIndex;
		const oldIndex = data.oldIndex;

		const projectDB = DBManager.GetDB(state.projectId);
		// const task = state.openedNote.tasks.filter(task => task.id == data.task.id)[0];
		// task.done = !task.done;
		const tmp = state.openedNote.tasks[oldIndex];
		state.openedNote.tasks[oldIndex] = state.openedNote.tasks[newIndex];
		state.openedNote.tasks[newIndex] = tmp;

		projectDB.Update('notes', {
			id: state.openedNote.id
		}, state.openedNote);
	},

	UpdateNotesCategory(state, data) {
		if (data.projectId == null || data.category == null || data.newTitle == null) Notifications.Error('UpdateNotesCategory', `Cannot update note's category. ${data}`);

		const projectDB = DBManager.GetDB(data.projectId);

		const category = data.newTitle.replace(/ /g, '_').toLowerCase();

		// Update the categories
		state.notes.forEach(note => {
			if (note.category == data.category.tag) note.category = category;
		})

		projectDB.SetValue('notes', state.notes);
	}
}

const actions = {
	CreateNote(context, data) {
		context.commit('CreateNote', data);

		// Update the state
		context.commit('UpdateNotes', {
			projectId: data.project_id,
			milestoneId: data.milestoneId
		});
	},

	UpdateNote(context, data) {
		context.commit('UpdateNote', data);

		// Retrieve the new values as saved from the database. 
		context.commit('UpdateNotes', {
			projectId: state.projectId,
			milestoneId: state.milestoneId
		});
	},

	DeleteNote(context, note) {
		context.commit('DeleteNote', note);

		// Retrieve the new values as saved from the database. 
		context.commit('UpdateNotes', {
			projectId: state.projectId,
			milestoneId: state.milestoneId
		});
	},

	UpdateNotesOrder(context, data) {
		context.commit('UpdateNotesOrder', data);

		// Retrieve the new values as saved from the database. 
		context.commit('UpdateNotes', {
			projectId: state.projectId,
			milestoneId: state.milestoneId
		})
	},

	EditNote(context, note) {
		context.commit('SetUpdatedNote', note);
		context.commit('UpdateNoteDialog');
	},

	VisualizeNote(context, note) {
		context.commit('SetOpenedNote', note);
		context.commit('OpenNoteDialog');
	},

	AddTask(context, task) {
		context.commit('AddTask', {
			projectId: context.getters.openedProjectId,
			task: task
		});
	},

	ToggleTask(context, task) {
		context.commit('ToggleTask', {
			projectId: context.getters.openedProjectId,
			task: task
		})
	},

	ToggleDisplayTasks(context) {
		context.commit('ToggleDisplayTasks');
	},

	ReorderTasks(context, data) {
		context.commit('ReorderTasks', data);
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}