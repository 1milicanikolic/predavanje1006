const Locators = require('../fixtures/Locators.json')
import { faker } from '@faker-js/faker';
///<reference types= Cypress />
describe('Register with locators and hooks', () => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    
    beforeEach('', () => {
        cy.visit('/register');
        cy.get(Locators.Navigation.actionButton).eq(2).click();
    })
    it('login with locators', () => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('[type = submit]').click();
        cy.url().should('not.contains', '/register');
    })
        
})