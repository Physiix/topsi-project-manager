# Topsi Project Manager
Topsi Project Manager is a **simple** kanban board software built with electron and vuejs. It supports all three major platforms (Windows, Linux and OSX).

It's free and Open Source under the AGPL V3 Clause.

## Version 0.1

## Features
### **No** internet required, it is fully useable offline. **No** Sign Up needed
![screenshot from 2018-08-24 17-40-57](https://user-images.githubusercontent.com/2964165/44611105-6e920e00-a7cd-11e8-99d3-fa9d172e1fd7.png)

### Simple Kanban Board
![screenshot from 2018-08-24 18-29-59](https://user-images.githubusercontent.com/2964165/44611113-7b166680-a7cd-11e8-8909-077bd7ec87c7.png) 

### Organize your notes in multiple milestones
![screenshot from 2018-08-24 18-30-43](https://user-images.githubusercontent.com/2964165/44611155-ad27c880-a7cd-11e8-89fa-acf0dea717cb.png)

### Drag & Drop notes
![drag_drop](https://user-images.githubusercontent.com/2964165/44611998-c1ba8f80-a7d2-11e8-9675-30ac9bc203e4.gif)

### Tags
![tagsv2](https://user-images.githubusercontent.com/2964165/44611830-b6b32f80-a7d1-11e8-91d3-66175c503978.gif)

### Search for notes by title or tag
![search](https://user-images.githubusercontent.com/2964165/44611789-63d97800-a7d1-11e8-9410-cef3776b779b.gif)

### Image attachment
![image](https://user-images.githubusercontent.com/2964165/44611858-de09fc80-a7d1-11e8-90a1-f0b3a695e108.gif)

### Export & Import projects (in JSON format)
![export](https://user-images.githubusercontent.com/2964165/44611163-b87af400-a7cd-11e8-8364-1424e3d24682.png)

### Dark mode & Customization (WIP, more customizations are coming)
![customizationv2](https://user-images.githubusercontent.com/2964165/44612138-e95e2780-a7d3-11e8-84b5-96533faf9888.gif)

### 100% Free and Open Source

## Roadmap
The developpement is done in the `dev` branch.

These are the features that will be implemented next. 
- Support for other languages than English. (Translation)
- Quick commands
- Better image attachment (currently slows down the application)
- Comments
- Plugin system
- Better milestone management
- File attachments
- Undo / Redo
- Synchronize with github and gitlab issues: 
	- Import issues from github/gitlab
	- Local changes are 
- Refactoring
- Users
- Updates

## Build
```bash
# Clone the project
git clone https://github.com/Physiix/topsi-project-manager

# You can use npm too
yarn

# To run in dev mode.
yarn run dev

# To build the executable
yarn build
```

## Contributions
All contributions are welcome: Typo correction, translation, reporting bugs, code contribution, documentation. 

## Frameworks used in this projects
- VueJS
- ElectronJS
- Vuetify
- Quill.js
- Sortable.js

## License
AGPL v3