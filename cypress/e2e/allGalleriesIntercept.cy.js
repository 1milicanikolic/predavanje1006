import { allGalleriesPage } from "../page_objects/allGalleriesPage";
import { loginPage } from '../page_objects/loginPage';
describe('login POM', () => {
    let validEmail = "user1EM@user.com"
    let validPassword = "user1PASS"
    let searchTerm = "stagod"

    before('visit all galleries page', () => {
        cy.visit('/')
        loginPage.loginBtn.click();
        cy.url().should('include', '/login')
        loginPage.login(validEmail, validPassword);
        cy.url().should('not.include', '/login')
        loginPage.logoutBtn.should('be.visible')
    })

    xit('test pagination', () => {
        allGalleriesPage.singleGallery.should('have.length', 10)
        allGalleriesPage.loadMoreBtn.click()
        allGalleriesPage.singleGallery.should('have.length', 20)
    })
    //ne radi
    xit('get all galleries with intercept', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term='
        }).as('successfulFirstPage');
        cy.url().should('include', '/gallery-app');
        allGalleriesPage.allGalleriesBtn.click();
        cy.wait('@successfulFirstPage').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
            cy.get('h1').should('have.text', 'All galleries')
        })
//ne radi ni ovo
    xit("find gallery", () => {
        let searchTerm = 'stagod';
        cy.intercept({
          method: 'GET',
          url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term=${searchTerm}'
        }).as('findGallery');
        
        allGalleriesPage.findGallery(searchTerm);
        
        cy.wait("@findGallery").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body.galleries.title).eq(searchTerm);
            });
        });
})