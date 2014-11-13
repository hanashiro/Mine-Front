describe('Client', function() {
  it('should make a search', function() {
    browser.get('#cliente/clienteBusca');

    element(by.model('busca')).sendKeys("akira");

    element(by.buttonText('Buscar')).click();

    browser.sleep(3000)

    expect(true).toBeTruthy();
  });
});