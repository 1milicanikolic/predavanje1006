/// <reference types= "Cypress" />
import { loginPage } from '../page_objects/loginPage';
describe('login POM', () => {
    let validEmail = "user1EM@user.com"
    let validPassword = "user1PASS"
    let invalidEmail = "user@mail.com"
    before('visit login page', () => {
        cy.visit('/')
        loginPage.loginBtn.click();
    })
//    it ('valid login', () => {
//        loginPage.emailInput.type(validEmail);
//        loginPage.passwordInput.type(validPassword);
//        loginPage.submitBtn.click();
//    })
    xit ('valid login', () => {
        cy.url().should('include', '/login')
        loginPage.login(validEmail, validPassword);
        cy.url().should('not.include', '/login')
        loginPage.logoutBtn.should('be.visible')
    })

    it('bad credentials', () => {
        cy.url().should('include', '/login')
        loginPage.login(invalidEmail, validPassword);
        cy.url().should('include', '/login')
        loginPage.loginHeading.should('be.visible')
            .and('have.text', 'Please login')
        loginPage.errorMsg.should('be.visible')
            .and('have.text','Bad Credentials')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        
    })
})