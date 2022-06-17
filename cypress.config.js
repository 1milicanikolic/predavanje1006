const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://gallery-app.vivifyideas.com/"
  },
  env: {
    VALID_USER_EMAIL: 'milicamilica@milica.com',
    VALID_USER_PASSWORD: 'tester123'
  }
  
  })

