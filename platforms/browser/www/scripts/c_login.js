var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;

$(document).on('ready', onReady);

function onReady() {
    $('#btnLogin').on('click', login);
}

// function forgot() {
//     var loading_time = 500;
//     $(".modalLoading").show();
//     setTimeout(function () {
//         $(".modalLoading").hide();
//     }, loading_time);
//     // window.location.href = "remember_pass.html"
// }

function register() {
    var loading_time = 500;
    $(".modalLoading").show();
    setTimeout(function () {
        $(".modalLoading").hide();
    }, loading_time);
    window.location.href = "sign_in.html"
}

function isValidEmail(pEmail) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (!filter.test(pEmail)) {
        return false;
    }
    return true;
}

function login() {
    var loading_time = 3000;
    $(".modalLoading").show();
    var user = $("#txtusername").val();
    var password = $("#txtpassword").val();
    var validEmail = isValidEmail(user);

    setTimeout(function () {
        $(".modalLoading").hide();
    }, loading_time);

    //VALIDATE Email
    if (user == '' || password == '') {
        bootbox.alert({
            message: "Olvidaste escribir tu usuario y contraseña.",
            callback: function () {
                setTimeout(function () {
                    $('#txtusername').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (!$("#box1").is(':checked')) {
        // bootbox.alert("Debe aceptar términos y condiciones.");
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: urlServices2 + '/GetUsuarioById_Pass',
            data: 'token=' + token + '&usuario=' + $("#txtusername").val() + '&pass=' +  $("#txtpassword").val(),
            success: function (datos) {
                if (datos.CodigoResultado != '0003') {
                    window.localStorage.setItem('active', true);
                    window.localStorage.setItem('IdUser', datos[0].idusu_usu);
                    window.localStorage.setItem('IdRol', datos[0].codigo_rol);
                    window.localStorage.setItem('profilePic', datos[0].imagen_usu);

                    switch(datos[0].codigo_rol) {
                        // case 1:
                        //     code block
                        //     break;
                        case 2:
                            window.location = 'inicio3.html';
                            break;
                         case 3:
                            window.location = 'inicio.html';
                            break;
                    }
                }
                else {
                    bootbox.alert({
                        message: "Usuario y/o contraseña incorrectos",
                        callback: function () {
                            setTimeout(function () {
                                $('#txtusername').focus();
                            }, 150);
                        }
                    });
                    return false;
                }
            },
            error: function (msg, url, line) {
                alert(line);
            }
        });
    }
    else {
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: urlServices2 + '/GetUsuarioById_Pass',
            data: 'token=' + token + '&usuario=' + $("#txtusername").val() + '&pass=' +  $("#txtpassword").val(),
            success: function (datos) {
                if (datos.CodigoResultado != '0003') {
                    // window.localStorage.setItem('active', 'true');
                    // window.localStorage.setItem('IdUser', $("#txtusername").val());
                    // window.location = 'inicio.html';
                }
                else {
                    bootbox.alert({
                        message: "Usuario y/o contraseña incorrectos",
                        callback: function () {
                            setTimeout(function () {
                                $('#txtusername').focus();
                            }, 150);
                        }
                    });
                    return false;
                }
            },
            error: function (msg, url, line) {
                alert(line);
            }
        });
    }
}

function goBack() {
    window.history.back();
}