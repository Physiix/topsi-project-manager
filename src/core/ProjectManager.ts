import Vue from "vue";
import DBManager from "./DBManager";

import store from "@/store";

const p = require("path");

const vue = new Vue({
  store
});

class ProjectManager {
  saveProject(project: any) {
    const electron = require("electron");
    const { dialog } = electron.remote;

    // Get the path where to save the file.
    const savePath = dialog.showSaveDialog(electron.remote.getCurrentWindow(), {
      title: "Export project",
      defaultPath: `${project.title}.txt`, // TODO: Set the defaultPath with the default folder
      message: "The file extension is note important."
    });

    // Make sure the save path is valid.
    if (savePath == null) return;

    const fs = require("fs");
    const content = JSON.stringify(DBManager.getDB(project.id).getContent());
    fs.writeFile(savePath, content, (error: any) => {
      if (error != null) {
        // Notifications.Error("Export project failed", error.message);
        throw new Error(`Failed to save the file.\n${error}`);
      }
    });
  }

  async loadProject() {
    const electron = require("electron");
    const { dialog } = electron.remote;

    const path = await dialog.showOpenDialog(electron.remote.getCurrentWindow(), {
      properties: ["openFile"],
      title: "Import Project"
    });

    const fs = require("fs");
    fs.readFile(path, "utf8", (error: any, data: any) => {
      if (error != null) {
        // Notifications.Error("Load Project failed", error.message);
        throw new Error(`Failed to open the file.\n${error}`);
      }
      const project = JSON.parse(data);
      const db = DBManager.getAppDB();
      const id = db.getId("projects_id");
      project.info.id = id;
      project.notes.forEach((note: any) => (note.project_id = id));
      db.write("projects", project.info);
      const content = JSON.stringify(project, null, "\t");
      fs.writeFileSync(p.join(db.getDataPath(), `${id}.json`), content);
      DBManager.load(id);
      vue.$store.dispatch("UpdateProjects");
      //   Notifications.Success(
      //     "Success",
      //     `Project ${project.info.title} has been successfully loaded`
      //   );
    });
  }
}

export default new ProjectManager();
