class CreateGalleryPage {
    get createGalleryBtn() {
        return cy.get('a[href="/create"]')
    }

    get titleInput() {
        return cy.get('#title')
    }
    
    get descInput() {
        return cy.get('#description')
    }

    get imageInput() {
        return cy.get('input[type="url"]')
    }

    get submitBtn() {
        return cy.get(':submit').contains("Submit")
    }

    createGallery(title, desc, imgurl) {
        this.titleInput.type(title);
        this.descInput.type(desc);
        this.imageInput.type(imgurl);
        this.submitBtn.click();
    }
}

export const createGalleryPage = new CreateGalleryPage();