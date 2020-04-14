import path from "path";
import fs from "fs";
import os from "os";
import { DBFile } from "./DBFile";

// Class containing all kind of helper functions to access
// write and alter the local database.
export class DBUtils {
  private dataPath: string = "";
  private context!: DBFile;
  private dbFilePath: string;
  private content: any;

  constructor(private readonly name: string, defaultPath: string | null = null) {
    // Paths
    const dir =
      process.platform == "darwin" ? path.join(os.homedir(), ".topsi") : path.resolve(".");

    this.dataPath =
      defaultPath == null || defaultPath.length <= 0 ? path.join(dir, "data/") : defaultPath;
    this.dbFilePath = path.join(this.dataPath, this.name);

    // Make sure the 'data' folder exists
    if (!fs.existsSync(this.dataPath)) {
      if (process.platform == "darwin" && !fs.existsSync(dir)) fs.mkdirSync(dir);
      fs.mkdirSync(this.dataPath);
    }
    this.context = new DBFile(this.dbFilePath);

    this.initializeContent();
  }

  private initializeContent() {
    console.log("DEBUG");
    const content = this.context.read();
    console.log("DEBUG");
    console.dir(content);
    if (content === "") {
      this.content = {};
    } else {
      this.content = JSON.parse(content);
    }
  }

  /**
   * Set a value in the Database.
   * @param {*string} key Key of the value to set.
   * @param {*any} value Value of the value to set.
   */
  setValue(key: string, value: any) {
    this.content[key] = value;
    this.save();
  }

  // Get a value form the database.
  // @param key Key of the value to fetch.
  // @param defaultValue [optional] Default value to set if the value is not found.
  GetValue(key: string, defaultValue: any = ""): any {
    const value = this.content[key];
    if (value == null) {
      this.setValue(key, defaultValue);
      return this.GetValue(key, defaultValue);
    }
    return value;
  }

  /**
   * Retrieve and Id from the database and increment its value.
   * @param {*string} key Key of the id to retrieve
   */
  GetId(key: string) {
    const id = this.GetValue(key, 0);
    this.setValue(key, id + 1);
    return id;
  }

  // Write and object in the Database and save it.
  // @param table Table to store the object into.
  // @object Object to store.
  Write(table: string, object: any) {
    // Create table if not set
    if (this.content[table] == null) this.setValue(table, []);

    // Adding timestamp.
    object.timestamp = Date.now();

    // Writing the object
    this.content[table].push(object);
    this.save();
  }

  /**
   * This function delete entries from the Database if found.
   * @param {*string} table Table of the entries to delete.
   * @param {*object} condition Condition to test each entry with before deleting.
   */
  Remove(table: string, condition: any) {
    const values = this.content[table];
    if (values == null) {
      throw new Error(`Table ${table} is not defined in the database.`);
    }
    const saved: any[] = [];
    values.forEach((value: any) => {
      for (let key in condition) {
        if (value[key] != null) {
          if (value[key] != condition[key]) {
            saved.push(value);
          }
        } else {
          saved.push(value);
        }
      }
    });

    this.content[table] = saved;
    this.save();
  }

  // Get all the entries from a table.
  // @param table Table to retrieve the entries from.
  // @orderBy [optional] Member data to order the list with.
  GetAll(table: string) {
    console.log("GET ALL " + table);
    return this.GetValue(table, []);
  }

  // Retrieve a single entry form the Database.
  // @param table Table to retrieve the data from.
  // @param id Id of the entry to retrieve.
  GetById(table: string, id: string) {
    const values = this.content[table];
    if (values == null) {
      throw new Error(`Table ${table} is not defined in the database.`);
    }
    return values.filter((value: any) => value.id === id);
  }

  /**
   * Update the content of an object in the database.
   * @param {*string} table Object Table's name.
   * @param {*int} id Id of the object(s) to update.
   * @param {*object} data Contains the new data to store within the object.
   */
  Update(table: string, id: string, data: any) {
    // Adding timestamp.
    data.timestamp = Date.now();

    const values = this.content[table];
    if (values == null) {
      throw new Error(`Table ${table} is not defined in the database.`);
    }

    values
      .filter((value: any) => value.id === id)
      .forEach((value: any) => {
        for (let key in data) {
          value[key] = data[key];
        }
      });

    this.save();
  }

  /**
   * Retrieve the absolute path of the file storing the database.
   * @return {*string} Path to the database.
   */
  GetPath() {
    return this.dbFilePath;
  }

  public save() {
    this.context.write(JSON.stringify(this.content));
  }

  public getContent() {
    return this.content;
  }

  public getDataPath() {
    return this.dataPath;
  }
}
