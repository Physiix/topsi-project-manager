# Topsi Project Manager

Topsi Project Manager is a **simple** Kanban board software built with Electron
and Vue.js. It supports all three major platforms (Windows, Linux and macOS).

It's free and open source under the AGPLv3 license.

## Version 0.1

## Features

### **No** Internet required, **no** registration needed

![No Internet required, no registration needed](https://user-images.githubusercontent.com/2964165/44611105-6e920e00-a7cd-11e8-99d3-fa9d172e1fd7.png)

### Simple Kanban board

![Simple Kanban board](https://user-images.githubusercontent.com/2964165/44611113-7b166680-a7cd-11e8-8909-077bd7ec87c7.png)

### Organize your notes in multiple milestones

![Organize your notes in multiple milestones](https://user-images.githubusercontent.com/2964165/44611155-ad27c880-a7cd-11e8-89fa-acf0dea717cb.png)

### Drag & drop notes

![Drag & drop notes](https://user-images.githubusercontent.com/2964165/44611998-c1ba8f80-a7d2-11e8-9675-30ac9bc203e4.gif)

### Tags

![Tags](https://user-images.githubusercontent.com/2964165/44611830-b6b32f80-a7d1-11e8-91d3-66175c503978.gif)

### Search for notes by title or tag

![Search for notes by title or tag](https://user-images.githubusercontent.com/2964165/44611789-63d97800-a7d1-11e8-9410-cef3776b779b.gif)

### Image attachment

![Image attachment](https://user-images.githubusercontent.com/2964165/44611858-de09fc80-a7d1-11e8-90a1-f0b3a695e108.gif)

### Export and import projects (in JSON format)

![Export and import projects (in JSON format)](https://user-images.githubusercontent.com/2964165/44611163-b87af400-a7cd-11e8-8364-1424e3d24682.png)

### Dark mode and customization (WIP, more customizations are coming)

![Dark mode & customization](https://user-images.githubusercontent.com/2964165/44612138-e95e2780-a7d3-11e8-84b5-96533faf9888.gif)

### 100% free and open source

## Roadmap

The developpement is done in the `master` branch, once a build is stable enough (Still alpha), a snapshot will be created and the release page will be updated with the executables.
These are the features that will be implemented next:

- Support for other languages than English (translations)
- Quick commands
- Better image attachment (currently slows down the application)
- Comments
- Plugin system
- Better milestone management
- File attachments
- Undo / Redo
- Synchronize with GitHub and GitLab issues
  - Import issues from GitHub/GitLab
  - Local changes are
- Refactoring
- Users
- Updates

## Build

```bash
# Clone the project
git clone https://github.com/Physiix/topsi-project-manager

# Install dependencies (you can use npm too)
yarn

# Run in developer mode
yarn run dev

# Build the executable
yarn build
```

## Contributions

All contributions are welcome: correcting typos, translations, reporting bugs,
contributing code, writing documentation, …

## Frameworks used in this project

- Electron
- Vue.js
- Vuetify
- Quill
- Sortable
- lowdb

## License

AGPLv3
