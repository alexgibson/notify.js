SystemJS.config({
  paths: {
    "notifyjs/": "src/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.9"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "notifyjs": {
      "main": "notify.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {},
  packages: {}
});
