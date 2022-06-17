// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const faker = require("@faker-js/faker")

Cypress.Commands.add('loginViaBackend', () => {
    cy.request({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/login',
        body: {
            email: Cypress.env('VALID_USER_EMAIL'),
            password: Cypress.env('VALID_USER_PASSWORD')
        }


    }).its('body').then(response=>{
        // console.log('RESPONSE', response)
        window.localStorage.setItem('token', response.access_token)
    })

Cypress.Commands.add('registerViaBackend', () => {
    cy.request({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/register',
        body: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            passwordConf: password
        }

    })
})
})