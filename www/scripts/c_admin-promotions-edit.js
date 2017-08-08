var urlServices = CONFIG.WS_URL;
var urlServices2 = CONFIG.WS_URL_MASK;
var token = CONFIG.TOKEN;
var imageB64;

//EN CRUDO CAMBIAR
var idEst = 82;
var nomGest = 'JGM';
var nomEst = 'Chichan Parapentes';
var establecimiento_marcador_idPunto;
var after37;

$(document).on('ready', onReady);

function onReady() {
    $('#btnEntrar').on('click', btnEntrar);
    $('#btnCerrar').on('click', btnCerrar);
    $('#btnRegister').on('click', register);
    $('#txtStartTime').timepicker();
    $('#txtEndTime').timepicker();

    load();
    loadSesion();
    loadArticles();
    // calculateDate();
    $('#cboArticulo').on('change', changeSelArticle);
    $("#txtStartTime").keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $("#txtEndTime").keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $("#txtQuantity").keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $("#txtPercent").keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });

    $('#sandbox-container input').datepicker({
        format: "yyyy/mm/dd",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true,
        language: "es",
        ignoreReadonly: true
    });
    $('#sandbox-container2 input').datepicker({
        format: "yyyy/mm/dd",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true,
        language: "es",
        ignoreReadonly: true,
        endDate: '+37d'
    });
    $('#txtPrice').mask("#,##0", {reverse: true});
}

function loadArticles() {
    var optionsArticles = '<option value="-1">SELECCIONAR ARTICULO</option>';
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices2 + '/GetArticulosByIdEst',
        data: 'token=' + token + '&IdEst=' + idEst,
        success: function (datos) {
            $.each(datos, function (i, Articles) {
                // alert(Periods.Period);
                optionsArticles += '<option id="' + Articles.codigo_art + '" value="' + Articles.codigo_art + '">' + Articles.nombre_art + '</option>';
            });
            $("#cboArticulo").html(optionsArticles);
        },
        error: function (msg, url, line) {
            alert('Ups, parece que te has quedado sin conexión a internet! Regresa pronto!!');
        }
    });
}

/********* Carga Combo de Specie ************/
function changeSelArticle() {
    var loading_time = 500;
    $(".modalLoading").show();
    var IdArt = $("#cboArticulo").val();
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices2 + '/ObtenerArticulosByIdArt',
        data: 'token=' + token + '&IdArt=' + IdArt,
        success: function (datos) {
            $("#txtPrice").val(datos[0].precio_art);
            establecimiento_marcador_idPunto = datos[0].establecimiento_marcador_idPunto;
            setTimeout(function () {
                $(".modalLoading").hide();
            }, loading_time);
        },
        error: function (msg, url, line) {
            alert('Failure');
            setTimeout(function () {
                $(".modalLoading").hide();
            }, loading_time);

        }
    });
}

function loadSesion() {
    if (active == 'true') {
        var profilePic = window.localStorage.getItem('profilePic');
        $("#profilePic").attr('src', 'data:image/png;base64,' + profilePic);
    }
}

function load() {
    var loading_time = 1500;
    $(".modalLoading").show();
    $('#lstPromo').empty();
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlServices + 'Promociones',
        data: 'token=' + token,
        success: function (datos) {
            $.each(datos, function (i, promo) {
                if (promo.foto != null) {
                    imageB64 = "data:image/jpeg;base64," + promo.foto;
                } else {
                    imageB64 = "img/img-producto.png";
                }
                $("#lstPromo").append('<li class="mb-10"> \
                                    <div class="row vertical-align">\
                                        <div class="col-xs-3 "><img src="' + imageB64 + '" alt="" class="img-responsive imgPromo"></div>\
                                        <div class="col-xs-7 no-padding ">\
                                            <h1 class="text-azul-claro">' + promo.establ_pro + '</h1>\
                                            <p>' + promo.caract_pro + '\
                                            </p>\
                                             <ul class="boton">\
                                                <li onclick=""><div><span class="glyphicon glyphicon-plus form-control-feedback-search" aria-hidden="true"></span></div></li>\
                                                <li><div><span class="glyphicon glyphicon-pencil form-control-feedback-search" aria-hidden="true"></span></div></li>\
                                                <li><div><span class="glyphicon glyphicon-trash form-control-feedback-search" aria-hidden="true"></span></div></li>\
                                            </ul>\
                                        </div>\
                                        <div class="col-xs-2 no-padding">\
                                            <div class="porcentaje">' + promo.porcen_pro + ' %</div>\
                                        </div>\
                                    </div>\
                                   </li>');
            });
            setTimeout(function () {
                $(".modalLoading").hide();
            }, loading_time);
        },
        error: function (msg, url, line) {
            setTimeout(function () {
                $(".modalLoading").hide();
            }, loading_time);
            alert(line);
        }
    });
}


function register() {
    var loading_time = 2500;
    $(".modalLoading").show();
    setTimeout(function () {
        $(".modalLoading").hide();
    }, loading_time);
    // var txtName = $("#txtName").val();
    var cboArticulo = $("#cboArticulo option:selected").val();
    var txtPrice = $("#txtPrice").val();
    var txtQuantity = $("#txtQuantity").val();
    var txtPercent = $("#txtPercent").val();
    var txtStartDate = $("#txtStartDate").val();
    var txtEndDate = $("#txtEndDate").val();
    var txtStartTime = $("#txtStartTime").val();
    var txtEndTime = $("#txtEndTime").val();
    var txtRol = 3;
    var txtDescription = $("#txtDescription").val();
    if (cboArticulo == '-1') {
        bootbox.alert({
            message: "Debe seleccionar un articulo-",
            callback: function () {
                setTimeout(function () {
                    $('#cboArticulo').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtQuantity == '') {
        bootbox.alert({
            message: "Cantidad es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtQuantity').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtQuantity == '0') {
        bootbox.alert({
            message: "Minimo Cantidad es 1",
            callback: function () {
                setTimeout(function () {
                    $('#txtQuantity').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtPercent == '') {
        bootbox.alert({
            message: "Porcentaje es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtPercent').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (parseInt(txtPercent) < 5) {
        bootbox.alert({
            message: "Porcentaje minimo es 5",
            callback: function () {
                setTimeout(function () {
                    $('#txtPercent').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (parseInt(txtPercent) > 100) {
        bootbox.alert({
            message: "Porcentaje maximo es 100",
            callback: function () {
                setTimeout(function () {
                    $('#txtPercent').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtStartDate == '') {
        bootbox.alert({
            message: "Fecha inicio es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtStartDate').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtEndDate == '') {
        bootbox.alert({
            message: "Fecha final es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtEndDate').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtStartTime == '') {
        bootbox.alert({
            message: "Hora inicial es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtStartDate').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtEndTime == '') {
        bootbox.alert({
            message: "Hora final es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtEndTime').focus();
                }, 150);
            }
        });
        return false;
    }
    else if (txtDescription == '') {
        bootbox.alert({
            message: "Descripción es campo obligatorio.",
            callback: function () {
                setTimeout(function () {
                    $('#txtDescription').focus();
                }, 150);
            }
        });
        return false;
    }
    else {
        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            url: urlServices + 'Promociones',
            data: '{' +
            '"token":"' + token + '", ' +
            '"codigo_pro":"' + 0 + '" , ' +
            '"gestor_pro":"' + nomGest + '", ' +
            '"establ_pro":"' + nomEst + '", ' +
            '"codart_pro":"' + cboArticulo + '", ' +
            '"preart_pro":"' + txtPrice + '", ' +
            '"cantid_pro": ' + txtQuantity + ',' +
            '"porcen_pro":"' + txtPercent + '", ' +
            '"fecini_pro":"' + txtStartDate + '", ' +
            '"fecfin_pro":"' + txtEndDate + '", ' +
            '"horini_pro":"' + txtStartTime + '", ' +
            '"horfin_pro":"' + txtEndTime + '", ' +
            '"horFin_est":"' + txtEndTime + '", ' +
            '"caract_pro":"' + txtDescription + '", ' +
            '"establecimiento_codigo_est":"' + idEst + '", ' +
            '"establecimiento_marcador_idPunto":"' + establecimiento_marcador_idPunto + '", ' +
            '"active": true ,' +
            '"foto": "' + txtRol + '"' +
            '}',
            success: function (datos) {
                if (datos.CodigoResultado == '0005') {
                    var idusu_usu = datos.MensajeResultado;
                    window.localStorage.setItem('idusu_usu', idusu_usu);
                    setTimeout(function () {
                        $(".modalLoading").hide();
                    }, loading_time);
                    bootbox.alert({
                        message: "Datos agregados correctamente.",
                        callback: function () {
                            setTimeout(function () {
                                // window.location = 'inicio.html';
                                // window.localStorage.setItem('IdRol', txtRol);
                                // window.localStorage.setItem('active', true);
                                // window.localStorage.setItem('profilePic', b64str);
                            }, 150);
                        }
                    });
                }
                else {
                    bootbox.alert({
                        message: "No se ingreso promocion, intente nuevamente.",
                        callback: function () {
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

function calculateDate() {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+37);
    after37 = tomorrow.toLocaleDateString("zh-Hans-CN");
    alert(after37);
    // alert(after37.toLocaleDateString("en-US"));
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
