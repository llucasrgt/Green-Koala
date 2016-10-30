/*RECEBENDO DADOS - FIREBASE */
var data = firebase.database().ref('/');

var allData ={};
var realTimeData =[];
var terminais = [];
var tipoPlantacao;
var lastData;
var arrayChart;


// dataTerminal.once('value', function(snapshot){
//     $.each(snapshot.val(), function(index, value){ //Retornar nome da categoria de cada ocupação
//         terminais[index] = value;
//     });
//     console.log(terminais);
// });


setTimeout(function(){ 
    data.on('value', function(snapshot){
        allData = snapshot.val();
        realTimeData = allData.dados;
        terminais = allData.terminais;
        tipoPlantacao = allData.tipo_plantacao;
        
        
        //lastData = realTimeData.slice(0,5);
       init();
    });
 }, 30);


