import lowdb from 'lowdb'
import path from 'path'
import fs from 'fs'
import os from 'os'

// Adapter
const FileSync = require('lowdb/adapters/FileSync');


//Class containing all kind of helper functions to access
//write and alter the local database.
export class DBUtils {
	constructor(name, defaultPath) {
		// Paths
		const dir = process.platform == 'darwin' ? path.join(os.homedir(), '.topsi') : path.resolve('.');
		if (defaultPath == null || defaultPath.length <= 0) this.dataPath = path.join(dir, 'data/');
		else this.dataPath = defaultPath;
		const dbFilePath = path.join(this.dataPath, name);

		// Make sure the 'data' folder exists
		if (!fs.existsSync(this.dataPath)){
			if(process.platform == 'darwin' && !fs.existsSync(dir)) fs.mkdirSync(dir);
			fs.mkdirSync(this.dataPath);
		}
		const adapter = new FileSync(dbFilePath);
		this.context = new lowdb(adapter);
	}

	/**
	 * Set a value in the Database.
	 * @param {*string} key Key of the value to set.
	 * @param {*any} value Value of the value to set.
	 */
	SetValue(key, value) {
		this.context.set(key, value).write();
	}

	/**
	 * Retrieve and Id from the database and increment its value.
	 * @param {*string} key Key of the id to retrieve
	 */
	GetId(key) {
		const id = this.GetValue(key, 0);
		this.SetValue(key, id + 1);
		return id;
	}


	//Get a value form the database.
	//@param key Key of the value to fetch.
	//@param defaultValue [optional] Default value to set if the value is not found.
	GetValue(key, defaultValue = '') {
		let value = this.context.get(key).value();
		if (value == null) {
			this.SetValue(key, defaultValue);
			return this.GetValue(key, defaultValue);
		}
		return value;
	}

	//Write and object in the Database and save it.
	//@param table Table to store the object into.
	//@object Object to store.
	Write(table, object) {
		// Create table if not set
		if (this.context.get(table).value() == null)
			this.SetValue(table, []);

		// Adding timestamp.
		object.timestamp = Date.now();

		// Writing the object
		this.context.get(table).push(object).write();
	}

	/**
	 * This function delete entries from the Database if found.
	 * @param {*string} table Table of the entries to delete. 
	 * @param {*object} condition Condition to test each entry with before deleting.
	 */
	Remove(table, condition) {
		this.context.get(table).remove(condition).write();
	}

	/**
	 * Save the state of the current database.
	 */
	Save() {
		this.context.write();
	}

	//Get all the entries from a table.
	//@param table Table to retrieve the entries from.
	//@orderBy [optional] Member data to order the list with.
	GetAll(table, orderBy = null, filters = null) {
		let result = this.context.get(table);

		// Order the result if specified
		if (orderBy != null)
			result = result.orderBy(orderBy);

		// Filter the query if required.
		if (filters != null)
			for (var i = 0; i < filters.length; i++)
				result = result.filter(filters[i]);

		return result.value();
	}

	// Retrieve a single entry form the Database.
	// @param table Table to retrieve the data from.
	// @param id Id of the entry to retrieve.
	GetById(table, id) {
		return this.context.get(table).filter({
			id: id
		}).first().value();
	}

	// Retrieve a single entry form the Database.
	// @param table Table to retrieve the data from.
	// @param filter Object filtering the query.
	GetBy(table, filter) {
		return this.context.get(table).filter(filter).first().value();
	}

	/**
	 * Update the content of an object in the database.
	 * @param {*string} table Object Table's name.
	 * @param {*int} key Key of the object(s) to update.
	 * @param {*object} data Contains the new data to store within the object.
	 */
	Update(table, key, data) {
		// Adding timestamp.
		data.timestamp = Date.now();

		// Updating the data
		const t = this.context.get(table);
		if (key != null) t.find(key).assign(data).write();
		else t.assign(data).write();
	}

	/**
	 * Retrieve the absolute path of the file storing the database.
	 * @return {*string} Path to the database.
	 */
	GetPath() {
		return dbFilePath;
	}
}