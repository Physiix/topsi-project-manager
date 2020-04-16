import { DBUtils } from "./Database";

const EXTENSION = ".json";
class DBManager {
  private appDB: DBUtils = new DBUtils("database.json");
  private databases: { [key: string]: DBUtils } = {};
  private defaultFolder: string;

  constructor() {
    this.defaultFolder = this.appDB.getValue("default_databases_folder", "") || null;

    this.appDB
      .getAll("projects")
      .forEach((project: any) => this.load(project.id, project.customPath || this.defaultFolder));
  }

  /**
   * Get the main Database used by the application.
   */
  getAppDB() {
    return this.appDB;
  }

  /**
   * Load a database into memory.
   * @param {Number} id Id of the database's project.
   */
  load(id: string, defaultFolder: string | null = null) {
    try {
      this.databases[id + EXTENSION] = new DBUtils(id + EXTENSION, defaultFolder);
    } catch (e) {
      // Notify the user that the project's path was not found
    }
  }

  move(id: string, path: string) {
    const state = this.getDB(id).getContent();
    this.load(id, path);
    // this.GetDB(id).context.setState(state);
  }

  /**
   * Get the database registered for the project with @param id
   * @param {String} id ID of the project.
   */
  getDB(id: string | number) {
    return this.databases[id + EXTENSION];
  }

  /**
   * Create a new Database for a project.
   * @param path Path where to store the database.
   * @return ID of the project to create the Database for.
   */
  createDB(path: string) {
    const id = this.appDB.getId("projects_id");
    const dbName = id + EXTENSION;
    this.databases[dbName] = new DBUtils(dbName, path);
    return id;
  }
}

export default new DBManager();
