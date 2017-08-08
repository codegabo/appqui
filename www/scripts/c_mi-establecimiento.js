var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;
var active = window.localStorage.getItem('active');
var idEstablecimiento;
var b64str = "iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAIAAABu2d1/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTdCNTdFMjdCQ0FBMTFFNkI5QjdGQjc5NkZFODM0NkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTdCNTdFMjhCQ0FBMTFFNkI5QjdGQjc5NkZFODM0NkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxN0I1N0UyNUJDQUExMUU2QjlCN0ZCNzk2RkU4MzQ2RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxN0I1N0UyNkJDQUExMUU2QjlCN0ZCNzk2RkU4MzQ2RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrPjwdYAAAjMSURBVHja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";

$(document).on('ready', onReady);

function onReady() {
    $('#btnEditarEstable').on('click', btnEditarEstable);
    $('#btnFotos').on('click', btnFotos);
    $('#lblFavoritos').on('click', addFavoritos);


    $.urlParam = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    };

    //idEstablecimiento = $.urlParam('id');
    idEstablecimiento = 12;

    /*Carga de datos*/
    loadSesion();
    loadEstableciemiento(idEstablecimiento);
    loadArticulos(idEstablecimiento);
    loadFotos(idEstablecimiento);
    loadCriticas(idEstablecimiento);
    $('#CapturePhoto').on('click', capturePhoto);
    $('#CaptureFromGallery').on('click', captureFromGallery);
}

function btnEditarEstable() {
    window.location = 'perfil-negocio2.html?id=' + idEstablecimiento;
}

function btnFotos() {
    window.location = 'mi-establecimiento-fotos.html?id=' + idEstablecimiento;
}

function loadSesion() {
    $(".modalLoading").show();
    if (active == 'true') {
        var profilePic = window.localStorage.getItem('profilePic');
        $("#profilePic").attr('src', 'data:image/png;base64,' + profilePic);
    }
}

/* Info establecimiento */
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
                    $('#lblExcelente').text(item.Exelente);
                    $('#lblBueno').text(item.Bueno);
                    $('#lblRegular').text(item.Regular);
                    $('#lblMalo').text(item.Malo);
                    $('#lblFavoritos').text(item.Favorito);
                    $('#lblDescription').text(item.descri_est);
                    $("#imgLocal").attr('src', 'data:image/png;base64,' + item.foto);
                    var lat = item.Latitud;
                    var lng = item.Longitud;
                    initialize(lat, lng);
                });
                // $(".modalLoading").hide();
            } else {
                bootbox.alert({
                    message: "No hay resultados",
                    callback: function() {
                        setTimeout(function() {
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

/* Articulos / Productos */
function loadArticulos(idEstablecimiento) {
    console.log(idEstablecimiento);
    var articulos = '';
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices2 + '/GetArticulosByIdEst',
        data: 'token=' + token + '&IdEst=' + idEstablecimiento,
        success: function(datos) {
            if (datos.CodigoResultado != '0003') {
                $.each(datos, function(i, item) {
                    articulos += '<li class="mb-10">' +
                        '<div class="row vertical-align">' +
                        '<div class="col-xs-3 no-padding "> <img src="data:image/jpeg;base64,' + item.foto + '" alt="" class="img-responsive img-rounded"> </div>' +
                        '<div class="col-xs-7 no-padding ">' +
                        '<h1 class="text-gris-claro">' + item.nombre_art + '</h1>' +
                        '<p>' + item.descri_art + '</p>' +
                        '</div>' +
                        '<div class="col-xs-2 no-padding">' +
                        '<div class="corazon" onclick="addMegusta(' + item.codigo_art + ',' + item.Megusta + ');">' + item.Megusta + '</div>' +
                        '<div class="edit glyphicon glyphicon-plus" onclick="redirect(' + item.codigo_art + ');">' + item.Megusta + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</li>';
                });
                $("#articulos").html(articulos);
                // $(".modalLoading").hide();
            } else {
               
                return false;
            }
        },
        error: function(msg, url, line) {
            console.log(line);
        }
    });
}

/* Fotos Establecimiento */
function loadFotos(idEstablecimiento) {
    var fotosEstable = '';
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices + '/GetFotoByEstablecimiento',
        data: 'token=' + token + '&codigo_est=' + idEstablecimiento,
        success: function(datos) {
            if (datos.CodigoResultado != '0003') {
                $.each(datos, function(i, item) {
                    fotosEstable += '<div><img class="img-responsive img-rounded img-carrousel" src="data:image/jpeg;base64,' + item.Foto + '" alt=""></div>';
                });
                $("#fotosEsta").html(fotosEstable);
                $('.center').slick({
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '50px',
                            slidesToShow: 1
                        }
                    }]
                });
                // $(".modalLoading").hide();
            } else {
               
                return false;
            }
        },
        error: function(msg, url, line) {
            console.log(line);
        }
    });
}

/* Criticas */
function loadCriticas(idEstablecimiento) {
    var loading_time = 2500;
    // $(".modalLoading").show();
    var criticas = '';
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices + '/GetCriticaByEstablecimiento',
        data: 'token=' + token + '&establecimiento_codigo_est=' + idEstablecimiento,
        success: function(datos) {
            if (datos.CodigoResultado != '0003') {
                $.each(datos, function(i, item) {
                    criticas += '<li> ' +
                        '<div class="row vertical-align ">' +
                        '<div class="col-xs-3 no-padding">' +
                        '<img src="img/img-comentarios.png" alt="" class="img-responsive center-block">' +
                        '</div>' +
                        '<div class="col-xs-6 no-padding">' +
                        '<p class="text-azul">' + item.usuari_cri + '</p>' +
                        '<p class="text-azul">' + item.critic_fec.substr(0,10) + '</p>' +
                        '<p>' + item.texcom_cri + '</p>' +
                        '</div>' +
                        '<div class="col-xs-3 no-padding">' +
                        '<div class="calificacion ' + item.califi_cri.toLowerCase() + '"></div>' +
                        '</div>' +
                        '</div>' +
                        '</li>';
                });
                $("#criticas").html(criticas);
                // $(".modalLoading").hide();
            } else {
               
                return false;
            }
        },
        error: function(msg, url, line) {
            console.log(line);
        }
    });
    setTimeout(function () {
        $(".modalLoading").hide();
    }, loading_time);
}

/* MAPA */
function onSuccessMap(position) {
    initialize();
}

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

var map;

function initialize(lat, lng) {
    var myCenter = new google.maps.LatLng(lat, lng);
    var options = {
        zoom: 15,
        center: myCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), options);
    var marker = new google.maps.Marker({
        position: myCenter
    });

    marker.setMap(map);
}

function addFavoritos() {
    var idusu_usu = window.localStorage.getItem('idusu_usu');
    console.log(idusu_usu);
    console.log(idEstablecimiento);
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlServices + 'Favoritos',
        data: '{' +
            '"token":"' + token + '", ' +
            '"codigo_fav": 0, ' +
            '"codigo_est":' + idEstablecimiento + ', ' +
            '"idusu_usu":' + idusu_usu + '' +
            '}',
        success: function(datos) {
            if (datos.CodigoResultado != '0005') {
                $(".modalLoading").hide();

                loadEstableciemiento(idEstablecimiento);
                bootbox.alert({
                    message: "Datos agregados correctamente.",
                    callback: function() {}
                });
            } else {
                bootbox.alert({
                    message: "Error al guardar en favoritos.",
                    callback: function() {
                        setTimeout(function() {
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

function addMegusta(codigo_art, Megusta) {
    var Megusta = Megusta + 1;
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: urlServices + 'MeGusta',
        data: '{' +
            '"token":"' + token + '", ' +
            '"codigo_meg": 0, ' +
            '"codigo_art":' + codigo_art + ', ' +
            '"me_gusta":' + Megusta + '' +
            '}',
        success: function(datos) {
            if (datos.CodigoResultado != '0005') {
                $(".modalLoading").hide();

                loadArticulos(idEstablecimiento);
                bootbox.alert({
                    message: "Datos agregados correctamente.",
                    callback: function() {}
                });
            } else {
                bootbox.alert({
                    message: "Error al guardar en favoritos.",
                    callback: function() {
                        setTimeout(function() {
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

function redirect(codigo_art) {
    var url = "articulos-edit.html?idArt="+codigo_art+"";
    $(location).attr('href',url);
}

function addCriticas(calificacion) {
    var txtCriticas = $('#txtCriticas').val();
    var idusu_usu = window.localStorage.getItem('idusu_usu');
    var nomest_cri = $('#lblName').text();

    console.log(txtCriticas + ' ' + nomest_cri);
    if (txtCriticas != '') {
        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            url: urlServices + 'Criticas',
            data: '{' +
                '"token":"' + token + '", ' +
                '"codigo_cri": 0, ' +
                '"texcom_cri": "' + txtCriticas + '",' +
                '"imacom_cri": "",' +
                '"califi_cri": "' + calificacion + '",' +
                '"calPre_cri": "",' +
                '"usuari_cri": "' + idusu_usu + '",' +
                '"nomest_cri": "' + nomest_cri + '",' +
                '"critic_cri": "",' +
                '"usuario_codigo_usu": ' + idusu_usu + ',' +
                '"establecimiento_codigo_est": ' + idEstablecimiento + ',' +
                '"establecimiento_marcador_idPunti": 0,' +
                '"active": true' +
                '}',
            success: function(datos) {
                if (datos.CodigoResultado != '0005') {
                    $(".modalLoading").hide();

                    loadCriticas(idEstablecimiento);
                    bootbox.alert({
                        message: "Datos agregados correctamente.",
                        callback: function() {}
                    });
                } else {
                    bootbox.alert({
                        message: "Error al guardar en favoritos.",
                        callback: function() {
                            setTimeout(function() {
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
    } else {
        bootbox.alert({
            message: "Debe agregar un comentario.",
            callback: function() {}
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

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 500,
        targetHeight: 300,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG
    });
}

function captureFromGallery() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetWidth: 500,
        targetHeight: 300,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG
    });
}

function onSuccess(imageData) {
    b64str = imageData;
    addPics();
}

function onFail(message) {
}

function addPics() {
        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            url: urlServices + 'FotosEstablecimiento',
            data: '{' +
            '"token":"' + token + '", ' +
            '"codigo_foto": 0, ' +
            '"codigo_est": "' + idEstablecimiento + '",' +
            '"foto": "' + b64str + '",' +
            '}',
            success: function(datos) {
                    $(".modalLoading").hide();
                    bootbox.alert({
                        message: "Foto agregada correctamente.",
                        callback: function () {
                            setTimeout(function () {
                                window.location = 'mi-establecimiento.html';

                            }, 150);
                        }
                    });
            },
            error: function(msg, url, line) {
                console.log(line);
            }
        });
}

function goBack() {
    window.history.back();
}
