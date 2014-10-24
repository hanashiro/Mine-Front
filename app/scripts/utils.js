var Utils = (function(){
    var url = "http://localhost:55357/api/";
    return {
        Ajax : {
            buscar : function(endp,sucesso,erro){
                $.ajax({
                    type: "GET",
                    url: url+endp,
                    dataType: "json",
                    success: sucesso,
                    error: erro
                });
            },
            criar : function(endp,obj,sucesso,erro){
                $.ajax({
                    type: "POST",
                    url: url + endp,
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(obj),
                    success: sucesso,
                    error: erro
                });
            },
            alterar : function(endp,obj,sucesso,erro){
                $.ajax({
                    type: "PUT",
                    url: url + endp,
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(obj),
                    success: sucesso,
                    error: erro
                });
            },
            deletar : function(endp,obj,sucesso,erro){
                $.ajax({
                    type: "DELETE",
                    url: url+endp+"/"+obj,
                    dataType: "json",
                    data: JSON.stringify(obj),
                    success: sucesso,
                    error: erro
                });
            },
            geral :  function(url,sucesso,erro,obj){
                if(obj!=undefined){
                    $.ajax({
                        type: "POST",
                        url: url,
                        contentType: 'application/json',
                        dataType: "json",
                        data: JSON.stringify(obj),
                        success: sucesso,
                        error: erro
                    });
                }else{
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        success: sucesso,
                        error: erro
                    });
                }                    
            }
        },
        Moradia : (function(){
            return{
                estadoKey : function(Estado){
                    var estados = Colecao.Estados,
                    i = estados.length-1;
                    while(Estado!=estados[i].Value && i>0){
                        i--;
                    }
                    return estados[i].Key;
                },
                retornarCidade : function(Estado) {
                    Estado = typeof(Estado) == "string" ? Utils.Moradia.estadoKey(Estado) : Estado;
                    var ArrayCidades = new Array();
                    var Cidade = Colecao.Cidades;
                    for (var i = 0; i < Cidade.length; i++) {
                        if (parseInt(Cidade[i].Key / 100000) == Estado)
                        {
                            Cidade[i].Value = Cidade[i].Value.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ");
                            Cidade[i].Value = Cidade[i].Value.toLowerCase();
                            ArrayCidades.push(Cidade[i]);
                        }
                    }
                    if(ArrayCidades.length==0){
                        ArrayCidades.push({ "Key": 0, "Value": "Escolha uma opção" });
                    }
                    return ArrayCidades;
                },
                estadoByKey: function(key){
                    key = parseInt(key,10);
                    var estados = Colecao.Estados,
                    i = estados.length-1;
                    while(key!=estados[i].Key && i>0){
                        i--;
                    }
                    return estados[i];
                },
                cidadeByKey: function(key,estadoKey){
                    key = parseInt(key,10);
                    var cidades = estadoKey ? Utils.Moradia.retornarCidade(estadoKey) : Colecao.Cidades,
                    i = cidades.length-1;
                    while(key!=cidades[i].Key && i>0){
                        i--;
                    }
                    return cidades[i];
                },
                tipoLogradouroByKey: function(key){
                    key = parseInt(key,10);
                    var tiposLogradouros = Colecao.tiposLogradouro,
                    i = tiposLogradouros.length-1;
                    while(key!=tiposLogradouros[i].Key && i>0){
                        i--;
                    }
                    return tiposLogradouros[i];
                },
                Integracao : {
                    buscar: function(obj){
                        obj.endereco.estado = Utils.Moradia.estadoByKey(parseInt(obj.endereco.estado,10));
                        obj.endereco.cidade = Utils.Moradia.cidadeByKey(parseInt(obj.endereco.cidade,10),obj.endereco.estado.Key);
                        obj.endereco.tipoLogradouro = Utils.Moradia.tipoLogradouroByKey(parseInt(obj.endereco.tipoLogradouro,10));
                        return obj;
                    },
                    salvar : function(obj){
                        obj = JSON.parse(JSON.stringify(obj));
                        obj.endereco.tipoLogradouro = obj.endereco.tipoLogradouro.Key+"";
                        obj.endereco.estado = obj.endereco.estado.Key+"";
                        obj.endereco.cidade = obj.endereco.cidade.Key+"";
                        return obj;
                    }
                }
            }
        })(),
        navegador : function(){
          var isOpera = !!window.opera || navigator.userAgent.indexOf('Opera') >= 0;
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
            var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
            var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
            var isChrome = !!window.chrome;                          // Chrome 1+
            var isIE = /*@cc_on!@*/false;                            // At least IE6
            if(isChrome){
                return 'Chrome';
            }else if(isFirefox){
                return 'Firefox';
            }else if(isIE){
                return 'IE';
            }else if(isSafari){
                return 'Safari';
            }else if(isOpera){
                return 'Opera';
            }
            return 'Desconhecido';  
        },
        Mascaras : {
            numerosTeclado : function(evt){
                var theEvent = evt || window.event;
                var key = theEvent.keyCode || theEvent.which;
                if(key==8 || key==9){
                    return true
                }
                if(key>=96 && key<=105){
                    return true
                }
                if(key>=35 && key<=57){
                    return true
                }
                key = String.fromCharCode( key );
                var regex = /[0-9]/;
                if( !regex.test(key) ) {
                  theEvent.returnValue = false;
                  if(theEvent.preventDefault) theEvent.preventDefault();
                }
            },
            limpar: function (string) {

                var retorno = string.replace(/\D/g, "");

                return retorno;
            },

            addCpf: function (v) {

                v=v.replace(/\D/g,"")                 //Remove tudo o que não é dígito
                v=v.replace(/(\d{3})(\d)/,"$1.$2")    //Coloca ponto entre o terceiro e o quarto dígitos
                v=v.replace(/(\d{3})(\d)/,"$1.$2")    //Coloca ponto entre o setimo e o oitava dígitos
                v=v.replace(/(\d{3})(\d)/,"$1-$2")   //Coloca ponto entre o decimoprimeiro e o decimosegundo dígitos
                return v

            },

            addCnpj: function (cnpj) {
                cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
                cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
                cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
                cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos
                return cnpj
            },

            addTel: function (telefone) {
                telefone = telefone.replace(/D/g,""); //Remove tudo o que não é dígito
                telefone = telefone.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
                telefone = telefone.length < 12 ? telefone.replace(/(\d{4})(\d)/, "$1-$2") : telefone.replace(/(\d{4})-(\d)/, "$1-$2")
                return telefone;
            },

            addCep: function (cep) {
                cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");

                return cep;
            }
        }
    }
})();


