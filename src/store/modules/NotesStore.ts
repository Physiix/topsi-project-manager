import DBManager from "@/core/DBManager";
import { Note, Task } from "@/core/Data";
import { Dialogs } from "@/core/Constants";

type State = {
  // Flag to show or hide a menu for items
  menu: {
    show: boolean;
    x: number;
    y: number;
    note?: Note;
  };

  // Note to Update.
  editedNote?: Note;

  // Note to visualize
  openedNote?: Note;

  // Contains all the notes for the currently opened project.
  notes: Note[];

  // Id of the currently opened project.
  projectId: number;

  milestoneId: number;

  // Whether to display the tasks or not.
  displayTasks: boolean;
};

const state: State = {
  menu: {
    show: false,
    x: 0,
    y: 0,
    note: undefined
  },
  editedNote: undefined,
  openedNote: undefined,
  notes: [],
  projectId: -1,
  milestoneId: 0,
  displayTasks: DBManager.getAppDB().getValue("display_tasks", true)
};

const getters = {
  notes(state: State) {
    return state.notes;
  },

  isDisplayTasks(state: State) {
    return state.displayTasks;
  },

  openedNote(state: State) {
    return state.openedNote;
  },

  editedNote(state: State) {
    return state.editedNote;
  }
};

const mutations = {
  /**
   * This function checks if the note's data in param is valid
   * and store it in the database.
   * @param {*State} state NotesStore state.
   * @param {*Note} data Contains the note's project id, title, description and category.
   */
  CreateNote(state: State, note: Note) {
    // Make sure the note's data is valid.
    if (
      note.projectId == null ||
      note.title == null ||
      note.description == null ||
      note.category == null ||
      note.milestoneId == null
    ) {
      throw new Error(`Cannot create a note with invalid data ${note}`);
    }
    const database = DBManager.getDB(note.projectId);

    // Set the order for the note.
    note.order = state.notes.filter(note => note.category == note.category).length;

    // Getting the new ID for the note.
    note.id = database.getId("notes_id");

    // Store the note in the database.
    database.write("notes", note);
  },

  /**
   * Update the order and category of a note.
   * @param {*} data Contains the HTMLElement of the note in @param data.note, the receiving tag in * @param data.tag and the old and new indices in @param data.newIndex and @param data.oldIndex
   * respectively.
   */
  UpdateNotesOrder(state: State, data: any) {
    if (data.note == null || data.tag == null || data.oldIndex == null || data.newIndex == null) {
      throw new Error("UpdateNotesOrder: All or some data attributes missing.");
    }

    // Function to sanitize the HTMLElement ID of a note.
    const SanitizeNoteId = (id: string) => {
      return parseInt(id.substr(id.indexOf("-") + 1, id.length - 1));
    };

    const db = DBManager.getDB(state.projectId);

    // Setup the notes to work with.
    const projectNotes = db.getAll<Note>("notes");
    const currentNotes = projectNotes.filter(note => note.milestoneId === state.milestoneId);

    // Getting the note that has been moved.
    const note = currentNotes.filter(n => n.id === SanitizeNoteId(data.note.id))[0];

    // Removing the note from the last category.
    const sourceNotes = currentNotes.filter(n => n.category === note.category);
    sourceNotes.splice(data.oldIndex, 1);

    // Adding the note to the new category/
    let destNotes = null;

    // If the note stays in the same category, then the source and destinatimn array are the same.
    if (note.category == data.tag) destNotes = sourceNotes;
    else destNotes = currentNotes.filter(n => n.category == data.tag);

    // Insert the new note in the appropriate index.
    destNotes.splice(data.newIndex, 0, note);

    // This update the new note of the receiving category with the new order.
    for (let i = 0; i < destNotes.length; i++) destNotes[i].order = i;

    note.category = data.tag;

    // Save the new order in the database.
    db.setValue("notes", projectNotes);
  },

  /**
   * Set the note to update.
   * @param {*State} state NotesStore state.
   * @param {*Note} data Contains the note to update.
   */
  SetEditedNote(state: State, note: Note) {
    state.editedNote = note;
  },

  /**
   * This function checks if the note's data in param is valid
   * and update it in the database.
   * @param {*State} state NotesStore state.
   * @param {*Note} data Contains the note's project id, title, description and category.
   */
  UpdateNote(state: State, data: Note) {
    // Make sure the note's data is valid.
    if (
      data.id == null ||
      data.projectId == null ||
      data.title == null ||
      data.description == null ||
      data.category == null ||
      data.milestoneId == null
    ) {
      throw new Error(`Cannot update a note with invalid data ${data}`);
    }

    // Update the timestamp
    //@ts-ignore
    data["updated_timestamp"] = Date.now();

    const database = DBManager.getDB(data.projectId);

    // Create the new note to store.
    database.update("notes", data.id, data);
  },

  /**
   * Set the note to visualize.
   * @param {*State} state NotesStore state.
   * @param {*Note} data Contains the note to visualize.
   */
  SetOpenedNote(state: State, note: Note) {
    if (note == null) {
      throw new Error("SetOpenedNote: note parameter required.");
    }
    state.openedNote = note;
  },

  SetShowMenu(state: State, value: boolean) {
    state.menu.show = value;
  },

  SetMenuX(state: State, value: number) {
    state.menu.x = value;
  },

  SetMenuY(state: State, value: number) {
    state.menu.y = value;
  },

  SetMenuData(state: State, data: any) {
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
  UpdateNotes(state: State, data: any) {
    state.projectId = data.projectId;
    state.milestoneId = data.milestoneId;
    state.notes = DBManager.getDB(data.projectId)
      .getAll<Note>("notes")
      .filter(note => note.milestoneId === data.milestoneId)
      .sort((a, b) => a.order - b.order);
  },

  /**
   * Delete a note from a project permnanently.
   * @param {Object} state Current state of the Application.
   * @param {Object} note Note to delete.
   */
  DeleteNote(state: State, note: Note) {
    DBManager.getDB(note.projectId).remove("notes", {
      id: note.id
    });
  },

  /**
   * Add a task to the currently opened note.
   * @param {Object} state Current state of the Application.
   * @param {String} task Content of the task to add.
   */
  AddTask(state: State, data: any) {
    if (
      state.openedNote == null ||
      data.task == null ||
      data.task.length <= 0 ||
      data.projectId < 0 ||
      data.projectId == null
    ) {
      throw new Error(`Cannot add task ${data.task}`);
    }

    const projectDB = DBManager.getDB(data.projectId);
    state.openedNote.tasks = state.openedNote.tasks || [];
    state.openedNote.tasks.push(new Task(projectDB.getId("tasks_id"), data.task, false));
    projectDB.update("notes", state.openedNote.id, state.openedNote);
  },

  /**
   * Add a task to the currently opened note.
   * @param {Object} state Current state of the Application.
   * @param {Object} task Task to update.
   */
  ToggleTask(state: State, data: any) {
    if (
      state.openedNote == null ||
      data.task.id == null ||
      data.projectId < 0 ||
      data.projectId == null ||
      state.openedNote.tasks == null
    ) {
      throw new Error(`Cannot add task ${data.task}`);
    }

    const projectDB = DBManager.getDB(data.projectId);
    const task = state.openedNote.tasks.filter(task => task.id == data.task.id)[0];
    task.done = !task.done;
    projectDB.update("notes", state.openedNote.id, state.openedNote);
  },

  ToggleDisplayTasks(state: State) {
    state.displayTasks = !state.displayTasks;
    DBManager.getAppDB().setValue("display_tasks", state.displayTasks);
  },

  ReorderTasks(state: State, data: any) {
    if (state.openedNote == null || data.newIndex == null || data.oldIndex < 0) {
      throw new Error(`Cannot reorder task ${data.task}`);
    }

    const newIndex = data.newIndex;
    const oldIndex = data.oldIndex;

    const projectDB = DBManager.getDB(state.projectId);
    // const task = state.openedNote.tasks.filter(task => task.id == data.task.id)[0];
    // task.done = !task.done;
    const tmp = state.openedNote.tasks[oldIndex];
    state.openedNote.tasks[oldIndex] = state.openedNote.tasks[newIndex];
    state.openedNote.tasks[newIndex] = tmp;

    projectDB.update("notes", state.openedNote.id, state.openedNote);
  },

  UpdateNotesCategory(state: State, data: any) {
    if (data.projectId == null || data.category == null || data.newTitle == null) {
      throw new Error(`Cannot update note's category. ${data}`);
    }

    const projectDB = DBManager.getDB(data.projectId);

    const category = data.newTitle.replace(/ /g, "_").toLowerCase();

    // Update the categories
    state.notes.forEach(note => {
      if (note.category == data.category.tag) note.category = category;
    });

    projectDB.setValue("notes", state.notes);
  }
};

const actions = {
  CreateNote(context: any, data: Note) {
    context.commit("CreateNote", data);

    // Update the state
    context.commit("UpdateNotes", {
      projectId: data.projectId,
      milestoneId: data.milestoneId
    });
  },

  UpdateNote(context: any, data: Note) {
    context.commit("UpdateNote", data);

    // Retrieve the new values as saved from the database.
    context.commit("UpdateNotes", {
      projectId: state.projectId,
      milestoneId: state.milestoneId
    });
  },

  DeleteNote(context: any, note: Note) {
    context.commit("DeleteNote", note);

    // Retrieve the new values as saved from the database.
    context.commit("UpdateNotes", {
      projectId: state.projectId,
      milestoneId: state.milestoneId
    });
  },

  UpdateNotesOrder(context: any, data: any) {
    context.commit("UpdateNotesOrder", data);

    // Retrieve the new values as saved from the database.
    context.commit("UpdateNotes", {
      projectId: state.projectId,
      milestoneId: state.milestoneId
    });
  },

  EditNote(context: any, note: Note) {
    context.commit("SetEditedNote", note);
    context.commit("OpenDialog", Dialogs.EditNote);
  },

  VisualizeNote(context: any, note: Note) {
    context.commit("SetOpenedNote", note);
    context.commit("OpenDialog", Dialogs.VisualizeNote);
  },

  AddTask(context: any, task: Note) {
    context.commit("AddTask", {
      projectId: context.getters.openedProjectId,
      task: task
    });
  },

  ToggleTask(context: any, task: Note) {
    context.commit("ToggleTask", {
      projectId: context.getters.openedProjectId,
      task: task
    });
  },

  ToggleDisplayTasks(context: any) {
    context.commit("ToggleDisplayTasks");
  },

  ReorderTasks(context: any, data: any) {
    context.commit("ReorderTasks", data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
