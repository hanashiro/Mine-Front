describe('Supplier', function() {
  it('should make a register', function() {
    browser.get('#fornecedor/fornecedorCadastro/novo_cliente');

    element(by.model('Fornecedor.fornecedor.nomeFantasia')).sendKeys("Passa Quatro");
    

    element.all(by.css('.nav.nav-pills.nav-justified li')).get(1).click();



    //element.all(by.options('t.value for t in tipoTelefone')).get(1).click();

    element.all(by.css('#selectTelefone')).click();
    element.all(by.css('#selectTelefoneOptions')).get(2).click();

    element(by.model('telefone.contato')).sendKeys("12997517335");

    element.all(by.css('#buttonNovoTelefone')).click();

    


    //element.all(by.options('t.value for t in tipoEmail')).get(1).click();
    element.all(by.css('#selectEmail')).click();
    element.all(by.css('#selectEmailOptions')).get(2).click();

    element(by.model('email.contato')).sendKeys("akira@akira.com");

    element.all(by.css('#buttonNovoEmail')).click();



    element.all(by.css('.nav.nav-pills.nav-justified li')).get(2).click();

    element.all(by.css('#selectLogradouro')).click();
    element.all(by.css('#selectLogradouro input.form-control')).sendKeys("Rua");
    element.all(by.css('#selectLogradouroOptions')).get(0).click();

    element(by.model('Fornecedor.fornecedor.endereco.logradouro')).sendKeys("Ruazona");
    element(by.model('Fornecedor.fornecedor.endereco.numero')).sendKeys("123");
    element(by.model('Fornecedor.fornecedor.endereco.bairro')).sendKeys("Barretos");

    element.all(by.css('#selectCidade')).click();
    element.all(by.css('#selectCidadeOptions')).get(3).click();

    
    element.all(by.css('#btnSalvar')).click();

    browser.waitForAngular();

    browser.sleep(3000);

    expect(true).toBeTruthy();
  });
});
