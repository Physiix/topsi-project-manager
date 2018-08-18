import {
	App
} from './Application';

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

		const content = JSON.stringify(App.GetDB(project.id).context.read().__wrapped__);
		require('fs').writeFile(savePath, content, error => {
			if (error != null) throw new Error('Failed to save the file.\n' + error);
			console.log('file save successfuly')
		})
	}

	LoadProject() {

	}
}

export const ProjManager = new ProjectManager();