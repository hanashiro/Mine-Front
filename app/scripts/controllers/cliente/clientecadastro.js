'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:ClienteClientecadastroCtrl
 * @description
 * # ClienteClientecadastroCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('ClienteClientecadastroCtrl', 
  function ($scope, $routeParams, FctCliente,FctObjReader) {
    $scope.Cliente = FctCliente;
    
    
    if($routeParams.nome=="novo_cliente"){
        $scope.Cliente.cliente = Objetos.Cliente();
    }

    FctObjReader.Objects.totalRead = [];
    FctObjReader.Objects.ignoreRead = [];
    FctObjReader.Objects.includeRead = [
        [$scope.Cliente.cliente, ['Nome', 'Sexo']],
        [$scope.Cliente.cliente.Endereco, ['TipoLogradouro','Logradouro', 'Numero', 'Bairro', 'Estado', 'Cidade']]
    ];

        
    $scope.estados = Colecao.Estados;
    $scope.tipoEmail = Colecao.tiposEmail;
    $scope.tipoTelefone = Colecao.tiposTelefone;
    $scope.tipoLogradouro = Colecao.tiposLogradouro;
    $scope.cidades = Utils.Moradia.retornarCidade($scope.Cliente.cliente.Endereco.Estado.Key);
    $scope.telefone = Objetos.Contato();
    $scope.email = Objetos.Contato();

    /******* FUNCOES *******/
    $scope.retornarCidades = function(){
        $scope.cidades = Utils.Moradia.retornarCidade($scope.Cliente.cliente.Endereco.Estado.Key);
        $scope.Cliente.cliente.Endereco.Cidade = {};
    }


    $scope.setEstadoCidade = function(){
        //Controle.setEstadoCidade($scope);
    }

    $scope.novoContato = function(categoria){
        var tipoContato = "";
        if(categoria=="Telefone"){
            if($scope.telefone.Contato.length<14){
                Plugins.Mensagem.erro("Número Inválido!")
                return false;
            }
            tipoContato = "telefone";
        }else if(categoria=="Email"){
            if($scope.email.Contato.length<7){
                Plugins.Mensagem.erro("Email Inválido!")
                return false;
            }
            tipoContato = "email";
        }
        if($scope[tipoContato].Tipo.Key==0 || $scope[tipoContato].Tipo==""){
            Plugins.Mensagem.aviso("Selecione um tipo de "+tipoContato+"!")
            return false;
        }
        $scope[tipoContato].Categoria = categoria;
        $scope[tipoContato].Tipo = $scope[tipoContato].Tipo.Value;
        $scope.Cliente.cliente.Contato.push($scope[tipoContato]);
        $scope[tipoContato] = Objetos.Contato();
        $scope[tipoContato].Tipo = $scope["tipo"+categoria][0];
    }

    $scope.apagarContato = function(index){
        $scope.Cliente.cliente.Contato.splice(index,1);
    }

    $scope.salvar = function () {
        if (FctObjReader.calc()==1 && $scope.Cliente.cliente.Endereco.TipoLogradouro.Key!=0) {
            FctCliente.salvarCliente();
        } else {
            Plugins.Mensagem.aviso("Preencha todos os campos obrigat&oacute;rios!")
        }
    }

    $scope.novoCadastro = function(){
        $scope.Cliente.cliente = Objetos.Cliente();
    }

    $scope.gerarCoordenadas = function(){
        var cliente = $scope.Cliente.cliente;
        if (cliente.ID) {
            $('#clienteGerarCoordenadas').hide();
            var endereco = "";
            endereco += cliente.Endereco.TipoLogradouro.Value + ' ';
            endereco += cliente.Endereco.Logradouro + ', ';
            endereco += cliente.Endereco.Numero + ' - ';
            endereco += cliente.Endereco.Bairro + ', ';
            endereco += cliente.Endereco.Cidade.Value + ' - ';
            endereco += cliente.Endereco.Estado.Value + ', Brasil';
            console.log(endereco);
            Plugins.Mapa.gerarCoordenadas(endereco,
                function (coordenadas) {
                    var coord = coordenadas.lat + ',' + coordenadas.lng;
                    cliente.Endereco.Coordenadas = coord;
                    Plugins.Mensagem.sucesso("Coordenadas geradas com sucesso!");
                    $('#clienteGerarCoordenadas').show();

                    $scope.salvar();
                },
                function (erro) {
                    console.log(erro);
                    Plugins.Mensagem.erro("Erro ao gerar coordenadas!");
                    $('#clienteGerarCoordenadas').show();
                }
            );
        } else {
            Plugins.mensagem.alerta("Cadastre o cliente antes de gerar coordenadas!");
        }
    }
  });
