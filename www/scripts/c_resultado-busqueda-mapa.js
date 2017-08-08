var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;

$(document).on('ready', onReady);

function onReady() {
    $('#btnSearch').on('click', btnSearch);
    $('#btnList').on('click', btnList);

    /*Carga de datos*/
    loadSesion();
    loadNegocios();

    navigator.geolocation.getCurrentPosition(onSuccessMap, onError, { timeout: 30000 });
}

function loadSesion() {
    if (active == 'true') {
        var profilePic = window.localStorage.getItem('profilePic');
        $("#profilePic").attr('src', 'data:image/png;base64,' + profilePic);
    }
}

function btnSearch() {
    var keyword = $('#txtSearch').val();
    var category = $('#cboCategories  option:selected').val();
    var municipio = $('#cboMunicipio  option:selected').val();

    window.localStorage.setItem('keyword', keyword);
    window.localStorage.setItem('category', category);
    window.localStorage.setItem('municipio', municipio);

    loadData(keyword, category, municipio);
}

function btnList() {
    window.location = 'resultado-busqueda.html';
}

function loadNegocios() {
 bootbox.alert({
message: "Si el GPS esta encendido tu busqueda sera mas exacta",
callback: function() {
setTimeout(function() {
$("#articulos").html('');
$(".modalLoading").hide();
}, 150);
}
});
    var keyword = window.localStorage.getItem('keyword');
    var category = window.localStorage.getItem('category');
    var municipio = window.localStorage.getItem('municipio');

    /* Asiganacion de combos */
    $('#txtSearch').val(keyword);
    if (category == 'Categoria') {
        category = '';
    } else {
        $("#cboCategories option[value='" + category + "']").prop('selected', true);
    }

    if (municipio == 0) {
        municipio = '';
    } else {
        $("#cboMunicipio option[value='" + municipio + "']").prop('selected', true);
    }

    loadData(keyword, category, municipio);
}

function loadData(keyword, category, municipio) {

    var loading_time = 3000;
    $(".modalLoading").show();
    // setTimeout(function () {
    //     $(".modalLoading").hide();
    // }, loading_time);

    if (category == 'Categoria') {
        category = '';
    }

    if (municipio == 0) {
        municipio = 0;
    }

    /* Consulta del servicio y llenado de resultados*/
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices + '/SearchEstablecimiento',
        data: 'token=' + token + '&keyWord=' + keyword + '&category=' + category + '&codigoNun=' + municipio,
        success: function(datos) {
            if (datos.CodigoResultado != '0003') {
                /* en caso de encontrar*/

                var lat = parseFloat(window.localStorage.getItem('latitudeMyPos'));
                var lng = parseFloat(window.localStorage.getItem('longitudeMyPos'));

                var myCenter = new google.maps.LatLng(lat, lng);
                var options = {
                    zoom: 12,
                    center: myCenter,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(document.getElementById("map"), options);

                // /*Markers*/
                var iconBase = 'img/';
                var icons = {
                    user: {
                        icon: iconBase + 'pin-user.png'
                    },
                    open: {
                        icon: iconBase + 'MarcadorVerde-mini.png'
                    },
                    close: {
                        icon: iconBase + 'MarcadorRojo-mini.png'
                    }
                };

                var infowindow = new google.maps.InfoWindow();
                var marker, i;
                marker = new google.maps.Marker({
                    icon: icons['user'].icon,
                    position: myCenter
                });
                marker.setMap(map);


                $.each(datos, function(i, item) {

                    var iconH;
                    if (item.horIni_est != null || item.horFin_est != null) {
                        var d = new Date();
                        var hourSys = d.getHours();

                        var horaIni = getHour(item.horIni_est);
                        var horaFin = getHour(item.horFin_est);

                        if (hourSys >= horaIni && hourSys < horaFin) {
                            iconH = icons['open'].icon;
                        } else {
                            iconH = icons['close'].icon;
                        }
                    }

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(item.Latitud, item.Longitud),
                        icon: iconH,
                        map: map
                    });
                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            infowindow.setContent('<a href="info-local.html?id=' + item.codigo_est + '"><h3 style="font-family:BRLNSR;">' + item.nombre_est + '</h3></a>');
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
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
            alert(line);
        }
    });
}


function getHour(hour) {
    var hm;
    var hora;
    var h;

    hm = hour.split(':')[1].replace('00', '').replace('30', '');
    hora = hour.split(':')[0];

    if (hm == 'am') {
        h = parseInt(hora);
    } else if (hm == 'pm') {
        h = parseInt(hora) + 12;
    }
    return h;
}


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

function goBack() {
    window.history.back();
}
