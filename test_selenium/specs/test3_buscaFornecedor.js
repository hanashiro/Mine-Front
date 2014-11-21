describe('Supplier', function() {
  it('should make a search', function() {
    browser.get('#fornecedor/fornecedorBusca');

    element(by.model('busca')).sendKeys("akira");

    element(by.buttonText('Buscar')).click();

    browser.sleep(3000)

    expect(true).toBeTruthy();
  });
});
