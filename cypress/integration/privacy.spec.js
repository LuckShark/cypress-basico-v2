//Esse arquivo vai ser para a página de privacidade 
//não vai colocarnem DESCRIBE por que será só um teste
//cypress._ é o loadesh // .times aí eu coloco o nº de vezes que vou executar + a função de callback

Cypress._.times(5, function(){
    it('testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})