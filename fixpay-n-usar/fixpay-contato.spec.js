/// <reference types="Cypress" />

describe('Suíte de testes: Seção de Contato - FIXPAY', function() {
    beforeEach(function(){ 
        cy.visit('https://fixpay.com.br/contato/')
    })

    it('verifica o título da aplicação', function() { 
        cy.title().should('be.equal','Contato • FIX PAY')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('[data-name="pessoa"] > .wpcf7-form-control > .first > label > input').click()
        cy.get(':nth-child(3) > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('17824630706')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(3) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('Nome teste')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(4) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('email@correto.com')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(5) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('987654321')
        cy.get(':nth-child(8) > .wpcf7-form-control-wrap > .wpcf7-form-control > .wpcf7-list-item > label > input')
            .check()
            .should('be.checked')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > [style="text-align: center; padding-bottom: 0px;"] > .wpcf7-form-control')
            .click()
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > .wpcf7-response-output')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao não preencher todos os campos obrigatórios',function(){
        cy.get('[data-name="pessoa"] > .wpcf7-form-control > .first > label > input').click()
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(3) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('Nome teste')
        
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(5) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('987654321')
        cy.get(':nth-child(8) > .wpcf7-form-control-wrap > .wpcf7-form-control > .wpcf7-list-item > label > input')
            .check()
            .should('be.checked')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > [style="text-align: center; padding-bottom: 0px;"] > .wpcf7-form-control')
            .click()

        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > .wpcf7-response-output')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        
    })
    it('exibe mensagem de erro ao preencher o campo Celular com valor não númerico', function(){
        cy.get('[data-name="pessoa"] > .wpcf7-form-control > .first > label > input').click()
        cy.get(':nth-child(3) > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('17824630706')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(3) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('Nome teste')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(4) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('email@correto.com')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(5) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('celularteste')
        cy.get(':nth-child(8) > .wpcf7-form-control-wrap > .wpcf7-form-control > .wpcf7-list-item > label > input')
            .check()
            .should('be.checked')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > [style="text-align: center; padding-bottom: 0px;"] > .wpcf7-form-control')
            .click()

        cy.get('.wpcf7-not-valid-tip')
            .should('be.visible')
    })

    it('preenche e limpa os campos cpf, nome, e-mail e celular', function(){
        cy.get('[data-name="pessoa"] > .wpcf7-form-control > .first > label > input').click()
        cy.get(':nth-child(3) > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('17824630706')
            .should('have.value', '17824630706')
            .clear()
            .should('have.value', '')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(3) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('Nome teste')
            .should('have.value', 'Nome teste')
            .clear()
            .should('have.value', '')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(4) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('email@correto.com')
            .should('have.value', 'email@correto.com')
            .clear()
            .should('have.value', '')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(5) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('987654321')
            .should('have.value', '987654321')
            .clear()
            .should('have.value', '')
        cy.get(':nth-child(8) > .wpcf7-form-control-wrap > .wpcf7-form-control > .wpcf7-list-item > label > input')
            .check()
            .should('be.checked')
            .uncheck()
            .should('not.be.checked')
    })

    it('marca o faturamento acima de R$50.000,00',function(){
        
    })

    it('envia formulário com mensagem grande', function(){
        const longText = '1- Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, laborum voluptatibus exercitationem culpa quasi nesciunt fugiat animi quod fugit hic placeat sit officiis deserunt maxime doloribus, commodi delectus voluptatem sint?2-Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, laborum voluptatibus exercitationem culpa quasi nesciunt fugiat animi quod fugit hic placeat sit officiis deserunt maxime doloribus, commodi delectus voluptatem sint?'

        cy.get('[data-name="pessoa"] > .wpcf7-form-control > .first > label > input').click()
        cy.get(':nth-child(3) > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('17824630706')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(3) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('Nome teste')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(4) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('email@correto.com')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(5) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type('987654321')
        cy.get(':nth-child(8) > .wpcf7-form-control-wrap > .wpcf7-form-control > .wpcf7-list-item > label > input')
            .check()
            .should('be.checked')
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > :nth-child(7) > label > .wpcf7-form-control-wrap > .wpcf7-form-control')
            .type(longText, {delay: 0})
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > [style="text-align: center; padding-bottom: 0px;"] > .wpcf7-form-control')
            .click()
        cy.get('#wpcf7-f38-p565-o3 > .wpcf7-form > .wpcf7-response-output')
            .should('be.visible')

    })

    it('tenta enviar formulário com checkbox desmarcado', function(){

    })

    it('troca o input de pessoa física para pesoa jurídica', function(){

    })
})