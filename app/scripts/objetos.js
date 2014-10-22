var Objetos = (function () {
    var Contato = function(){
        this.ID = null;
        this.Tipo = "";
        this.Contato = "";
        this.Categoria = "";
    }
    
    var Categoria = function(){
        this.ID = null;
        this.Nome = "";
        this.Ativo = true;
    }
    
    var Endereco = function(){
        this.ID = null;
        this.TipoLogradouro = Colecao.tiposLogradouro[0];
        this.Logradouro = "";
        this.Numero = "";
        this.Complemento  = "";
        this.Zona = "urbana";
        this.Bairro = "";
        this.Estado = Colecao.Estados[25];
        this.Cidade = "";
        this.CEP = "";
        this.Coordenadas  = "";
        this.Referencia = "";
    }
    
    var Cliente = function(){
        this.ID = null;
        this.Nome = "";
        this.Sexo = "M";
        this.Aniversario = "";
        this.Anotacao = "";
        this.CPF = "";
        this.Ativo = true;
        this.Contato = [];
        this.Endereco = new Endereco();
    }
    
    var Fornecedor = function(){
        this.ID = null;
        this.Razao = "";
        this.NomeFantasia = "";
        this.InscricaoEstadual = "";
        this.InscricaoMunicipal = "";
        this.CNPJ = "";
        this.Ativo = true;
        this.Contato = [];
        this.Endereco = new Endereco();
    }
    

    var Produto = function () {
        this.ID = null;
        this.CodigoBarras = "";
        this.Nome = "";
        this.Descricao = "";
        this.Fabricante = "";
        this.PrecoEntrada = 0;
        this.PrecoSaida = 0;
        this.Quantidade = 0;
        this.Ativo = true;
        this.EstoqueMinimo = 0;
        this.ICMS = 0;
        this.Categoria = new Categoria();
        this.Fornecedor = new Fornecedor();
    }

    return {
        Categoria: function () { return new Categoria();},
        Cliente: function () { return new Cliente();},
        Contato: function () { return new Contato();},
        Fornecedor: function () { return new Fornecedor();},
        Produto: function () { return new Produto();}
    }

})();