import { loginPage } from '../page_objects/loginPage.js';
//const faker = require('@faker-js/faker');

describe('Login POM', () => {
    let validEmail = 'milicanikolic@milica.milica';
    let validPassword = 'milica1234';
    let invalidPassword = 'test12';

    before('Visit to login page', () => {
     cy.visit('/')
       loginPage.loginBtn.click()
    })

it('Login with intercept', () => {
    cy.intercept({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/login'
    }).as('validLogin')

    cy.url().should('include', '/login');
    loginPage.login(validEmail, validPassword);
    cy.wait('@validLogin').then(interception => {
        expect(interception.response.statusCode).to.exist
        expect(interception.response.statusCode).eq(200)
    })

    cy.url().should('not.include', '/login');
    loginPage.logoutBtn.should('be.visible')
    })

it('Logout with intercept', () => {
    cy.intercept({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/logout'
    }).as('successfulLogout')

    cy.url().should('include', 'https://gallery-app.vivifyideas.com/');
    loginPage.logoutBtn.click();
    cy.wait('@successfulLogout').then(interception => {
        expect(interception.response.statusCode).to.exist
        expect(interception.response.statusCode).eq(200)
    })


})

it('Invalid login using intercept', () => {
    cy.intercept({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/login',
    }).as('invalidLogin')

    cy.url().should('include', '/login');
    loginPage.login(validEmail, invalidPassword);
    cy.wait('@invalidLogin').then(interception => {
        expect(interception.response.statusCode).to.exist
        expect(interception.response.statusCode).eq(401)
    loginPage.errorMsg.should('include.text', 'Bad Credentials')
    .and('have.css','background-color', 'rgb(248, 215, 218)')
    .and('have.css','color', 'rgb(114, 28, 36)')

    })
})

       it('Valid login', () => {
        cy.loginViaBackend(
            Cypress.env('VALID_USER_EMAIL'),
            Cypress.env('VALID_USER_PASSWORD')
        );
        cy.visit('/')
    })

    xit('Invalid login using POM', () => {
        cy.url().should('include', '/login'),
        loginPage.login(validEmail, invalidPassword),
        cy.url().should('contains', '/login'),
        loginPage.errorMessage.should('include.text', 'Bad Credentials')
        .and('have.css','background-color', 'rgb(248, 215, 218)')
        .and('have.css','color', 'rgb(114, 28, 36)')

    })

    xit('valid login using POM', () => {
        cy.reload(),
        cy.url().should('include', '/login'),
        loginPage.login(validEmail, validPassword),
        cy.url().should('not.contains', '/login'),
        loginPage.logoutBtn.should('be.visible')

    })


})