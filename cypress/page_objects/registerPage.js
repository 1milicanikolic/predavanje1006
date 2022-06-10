class RegisterPage {
    get registerBtn() {
        return cy.get('.nav-link').eq(2);
    }

    get firstNameInput() {
        return cy.get('#first-name')
    }

    get lastNameInput() {
        return cy.get('#last-name')
    }

    get emailInput() {
        return cy.get('#email');
    }

    get passwordInput() {
        return cy.get('#password');
    }

    get passwordInputConf() {
        return cy.get('#password-confirmation')
    }


    get termsCheckbox() {
        return cy.get('.form-check-input');
    }

    get submitBtn() {
        return cy.get('[type = submit]');
    }

    get registerHeading() {
        return cy.get('h1')
    }

    get errorMsgEmailTaken() {
        return cy.get('p[class="alert alert-danger"]')
    }

    register (firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordInputConf.type(password);
        this.termsCheckbox.check();
        this.submitBtn.click();
    }

    registerWithoutName (lastName, email, password) {
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordInputConf.type(password);
        this.termsCheckbox.check();
        this.submitBtn.click();
    }

    register (firstName, lastName, email, password, newPassword) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordInputConf.type(newPassword);
        this.termsCheckbox.check();
        this.submitBtn.click();
    }
}

export const registerPage = new RegisterPage();