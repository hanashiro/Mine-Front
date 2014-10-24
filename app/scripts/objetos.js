var Objetos = (function () {
    var Contato = function(){
        this.id = null;
        this.tipo = "";
        this.contato = "";
        this.categoria = "";
    }
    
    var Categoria = function(){
        this.id = null;
        this.nome = "";
        this.ativo = true;
    }
    
    var Endereco = function(){
        this.id = null;
        this.tipoLogradouro = Colecao.tiposLogradouro[0];
        this.logradouro = "";
        this.numero = "";
        this.complemento  = "";
        this.zona = "urbana";
        this.bairro = "";
        this.estado = Colecao.Estados[25];
        this.cidade = "";
        this.cep = "";
        this.coordenadas  = "";
        this.referencia = "";
    }
    
    var Cliente = function(){
        this.id = null;
        this.nome = "";
        this.sexo = "M";
        this.aniversario = "";
        this.anotacao = "";
        this.cpf = "";
        this.ativo = true;
        this.contato = [];
        this.endereco = new Endereco();
    }
    
    var Fornecedor = function(){
        this.id = null;
        this.razao = "";
        this.nomeFantasia = "";
        this.inscricaoEstadual = "";
        this.inscricaoMunicipal = "";
        this.cnpj = "";
        this.ativo = true;
        this.contato = [];
        this.endereco = new Endereco();
    }
    

    var Produto = function () {
        this.id = null;
        this.codigoBarras = "";
        this.nome = "";
        this.descricao = "";
        this.fabricante = "";
        this.precoEntrada = 0;
        this.precoSaida = 0;
        this.quantidade = 0;
        this.ativo = true;
        this.estoqueMinimo = 0;
        this.icms = 0;
        this.categoria = new Categoria();
    }

    return {
        Categoria: function () { return new Categoria();},
        Cliente: function () { return new Cliente();},
        Contato: function () { return new Contato();},
        Fornecedor: function () { return new Fornecedor();},
        Produto: function () { return new Produto();}
    }

})();