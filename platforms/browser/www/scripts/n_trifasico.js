var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;
var idCatEst = '';
var hourEstStart = '';
var hourEstEnd = '';
var imgEst = '';


$(document).on('ready', onReady);

function onReady() {
    $('#btnEntrar').on('click', btnEntrar);
    $('#btnCerrar').on('click', btnCerrar);
    var loading_time = 500;
    // navigator.geolocation.getCurrentPosition(onSuccessMap, onError, {timeout: 30000});
    $("#txtSearch").keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $(".modalLoading").show();
    setTimeout(function () {
        $(".modalLoading").hide();
    }, loading_time);
    $('#btnSearch').on('click', btnSearch);
    $('#divContainer').hide();
    $('#divContainerNR').hide();
    $('#txtSearch').mask("#,##0", {reverse: true});

    loadSesion();
}


function loadSesion() {
    if (active == 'true') {
        var profilePic = window.localStorage.getItem('profilePic');
        $("#profilePic").attr('src', 'data:image/png;base64,' + profilePic);
    }
}

function btnSearch() {
    var loading_time = 1500;
    $(".modalLoading").show();
    $('#divContainer').hide();
    $('#divContainerNR').hide();
    var text = $('#txtSearch').val();
    var sumDiv = parseInt(text.replace(',', '') / 3);
    var txtCat = '';
    $("#lstInclude1_1").empty();
    $("#lstInclude2_1").empty();
    $("#lstInclude3_1").empty();

    if (text != '') {
        $('#navSearch').removeClass("divCenter");
        //GASTRONOMIA SEARCH
        txtCat = 'gast';
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: urlServices2 + '/GetTrifasicoByCat',
            data: 'token=' + token + '&cate_art=' + txtCat + '&sum=' + sumDiv,
            success: function (datos) {
                $('#divContainer').show();
                $.each(datos, function (i, categories) {
                    // alert(categories.nombre_est)
                    idCatEst = categories.codigo_est;
                    $("#lblEst1").text(categories.nombre_est);
                    $("#lblEst1_1").text("1- " + categories.nombre_est);
                    $("#lblDesc1_1").text(categories.descri_est);
                    hourEstStart = categories.horIni_est.substr(0, 5).replace(':', '').replace(/(\d+)/g, function (match) {
                        return getFormattedTime(match)
                    });
                    hourEstEnd = categories.horFin_est.substr(0, 5).replace(':', '').replace(/(\d+)/g, function (match) {
                        return getFormattedTime(match)
                    });
                    $("#lblHour1_1").text(hourEstStart + ' - ' + hourEstEnd);
                    //Get Est IMG
                    imgEst = "data:image/jpeg;base64,"  + categories.FotoEst;
                    $('#imgEst1').attr("src",imgEst);
                    //Get Route
                    initialize(categories.cx_mar,categories.cy_mar,'mapG');
                    $.ajax({
                        type: "GET",
                        crossDomain: true,
                        url: urlServices2 + '/GetArticulosByIdEst',
                        data: 'token=' + token + '&IdEst=' + idCatEst,
                        success: function (datos) {
                            $.each(datos, function (i, articles) {
                                // alert(articles.nombre_art);
                                $("#lstInclude1_1").append('<li>' + articles.nombre_art + ' $' + articles.precio_art + ' \
                                                            </li>');
                            });
                        },
                        error: function (msg, url, line) {
                            // alert('Failure');
                        }
                    });
                });
            },
            error: function (msg, url, line) {
                // alert('Failure');
            }
        });
        //TURISMO SEARCH
        txtCat = 'tur';
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: urlServices2 + '/GetTrifasicoByCat',
            data: 'token=' + token + '&cate_art=' + txtCat + '&sum=' + sumDiv,
            success: function (datos) {
                $.each(datos, function (i, categories) {
                    // alert(categories.idcate_cat);
                    idCatEst = categories.codigo_est;
                    $("#lblEst2").text(categories.nombre_est);
                    $("#lblEst2_1").text("2- " + categories.nombre_est);
                    $("#lblDesc2_1").text(categories.descri_est);
                    hourEstStart = categories.horIni_est.substr(0, 5).replace(':', '').replace(/(\d+)/g, function (match) {
                        return getFormattedTime(match)
                    });
                    hourEstEnd = categories.horFin_est.substr(0, 5).replace(':', '').replace(/(\d+)/g, function (match) {
                        return getFormattedTime(match)
                    });
                    $("#lblHour2_1").text(hourEstStart + ' - ' + hourEstEnd);
                    //Get Est IMG
                    imgEst = "data:image/jpeg;base64,"  + categories.FotoEst;
                    $('#imgEst2').attr("src",imgEst);
                    //Get Route
                    initialize(categories.cx_mar,categories.cy_mar,'mapG2');
                    $.ajax({
                        type: "GET",
                        crossDomain: true,
                        url: urlServices2 + '/GetArticulosByIdEst',
                        data: 'token=' + token + '&IdEst=' + idCatEst,
                        success: function (datos) {
                            $.each(datos, function (i, articles) {
                                // alert(articles.nombre_art);
                                $("#lstInclude2_1").append('<li>' + articles.nombre_art + ' $' + articles.precio_art + ' \
                                                            </li>');
                            });
                        },
                        error: function (msg, url, line) {
                            // alert('Failure');
                        }
                    });
                });
            },
            error: function (msg, url, line) {
                // alert('Failure');
            }
        });
        //RECREACION SEARCH
        txtCat = 'rec';
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: urlServices2 + '/GetTrifasicoByCat',
            data: 'token=' + token + '&cate_art=' + txtCat + '&sum=' + sumDiv,
            success: function (datos) {
                $.each(datos, function (i, categories) {
                    // alert(categories.idcate_cat);
                    idCatEst = categories.codigo_est;
                    $("#lblEst3").text(categories.nombre_est);
                    $("#lblDesc3_1").text(categories.descri_est);
                    $("#lblEst3_1").text("3- " + categories.nombre_est);
                    hourEstStart = categories.horIni_est.substr(0, 5).replace(':', '').replace(/(\d+)/g, function (match) {
                        return getFormattedTime(match)
                    });
                    hourEstEnd = categories.horFin_est.substr(0, 5).replace(':', '').replace(/(\d+)/g, function (match) {
                        return getFormattedTime(match)
                    });
                    $("#lblHour3_1").text(hourEstStart + ' - ' + hourEstEnd);
                    //Get Est IMG
                    imgEst = "data:image/jpeg;base64,"  + categories.FotoEst;
                    $('#imgEst3').attr("src",imgEst);
                    //Get Route
                    initialize(categories.cx_mar,categories.cy_mar,'mapG3');
                    $.ajax({
                        type: "GET",
                        crossDomain: true,
                        url: urlServices2 + '/GetArticulosByIdEst',
                        data: 'token=' + token + '&IdEst=' + idCatEst,
                        success: function (datos) {
                            $.each(datos, function (i, articles) {
                                // alert(articles.nombre_art);
                                $("#lstInclude3_1").append('<li>' + articles.nombre_art + ' $' + articles.precio_art + ' \
                                                            </li>');
                            });
                            setTimeout(function () {
                                $(".modalLoading").hide();
                            }, loading_time);
                        },
                        error: function (msg, url, line) {
                            // alert('Failure');
                        }
                    });
                });
            },
            error: function (msg, url, line) {
                // alert('Failure');
                setTimeout(function () {
                    $(".modalLoading").hide();
                }, loading_time);
                $('#divContainerNR').show();
            }
        });
        // window.localStorage.setItem('keyword', text);
        // window.localStorage.setItem('category', category);
        // window.localStorage.setItem('municipio', municipio);
        // window.location = 'resultado-busqueda.html';
    }
    else {
        setTimeout(function () {
            $(".modalLoading").hide();
        }, loading_time);
        bootbox.alert({
            title: "Alerta!",
            message: "Debes ingresar una busqueda!",
            callback: function () {
                setTimeout(function () {
                    $('#txtSearch').focus();
                }, 150);
            }
        });
        return false;
    }
    navigator.geolocation.getCurrentPosition(onSuccessMap, onError, {timeout: 30000});
}

getFormattedTime = function (fourDigitTime) {
    var hours24 = parseInt(fourDigitTime.substring(0, 2), 10);
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = fourDigitTime.substring(2);
    return hours + ':' + minutes + amPm
};

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

function initialize(lat2,lng2,idMap) {
    // var lat = position.coords.latitude;
    // var lng = position.coords.longitude;
    var lat =  parseFloat(window.localStorage.getItem('latitudeMyPos'));
    var lng = parseFloat(window.localStorage.getItem('longitudeMyPos'));
    // lat2 = 4.79053;
    // lng2 = -74.0972;
    lat2 = parseFloat(lat2);
    lng2 = parseFloat(lng2);
    var myCenter = new google.maps.LatLng(lat, lng);
    var options = {
        zoom: 5,
        center: myCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        travelMode: google.maps.TravelMode["Driving"]
    };

    map = new google.maps.Map(document.getElementById(''+idMap+''), options);
    // var marker = new google.maps.Marker({
    //     position: myCenter
    // });
    //
    // marker.setMap(map);
    if(lat2 != 'NULL' && lng2 != 'NULL') {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
        directionsService.route({
            origin: {lat: lat, lng: lng},
            destination: {lat: lat2, lng: lng2},
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}

// google.maps.event.addDomListener(window, 'load', initialize);

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