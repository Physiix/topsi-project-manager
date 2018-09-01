import {
	DBUtils
} from './database'

const EXTENSION = '.json';
class DBManager {
	constructor() {
		this.appDB = new DBUtils('database.json');
		this.databases = [];
		this.defaultFolder = this.appDB.GetValue('default_databases_folder', '') || null;

		this.appDB.GetAll('projects', 'id').forEach(project => this.Load(project.id, project.customPath || this.defaultFolder));
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
	Load(id, defaultFolder) {
		this.databases[id + EXTENSION] = new DBUtils(id + EXTENSION, defaultFolder);
	}

	Move(id, path) {
		const state = this.GetDB(id).context.getState();
		this.Load(id, path);
		this.GetDB(id).context.setState(state);
	}

	/**
	 * Get the database registered for the project with @param id
	 * @param {String} id ID of the project.
	 */
	GetDB(id) {
		return this.databases[id + EXTENSION];
	}

	/**
	 * Create a new Database for a project.
	 * @param path Path where to store the database.
	 * @return ID of the project to create the Database for.
	 */
	CreateDB(path) {
		const id = this.appDB.GetId('projects_id');
		const dbName = id + EXTENSION;
		this.databases[dbName] = new DBUtils(dbName, path);
		return id;
	}
}

export default new DBManager();