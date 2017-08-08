var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;
var idUsu = 1;
$(document).on('ready', onReady);
function onReady() {
    $('#btnRegister').on('click', changePass);
    $('#txtName').focus();
}

function isValidEmail(pEmail) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!filter.test(pEmail)) {
        return false;
    }
    return true;
}

function changePass() {
    var loading_time = 2500;
    $(".modalLoading").show();
    setTimeout(function () {
        $(".modalLoading").hide();
    }, loading_time);
    var pass = $("#txtPassword").val();
    var newPass = $("#txtNewPassword").val();
    var newPassA = $("#txtNewPasswordA").val();
    var txtName = '';
    var txtLastName = '';
    var txtUser = '';
    var txtCity = '';
    var selGenre = '';
    var txtDate = '2017/02/02';
    var active = true;
    var txtRol = 3;
    var txtEmail = '';
    if (pass == '' || newPass == '' || newPassA == '') {
        bootbox.alert({
            message: "Todos los campos son obligatorios.",
            callback: function () {
                setTimeout(function () {
                    $('#txtPassword').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (newPass != newPassA) {
        bootbox.alert({
            message: "Verifique y confirme contraseña nueva",
            callback: function () {
                setTimeout(function () {
                    $('#txtNewPassword').focus();
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
            url: urlServices2 + '/ValidatePass',
            data: 'token=' + token + '&idusu_usu=' + idUsu + '&pass=' + pass,
            success: function (datos) {
                if(datos.CodigoResultado == "0003")
                {
                    bootbox.alert({
                        message: "No coincide contraseña anterior",
                        callback: function () {
                            setTimeout(function(){
                                $('#txtPassword').focus();
                            }, 150);
                        }
                    });
                }
                else {
                    $.ajax({
                        type: "PUT",
                        crossDomain: true,
                        contentType: "application/json; charset=utf-8",
                        url: urlServices2 + '/UpdatePass',
                        data: '{"token":"' + token + '", "idusu_usu":"' + idUsu + '" , "correo_usu":"' + txtEmail + '", "usuari_usu":"' + txtUser + '", "nombre_usu":"' + txtName + '", "apelli_usu":"' + txtLastName + '", "contra_usu":"' + newPassA + '", "genero_usu":"' + selGenre + '", "imagen_usu":"' + txtEmail + '", "fecNac_usu":"' + txtDate + '", "ciudad_usu":"' + txtCity + '", "codrol_usu":"' + txtRol + '", "active":"' + active + '" }',
                        success: function (datos) {
                            bootbox.alert({
                                message: "Contraseña actualizada con exito",
                                callback: function () {
                                    setTimeout(function(){
                                        $('#txtPassword').focus();
                                    }, 150);
                                }
                            });
                        },
                        error: function (msg, url, line) {
                            alert(line);
                            setTimeout(function () {
                                $(".modalLoading").hide();
                            }, loading_time);
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