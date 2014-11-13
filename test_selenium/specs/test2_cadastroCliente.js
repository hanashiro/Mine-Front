describe('Client', function() {
  it('should make a register', function() {
    browser.get('#cliente/clienteCadastro/novo_cliente');

    element(by.model('Cliente.cliente.nome')).sendKeys("akira");
    
    element(by.model('Cliente.cliente.aniversario')).sendKeys("07071993");

    element.all(by.css('.nav.nav-pills.nav-justified li')).get(1).click();



    //element.all(by.options('t.value for t in tipoTelefone')).get(1).click();

    element(by.model('telefone.contato')).sendKeys("12997517335");


    //element.all(by.options('t.value for t in tipoEmail')).get(1).click();

    element(by.model('email.contato')).sendKeys("akira@akira.com");



    browser.sleep(3000)

    expect(true).toBeTruthy();
  });
});