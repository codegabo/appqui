var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;
var idUsu = 1;
$(document).on('ready', onReady);
function onReady() {
    $('#btnRegister').on('click', register);
    $('#txtName').focus();
}

function isValidEmail(pEmail) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!filter.test(pEmail)) {
        return false;
    }
    return true;
}

function register() {
    var loading_time = 2500;
    $(".modalLoading").show();
    setTimeout(function () {
        $(".modalLoading").hide();
    }, loading_time);
    var txtEmail = $("#txtEmail").val();
    //VALIDATE Email
    var validEmail = isValidEmail(txtEmail);
    if (txtEmail == '') {
        bootbox.alert({
            message: "Para recordar tu contraseña ddebes proporcionar un correo electrónico",
            callback: function () {
                setTimeout(function () {
                    $('#txtEmail').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (validEmail != true) {
        bootbox.alert({
            message: "Formato email no valido",
            callback: function () {
                setTimeout(function () {
                    $('#txtEmail').focus();
                }, 150);
            }
        });
        return false;
    }
    else {
        $.ajax({
            type: "GET",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            url: urlServices2 + '/GetUsuarioByEmail',
            data: 'token=' + token + '&email=' + txtEmail,
            success: function (datos) {
                if(datos.CodigoResultado == "0002")
                {
                    bootbox.alert({
                        message: "Email no registrado en Appqui",
                        callback: function () {
                            setTimeout(function(){
                                $('#txtEmail').focus();
                            }, 150);
                        }
                    });
                }
                else {
                    bootbox.alert({
                        message: "Contraseña enviada a correo registrado",
                        callback: function () {
                            setTimeout(function(){
                                $('#txtEmail').focus();
                            }, 150);
                        }
                    });
                }
                setTimeout(function () {
                    $(".modalLoading").hide();
                }, loading_time);
            },
            error: function (msg, url, line) {
                alert(line);
                setTimeout(function () {
                    $(".modalLoading").hide();
                }, loading_time);
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
function onFail(message) {
}

function goBack() {
    window.history.back();
}