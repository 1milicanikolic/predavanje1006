import { loginPage } from '../page_objects/loginPage';
import { createGalleryPage } from '../page_objects/createGalleryPage';

describe('login POM', () => {
    let validEmail = "user1EM@user.com"
    let validPassword = "user1PASS"
    before('visit login page', () => {
        cy.visit('/')
        loginPage.loginBtn.click()
        loginPage.login(validEmail, validPassword);
    })

    const galleryData = {
        title: "stagod",
        desc: "stagod",
        imgurl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"

    }

    it('successful creation', () => {
        createGalleryPage.createGalleryBtn.click();
        createGalleryPage.createGallery(
            galleryData.title,
            galleryData.desc,
            galleryData.imgurl)
    })
})

