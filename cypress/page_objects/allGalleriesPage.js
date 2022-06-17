class AllGalleriesPage {
    get allGalleriesBtn() {
        return cy.get('.nav-link').eq(1);
    }
    get searchInput() {
        return cy.get('input');
    }

    get allGalleriesBtn() {
        return cy.get('.nav-link').eq(0)
    }

    get allGalleriesTitile() {
        return cy.get('h1')
    }

    get searchBtn() {
        return cy.get('.btn').contains('Filter');
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

    findGallery(searchTerm) {
        this.searchInput.type(searchTerm);
        this.searchBtn.click();
    }
}
export const allGalleriesPage = new AllGalleriesPage();

