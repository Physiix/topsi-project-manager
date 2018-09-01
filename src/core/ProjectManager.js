import DBManager from './DBManager';

const p = require('path');

import store from '../renderer/store'
import Vue from 'vue'
import {
	Notifications
} from './Notifications';
const vue = new Vue({
	store
});

class ProjectManager {
	SaveProject(project) {
		const electron = require('electron')
		const dialog = electron.remote.dialog;

		// Get the path where to save the file.
		const savePath = dialog.showSaveDialog(electron.remote.getCurrentWindow(), {
			title: 'Export project',
			defaultPath: project.title + '.txt', //TODO: Set the defaultPath with the default folder
			message: 'The file extension is note important.',
		})

		// Make sure the save path is valid.
		if (savePath == null) return;

		const fs = require('fs');
		const content = JSON.stringify(DBManager.GetDB(project.id).context.read().__wrapped__);
		fs.writeFile(savePath, content, error => {
			if (error != null) {
				Notifications.Error('Export project failed', error.message);
				throw new Error('Failed to save the file.\n' + error);
			}
			console.log('file save successfuly')
		})
	}

	LoadProject() {
		const electron = require('electron')
		const dialog = electron.remote.dialog;

		const path = dialog.showOpenDialog(electron.remote.getCurrentWindow(), {
			properties: [
				'openFile',
			],
			title: 'Import Project'
		})[0];

		const fs = require('fs');
		fs.readFile(path, 'utf8', (error, data) => {
			if (error != null) {
				Notifications.Error('Load Project failed', error.message);
				throw new Error('Failed to open the file.\n' + error);
			}
			const project = JSON.parse(data);
			const db = DBManager.GetAppDB();
			const id = db.GetId('projects_id');
			project.info.id = id;
			project.notes.forEach(note => note.project_id = id);
			db.Write('projects', project.info)
			const content = JSON.stringify(project, null, '\t')
			fs.writeFileSync(p.join(db.dataPath, id + '.json'), content);
			DBManager.Load(id);
			vue.$store.dispatch('UpdateProjects');
			Notifications.Success('Success', `Project ${project.info.title} has been successfully loaded`);
		});
	}
}

export default new ProjectManager();