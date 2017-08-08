var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;

var rol = window.localStorage.getItem('IdRol');
var active = window.localStorage.getItem('active');

var idEstablecimiento;

$(document).on('ready', onReady);

function onReady() {
    $('#btnEntrar').on('click', btnEntrar);
    $('#btnCerrar').on('click', btnCerrar);

    $.urlParam = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    idEstablecimiento = $.urlParam('id');

     /*Carga de datos*/
    loadSesion();
    loadEstableciemiento(idEstablecimiento);

    navigator.geolocation.getCurrentPosition(onSuccessMap, onError, { timeout: 30000 });
}

function loadSesion() {
    if (active == 'true') {
        var profilePic = window.localStorage.getItem('profilePic');
        $("#profilePic").attr('src', 'data:image/png;base64,' + profilePic);
    }
}

/* Datos Establecimiento*/
function loadEstableciemiento(idEstablecimiento) {
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices2 + '/GetEstablecimientoById',
        data: 'token=' + token + '&ced=' + idEstablecimiento,
        success: function(datos) {
            if (datos.CodigoResultado != '0003') {
                /* en caso de encontrar*/
                $.each(datos, function(i, item) {
                    $('#lblName').text(item.nombre_est);
                    var lat = item.Latitud;
                    var lng = item.Longitud;
                    initialize(lat, lng);
                });
                $(".modalLoading").hide();
            } else {
                bootbox.alert({
                    message: "No hay resultados",
                    callback: function() {
                        setTimeout(function() {
                            $('#txtSearch').focus();
                            $("#resultados").html('');
                            $(".modalLoading").hide();
                        }, 150);
                    }
                });
                return false;
            }
        },
        error: function(msg, url, line) {
            console.log(line);
        }
    });
}


/* MAPA*/
function onSuccessMap(position) {
    window.localStorage.setItem('latitudeMyPos', position.coords.latitude);
    window.localStorage.setItem('longitudeMyPos', position.coords.longitude);
    // initialize(0,0,'mapG');
}

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

var map;

function initialize(lat2, lng2) {
    var lat = parseFloat(window.localStorage.getItem('latitudeMyPos'));
    var lng = parseFloat(window.localStorage.getItem('longitudeMyPos'));

    lat2 = parseFloat(lat2);
    lng2 = parseFloat(lng2);
    var myCenter = new google.maps.LatLng(lat, lng);
    var options = {
        zoom: 5,
        center: myCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        travelMode: google.maps.TravelMode["Driving"]
    };

    map = new google.maps.Map(document.getElementById('map'), options);
    
    if (lat2 != 'NULL' && lng2 != 'NULL') {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
        directionsService.route({
            origin: { lat: lat, lng: lng },
            destination: { lat: lat2, lng: lng2 },
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}

function btnEntrar() {
    window.location = 'login.html';
}

function btnCerrar() {
    window.localStorage.setItem('IdRol', null);
    window.localStorage.setItem('active', false);
    window.localStorage.setItem('profilePic', null);
    window.location = 'inicio.html';
}

function goBack() {
    window.history.back();
}