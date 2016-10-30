

var check=false;
var terminalPoint = [];

function init(){
    var last = firebase.database().ref('/dados').limitToLast(9);
    last.on('value', function(s){
    if(check){
        return;
    }
        $.each(s.val(), function(date, value){
            createProviderFormFields(date, value);
        });  
    });
   check = true;
}
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  //var hour = a.getHours();
  var hour = ("0"+a.getHours()).slice(-2);
  //var min = a.getMinutes();
  var min = ("0"+a.getMinutes()).slice(-2);
  //var sec = a.getSeconds();
  var sec = ("0"+a.getSeconds()).slice(-2);
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
function createProviderFormFields(date, value) {
    var tr = '<tr>' ;
    var vento = $('#vd_vento');
    var estado = $('#vd_estado');
    // create a new textInputBox  
    var formatDate = timeConverter(date);
    console.log(date);
    
    //formatDate = formatDate.getUTCHours()+":"+formatDate.getUTCMinutes()+":"+formatDate.getUTCSeconds()+ " "+ formatDate.getUTCDay()+"/"+formatDate.getMonth();
    // var textInputBox = $('<input />').attr({
    //     type: "text",
    //     id: id, name: id,
    //     title: tooltip
    // });  

    // if((cont > 3)){
    //     console.log($('#vd_vento #vd_ventoData'));
    //     $('#vd_vento #vd_ventoData').remove();
    //     $('#vd_vento #vd_estadoData').remove();
    //     // $('#vd_vento #vd_ventoData').remove();
    //     // $('#vd_vento #vd_estadoData').remove();
    //     // $('#vd_vento #vd_ventoData').remove();
    //     // $('#vd_vento #vd_estadoData').remove();
    //     // $('#vd_vento #vd_ventoData').remove();
    //     // $('#vd_vento #vd_estadoData').remove();
    // }
        // create a new Label Text
        tr += '<td>'+ formatDate+ '</td>';
        tr += '<td>' + value.terminal + '</td>';
        tr += '<td>' + value.data.velocidade_vento + '</td>';  
        tr += '<td>' + value.data.direcao_vento + '</td>';    
        tr +='</tr>';
    
        vento.append(tr);
        
        tr = '<tr>';
        tr += '<td>'+ formatDate+ '</td>';
        tr += '<td>' + value.terminal + '</td>';
        tr += '<td>' + value.data.temperatura + '</td>';   
        tr += '<td>' + value.data.umidade_ar + '</td>';  
        tr += '<td>' + value.data.umidade_terra + '</td>';    
        tr +='</tr>';

        estado.append(tr);
}