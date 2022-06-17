const Locators = require('../fixtures/Locators.json')
const  faker = require ('@faker-js/faker');
import { registerPage } from '../page_objects/registerPage.js'
///<reference types= Cypress />
describe('Register with locators and hooks', () => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    let wrongPassword = faker.name.firstName();

    beforeEach('', () => {
        cy.visit('/register');
        cy.get(Locators.Navigation.actionButton).eq(2).click();
    })
    xit('login with locators', () => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('[type = submit]').click();
        cy.url().should('not.contains', '/register');
    })

    it('Invalid register with short password using intercept', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('invalidRegister')
    
        cy.url().should('include', '/register');
        registerPage.register(firstName, lastName, email, wrongPassword);
        cy.wait('@invalidRegister').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(422)
        })
    
        cy.url().should('include', '/register');
        registerPage.errorMsg.should('be.visible')
            .and('have.text', 'The password must be at least 8 characters.')
        
        })

        it('Invalid register with wrong password confirmation using intercept', () => {
            cy.intercept({
                method: 'POST',
                url: 'https://gallery-api.vivifyideas.com/api/auth/register'
            }).as('invalidRegister1')
        
            cy.url().should('include', '/register');
            registerPage.register1(firstName, lastName, email, password, wrongPassword);
            cy.wait('@invalidRegister1').then(interception => {
                expect(interception.response.statusCode).to.exist
                expect(interception.response.statusCode).eq(422)
            })
        
            cy.url().should('include', '/register');
            registerPage.errorMsg.should('be.visible')
                .and('have.text', 'The password confirmation does not match.')
            
            })

    it('Register with intercept', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('validRegister')
    
        cy.url().should('include', '/register');
        registerPage.register(firstName, lastName, email, password);
        cy.wait('@validRegister').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })
    
        cy.url().should('not.include', '/register');
        
        })
})