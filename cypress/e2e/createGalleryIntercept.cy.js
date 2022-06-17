import { loginPage } from '../page_objects/loginPage';
import { createGalleryPage } from '../page_objects/createGalleryPage';

describe('login POM', () => {
    let validEmail = "user1EM@user.com"
    let validPassword = "user1PASS"
    let galleryId;
    before('visit login page, then create page', () => {
        cy.visit('/')
        loginPage.loginBtn.click()
        loginPage.login(validEmail, validPassword);
        createGalleryPage.createGalleryBtn.click();
    })

    const galleryData = {
        title: "stagod",
        desc: "stagod",
        imgurl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"

    }

    xit('successful creation', () => {
        createGalleryPage.createGalleryBtn.click();
        createGalleryPage.createGallery(
            galleryData.title,
            galleryData.desc,
            galleryData.imgurl
            ) 
    })

    it.only('create using intercept', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('successfulCreation')
        cy.url().should('include', '/create')
        createGalleryPage.createGallery(
            galleryData.title,
            galleryData.desc,
            galleryData.imgurl
            )
        cy.wait('@successfulCreation').then(interception => {
            galleryId = interception.response.body.id
            expect(interception.response.statusCode).eq(201)
            expect(interception.response.body.title).eq(galleryData.title)
            cy.visit(`/galleries/${galleryId}`)
        })
            cy.get('h1').should('have.text', galleryData.title)
        })
    
})

