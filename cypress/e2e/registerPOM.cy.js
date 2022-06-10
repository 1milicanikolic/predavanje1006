/// <reference types= "Cypress" />
const faker = require('@faker-js/faker')
import { registerPage } from '../page_objects/registerPage';
describe('register POM', () => {
    const userData = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    takenEmail: "nikolicmilica8@gmail.com",
    password: faker.internet.password(),
    passwordWithoutNumber: faker.internet.password(20, true, /[A-Z]/),
    shortPassword: faker.internet.password(3, true, /[A/C]/),
    newPassword: "milica12345"
    }
    beforeEach('visit register page', () => {
        cy.visit('/')
        registerPage.registerBtn.click();
    })

    it ('invalid register - password without number', () => {
        cy.url().should('include', '/register')
        registerPage.register(
            userData.firstName, 
            userData.lastName, 
            userData.email, 
            userData.passwordWithoutNumber, 
            userData.passwordWithoutNumber);
        cy.url().should('include', '/register')
    })

    it ('invalid register - too short password', () => {
        cy.url().should('include', '/register')
        registerPage.register(
            userData.firstName, 
            userData.lastName, 
            userData.email, 
            userData.shortPassword, 
            userData.shortPassword);
        cy.url().should('include', '/register')
    })

    it ('invalid register - already used email', () => {
        cy.url().should('include', '/register')
        registerPage.register(
            userData.firstName, 
            userData.lastName, 
            userData.takenEmail, 
            userData.password, 
            userData.password);
        cy.url().should('include', '/register')
        registerPage.registerHeading.should('be.visible')
            .and('have.text', 'Register')
        registerPage.errorMsgEmailTaken.should('be.visible')
            .and('have.text','The email has already been taken.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        
    })

    it ('invalid register - no first name', () => {
        cy.url().should('include', '/register')
        registerPage.registerWithoutName( 
            userData.lastName, 
            userData.email, 
            userData.password, 
            userData.password);
        cy.url().should('include', '/register')
    })

    it ('invalid register - not same pasword', () => {
        cy.url().should('include', '/register')
        registerPage.register(
            userData.firstName, 
            userData.lastName, 
            userData.email, 
            userData.password, 
            userData.newPassword);
        cy.url().should('include', '/register')
        registerPage.registerHeading.should('be.visible')
            .and('have.text', 'Register')
        registerPage.errorMsgEmailTaken.should('be.visible')
            .and('have.text','The password confirmation does not match.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        
    })

    it ('valid register', () => {
        cy.url().should('include', '/register')
        registerPage.register(
            userData.firstName, 
            userData.lastName, 
            userData.email, 
            userData.password, 
            userData.password);
        cy.url().should('not.include', '/register')
    })
})