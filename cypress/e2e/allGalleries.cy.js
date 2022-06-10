import { allGalleriesPage } from "../page_objects/allGalleriesPage";
import { loginPage } from '../page_objects/loginPage';
describe('login POM', () => {
    let validEmail = "user1EM@user.com"
    let validPassword = "user1PASS"
    let invalidEmail = "user@mail.com"
    before('visit login page', () => {
        cy.visit('/')
        loginPage.loginBtn.click();
    })
    it ('valid login', () => {
        cy.url().should('include', '/login')
        loginPage.login(validEmail, validPassword);
        cy.url().should('not.include', '/login')
        loginPage.logoutBtn.should('be.visible')
    })

    it('test pagination', () => {
        allGalleriesPage.singleGallery.should('have.length', 10)
        allGalleriesPage.loadMoreBtn.click()
        allGalleriesPage.singleGallery.should('have.length', 20)
    })
})