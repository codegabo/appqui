var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;


var idUsu = window.localStorage.getItem('IdUser');
var idEstablecimiento;

$(document).on('ready', onReady);

function onReady() {
    $('#btnMap').on('click', btnMap);
    $('#lblFavoritos').on('click', addFavoritos);

    $.urlParam = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    idEstablecimiento = $.urlParam('id');

    /*Carga de datos*/
    loadSesion();
    loadEstableciemiento(idEstablecimiento);
    loadArticulos(idEstablecimiento);
    loadFotos(idEstablecimiento);
    loadCriticas(idEstablecimiento);
    loadPhone(idEstablecimiento);

    $('.price').mask("#.##0", {reverse: true});
}

function btnMap() {
    window.location = 'ubicacion-negocio.html?id=' + idEstablecimiento;
}


function loadSesion() {
    if (active == 'true') {
        var profilePic = window.localStorage.getItem('profilePic');
        $("#profilePic").attr('src', 'data:image/png;base64,' + profilePic);

        /* Usuario Logeado*/
        $('#btnPQRS').css("display", "block");
    } else {
        /* Usuario Logeado*/
        $('#btnPQRS').css("display", "none");
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

                    //alert(item.horIni_est);

                    /*Horario*/
                    $('#horario').css('background', 'url(img/En-Servicio.png)no-repeat center');
                    $('#horario').css('background-size', '90%');
                });
                $(".modalLoading").hide();
            } else {
             
                return false;
            }
        },
        error: function(msg, url, line) {
            console.log(line);
        }
    });
}
/* Numero telefonico */
function loadPhone(idEstablecimiento) {
var phone = '';
$.ajax({
type: "GET",
crossDomain: true,
url: urlServices2 + '/GetEstablecimientoById',
data: 'token=' + token + '&ced=' + idEstablecimiento,
success: function(datos) {
if (datos.CodigoResultado != '0003') {
$.each(datos, function(i, item) {
phone += '<a href="tel:'+ item.telefo_est + '" style="color:white">Llamar</a>';
});
$("#phone").html(phone);
$(".modalLoading").hide();
} else {
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
                        '<div class="col-xs-3 no-padding"> <img src="data:image/jpeg;base64,' + item.foto + '" alt="" class="img-responsive"> </div>' +
                        '<div class="col-xs-6 no-padding">' +
                            '<h1 class="text-gris-claro">' + item.nombre_art + '</h1>' +
                            '<p>' + item.descri_art + '</p>' +
                            '<p>$<label class="price">Male</label>' + item.precio_art + '</p>' +
                        '</div>' +
                        '<div class="col-xs-3 no-padding">' +
                            '<div class="corazon" onclick="addMegusta(' + item.codigo_art + ',' + item.Megusta + ');">' + item.Megusta + '</div>' +
                            '<div class="text">' + item.Megusta + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</li>';
                });
                $("#articulos").html(articulos);
                $(".modalLoading").hide();
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
                    fotosEstable += '<div><img class="img-responsive" src="data:image/jpeg;base64,' + item.Foto + '" alt=""></div>';
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
                $(".modalLoading").hide();
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
'<div class="col-xs-6 no-padding"  >' +
'<p class="text-azul">' + item.usuari_cri + '</p>' +
'<p class="text-azul" style="margin-top:-8%;">' + item.critic_fec.substr(0,10) + '</p>' +
'<p style="margin-top:-8%;font-size:70%;">' + item.texcom_cri + '</p>' +
'</div>' +
'<div class="col-xs-3 no-padding">' +
'<div class="calificacion ' + item.califi_cri.toLowerCase() + '"></div>' +
'</div>' +
'</div>' +
'</li>';
});
$("#criticas").html(criticas);
$(".modalLoading").hide();
} else {
return false;
}
},
error: function(msg, url, line) {
console.log(line);
}
});
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
    if (active == 'true') {
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
    } else {
        bootbox.alert({
            message: "Debe estar registrado para Agregar a favoritos",
            callback: function() {
                setTimeout(function() {
                    $(".modalLoading").hide();
                }, 150);
            }
        });
    }
}

function addMegusta(codigo_art, Megusta) {
    if (active == 'true') {
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
                        message: "Error al guardar en me gusta.",
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
            message: "Debe estar registrado para calificar me gusta",
            callback: function() {
                setTimeout(function() {
                    $(".modalLoading").hide();
                }, 150);
            }
        });
    }
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

function goBack() {
    window.history.back();
}
