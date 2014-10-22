var Plugins = (function(){
    return {
        Base64 : (function(){
            return{
                criarImagem : function(url,funcao,tipo){
                    var img = new Image;
                    img.onload = function(){
                        Plugins.Base64.imgBase64(img,funcao,tipo);
                    }
                    img.src = url;
                },
                imgBase64 : function(img,funcao,tipo){
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    canvas.getContext("2d").drawImage(img,0,0);
                    tipo = tipo ? tipo : 'png';
                    var base64 = canvas.toDataURL('image/'+tipo);
                    if(funcao){
                        funcao(base64);
                    }else{
                        return base64;
                    }
                }
            }
        })(),
        Camera : (function(){
            var divCamera,
            divFoto,
            estado = "nenhum",
            imagem = "";
            return{
                ativar: function(){
                    if(divCamera){
                        divCamera.data( "photobooth" ).resume();
                        estado = "ativo";
                    }
                },
                cameraToggle: function(){
                    if(estado==="inativo"){
                        Plugins.Camera.ativar();
                    }else{
                        Plugins.Camera.inativar();
                    }
                },
                fechar: function(){
                    if(divCamera){
                        divCamera.data( "photobooth" ).destroy();
                        estado = "nenhum",
                        imagem = "";
                    }
                },
                getImagem: function(){
                    if(imagem!=""){
                        return imagem;
                    }
                },
                iniciar: function(divOrigem,divDestino,callback,conflito){
                    divCamera = $(divOrigem);
                    divFoto = $(divDestino);
                    estado = "ativo";
                    divCamera.photobooth().on("image",function(event,dataUrl){
                        divFoto.append( '<img style="width:100%" src="'+dataUrl+'" >');
                        imagem = dataUrl;
                        callback(event,dataUrl);
                    });
                    Plugins.Camera.traduzir();
                    if(conflito){
                        $('.photobooth ul').css({"list-style-type":"none","padding-left":"0px"});
                        $('.photobooth .submenu').css({"width":"120px"});
                    }                        
                },
                inativar: function(){
                    if(divCamera){
                        divCamera.data( "photobooth" ).pause();
                        estado = "inativo";
                    }
                },
                reiniciarConfiguracoes: function(){
                    if(divCamera){
                        var elemento = divCamera.data( "photobooth" );
                        elemento.setHueOffset(0);
                        elemento.setBrightnessOffset(0);
                        elemento.setSaturationOffset(0);
                        $('li .submenu .slider .handle').css({"left":"50px"});
                    }
                },
                setOpcoes: function(cor,saturacao,brilho,cortar){
                    var total = (1+cor+saturacao+brilho+cortar)*38;
                    $('.photobooth ul').css({"height" : total+"px"});
                    cor ? $('li.hue').show() : $('li.hue').hide();
                    saturacao ? $('li.saturation').show() : $('li.saturation').hide();
                    brilho ? $('li.brightness').show() : $('li.brightness').hide();
                    cortar ? $('li.crop').show() : $('li.crop').hide();
                },
                traduzir: function(){
                    $('.warning.notSupported').text("Desculpe, a câmera não é suportada pelo seu navegador");
                    $('.warning.noWebcam').text("Por favor, dê permissão ao sistema para usar sua Webcam");
                    $('li.hue').attr("title","cor");
                    $('li.saturation').attr("title","saturação");
                    $('li.brightness').attr("title","brilho");
                    $('li.crop').attr("title","corte");
                    $('li.trigger').attr("title","tirar foto");
                }
            }
        })(),
        Mapa : (function(){
            var map = {};
            var directionsRenderer;
            var tempoViagem = "";
            return{
                iniciar : function(divId,centro){
                    tempoViagem = "";
                    var mapDiv = document.getElementById(divId);
                    map = new google.maps.Map(mapDiv, {
                      center: Plugins.Mapa.coords(centro),
                      zoom: 13,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                    //var image = 'js/plugins/toastmessage/images/error.png';
                    //Plugins.Mapa.marcador("-22.822103,-45.204653",'<strong>Conteúdo do Ponto!</strong>','js/plugins/toastmessage/images/error.png');
                },
                coords : function(lat,lng){
                    if(typeof(lat)==="object"){
                        lng = lat.lng;
                        lat = lat.lat;
                    }else if(typeof(lat)==="string"){
                        var coords = lat.split(',');
                        lat = parseFloat(coords[0],10);
                        lng = parseFloat(coords[1],10);
                    }
                    return new google.maps.LatLng(lat,lng);
                },
                gerarCoordenadas : function(endereco,sucesso,erro){
                    /* ex: Avenida Padroeira do Brasil, 193 - Figueira, Guaratinguetá - SP, Brasil */
                    var end = "";
                    if(typeof(endereco)=="string"){
                        end = endereco;
                    }else{
                        end+=endereco.tipoLogradouro+" "+endereco.logradouro+", ";
                        end+=endereco.numero+" - "+endereco.bairro+", "+endereco.cidade+" - "+endereco.estado; 
                    }
                    var url = "http://maps.googleapis.com/maps/api/geocode/json?address="+end+"&sensor=true";
                    var coordenadas = {"lat" : -22.7858148,"lng":-45.1810546};
                    Utils.Ajax.geral(url,
                        function(a){
                            try{
                                coordenadas = a.results[0].geometry.location;
                                sucesso(coordenadas);
                            }catch(e){
                                sucesso(coordenadas);
                            }                            
                        },
                        function(a){
                            console.log(a);
                            erro(coordenadas);
                        }
                    )
                },
                marcador : function(coordenadas,info,icone){
                    if(!icone){
                        icone = "http://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png";
                    }
                    var myLatlng = Plugins.Mapa.coords(coordenadas);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        icon : icone
                    });
                    if(info){
                        var infowindow = new google.maps.InfoWindow({
                            content: info
                        });
                        var infowindow2 = new google.maps.InfoWindow({
                            content: info
                        });
                        google.maps.event.addListener(marker, 'mouseover', function() {
                            infowindow.open(map, this);
                        });
                        google.maps.event.addListener(marker, 'mouseout', function() {
                            infowindow.close();
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow2.open(map, this);
                        });
                    }
                    marker.setMap(map);
                },
                caminho : function(origem,destino,callback){
                    tempoViagem = "";
                    if(directionsRenderer){
                        directionsRenderer.setMap(null);
                    }
                    var directionsService = new google.maps.DirectionsService();
                    directionsRenderer = new google.maps.DirectionsRenderer();
                    var directionsRequest = {
                        origin: Plugins.Mapa.coords(origem),
                        destination: Plugins.Mapa.coords(destino),
                        travelMode: google.maps.DirectionsTravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC
                    };
                    directionsRenderer.setMap(map);
                    directionsService.route(
                        directionsRequest,
                        function(response, status){
                            if (status == google.maps.DirectionsStatus.OK){
                                directionsRenderer.setDirections(response);
                                tempoViagem = response.routes[0].legs[0].duration.text;
                                if(callback){
                                    callback(tempoViagem);
                                }
                            }else{
                                Plugins.Mensagem.erro("Erro ao retornar caminho")
                            }
                        }
                    );
                },
                tempoViagem : function(){
                    return tempoViagem;
                }
            }
        })(),
        Mensagem : (function(){
            return{
                aviso : function(mensagem){
                    $().toastmessage('showNoticeToast', mensagem);
                },
                alerta : function(mensagem){
                    $().toastmessage('showWarningToast', mensagem);
                },
                sucesso : function(mensagem){
                    $().toastmessage('showSuccessToast', mensagem);
                },
                erro : function(mensagem){
                    $().toastmessage('showErrorToast', mensagem);
                }
            }
        })(),
        Menu : (function(){
            return{
                
            }
        })(),
        PDF : (function(){
            return{
                centralizar : function(doc,texto,tamanho,x,y,largura,altura,retanguloVisivel){
                    var compTexto = texto.length;
                    doc.setFontSize(tamanho);
                    doc.text((x+largura/2)-(compTexto*tamanho/12),y+altura/2+tamanho/7, texto );
                    if(arguments.length<=7){/* se nao houver o ultimo argumento, desenhar retangulo */
                        doc.rect(x,y,largura,altura);
                    }
                },
                fechar : function(doc,idContainer,nome){
                    if(!idContainer){
                        if(Utils.navegador()=='IE' || Utils.navegador()=='Desconhecido'){
                            Plugins.PDF.salvar(nome);
                        }else{
                            doc.output('dataurlnewwindow');
                        }
                    }else{
                        var pdf = doc.output('datauristring');
                        document.getElementById(idContainer).src = pdf;
                    }
                },
                salvar : function(doc,nome){
                    doc.output('save', nome+'.pdf');
                }
            }
        })(),
        Calendario : (function(){
    
        })(),
        Grafico : (function(){
            var data = {},
            chart = {},
            tipo = "",
            colunas = [];
            return{
                iniciar : function(divId,tipo){
                    data = new google.visualization.DataTable();
                    tipo = tipo.toLowerCase();
                    colunas = [];
                    var div = document.getElementById(divId);
                    switch(tipo){
                        case "pizza":
                            chart = new google.visualization.PieChart(div);
                            break;
                        case "barra":
                            chart = new google.visualization.BarChart(div);
                            break;
                        case "coluna":
                            chart = new google.visualization.ColumnChart(div);
                            break;
                        case "area":
                            chart = new google.visualization.AreaChart(div);
                            break;
                        case "linha":
                            chart = new google.visualization.LineChart(div);
                            break;
                        case "manometro":
                            chart = new google.visualization.Gauge(div);
                            break;
                        case "degrau":
                            chart = new google.visualization.SteppedAreaChart(div);
                            break;
                        default : chart = new google.visualization.PieChart(div);
                    }                    
                },
                Dados : {
                    colunas : function(campos){
                        data.addColumn("string",campos[0]);
                        colunas.push(campos[0])
                        for(var i=1;i<campos.length;i++){
                            data.addColumn("number",campos[i]);
                            colunas.push(campos[i])
                        }
                        /* ex: ['nome','tarefa','horas'] */
                    },
                    linhas : function(dados){
                        data.addRows(dados);
                        /* ex: data.addRows([
                            ['Work', 11,13],
                            ['Eat', 2,15],
                            ['Commute', 2,15],
                            ['Watch TV', 1,2],
                            ['Sleep', 5,3]
                          ]);*/
                    }
                },
                exibir : function(titulo,largura,altura){
                    chart.draw(data, {width: largura, height: altura, title: titulo, is3D: true});
                },
                Imagem : (function(){
                    function getImgData(chartContainer) {
                        var chartArea = chartContainer.getElementsByTagName('svg')[0].parentNode;
                        var svg = chartArea.innerHTML;
                        var doc = chartContainer.ownerDocument;
                        var canvas = doc.createElement('canvas');
                        canvas.setAttribute('width', chartArea.offsetWidth);
                        canvas.setAttribute('height', chartArea.offsetHeight);


                        canvas.setAttribute(
                            'style',
                            'position: absolute; ' +
                            'top: ' + (-chartArea.offsetHeight * 2) + 'px;' +
                            'left: ' + (-chartArea.offsetWidth * 2) + 'px;');
                        doc.body.appendChild(canvas);
                        canvg(canvas, svg);
                        var imgData = canvas.toDataURL('image/png');
                        canvas.parentNode.removeChild(canvas);
                        return imgData;
                    }
                    return{
                        salvar : function(divId){
                            var chartContainer = document.getElementById(divId);
                            var imgData = getImgData(chartContainer);
                            // Replacing the mime-type will force the browser to trigger a download
                            // rather than displaying the image in the browser window.
                            window.location = imgData.replace('image/png', 'image/octet-stream');
                        },
                        converter : function(origem,destino){
                            var chartContainer = document.getElementById(origem);
                            
                            var doc = chartContainer.ownerDocument;
                            var img = doc.createElement('img');
                            img.src = getImgData(chartContainer);
                            if(arguments.length==1){
                                return img.src;
                            }else{
                                var imgContainer = document.getElementById(destino);
                                while (imgContainer.firstChild) {
                                  imgContainer.removeChild(imgContainer.firstChild);
                                }
                                imgContainer.appendChild(img);
                            }
                            
                        }
                    }
                })()
            }
        })()
    }
})();