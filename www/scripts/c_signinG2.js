var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;
var b64str = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAABSVJREFUeJzt3T/IVXUcx/FP/kEtBGuotD9kJFEtlkgNNRhZg8015BCRQ0urUYNEfwiiob3BbGlqamiJaGgJLMqKiv4QmigFWkN/NLXhPoKKfK/PPT/vOfc+rxccUJCvX+/1zXOeh3PuSQAAAAAAAAAAAAAAAAAAAICL2Z7kcJIzjoseh5Jsm/jVZeZ9n/7/Ew79+HriV3cOLOt7gZ5d2/cCM+C6vhfo01IPBEoCgYJAoLCi7wUm9EKSnUlWdpyztsEu8+7qJD90nHEiyb4kr3Vfh3EeTP8/2XFMdjxwkfdz0GbxFGtj3wswsVv7XmCxZjGQK/pegInN3Hs3i4HA1AgECgKBgkCgIBAoCAQKAoGCQKAwq9diLcZfSfb0vcSceinJ6r6X4HxPZ3HX//zez5pLwvEs7r14spctO3CKBQWBQEEgUBAIFAQCBYFAQSBQEAgUBAIFgUBBIFAQCBQEAgWBQEEgUBAIFJbCHYUtLMvoU84n+ejMMxndWHSq6UbJ8iTrMvlOx5KcbroRgzDtOwrvTPLLIv/OC4/DSbZ03ONc9yY52nGnn5Pc3nEPdxSS55Pc3HHG+rS9L/7FdH++4i1JdndfZb4JZLx1jeZc02hOMsyd5pJAoCAQKAgECgKBgkCgIBAoCAQKAoGCQKAgECgIBAoCgYJAoCCQ8U42mnOi0ZxkmDvNJYGM905GN/t0tbfBjLPebjDjdJJ9DebMNbfcjvdekruTbM7kt7d+lWR/w53eSvJlkjs67LR/YS8KArk0XywcQ/LpwsFl5BQLCgKBgkCgIBAoCAQKAoGCQKAgECgIBAoCgYJLTS7NbUnuyuTXPX2X5NumG40+dX5TJt/pQJKfmm7EIEz78Qc7Mrq8vMujBk4lebzjHufamdHVuF12OpHk4Y57ePwBeSrdv9IuS7KrwS5n7cpkXznOtTKjfxsFgYy3qtGc1Y3mJMPcaS4JBAoCgYJAoCAQKAgECgKBgkCgIBAoCAQKAoGCQKAgECgIBAoCGe/PRnOON5qTDHOnuSSQ8V5P8lvHGceSvNpgl7NeSfJHxxlHkrzRYJe55pbb8T5PclOSGzP57a2/Jvmn4U4fJ1mfZEOHnQ7GA3TGEsil+TfJj30vcYG/M7yd5o5TLCgIBAoCgYJAoCAQKAgECgKBgkCgIBAoCAQKLjW5NE8k2ZzJr3v6JsnehV8zQwQy3rNJ3mww54YkLzeYwxQ5xRrvoUZztjeawxQJZLxWr9HyRnOYIoFAQSBQ8E367NqcZEsm+8na6SSfZPRwUQoCmU2PJXk33Z5TeDLJI0k+arLRnHKKNZueSZuHeLZ8sOhcEshsWtNozpWN5swtgUBBIFAQCBQEAgWBQEEgUBDI9LgXZAYJZLxDjeYcbDSHKXKpyXh7kmxMck8mv6PwQJLdLZdiOgQy3tGMrlliCXKKBQWBQEEgUBAIFAQCBYFAQSBQEAgUBAIFgUBBIFAQCBQEAgWBQEEgUBAIFAQCBYFAQSBQEAgUBAIFgUBBIFAY+udibU2yLeeHvHWRM9Ykea7ZRsOwodGcTen22qxa5J/fkeT6c35/KsmHST7rsMOSdX+S/zL6ZELH/B4nk9yXgRryKdajSZb3vQSX3YqM3utBGnIgQz/9o53BvtdDDgR6JxAoCAQKAoGCQKAgECgIBAoCgYJAoCAQKAgECgKBgkCgMORAjva9AFNzpO8FZtHaJB9kdNdZ3zf1OC7PcSrJ+0muCgAAAAAAAAAAAAAAAAAAAMyY/wGbdd2Jg+9YMQAAAABJRU5ErkJggg==";


$(document).on('ready', onReady);

function onReady() {
    var image = document.getElementById('ProfileImage');
    image.src = "data:image/jpeg;base64," + b64str;
    $('#btnNext').on('click', next);
    $('#txtStartTime').timepicker();
    $('#txtEndTime').timepicker();
    $('#CapturePhoto').on('click', capturePhoto);
    $('#CaptureFromGallery').on('click', captureFromGallery);
    navigator.geolocation.watchPosition(onSuccessMap, onError, { timeout: 30000 });
    $("#txtPhone").keyup(function() {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $("#txtStartTime").keyup(function() {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $("#txtEndTime").keyup(function() {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    // $('#txtName').focus();
}

function isValidEmail(pEmail) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!filter.test(pEmail)) {
        return false;
    }
    return true;
}

function next() {
    //window.location = 'info-local.html';
    var loading_time = 2500;
    $(".modalLoading").show();
    setTimeout(function() {
        $(".modalLoading").hide();
    }, loading_time);
    var txtAddressG2 = $("#txtAddressG2").val();
    var txtName = $("#txtName").val();
    var txtDesc = $("#txtDesc").val();
    var txtPhone = $("#txtPhone").val();
    var txtWeb = $("#txtWeb").val();
    var selSuscr = $("#selSuscr option:selected").text();
    var selTipoEs = $("#selTipoEs option:selected").text();
    var txtEmail = $("#txtEmail").val();
    var txtStartTime = $("#txtStartTime").val();
    var txtEndTime = $("#txtEndTime").val();
    var txtIdent = 0;
    var latiSel = window.localStorage.getItem('latiSel');
    var longSel = window.localStorage.getItem('longSel');
    var idusu_usu = window.localStorage.getItem('idusu_usu');

    //VALIDATE Email
    var validEmail = isValidEmail(txtEmail);
    if (txtName == '') {
        bootbox.alert({
            message: "Nombre es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtName').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtAddressG2 == '') {
        bootbox.alert({
            message: "Debes seleccionar ubicación en el mapa.",
            callback: function() {
                setTimeout(function() {
                    $('#txtAddressG2').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtDesc == '') {
        bootbox.alert({
            message: "Descripción es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtDesc').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtPhone == '') {
        bootbox.alert({
            message: "Telefono es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtPhone').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtWeb == '') {
        bootbox.alert({
            message: "Página web es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtWeb').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtEmail == '') {
        bootbox.alert({
            message: "Email es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtEmail').focus();
                }, 150);
            }
        });
        return false;
    } else if (validEmail != true) {
        bootbox.alert({
            message: "Formato email no valido",
            callback: function() {
                setTimeout(function() {
                    $('#txtEmail').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtStartTime == '') {
        bootbox.alert({
            message: "Hora inicio es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtStartTime').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtEndTime == '') {
        bootbox.alert({
            message: "Hora cierre es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtEndTime').focus();
                }, 150);
            }
        });
        return false;
    } else {

        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            url: urlServices + 'Establecimientos',
            data: '{' +
                      '"token": "' + token + '",' +
                      '"codigo_est": 0,' +
                      '"nombre_est": "' + txtName + '",' +
                      '"descri_est": "' + txtDesc + '",' +
                      '"direci_est": "' + txtAddressG2 + '",' +
                      '"telefo_est": "' + txtPhone + '",' +
                      '"pagweb_est": "' + txtWeb + '",' +
                      '"correo_est": "' + txtEmail + '",' +
                      '"horIni_est": "' + txtStartTime + '",' +
                      '"horFin_est": "' + txtEndTime + '",' +
                      '"suscri_est": "' + selSuscr + '",' +
                      '"tipoes_est": "' + selTipoEs + '",' +
                      '"foto": "' + b64str + '",' +
                      '"gestor_est": "' + txtName + '",' +
                      '"ciudad_usu": "' + txtAddressG2 + '",' +
                      '"propietario_codigo_pro": ' + idusu_usu + ',' +
                      '"codigo_mun": 1,' +
                      '"Exelente": 0,' +
                      '"Bueno": 0,' +
                      '"Regular": 0,' +
                      '"Malo": 0,' +
                      '"Favorito": 0,' +
                      '"active": true,' +
                      '"Latitud": "",' +
                      '"Longitud": ""' +
                    '}',
            success: function(datos) {
                if (datos.CodigoResultado == '0005') {
                    var codigo_est = datos.MensajeResultado;
                    window.localStorage.setItem('codigo_est', codigo_est);
                    $.ajax({
                        type: "POST",
                        crossDomain: true,
                        contentType: "application/json; charset=utf-8",
                        url: urlServices + 'Marcadores',
                        data: '{"token":"' + token + '", "idPunto":"' + txtIdent + '" , "codigo_est":"' + codigo_est + '", "nomest_mar":"' + txtName + '", "catest_mar":"' + selTipoEs + '", "cx_mar":"' + latiSel + '", "cy_mar":"' + longSel + '" }',
                        success: function(datos) {
                            if (datos.CodigoResultado == '0005') {
                                var codigo_est = datos.MensajeResultado;
                                window.localStorage.setItem('codigo_est', codigo_est);
                                setTimeout(function() {
                                    $(".modalLoading").hide();
                                }, loading_time);
                                bootbox.alert({
                                    message: "Datos agregados correctamente.",
                                    callback: function() {
                                        }
                                        setTimeout(function () {
                                            window.location = 'inicio.html';
                                        }, 150);
                                    }
                                );
                            } else {
                                bootbox.alert({
                                    message: "Error al guardar los marcadores.",
                                    callback: function() {}
                                });
                                return false;
                            }
                        },
                        error: function(msg, url, line) {
                            alert(line);
                        }
                    });
                } else {
                    bootbox.alert({
                        message: "Error al guardar establecimiento.",
                        callback: function() {}
                    });
                    return false;
                }
            },
            error: function(msg, url, line) {
                alert(line);
            }
        });
    }
}

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 50,
        targetHeight: 50,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG
    });
}

function captureFromGallery() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        targetWidth: 50,
        targetHeight: 50,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG
    });
}

function onSuccess(imageData) {
    var image = document.getElementById('ProfileImage');
    image.src = "data:image/jpeg;base64," + imageData;
    b64str = imageData;
    // document.getElementById("divImg").innerHTML = imageData;
}

function onFail(message) {}

function goBack() {
    window.history.back();
}

/* MAPA*/
function onSuccessMap(position) {
    window.localStorage.setItem('latitude', position.coords.latitude);
    window.localStorage.setItem('longitude', position.coords.longitude);
    //initialize();
}

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

var map;

function initialize() {
    var lat = window.localStorage.getItem('latitude');
    var lng = window.localStorage.getItem('longitude');
    // var lat = 4.79053;
    // var lng = -74.0972;
    var myCenter = new google.maps.LatLng(lat, lng);
    var options = {
        zoom: 18,
        center: myCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), options);

    var marker = new google.maps.Marker({
        position: myCenter
    });

    marker.setMap(map);

    google.maps.event.addListener(map, 'click', function(e) {
        var latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
        window.localStorage.setItem('latiSel', e.latLng.lat());
        window.localStorage.setItem('longSel', e.latLng.lng());
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    //alert("Location: " + results[0].formatted_address + "\r\nLatitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
                    $("#txtAddressG2").val(results[0].formatted_address);
                }
            }
        });
    });

}

google.maps.event.addDomListener(window, 'load', initialize);
