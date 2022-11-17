/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() { 

    beforeEach(function(){ 
        cy.visit('./src/index.html')
    })


    it('verifica o título da aplicação', function() { 
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })


    it('preenche os campos obrigatórios e envia o formulário', function(){ 
        const longText = '1- Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, laborum voluptatibus exercitationem culpa quasi nesciunt fugiat animi quod fugit hic placeat sit officiis deserunt maxime doloribus, commodi delectus voluptatem sint?2-Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, laborum voluptatibus exercitationem culpa quasi nesciunt fugiat animi quod fugit hic placeat sit officiis deserunt maxime doloribus, commodi delectus voluptatem sint?'

        cy.get('#firstName').type('Lucas') 
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('exemplo@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click() 

        cy.get('.success').should('be.visible') 
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('Lucas') 
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('exemplo@gmail,com')
        cy.get('#open-text-area').type('Testando')
        cy.contains('button', 'Enviar').click() 

        cy.get('.error').should('be.visible')
    })

    it('campo telefone com valor não númerico continua vazio', function(){
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '') //valor deve ser uma string vazia - ou seja, n tem nada
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Lucas') 
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('exemplo@gmail.com')

        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click() 

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email, telefone e como podemos ajudar', function(){ //Testando o CLEAR
        cy.get('#firstName')
            .type('Lucas')
            .should('have.value', 'Lucas')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Araujo')
            .should('have.value', 'Araujo')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('exemplo@gmail.com')
            .should('have.value', 'exemplo@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456')
            .should('have.value', '123456')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('Testando')
            .should('have.value', 'Testando')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        //cy.get('.button').click() poderia ser esse, mas estou usando a opção debaixo:
        cy.contains('button', 'Enviar').click() 

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        //comando customizado - procurar na pasta support > commands.js
        cy.fillMandatoryFieldsAndSubmit('Lucas', 'Araujo')

        cy.get('.success').should('be.visible') 
    })

    //Troquei todos os cy.get(button...) por cy.contain(...)

})




