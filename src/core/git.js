import fs from 'fs'
import path from 'path'
import Github from "github";

const github = new Github();

export class GitUserInfo {
	constructor() {
		this.username = ''
		this.repository_token = ''
		this.gist_id = ''
	}
}

class Git {
	constructor() {
		this.userInfo = null;
		this.authenticated = false;
	}

	/**
	 * Initialize all the resources used by the Git Application.
	 * This function checks create all the required directories.
	 */
	Initialize() {
		// Get the path of the directory to store the data in.
		const gitPath = path.join(path.resolve('.'), 'git_sync');
	}

	/**
	 * Save the database in the gist.
	 * The gist file is created if not found.
	 * The user must be authenticated to use this function.
	 * @param {*String} name Name of the gist file.
	 * @param {*String} content Content to save in the gist.
	 */
	SaveGist(name, content) {
		return new Promise((resolve, reject) => {
			// Check if the user is authenticated.
			if (!this.authenticated)
				return reject(Error("Git user must authenticated before Saving database in gist"));

			// Simple description for the project.
			const description = 'Project Manager database.';

			// Check if the gist exists.
			github.gists.get({
				id: this.userInfo.gist_id
			}).then(gist => {
				// Update the content of the gist.
				github.gists.edit({
					description: description,
					files: {
						'database.json': {
							content: content
						}
					},
					id: this.userInfo.gist_id,
				}).then((result) => resolve(result)).catch(error => reject(error));
			}).catch((error) => {
				// Create Gist since it doesn't exist
				github.gists.create({
					public: false,
					description: description,
					files: {
						'database.json': {
							content: content
						}
					}
				}).then(result => resolve(result)).catch(error => reject(error));
			});
		});
	}

	/**
	 * Load the content of a gist from remote.
	 * The Gist must already have been set and used to retrive
	 * the data from remote.
	 */
	LoadGist() {
		return new Promise((resolve, reject) => {
			github.gists.get({
				id: this.userInfo.gist_id
			}).then(gist => {
				resolve(gist);
			}).catch(error => reject(error));
		})
	}

	/**
	 * Check if the User information are valid.
	 */
	IsValid(info) {
		return info.username != null && info.username != '' && info.repository_token != null && info.repository_token != '';
	}

	/**
	 * Authenticate the user to github.
	 * @param {*GitUserInfo} GitInfo Information about the user.
	 */
	Authenticate(info) {
		if (!this.IsValid(info))
			throw new Error("Invalid User Git Info.");

		// This will be set to false if the authentication fails.
		this.userInfo = info;
		this.authenticated = true;

		// Connecting to the github service
		try {
			github.authenticate({
				type: 'oauth',
				token: info.repository_token
			});
		} catch (error) {
			if (error != null)
				this.authenticated = false;
		}
	}
}

export const git = new Git();