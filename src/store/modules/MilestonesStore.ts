import DBManager from "@/core/DBManager";
import { Milestone } from "@/core/Data";

type State = {
  // Retrieve all the milestones by their ID.
  milestones: Milestone[];
};

const state: State = {
  milestones: []
};

const getters = {
  /**
   * Get all the milestones associated with a project.
   * @param id ID of the project to retrieve the milestones for.
   */
  milestones(state: State) {
    return state.milestones;
  }
};

const mutations = {
  /**
   * Create a new milestone and store it in the database.
   * The data to create the milestone with is checked.
   * @param {*State} state State of MilestoneStore
   * @param {*Milestone} data Contains the data about the milestone to create.
   */
  CreateMilestone(state: State, data: any) {
    // Check if the data is valid.
    if (data.projectId == null || data.name == null) {
      throw new Error("A valid data attribute is required");
    }

    const projectDB = DBManager.GetDB(data.projectId);
    // Create the new milestone object
    const milestone = new Milestone(projectDB.GetId("milestones_id"), data.name);

    // Store the new milestone object in the database.
    projectDB.Write("milestones", milestone);

    // Update the milestones
    mutations.UpdateMilestones(state, data);
  },

  UpdateProjectMilestoneId(state: State, data: any) {
    // Check if the data is valid.
    if (data.projectId == null || data.milestoneId == null) {
      throw new Error("Cannot set invalid milestone data to project.");
    }

    const projectDB = DBManager.GetDB(data.projectId);
    const projectInfo = projectDB.GetValue("info");

    projectInfo.opened_milestone_id = data.milestoneId;

    projectDB.setValue("info", projectInfo);
    DBManager.GetAppDB().Update("projects", projectInfo.id, projectInfo);
  },

  /**
   * Get all the milestones from the current project's database.
   */
  UpdateMilestones(state: State, data: any) {
    if (data.projectId == null) {
      throw new Error("UpdateMilestones: Project id required.");
    }
    state.milestones = DBManager.GetDB(data.projectId).GetAll("milestones");
  }
};

export default {
  state,
  getters,
  mutations
};
