var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;
var dataCities = [];
var optionsCities = '<option value="-1">SELECCIONAR CIUDAD</option>';
var b64str = "iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAIAAABu2d1/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTdCNTdFMjdCQ0FBMTFFNkI5QjdGQjc5NkZFODM0NkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTdCNTdFMjhCQ0FBMTFFNkI5QjdGQjc5NkZFODM0NkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxN0I1N0UyNUJDQUExMUU2QjlCN0ZCNzk2RkU4MzQ2RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxN0I1N0UyNkJDQUExMUU2QjlCN0ZCNzk2RkU4MzQ2RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrPjwdYAAAjMSURBVHja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";

$(document).on('ready', onReady);

function onReady() {
    $('#btnNext').on('click', next);
    $('#CapturePhoto').on('click', capturePhoto);
    $('#CaptureFromGallery').on('click', captureFromGallery);
    navigator.geolocation.watchPosition(onSuccessMap, onError, { timeout: 30000 });
    
    
    $("#txtPhone").keyup(function() {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $("#txtIdent").keyup(function() {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $('#txtName').focus();
    $('#txtStartTime').timepicker();
    $('#txtEndTime').timepicker();

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices + 'Ciudades',
        data: 'token=' + token,
        success: function(datos) {
            $.each(datos, function(i, Cities) {
                // alert(Cities.Name);
                optionsCities += '<option id="' + Cities.IdCity + '" value="' + Cities.Name + '">' + Cities.Name + '</option>';
                dataCities[i] = Cities.Name;
            });
            $("#Cities").html(optionsCities);
            $('input.typeahead').typeahead({
                name: 'accounts',
                local: dataCities
            });
            // $("#cboCities").html(optionsCities);
        },
        error: function(msg, url, line) {
            alert('Ups, parece que te has quedado sin conexión a internet! Regresa pronto!!');
        }
    });

    $('#sandbox-container input').datepicker({
        format: "yyyy/mm/dd",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true,
        language: "es",
        ignoreReadonly: true
    });
}

function isValidEmail(pEmail) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!filter.test(pEmail)) {
        return false;
    }
    return true;
}

function next() {
    var loading_time = 2500;
    $(".modalLoading").show();
    setTimeout(function() {
        $(".modalLoading").hide();
    }, loading_time);
    var txtName = $("#txtName").val();
    var txtLastName = $("#txtLastName").val();
    var txtIdent = $("#txtIdent").val();
    var txtUser = $("#txtUser").val();
    var txtCity = $("#entity").val();
    var selGenre = $("#selGenre option:selected").text();
    var txtDate = $("#txtDate").val();
    var txtPass = $("#txtPass").val();
    var txtRol = 2;
    var txtEmail = $("#txtEmail").val();
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
    } else if (txtLastName == '') {
        bootbox.alert({
            message: "Apellido es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtLastName').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtUser == '') {
        bootbox.alert({
            message: "Usuario es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtUser').focus();
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
    } else if (txtCity == '') {
        bootbox.alert({
            message: "Ciudad es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtCity').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtDate == '') {
        bootbox.alert({
            message: "Fecha es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtDate').focus();
                }, 150);
            }
        });
        return false;
    } else if (txtPass == '') {
        bootbox.alert({
            message: "Contraseña es campo obligatorio.",
            callback: function() {
                setTimeout(function() {
                    $('#txtPass').focus();
                }, 150);
            }
        });
        return false;
    } else if (!$("#box1").is(':checked')) {
        bootbox.alert("Debe aceptar términos y condiciones.");
    } else {
        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            url: urlServices + 'Usuarios',
            data: '{' +
                '"token":"' + token + '", ' +
                '"idusu_usu":"' + 0 + '" , ' +
                '"correo_usu":"' + txtEmail + '", ' +
                '"usuari_usu":"' + txtUser + '", ' +
                '"nombre_usu":"' + txtName + '", ' +
                '"apelli_usu":"' + txtLastName + '", ' +
                '"cedula_usu": ' + txtIdent + ',' +
                '"contra_usu":"' + txtPass + '", ' +
                '"genero_usu":"' + selGenre + '", ' +
                '"imagen_usu":"' + b64str + '", ' +
                '"fecNac_usu":"' + txtDate + '", ' +
                '"ciudad_usu":"' + txtCity + '", ' +
                '"codigo_rol":"' + txtRol + '", ' +
                '"active": true' +
                '}',
            success: function(datos) {
                if (datos.CodigoResultado == '0005') {
                    var idusu_usu = datos.MensajeResultado;
                    window.localStorage.setItem('idusu_usu', idusu_usu);
                    setTimeout(function() {
                        $(".modalLoading").hide();
                    }, loading_time);
                    bootbox.alert({
                        message: "Datos agregados correctamente.",
                        callback: function() {
                            setTimeout(function() {
                                window.localStorage.setItem('IdRol', txtRol);
                                window.localStorage.setItem('active', true);
                                window.localStorage.setItem('profilePic', b64str);
                                window.location = 'registrarse-negocio2.html';

                            }, 150);
                        }
                    });
                } else {
                    bootbox.alert({
                        message: "Numero identificacion o correo ya registrados en el sistema.",
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

    // marker.setMap(map);

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
