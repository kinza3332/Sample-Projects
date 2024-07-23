const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity:false,
  defaultCommandTimeout: 10000,
  requestTimeout: 30000,
  projectId: "deib3s",

  retries: 2,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    baseUrl:'https://project-planner-36424-staging.botics.co',
  },
});
