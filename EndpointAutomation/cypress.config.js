const cypress = require("cypress");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    specPattern: ['cypress/integration/API_Testing/ListAllOfObjects.cy.js',
                  'cypress/integration/API_Testing/ListOfObjectsById.js',
                  'cypress/integration/API_Testing/SingleObject.cy.js',
                  'cypress/integration/API_Testing/AddObject.cy.js']
  },
  
    "plugins": ["jquery"]
  
});
