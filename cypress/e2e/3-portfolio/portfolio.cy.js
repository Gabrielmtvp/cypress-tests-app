

describe('Login and Register user ', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com');
    })

    it('Verifying validation message', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage','Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage','Full name is required!').should('be.visible');
        cy.contains('ap-vmessage','User name is required!').should('be.visible');
        cy.contains('ap-vmessage','Password is required!').should('be.visible');
    })

    it('Verifying invalid email', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('Gabriel');
        cy.contains('ap-vmessage','Invalid e-mail').should('be.visible');
    })

    it('Verifying length password', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('123');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage','Mininum length is 8').should('be.visible');
    })

    it.only('login invalid user', () => {
        cy.login('gabriel','12321');
        cy.on('window.alert', (str) => {
            expect(str).to.equal('Invalid user name or password');
        })
    })

    it.only('login valid user', () => {
        cy.login('flavio','123');
        cy.contains('a', '(Logout)').should('be.visible');
    })

   

})