import DBManager from "@/core/DBManager";
import EventManager from "@/core/EventManager";
import { Project, Category } from "@/core/Data";

type State = {
  projects: Project[];
};

const state: State = {
  // Contains all the projects created in the application.
  projects: []
};

const getters = {
  getProjectById(state: State) {
    return (id: number | string) => state.projects.filter(project => project.id === id)[0];
  },

  projects(state: State) {
    return state.projects;
  }
};

const mutations = {
  /**
   * Retrieve all the projects from the database.
   * @param {*State} state ProjectStore state.
   */
  RetrieveProjects(state: State) {
    state.projects = DBManager.getAppDB()
      .getAll<Project>("projects")
      .sort((a, b) => a.id - b.id);
  },

  /**
   * This function checks if the project's data in param is valid
   * and add store it in the database.
   * @param {*State} state ProjectStore state.
   * @param {*Project} data Contains the project's title and description.
   */
  CreateProject(state: State, data: Project) {
    // Make sure the project's data is valid.
    if (
      data.title == null ||
      data.description == null ||
      data.categories == null ||
      data.categories.length <= 0
    ) {
      throw new Error(`Cannot create a project with invalid data: ${data}`);
    }

    // Create the new project to store.
    let project = new Project(data.title, data.description, data.categories);
    project.customPath =
      data.customPath || DBManager.getAppDB().getValue("default_databases_folder");

    // Create the database for the project.
    project.id = DBManager.createDB(data.customPath);

    const appDB = DBManager.getAppDB();
    // Store the project in the database.
    appDB.write("projects", project);

    const projectDB = DBManager.getDB(project.id);
    // Store the project info in its own database
    projectDB.setValue("info", project);

    // Create first milestone.
    projectDB.write("milestones", {
      id: 0,
      title: "Default"
    });

    // Count the default milestone
    projectDB.setValue("milestones_id", 1);

    // Create empty notes array
    projectDB.setValue("notes", []);
  },

  UpdateProject(state: State, data: any) {
    // Make sure the project's data is valid.
    if (
      data.id == null ||
      data.title == null ||
      data.description == null ||
      data.categories == null ||
      data.categories.length <= 0
    ) {
      throw new Error(`Cannot update a project with invalid data ${Object.values(data)}`);
    }

    // Move to the new path.
    DBManager.move(data.id, data.customPath);

    // Update the project
    DBManager.getDB(data.id).setValue("info", data);
    DBManager.getAppDB().update("projects", data.id, data);
  },

  /**
   * Delete a project from the database.
   * Note, only the entry of the project is deleted, the project's file is NOT deleted.
   * @param {*State} state ProjectStore state.
   * @param {*Project} project Contains the data about the project to delete.
   */

  DeleteProject(state: State, project: Project) {
    if (project.id == null) {
      throw new Error("Project ID required to delete a project.");
    }

    DBManager.getAppDB().remove("projects", {
      id: project.id
    });
  },

  ToggleFoldCategory(state: State, data: any) {
    if (data.projectId == null || data.category.tag == null || data.category.title == null) {
      throw new Error(`Cannot fold a category with invalid data ${data}`);
    }

    const projectDB = DBManager.getDB(data.projectId);
    const projectInfo = projectDB.getValue("info");

    // Update the categories
    projectInfo.categories.forEach((category: Category) => {
      if (category.tag == data.category.tag && category.title == data.category.title)
        category.folded = !category.folded;
    });

    projectDB.setValue("info", projectInfo);
    DBManager.getAppDB().update("projects", projectInfo.id, projectInfo);
  },

  UpdateCategory(state: State, data: any) {
    if (data.projectId == null || data.category == null || data.newTitle == null) {
      throw new Error(`Cannot fold a category with invalid data ${data}`);
    }

    const projectDB = DBManager.getDB(data.projectId);
    const projectInfo = projectDB.getValue("info");

    // Update the categories
    projectInfo.categories.forEach((category: Category) => {
      if (category.tag == data.category.tag && category.title == data.category.title) {
        let categ = data.newTitle.replace(/ /g, "_");
        categ = categ.toLowerCase();
        category.tag = categ;
        category.title = data.newTitle;
      }
    });

    projectDB.setValue("info", projectInfo);
    DBManager.getAppDB().update("projects", projectInfo.id, projectInfo);
  },

  /**
   * Update the content of the projets.
   */
  UpdateProjects(state: State) {
    state.projects = DBManager.getAppDB()
      .getAll<Project>("projects")
      .sort((a, b) => a.id - b.id);
  }
};

const actions = {
  CreateProject(context: any, data: any) {
    context.commit("CreateProject", data);

    // Retrieve all the projects.
    context.commit("RetrieveProjects");
  },

  DeleteProject(context: any, data: any) {
    context.commit("DeleteProject", data);

    // Close the dialog
    context.dispatch("ToggleDialog", "UpdateProjectDialog");

    // When the project is deleted, the user is redirected to the projects page.
    context.commit("OpenProject", -1);
  },

  UpdateProject(context: any, data: any) {
    context.commit("UpdateProject", data);

    // Update the layout
    EventManager.emit("update-notes-component");

    // Retrieve all the projects.
    context.commit("RetrieveProjects");
  },

  UpdateCategory(context: any, data: any) {
    // Update the notes with the category.
    context.commit("UpdateNotesCategory", data);

    // Update the cateogry.
    context.commit("UpdateCategory", data);

    // Retrieve all the projects.
    context.commit("RetrieveProjects");

    // Update the layout
    EventManager.emit("update-notes-component");
  },

  ToggleFoldCategory(context: any, data: any) {
    context.commit("ToggleFoldCategory", data);

    // Retrieve all the projects.
    context.commit("RetrieveProjects");

    // Update the layout
    EventManager.emit("update-notes-component");
  },

  OpenProject(context: any, project: Project) {
    if (project == null) {
      context.commit("OpenProject", -1);
      return;
    }

    context.commit("OpenProject", project.id);
    context.commit("UpdateNotes", {
      projectId: project.id,
      milestoneId: project.selectedMilestoneId
    });
    context.commit("UpdateMilestones", {
      projectId: project.id
    });
  },

  RetrieveProjects(context: any) {
    context.commit("UpdateProjects");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
