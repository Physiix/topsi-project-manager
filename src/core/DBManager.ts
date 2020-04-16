import { DBUtils } from "./Database";

const EXTENSION = ".json";
class DBManager {
  private appDB: DBUtils = new DBUtils("database.json");
  private databases: { [key: string]: DBUtils } = {};
  private defaultFolder: string;

  constructor() {
    this.defaultFolder = this.appDB.GetValue("default_databases_folder", "") || null;

    this.appDB
      .GetAll("projects")
      .forEach((project: any) => this.Load(project.id, project.customPath || this.defaultFolder));
  }

  /**
   * Get the main Database used by the application.
   */
  GetAppDB() {
    return this.appDB;
  }

  /**
   * Load a database into memory.
   * @param {Number} id Id of the database's project.
   */
  Load(id: string, defaultFolder: string | null = null) {
    try {
      this.databases[id + EXTENSION] = new DBUtils(id + EXTENSION, defaultFolder);
    } catch (e) {
      // Notify the user that the project's path was not found
    }
  }

  Move(id: string, path: string) {
    const state = this.GetDB(id).getContent();
    this.Load(id, path);
    // this.GetDB(id).context.setState(state);
  }

  /**
   * Get the database registered for the project with @param id
   * @param {String} id ID of the project.
   */
  GetDB(id: string) {
    return this.databases[id + EXTENSION];
  }

  /**
   * Create a new Database for a project.
   * @param path Path where to store the database.
   * @return ID of the project to create the Database for.
   */
  CreateDB(path: string) {
    const id = this.appDB.GetId("projects_id");
    const dbName = id + EXTENSION;
    this.databases[dbName] = new DBUtils(dbName, path);
    return id;
  }
}

export default new DBManager();
