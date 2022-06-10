const Locators = require('../fixtures/Locators.json')
import { faker } from '@faker-js/faker';
///<reference types= Cypress />
describe('login with locators', () => {
    let email = "user9EM@user.com";
    let password = "user1PASS"

    before('', () => {
        cy.visit('/');
        cy.get(Locators.Navigation.actionButton).eq(1).click();
    })
    it('login with locators', () => {
        cy.get(Locators.Login.emailInput).type(email);
        cy.get(Locators.Login.passwordInput).type(password);
        cy.get(Locators.Login.submitBtn).click();
    })
    it('successful logout', () => {
        cy.get(Locators.Navigation.actionButton).should('have.length', 4);
        cy.get(Locators.Navigation.actionButton).eq(3).click();
    }) 
})