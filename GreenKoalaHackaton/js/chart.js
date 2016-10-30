// var data = firebase.database().ref('/dados').limitToLast(2);
// data.on('value', function(snapshot){
//     console.log(snapshot.val());
// });
//limitToLast(3)

// $(function () {
//     $(document).ready(function () {
var value =0;
var terminalPoint = [];
var last = firebase.database().ref('/dados').limitToLast(9);

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    function init(){
        last.on('value', function(s){
            chart(s,value);   
        });
    }

    $(document).ready(function(){
        var select = $('#changeTerminal');
        select.material_select();
        select.change(function(){
            value = select.val();
            
            last.on('value', function(s){
                chart(s, value); 

                
            });
        });
    });
       

    function chart(obj, select){
        var terminalArray = [];

        for(var i=0; i <= 5; i++){
            terminalArray[i] = [];
        }

        $.each(this.realTimeData, function(date, value){
            var getTerminal = value.terminal;
            var obj = [];
            var positionLatLng = {lat: terminais[getTerminal].lat, lng: terminais[getTerminal].lg};
            //console.log(date);
            obj.lat = terminais[getTerminal].lat;
            obj.lg = terminais[getTerminal].lg;
            obj.velocidade_vento =  parseFloat(value.data["velocidade_vento"]);
            obj.direcao_vento =  parseFloat(value.data["direcao_vento"]);
            obj.luminosidade =  parseFloat(value.data["luminosidade"]);
            obj.temperatura =  parseFloat(value.data["temperatura"]);
            obj.umidade_ar =  parseFloat(value.data["umidade_ar"]);
            obj.umidade_terra =  parseFloat(value.data["umidade_terra"]);
            obj.time =  parseInt(date);
            terminalArray[getTerminal].push(obj);
        });

        //console.log(terminalArray);


        Highcharts.chart('container', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                
            },
            title: {
                text: 'Métricas terminal '+(parseInt(select)+1)
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Ar - Vento - Terra - Umidade'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Temperatura do ar',
                data: (function () {
                    // generate an array of random data
                    var data = [];
                    // console.log(terminalPoint);
                    $.each(terminalArray[select], function(key, value){
                        //console.log(key * 1000+ ": "+ parseFloat(value.data["velocidade_vento"]));
                        
                        data.push({
                            x: value.time * 1000,
                            y: parseFloat(value.temperatura)
                        });
                    });
                    return data;
                }())
            },
            {
                name: 'Velocidade do vento',
                data: (function () {
                    // generate an array of random data
                    var data = [];
                    // console.log(terminalPoint);
                    $.each(terminalArray[select], function(key, value){
                        //console.log(key * 1000+ ": "+ parseFloat(value.data["velocidade_vento"]));
                        
                        data.push({
                            x: value.time * 1000,
                            y: parseFloat(value.velocidade_vento)
                        });
                    });
                    return data;
                }())
            },
            {
                name: 'Umidade da terra',
                data: (function () {
                    // generate an array of random data
                    var data = [];
                    // console.log(terminalPoint);
                    $.each(terminalArray[select], function(key, value){
                        //console.log(key * 1000+ ": "+ parseFloat(value.data["velocidade_vento"]));
                        
                        data.push({
                            x: value.time * 1000,
                            y: parseFloat(value.umidade_terra)
                        });
                    });
                    return data;
                }())
            },
            {
                name: 'Umidade do ar',
                data: (function () {
                    // generate an array of random data
                    var data = [];
                    // console.log(terminalPoint);
                    $.each(terminalArray[select], function(key, value){
                        //console.log(key * 1000+ ": "+ parseFloat(value.data["velocidade_vento"]));
                        
                        data.push({
                            x: value.time * 1000,
                            y: parseFloat(value.umidade_ar)
                        });
                    });
                    return data;
                }())
            } 
            ]
        });
    }






    //bubble chart
//    function chartBubble(){

$(function() {

setTimeout(function () {
        var bubbleData = firebase.database().ref('/dados');
        bubbleData.on('value', function(snapshot){
            $.each(snapshot.val(), function(date, value){
                var getTerminal = value.terminal;
                var obj = {};
                obj.lat = terminais[getTerminal].lat;
                obj.lat = terminais[getTerminal].lat;
                obj.lg = terminais[getTerminal].lg;
                obj.umidade_ar =  parseFloat(value.data["umidade_ar"]);
                obj.time =  parseInt(date);
                 terminalPoint[getTerminal] = obj;
            
            });
            console.log(terminalPoint[0].lat);
        });

        $('#containerBubble').highcharts({

            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                zoomType: 'xy'
            },

            title: {
                text: 'Amostras de intensidade - Umidade da terra por terminal'
            },

            xAxis: {
                gridLineWidth: 1
            },

            yAxis: {
                startOnTick: false,
                endOnTick: false
            },

            series: [ {
                data: [
                    [terminalPoint[1].lat, terminalPoint[1].lg, terminalPoint[1].umidade_ar]
                ],
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                        ]
                    }
                    }
                },
                {
                data: [
                    [terminalPoint[2].lat, terminalPoint[2].lg, terminalPoint[2].umidade_ar]
                ],
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                        ]
                    }
                    }
                },
                {
                data: [
                    [terminalPoint[3].lat, terminalPoint[3].lg, terminalPoint[3].umidade_ar]
                ],
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                        ]
                    }
                    }
                },
                {
                data: [
                    [terminalPoint[3].lat, terminalPoint[3].lg, terminalPoint[3].umidade_ar]
                ],
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                        ]
                    }
                    }
                },
                {
                data: [
                    [terminalPoint[4].lat, terminalPoint[4].lg, terminalPoint[4].umidade_ar]
                ],
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                        ]
                    }
                    }
                },
                {
                data: [
                    [terminalPoint[5].lat, terminalPoint[5].lg, terminalPoint[5].umidade_ar]
                ],
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                        ]
                    }
                    }
                }
                ]

            });


    }, 2000);

});
            // }