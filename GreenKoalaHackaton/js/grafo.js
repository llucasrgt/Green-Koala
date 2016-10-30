var map;
var polyLine;
var polyOptions;
var rotation = 0;
var iconPath = "M 2.44868,261.16793 0,258.68187 5.98174,244.22718 C 9.2717,236.27709 22.23991,204.66503 34.799978,173.97814 47.360066,143.29126 66.262536,97.163612 76.805496,71.472258 c 10.54295,-25.691344 21.4596,-52.386621 24.259224,-59.322835 3.07078,-7.6079967 5.27826,-12.42326874 5.56418,-12.13735274 0.26067,0.260671 5.10892,11.89147474 10.77388,25.84623474 5.66497,13.954759 19.7941,48.494505 31.39807,76.754985 11.60396,28.26048 27.06881,65.98005 34.36631,83.82127 7.29751,17.8412 16.9828,41.43053 21.52285,52.42072 l 8.25465,19.98216 -2.48009,2.19515 c -1.36406,1.20733 -2.64085,2.19995 -2.83733,2.20582 -0.19647,0.006 -23.04742,-10.01829 -50.77986,-22.27593 L 106.42473,218.67589 59.110366,239.59672 C 33.08746,251.10317 10.2438,261.22324 8.34667,262.08576 L 4.89735,263.654 2.44868,261.16793 Z";

var blueMaxVelocity = 4;
var yellowMaxVelocity = 7;
var orangeMaxVelocity = 10;
var redMinVelocity = orangeMaxVelocity;

function init(){
     initMap();
}


function initMap() {
    // Create an array of styles.
    var styles = [
        {
        stylers: [
            { hue: "#60c916" },
            { saturation: 1 }
        ]
        },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
            { lightness: 10 },
            { visibility: "simplified" }
        ]
        },{
        featureType: "road",
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
        }
    ];


        // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});


    //change map Options
    var mapOptions = {
        zoom: 18,
        // mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        center: new google.maps.LatLng(-23.164317, -50.673728),
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    //console.log(realTimeData);
    console.log(terminais);

    var terminalPoint = [];
    $.each(this.realTimeData, function(date, value){
        var getTerminal = value.terminal;
        var obj = {};
        
        obj.lat = terminais[getTerminal].lat;
        obj.lg = terminais[getTerminal].lg;
        obj.velocidade_vento =  parseFloat(value.data["velocidade_vento"]);
        obj.direcao_vento =  parseFloat(value.data["direcao_vento"]);
        terminalPoint[getTerminal] = obj;
        console.log(terminalPoint);
        
    });
   // console.log(terminalPoint);
   //console.log(terminalPoint);
    $.each(terminalPoint, function(key, value){
        //console.log(value["direcao_vento"]);
        addPoint(parseFloat(value["direcao_vento"]), parseFloat(value["velocidade_vento"]),  {lat: value.lat, lng:  value.lg});

       
        
    });
    
       // addPoint(terminalPoint.getTerminal, parseFloat(value.data["velocidade_vento"]),  positionLatLng);

    


    // data.on('value', function(snapshot){
    //     $.each(snapshot.val(), function(date, value){ //Retornar nome da categoria de cada ocupação
    //         var getTerminal = value.terminal;
    //         var terminal = firebase.database().ref('terminais/'+getTerminal);
    //         var terminalLastData = [];

    //         terminal.on('value', function(snapshot) {
    //             var position = snapshot.val();
    //             positionLatLng = {lat: position.lat, lng: position.lg};




    //             addPoint(parseFloat(value.data["direcao_vento"]), parseFloat(value.data["velocidade_vento"]),  positionLatLng);
    //         });



    //     });

    // });
    

}

function addPoint(rotation,velocity, position){
    var fillColor;
    //velocity = parseFloat(velocity);

    if(velocity < blueMaxVelocity)
        fillColor = '#ef9a9a';

    else if(velocity >= blueMaxVelocity && velocity < yellowMaxVelocity)
        fillColor = '#e57373';

    else if(velocity >= yellowMaxVelocity && velocity < orangeMaxVelocity)
        fillColor = '#ef5350';

    else if(velocity >= redMinVelocity)
        fillColor = '#f44336';

    var icon = {
        path: iconPath,
        fillColor: fillColor,
        fillOpacity: 1,
        anchor: new google.maps.Point(0,0),
        strokeColor: 'white',
        strokeWeight: 1,
        scale: .2,
        rotation: rotation

    }

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: false,
        icon: icon
    });
    
    map.panTo(position);
}

