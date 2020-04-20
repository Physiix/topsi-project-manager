class Components {
  install(vue: any, options: any) {
    this.registerUtilityComponents(vue);
    this.registerDialogComponents(vue);
  }
  registerDialogComponents(vue: any) {
    const requireComponents = require.context("../components/dialogs/content", true, /.+\.vue/);

    requireComponents.keys().forEach(fileName => {
      const componentName = fileName.replace("./", "").replace(".vue", "");
      const config = requireComponents(fileName);
      vue.component(componentName, config.default || config);
    });
  }
  registerUtilityComponents(vue: any) {
    const requireComponents = require.context("../components/Utils", true, /.+\.vue/);

    requireComponents.keys().forEach(fileName => {
      const componentName = fileName.replace("./", "").replace(".vue", "");
      const config = requireComponents(fileName);
      vue.component(componentName, config.default || config);
    });
  }
}

export default new Components();
