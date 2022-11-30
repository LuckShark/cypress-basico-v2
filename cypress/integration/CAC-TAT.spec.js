/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() { 
    const THREE_SECONDS_IN_MS = 3000 //vai servir no cy.tick
    //com essa constante acima, eu também verifico se a mensagem de erro/acerto aparece e desaparece
    beforeEach(function(){ 
        cy.visit('./src/index.html')
    })


    it('verifica o título da aplicação', function() { 
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })


    it('preenche os campos obrigatórios e envia o formulário', function(){ 
        const longText = '1- Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, laborum voluptatibus exercitationem culpa quasi nesciunt fugiat animi quod fugit hic placeat sit officiis deserunt maxime doloribus, commodi delectus voluptatem sint?2-Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, laborum voluptatibus exercitationem culpa quasi nesciunt fugiat animi quod fugit hic placeat sit officiis deserunt maxime doloribus, commodi delectus voluptatem sint?'

        //usando o clock para congelar o relógio do navegador
        cy.clock()

        cy.get('#firstName').type('Lucas') 
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('exemplo@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click() 

        cy.get('.success').should('be.visible')

        //agora usando o tick pra avançar no tempo e fazer a msg de confirmação desaparecer
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
        //com isso, o teste demora pouco mais de 1s. Eu não preciso esperar os 3s para a msgde confirmação desaparecer
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.clock()
        cy.get('#firstName').type('Lucas') 
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('exemplo@gmail,com')
        cy.get('#open-text-area').type('Testando')
        cy.contains('button', 'Enviar').click() 

        cy.get('.error').should('be.visible')

        //mensagem de erro deve sumir depois de 3 segundos
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    //usando o Lodash
    Cypress._.times(5, function(){
        it('campo telefone com valor não númerico continua vazio', function(){
            cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '') //valor deve ser uma string vazia - ou seja, n tem nada
        })
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock()
        cy.get('#firstName').type('Lucas') 
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('exemplo@gmail.com')

        cy.get('#phone-checkbox')
            .check()
            .should('be.checked')

        cy.contains('button', 'Enviar').click() 

        cy.get('.error').should('be.visible')
        
        //mensagem de erro deve sumir depois de 3 segundos
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        //cy.get('.button').click() poderia ser esse, mas estou usando a opção debaixo:
        cy.contains('button', 'Enviar').click() 

        cy.get('.error').should('be.visible')
        //mensagem de erro deve sumir depois de 3 segundos
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.clock()
        //comando customizado - procurar na pasta support > commands.js
        cy.fillMandatoryFieldsAndSubmit('Lucas', 'Araujo')

        cy.get('.success').should('be.visible') 
        //mensagem de erro deve sumir depois de 3 segundos
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })
    //Troquei todos os cy.get(button...) por cy.contain(...)


    //Usando o SELECT para lidar com seleção suspensa
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product') //poderia ser 'select' tbm, mas ele usou ID pq é mais específico
            .select('YouTube')
            .should('have.value', 'youtube') //youtube minúsculo é o value que está na options (ver html)
    })

    it('seleciona um produto (Mentoria) por seu valor(value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1) //blog é a 2º ooção, então o índice é 1
            .should('have.value', 'blog')
    })

    //Usando CHECK para lidar com inputs tipo RADIO - pode usar o CLICK tbm, mas melhor o check
    //os campos de ajuda, elogio e feedback

    it('marca o tipo de atendimento "Feedback"',function(){
        cy.get('input[type="radio"][value="feedback"]') //#support-type > :nth-child(4) não é um bom seletor, não tá explicando bem, por isso escolhemos essa definição aí adaptada do index:  <input type="radio" value="feedback">
            .check()
            .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]') //aqui está menos específico - pega os 3 botões tipo radio (retorna mais de 1 elemento)
            .should('have.length',3) //verificação intermediária, só pra conferir que tem 3
            .each(function($radio){ //$radio = "cada um desses radio" //o argumento dessa função vai ser cada um dos elementos
                cy.wrap($radio).check() //ele passa pelos 3
                cy.wrap($radio).should('be.checked') //varifica que os 3 foram marcados
            })
    })

    //Marcando e desmarcando inputs do tipo CHECKBOX(tbm usando o CHECK)
    //Nesse caso só o CHECK e o UNCHECK msm
    
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]') //aqui ele já tá "pegando as duas opções"
            .check() //e aqui marcou as duas
            .should('be.checked')
            .last() //minha atenção agora está só agora tá só no ultimo
            .uncheck() //desmarquei o último
            .should('not.be.checked')
    })

    //Fazendo upload de arquivos com Cypress usando o SELECT FILE
    //Na aplicação CAC TAT tem espaço pra um anexo

    it('seleciona o arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload') //ou poderia só ser cy.get('#file-upload')
            .should('not.have.value') //uma verificação intermediária para garantir que esteja vazio
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload') 
            .should('not.have.value') 
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) //mesma coisa, o 1 argumento é o arquivo - porém o 2º argumento é um objeto que vai simular o drag-drop
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile') //dei um apelido
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile') //e chamei pelo apelido, ao inves de fazer .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //Lidando com links que abrem em outra aba
    //ou confia no navegador e de fato acredita que será aberto em outra aba
    //ou usa o INVOKE e tira o atributo target, fazendo ele abrir na própria aba

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a') //pegar um 'privacy' que dentro dele tem um 'a'
            .should('have.attr','target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        //agora vamos fazer uma verificação para confirmar que mudou de página
        cy.contains('Talking About Testing').should('be.visible')
    })

    //usando o INVOKE

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => { //pode fazer o function(){} normal tbm se quiser
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('preenche área de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat('0123456789', 20) //esse texto vai ter 200 caracteres

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                console.log(response);
                    const{status, statusText, body} = response //assim que desestrutura um objeto no javascript
                    expect(status).to.equal(200)
                    expect(statusText).to.equal('OK')
                    expect(body).to.include('CAC TAT')
            })
    })

    //E X T R As
    it('encontrando gato escondido / usando invoke para mudar títulos', function(){
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT ATT')
        cy.get('#subtitle')
            .invoke('text','I dont 💗 🐈 at all')
    })


})




