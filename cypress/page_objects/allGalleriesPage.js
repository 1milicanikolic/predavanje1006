class AllGalleriesPage {
    get allGalleriesBtn() {
        return cy.get('.nav-link').eq(1);
    }
    get searchInput() {
        return cy.get('inpu');
    }

    get searchBtn() {
        return cy.get('button[class=btn btn-outline-secondary input-button]');
    }

    get singleGallery() {
        return cy.get('.cell');
    }

    get galleryTitle() {
        return cy.get.singleGallery.first().find('a');
    }

    getGalleryByIndex(index) {
        return this.singleGallery
            .eq(index)
            .find('a')
            .first()
    }

    getSpecificGalleryTitle(title) {
        this.findGallery(titile);
        this.galleryTitle.should('have.text', title);    
    }

    get loadMoreBtn() {
        return cy.get('button[class="btn btn-custom"]')
    }

    findGallery(galleryNameOrAuthor) {
        this.searchInput.type(galleryNameOrAuthor);
        this.searchBtn.click();
    }
}
export const allGalleriesPage = new AllGalleriesPage();

