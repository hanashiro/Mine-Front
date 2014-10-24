'use strict';

/**
 * @ngdoc function
 * @name mineApp.controller:ClienteClientebuscaCtrl
 * @description
 * # ClienteClientebuscaCtrl
 * Controller of the mineApp
 */
angular.module('mineApp')
  .controller('ClienteClientebuscaCtrl', 
  function ($scope,$location,FctCliente) {
    $scope.Cliente = FctCliente;
    
    $scope.busca = "";

    /******* FUNCOES *******/
    $scope.buscar = function(){
        $scope.Cliente.buscarClientes($scope.busca,$scope.tipoBusca());
    }

    $scope.travarCampo = function (event) {
        if($scope.tipoBusca()=="telefone"){
            Utils.Mascaras.numerosTeclado(event);
        }
    }

    $scope.mascararBusca = function (e) {
        if($scope.tipoBusca()=="telefone"){
            var busca = Utils.Mascaras.addTel($scope.busca);
            $scope.busca = busca.substring(0,15);
        }
    }

    $scope.tipoBusca = function () {
        var busca = $scope.busca;
        if (!isNaN(parseInt(busca, 10)) || busca.indexOf('(') != -1 || busca.indexOf(')') != -1 && busca.indexOf('@') == -1) {
            busca = busca.replace(/\(/gi, '');
            busca = busca.replace(/\)/gi, '');
            if (!isNaN(parseInt(busca, 10))) {
                return "telefone";
            }
            return "email";
        }
        if (busca.indexOf('@') != -1) {
            return "email";
        } 
        return "nome";
    }


    $scope.selecionarCliente = function(cliente){
        $scope.Cliente.cliente = cliente;
        $scope.iniciarMapa();
    }

    $scope.editarCliente = function(cliente){
        $scope.Cliente.cliente = cliente;
        $location.url('cliente/clienteCadastro/'+cliente.nome);
    }

    $scope.deletar = function(cliente){
        
    }

    $scope.iniciarMapa = function () {
        var cliente = $scope.Cliente.cliente;
        if(cliente.endereco.coordenadas!=""){
            Plugins.Mapa.iniciar('clienteMapa', cliente.endereco.coordenadas);
            Plugins.Mapa.marcador(cliente.endereco.coordenadas, false, false,
                function (marcador, evento) {
                    /*if (confirm("Deseja salvar a nova posição?")) {
                        marcador.marker.setPosition(marcador.posicaoFinal);
                        Core.Controles.Cliente.Cadastro.aplicar(function (scope) {
                            var coordenadas = marcador.posicaoFinal.d + ',' + marcador.posicaoFinal.e;
                            cliente.endereco.coordenadas = coordenadas;
                            $scope.visualizar(cliente);
                            scope.salvar();
                            $('#clienteCadastro').dialog('close');
                        });
                    } else {*/
                    marcador.marker.setPosition(marcador.posicaoInicial);
                    //}
                }
            );
        }
    }

    $scope.abrirMapa = function () {
        $("#clienteMapa").dialog({
            title: "Mapa",
            position: { my: "center", at: "center", of: window },
            width: 500,
            height: 500,
            resizable: false,
            draggable: false,
            modal: true,
            show: { effect: "drop", duration: 800 },
            hide: { effect: "drop", duration: 1000 },
            close: function (event, ui) {
                $("#clienteMapa").dialog('destroy');
            },
        });
    }
    
  });
